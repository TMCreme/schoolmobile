import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from 'src/app/services/base.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CacheService } from 'ionic-cache';



@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.page.html',
  styleUrls: ['./createuser.page.scss'],
})
export class CreateuserPage implements OnInit {

  registerForm: FormGroup;
  register_detils;
  data: Observable<any>;
  
  error_messages = {
    'username':[
      {type: 'required', message:'Username is required'},
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be longer than or equal to 6 characters.'},
      {type: 'maxlength', message: 'Password must be less than or equal to 30 characters.'},
      {type: 'pattern', message: 'Password must contain numbers and lowercase characters.'}
    ],
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, 
    private base: BaseService, private cookieService: CookieService, 
    private router: Router, private cache: CacheService) { 
      this.registerForm = this.formBuilder.group({
        username: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        password: new FormControl("", Validators.compose([
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern("^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ])),
        password2: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        usertype: new FormControl("", Validators.compose([
          Validators.required,
        ]))
      });
    }
    public user: any;


  ngOnInit() {
  }

  registration(){
    // console.log(this.registerForm.value.usertype);
    var organization_name = this.cookieService.get("organization");
    this.user = JSON.stringify({
     "registration" : {
      "username": this.registerForm.value.username,
      "password": this.registerForm.value.password,
     },
     "organization": {
       "name" : organization_name,
       "group": this.registerForm.value.usertype
     }
    });
    this.base.userCreation(this.user).subscribe((data) => {
      console.log(data);
      this.data = data.message;
      this.cookieService.set("addedusergroup", this.registerForm.value.usertype)
      if (this.registerForm.value.usertype != "SchoolAdmin" || 
      this.registerForm.value.usertype != "Teacher"){
        if (this.registerForm.value.usertype == "ParentOrGuardian") {
          this.cookieService.set("parentname", this.registerForm.value.username)
        }else if (this.registerForm.value.usertype == "Student"){
          this.cookieService.set("studentname", this.registerForm.value.username)
        }
        this.router.navigate(["userassociation"])
      }else {
        this.router.navigate(['directory'])
      }
      this.registerForm.reset();
      
    }, (error) => {
      console.log(error)
      this.data = error.error;
      alert(this.data);
    });
  }

}
