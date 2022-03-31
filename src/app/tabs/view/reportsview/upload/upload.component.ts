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
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Input() flagId:any;
  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  accid: any; selacc: any;
  selectedLanguage: string; params: any;
  ln: any;

  constructor(private modalctrl:ModalController,
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
     }

  ngOnInit() {
    
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  changeListener($event) : void {
    // this.reportname='wound';
    console.log("Flag");
    console.log("$event.target.files",$event.target.files);
    this.filesPath  = $event.detail.value;
    this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
    this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);

     
     if(this.fileType=="pdf"){
       console.log("Proper Format")
       this.readThis($event.target);  
       
     }else{
       console.log("Improper format");
       this.presentToast("Select a proper file type");
     }
   }

   readThis(inputValue: any) {
    
    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log("base 64 VAL",this.image);
      
    }
    console.log("Filepath",this.filesPath);
   
    myReader.readAsDataURL(file);
  }

  public closeModal() {
    this.modalctrl.dismiss();
  }
}
