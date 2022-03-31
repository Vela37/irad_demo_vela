import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsurancelistPage } from './insurancelist.page';

const routes: Routes = [
  {
    path: '',
    component: InsurancelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsurancelistPageRoutingModule {}
