import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { DarreportsPageRoutingModule } from './darreports-routing.module';

import { DarreportsPage } from './darreports.page';
import { DarlinksComponent } from './darlinks/darlinks.component';
import { SumbitformsComponent } from './sumbitforms/sumbitforms.component';

import { DarlinksumbittedComponent } from './darlinksumbitted/darlinksumbitted.component';
import { UpdaredarComponent } from './updaredar/updaredar.component';
import { DarhelpComponent } from './darhelp/darhelp.component';
import { RequestextensionComponent } from './requestextension/requestextension.component';
import {ExaminationComponent  } from './examination/examination.component';

import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
// pdf
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/shared.service';
import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { environment } from 'src/environments/environment';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarreportsPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService,InAppBrowser,PreviewAnyFile,FileOpener,FileTransfer],
  declarations: [DarreportsPage,DarlinksComponent,SumbitformsComponent,DarlinksumbittedComponent,UpdaredarComponent,DarhelpComponent,RequestextensionComponent,ExaminationComponent],
  entryComponents: [DarlinksComponent,SumbitformsComponent,DarlinksumbittedComponent,UpdaredarComponent,DarhelpComponent,RequestextensionComponent,ExaminationComponent]
})
export class DarreportsPageModule {}
