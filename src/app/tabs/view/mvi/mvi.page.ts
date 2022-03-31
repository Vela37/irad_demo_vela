import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import{ environment } from  '../../../../environments/environment';


import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {  ModalController } from '@ionic/angular';
import {RtoaddComponent} from './rtoadd/rtoadd.component';

import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-mvi',
  templateUrl: './mvi.page.html',
  styleUrls: ['./mvi.page.scss'],
})
export class MviPage implements OnInit {

  selectedLanguage:string;  params:any;
  role:number; data:any;  transData:any=null;
  isAuthenticated = false;
  private userSub: Subscription;
  accid:any; mapurl:any;  videourl:string[]=['','',''];  
  selacc:any; reqbtn:boolean=false;
 
  private apiUrl= environment.apiUrl;
  constructor(
    private translateConfigService: TranslateConfigService,private modalctrl: ModalController,
    private router:Router, private iab: InAppBrowser,  public platform: Platform,
    private api:ApiService, private authService: AuthService,
    private alertController: AlertController,
    private VideoPlayer:VideoPlayer,
    public loadingController: LoadingController,
    private fileOpener: FileOpener,
    private ft:FileTransfer,
    private transfer: FileTransfer,
    private file: File 

    ){
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
  }
  
 
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid=this.selacc.accid;

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.role=+user.role;
      }
    });

    this.loadDetails();
   // this.loadTransport();
  }
  ionViewDidEnter() {
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
  //  this.ln=localStorage.getItem('ln');
  }

  loadTransport(){
    let postDate={
      mode:'loadTransportDetails',
      //zone:this.rtoinfo.zone
    }
    this.api.post('transportconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data.data.length>0){
        this.transData=data.data[0];
        this.loadDetails();
        }else{
          this.transData=null;
        }
        console.log(this.transData);
 
     });
  
}
  
  loadDetails(){
    
    let postDate={
        mode:'mvistatus',
        ln:this.selectedLanguage,
        id:this.accid
    };
    this.api.post('mvi',postDate).subscribe((data: any)=>{
        console.log(data); 
        this.data=data.data;  
        console.log('test');     
    });

  }

  addRTODetails(){
    this.router.navigate(['/rolepersonalization']);
  }

  async selectRTO() {
    const modalped = await this.modalctrl.create({
      component: RtoaddComponent,
      componentProps: { 'rtoinfo': this.transData }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      //if(dataReturned.data==true)
      this.loadTransport();
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }


  enablereqbtn(){
    this.reqbtn=true;
  }


  async requestMVI() {
    let selvehs='';
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].request==true)
        selvehs+=this.data[i].vehregno+' ,';
    }
    if(selvehs=='') return;

    let alert = await this.alertController.create({
      header: 'iRAD',
      message: "Request for MVI's Inscpetion ?",
      subHeader:selvehs,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            //console.log(data);
            
              this.requestMVI1()
           
          }
        }
      ]
    });
    alert.present();
  }

  requestMVI1(){

    console.log('mvi request');
    console.log(this.data);
    var selvehs=[]; var j=0;
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].request==true)
        selvehs[j++]=this.data[i].vehregno;
    }
        let postDate={
          mode:"requestmvi",
          id:this.accid,
          veh:selvehs
       }
        this.api.post('mvi',postDate).subscribe((data: any)=>{
          this.loadDetails();
        });
    
        
      }

      reqMVIPDF(vehregno){
        console.log('reqMVIPDF');
        let ln='en';
        let pdfurl=environment.apiUrl+'reports/mvirequest.php?ln='+ln+'&id='+this.accid+'&veh='+vehregno;
   

        if (this.platform.is('android')) {
          this.downloadAndOpenPdf(pdfurl);
          console.log("mobile :true");
        } else {
          this.openWithSystemBrowser(pdfurl);
          console.log("mobile :false");
        }
    

      //this.openWithSystemBrowser(pdfurl)
      }

      resMVIPDF(vehregno){
        console.log('resMVIPDF');
        let ln='en';
        let pdfurl=environment.apiUrl+'reports/mviresponse.php?ln='+ln+'&id='+this.accid+'&veh='+vehregno;

        if (this.platform.is('android')) {
          this.downloadAndOpenPdf(pdfurl);
          console.log("mobile :true");
        } else {
          this.openWithSystemBrowser(pdfurl);
          console.log("mobile :false");
        }
    
   
     // this.openWithSystemBrowser(pdfurl)
      }


      
      downloadAndOpenPdf(pdf_url){
        console.log("PDF_URL",pdf_url)
        this.showLoader();
        let pdfurl="";
        let path=this.file.dataDirectory;
        const transfer=this.ft.create();
    
        transfer.download(pdf_url,`${path}myfile.pdf`).then(entry=>{
          let url=entry.toURL();
    
          if(this.platform.is('android')){
            this.hideLoader();
            this.fileOpener.open(url,'application/pdf');
          }
        })
      }

      showLoader() {
        this.loadingController.create({
          message: 'Please wait loading...',
          spinner: "circles"
        }).then((res) => {
          res.present();
        });
    
      }
    
      hideLoader() {
        this.loadingController.dismiss().then((res) => {
          console.log('Loading dismissed!', res);
        }).catch((error) => {
          console.log('error', error);
        });
    
      }
      options: InAppBrowserOptions = {
        location: 'yes',//Or 'no' 
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'yes',//Android only ,shows browser zoom controls 
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only 
        closebuttoncaption: 'Close', //iOS only
        disallowoverscroll: 'no', //iOS only 
        toolbar: 'yes', //iOS only 
        enableViewportScale: 'no', //iOS only 
        allowInlineMediaPlayback: 'no',//iOS only 
        presentationstyle: 'pagesheet',//iOS only 
        fullscreen: 'yes',//Windows only    
      };
    




      public openWithSystemBrowser(url: string) {
        let target = "_system";
        this.iab.create(url, target, this.options);
      }
      public openWithInAppBrowser(url: string) {
        let target = "_blank";
        this.iab.create(url, target, this.options);
      }
      public openWithCordovaBrowser(url: string) {
        let target = "_self";
        this.iab.create(url, target, this.options);
      }
    
    
    }
    