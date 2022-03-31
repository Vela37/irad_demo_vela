import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateConfigService } from '../../../../translate-config.service';


import { ApiService } from '../../../../services/api.service';
import { flatMap } from 'rxjs/operators';

import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { DocumentViewer,DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { InAppBrowser,  InAppBrowserOptions,} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-gupload',
  templateUrl: './gupload.component.html',
  styleUrls: ['./gupload.component.scss'],
})
export class GuploadComponent implements OnInit {
  
  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  reportname='none';
  
  @Input() flag: string='No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  @Input() typeofreport: any;
  showflag:any='1';
  segflag: any = 1;
  uploadgeneral:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  uploadvehicle:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  uploadpassenger:number[] = [0, 0, 0, 0, 0, 0];
  uploadpedestrian:number[] = [0, 0, 0, 0, 0, 0];

  
  generaldocData:string[]= ['', '', '', '', '', '', '', '', '', '', '', ''];
  vehicledocData:string[]=['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  passengerdocData:string[]=['', '', '', '', '', ''];
  pedestriandocData:string[]=['', '', '', '', '', ''];

  generaldocViewData:string[]= ['', '', '', '', '', '', '', '', '', '', '', ''];
  vehicledocViewData:string[]=['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  passengerdocViewData:string[]=['', '', '', '', '', ''];
  pedestriandocViewData:string[]=['', '', '', '', '', ''];

  accid: any; selacc: any;
  selectedLanguage: string; params: any;
  ln: any;

  ngOnInit() {}

  constructor(
    private modalctrl:ModalController,
    private base64: Base64,
    private altctrls: AlertController,
    private api:ApiService,
    private opener: FileOpener,
    private file: File,
    private platform:Platform,
    private document: DocumentViewer,
    private toastController: ToastController,
    private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService,) { 

      this.selacc=JSON.parse(localStorage.getItem('selacc'));
     //this.accid =this.selacc.accid;
     console.log("AccId",this.selacc);

     this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln = localStorage.getItem('ln');
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

    console.log("passengerdocData",this.generaldocData[12]);
    console.log("passengerdocData",this.vehicledocData[16]);
    console.log("passengerdocData",this.pedestriandocData[6]);
    console.log("passengerdocData",this.passengerdocData[6]);
    }
    
    changeListener($event,docno,flag) : void {
     // this.reportname='wound';
     console.log("Flag",flag);
     console.log("$event.target.files",$event.target.files);
     this.filesPath  = $event.detail.value;
     this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
     this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);

      
      if(this.fileType=="pdf"){
        console.log("Proper Format")
        this.readThis($event.target,docno,flag,this.fileName);  
        
      }else{
        console.log("Improper format");
        this.presentToast("Select a proper file type");
      }
    }

    
    readThis(inputValue: any,docno,flag,fileName) {
    
    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log("base 64 VAL",this.image);
      
      this.addFile(this.image,docno,flag,fileName)
    }
    console.log("Filepath",this.filesPath);
   
    myReader.readAsDataURL(file);
  }

  

  addFile(image,docno,flag,filepath){
    if(docno==1){
      this.uploadgeneral[flag]=1;
      this.generaldocData[flag]=image;
      this.generaldocViewData[flag]=filepath;
      console.log("Adding 1",this.generaldocData[flag]);
    }else if(docno==2){
      this.uploadvehicle[flag]=1;
      this.vehicledocData[flag]=image;
      this.vehicledocViewData[flag]=filepath;
      console.log("Adding 2",this.vehicledocData[flag]);
    }else if(docno==3){
      this.uploadpassenger[flag]=1;
      this.passengerdocData[flag]=image;
      this.passengerdocViewData[flag]=filepath;
      console.log("Adding 3",this.passengerdocData[flag]);
    }else if(docno==4){
      this.uploadpedestrian[flag]=1;
      this.pedestriandocData[flag]=image;
      this.pedestriandocViewData[flag]=filepath;
      console.log("Adding 4",this.pedestriandocData[flag]);
    }
  }

