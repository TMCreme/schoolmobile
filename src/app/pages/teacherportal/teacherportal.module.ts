import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherportalPageRoutingModule } from './teacherportal-routing.module';

import { TeacherportalPage } from './teacherportal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherportalPageRoutingModule
  ],
  declarations: [TeacherportalPage]
})
export class TeacherportalPageModule {}
