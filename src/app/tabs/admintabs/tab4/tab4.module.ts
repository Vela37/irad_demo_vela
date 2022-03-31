import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {FilterComponent} from "./filter/filter.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
 
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  providers: [
    TranslateConfigService,
    Geolocation,
  ],
  declarations: [Tab4Page,FilterComponent,AnalyticsComponent],
  entryComponents:[FilterComponent,AnalyticsComponent]
})
export class Tab4PageModule {}
