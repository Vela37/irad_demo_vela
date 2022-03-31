import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VictimtabsPage } from './victimtabs.page';

const routes: Routes = [
  {
    path: '',
    component: VictimtabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimtabsPageRoutingModule {}
