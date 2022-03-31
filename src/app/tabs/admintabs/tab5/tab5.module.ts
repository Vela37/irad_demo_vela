import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';
 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Ng2OdometerModule } from 'ng2-odometer';
import{FlashCardComponent} from '../../../components/flash-card/flash-card.component' 
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    IonicModule,
    Ng2OdometerModule.forRoot(),
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
    RouterModule.forChild([{ path: '', component: Tab5Page }])
  ],
  providers: [
    TranslateConfigService,
    Geolocation,
  ],
  declarations: [Tab5Page,FlashCardComponent],
 
})
export class Tab5PageModule {}
