import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../app.module';
import { AddfeedbackComponent } from 'src/app/commonpages/feedback/addfeedback/addfeedback.component';
import { ReplyfeedbackComponent } from 'src/app/commonpages/feedback/replyfeedback/replyfeedback.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FeedbackPageRoutingModule,
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
  declarations: [FeedbackPage,AddfeedbackComponent,ReplyfeedbackComponent],
  entryComponents:[AddfeedbackComponent,ReplyfeedbackComponent]
})
export class FeedbackPageModule {}
