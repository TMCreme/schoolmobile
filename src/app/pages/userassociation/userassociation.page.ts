import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from 'src/app/services/base.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-userassociation',
  templateUrl: './userassociation.page.html',
  styleUrls: ['./userassociation.page.scss'],
})
export class UserassociationPage implements OnInit {
  userassociationForm: FormGroup;
  studentForm: FormGroup;
  teacherForm: FormGroup;
  parentsorguardianForm: FormGroup;

  error_messages = {
    'level':[
      {type: 'required', message:'Level is required'},
    ],
  }

  formData: any[] = []
  userType: any;
  userTypeForm: FormGroup;
  studentdata;
  title = "Fiala";
  constructor(private cache: CacheService, private formBuilder: FormBuilder,
    private router: Router, private cookieService: CookieService,
    private base: BaseService, private loading: LoadingController) {
      this.userType = this.cookieService.get("addedusergroup");
    let form = {};

    if (this.userType == "ParentOrGuardian") {
      this.title = "Fiala - Whose Parent";
      let studentlist = this.cache.loadFromObservable("adminstudentlist",this.base.adminstudentlist(),
      "adminstudentlistview",3)
      studentlist.subscribe(data => {
        this.studentdata = data.data
        this.formData = [{"options":this.studentdata}]
      })
      this.userTypeForm = this.formBuilder.group({
        dynamicval: new FormControl("")
      })
    }else if (this.userType == "Student") {
      this.title = "Fiala";
      let studentclass = this.cache.loadFromObservable("adminlevellist",this.base.adminlevellist(),
      "adminlevellistview",3);
      studentclass.subscribe(data => {
        this.studentdata = data.data
        this.formData = [{"options":this.studentdata}]
      })
      this.userTypeForm = this.formBuilder.group({
        dynamicval: new FormControl("")
      })
    }
  }

    //  }

  ngOnInit() {
    this.welcomefunc()
    // this.cookieService.delete("parentname")
  }

  async welcomefunc() {
    console.log(this.cookieService.get("parentname"));
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    loading.dismiss(this.studentdata)
  }

  async onSubmit(){
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    console.log(this.userTypeForm.value.dynamicval);
    if (this.title == "Fiala - Whose Parent") {
      var studentlinkparentdata = JSON.stringify({
        "student" : this.userTypeForm.value.dynamicval,
        "parent" : this.cookieService.get("parentname")
      })
      this.base.studentparentlink(studentlinkparentdata).subscribe(data => {
        console.log(data);
        if (data.status == "success"){
          this.cookieService.delete("parentname")
          loading.dismiss()
          this.router.navigate(["directory"])
        }else {
          loading.dismiss()
        }
      })
    }else if (this.title = "Fiala - Which Class") {
      var studentlinkleveldata = JSON.stringify({
        "levelname" : this.userTypeForm.value.dynamicval,
        "studentname" : this.cookieService.get("studentname"),
        "organization": this.cookieService.get("organization")
      })
      this.base.adminstudentlevelupdate(studentlinkleveldata).subscribe(data => {
        console.log(data);
        if (data.status == "success"){
          this.cookieService.delete("studentname")
          loading.dismiss()
          this.router.navigate(["directory"])
        }else {
          loading.dismiss()
          console.log(data);
          alert(data);
        }
      });
    }

  }

}
