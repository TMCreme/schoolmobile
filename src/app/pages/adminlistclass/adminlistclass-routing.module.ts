import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminlistclassPage } from './adminlistclass.page';

const routes: Routes = [
  {
    path: '',
    component: AdminlistclassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminlistclassPageRoutingModule {}
