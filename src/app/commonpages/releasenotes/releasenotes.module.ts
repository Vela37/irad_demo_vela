import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleasenotesPageRoutingModule } from './releasenotes-routing.module';

import { ReleasenotesPage } from './releasenotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleasenotesPageRoutingModule
  ],
  declarations: [ReleasenotesPage]
})
export class ReleasenotesPageModule {}
