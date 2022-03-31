import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { environment } from '../../../../environments/environment';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-reportsview',
  templateUrl: './reportsview.page.html',
  styleUrls: ['./reportsview.page.scss'],
})
export class ReportsviewPage implements OnInit {
  selectedLanguage: string; params: any;
  accid: any; selacc: any;
  ln:any;
  
  constructor(private api:ApiService,private translateConfigService:TranslateConfigService,
    public loadingController: LoadingController,private fileOpener: FileOpener,
    private ft:FileTransfer,
    private transfer: FileTransfer,
    public platform: Platform,
    private iab: InAppBrowser,
    private file: File 
    ) { 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln=localStorage.getItem('ln');

    
     this.selacc=JSON.parse(localStorage.getItem('selacc'));
     this.accid =this.selacc.accid;
     console.log("AccId",this.selacc);
  }

  ngOnInit() {
    
  }

  viewPdf(flag){
    let ln = this.selectedLanguage;
    let pdfurl = '';
    
      if (flag == 1) {
        pdfurl = environment.darUrl + 'dar/form1';
      } else if (flag == 2) { 
        pdfurl = environment.darUrl + 'dar/form2';
      }

    if (this.platform.is('android')) {
      this.downloadAndOpenPdf(pdfurl);
      console.log("mobile :true");
    } else {
      this.openWithSystemBrowser(pdfurl);
      console.log("mobile :false");
    }

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
    let target = "_blank";
    this.iab.create(url, target, this.options);
  }

}
