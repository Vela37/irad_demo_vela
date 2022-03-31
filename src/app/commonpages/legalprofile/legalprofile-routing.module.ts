import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalprofilePage } from './legalprofile.page';

const routes: Routes = [
  {
    path: '',
    component: LegalprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalprofilePageRoutingModule {}
