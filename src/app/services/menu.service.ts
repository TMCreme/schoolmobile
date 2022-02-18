import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public appPages = [
    { title: 'Admin', url: '/adminportal', icon: 'paper-plane' },
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/ptaschedule', icon: 'heart' },
    { title: 'Add User', url: '/createuser', icon: 'person-add' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ];
  public studentPages = [
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]
  public parentPages = [
    { title: 'Parent', url: '/parentportal', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]
  public teacherPages = [
    { title: 'Teacher', url: '/teacherportal', icon: 'paper-plane' },
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
  ]
  constructor(private cookieService: CookieService) { }

  dynamicMenu() {
    var userRole = this.cookieService.get("usergroup")
    console.log(userRole)
    if (userRole=="Student"){
      return this.studentPages
    } else if (userRole=="Teacher"){
      return this.teacherPages
    }else if (userRole=="ParentOrGuardian"){
      return this.parentPages
    }else if (userRole=="SchoolAdmin"){
      return this.appPages
    }
  }
}