  saveAndOpenPdf(pdf: string, filename: string){
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
      this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), {replace: true})
        .then(() => {
            this.opener.open(writeDirectory + filename, 'application/pdf')
                .catch(() => {
                    console.log('Error opening pdf file');
                });
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });
    
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
}

  uploadPdf(docno,flag,docname){
    console.log("uploadPdf",docname);
    let docmode;
    if(docno==1){
      this.uploadgeneral[flag]=2;
      docmode='General';
      console.log("Doc val1:",this.generaldocData[flag]);
      this.savePdf(docno,flag,docmode,docname,this.generaldocData[flag]);
    }else if(docno==2){
      this.uploadvehicle[flag]=2;
      docmode='Vehicle';
      console.log("Doc val2:",this.vehicledocData[flag]);
      this.savePdf(docno,flag,docmode,docname,this.vehicledocData[flag]);
    }else if(docno==3){
      this.uploadpassenger[flag]=2;
      docmode='Passenger';
      console.log("Doc val3:",this.passengerdocData[flag]);
      this.savePdf(docno,flag,docmode,docname,this.passengerdocData[flag]);
    }else if(docno==4){
      this.uploadpedestrian[flag]=2;
      docmode='Pedestrian';
      console.log("Doc val4:",this.pedestriandocData[flag]);
      this.savePdf(docno,flag,docmode,docname,this.pedestriandocData[flag]);
    }
            
  }

  savePdf(docno,flag,docmode,docname,document){
    let postDate = {
      //mode: 'imageupload',
      accidentId:this.accid,
      modeOfTheDocument: docmode,
      nameOfTheDocument: docname,
      documents: document,
      linkId:'',
      remarks:'',
      active:'',
      insertedBy:''
    }
    // alert(JSON.stringify(postDate));
    this.api.darsave('dar/insertdocuments', postDate).subscribe(
      (data: any) => {
        console.log(data); 
        if(docno==1){
          this.generaldocData[flag]='';
          this.uploadgeneral[flag]=3;
          //this.successgeneral[flag]=1;
        }else if(docno==2){
          this.vehicledocData[flag]='';
          this.uploadvehicle[flag]=3;
          //this.successvehicle[flag]=1;
        }else if(docno==3){
          this.passengerdocData[flag]='';
          this.uploadpassenger[flag]=3;
          //this.successpassenger[flag]=1;
        }else if(docno==4){
          this.pedestriandocData[flag]='';
          this.uploadpedestrian[flag]=3;
          //this.successpassenger[flag]=1;
        }
        
      });
  }

  viewPdf(docno,flag){
    var pdf;
    if(docno==1){
      pdf=this.generaldocData[flag];
      console.log("pdf 1",pdf);
      this.openWithSystemBrowser(pdf);
    }else if(docno==2){
      pdf=this.vehicledocData[flag];
      console.log("pdf 2",pdf);
      this.openWithSystemBrowser(pdf);
    }else if(docno==3){
      pdf=this.passengerdocData[flag];
      console.log("pdf 3",pdf);
      this.openWithSystemBrowser(pdf);
    }else if(docno==4){
      pdf=this.pedestriandocData[flag];
      console.log("pdf 4",pdf);
      this.openWithSystemBrowser(pdf);
    }
  }

  async convertb64toBlob(){
    var contentType = 'application/pdf';
    const base64Response = await fetch(`application/pdf;base64,${this.generaldocData[1]}`);
    const blob = await base64Response.blob();
    var dataBlob=this.b64toBlob(this.generaldocData[1],contentType);
    console.log("dataBlob", dataBlob);
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  
  // b64toBlob(b64Data, contentType) {
  //   var sliceSize = 512;
    
  //     //decode base64 data
  //     var byteCharacters = atob(b64Data);
  //     var byteArrays = [];
    
  //     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //         var slice = byteCharacters.slice(offset, offset + sliceSize);
    
  //         var byteNumbers = new Array(slice.length);
  //         for (var i = 0; i < slice.length; i++) {
  //             byteNumbers[i] = slice.charCodeAt(i);
  //         }
    
  //         var byteArray = new Uint8Array(byteNumbers);
    
  //         byteArrays.push(byteArray);
  //     }
    
  //     var blob = new Blob(byteArrays, {type: contentType});
  //     return blob;
  //   }

  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes", //Windows only
  };

  public openWithSystemBrowser(url: string) {
    let target = "_blank";
    this.iab.create(url, target);
  }
  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.iab.create(url, target, this.options);
  }
    public openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.iab.create(url, target, this.options);
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  public viewGeneral() {
    this.segflag = 1;
  }

  public viewPassenger() {
    this.segflag = 3;
  }

  public viewVehicle() {
    this.segflag = 2;
  }

  public viewPedestrian(){
    this.segflag =4;
  }
  
  public closeModal() {
    this.modalctrl.dismiss();
  }

}
