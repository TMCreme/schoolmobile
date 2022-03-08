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
    file;
    newfile;
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
    var fileReader = new FileReader();
    fileReader.readAsDataURL(fileChangeEvent.target.files[0]);
    
    fileReader.onload = () => {
      // console.log(fileReader.result)
      this.file = fileReader.result;
    }
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
   
    var jsonData = JSON.stringify({
      "school" : this.cookieService.get("organization"),
      "subject" : this.subject,
      "level" : this.level,
      "name" : this.name,
      "notes" : this.notes,
      "date_due" : this.due_date,
      "file" : this.file
    })
    
    let reponse = this.cache.loadFromObservable("teacherpostedassignment",
    this.teacherService.postassignment(jsonData), "teacherpostedassignment", 5);

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
