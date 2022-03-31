import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnvroadPage } from './envroad.page';

const routes: Routes = [
  {
    path: '',
    component: EnvroadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvroadPageRoutingModule {}
