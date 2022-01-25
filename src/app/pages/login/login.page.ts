import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { CacheService } from 'ionic-cache';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  login_details;
  error_messages = {
    'email': [
      {type: 'required', message:'Email is required'},
      {type: 'minlength', message: 'Email length must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Email length must be less than or equal to 50 characters.'},
      {type: 'pattern', message: 'Please enter a valid email address.'}
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Password must be less than or equal to 30 characters.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ],
  }
  user: any;

  constructor(private loadingController: LoadingController,
    private base: BaseService, public cacheService: CacheService,
    private cookieService: CookieService, private router: Router,
    public formBuilder: FormBuilder, ) { 
      this.loginform = this.formBuilder.group({
        username: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])),
        email: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9_.*-]+@[a-zA-Z0-9-]*.[a-zA-Z0-9-.]+$')
        ]))
      });
     
    }


  ngOnInit() {
  }

  async LoginUser() {
    const loading = await this.loadingController.create({
      cssClass: 'my-login-class',
      message: 'Getting User. Please wait',
    });
    await loading.present()
    let groupKey = "userauthdata";
    let ttl = 3;
    this.user = JSON.stringify({"username":this.loginform.value.username, "password":this.loginform.value.password})
    
    // this.base.login(this.user)
    let response = this.cacheService.loadFromObservable("userauthdata"+String(this.user),
    this.base.login(this.user), groupKey, ttl)
    response.subscribe((data) => {
      console.log(data)
      if (data.status=='success') {
        this.cookieService.set('token', data['token']);
        this.cookieService.set('organization', data["organization"])
        this.loginform.reset();
        this.router.navigate(["directory"])
        loading.dismiss();

      }else {
        console.log(data.error);
        this.cacheService.removeItem("userauthdata");
        loading.dismiss();
        alert("Login Error:  " + data.error)
      }
    })

  }

}