import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminstudentremarkPageRoutingModule } from './adminstudentremark-routing.module';

import { AdminstudentremarkPage } from './adminstudentremark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminstudentremarkPageRoutingModule
  ],
  declarations: [AdminstudentremarkPage]
})
export class AdminstudentremarkPageModule {}
