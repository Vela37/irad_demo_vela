import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { TranslateConfigService } from '../../../translate-config.service';

@Component({
  selector: 'app-addhighwayuser',
  templateUrl: './addhighwayuser.component.html',
  styleUrls: ['./addhighwayuser.component.scss'],
})
export class AddhighwayuserComponent implements OnInit {
  @Input() addhighwayuser: any;
  @Input() admin: any;
  selectedLanguage: string; params: any;
  message: any;

  addhighwayuserdata = {
    'name': '', 'login_id': '', 'employee_id': '',
    'email': '', 'mobile': '', 'district': '', 'state': '', 'station': '', 'field': ''
  };
  constructor(private modalctrl: ModalController, private api: ApiService, private translateConfigService: TranslateConfigService
    , private toastController: ToastController,) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  ngOnInit() {
    console.log("Add highway user", this.addhighwayuser);
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  checkmobile(event) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      // this.passengerform.controls['mod_mobile'].setValue(value);
    }

  }

  saveModal() {
    let postDate = {
      mode: 'addHighwayUser',
      admin: this.admin,
      user: this.addhighwayuserdata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');

        this.presentToast("User Created Successfully !");
        this.modalctrl.dismiss(true);

      } else {
        //this.message= data.msg.split(".");

      }
    });
    // this.modalctrl.dismiss();
  }

  validationCheck() {
    var mobile = new String(this.addhighwayuserdata.mobile);
    var email = new String(this.addhighwayuserdata.email);
    let isnum = /^\d+$/.test(this.addhighwayuserdata.mobile);

    var nameval = new String(this.addhighwayuserdata.name);
    var loginid = new String(this.addhighwayuserdata.login_id);


    var name;
    if (this.addhighwayuserdata.login_id.match("^[A-Za-z0-9]+$")) {
      console.log("true")
      name = true;
    } else {
      console.log("false")
      name = false;
    }

    if (this.addhighwayuserdata.name != '' && this.addhighwayuserdata.login_id != '' && this.addhighwayuserdata.mobile != '') {
      if (/\s/.test(this.addhighwayuserdata.email) && /\s/.test(this.addhighwayuserdata.mobile) && /\s/.test(this.addhighwayuserdata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (loginid.length <= 30) {
            if (name == true) {
              if (mobile.length == 10) {
                if (isnum == true) {
                  if (email.length <= 50) {
                  this.saveModal();
                  }else{
                    this.presentToast("Email id length should be less than 50 !!!");
                  }
                }
                else {
                  this.presentToast("Mobile No should not have characters !!!");
                }
              } else {
                this.presentToast("Mobile No length should be 10 !!!")
              }
            } else {
              this.presentToast("Login id should not have special characters !!!");
            }
          } 
        else {
          this.presentToast("Login id length should be less than 30 !!!");
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


}
