import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { AdduserComponent } from '../adduser/adduser.component'
import { TransportusercreationComponent } from '../transportusercreation/transportusercreation.component'
import { AddhighwayuserComponent } from '../../usermanagement/addhighwayuser/addhighwayuser.component'
import { AddprojuserComponent } from '../addprojuser/addprojuser.component';

@Component({
  selector: 'app-stateusercreation',
  templateUrl: './stateusercreation.component.html',
  styleUrls: ['./stateusercreation.component.scss'],
})
export class StateusercreationComponent implements OnInit {
  @Input() stateuserdata: any = null; @Input() seldept: any;
  selectedLanguage: string; params: any;
  statedata = {
    'state': '', 'name': '', 'login_id': '',
    'email': '', 'mobile': ''
  };
  psStateOptions: any; message: any = null;

  constructor(private modalctrl: ModalController,
    private alertCtrl:AlertController,
    private api: ApiService, private toastController: ToastController, private translateConfigService: TranslateConfigService) { }

  ngOnInit() {
    console.log("State user data", this.stateuserdata);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.statedata.state = this.stateuserdata.code;
  }

  loadPSStates() {
    let postDate = {
      mode: 'loadPSFields',
      seldept: this.seldept
      //  district:this.rtosel.district
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      this.psStateOptions = data.data;
    });
  }

  async disableUser(usr) {
    let postDate = {
      mode: 'disableStatesUser', seldept: this.seldept,
      state: this.statedata.state,
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
                this.loadStateUsers(0);
              }
            });
        
           
            
          }
        }
      ]
    });

    await alert.present();



  }

  loadStateUsers(offset) {
    // this.loading=true;
    let postDate = {
      mode: 'loadStatesUsers',
      seldept: this.seldept,
      state: this.statedata.state,
      offset: offset
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);

      this.stateuserdata = data.data[0];
      //  this.loading=false;
    });
    // 
  }

  addUser() {
    if (this.seldept == 1) {
      this.addPSUser();
    } else if (this.seldept == 2) {
      this.addTransSUser();
    } else if (this.seldept == 3) {
      this.addHWUser();
    } else if (this.seldept == 10) {
      this.addProjUser();
    }
  }

  async addPSUser() {
    let admin = JSON.parse(JSON.stringify(this.stateuserdata)); //this.stateuserdata;
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
        this.loadStateUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addTransSUser() {
    let admin = JSON.parse(JSON.stringify(this.stateuserdata)); //this.stateuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: TransportusercreationComponent,
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
        this.loadStateUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }


  async addHWUser() {
    let admin = JSON.parse(JSON.stringify(this.stateuserdata)); //this.stateuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: AddhighwayuserComponent,
      componentProps: { 'addhighwayuser': '', 'admin': admin }
      /* componentProps: { 
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if (dataReturned.data == true)
        this.loadStateUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addProjUser() {
    let admin = JSON.parse(JSON.stringify(this.stateuserdata)); //this.stateuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: AddprojuserComponent,
      componentProps: { 'addprojuser': '', 'admin': admin }
      /* componentProps: { 
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if (dataReturned.data == true)
        this.loadStateUsers(0);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  saveModal() {
    this.message = null;
    console.log(this.statedata);
    let postDate = {
      // mode:'addPoliceUser',
      mode: 'addStateUser',
      seldept: this.seldept,
      user: this.statedata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');

        //this.modalctrl.dismiss(true);
        this.loadStateUsers(0);

        this.presentToast("User Created Successfully !");

      } else {
        this.message = data.msg.split(".");

      }
    });
    this.modalctrl.dismiss();
  }


  validationCheck() {
    console.log(this.statedata.state);
    var mobile = new String(this.statedata.mobile) ;
    let isnum = /^\d+$/.test(this.statedata.mobile);
    if (this.statedata.name != '' && this.statedata.login_id != '' && this.statedata.mobile != '' && this.statedata.state != '') {
      if (/\s/.test(this.statedata.email) && /\s/.test(this.statedata.mobile) && /\s/.test(this.statedata.login_id)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (this.statedata.login_id.length >= 3 && this.statedata.name.length >= 3) {
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


  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }


}
