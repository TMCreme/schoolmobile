import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpasswordresetPageRoutingModule } from './adminpasswordreset-routing.module';

import { AdminpasswordresetPage } from './adminpasswordreset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    AdminpasswordresetPageRoutingModule
  ],
  declarations: [AdminpasswordresetPage]
})
export class AdminpasswordresetPageModule {}
