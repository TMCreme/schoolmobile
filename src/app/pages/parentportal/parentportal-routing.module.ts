import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentportalPage } from './parentportal.page';

const routes: Routes = [
  {
    path: '',
    component: ParentportalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentportalPageRoutingModule {}
