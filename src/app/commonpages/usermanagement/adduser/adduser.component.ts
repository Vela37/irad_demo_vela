import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';


import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  selectedLanguage: string; params: any;
  @Input() admin: any;

  userdata = {
    'name': '', 'login_id': '', 'employee_id': '',
    'email': '', 'mobile': '', 'district': '', 'state': '', 'station': '', 'field': ''
  };
  message: any = null;

  private userSub: Subscription;
  isAuthenticated = false;
  user: any;
  title: any; 

  constructor(private modalctrl: ModalController, private translateConfigService: TranslateConfigService, private api: ApiService, private toastController: ToastController,
    private authService: AuthService) { }

  ngOnInit() {
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

    if (this.user.role == 1) {
      this.title = 'State Admin for '
    } else if (this.user.role == 2) {
      this.title = 'District Admin for'
    } else if (this.user.role == 3) {
      this.title = 'Station Admin for '
    } else if (this.user.role == 4) {
      this.title = 'Field User for '
    }

  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
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

  saveModal() {
    this.message = null;
    console.log(this.userdata);
    let postDate = {
      mode: 'addPoliceUser',
      admin: this.admin,
      user: this.userdata
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

  validationCheck() {
    var mobile = new String(this.userdata.mobile);
    var email = new String(this.userdata.email);
    let isnum = /^\d+$/.test(this.userdata.mobile);

    var nameval = new String(this.userdata.name);
    var loginid = new String(this.userdata.login_id);


    var name;
    if (this.userdata.login_id.match("^[A-Za-z0-9]+$")) {
      console.log("true")
      name = true;
    } else {
      console.log("false")
      name = false;
    }
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (this.userdata.name != '' && this.userdata.login_id != '' && this.userdata.mobile != '') {
      if (/\s/.test(this.userdata.email) && /\s/.test(this.userdata.mobile) && /\s/.test(this.userdata.login_id)) {
        this.presentToast("Email id or Mobile no or Name contains whitespaces!!!")
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
          this.presentToast("Login id  length is less than 30 !!!")
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
