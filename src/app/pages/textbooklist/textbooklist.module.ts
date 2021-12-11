import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextbooklistPageRoutingModule } from './textbooklist-routing.module';

import { TextbooklistPage } from './textbooklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextbooklistPageRoutingModule
  ],
  declarations: [TextbooklistPage]
})
export class TextbooklistPageModule {}
