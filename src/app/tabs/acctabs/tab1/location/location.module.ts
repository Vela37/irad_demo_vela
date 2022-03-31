import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,
  ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';

import { LocationPage } from './location.page';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../../translate-config.service';
import { MapComponent } from './map/map.component';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocationPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Geolocation,Screenshot,TranslateConfigService,AndroidPermissions,LocationAccuracy,
    Screenshot,Geolocation,
  
  ],
  declarations: [LocationPage,MapComponent],
  entryComponents:[MapComponent]
})
export class LocationPageModule {}
