import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPageRoutingModule } from './media-routing.module';

import { MediaPage } from './media.page';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../../app.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [Camera, MediaCapture,   Base64,
    TranslateConfigService,
  ],
  declarations: [MediaPage]
})
export class MediaPageModule {}
