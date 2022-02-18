import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminportalPage } from './adminportal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminportalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminportalPageRoutingModule {}
