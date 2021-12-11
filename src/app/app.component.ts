import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Directories', url: '/directory', icon: 'paper-plane' },
    { title: 'Management Bay', url: '/folder/Favorites', icon: 'heart' },
  ];
  public labels = ['Version 1'];
  constructor() {}
}
