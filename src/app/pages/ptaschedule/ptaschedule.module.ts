import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PtaschedulePageRoutingModule } from './ptaschedule-routing.module';

import { PtaschedulePage } from './ptaschedule.page';

import { CalendarModule  } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PtaschedulePageRoutingModule,
    CalendarModule
  ],
  declarations: [PtaschedulePage]
})
export class PtaschedulePageModule {}
