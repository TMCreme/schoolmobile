import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // if ()
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
    { title: 'Add User', url: '/createuser', icon: 'person-add' },
  ];
  public labels = ['Version 1'];
  constructor() {}

  
}
