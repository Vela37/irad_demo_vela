import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { VideoPlayer } from '@ionic-native/video-player/ngx';
import{ environment } from  '../../../environments/environment';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UsersService } from '../../services/shared.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';

import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { UploadjirComponent } from '../../popups/uploadjir/uploadjir.component'


@Component({
  selector: 'app-jir',
  templateUrl: './jir.component.html',
  styleUrls: ['./jir.component.scss'],
})
export class JirComponent implements OnInit {

  @Input() selacc:any; 
  @Input() jir:any; 
  jirflag:any;
  isAuthenticated = false;
  private userSub: Subscription;
  user:any;
  
  constructor(private modalctrl: ModalController,
    private authService: AuthService,
    public platform: Platform,
    private iab: InAppBrowser,
    private api: ApiService,
    private fileOpener: FileOpener,
    private ft:FileTransfer,
    private file: File 
    ) { }

  ngOnInit() {
    this.getuserdetails();

    console.log('------------------------');
    if(this.jir!=null)
    {
      this.jirflag=this.jir[0];
    }else
    {
      this.jirflag=false;
    }
   //alert(this.jirflag);
    console.log(this.selacc);
    console.log('------------------------');
  }
updatejir(flg){


 let postDate = {
   mode:"sendjir",
   accid:this.selacc.accid,
   flag:flg,
 };

     this.api.post("mvi.php", postDate).subscribe((data: any) => {

      if(flg==1)
      {
        this.jirflag.jir_transport=1;
      }
      if(flg==2)
      {
        this.jirflag.jir_highway=1;
      }
     
    });
}
async uploadsignedjir(){
  const modalped = await this.modalctrl.create({
    component: UploadjirComponent,
    cssClass: 'halfscreen',
    componentProps: { 
      'accid': this.selacc.accid, 
      'jir':this.jirflag
    }
   
 
  });

  modalped.onWillDismiss().then(dataReturned => {
    
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });
}
viewsignedjir(){
    
    let ln='en';
    let pdfurl=environment.apiUrl+'reports/jirdocview.php?ln='+ln+'&id='+this.selacc.accid;
    this.downloadAndOpenPdf(pdfurl);

  //this.openWithSystemBrowser(pdfurl)
  }
  viewsigneddocument(){
    
    let ln='en';
    let pdfurl=environment.apiUrl+'reports/jir.php?ln='+ln+'&id='+this.selacc.accid;
    this.downloadAndOpenPdf(pdfurl);

  //this.openWithSystemBrowser(pdfurl)
  }
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  public openWithSystemBrowser(url : string){
    
    let target = "_system";
    this.iab.create(url,target,this.options);
}

downloadAndOpenPdf(pdf_url){


  if (this.platform.is('android')) {
    console.log('app');
  } else {
    this.openWithSystemBrowser(pdf_url);
    console.log("mobile :false");
    return false;
  }

  console.log("PDF_URL",pdf_url)
  //this.showLoader();
  let pdfurl="";
  let path=this.file.dataDirectory;
  const transfer=this.ft.create();

  transfer.download(pdf_url,`${path}myfile.pdf`).then(entry=>{
    let url=entry.toURL();

    if(this.platform.is('android')){
    //  this.hideLoader();
      this.fileOpener.open(url,'application/pdf');
    }
  })
}

  getuserdetails(){
  

      this.authService.autoLogin();
      this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; 
      if(this.isAuthenticated){ 
        
        this.user=user;
        //console.log(user);
      
      }
    });
 
  }

  closeModal()
  {
    this.modalctrl.dismiss();
  }

}
