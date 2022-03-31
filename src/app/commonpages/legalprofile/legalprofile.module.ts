import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalprofilePageRoutingModule } from './legalprofile-routing.module';

import { LegalprofilePage } from './legalprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalprofilePageRoutingModule
  ],
  declarations: [LegalprofilePage]
})
export class LegalprofilePageModule {}
