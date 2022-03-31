import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule,NavController , Platform } from '@ionic/angular';

import { HospitalrequestPageRoutingModule } from './hospitalrequest-routing.module';

import { HospitalrequestPage } from './hospitalrequest.page';


import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

import { AccmappingComponent  } from '../edit/accmapping/accmapping.component';
import { ForwardingComponent  } from '../edit/forwarding/forwarding.component';


export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalrequestPageRoutingModule,
    RouterModule.forChild([{ path: '', component: HospitalrequestPage }]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers:[NavController,Platform,InAppBrowser,DocumentViewer,
    TranslateConfigService],
  declarations: [HospitalrequestPage,AccmappingComponent,ForwardingComponent],
  entryComponents: [HospitalrequestPage,AccmappingComponent,ForwardingComponent]
})
export class HospitalrequestPageModule {}
