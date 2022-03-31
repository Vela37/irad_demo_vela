import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InpedestrianPage } from './inpedestrian.page';

const routes: Routes = [
  {
    path: '',
    component: InpedestrianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InpedestrianPageRoutingModule {}
