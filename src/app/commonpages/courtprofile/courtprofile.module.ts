import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourtprofilePageRoutingModule } from './courtprofile-routing.module';

import { CourtprofilePage } from './courtprofile.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { EditcourtComponent } from 'src/app/commonpages/courtprofile/editcourt/editcourt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourtprofilePageRoutingModule
  ],
  declarations: [CourtprofilePage,EditcourtComponent],
  entryComponents: [EditcourtComponent,EditcourtComponent]

})
export class CourtprofilePageModule {}
