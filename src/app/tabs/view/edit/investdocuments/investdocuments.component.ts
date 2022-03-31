import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { TranslateConfigService } from '../../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { UploaddocComponent } from '../../../view/edit/uploaddoc/uploaddoc.component';
import { GuploadComponent } from '../gupload/gupload.component'

import { HttpClient } from '@angular/common/http'

import { FileChooser } from '@ionic-native/file-chooser/ngx'
import { FilePath } from '@ionic-native/file-path/ngx'
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DocumentViewer,DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: 'app-investdocuments',
  templateUrl: './investdocuments.component.html',
  styleUrls: ['./investdocuments.component.scss'],
})
export class InvestdocumentsComponent implements OnInit {
  
  selectedLanguage: string; params: any;
  ln: any;
  accid: any; selacc: any;
  segflag: any = 1;
  returnpath: string = "";

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


  successgeneral:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  successvehicle:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  successpassenger:number[] = [0, 0, 0, 0, 0, 0];

  browser:any;  showflag:any='1';

  fileToUpload: File = null;
  previewUrl:any = null;
  fileURL:any;
  
  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  imageval;
  public imageUrl : SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,private api: ApiService, private translateConfigService: TranslateConfigService,
    private filePath: FilePath, private fileChooser: FileChooser,    private fileOpener: FileOpener,
    private base64: Base64,private plt:Platform,    private document: DocumentViewer,
    public httpClient: HttpClient, private modalctrl: ModalController, private toastController: ToastController,) {
    
      this.selacc=JSON.parse(localStorage.getItem('selacc'));
     //this.accid =this.selacc.accid;
     console.log("AccId",this.selacc);

     if (this.plt.is('android')) {
      console.log("running on Android device!");
      console.log("mobile :true");
      this.browser=0;

    } else  {
      this.browser=1;
      console.log("running in a browser on mobile!");
      console.log("mobile :false");
    }
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln = localStorage.getItem('ln');
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;


  }
  public upload(list: FileList): void {

    const urlToBlob = window.URL.createObjectURL(list.item(0)) 
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob); 
  }
  ngOnInit() { 
    this.checkPlatform();
  }

  gotoUpload(docno,flag){
    if(this.browser==0){
      this.pickFile(docno,flag);
    }else if(this.browser==1){
      this.goToUploaddoc(docno,flag);
    }
}

async goToUploadingdoc() {
  const modal = await this.modalctrl.create({
      component:GuploadComponent,
      
    });
   modal.onWillDismiss().then(dataReturned => {
    
    });
    return await modal.present().then(_ => {
    }); 
  }

async goToUploaddoc(docno,flag) {
  console.log("InvestDoc",docno,flag);
  const modal = await this.modalctrl.create({
      component:UploaddocComponent,
      componentProps: {
        'flag':'1',
        docno:docno
      }
    });
   modal.onWillDismiss().then(dataReturned => {
    
    });
    return await modal.present().then(_ => {
    }); 
  }
  
  checkPlatform(){ console.log("checkPlatform");
  if(this.plt.is('cordova')){
    console.log("mobile :true");
    this.browser=0;
    return true;
  }else{
    this.browser=1;
    console.log("mobile :false");
  }
  return false;
}
changeListener($event) : void {
  this.readThis($event);
}

readThis(inputValue: any) : void {
  //var file:File = inputValue.files[0]; 
  var file = document.querySelector(inputValue.files);
  var myReader:FileReader = new FileReader();

  myReader.onloadend = function(e){
    // you can perform an action with readed data here
    console.log(myReader.result);
  }

  myReader.readAsText(file);
}
changeListenerss($event) : void {
  // this.reportname='wound';
 // console.log($event.detail.value);

  this.filesPath  = $event.detail.value;
  this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
  this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);

  //alert(this.fileType);
 // alert(this.filesPath);
  alert(this.fileType);

  // this.readThis($event.target);
  var myReader:FileReader = new FileReader();
/*
  myReader.readAsDataURL(this.filesPath,  'ddd.').then(result => { 
   
    console.log(result);
  });

  */
 
 }
 
 readThisccc(inputValue: any) {
    
  var file = document.querySelector(
    'input[type=file]')['files'][0]

  var myReader:FileReader = new FileReader();
  myReader.onloadend = (e) => {
    this.image = myReader.result;
  //  this.uploadsigneddocument();
  }
 // myReader.readAsDataURL(file);
  myReader.readAsDataURL(file); 

}
 
 /*
changeListener($event) : void {
  
  
  // this.reportname='wound';
  console.log($event.detail.value);
  
  this.filesPath  = $event.detail.value;
  this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
  console.log("Filename",this.fileName);
  this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
  console.log("fileType",this.fileType);
  
  //this.read();
  this.readThis($event.target);
  this.getBase64StringByFilePath(this.fileName)
  .then((res) => {
    console.log('res 64 ' + res); 
    var base64Only = res.slice(34);
    let imgString = "data:image/jpg;base64," + base64Only;
    console.log("imgString", imgString);
    

  });

 }

*/

