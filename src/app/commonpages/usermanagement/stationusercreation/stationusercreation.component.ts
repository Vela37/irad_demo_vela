import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { AdduserComponent } from '../adduser/adduser.component';



@Component({
  selector: 'app-stationusercreation',
  templateUrl: './stationusercreation.component.html',
  styleUrls: ['./stationusercreation.component.scss'],
})
export class StationusercreationComponent implements OnInit {
  @Input() stationuserdata: any;
  selectedLanguage: string; params: any;
  stationdata = {
    'station': '', 'name': '', 'login_id': '',
    'email': '', 'mobile': ''
  };
  psDistrictOptions: any; message: any = null;
 
  constructor(private modalctrl: ModalController, 
    private api: ApiService, private toastController: ToastController, 
    private translateConfigService: TranslateConfigService,
    private alertCtrl: AlertController,
    
    ) { }

  ngOnInit() {
    console.log("Station user data", this.stationuserdata);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.stationdata.station = this.stationuserdata.code;
  }

  loadPSStations() {
    let postDate = {
      mode: 'loadPSStations'
      //  district:this.rtosel.district
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      this.psDistrictOptions = data.data;
    });
  }
  async disableUser(usr) {
    let postDate = {
      mode: 'disablePoliceUser',
      station: this.stationdata.station,
      usr: usr
    }
     
    var  flagtext="ENABLE";
    if(usr.active){flagtext="DISABLE"; }

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to  '+flagtext+' !!!',
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
           
            this.api.post('usermanagement', postDate).subscribe((data: any) => {
              console.log(data);
              if (data.flag == true) {
                this.presentToast("User Active status changed sucessfully");
                //this.modalctrl.dismiss(true);
                this.loadPStationUsers(0);
              }
            });
            
          }
        }
      ]
    });

    await alert.present();



  }


  loadPStationUsers(offset) {
    // this.loading=true;
    let postDate = {
      mode: 'loadPStationUsers',
      station: this.stationdata.station,
      offset: offset
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);

      this.stationuserdata = data.data[0];
      //  this.loading=false;
    });
    // 
  }

  saveModal() {
    this.message = null;
    console.log(this.stationdata);
    let postDate = {
      mode: 'addPoliceUser',
      user: this.stationdata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');

        //this.modalctrl.dismiss(true);
        this.loadPStationUsers(0);

        this.presentToast("User Created Successfully !");

      } else {
        this.message = data.msg.split(".");

      }
    });
    // this.modalctrl.dismiss();
  }

  validationCheck() {
    var mobile = new String(this.stationdata.mobile) ;
    let isnum = /^\d+$/.test(this.stationdata.mobile);
    if (this.stationdata.name != '' && this.stationdata.login_id != '' && this.stationdata.mobile != '' && this.stationdata.station != '') {
      if (/\s/.test(this.stationdata.email) && /\s/.test(this.stationdata.mobile) && /\s/.test(this.stationdata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (this.stationdata.login_id.length >= 3 && this.stationdata.name.length >= 3) {
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


  async addUser() {
    let admin = JSON.parse(JSON.stringify(this.stationuserdata)); //this.stationuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: AdduserComponent,
      componentProps: { 'adduser': '', 'admin': admin }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if (dataReturned.data == true)
        this.loadPStationUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
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
