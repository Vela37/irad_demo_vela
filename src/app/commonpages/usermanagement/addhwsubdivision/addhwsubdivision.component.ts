import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addhwsubdivision',
  templateUrl: './addhwsubdivision.component.html',
  styleUrls: ['./addhwsubdivision.component.scss'],
})
export class AddhwsubdivisionComponent implements OnInit {
  @Input() hwsubdivision:any;
  hwsubdivisiondata={'name':'','address':''};
  psStateOptions:any;   message:any=null; 
  RTO_Label:any="";
  selectedLanguage:string;  params:any;

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {}

  saveModal(){
    this.message=null;
    let postDate={
      mode:'addHwSubDivision', 
      subdivision:this.hwsubdivisiondata
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

  validationCheck(){
    if (this.hwsubdivisiondata.name != '') {            
          if(this.hwsubdivisiondata.name.length >= 3){
            this.saveModal();
          }
          else{
            this.presentToast("Name should be with atleast 3 characters!!!");
          }            
      }
     else {
      this.presentToast("Your missing some fields!!!")
    }
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
