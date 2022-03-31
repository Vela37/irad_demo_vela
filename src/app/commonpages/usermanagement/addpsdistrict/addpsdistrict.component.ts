import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';

@Component({
  selector: 'app-addpsdistrict',
  templateUrl: './addpsdistrict.component.html',
  styleUrls: ['./addpsdistrict.component.scss'],
})
export class AddpsdistrictComponent implements OnInit {
  psdistrict={'name':'','district_code':''};
  selectedLanguage:string;  params:any; 
  RTO_Label:any="";message:any=null;

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  validationCheck(){
    let check;
    check=this.RTO_Label.concat(this.psdistrict.district_code);
    console.log(check);
    if (this.psdistrict.name != '' && this.psdistrict.district_code !='') {
      if ( /\s/.test(this.psdistrict.district_code)) {
        this.presentToast("District code contains whitespaces!!!")
      }
      else {
        if (this.psdistrict.district_code.length == 3 ) {
          if(this.psdistrict.name.length >= 3){
            this.saveModal();
          }
          else{
            this.presentToast("Name should be with atleast 3 characters!!!");
          }
        }
        else {
          this.presentToast("District code is less than 3!!!")
        }       
      }
    } else {
      this.presentToast("Your missing some fields!!!")
    }
  }

  saveModal(){
    this.message=null;
    console.log(this.psdistrict);
    let postDate={
      mode:'addPSDistrict', 
      district:this.psdistrict
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.presentToast("User Created Successfully !");
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
