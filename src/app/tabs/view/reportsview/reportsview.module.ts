import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsviewPageRoutingModule } from './reportsview-routing.module';

import { ReportsviewPage } from './reportsview.page';


import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController , Platform } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { UploadComponent } from '../reportsview/upload/upload.component';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsviewPageRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers:[NavController,Platform,InAppBrowser,PreviewAnyFile,FileChooser,FilePath,FileOpener,File,FileTransfer,
    TranslateConfigService],
  declarations: [ReportsviewPage,UploadComponent],
  entryComponents:[UploadComponent]
})
export class ReportsviewPageModule {}
