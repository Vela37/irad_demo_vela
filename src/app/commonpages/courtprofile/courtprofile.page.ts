import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { EditcourtComponent } from 'src/app/commonpages/courtprofile/editcourt/editcourt.component';


@Component({
  selector: 'app-courtprofile',
  templateUrl: './courtprofile.page.html',
  styleUrls: ['./courtprofile.page.scss'],
})
export class CourtprofilePage implements OnInit {

  courtdet: any = null;
  constructor(    private modalctrl: ModalController,private api:ApiService
    ) { }

  ngOnInit() {
    this.loadcourt();


  }

 /* loadfield(){

    let postDate={
      mode:"courtdata", 
      lang:'en',
   }
   console.log(postDate);
    this.api.post('datas',postDate).subscribe((data: any)=>{
   console.log("------------------------");
   console.log("------------------------");
     });
  
}*/

    loadcourt(){

    //  alert('_____________hello_________________')

   // this.data_court=null;

    
   let postDate={

    //---condition name------ datas in line 40 is file name
    mode:"courtdetails", 


    
 }
   console.log(postDate);
   //return false;
    this.api.darsave('loadcourtprofile',postDate).subscribe((comingdata: any)=>{
   // this.ctrl_taluk=data.taluk;
   console.log("------------------------");
   console.log(comingdata);
   this.courtdet=comingdata.userdatalist[0];

console.log(this.courtdet.courtname)
   console.log("------------------------");


  
     });
  
}

async  courtpopup(){      const modalped = await this.modalctrl.create({
  component: EditcourtComponent,
    componentProps: { courtdatafrompage: this.courtdet },
 
 });

  modalped.onWillDismiss().then((dataReturned) => {
  //   this.histroyreturn = dataReturned.data;
    console.log("Receive: ", dataReturned.data);
    //if(dataReturned.data==true)
  });
  return await modalped.present().then((_) => {
    //  console.log('Sending: ', this.phyopnion);
  });
}
   


}
