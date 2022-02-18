import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CacheService } from 'ionic-cache';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  auth_token;
  details;
  passwordchangeform: FormGroup;
  error_messages = {
    'current_password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Password must be less than or equal to 30 characters.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ],  
    'new_password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Password must be less than or equal to 30 characters.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ],
    'new_password2': [
      {type: 'required', message: 'Password is required.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ]
  }

  constructor(
    private cookieService: CookieService, 
    private cache: CacheService,
    public baseService: BaseService, 
    private loadingController: LoadingController,
    private formBuilder: FormBuilder
    ) {
      this.passwordchangeform = this.formBuilder.group({
        current_password: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern("^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ])),
        new_password: new FormControl("", Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern("^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ])),
        new_password2: new FormControl("", Validators.compose([
          Validators.required,
        ]))
      })
     }

  ngOnInit() {
    this.auth_token = this.cookieService.get("token");
  }

  async passwordchange() {
    const loading = await this.loadingController.create({
      cssClass: 'my-login-class',
      message: 'Validating the data. Please wait',
    });
    await loading.present();
    let groupKey = "passworddata";
    let ttl = 3;
    this.details = JSON.stringify({"old_password":this.passwordchangeform.value.current_password,
    "new_password":this.passwordchangeform.value.new_password})
    let response = this.cache.loadFromObservable("passwordupdate"+this.details,
    this.baseService.changepassword(this.details), groupKey, ttl)

    response.subscribe((data) => {
      console.log(data)
    })
    
  }



}
