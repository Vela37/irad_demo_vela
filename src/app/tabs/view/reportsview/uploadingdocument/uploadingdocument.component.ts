import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import {ApiService} from '../../../../services/api.service';
import { TranslateConfigService } from '../../../../translate-config.service';
import { Router } from '@angular/router';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
// Send Parameter
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { IonicModule, NavController, Platform } from '@ionic/angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-uploadingdocument',
  templateUrl: './uploadingdocument.component.html',
  styleUrls: ['./uploadingdocument.component.scss'],
})
export class UploadingdocumentComponent implements OnInit {

  @Input() flagId: any;

  generalDoc=[
    { 
      'title':'Copy of FIR',
      'desc':''
    },{
      'title':'First accident Report',
      'desc':''
    },{
      'title':'Driver FormII along with documents submitted by the driver',
      'desc':''      
    },{
      'title':'Owner FormIII along with documents submitted by the owner',
      'desc':''
    },{
      'title':'Verification Report',
      'desc':''
    }
  ]

  vehDoc=[{
    'title':'Driver ID/Address Proof',
    'desc':''
  },{
    'title':'Driving Licnese',
    'desc':''      
  },{
    'title':'Insurance policy',
    'desc':''
  },{
    'title':'Owner ID/Address Proof',
    'desc':''
  },{
    'title':'Registration Certificate',
    'desc':''      
  },{
    'title':'Driving License of driver',
    'desc':''
  },{
    'title':'Insurance Policy',
    'desc':''      
  },{
    'title':'Permit',
    'desc':''
  },{
    'title':'Fitness',
    'desc':''
  },{
    'title':'Copy of school/educational institution Id',
    'desc':''      
  },{
    'title':'Copy of Aadhar card',
    'desc':''
  },{
    'title':'Proof of education fee',
    'desc':''
  },{
    'title':'Proof of other expenses for children',
    'desc':''      
  },{
    'title':'Copy of medical documents',
    'desc':''
  },{
    'title':'Disability Certificate',
    'desc':''
  },{
    'title':'Cast Certificate',
    'desc':''
  },{
    'title':'Income Certificate',
    'desc':''      
  }
]

commonDoc=[{
  'title':'Copy of school/educational institution Id',
  'desc':''      
},{
  'title':'Copy of Aadhar card',
  'desc':''
},{
  'title':'Proof of education fee',
  'desc':''
},{
  'title':'Proof of other expenses for children',
  'desc':''      
},{
  'title':'Copy of medical documents',
  'desc':''
},{
  'title':'Disability Certificate',
  'desc':''
},{
  'title':'Cast Certificate',
  'desc':''
},{
  'title':'Income Certificate',
  'desc':''      
}]

selectedDoc={docName:"",docNo:""};
docname:any;
modeOfDocument:any="";
fileType:any;
filesPath:any;
fileName:any;
selectedLanguage: string; params: any;
accid: any; selacc: any;
docData:string='';
image; 
uploadStatusflag:any;
investofficername:any;
ln:any;

  constructor(private modalctrl:ModalController,private api:ApiService,
    private translateConfigService:TranslateConfigService,public navCtrl: NavController,
    private router:Router,
    public loadingController: LoadingController,private fileOpener: FileOpener,
    private ft:FileTransfer,
    private transfer: FileTransfer,
    public platform: Platform,
    private iab: InAppBrowser,
    private file: File ,
    private toastController: ToastController,
    private route: ActivatedRoute) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln=localStorage.getItem('ln');

    
     this.selacc=JSON.parse(localStorage.getItem('selacc'));
     this.accid =this.selacc.accid;
     console.log("AccId",this.selacc);
     }

  ngOnInit() {
    this.loadProfile();

    console.log("Upload Doc RX",this.flagId);
    if(this.flagId=="1"){
      this.modeOfDocument="General";
    }else if(this.flagId=="2"){
      this.modeOfDocument="Passenger";
    }else if(this.flagId=="3"){
      this.modeOfDocument="Pedestrian";
    }else if(this.flagId=="4"){
      this.modeOfDocument="Vehicle";
    }

    console.log("modeOfDocument is",this.modeOfDocument);
  }
  goToReport(){
    
  }
  getDocdetails(event: any){
    console.log("Doc details " ,this.selectedDoc.docName);
    this.docname=this.selectedDoc.docName;
    console.log("Doc Event 2 recieving",this.docname);
  }

  changeListener($event) : void {
    // this.reportname='wound';
    console.log("$event.target.files",$event.target.files);
    this.filesPath  = $event.detail.value;
    this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
    this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
    //this.readThis($event.target,"","",this.fileName);
     this.readThis($event);
    //  if(this.fileType=="pdf"){
    //    console.log("Proper Format")
        
       
    //  }else{
    //    console.log("Improper format");
    //    this.presentToast("Select a proper file type");
    //  }
   }

   readThis(inputValue: any) {
    
    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log("base 64 VAL",this.image);
      this.docData=this.image;
      
    }
    console.log("Filepath",file);
    if(file!=null){
      myReader.readAsDataURL(file);
    }
   
  }


  savePdf(flag,docname){
    let postDate = {
      //mode: 'imageupload',
      accidentId:this.accid,
      modeOfTheDocument: this.modeOfDocument,
      nameOfTheDocument: this.selectedDoc.docName,
      documents: this.docData,
      linkId:'',
      remarks:'',
      active:'',
      insertedBy:this.investofficername
    }
    this.api.darsave('dar/insertdocuments', postDate).subscribe(
      (data: any) => {
        console.log(data); 
        this.docData='';
        this.uploadStatusflag=3;        
      });
  }

  loadProfile(){
    this.api.post('profile.php', { mode: 'profile', ln: this.selectedLanguage }).subscribe((res: any) => {
      if(res.error!=undefined){
        console.log('resdata',data);
      }
       var data = res.data[0];
       this.investofficername =  data.name ;
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

  public closeModal() {
    this.modalctrl.dismiss();
  }
}
