import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvehiclePage } from './invehicle.page';

const routes: Routes = [
  {
    path: '',
    component: InvehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvehiclePageRoutingModule {}
