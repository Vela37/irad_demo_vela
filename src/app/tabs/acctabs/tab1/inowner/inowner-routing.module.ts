import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InownerPage } from './inowner.page';

const routes: Routes = [
  {
    path: '',
    component: InownerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InownerPageRoutingModule {}
