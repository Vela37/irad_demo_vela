import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addlsauser',
  templateUrl: './addlsauser.component.html',
  styleUrls: ['./addlsauser.component.scss'],
})
export class AddlsauserComponent implements OnInit {
  selectedLanguage: string; params: any;
  @Input() admin: any;
  lsauserdata = {
    'name': '', 'login_id': '', 'employee_id': '',
    'email': '', 'mobile': '', 'district': '', 'state': '', 'station': '', 'officeid': ''
  };
  message: any = null;

  private userSub: Subscription;
  isAuthenticated = false;
  user: any;
  title: any;

  constructor(private modalctrl: ModalController, private translateConfigService: TranslateConfigService, private api: ApiService, private toastController: ToastController,
    private authService: AuthService) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  ngOnInit() {
    this.authService.autoLogin(); console.log('user');
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;
        console.log("User value log check");
        //this.showUsers();
      }
      console.log('admin',this.admin);
    });
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  saveModal() {
    this.message = null;
    console.log(this.lsauserdata);
    let postDate = {
      mode: 'addLSAUser',
      admin: this.admin,
      user: this.lsauserdata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');

        this.presentToast("User Created Successfully !");
        this.modalctrl.dismiss(true);

      } else {
        this.message = data.msg.split(".");

      }
    });
    // this.modalctrl.dismiss();
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

  validationCheck() {
    var mobile = new String(this.lsauserdata.mobile);
    let isnum = /^\d+$/.test(this.lsauserdata.mobile);
    var email = new String(this.lsauserdata.email);

    var nameval = new String(this.lsauserdata.name);
    var loginid = new String(this.lsauserdata.login_id);


    var name;
    if (this.lsauserdata.login_id.match("^[A-Za-z0-9]+$")) {
      console.log("true")
      name = true;
    } else {
      console.log("false")
      name = false;
    }

    if (this.lsauserdata.name != '' && this.lsauserdata.login_id != '' && this.lsauserdata.mobile != '') {
      if (/\s/.test(this.lsauserdata.email) && /\s/.test(this.lsauserdata.mobile) && /\s/.test(this.lsauserdata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (loginid.length <= 30) {
            if (name == true) {
              if (mobile.length == 10) {
                if (isnum == true) {
                  if (email.length <= 50) {
                    this.saveModal();
                  }
                  else {
                    this.presentToast("Email id length should be less than 50 !!!");
                  }
                } else {
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
          this.presentToast("Login id length should be less than 30!!!")
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