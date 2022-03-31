import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import {ChangepwdComponent} from '../profile/changepwd/changepwd.component';
import {HospitaleditComponent} from '../profile/hospitaledit/hospitaledit.component';
import {ProfileupdateComponent} from '../profile/profileupdate/profileupdate.component';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import {PmjayComponent} from '../profile/pmjay/pmjay.component';
import {HpinfrastructureComponent} from '../profile/hpinfrastructure/hpinfrastructure.component';


import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService,Camera, MediaCapture,Base64,AndroidPermissions,
    Geolocation,
    LocationAccuracy,
  ],
  declarations: [PmjayComponent,HpinfrastructureComponent,ProfilePage,ChangepwdComponent,HospitaleditComponent,ProfileupdateComponent],
  entryComponents: [PmjayComponent,HpinfrastructureComponent,ChangepwdComponent,HospitaleditComponent,ProfileupdateComponent]
})
export class ProfilePageModule {}
