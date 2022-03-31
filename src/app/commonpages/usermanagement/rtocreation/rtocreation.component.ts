import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';

@Component({
  selector: 'app-rtocreation',
  templateUrl: './rtocreation.component.html',
  styleUrls: ['./rtocreation.component.scss'],
})
export class RtocreationComponent implements OnInit {
  @Input() rtodata:any;
  rto={'name':'','rto_code':'','address':'','uo_code':''};
  psStateOptions:any;   message:any=null; 
  RTO_Label:any="";
  selectedLanguage:string;  params:any;
  title:any="RTO";
  office_code:any=""; user:any;

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {
    
    // console.log("State user data",this.stateuserdata); 

   this.user= JSON.parse(localStorage.getItem('userData'));
    

    this.office_code=this.rtodata.office_id;
    this.rto.rto_code=this.office_code;
    if(this.rtodata!=''){
      this.title="Unit Office";
      console.log(this.rtodata.office_id);

    } 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  saveModal(){
    this.message=null;
    console.log(this.rto);
    let postDate={
      mode:'addRTO', 
      rto:this.rto
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

  saveUnit(){
    this.message=null;
    console.log("Unit",this.rto);
    let postDate={
      mode:'addUnitOffice', 
      rto:this.rto
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.presentToast("Unit Office Created Successfully !");
        this.modalctrl.dismiss(true);

      }else{
       // this.rto.uo_code='';
        this.message= data.msg.split(".");

      }
    });
  } 

  validationCheck(){
    let check;
    //check=this.rtodata.office_id.concat(this.rto.uo_code);
    // check=this.RTO_Label.concat(this.rto.rto_code);
    console.log(check);
    //this.rto.uo_code=check;
    if(this.rtodata!=''){
      if (this.rto.name != '' && this.rto.uo_code !='' && this.rto.address!='' ) {
        if ( /\s/.test(this.rto.uo_code)) {
          this.presentToast("Unit code contains whitespaces!!!")
        }
        else {
          if (this.rto.uo_code.length >= 1 && this.rto.uo_code.length <= 2 ) {
            if(this.rto.name.length >= 3){
              console.log("UO_CODE",this.rto.uo_code);
              this.saveUnit();
            }
            else{
              this.presentToast("Name should be with atleast 3 characters!!!");
            }
          }
          else {
            this.presentToast("Rto code is less than 4!!!")
          }       
        }
      } else {
        this.presentToast("Your missing some fields!!!")
      }
    }else{
      if (this.rto.name != '' && this.rto.rto_code !='' && this.rto.address!='') {
        if ( /\s/.test(this.rto.rto_code)) {
          this.presentToast("Rto code contains whitespaces!!!")
        }
        else {
          if (this.rto.rto_code.length == 2 || this.rto.rto_code.length == 3 ) {
            if(this.rto.name.length >= 3){
              this.saveModal();
            }
            else{
              this.presentToast("Name should be with atleast 3 characters!!!");
            }
          }
          else {
            this.presentToast("Rto Must be 2 or 3 digit")
          }       
        }
      } else {
        this.presentToast("Your missing some fields!!!")
      }
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
