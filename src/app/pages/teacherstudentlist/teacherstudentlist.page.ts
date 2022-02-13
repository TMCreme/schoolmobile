import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CacheService } from 'ionic-cache';
import { TeacherService } from 'src/app/services/teacher.service';


@Component({
  selector: 'app-teacherstudentlist',
  templateUrl: './teacherstudentlist.page.html',
  styleUrls: ['./teacherstudentlist.page.scss'],
})
export class TeacherstudentlistPage implements OnInit {

  @Input("subject") subject;
  @Input("level") level;
  retrievedStudents;

  constructor(private teacherService: TeacherService,
    private cookieService: CookieService, private cache: CacheService,
    private formbuilder: FormBuilder,
    private loading : LoadingController, 
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.loadStudentList()
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

  async loadStudentList() {
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present();
    var data = JSON.stringify({
      "organization" : this.cookieService.get("organization"),
      "subject" : this.subject,
      "level" : this.level
    })
    let response = this.cache.loadFromObservable("teacherstudentlist", 
    this.teacherService.studentLitforSubject(data), "teacherstudentlist", 3)

    response.subscribe(results => {
      if (results.status == "success"){
      this.retrievedStudents = results.data;
      loading.dismiss()
      return this.retrievedStudents
    } else {
      console.log(results.error)
      alert(results.error)
      loading.dismiss()
    }
    })
    loading.dismiss()
  }

}
