import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../app.module';

import { SelectlocationComponent } from '../../popups/selectlocation/selectlocation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule,
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
  declarations: [RegisterPage,SelectlocationComponent],
  entryComponents:[SelectlocationComponent]
})
export class RegisterPageModule {}
