import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceprofilePage } from './insuranceprofile.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceprofilePageRoutingModule {}
