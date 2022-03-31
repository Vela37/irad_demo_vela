import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';

import { NavController, Platform } from '@ionic/angular';
import { MapPage } from './map.page';

/*  Language Translation  */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../app.module';
/* -------------------------  */


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Geolocation,Screenshot,TranslateConfigService,Platform
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
