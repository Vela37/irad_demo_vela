import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolepersonalizationPage } from './rolepersonalization.page';

const routes: Routes = [
  {
    path: '',
    component: RolepersonalizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
}) 
export class RolepersonalizationPageRoutingModule {}
