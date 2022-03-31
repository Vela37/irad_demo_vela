import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListrequestPage } from './listrequest.page';

const routes: Routes = [
  {
    path: '',
    component: ListrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListrequestPageRoutingModule {}
