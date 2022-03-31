import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../translate-config.service';
import { ApiService } from '../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import {MessageComponent} from '../popups/message/message.component'
import { environment } from '../../environments/environment.prod';
import { LocalstorageService } from '../services/localstorage.service';
import { NotificationComponent } from './notification/notification.component';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  selectedLanguage:string;  params:any;
  role:number; 
  isAuthenticated = false; version:any=environment.version;
  private userSub: Subscription;
  loginuser:{
    userid: string;
    name: string;
    role:string;
    dept:string;
    state_code:string;
    district_code:string;
    station_code:string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
  };
  
  ds:{}
  msgopt:any;   
  messages:any;
  constructor( private api:ApiService,
    private translateConfigService: TranslateConfigService,
    private dataService: DataService,
    private authService: AuthService,   private localdb:LocalstorageService,    
    private modalctrl: ModalController

  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    console.log('selectedLanguage ',this.selectedLanguage);

    this.loginuser= JSON.parse(localStorage.getItem('userData'));

    

  }
  ngOnInit() {
    
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    console.log('selectedLanguage ',this.selectedLanguage);

  this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.role=+user.role;
      }
    });



  this.ds=this.dataService.getOption();   
  console.log(this.ds=this.dataService.getOption());
  //
  

    this.msgopt={
      forceopen:false,
      shoIcon:false
    }
   
   // this.getMessage();
  // this.validationandnotification();
 } 

 getMessage(){ 

  this.messages=null;
      let postDate={ 
        mode:'msgopt',
        platform:this.localdb.checkPlatform()
      }
      this.api.post('messages1.php',postDate).subscribe((data: any)=>{
        console.log(data);
       
        if(data.msgopt!=null){
          this.msgopt=data.msgopt;
          if(this.msgopt.forceopen){
            let ed=new Date(localStorage.getItem('msgcheckdate'));
            let cd=new Date(); console.log('cd',cd , ',ed', ed)
            var diffTime = cd.getTime() - ed.getTime();  console.log('diffTime',diffTime)
            if(diffTime> (1000 * 3600 * 0.3)){ // 1/2 hours silent
              this.showMsg();
            }
           
          }
          }
         

       });
   

  }


 async showMsg() {
  const modalped = await this.modalctrl.create({
    component: MessageComponent,
    componentProps: { 'msginfo': '' }
    /* componentProps: {
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);
    //if(dataReturned.data==true)
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

async validationandnotification() {
  const modalped = await this.modalctrl.create({
    component: NotificationComponent,cssClass:'fullscreen',
    componentProps: { 'validation': '' }
    /* componentProps: {
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);
    //if(dataReturned.data==true)
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}



}
