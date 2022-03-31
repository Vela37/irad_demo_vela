import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, Platform } from '@ionic/angular';


import { ListPage } from './list.page';
import { RouterModule } from '@angular/router';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { MviComponent } from '../../../popups/mvi/mvi.component'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HwmasterComponent } from '../../../popups/hwmaster/hwmaster.component';
import { MvifileuploadComponent } from '../../../popups/mvifileupload/mvifileupload.component';

import { JirComponent } from '../../../popups/jir/jir.component';
import { UploadjirComponent } from '../../../popups/uploadjir/uploadjir.component';
import { DarinformationComponent } from '../../../popups/darinformation/darinformation.component';
import { LegalinfoComponent } from '../../../popups/legalinfo/legalinfo.component';
import { InsuranceinformationsComponent } from '../../../popups/insuranceinformations/insuranceinformations.component';


import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {FilterComponent} from "./filter/filter.component"

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule, 
    RouterModule.forChild([{ path: '', component: ListPage }]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
    
  providers:[InAppBrowser,
    TranslateConfigService, Platform,InAppBrowser,DocumentViewer,PreviewAnyFile,FileChooser,FilePath,FileOpener,File,FileTransfer,],
  declarations: [DarinformationComponent,LegalinfoComponent,InsuranceinformationsComponent,ListPage,MvifileuploadComponent,MviComponent,HwmasterComponent,JirComponent,UploadjirComponent,FilterComponent],
  entryComponents: [DarinformationComponent,LegalinfoComponent,InsuranceinformationsComponent,MvifileuploadComponent,MviComponent,HwmasterComponent,JirComponent,UploadjirComponent,FilterComponent]
})
export class ListPageModule {}
 