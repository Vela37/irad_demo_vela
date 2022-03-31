import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';

import { MasterupdateComponent } from './masterupdate/masterupdate.component';
import {MasterinsertComponent } from './masterinsert/masterinsert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule
  ],
  declarations: [MasterPage,MasterupdateComponent,MasterinsertComponent],
  entryComponents: [MasterupdateComponent,MasterinsertComponent]
})
export class MasterPageModule {}
