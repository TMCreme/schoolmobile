import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateuserPageRoutingModule } from './createuser-routing.module';

import { CreateuserPage } from './createuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateuserPageRoutingModule
  ],
  declarations: [CreateuserPage]
})
export class CreateuserPageModule {}
