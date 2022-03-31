import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addinscompany',
  templateUrl: './addinscompany.component.html',
  styleUrls: ['./addinscompany.component.scss'],
})
export class AddinscompanyComponent implements OnInit {
  @Input() insdata:any;
  ins={'name':'','address':'','mobile':'','email':''};
  psStateOptions:any;   message:any=null; 
  RTO_Label:any="";
  selectedLanguage:string;  params:any;
  title:any="Insurance";
  office_code:any="";

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  saveModal(){
    this.message=null;
    console.log(this.ins);
    let postDate={
      mode:'addINScompany', 
      ins:this.ins
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.presentToast("Addedd Successfully !");
        this.modalctrl.dismiss(true);

      }else{
        this.message= data.msg.split(".");

      }
    });
  } 

  // saveUnit(){
  //   this.message=null;
  //   console.log("Unit",this.ins);
  //   let postDate={
  //     mode:'addUnitOffice', 
  //     rto:this.rto
  //   }
  //   this.api.post('usermanagement',postDate).subscribe((data: any)=>{
  //     console.log(data); 
  //     if(data.flag==true){
  //       console.log('updated');
       
  //       this.presentToast("Unit Office Created Successfully !");
  //       this.modalctrl.dismiss(true);

  //     }else{
  //      // this.rto.uo_code='';
  //       this.message= data.msg.split(".");

  //     }
  //   });
  // } 

  validationCheck(){
    let check;
    //check=this.rtodata.office_id.concat(this.rto.uo_code);
    // check=this.RTO_Label.concat(this.rto.rto_code);
    console.log(check);
    //this.rto.uo_code=check;
   
          if (this.ins.name.length >= 5 ) {
            if(this.ins.address.length >= 10){
              if(this.ins.mobile.length >= 10){
                if(this.ins.email.length >= 5){
                  this.saveModal();
                }
                else{
                  this.presentToast("Email Id must be > 5 characters");
                }  
              }
              
             else{
               this.presentToast("Mobile Number must be > 10 characters");
             } 
             
            }
            else{
              this.presentToast("Address must be >10 characters");
            }
          }else {
            this.presentToast("Name must be > 5 characters")
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

  checkmobile(event) {
    console.log()
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      //this.passengerform.controls['mod_mobile'].setValue(value);

    }
  }
  

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }


}
