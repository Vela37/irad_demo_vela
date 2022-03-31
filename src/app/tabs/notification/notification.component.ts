import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { version } from 'process';
import { LocalstorageService } from '../../services/localstorage.service';
import { environment } from '../../../environments/environment.prod';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  spinner:boolean=true;
  version=environment.version;
  messages:any=null; updateflag=false; msgopt:any;mobiledevice:any;
    constructor(private modalctrl:ModalController,private api:ApiService,
      private localdb:LocalstorageService,    private authService: AuthService, 
      private platform: Platform,
      private splashScreen: SplashScreen, 
      private statusBar: StatusBar, 
      ) { 
  
        this.mobiledevice=this.localdb.checkPlatform();
  
      }

  ngOnInit() {

    this.getMessage();

    localStorage.setItem('msgcheckdate',new Date()+'');

  }
  getMessage(){

  this.messages=null;

      let postDate={
        mode:'messages',
        mobiledevice:this.mobiledevice
      //  district:this.rtosel.district
      }
      this.api.post('messages1',postDate).subscribe((data: any)=>{
        console.log(data);
        this.messages=data.data;
        this.msgopt=data.msgopt;
        if(this.msgopt.logout==true){
          this.authService.logout();

        }
        if(this.mobiledevice && this.msgopt.update){ console.log(this.msgopt.version,'-',this.version)
          this.updateflag=this.msgopt.update;
        }

       });
   
  }
  refMessges(event){
    this.getMessage();
    event.target.complete();
  }

  closeModal()  {
   
   this.modalctrl.dismiss(); 
  
 }

 cancelmodal() {
   //this.histroy = { accid:this.accid,nov:this.nov}; 

   this.modalctrl.dismiss();
 }




}
