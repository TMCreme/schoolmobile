import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  retrievedUsers: [{"username":"", "group":""}];
  constructor(private cookieService: CookieService, private cache: CacheService,
    private loading: LoadingController, private userService: UserService,
    public actionSheetController: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
    this.loaduserlist()
  }

  async loaduserlist(){
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    let response = this.cache.loadFromObservable("adminviewuserlist",
    this.userService.userList(), "adminviewuserlist", 5)
    response.subscribe(data => {
      
      this.retrievedUsers = data.data
      console.log(this.retrievedUsers)
      loading.dismiss()
    })
  }

  async presentActionSheet(user) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Edit User',
        icon: 'create',
        handler: () => {
          console.log('Change User Password for ', user);
          this.router.navigate(["changepassword"]);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', user);
  }



  

}
