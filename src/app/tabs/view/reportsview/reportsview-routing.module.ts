import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsviewPage } from './reportsview.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsviewPageRoutingModule {}