// file: File;
// changeListener($event) : void {
//    this.file = $event.target.files[0];
//    console.log("FILE",this.file);
  
//    this.readThis($event.target);
//  }

  
readThis_gokul(inputValue: any) {
 var file = document.querySelector(
   'input[type=file]')['files'][0] 

   console.log("FILE",file);
 var myReader:FileReader = new FileReader();
 myReader.onloadend = (e) => {
   this.image = myReader.result;
   console.log("base64",this.image);

 }
 myReader.readAsDataURL(file);
}

read(){
  console.log("Read Image Entered");

  var reader = new FileReader();
var fileToRead = document.querySelector('input[type=file]')['files'][0] ;
console.log("FILE",fileToRead);

// attach event, that will be fired, when read is end
reader.addEventListener("loadend", function() {
  console.log("Read Image Entered 2");

   // reader.result contains the contents of blob as a typed array
   // we insert content of file in DOM here
   var imageval = reader.result;
   console.log("base64 Image Val",imageval);

});

// start reading a loaded file
reader.readAsText(fileToRead);
}

updateProfilePic($event){
  //let file = $event.target.files[0];
  var file = document.querySelector(
    'input[type=file]')['files'][0] 
  console.log("FILE CHECK",file);
  let reader = new FileReader();
  reader.onloadend = function() {
      console.log('RESULT', reader.result)
      //let imageval = reader.result;
   //console.log("base64",imageval);
  }
  if (file) {
    reader.readAsDataURL(file);
}
}

  uploadingdoc(docno,flag,docname){
    console.log("Docname",docname);
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
          this.uploadgeneral[flag]=3;
          //this.successgeneral[flag]=1;
        }else if(docno==2){
          this.uploadvehicle[flag]=3;
          //this.successvehicle[flag]=1;
        }else if(docno==3){
          this.uploadpassenger[flag]=3;
          //this.successpassenger[flag]=1;
        }else if(docno==4){
          this.uploadpedestrian[flag]=3;
          //this.successpassenger[flag]=1;
        }
        
      });
  }

  pickFile(docno,flag) {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((resolvednativepath) => {
        
        this.returnpath = resolvednativepath;
        console.log("returnPath",this.returnpath);
        var type  = this.returnpath.substring(this.returnpath.lastIndexOf(".") + 1);
        console.log("FileType",type);
        if(type=="pdf"){
          console.log("true");
        this.getBase64StringByFilePath(this.returnpath)
          .then((res) => {
            //alert('res 64 ' + res); //this.audio=res;
            
            
            var base64Only = res.slice(34);
            let docString = "data:image/jpg;base64," + base64Only;

            

            
            console.log("Val",res);
            console.log("Val1",base64Only);
            console.log("Val2",docString);
            
            if(docno==1){
              this.uploadgeneral[flag]=1;
              this.generaldocData[flag]=docString;
              this.generaldocViewData[flag]=this.returnpath;
              console.log("Array",this.generaldocData[flag]);
            }else if(docno==2){
              this.uploadvehicle[flag]=1;
              this.vehicledocData[flag]=docString;
              this.vehicledocViewData[flag]=this.returnpath;
              console.log("Array",this.vehicledocData[flag]);
            }else if(docno==3){
              this.uploadpassenger[flag]=1;
              this.passengerdocData[flag]=docString;
              this.passengerdocViewData[flag]=this.returnpath;
              console.log("Array",this.passengerdocData[flag]);
            }else if(docno==4){
              this.uploadpedestrian[flag]=1;
              this.pedestriandocData[flag]=docString;
              this.pedestriandocViewData[flag]=this.returnpath;
              console.log("Array",this.pedestriandocData[flag]);
            }
            
          });
        }
        else{
          console.log("Not a proper file type");
          this.presentToast("Select a proper file type");
        }
      })
    })
  }

  viewPdf(docno,flag){
    var pdf;
    if(docno==1){
      this.uploadgeneral[flag]=1;
      pdf=this.generaldocViewData[flag];
      console.log("pdf 1",pdf);
      this.fileOpener.open(pdf, "application/pdf");
    }else if(docno==2){
      this.uploadvehicle[flag]=1;
      pdf=this.vehicledocViewData[flag];
      console.log("pdf 2",pdf);
      this.fileOpener.open(pdf, "application/pdf");
    }else if(docno==3){
      this.uploadpassenger[flag]=1;
      pdf=this.passengerdocViewData[flag];
      console.log("pdf 3",pdf);
      this.fileOpener.open(pdf, "application/pdf");
    }else if(docno==4){
      this.uploadpedestrian[flag]=1;
      pdf=this.pedestriandocViewData[flag];
      console.log("pdf 4",pdf);
      this.fileOpener.open(pdf, "application/pdf");
    }
  }


  public getBase64StringByFilePath(fileURL: string): Promise<string> {

    return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
        resolve(base64File);
      }, (err) => {
        console.log(err);
      });
    })
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
    this.segflag =4
  }


  public closeModal() {
    this.modalctrl.dismiss();
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

}
