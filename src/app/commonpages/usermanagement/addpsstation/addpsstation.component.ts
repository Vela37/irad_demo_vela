import { Component, OnInit } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';

@Component({
  selector: 'app-addpsstation',
  templateUrl: './addpsstation.component.html',
  styleUrls: ['./addpsstation.component.scss'],
})
export class AddpsstationComponent implements OnInit {
  psstation={'name':'','station_code':'','address':''};
  selectedLanguage:string;  params:any; 
  RTO_Label:any="";message:any=null; 

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  validationCheck(){
    let check;
    check=this.RTO_Label.concat(this.psstation.station_code);
    console.log(check);
    if (this.psstation.name != '' && this.psstation.station_code !='' && this.psstation.address!='') {
      if ( /\s/.test(this.psstation.station_code)) {
        this.presentToast("Rto code contains whitespaces!!!")
      }
      else {
        if (this.psstation.station_code.length >= 2 && this.psstation.station_code.length <= 3) {
          if(this.psstation.name.length >= 3){
            this.saveModal();
          }
          else{
            this.presentToast("Name should be with atleast 3 characters!!!");
          }
        }
        else {
          this.presentToast("Station codemust be 2/3 digits !!!")
        }       
      }
    } else {
      this.presentToast("Your missing some fields!!!")
    }
  }

  saveModal(){
    this.message=null;
    console.log(this.psstation);
    let postDate={
      mode:'addPoliceStation', 
      station:this.psstation
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.presentToast("Station Created Successfully !");
        this.modalctrl.dismiss(true);

      }else{
        this.message= data.msg.split(".");

      }
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }


  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
}
