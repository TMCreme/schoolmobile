import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineclassPage } from './onlineclass.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineclassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineclassPageRoutingModule {}
