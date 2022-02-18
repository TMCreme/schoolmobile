import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from "@ionic/angular";
import { CookieService } from "ngx-cookie-service";
import moment from "moment";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { ManagementbayService } from 'src/app/services/managementbay.service';
import { CacheService } from 'ionic-cache';



@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.page.html',
  styleUrls: ['./addevent.page.scss'],
})
export class AddeventPage implements OnInit {

  event = {
    title : "",
    notes: "",
    startTime: new Date().toJSON(),
    endTime: new Date().toJSON(),
    allDay: false,
    room: {}
};
minDate = new Date().toISOString();
room$ = of([{id: "room1", name:"room1"}, {id:"room2",name:"room2"},{id:"room3",name:"room3"}])


  constructor(
    private router: Router, private navParams: NavParams,
        private modalCtrl: ModalController, 
        private cookieService: CookieService,
        private mgtService: ManagementbayService,
        private cache: CacheService,
        private loading: LoadingController,
  ) {
    // let preselectedDate = moment(this.cookieService.get("selectedDay")).format();
    //     this.event.startTime = preselectedDate;
    //     this.event.endTime = preselectedDate;
   }

  ngOnInit() {
  }

  
  cancel(){
    this.modalCtrl.dismiss()
}

async save(){
  const loading = await this.loading.create({
    cssClass: 'my-login-class',
    message: 'Please wait....',
  });
  await loading.present()
  console.log(this.event.startTime)
  var data = JSON.stringify({
    "title" :this.event.title,
    "start_date": this.event.startTime,
    "end_date": this.event.endTime,
    "meeting_agenda": this.event.notes
  })
  console.log(data)
  let response = this.cache.loadFromObservable("parentviewstudentlist",
    this.mgtService.savepatschedule(data), "addptaschedule", 5);

    response.subscribe(data => {
      if (data.status == "success") {
        this.router.navigate(["adminportal"])
      }
      console.log(data);
      loading.dismiss();
    })
  this.modalCtrl.dismiss();
    
}

blockDay($event) {
    console.log($event)
}

optionSelected($event){
    console.log($event);
    this.event.room = $event;
}

}
