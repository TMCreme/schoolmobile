import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserassociationPage } from './userassociation.page';

const routes: Routes = [
  {
    path: '',
    component: UserassociationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserassociationPageRoutingModule {}
