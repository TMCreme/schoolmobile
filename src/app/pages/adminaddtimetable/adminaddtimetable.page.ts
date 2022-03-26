import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CacheService } from 'ionic-cache';
import { ManagementbayService } from 'src/app/services/managementbay.service';

@Component({
  selector: 'app-adminaddtimetable',
  templateUrl: './adminaddtimetable.page.html',
  styleUrls: ['./adminaddtimetable.page.scss'],
})
export class AdminaddtimetablePage implements OnInit {

  @Input("level") level;
  file;
  timtablefile;
  constructor(
    private modalCtrl: ModalController,
    private cookieService: CookieService,
    private loading: LoadingController,
    private router: Router, private cache: CacheService,
    private mgtService: ManagementbayService
  ) { }

  ngOnInit() {
  }

  onFileChange(fileChangeEvent) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(fileChangeEvent.target.files[0]);
    
    fileReader.onload = () => {
      // console.log(fileReader.result)
      this.file = fileReader.result;
    }
  }

  cancel() {
    this.modalCtrl.dismiss()
  }

  async uploadtimetable (){
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present();
    var data = JSON.stringify({
      "school" : this.cookieService.get("organization"),
      "level" : this.level,
      "file" : this.file
    });
    let response = this.cache.loadFromObservable("admintimetableupload", 
    this.mgtService.adminaddtimetableview(data), "admintimetableupload", 3)

    response.subscribe(results => {
      if (results.status == "success") {
        console.log(results)
        loading.dismiss()
        this.modalCtrl.dismiss()
      } else {
        console.log(results)
        loading.dismiss()
        this.modalCtrl.dismiss()
      }
    })


  }

}
