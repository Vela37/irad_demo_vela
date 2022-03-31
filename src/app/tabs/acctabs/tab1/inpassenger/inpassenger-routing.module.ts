import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InpassengerPage } from './inpassenger.page';

const routes: Routes = [
  {
    path: '',
    component: InpassengerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InpassengerPageRoutingModule {}
