import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminlistclassPageRoutingModule } from './adminlistclass-routing.module';

import { AdminlistclassPage } from './adminlistclass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminlistclassPageRoutingModule
  ],
  declarations: [AdminlistclassPage]
})
export class AdminlistclassPageModule {}
