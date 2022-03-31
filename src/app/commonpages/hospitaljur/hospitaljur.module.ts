import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitaljurPageRoutingModule } from './hospitaljur-routing.module';

import { HospitaljurPage } from './hospitaljur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HospitaljurPageRoutingModule
  ],
  declarations: [HospitaljurPage]
})
export class HospitaljurPageModule {}
