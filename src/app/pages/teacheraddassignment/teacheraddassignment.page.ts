import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CacheService } from 'ionic-cache';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacheraddassignment',
  templateUrl: './teacheraddassignment.page.html',
  styleUrls: ['./teacheraddassignment.page.scss'],
})
export class TeacheraddassignmentPage implements OnInit {

  @Input("subject") subject;
  @Input("level") level;
    name;
    notes;
    file: File;
    public due_date :any =new  Date().toJSON()

  constructor(private teacherService: TeacherService,
    private cookieService: CookieService, private cache: CacheService,
    private formbuilder: FormBuilder,
    private loading : LoadingController, 
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  cancel(){
    this.modalCtrl.dismiss();
  }




  async submitAssignmentForm() {
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present();
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    formData.append("name", this.name)
    formData.append("school", this.cookieService.get("organization"))
    formData.append("subject", this.subject)
    formData.append("level", this.level)
    formData.append("notes", this.notes)
    formData.append("due_date", this.due_date)
    var data = JSON.stringify({
      "school" : this.cookieService.get("organization"),
      "subject" : this.subject,
      "level" : this.level,
      "name" : this.name,
      "file" : this.file,
      "notes" : this.notes,
      "date_due" : this.due_date
    })
    
    let reponse = this.cache.loadFromObservable("teacherpostedassignment",
    this.teacherService.postassignment(formData), "teacherpostedassignment", 5);

    reponse.subscribe( results => {
      console.log(results );
      if (results.status == "success") {
        console.log(results.message)
        loading.dismiss()
      } else {
        console.log(results.error)
        loading.dismiss()
      }
    })

    this.modalCtrl.dismiss()
  }
}
