import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CacheService } from 'ionic-cache';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private cookieService: CookieService, private router: Router,
    private base: BaseService, private cache: CacheService) { }

  ngOnInit() {
    this.base.logout().subscribe((data) =>{
      console.log(data);
      if(data.status=="success"){
        this.cookieService.delete("token");
        this.cookieService.delete("usergroup");
        this.cookieService.delete("organization");
        this.cache.removeItem("userauthdata")
        this.router.navigate(["login"])
      }else{
        console.log(data);
        alert("Logout Error   "+ data.error)
      }
    })
  }

}
