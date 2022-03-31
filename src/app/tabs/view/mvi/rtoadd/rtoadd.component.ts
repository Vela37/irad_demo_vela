import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-rtoadd',
  templateUrl: './rtoadd.component.html',
  styleUrls: ['./rtoadd.component.scss'],
})
export class RtoaddComponent implements OnInit {
  @Input() rtoinfo:any;
  zoneOptions:any;
  districtOptions:any;
  rtoOptions:any;
  uoOptions:any;
  selrto:any=null;
  rtosel={
    'district':'', 
    'rto':'',
    'uo':''
  }

  constructor(private modalctrl: ModalController, private api:ApiService,
    private toastController:ToastController) { }

  ngOnInit() {
    console.log("USER RECIEVED DATA",this.rtosel,this.rtoinfo);
    //this.rtosel.district=this.rtoinfo.trans_district;
   // this.rtosel.rto=this.rtoinfo.rto;
   // if(this.rtoinfo.uo!=null){
    //  this.rtosel.uo=this.rtoinfo.uo;
   // }
   // this.loadZone();
   
   console.log(this.rtosel);
   //this.loadDistrict();
   this.rtoOptions=null;
   this.uoOptions=null;
   this.selrto=null;

   this.loadRTO();
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  public onDistrictChange(){
    this.loadRTO();
    this.rtoOptions=null;
    this.rtosel.rto=null;
    this.rtosel.uo=null

  }

  public onRtoChange(){
    this.loadUO();
    this.uoOptions=null;
    this.rtosel.uo=null
  }

  public onRTOSelected(){
    this.selrto=null;
    for(let i=0;i<this.rtoOptions.length;i++){
     // console.log(this.rtoOptions[i].id,'----',this.rtosel.rto);
      if(this.rtoOptions[i].id==this.rtosel.rto){
        this.selrto=this.rtoOptions[i];
        break;
      }
    }
    //console.log(' this.selrto', this.selrto);

  }

  saveModal(){

    if(this.rtosel.rto==''){

      alert('Please Select RTO');
      return false;

    }

    let postDate={
      mode:'saveRTO',
      rtosel:this.rtosel
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);

        this.presentToast("RTO Added Successfully !");

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


  loadZone(){
    let postDate={
      mode:'loadZone',
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      this.districtOptions=data.data;
 
     });
  }

  loadDistrict(){
    let postDate={
      mode:'loadDistrict',
      //zone:this.rtoinfo.zone
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      this.districtOptions=data.data;
 
     });
  }

  loadRTO(){
    let postDate={
      mode:'loadRTO'
    //  district:this.rtosel.district
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      this.rtoOptions=data.data;
 
     });
  }

  loadUO(){
    let postDate={
      mode:'loadUO',
      district:this.rtosel.district,
      rto:this.rtosel.rto
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data.data.length>0){
      this.uoOptions=data.data;
      }else{
        this.uoOptions=null;
      }

     });
  }

}
