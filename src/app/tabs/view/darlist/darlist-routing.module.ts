import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DarlistPage } from './darlist.page';

const routes: Routes = [
  {
    path: '',
    component: DarlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DarlistPageRoutingModule {}
