import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.page.html',
  styleUrls: ['./adminportal.page.scss'],
})
export class AdminportalPage implements OnInit {
  retrievedUsers: [];
  constructor(private cookieService: CookieService, private cache: CacheService,
    private loading: LoadingController, private userService: UserService) { }

  ngOnInit() {
  }

}
