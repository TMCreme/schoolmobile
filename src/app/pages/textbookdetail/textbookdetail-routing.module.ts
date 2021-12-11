import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextbookdetailPage } from './textbookdetail.page';

const routes: Routes = [
  {
    path: '',
    component: TextbookdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextbookdetailPageRoutingModule {}
