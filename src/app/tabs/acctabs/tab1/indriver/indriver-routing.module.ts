import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndriverPage } from './indriver.page';

const routes: Routes = [
  {
    path: '',
    component: IndriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndriverPageRoutingModule {}
