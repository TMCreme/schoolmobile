import { Component, ElementRef, OnInit } from '@angular/core';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Platform } from '@ionic/angular';
import { initialize } from '@ionic/core';

import { io } from 'socket.io-client';
import { WebrtcService } from 'src/app/services/webrtc.service';



declare var RTCMultiConnection;

@Component({
  selector: 'app-onlineclass',
  templateUrl: './onlineclass.page.html',
  styleUrls: ['./onlineclass.page.scss'],
})
export class OnlineclassPage implements OnInit {
  topVideoFrame = 'partner-video';
  userId: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  constructor(private diagnostic: Diagnostic,
    private platform: Platform, public webRTC: WebrtcService,
    public elRef: ElementRef) { }

  ngOnInit() {
    // this.myEl = this.elRef.nativeElement.querySelector("#my-video");
    // this.partnerEl = this.elRef.nativeElement.querySelector("#partner-video");
  //   // this.platform.ready().then(() => {
  //   // console.log('ready');
  // });
  }


  init() {
    this.myEl = this.elRef.nativeElement.querySelector("#my-video");
    this.partnerEl = this.elRef.nativeElement.querySelector("#partner-video");
    console.log(this.myEl);
    console.log(this.partnerEl)
    this.webRTC.initservice(this.userId, this.myEl, this.partnerEl);
  }

  call() {
    this.webRTC.call(this.partnerId);
    this.swapVideo('my-video');
  }

  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }

  

 






}
