import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngeneralPage } from './ingeneral.page';

const routes: Routes = [
  {
    path: '',
    component: IngeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngeneralPageRoutingModule {}
