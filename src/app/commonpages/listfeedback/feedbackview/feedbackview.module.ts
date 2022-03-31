import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackviewPageRoutingModule } from './feedbackview-routing.module';

import { FeedbackviewPage } from './feedbackview.page';
import { UserfeedbacksComponent } from '../../userfeedbacks/userfeedbacks.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../../app.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackviewPageRoutingModule,
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
  declarations: [FeedbackviewPage,UserfeedbacksComponent],
  entryComponents:[UserfeedbacksComponent]


})
export class FeedbackviewPageModule {}
