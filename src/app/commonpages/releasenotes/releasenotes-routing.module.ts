import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleasenotesPage } from './releasenotes.page';

const routes: Routes = [
  {
    path: '',
    component: ReleasenotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasenotesPageRoutingModule {}
