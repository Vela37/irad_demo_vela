import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InownerPageRoutingModule } from './inowner-routing.module';

import { InownerPage } from './inowner.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../../app.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InownerPageRoutingModule,
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
  declarations: [InownerPage]
})
export class InownerPageModule {}
