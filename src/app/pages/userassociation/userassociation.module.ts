import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserassociationPageRoutingModule } from './userassociation-routing.module';

import { UserassociationPage } from './userassociation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserassociationPageRoutingModule
  ],
  declarations: [UserassociationPage]
})
export class UserassociationPageModule {}
