import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedestrianPage } from './pedestrian.page';

const routes: Routes = [
  {
    path: '',
    component: PedestrianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedestrianPageRoutingModule {}
