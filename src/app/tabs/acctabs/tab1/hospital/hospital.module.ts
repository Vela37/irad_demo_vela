import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalPageRoutingModule } from './hospital-routing.module';

import { HospitalPage } from './hospital.page';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../../app.module';



import { DropinionComponent } from '../../../../popups/dropinion/dropinion.component';
import { DeathreasonComponent  } from 'src/app/popups/deathreason/deathreason.component';
import { DdformComponent  } from 'src/app/popups/ddform/ddform.component';
import {  PatientstmtComponent } from 'src/app/popups/patientstmt/patientstmt.component';
import {  PatienthistroyComponent } from 'src/app/popups/patienthistroy/patienthistroy.component';
import { TreatmentComponent } from '../../../../popups/treatment/treatment.component';
import { MyhospitalComponent } from '../../../../popups/myhospital/myhospital.component';
import { DrcertificateComponent } from '../../../../popups/drcertificate/drcertificate.component';
import { ShowmystationComponent } from '../../../../popups/showmystation/showmystation.component';
import { PatientbodyComponent } from '../../../../popups/patientbody/patientbody.component';
//import { PmrequestComponent } from '../../../../popups/pmrequest/pmrequest.component';


//PmrequestComponent

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HospitalPageRoutingModule,
       TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService
  ],
  declarations: [HospitalPage,DropinionComponent,PatienthistroyComponent,PatientbodyComponent,ShowmystationComponent,DrcertificateComponent,PatientstmtComponent,TreatmentComponent,DeathreasonComponent,MyhospitalComponent,DdformComponent],
  entryComponents:[DropinionComponent,PatienthistroyComponent,PatientbodyComponent,ShowmystationComponent,DrcertificateComponent,PatientstmtComponent,TreatmentComponent,MyhospitalComponent,DeathreasonComponent,DdformComponent]

})
export class HospitalPageModule {}
