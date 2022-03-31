import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsuranceprofilePageRoutingModule } from './insuranceprofile-routing.module';

import { InsuranceprofilePage } from './insuranceprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsuranceprofilePageRoutingModule
  ],
  declarations: [InsuranceprofilePage]
})
export class InsuranceprofilePageModule {}
