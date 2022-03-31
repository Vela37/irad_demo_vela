import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-legalprofile',
  templateUrl: './legalprofile.page.html',
  styleUrls: ['./legalprofile.page.scss'],
})
export class LegalprofilePage implements OnInit {

  courtdet: any = null;
  constructor(    private modalctrl: ModalController,private api:ApiService
    ) { }

  ngOnInit() {
    this.loadcourt();


  }


    loadcourt(){

   let postDate={

    mode:"courtdetails", 


    
 }
   console.log(postDate);
    this.api.darsave('loadcourtprofile',postDate).subscribe((comingdata: any)=>{
   console.log("------------------------");
   console.log(comingdata);
   this.courtdet=comingdata.userdatalist[0];

console.log(this.courtdet.courtname)
   console.log("------------------------");


  
     });
  
}




}
