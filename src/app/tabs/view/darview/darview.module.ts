import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DarviewPageRoutingModule } from './darview-routing.module';

import { DarviewPage } from './darview.page';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//ReportsPage 
import { InsuranceinjuryeditComponent } from 'src/app/tabs/view/darview/insuranceinjuryedit/insuranceinjuryedit.component';
import { InsurancegenraleditComponent } from 'src/app/tabs/view/darview/insurancegenraledit/insurancegenraledit.component';
import { InsurancedeatheditComponent } from 'src/app/tabs/view/darview/insurancedeathedit/insurancedeathedit.component';
import {DargenralcComponent} from  'src/app/tabs/view/darview/dargenralc/dargenralc.component'
import {DarpassengereditComponent} from  'src/app/tabs/view/darview/darpassengeredit/darpassengeredit.component'
import {DarpedestrianeditComponent} from  'src/app/tabs/view/darview/darpedestrianedit/darpedestrianedit.component'
import {DarfamilyeditComponent} from  'src/app/tabs/view/darview/darfamilyedit/darfamilyedit.component'
import {DarchildeditComponent} from  'src/app/tabs/view/darview/darchildedit/darchildedit.component'


export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarviewPageRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers:[TranslateConfigService,InAppBrowser],
  declarations: [DarviewPage,InsuranceinjuryeditComponent,InsurancegenraleditComponent,InsurancedeatheditComponent,DarpassengereditComponent,DarpedestrianeditComponent,DarfamilyeditComponent,DarchildeditComponent,DargenralcComponent],
  entryComponents: [InsuranceinjuryeditComponent,InsurancegenraleditComponent,InsurancedeatheditComponent,DarpassengereditComponent,DarpedestrianeditComponent,DarfamilyeditComponent,DarchildeditComponent,DargenralcComponent]

})
export class DarviewPageModule {}
