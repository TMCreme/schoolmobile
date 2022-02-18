import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { ParentService } from 'src/app/services/parent.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parentportal',
  templateUrl: './parentportal.page.html',
  styleUrls: ['./parentportal.page.scss'],
})
export class ParentportalPage implements OnInit {

  retrievedStudents;
  constructor(private cookieService: CookieService, private cache: CacheService,
    private loading: LoadingController, private parentService: ParentService,
    public actionSheetController: ActionSheetController,
    private router: Router     ) { }

  ngOnInit() {
    this.loadstudents();
  }

  async loadstudents() {
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    let response = this.cache.loadFromObservable("parentviewstudentlist",
    this.parentService.studentList(), "parentviewstudentlist", 5);

    response.subscribe(data => {
      this.retrievedStudents = data.data;
      console.log(this.retrievedStudents);
      loading.dismiss();
    })
  }

  async presentActionSheet(student, level) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: "Course Performance",
        icon: "create",
        handler: () => {
          // Under course performance details, 
          console.log("Edit subject for ", student);
          // this.router.navigate([""]);
        }
      }, {
        text: "Teachers' Remarks",
        icon: 'eye',
        handler: () => {
          console.log("Teachers' Remarks for ", student);
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
    console.log('onDidDismiss resolved with role and data', student, level);

  }

  async courseActionSheet(course) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: "Course Performance",
        icon: "create",
        handler: () => {
          // Under course performance details, 
          console.log("Edit subject for ", course);
          // this.router.navigate([""]);
        }
      }, {
        text: "Teachers' Remarks",
        icon: 'eye',
        handler: () => {
          console.log("Teachers' Remarks for ", course);
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
  }

}
