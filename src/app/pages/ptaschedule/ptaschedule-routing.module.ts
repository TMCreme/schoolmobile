import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PtaschedulePage } from './ptaschedule.page';

const routes: Routes = [
  {
    path: '',
    component: PtaschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PtaschedulePageRoutingModule {}
