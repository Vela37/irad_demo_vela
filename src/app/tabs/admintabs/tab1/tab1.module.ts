import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {LogindetailsComponent } from './logindetails/logindetails.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterdetailsComponent } from './filterdetails/filterdetails.component';
import { CountdetailsComponent } from '../../../popups/countdetails/countdetails.component';
import { Ng2OdometerModule } from 'ng2-odometer';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Ng2OdometerModule.forRoot(),
    NgxDatatableModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page,LogindetailsComponent,FilterdetailsComponent,CountdetailsComponent],
  entryComponents:[LogindetailsComponent,FilterdetailsComponent,CountdetailsComponent]
})
export class Tab1PageModule {}
