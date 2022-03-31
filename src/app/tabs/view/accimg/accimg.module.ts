import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, Platform } from '@ionic/angular';
import { AccimgPage } from './accimg.page';

import { RouterModule } from '@angular/router';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AccimgPage }]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
    
  providers:[VideoPlayer, InAppBrowser,Platform,
    TranslateConfigService],
  declarations: [AccimgPage]
})
export class AccimgPageModule {}
