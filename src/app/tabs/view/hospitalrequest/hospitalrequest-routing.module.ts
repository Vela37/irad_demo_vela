import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalrequestPage } from './hospitalrequest.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalrequestPageRoutingModule {}
