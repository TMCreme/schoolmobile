import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherstudentlistPageRoutingModule } from './teacherstudentlist-routing.module';

import { TeacherstudentlistPage } from './teacherstudentlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherstudentlistPageRoutingModule
  ],
  declarations: [TeacherstudentlistPage]
})
export class TeacherstudentlistPageModule {}
