import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MenuService } from './services/menu.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages;
  // public appPages = 
  public labels = ['Version 1'];
  constructor(public cookieService: CookieService, public menu: MenuService) {}
  
  ngOnInit() {
    this.appPages = this.menu.dynamicMenu()
    // console.log(this.menu.dynamicMenu())
  }
}
