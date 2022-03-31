import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,
  ReactiveFormsModule, } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OfflinePageRoutingModule } from './offline-routing.module';

import { OfflinePage } from './offline.page';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../../translate-config.service';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OfflinePageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateConfigService,
  
  ],
  declarations: [OfflinePage]
})
export class OfflinePageModule {}
