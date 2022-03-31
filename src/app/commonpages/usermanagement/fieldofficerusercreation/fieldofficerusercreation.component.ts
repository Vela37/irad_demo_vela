import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service'; import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { AdduserComponent } from '../adduser/adduser.component'
@Component({
  selector: 'app-fieldofficerusercreation',
  templateUrl: './fieldofficerusercreation.component.html',
  styleUrls: ['./fieldofficerusercreation.component.scss'],
})
export class FieldofficerusercreationComponent implements OnInit {
  @Input() fielduserdata: any;
  selectedLanguage: string; params: any;
  fielddata = {
    'station': '', 'name': '', 'login_id': '',
    'email': '', 'mobile': ''
  };
  psFieldOptions: any; message: any = null;

  constructor(private alertCtrl: AlertController,private modalctrl: ModalController, private api: ApiService, private toastController: ToastController, private translateConfigService: TranslateConfigService) { }

  ngOnInit() {
    console.log("Field user data", this.fielduserdata);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.fielduserdata.station = this.fielduserdata.code;
  }

  loadPSFields() {
    let postDate = {
      mode: 'loadPSFields'
      //  district:this.rtosel.district
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      this.psFieldOptions = data.data;
    });
  }

  async disableUser(usr) {
    let postDate = {
      mode: 'disablePoliceUser',
      station: this.fielddata.station,
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
                this.loadPSFieldUsers(0);
              }
            });
            
          }
        }
      ]
    });

    await alert.present();

  }

  loadPSFieldUsers(offset) {
    // this.loading=true;
    let postDate = {
      mode: 'loadPFieldUsers',
      station: this.fielddata.station,
      offset: offset
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);

      this.fielduserdata = data.data[0];
      //  this.loading=false;
    });
    // 
  }

  async addUser() {
    let admin = JSON.parse(JSON.stringify(this.fielduserdata)); //this.fielduserdata;
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
        this.loadPSFieldUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  saveModal() {
    this.message = null;
    console.log(this.fielddata);
    let postDate = {
      mode: 'addPoliceUser',
      user: this.fielddata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');
        this.loadPSFieldUsers(0);
        //this.modalctrl.dismiss(true);

        this.presentToast("User Created Successfully !");

      } else {
        this.message = data.msg.split(".");

      }
    });
    this.modalctrl.dismiss();
  }


  validationCheck() {
    var mobile = new String(this.fielddata.mobile) ;
    let isnum = /^\d+$/.test(this.fielddata.mobile);
    if (this.fielddata.name != '' && this.fielddata.login_id != '' && this.fielddata.mobile != '' && this.fielddata.station != '') {
      if (/\s/.test(this.fielddata.email) && /\s/.test(this.fielddata.mobile) && /\s/.test(this.fielddata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (this.fielddata.login_id.length >= 3 && this.fielddata.name.length >= 3) {
          if (mobile.length == 10) {
            if(isnum==true){
              this.saveModal();
            }else{
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

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

}
