import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListrequestPageRoutingModule } from './listrequest-routing.module';

import { ListrequestPage } from './listrequest.page';

import { RouterModule } from '@angular/router';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
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
    RouterModule.forChild([{ path: '', component: ListrequestPage }]),
    HttpClientModule,
    
    ListrequestPageRoutingModule,TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers:[ InAppBrowser,
    TranslateConfigService],  
    declarations: [ListrequestPage]
})
export class ListrequestPageModule {

}
