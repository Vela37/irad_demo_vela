import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationPage } from './investigation.page';

const routes: Routes = [
  {
    path: '',
    component: InvestigationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestigationPageRoutingModule {}
