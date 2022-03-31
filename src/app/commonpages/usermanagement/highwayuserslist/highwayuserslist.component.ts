import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import {AddhighwayuserComponent} from '../../usermanagement/addhighwayuser/addhighwayuser.component'
import { TranslateConfigService } from '../../../translate-config.service';

@Component({
  selector: 'app-highwayuserslist',
  templateUrl: './highwayuserslist.component.html',
  styleUrls: ['./highwayuserslist.component.scss'],
})
export class HighwayuserslistComponent implements OnInit {
  @Input() highwayuserdata:any;
  selectedLanguage:string;
  loading:boolean=false;

  constructor(private modalctrl: ModalController,private api:ApiService,
    private translateConfigService: TranslateConfigService,) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
     }

  ngOnInit() {
    console.log("Highway userlist",this.highwayuserdata)
  }

  async addHighwayuser() {
    console.log("N-Highway User values");
    const modalped = await this.modalctrl.create({
      component: AddhighwayuserComponent,
      componentProps: { 'addhighwayuser': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  loadHwStateUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadHwStatesUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      //this.highwayuserdata =data.data[offset];
      if(offset==0){         
        this.highwayuserdata =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.highwayuserdata.push( data.data[i] );
        }
      }
      console.log("loadHwStatesUsers",this.highwayuserdata);
      this.loading=false;
     });
  
  }

  
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  disableUser(usr){

  }
}
