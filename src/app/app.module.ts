import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CacheService, CacheModule } from 'ionic-cache';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { TextbookService } from './services/textbook.service';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { CookieService,  } from 'ngx-cookie-service';
import { BaseService } from './services/base.service';
import { AddeventPage } from './pages/addevent/addevent.page';
// import { PtaschedulePage } from './pages/ptaschedule/ptaschedule.page';
import { PtaschedulePageModule } from './pages/ptaschedule/ptaschedule.module'; 
import { CalendarModule } from 'ion2-calendar';


import Peer from 'peerjs';


// const config: SocketIoConfig = { url: 'http://localhost:8030', options: {} };

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        HttpClientModule, CacheModule.forRoot(),
        IonicStorageModule.forRoot(), CalendarModule,
        FormsModule, ReactiveFormsModule, PtaschedulePageModule],
    providers: [
        TextbookService,
        CacheService,
        HTTP,
        File,
        FileOpener,
        DocumentViewer,
        Diagnostic,
        CookieService,
        // Peer,
        ReactiveFormsModule,
        BaseService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
