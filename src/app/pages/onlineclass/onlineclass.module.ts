import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineclassPageRoutingModule } from './onlineclass-routing.module';

import { OnlineclassPage } from './onlineclass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineclassPageRoutingModule
  ],
  declarations: [OnlineclassPage]
})
export class OnlineclassPageModule {}
