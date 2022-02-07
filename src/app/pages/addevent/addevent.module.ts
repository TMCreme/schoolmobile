import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeventPageRoutingModule } from './addevent-routing.module';

import { AddeventPage } from './addevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddeventPageRoutingModule
  ],
  declarations: [AddeventPage]
})
export class AddeventPageModule {}
