import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitaljurPage } from './hospitaljur.page';

const routes: Routes = [
  {
    path: '',
    component: HospitaljurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitaljurPageRoutingModule {}
