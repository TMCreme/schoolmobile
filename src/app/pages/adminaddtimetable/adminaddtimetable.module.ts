import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminaddtimetablePageRoutingModule } from './adminaddtimetable-routing.module';

import { AdminaddtimetablePage } from './adminaddtimetable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminaddtimetablePageRoutingModule
  ],
  declarations: [AdminaddtimetablePage]
})
export class AdminaddtimetablePageModule {}
