import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { TeacherService } from 'src/app/services/teacher.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacherportal',
  templateUrl: './teacherportal.page.html',
  styleUrls: ['./teacherportal.page.scss'],
})
export class TeacherportalPage implements OnInit {
  retrivedsubjects;
  constructor(private cookieService: CookieService, private cache: CacheService,
    private loading: LoadingController, private teachserService: TeacherService,
    public actionSheetController: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
    this.loadsubjectlist()
  }

  async loadsubjectlist() {
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    let response = this.cache.loadFromObservable("adminviewuserlist",
    this.teachserService.subjectList(), "adminviewuserlist", 5)
    response.subscribe(data => {
      
      this.retrivedsubjects = data.data;
      console.log(this.retrivedsubjects);
      loading.dismiss();
    })
  }

  async presentActionSheet(subject, level) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Edit Subject',
        icon: 'create',
        handler: () => {
          // This button will call a reset password API. but I want to do it without the token in django's builtin auth
          console.log('Edit subject for ', subject);
          // this.router.navigate([""]);
        }
      }, {
        text: 'View Student List',
        icon: 'eye',
        handler: () => {
          // Under student list, we will have to add remarks from teachers. 
          console.log('Edit subject for ', subject);
          // this.router.navigate([""]);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', subject, level);

  }

}
