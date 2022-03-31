import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationinfoPage } from './stationinfo.page';

const routes: Routes = [
  {
    path: '',
    component: StationinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationinfoPageRoutingModule {}
