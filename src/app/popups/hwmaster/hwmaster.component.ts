import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { UsersService } from '../../services/shared.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hwmaster',
  templateUrl: './hwmaster.component.html',
  styleUrls: ['./hwmaster.component.scss'],
})
export class HwmasterComponent implements OnInit {
  @Input() selacc:any;
  selectedLanguage: string;
  params: any;
  roadtype: any;
  circle: any;
  division: any;
  sub_division: any; 
  message:any=null;   reqdetails:any=null;
  private userSub: Subscription; isAuthenticated = false; user:any;

  hwdata={'roadtype':'','circle':'','division':'',
                'sub_division':'','accid':''};

  constructor(private translateConfigService: TranslateConfigService, private alertController: AlertController,
    private api: ApiService, private modalctrl: ModalController, private authService: AuthService,
    private shserv:UsersService, private toastController: ToastController) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  ngOnInit() {

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.user=user;
      }
    });

    console.log(this.selacc);
    if(this.selacc.get_hwstatus==null){    this.loadRoadType(); }else{ this.loadHWReqDetails() ;  this.loadRoadType(); }
    this.hwdata.accid=this.selacc.accid;
    
  }

  loadHWReqDetails(){
    let postDate = {
      mode: 'HWReqDetails',
      accid:this.selacc.accid
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log(data);
      this.reqdetails = data.data;
      console.log(this.reqdetails);
    });

  }
  HWreqcancel(vehno,data){
    console.log(data);
    let postDate = {
      mode: 'cancelHighwaysrequest',
      accid:this.selacc.accid,
      vehno:vehno,
      remarks:data.Reason
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log("MVI Cancel ",data);
     
      if(data.flag==true){
        console.log("Flag true ",data);
        
        this.loadHWReqDetails();
        this.loadRoadType();

      }
    });
  }
  async deleteHWRequest(vehno) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>Cancel</strong>!!!',
      inputs: [ 
        {
          name: 'Reason',
          placeholder: 'Reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: (data) => {
            console.log('Confirm Okay');
            this.HWreqcancel(vehno,data);
          }
        }
      ]
    });

     await alert.present();
   }

  viewProfile(usrname) {
  
    console.log(usrname);
    if(usrname!='' && usrname!=null ){
    this.shserv.viewProfile(usrname);
    }
  
  }


  loadRoadType() {
    let postDate = {
      mode: 'loadRoadType'
      //  district:this.rtosel.district
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log(data);
      this.roadtype = data.data;
      console.log(this.roadtype);
    });
  }



  public getCircle(event: any) {   

    this.loadCircle()
  }

  public getDivision(event: any) {
    this.loadDivision();
  }

  public getSubDivision(event: any) {

    this.loadSubDivision();
  }

  loadCircle() {
    console.log(this.hwdata.roadtype);
    let postDate = {
      mode: 'loadCircle',
      roadtype: this.hwdata.roadtype
      //  district:this.rtosel.district
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log("Circle",data);
      this.circle = data.data;
    });
  }

  loadDivision() {
    let postDate = {
      mode: 'loadDivision',
      roadtype: this.hwdata.roadtype,
      circle:this.hwdata.circle
      //  district:this.rtosel.district
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log("Division",data);
      this.division = data.data;
    });
  }

  loadSubDivision() {
    let postDate = {
      mode: 'loadSubDivision',
      roadtype: this.hwdata.roadtype,
      circle:this.hwdata.circle,
      division:this.hwdata.division
      //  district:this.rtosel.district
    }
    this.api.post('highways', postDate).subscribe((data: any) => {
      console.log("Sub-Division",data);
      this.sub_division = data.data;
    });
  }

  saveModal() {
    this.message=null;

    if(this.hwdata.sub_division==''){
      this.presentToast('Select Sub Division');
      return false;
    }

    console.log(this.hwdata);
    let postDate={
      mode:'requestHighways',
      hwdata:this.hwdata      
    }
    this.api.post('highways',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('Requested');
        this.presentToast("Requested Successfully !");
       // this.modalctrl.dismiss();
       this.selacc.get_hwstatus='1';
       this.loadHWReqDetails();
      }else{
        this.presentToast(data.msg);
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
