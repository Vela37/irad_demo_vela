import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolepersonalizationPageRoutingModule } from './rolepersonalization-routing.module';

import { RolepersonalizationPage } from './rolepersonalization.page';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../app.module';
import {RoadaddComponent} from './roadadd/roadadd.component'
import {RtoaddComponent} from './rtoadd/rtoadd.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolepersonalizationPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService
  ],
  declarations: [RolepersonalizationPage,RoadaddComponent,RtoaddComponent],
  entryComponents: [RoadaddComponent,RtoaddComponent]
})
export class RolepersonalizationPageModule {}
