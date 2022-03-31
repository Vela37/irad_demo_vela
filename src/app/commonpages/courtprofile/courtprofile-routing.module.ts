import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourtprofilePage } from './courtprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CourtprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtprofilePageRoutingModule {}
