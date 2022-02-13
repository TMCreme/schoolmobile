import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherstudentlistPage } from './teacherstudentlist.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherstudentlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherstudentlistPageRoutingModule {}
