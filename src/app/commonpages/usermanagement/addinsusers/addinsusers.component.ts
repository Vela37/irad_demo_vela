import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

import { AddinsuserComponent } from '../../usermanagement/addinsuser/addinsuser.component'
@Component({
  selector: 'app-addinsusers',
  templateUrl: './addinsusers.component.html',
  styleUrls: ['./addinsusers.component.scss'],
})
export class AddinsusersComponent implements OnInit {

  @Input() insuserdata: any;
  selectedLanguage: string; params: any;
  insdata = {
    'state': '', 'name': '', 'login_id': '',
    'email': '', 'mobile': ''
  };

  constructor(private alertCtrl: AlertController, private modalctrl: ModalController, private api: ApiService, private toastController: ToastController, private translateConfigService: TranslateConfigService) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }

  ngOnInit() {

    console.log('this.insuserdata',this.insuserdata)

   }

  async addINSUser() {
    let admin = JSON.parse(JSON.stringify(this.insuserdata)); //this.stateuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: AddinsuserComponent,
      componentProps: { 'adduser': '', 'admin': admin }
      /* componentProps: { 
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.loadINSUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async disableUser(usr) {
    let postDate = {
      mode: 'disableINSUser',
      usr: usr
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

            this.api.post('usermanagement', postDate).subscribe((data: any) => {
              console.log(data);
              if (data.flag == true) {
                this.presentToast("User Active status changed sucessfully");
                //this.modalctrl.dismiss(true);
                this.loadINSUsers(0);
              }
            });

          }
        }
      ]
    });

    await alert.present();
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


  loadINSUsers(offset) {

    console.log('loadINSUsers', this.insuserdata)
    // this.loading=true;
    let postDate = {
      mode: 'loadINSUsers',
      offid: this.insuserdata.code,
      offset: offset
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);

      this.insuserdata = data.data[0];
      //  this.loading=false;
    });
    // 
  }
}
