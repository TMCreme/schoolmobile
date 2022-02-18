import { Component, OnInit } from '@angular/core';
import { ManagementbayService } from 'src/app/services/managementbay.service';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-adminstudentremark',
  templateUrl: './adminstudentremark.page.html',
  styleUrls: ['./adminstudentremark.page.scss'],
})
export class AdminstudentremarkPage implements OnInit {

  user_remark = {
    org_name : "",
    adminusername: "",
    studentusername : "",
    remark : ""
  }

  constructor(private mgtService: ManagementbayService,
    private cookieService: CookieService, private cache: CacheService,
    private formbuilder: FormBuilder,
    private loading : LoadingController, 
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
  }


  cancel() {
    this.modalCtrl.dismiss()
  }

  async saveremark() {
    const loading = await this.loading.create({
      cssClass: "my-login-class",
      message: "Please wait...",
    });
    await loading.present();
    this.user_remark.org_name = this.cookieService.get("organization")
    this.user_remark.studentusername = this.cookieService.get("adminremarkforstudent");
    this.user_remark.adminusername = this.cookieService.get("loggedinuser");
    var data = JSON.stringify({
      "adminusername": this.user_remark.adminusername,
      "studentusername": this.user_remark.studentusername,
      "organization": this.user_remark.org_name,
      "studentremark": this.user_remark.remark
    });
    console.log(data)
    let response = this.cache.loadFromObservable("adminremarkforstudent", 
    this.mgtService.adminstudentremark(data), "adminremarkforstudent", 3)

    response.subscribe(results => {
      if (results.status == "success"){
        console.log(results.message)
        loading.dismiss()
      } else {
        console.log(results.error);
        loading.dismiss();
      }
    })
    this.modalCtrl.dismiss()
  }

}
