import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminportalPageRoutingModule } from './adminportal-routing.module';

import { AdminportalPage } from './adminportal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminportalPageRoutingModule
  ],
  declarations: [AdminportalPage]
})
export class AdminportalPageModule {}
