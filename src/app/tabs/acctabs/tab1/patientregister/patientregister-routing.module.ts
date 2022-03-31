import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientregisterPage } from './patientregister.page';

const routes: Routes = [
  {
    path: '',
    component: PatientregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientregisterPageRoutingModule {}
