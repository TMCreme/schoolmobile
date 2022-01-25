import { Injectable } from '@angular/core';
import Peer  from 'peerjs';

const constraints: MediaStreamConstraints = {video: true, audio: false};

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peer: Peer;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  partnerObjects: Array<HTMLMediaElement>;

  stun = "turn:34.244.178.106:3478?transport=tcp";
  mediaConnection: Peer.MediaConnection;
  options: Peer.PeerJSOption;
  stunServer: RTCIceServer = {
    urls: [this.stun],
    username: "root",
    credential: "password"
  }

  constructor() { 
    this.options = {  // not used, by default it'll use peerjs server
      key: 'cd1ft79ro8g833di',
      debug: 3,
    };
  }

  async getMedia() {
    var constraints = { audio: true, video: true }; 
    var stream1 = await navigator.mediaDevices.getUserMedia(constraints)
    this.myStream = stream1;
    console.log(this.myStream)
    this.handleSuccess(stream1)
    // await navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    //   console.log(stream);
    //   this.myStream = stream;
    //   this.myEl.srcObject = stream
    //   this.handleSuccess(stream);
    // }, (error) => {
    //   this.handleError(error);
    // }).catch(function(error1) {
    //   console.log(error1)
      // this.handleError(error1);
    // });
  }

  async initservice(userId: string, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    console.log(this.partnerObjects)
    try {
      this.getMedia();
    } catch(e) {
      this.handleError(e)
    }
    await this.createPeer(userId);
  }
// problematic function to resolve
  async createPeer(userId: string) {
    this.peer = new Peer(userId, {
      config: { "iceServers" : [
       { "urls": ["turn:34.244.178.106:3478?transport=tcp"],"username":"root","credential":"password"}
      ]}
    });
    console.log(this.peer);
    this.peer.on('open', () => {
      console.log("Callig the wait function")
      this.wait()
    });
  }


  call(partnerId:string) {
    console.log(partnerId);
    const call = this.peer.call(partnerId, this.myStream);
    call.on('stream', (stream) => {
      console.log("Calling the Stream")
      this.partnerEl.srcObject = stream;
    })
  }

  wait() {
    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        console.log("Waiting for the call to connect")
        this.partnerEl.srcObject = stream;
      });
    });
  }


  handleSuccess(stream: MediaStream) {
    console.log("Success handling starting")
    this.myStream = stream;
    this.myEl.srcObject = stream
    console.log("Success handling complete")
  }

  handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      // const v = constrain
      this.errorMsg('The resolution px is not supported by your device')
    }else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and microphone, \
      you need to allow the page access to your devices in order for this to work')
    }
    this.errorMsg(`getUserMedia error: ${error.name} :`, error)
  }

  errorMsg(msg: string, error?:any) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.log(error);
    }else {
      console.log("Some error happening....", error)
    }
  }
}




