import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextbooklistPage } from './textbooklist.page';

const routes: Routes = [
  {
    path: '',
    component: TextbooklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextbooklistPageRoutingModule {}
