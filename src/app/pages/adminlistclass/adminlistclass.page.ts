import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CacheService } from 'ionic-cache';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ManagementbayService } from 'src/app/services/managementbay.service';
import { AdminaddtimetablePage } from '../adminaddtimetable/adminaddtimetable.page';

@Component({
  selector: 'app-adminlistclass',
  templateUrl: './adminlistclass.page.html',
  styleUrls: ['./adminlistclass.page.scss'],
})
export class AdminlistclassPage implements OnInit {

  retrievedclasses;
  constructor(private cookieService: CookieService,
    private router: Router, private cache: CacheService,
    private mgtService: ManagementbayService,
    private actionSheetCtrl: ActionSheetController,
    private loading: LoadingController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.loadclaslist()
  }


  async loadclaslist() {
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    var data = JSON.stringify({
      "school" : this.cookieService.get("organization")
    });

    let response = this.cache.loadFromObservable("adminclasslistview", 
    this.mgtService.adminlistclassview(data), "adminclasslistview", 5)

    response.subscribe( results => {
      this.retrievedclasses = results.data;
      console.log(results.message)
      loading.dismiss()
    })
  }

  async presentActionSheet(level) {
    console.log(level)
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Actions",
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Download Time Table',
        icon: 'create',
        handler: () => {
          console.log('Download Time table for ', level);
          // this.router.navigate([""]);
        }
      },
      {
        text: 'Upload Time Table',
        icon: 'create',
        handler: () => {
          console.log('Upload Time table for ', level);
          this.openadmintimetable(level);
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
      }
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data',  level);
  }


  async openadmintimetable(level) {
    let modal = await this.modalCtrl.create({
      component: AdminaddtimetablePage,
      componentProps: {level: level}
    })
    modal.present()

    const data = await modal.onDidDismiss();
    if (data) {
      let timetabledata = data;
      console.log(timetabledata)
     }
  }

  // Viewing the time table - On hold to confirm,
  async downloadtimtable(level){

  }



}
