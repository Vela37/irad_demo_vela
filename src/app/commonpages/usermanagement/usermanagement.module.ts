import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermanagementPageRoutingModule } from './usermanagement-routing.module';

import { UsermanagementPage } from './usermanagement.page';

import {StateusercreationComponent} from '../usermanagement/stateusercreation/stateusercreation.component'
import {DistrictusercreationComponent} from '../usermanagement/districtusercreation/districtusercreation.component'
import {StationusercreationComponent} from '../usermanagement/stationusercreation/stationusercreation.component'
import {FieldofficerusercreationComponent} from '../usermanagement/fieldofficerusercreation/fieldofficerusercreation.component'
import {AdduserComponent} from '../usermanagement/adduser/adduser.component'
import {TransportusercreationComponent} from '../usermanagement/transportusercreation/transportusercreation.component'
import {RtocreationComponent} from '../usermanagement/rtocreation/rtocreation.component'
import {AddrtoComponent} from '../usermanagement/addrto/addrto.component'

import {HighwayuserslistComponent} from '../usermanagement/highwayuserslist/highwayuserslist.component'
import {AddhighwayuserComponent} from '../usermanagement/addhighwayuser/addhighwayuser.component'

import {AddhwcircleComponent} from '../usermanagement/addhwcircle/addhwcircle.component'
import {AddhwdivisionComponent} from '../usermanagement/addhwdivision/addhwdivision.component'
import {AddhwsubdivisionComponent} from '../usermanagement/addhwsubdivision/addhwsubdivision.component'
import {AddroadtypesComponent} from '../usermanagement/addroadtypes/addroadtypes.component'


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';

import {AddpsstationComponent} from '../usermanagement/addpsstation/addpsstation.component'
import {AddpsdistrictComponent} from '../usermanagement/addpsdistrict/addpsdistrict.component'
import {AddhwuserComponent} from '../usermanagement/addhwuser/addhwuser.component'
import {HighwayusercreationComponent} from '../usermanagement/highwayusercreation/highwayusercreation.component'
import {EntryhpusersComponent} from '../usermanagement/entryhpusers/entryhpusers.component';
import {AddentryuserComponent} from '../usermanagement/addentryuser/addentryuser.component';
import {ProjusercreationComponent} from './projusercreation/projusercreation.component';
import {AddinscompanyComponent} from './addinscompany/addinscompany.component';
import { AddinsuserComponent } from './addinsuser/addinsuser.component';
import { AddinsusersComponent } from './addinsusers/addinsusers.component';
import { AddmactusersComponent } from './addmactusers/addmactusers.component';
import { AddlsausersComponent } from './addlsausers/addlsausers.component';


import { ReactiveFormsModule } from '@angular/forms';
import { AddprojuserComponent } from './addprojuser/addprojuser.component';

import {UserfilterPipe } from '../../pipes/userfilter.pipe';
import { AddmactuserComponent } from './addmactuser/addmactuser.component';
import { AddlsauserComponent } from './addlsauser/addlsauser.component';
import { AddmactofficeComponent } from './addmactoffice/addmactoffice.component';
import { AddlsaofficeComponent } from './addlsaoffice/addlsaoffice.component';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    UsermanagementPageRoutingModule,
    FormsModule,
    HttpClientModule,
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
  declarations: [UserfilterPipe,AddentryuserComponent,AddprojuserComponent,EntryhpusersComponent,
    UsermanagementPage,StateusercreationComponent,DistrictusercreationComponent,StationusercreationComponent,
    FieldofficerusercreationComponent,AdduserComponent,TransportusercreationComponent,RtocreationComponent,AddrtoComponent,
    HighwayuserslistComponent,AddhighwayuserComponent,AddhwcircleComponent,AddhwdivisionComponent,AddhwsubdivisionComponent,
    AddroadtypesComponent,AddpsstationComponent,AddpsdistrictComponent,AddhwuserComponent,HighwayusercreationComponent,
    ProjusercreationComponent,AddinscompanyComponent,AddinsusersComponent,AddinsuserComponent,
    AddmactusersComponent,AddlsausersComponent,AddmactuserComponent,AddlsauserComponent,AddmactofficeComponent,AddlsaofficeComponent
  ],
  entryComponents: [AddentryuserComponent,AddprojuserComponent,EntryhpusersComponent,StateusercreationComponent,
    DistrictusercreationComponent,StationusercreationComponent,FieldofficerusercreationComponent,AdduserComponent,
    TransportusercreationComponent,RtocreationComponent,AddrtoComponent,HighwayuserslistComponent,AddhighwayuserComponent,
    AddhwcircleComponent,AddhwdivisionComponent,AddhwsubdivisionComponent,AddroadtypesComponent,AddpsstationComponent,
    AddpsdistrictComponent,AddhwuserComponent,HighwayusercreationComponent,ProjusercreationComponent,AddinscompanyComponent,
    AddinsusersComponent,AddinsuserComponent,
    AddmactusersComponent,AddlsausersComponent,AddmactuserComponent,AddlsauserComponent,AddmactofficeComponent,AddlsaofficeComponent
  
  ]
})
export class UsermanagementPageModule {}
