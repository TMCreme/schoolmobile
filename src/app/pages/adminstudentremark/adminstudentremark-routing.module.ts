import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminstudentremarkPage } from './adminstudentremark.page';

const routes: Routes = [
  {
    path: '',
    component: AdminstudentremarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminstudentremarkPageRoutingModule {}
