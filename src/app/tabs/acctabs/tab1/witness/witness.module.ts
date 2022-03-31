import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WitnessPageRoutingModule } from './witness-routing.module';

import { WitnessPage } from './witness.page';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { TranslateConfigService } from 'src/app/translate-config.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WitnessPageRoutingModule
  ],
  providers: [
    TranslateConfigService,
    MediaCapture,Camera

  ],
  declarations: [WitnessPage,]
})
export class WitnessPageModule {}
