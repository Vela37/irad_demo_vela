import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestigationPageRoutingModule } from './investigation-routing.module';

import { InvestigationPage } from './investigation.page';
import { InvestgeneralComponent } from '../../view/edit/investgeneral/investgeneral.component';
import { InvestpedestrianComponent } from '../../view/edit/investpedestrian/investpedestrian.component';
import { AddfamilyComponent } from '../../view/edit/addfamily/addfamily.component';
import { AddchildComponent } from '../../view/edit/addchild/addchild.component';

import { InvestvehicleComponent } from '../../view/edit/investvehicle/investvehicle.component';
import { InvestpassengerComponent } from '../../view/edit/investpassenger/investpassenger.component'; 
import { AddwitnessComponent } from '../../view/edit/addwitness/addwitness.component';
//import { UploaddocComponent } from '../../view/edit/uploaddoc/uploaddoc.component';
import { GuploadComponent } from '../../view/edit/gupload/gupload.component';
import { InvestdocumentsComponent } from '../../view/edit/investdocuments/investdocuments.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FileChooser} from '@ionic-native/file-chooser/ngx'
import { FilePath} from '@ionic-native/file-path/ngx'
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ReportrequirementComponent} from '../../view/reportsview/reportrequirement/reportrequirement.component';
import { UploadingdocumentComponent} from '../../view/reportsview/uploadingdocument/uploadingdocument.component';

import { AddcourtdataComponent } from '../../view/edit/addcourtdata/addcourtdata.component';
import { AddlegaladataComponent } from '../../view/edit/addlegaladata/addlegaladata.component';
import { AddinsurancedataComponent } from '../../view/edit/addinsurancedata/addinsurancedata.component';



import { InsurancevictimComponent } from 'src/app/tabs/policeinvestigation/insurancevictim/insurancevictim.component';
import { InsurancevehicleComponent } from 'src/app/tabs/policeinvestigation//insurancevehicle/insurancevehicle.component';
import { LegalservicegenralComponent } from 'src/app/tabs/policeinvestigation//legalservicegenral/legalservicegenral.component';
import { LegalservicesecondComponent } from 'src/app/tabs/policeinvestigation//legalservicesecond/legalservicesecond.component';
import { LegalservicethirdComponent } from 'src/app/tabs/policeinvestigation//legalservicethird/legalservicethird.component';
//import { Darform13Component } from 'src/app/components/darform13/darform13.component';
//import { Darform14Component } from 'src/app/components/darform14/darform14.component';
import { Form15Component } from 'src/app/components/form15/form15.component';
//import { Form16Component } from 'src/app/components/form16/form16.component';
import { Form17Component } from 'src/app/components/form17/form17.component';
import { Form18Component } from 'src/app/components/form18/form18.component';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestigationPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }) 
  ],
  providers:[InAppBrowser,FilePath,FileChooser,Base64,File,FileTransfer,FileOpener,DocumentViewer,MediaCapture,DocumentViewer],
  declarations: [AddinsurancedataComponent,AddlegaladataComponent,AddcourtdataComponent,ReportrequirementComponent,UploadingdocumentComponent,GuploadComponent,InvestigationPage,InvestgeneralComponent,AddchildComponent,InvestpassengerComponent,AddfamilyComponent,InvestpedestrianComponent,InvestvehicleComponent,AddwitnessComponent,InvestdocumentsComponent,
    InsurancevictimComponent,InsurancevehicleComponent,LegalservicegenralComponent,LegalservicesecondComponent,LegalservicethirdComponent,Form15Component,Form17Component,Form18Component],
  entryComponents: [AddinsurancedataComponent,AddlegaladataComponent,AddcourtdataComponent,ReportrequirementComponent,UploadingdocumentComponent,GuploadComponent,InvestgeneralComponent,InvestpassengerComponent,AddchildComponent,AddfamilyComponent,InvestpedestrianComponent,InvestvehicleComponent,AddwitnessComponent,InvestdocumentsComponent,
    InsurancevictimComponent,InsurancevehicleComponent,LegalservicegenralComponent,LegalservicesecondComponent,LegalservicethirdComponent,Form15Component,Form17Component,Form18Component]
})
export class InvestigationPageModule {}
