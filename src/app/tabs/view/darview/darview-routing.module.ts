import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DarviewPage } from './darview.page';

const routes: Routes = [
  {
    path: '',
    component: DarviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DarviewPageRoutingModule {}
