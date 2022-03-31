import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegallistPage } from './legallist.page';

const routes: Routes = [
  {
    path: '',
    component: LegallistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegallistPageRoutingModule {}
