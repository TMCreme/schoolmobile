import { Component, OnInit } from '@angular/core';
import { ManagementbayService } from 'src/app/services/managementbay.service';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-adminpasswordreset',
  templateUrl: './adminpasswordreset.page.html',
  styleUrls: ['./adminpasswordreset.page.scss'],
})
export class AdminpasswordresetPage implements OnInit {

  user = {
    temp_password: ""
  }
  temppasswordform:  FormGroup;
  error_messages = {
    "temp_password": [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Password must be less than or equal to 30 characters.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ],  
  }
  constructor(private mgtService: ManagementbayService,
    private cookieService: CookieService, private cache: CacheService,
    private formbuilder: FormBuilder,
    private loading : LoadingController, 
    private modalCtrl: ModalController,
    ) { 
      this.temppasswordform = this.formbuilder.group({
        temp_password : new FormControl("", Validators.compose([])),
      })
    }

  ngOnInit() {
  }


  cancel(){
    this.modalCtrl.dismiss()
}

async save() {
  console.log(this.user.temp_password, this.cookieService.get("userpasswordreset"))
  const loading = await this.loading.create({
    cssClass: 'my-login-class',
    message: 'Please wait....',
  });
  await loading.present()
  var data = JSON.stringify({
    "username" :this.cookieService.get("userpasswordreset"),
    "temp_password" : this.user.temp_password
  })
  let response = this.cache.loadFromObservable("userpasswordreset", 
  this.mgtService.adminpasswordresetservice(data), "userpasswordreset", 3)
  
  response.subscribe(results => {
    if (results.status == "success") {
      console.log(results.message);
      loading.dismiss()
    } else {
      console.log(results)
      loading.dismiss()
    }
  })
  this.modalCtrl.dismiss()
}

}
