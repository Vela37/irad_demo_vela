import { Component, Input, OnInit } from "@angular/core";
import { TranslateConfigService } from "../../../translate-config.service";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../services/api.service";
import {
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
} from "@ionic/angular";
import { TransportusercreationComponent } from "../transportusercreation/transportusercreation.component";
import { AuthService } from "../../../commonpages/login/auth.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-addrto",
  templateUrl: "./addrto.component.html",
  styleUrls: ["./addrto.component.scss"],
})
export class AddrtoComponent implements OnInit {
  selectedLanguage: string;
  params: any;
  user: any = null;
  private userSub: Subscription;
  isAuthenticated = false;
  loading: boolean = false;
  @Input() rtouser: any;

  message: any = null;
  constructor(
    private modalctrl: ModalController,
    private alertCtrl: AlertController,
    private translateConfigService: TranslateConfigService,
    private api: ApiService,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log("rtouser", this.rtouser);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");

    this.authService.autoLogin();
    console.log("user");
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //console.log(user);
      console.log("user");
      console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;
        //this.showUsers();
      }
    });
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  showUsers() {
    if (this.user.role == "31") {
      this.loadRTOUsers(0);
    } else if (this.user.role == "35") {
      this.loadMVIUsers(0);
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  async addUser() {
    //console.log("RTO values",i);
    let admin = JSON.parse(JSON.stringify(this.rtouser)); //this.districtuserdata;
    admin.users = null;
    const modalped = await this.modalctrl.create({
      component: TransportusercreationComponent,
      componentProps: { rtouser: "", admin: admin },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showUsers();
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async disableUser(usr) {
    let postDate = {
      mode: "disableTransUser",
      rto: this.rtouser.rto,
      usr: usr,
    };



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
           
            this.api.post("usermanagement", postDate).subscribe((data: any) => {
              console.log(data);
              if (data.flag == true) {
                this.presentToast("User Active status changed sucessfully");
                // this.modalctrl.dismiss(true);
                this.showUsers();
              }
            });
            
          }
        }
      ]
    });

    await alert.present();
    
  }

  loadRTOUsers(offset) {
    // this.loading=true;
    let postDate = {
      mode: "loadTransRTOsUsers",
      rto: this.rtouser.code,
      offset: offset,
    };
    this.api.post("usermanagement", postDate).subscribe((data: any) => {
      console.log(data);

      this.rtouser = data.data[0];
      //  this.loading=false;
    });
    //
  }
  loadMVIUsers(offset) {
    // this.loading=true;
    let postDate = {
      mode: "loadTransMVIUsers",
      rto: this.rtouser.code,
      offset: offset,
    };
    this.api.post("usermanagement", postDate).subscribe((data: any) => {
      console.log(data);

      this.rtouser = data.data[0];
      //  this.loading=false;
    });
    //
  }
}
