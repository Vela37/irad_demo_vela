import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule,NavController , Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { VictimtabsPageRoutingModule } from './victimtabs-routing.module';

import { VictimtabsPage } from './victimtabs.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../app.module';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
// ----------------------- New popups

import { PatiententryComponent } from '../../view/edit/patiententry/patiententry.component';
import { PatienttreatmentComponent } from '../../view/edit/patienttreatment/patienttreatment.component';
import { PatientdocumentComponent } from '../../view/edit/patientdocument/patientdocument.component';
import { PatientreportsComponent } from '../../view/edit/patientreports/patientreports.component';
import { UploaddocComponent } from '../../view/edit/uploaddoc/uploaddoc.component';
import { SubmittingdocumentsComponent } from '../../view/edit/submittingdocuments/submittingdocuments.component';
import { HospitaldocumentsComponent } from '../../view/edit/hospitaldocuments/hospitaldocuments.component';

// import { PoliceintimationComponent } from 'src/app/popups/policeintimation/policeintimation.component';

import { PoliceintimationComponent } from 'src/app/popups/policeintimation/policeintimation.component';
import { AccidentregisterComponent } from '../../../popups/accidentregister/accidentregister.component';
import { DischargetreatmentComponent } from '../../../popups/dischargetreatment/dischargetreatment.component';
import { DrunkendrivetestComponent } from '../../../popups/drunkendrivetest/drunkendrivetest.component';
import { PostmortermreportComponent } from '../../../popups/postmortermreport/postmortermreport.component';
//import { CauseofdeathreportComponent } from '../../../popups/causeofdeathreport/causeofdeathreport.component';
import { DatePipe } from '@angular/common';

import { PmrequestComponent } from '../../../popups/pmrequest/pmrequest.component';
import { RefferComponent } from '../../../popups/reffer/reffer.component';
//import { CauseofdeathreportComponent } from '../../../popups/causeofdeathreport/causeofdeathreport.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VictimtabsPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [Platform,InAppBrowser,Base64,File,FileChooser,FilePath,DatePipe,FileChooser,FilePath,FileOpener,File,FileTransfer,
    TranslateConfigService
  ],
  declarations: [RefferComponent,PmrequestComponent,PoliceintimationComponent,PostmortermreportComponent,DrunkendrivetestComponent,DischargetreatmentComponent,AccidentregisterComponent,VictimtabsPage,PatiententryComponent,PatienttreatmentComponent,PatientdocumentComponent,HospitaldocumentsComponent,SubmittingdocumentsComponent,UploaddocComponent,PatientreportsComponent],
  entryComponents: [RefferComponent,PmrequestComponent,PoliceintimationComponent,PostmortermreportComponent,DrunkendrivetestComponent,DischargetreatmentComponent,AccidentregisterComponent,PatiententryComponent,PatienttreatmentComponent,PatientdocumentComponent,HospitaldocumentsComponent,SubmittingdocumentsComponent,UploaddocComponent,PatientreportsComponent]
})
export class VictimtabsPageModule {}
