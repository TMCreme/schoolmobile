import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherportalPage } from './teacherportal.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherportalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherportalPageRoutingModule {}
