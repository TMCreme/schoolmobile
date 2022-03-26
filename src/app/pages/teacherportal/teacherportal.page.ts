import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { TeacherService } from 'src/app/services/teacher.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TeacherstudentlistPage } from '../teacherstudentlist/teacherstudentlist.page';
import { TeacheraddassignmentPage } from '../teacheraddassignment/teacheraddassignment.page';





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
    private router: Router, private modal: ModalController) { }

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
          console.log('View Student List for  ', level);
          this.openstudentlist(subject, level);
        }
      }, 
      {
        text: 'Post an Assignment',
        icon: 'add-circle',
        handler: () => {
          // Under student list, we will have to add remarks from teachers. 
          console.log('Edit subject for ', level);
          this.openAssignmentModal(subject, level);
        }
      },

      {
        text: 'View Previous Assignments',
        icon: 'eye',
        handler: () => {
          // Under student list, we will have to add remarks from teachers. 
          console.log('Edit subject for ', level);
          this.openPreviousAssignmentModal(subject, level);
        }
      },

      {
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


  async openstudentlist(subject, level){
    let modal = await this.modal.create({
      component: TeacherstudentlistPage,
      componentProps: {subject: subject, level: level}
    })
    modal.present();

    const data = await modal.onDidDismiss();
    if (data) {
      let remarkdata = data;
      console.log(data);
    }
  }


  async openAssignmentModal(subject, level) {
    let modal = await this.modal.create({
      component: TeacheraddassignmentPage,
      componentProps: {subject: subject, level: level}
    })
    modal.present();

    const data = await modal.onDidDismiss();
    if (data) {
      let remarkdata = data;
      console.log(data);
    }
  }

  async openPreviousAssignmentModal(subject, level) {
    let modal = await this.modal.create({
      component: TeacherstudentlistPage,
      componentProps: {subject: subject, level: level}
    })
    modal.present();

    const data = await modal.onDidDismiss();
    if (data) {
      let remarkdata = data;
      console.log(data);
    }
  }

}



