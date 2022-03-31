import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../../services/api.service";
import {  PushnotificationService} from '../../../../services/pushnotification.service';

@Component({
  selector: 'app-submitosho',
  templateUrl: './submitosho.component.html',
  styleUrls: ['./submitosho.component.scss'],
})
export class SubmitoshoComponent implements OnInit {

  datacount:any=null; vd:any=null;
  selacc:any; loading:boolean=false;
  gencolor:any='danger'; genvalue:any=0.0;
  vehdricolor:any='danger'; vehdrivalue:any=0.0;
  passengercolor:any='danger'; passengervalue:any=0.0;
  pedcolor:any='danger'; pedvalue:any=0.0;
  imgcolor:any='danger'; imgvalue:any=0.0;
  videocolor:any='danger'; videovalue:any=0.0;
  conflag:boolean=false;
  constructor(
    private router: Router,
    private api: ApiService,
    private modalctrl:ModalController,
    private alertCtrl: AlertController,
    private pushNotification:PushnotificationService,
    


  ) { }

  ngOnInit() {

    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    console.log(this.selacc);

  }
  ionViewDidEnter(){
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    console.log(this.selacc);

    this.checkSubmotToSHO();

  }

  
  doRefresh(event){
   
    this.checkSubmotToSHO();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }


  
  async SubmotToSHO(){


    if(this.conflag!=true){

      this.presentAlert('Please Complete All Details');
      return false;

    }
    //return false;
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Do you want to SUBMIT !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.SubmotToSHOconf();
          }
        }
      ]
    });

    await alert.present();

  }
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      subHeader: 'Submit to SHO',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  SubmotToSHOconf(){

   

    let postDate = {
      mode: "submittosho",
      id: this.selacc.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {

      this.pushNotification.sendNotification('SHO','accidentsubmit',this.selacc.accid);
    
      this.closeModal();
      this.router.navigate(["/list"]);
      

    });
  }

  checkSubmotToSHO(){

    

    let postDate = {
      mode: "checksubmittosho",
      id: this.selacc.accid,
    };
    this.loading=true; this.datacount=null;
    this.api.post("accview", postDate).subscribe((data: any) => {
      console.log(data);
      this.loading=false;
      this.conflag=true;
      this.datacount=data.data.gen[0];
      this.conflag=data.flag;

      this.vd=data.data.vd;

      if(this.datacount.genrl==1){
        this.gencolor='success'; this.genvalue=1.0;
      }else{
        this.conflag=false;
      }
      if(this.datacount.t_vehicle!=0){
        if(this.datacount.t_vehicle<=this.datacount.e_vehicle){
          this.vehdricolor='success'; this.vehdrivalue=1.0;
        }else{
          this.vehdrivalue=(this.datacount.e_vehicle/this.datacount.t_vehicle);
          this.conflag=false;
        }
      }
      if(this.datacount.t_passenger!=0){
        if(this.datacount.t_passenger<=this.datacount.e_passenger){
          this.passengercolor='success'; this.passengervalue=1.0;
        }else{
          this.passengervalue=(this.datacount.e_passenger/this.datacount.t_passenger);
          this.conflag=false;
        }
      }

      if(this.datacount.t_pedestrian!=0){
        if(this.datacount.t_pedestrian<=this.datacount.e_pedestrian){
          this.pedcolor='success'; this.pedvalue=1.0;
        }else{
          this.pedvalue=(this.datacount.e_pedestrian/this.datacount.t_pedestrian);
          this.conflag=false;
        }
      }
      if(data.images!=null && data.images.count>0){
        this.imgvalue=data.images.count;
        this.imgcolor='success'; 
      }else{
       // this.conflag=false;
      }

      if(data.videos!=null && data.videos.count>0){
        this.videovalue=data.videos.count;
        this.videocolor='success'; 
      }else{
       // this.conflag=false;
      }


     /* passengercolor:any='danger'; passengervalue:any=0.0;
      pedcolor:any='danger'; pedvalue:any=0.0;
      imgcolor:any='danger'; imgvalue:any=0.0;
      videocolor:any='danger'; videovalue:any=0.0;*/

    });


}

closeModal() {
  this.modalctrl.dismiss(undefined);
}

}
