import { Component, OnInit } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdminpasswordresetPage } from '../adminpasswordreset/adminpasswordreset.page';
import { AdminstudentremarkPage } from '../adminstudentremark/adminstudentremark.page';



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
    private router: Router, private modalCtrl: ModalController) { }

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

  async presentActionSheet(user, group) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Reset Password: '+ user,
        icon: 'create',
        handler: () => {
          console.log('Change User Password for ', user);
          this.cookieService.set("userpasswordreset", user)
          this.openPasswordModal()
          // this.router.navigate(["adminpasswordreset/", user]);
        }
      },
      {
        text: 'Add Remark : '+ user,
        icon: 'create',
        handler: () => {
          if (group == "Student"){
            console.log('Remark for Student:  ', user);
            this.cookieService.set("adminremarkforstudent", user)
            this.openRemarkModal()
            // this.router.navigate(["adminpasswordreset/", user]);
          }else {
            alert("The user is not a student")
            actionSheet.dismiss()
          }          
        }
      },
      {
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
    console.log('onDidDismiss resolved with role and data ' + user + " " + role);
  }



  async openPasswordModal() {
    let modal = await this.modalCtrl.create({
      component: AdminpasswordresetPage,
      componentProps: {selectedDay: "this.selectedDay" }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if (data) {
      let eventData = data;
      console.log(data)
      // eventData.startTime = new Date(data.startTime);
    }


  }

  async openRemarkModal() {
    let modal = await this.modalCtrl.create({
      component: AdminstudentremarkPage,
    });
    modal.present();

    const data = await modal.onDidDismiss();
    if (data) {
      let remarkdata = data;
      console.log(data);
    }
  }



  

}
