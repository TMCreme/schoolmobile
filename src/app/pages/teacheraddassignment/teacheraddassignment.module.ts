import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacheraddassignmentPageRoutingModule } from './teacheraddassignment-routing.module';

import { TeacheraddassignmentPage } from './teacheraddassignment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacheraddassignmentPageRoutingModule
  ],
  declarations: [TeacheraddassignmentPage]
})
export class TeacheraddassignmentPageModule {}
