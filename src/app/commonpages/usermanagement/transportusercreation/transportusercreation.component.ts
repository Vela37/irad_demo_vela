import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';

import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transportusercreation',
  templateUrl: './transportusercreation.component.html',
  styleUrls: ['./transportusercreation.component.scss'],
})
export class TransportusercreationComponent implements OnInit {
  transportdata = {
    'name': '', 'login_id': '', 'employee_id': '',
    'email': '', 'mobile': ''
  };

  @Input() admin: any;

  psStateOptions: any; message: any = null;
  RTO_Label: any = "TN";
  selectedLanguage: string; params: any;

  private userSub: Subscription;
  isAuthenticated = false;
  user: any;
  title: any;

  constructor(private modalctrl: ModalController, private api: ApiService, private toastController: ToastController, private translateConfigService: TranslateConfigService,
    private authService: AuthService) { }

  ngOnInit() {

    console.log('admin', this.admin);

    // console.log("State user data",this.stateuserdata);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');

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
    });

    if (this.user.role == 31) {
      this.title = 'RTO for '
    } else if (this.user.role == 35) {
      this.title = 'Unit Office for'
    } else if (this.user.role == 37) {
      this.title = 'Station Admin for '
    }
  }

  saveModal() {
    this.message = null;
    console.log(this.transportdata);
    let postDate = {
      mode: 'addTransUser',
      admin: this.admin,
      user: this.transportdata
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
  }

  validationCheck() {
    var mobile = new String(this.transportdata.mobile);
    let isnum = /^\d+$/.test(this.transportdata.mobile);
    var email = new String(this.transportdata.email);

    var nameval = new String(this.transportdata.name);
    var loginid = new String(this.transportdata.login_id);


    var name;
    if (this.transportdata.login_id.match("^[A-Za-z0-9]+$")) {
      console.log("true")
      name = true;
    } else {
      console.log("false")
      name = false;
    }

    console.log("isnum", isnum);
    if (this.transportdata.name != '' && this.transportdata.login_id && this.transportdata.mobile != '') {
      if (/\s/.test(this.transportdata.email) && /\s/.test(this.transportdata.mobile) && /\s/.test(this.transportdata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (loginid.length <= 30) {
            if (name == true) {
              if (mobile.length == 10) {
                if (isnum == true) {
                  if (email.length <= 50) {
                    this.saveModal();
                    console.log("Success");
                  }
                  else {
                    this.presentToast("Email id length should be less than 50 !!!");
                  }
                }
                else {
                  this.presentToast("Mobile No should not have characters !!!");
                }
              } else {
                console.log(this.transportdata.mobile.length);
                this.presentToast("Mobile No length should be 10 !!!")
              }
            } else {
              this.presentToast("Login id should not have special characters !!!");
            }
        }
        else {
          this.presentToast("Login id length should be less than 30 !!!")
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
