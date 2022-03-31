import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AccviewPage } from './accview.page';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GeneralComponent } from '../edit/general/general.component';
import { PedestrianComponent } from '../edit/pedestrian/pedestrian.component';
import { WitnesseditComponent } from "../edit/witnessedit/witnessedit.component";

import { VehicleComponent } from '../edit/vehicle/vehicle.component';
import { DriverComponent } from '../edit/driver/driver.component';
import { PassengerComponent } from '../edit/passenger/passenger.component';
import { TransportComponent } from '../edit/transport/transport.component';
import { RoadComponent } from '../edit/road/road.component';
import { MediaviewComponent } from '../mediaview/mediaview.component';
import { AccimgviewComponent } from '../accimgview/accimgview.component';
import { DdrequestComponent } from '../edit/ddrequest/ddrequest.component';
import { PmrequestComponent } from '../edit/pmrequest/pmrequest.component';
import { TreatmentviewComponent } from 'src/app/tabs/view/treatmentview/treatmentview.component';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FirComponent } from "./fir/fir.component";
//import { SubmitoshoComponent } from './submitosho/submitosho.component';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AccviewPage }]),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [NavController, Platform, InAppBrowser, DocumentViewer, PreviewAnyFile, FileChooser, FilePath, FileOpener, File, FileTransfer,
    PhotoViewer,
    VideoPlayer, Geolocation,
    TranslateConfigService],
  declarations: [TreatmentviewComponent, AccviewPage, GeneralComponent, PedestrianComponent,WitnesseditComponent, VehicleComponent, DriverComponent, PassengerComponent, TransportComponent, RoadComponent, MediaviewComponent, AccimgviewComponent, DdrequestComponent, PmrequestComponent, FirComponent],
  entryComponents: [TreatmentviewComponent, GeneralComponent, PedestrianComponent,WitnesseditComponent, VehicleComponent, DriverComponent, PassengerComponent, TransportComponent, RoadComponent, MediaviewComponent, AccimgviewComponent, DdrequestComponent, PmrequestComponent, FirComponent]
})
export class AccviewPageModule { }
