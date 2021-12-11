import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, MenuController, Platform } from '@ionic/angular';
import { TextbookService } from '../../services/textbook.service';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-textbooklist',
  templateUrl: './textbooklist.page.html',
  styleUrls: ['./textbooklist.page.scss'],
})
export class TextbooklistPage implements OnInit { 
  textbookdata: any;
  textbookerr: any;


  constructor(private cacheService: CacheService, private loadingCtrl: LoadingController,
    private navCtrl: NavController, private textbookservice:TextbookService,
    private plt: Platform, private menuCtrl: MenuController,
    private router: Router) { }

  ngOnInit() {
    this.plt.backButton.subscribe(() => this.onBack());
    this.ListTextBook();
  }

  async ListTextBook() {
    const loading = await this.loadingCtrl.create({
      'cssClass' : 'my-custom-class',
      'message': 'Loading data. Please wait...'
    });
    await loading.present()
    var textbooklistKey = 'textbooklist';
    let ttl = 3600;
    let response = this.cacheService.loadFromObservable('textbooklist', this.textbookservice.getTextBookList(), textbooklistKey,ttl);
    response.subscribe(data => {
      console.log(data);
      this.textbookdata = data;
      loading.dismiss();
      
    }, (err) => {
      loading.dismiss();
      console.log(err);
      this.textbookerr = err;
    })
  }

  async onBack() {
    const openMenu = await this.menuCtrl.getOpen();
  if (openMenu) {
    await openMenu.close();
    } else {
      this.router.navigate(['thankyou'])
    }
  }

}
