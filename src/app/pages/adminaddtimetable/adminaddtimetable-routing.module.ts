import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminaddtimetablePage } from './adminaddtimetable.page';

const routes: Routes = [
  {
    path: '',
    component: AdminaddtimetablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminaddtimetablePageRoutingModule {}
