import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { TranslateConfigService } from '../../../translate-config.service';
import { AdduserComponent} from '../adduser/adduser.component'
@Component({
  selector: 'app-districtusercreation',
  templateUrl: './districtusercreation.component.html',
  styleUrls: ['./districtusercreation.component.scss'],
})
export class DistrictusercreationComponent implements OnInit {
  @Input() districtuserdata:any;
  districtname:any="Chennai";
  districtdata={'district':'','name':'','login_id':'', 
                'email':'','mobile':''};
  selectedLanguage:string;  params:any;

  psDistrictOptions:any;   message:any=null;           
  constructor(private alertCtrl: AlertController,private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }

  ngOnInit() {
    console.log("District Values",this.districtuserdata);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    //this.loadPSDistrict();
    this.districtdata.district=this.districtuserdata.code;
  }

  loadPSDistrict(){
    let postDate={
      mode:'loadPSDistricts'
    //  district:this.rtosel.district
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      this.psDistrictOptions=data.data; 
     });
  }
 async disableUser(usr){
    let postDate={
      mode:'disablePoliceUser',
      district:this.districtdata.district,
      usr:usr
    }


     var flagtext = "ENABLE";
     if (usr.active) { flagtext = "DISABLE"; }
 
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Alert!',
       message: 'Are you sure want to  ' + flagtext + ' !!!',
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
             this.api.post('usermanagement',postDate).subscribe((data: any)=>{
              console.log(data);
              if(data.flag==true){
                this.presentToast("User Active status changed sucessfully");
               // this.modalctrl.dismiss(true);
               this.loadPSDistrictUsers(0)
               
              } 
             });
 
           }
         }
       ]
     });
 
     await alert.present();
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  loadPSDistrictUsers(offset){
   // this.loading=true;
    let postDate={
      mode:'loadPSDistrictsUsers',
      district:this.districtdata.district,
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

    this.districtuserdata=data.data[0];
    //  this.loading=false;
     });
    // 
  }

  async addUser() {
    let admin=JSON.parse(JSON.stringify(this.districtuserdata)); //this.districtuserdata;
    admin.users=null;
    const modalped = await this.modalctrl.create({
      component: AdduserComponent,
      componentProps: { 'adduser': '' ,'admin':admin }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if(dataReturned.data==true)
      this.loadPSDistrictUsers(0);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }


  saveModal() {
    this.message=null;
    console.log(this.districtdata);
    let postDate={
      mode:'addPoliceUser',
      user:this.districtdata
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        //this.modalctrl.dismiss(true);

        this.loadPSDistrictUsers(0);

        this.presentToast("User Created Successfully !");

      }else{
        this.message= data.msg.split(".");

      }
    });
   // this.modalctrl.dismiss();
  }

  validationCheck(){
    console.log(this.districtdata.district);
    var mobile = new String(this.districtdata.mobile) ;
    let isnum = /^\d+$/.test(this.districtdata.mobile);
    if (this.districtdata.name != '' && this.districtdata.login_id !='' && this.districtdata.mobile !='' && this.districtdata.district !='') {
      if (/\s/.test(this.districtdata.email) && /\s/.test(this.districtdata.mobile) && /\s/.test(this.districtdata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (this.districtdata.login_id.length >= 3 && this.districtdata.name.length >= 3) {
          if (mobile.length == 10) {
            if(isnum==true){
              this.saveModal();
            }
            else{
              this.presentToast("Mobile No should not have characters !!!");
            }            
          } else {
            this.presentToast("Mobile No length should be 10 !!!")
          }
        }
        else {
          this.presentToast("Login id or Name length is less than 3!!!")
        }       
      }
    } else {
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


  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
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
}
