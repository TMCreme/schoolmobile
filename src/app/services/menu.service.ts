import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public appPages = [
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
    { title: 'Add User', url: '/createuser', icon: 'person-add' },
  ];
  public studentPages = [
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]
  public parentPages = [
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]
  constructor(private cookieService: CookieService) { }

  dynamicMenu() {
    var userRole = this.cookieService.get("usergroup")
    console.log(userRole)
    if (userRole=="Student"){
      return this.studentPages
    } else {
      return this.appPages
    }
  }
}
