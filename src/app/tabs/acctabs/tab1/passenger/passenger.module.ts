import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassengerPageRoutingModule } from './passenger-routing.module';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';


import { PassengerPage } from './passenger.page';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../../app.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PassengerPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService,
    MediaCapture,
  ],
  declarations: [PassengerPage]
})
export class PassengerPageModule {}

