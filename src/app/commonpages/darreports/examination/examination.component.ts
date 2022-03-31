
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController ,LoadingController,Platform } from '@ionic/angular';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { ApiService } from 'src/app/services/api.service';
import { UsersService } from 'src/app/services/shared.service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
})
export class ExaminationComponent implements OnInit {

  @Input() formno:any; numberInput:number[]=[]; ms:any;message:any; maxdate:any;mindate:any;
  data={accid:'',status:'',datetime:''} ; selacc:any;
  reasons:any; reqList:any; user:any;

  constructor(
    private modalctrl: ModalController, private api:ApiService,private toastController:ToastController,
    private shserv:UsersService,
    private iab: InAppBrowser,
    private previewAnyFile: PreviewAnyFile,  public platform: Platform,
    public loadingController: LoadingController, private fileOpener: FileOpener,
    private ft:FileTransfer, private file: File 
 
  ) {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    //this.forms[0]={'name':"Form - I",'description':"FAR",'content':' content'};
    for (let j = 0; j < 100; j++) { this.numberInput[j] = j; }
   }

  ngOnInit() {

    this.user= JSON.parse(localStorage.getItem('userData'));
    this.data.accid=this.selacc.accid;
    //this.forms[0]={'name':"Form - I",'description':"FAR",'content':' content'};
    this.loadData();


  }

//   ionViewDidEnter(){
//     console.log("ionViewDidEnter");
//     this.loadData();
// }

closeModal() {

    this.modalctrl.dismiss();
  }

  validationCheck(){

    if(this.data.status!='' ){

    this.formSave();
    }else{
      this.presentToast("Please Fill all the values");
    }

  }
 

  async  formSave(){
    //this.isLoading=true; 
    let postDate={
      mode:'DARExamination',
      data:this.data
    }
    this.api.post('dar.php',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
       // this.modalctrl.dismiss(true);

        this.presentToast("Requested Successfully !");
        this.loadData();

      }else{
        this.presentToast(data.msg);
      }
     // this.isLoading=false; 
    });
  }



  
  loadData(){

    let postDate={
      mode:'DARExaminationList',
      data:this.data
    }
    this.api.post('dar.php',postDate).subscribe((data: any)=>{
      console.log(data); 
      this.reqList=data.data;

    });

  }
  

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  viewProfile(usrname) {
  
    console.log(usrname);
    if(usrname!='' && usrname!=null ){
    this.shserv.viewProfile(usrname);
    }
  
  }

  ExaminationPDF(id){

    let ln='en';
    let pdfurl=environment.apiUrl+'reports/darexaminationpdf.php?ln='+ln+'&id='+id;
    console.log('viewMIR',pdfurl);
    this.downloadAndOpenPdf(pdfurl);

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


}
