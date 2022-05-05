import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ModalController, LoadingController } from "@ionic/angular";
import { CacheService } from 'ionic-cache';
import { ManagementbayService } from 'src/app/services/managementbay.service';
import { AddeventPage } from '../addevent/addevent.page';



@Component({
  selector: 'app-ptaschedule',
  templateUrl: './ptaschedule.page.html',
  styleUrls: ['./ptaschedule.page.scss'],
})
export class PtaschedulePage implements OnInit {
  loadedmettings;
  selectedDay = new Date();
  selectedObject;
  eventSource = [];
  viewTitle;
  isToday: boolean;
  calendarModes = [
    {key:"month", value: "Month"},
    {key: "week", value: "Week"},
    {key: "day", value: "Day"},
  ]

  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date()
  };

  constructor(private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController, private loading: LoadingController,
    private cache: CacheService, private mgtService: ManagementbayService) { }

  ngOnInit() {
    this.loadEvents()
  }



  async loadEvents(){
    // getptaschedule\
    const loading = await this.loading.create({
      cssClass: 'my-login-class',
      message: 'Please wait....',
    });
    await loading.present()
    let response = this.cache.loadFromObservable("ptaschedulelist",
    this.mgtService.getptaschedule(), "ptaschedulelist", 3)

    response.subscribe(data => {
      console.log(data)
      if (data.status == "success") {
        this.loadedmettings = data.data
        loading.dismiss()
      }else {

      }

    })
    console.log()
  }

  onEventSelected(event){
    console.log("Event Selected: " + event.startTime + "-" + event.endTime+","+event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today(){
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log("Selected Time: "+ev.selectedTime+", hasEvents: "+
    (ev.events!==undefined && ev.events.length!==0)+", disabled: "+ev.disabled);
    this.selectedObject = ev;
  }

  onCurrentDateChanged(event: Date) {
    console.log(event)
    var today = new Date();
    today.setHours(0,0,0,0);
    event.setHours(0,0,0,0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event;
  }

  onRangeChanged(ev) {
    console.log("Range change: StartTime: "+ev.startTime+", endTime: "+ev.endTime);
  }

  markDisabled(date: Date) {
    var current = new Date();
    current.setHours(0,0,0);
    return (date < current);
  }

  async openActionSheet(event) {
    console.log("Opening Action Sheet");
    let actionsheet = await this.actionSheetCtrl.create({
      header: "Choose Option",
      buttons:[
        {
          text: "Block Date",
          handler: () => {
            console.log("Block Date Clicked: ", event);
            let d = event.selectedTime;
            setTimeout( () => {
              this.blockDayEvent(d)
            }, 2);
          },
        },

        {
          text: "Meet up with",
          handler: function() {
            console.log("meet up with Clicked")
          }
        }
      ]
    }); actionsheet.present();
  }

// Blocking day event is not implemented because I have no need for it yet.
  blockDayEvent(date){
    let startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    console.log(startTime);
  }

  async addEvent() {
    let modal = await this.modalCtrl.create({
      component: AddeventPage,
      componentProps: {selectedDay: this.selectedDay }
    });
    modal.present();

    const data = await modal.onWillDismiss();
    if (data) {
      let eventData = data;

      // eventData.startTime = new Date(data.startTime);
    }


  }

}





