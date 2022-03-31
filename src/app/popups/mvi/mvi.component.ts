import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { VideoPlayer } from '@ionic-native/video-player/ngx';
import{ environment } from  '../../../environments/environment';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UsersService } from '../../services/shared.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { MvifileuploadComponent } from '../../popups/mvifileupload/mvifileupload.component';
import { PushnotificationService } from '../../services/pushnotification.service';

@Component({
  selector: 'app-mvi',
  templateUrl: './mvi.component.html',
  styleUrls: ['./mvi.component.scss'],
})
export class MviComponent implements OnInit {
  selectedLanguage:string;  params:any;
  data:any=null; private userSub: Subscription; isAuthenticated = false;

  accid:any;  rtoOptions:any=null;  reqbtn=false; 
  // accid:any; ptwOptions:any=null; reqbtn=false;
  uoOptions:any=null;
  @Input() selacc:any; user:any;
  
  rtosel={
    'code':'', 
    'name':'',
    'address':'',
    'uocode':''
  }

  sel_rto_office:any=null;

  mvidetails:any=null;
  statusval:any;
  ptwOptions: any;
  sh:any='1';
  isChecked:any;


  constructor(
    private api:ApiService, private authService: AuthService,private modalctrl: ModalController,private shserv:UsersService,private alertCtrl: AlertController,
    private alertController: AlertController,private iab: InAppBrowser,
    private previewAnyFile: PreviewAnyFile,  public platform: Platform,
    public loadingController: LoadingController,
    private fileOpener: FileOpener,
    private ft:FileTransfer, private pushNotification:PushnotificationService,
    private file: File 
  ) { }

  ngOnInit() {

    //console.log(this.selacc);
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    console.log(this.selacc);

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.user=user;
      }
    });

    this.loadDetails();
    this.loadMviDetails();
   // this.loadRTO();

  }
  
  viewsigneddocument(vehilce){
    let ln='en';
    let pdfurl=environment.apiUrl+'reports/mvidocview.php?ln='+ln+'&id='+this.selacc.accid+'&veh='+vehilce;
    this.downloadAndOpenPdf(pdfurl);

  //this.openWithSystemBrowser(pdfurl)
  }

  async uploadMVI(vehilce) 
  {
  //  alert(vehilce);
  const modal = await this.modalctrl.create({
      component: MvifileuploadComponent,
      cssClass: 'halfscreen',
      componentProps: { 
        'vehilce': vehilce, 
        'dar':'0',
         'accid':this.selacc.accid
      }
      
    });
    modal.onWillDismiss().then(dataReturned => {
      this.loadDetails();
    this.loadMviDetails();
    });
    return await modal.present().then(_ => {
    });
  }

  async uploadMIR(vehilce) 
  {
  //  alert(vehilce);
  const modal = await this.modalctrl.create({
      component: MvifileuploadComponent,
      cssClass: 'halfscreen',
      componentProps: { 
        'vehilce': vehilce, 
        'dar':'1', 
         'accid':this.selacc.accid
      }
      
    });
    modal.onWillDismiss().then(dataReturned => {
      this.loadDetails();
    this.loadMviDetails();
    });
    return await modal.present().then(_ => {
    });
  }

  sendmvitopolice(veh){

   // alert(veh);
    let postDate = {
      mode: 'sendmvitopolice',
      vehicle:veh,
      accid:this.selacc.accid
    }
    this.api.post('mvi', postDate).subscribe((data: any) => {
      
      alert(data.msg);
      this.pushNotification.sendNotification('AIR','AIRSubmited',this.selacc.accid);

     
    });

  }
  loadMviDetails(){
    let postDate = {
      mode: 'mvirequestdetails',
      accid:this.selacc.accid,
    }
    this.api.post('mvi', postDate).subscribe((data: any) => {
      console.log(data);
      this.mvidetails = data.data;
      console.log("MVI ",this.mvidetails);
    });
  }

  mvireqcancel(vehno,data){
    console.log(data);
    let postDate = {
      mode: 'mvirequestcancel',
      accid:this.selacc.accid,
      vehno:vehno,
      remarks:data.Reason
    }
    this.api.post('mvi', postDate).subscribe((data: any) => {
      console.log("MVI Cancel ",data);
     
      if(data.flag==true){
        console.log("Flag true ",data);

        this.pushNotification.sendNotification('MVI','MVIRequestcancel',this.selacc.accid);
        
      this.loadDetails();
      this.loadMviDetails();

      }
    });
  }

  async deleteMvi(vehno) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>Cancel</strong>!!!',
      inputs: [ 
        {
          name: 'Reason',
          placeholder: 'Reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: (data) => {
            console.log('Confirm Okay');
            this.mvireqcancel(vehno,data);
          }
        }
      ]
    });

     await alert.present();
   }

  viewProfile(usrname) {
  
    console.log(usrname);
    if(usrname!='' && usrname!=null ){
    this.shserv.viewProfile(usrname);
    }
  
  }

  

  loadDetails(){
    
    let postDate={
        mode:'mvistatus',
        ln:this.selectedLanguage,
        id:this.selacc.accid
    }; 
    this.api.post('mvi',postDate).subscribe((data: any)=>{
        console.log(data); 
        this.data=data.data; 
        
        for(let i=0;i<this.data.length;i++){ //console.log(this.data[i].mvistatus);
          if(this.data[i].mvistatus==null || this.data[i].mvistatus==0) { 
            this.loadRTO(); 
           // this.loadPTW();
            break;
          }
        }
     
        
    });

  }

  loadRTO(){
    let postDate={
      mode:'loadRTO'
    //  district:this.rtosel.district
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
     // console.log(data);
      this.rtoOptions=data.data;
      this.ptwOptions=data.ptw; console.log(this.ptwOptions);
     });
  }

  
  // loadPTW()
  // {
  //   let postDate=
  //   {
  //     mode:'loadRTO'
  //   //  district:this.rtosel.district
  //   }
  //   this.api.post('mviconfig',postDate).subscribe((data: any)=>
  //   {
  //     console.log("data", data.ptw);
  //     this.ptwOptions=data.ptw;

      
  //    });
  // }


  loadUO(){
    this.uoOptions=null;
    let postDate={
      mode:'loadUO',
      rto: this.rtosel.code
    //  district:this.rtosel.district
    }
    this.api.post('mviconfig',postDate).subscribe((data: any)=>{
     // console.log(data);
      
      if(data.data.length!=0){
        this.uoOptions=data.data;
      }
 
     });
  }

  onRTOSelected(){
    
    let rto=this.rtosel.code;
    
    for(var i=0;i<this.rtoOptions.length;i++){
      
      if(rto==this.rtoOptions[i].code){
        
        this.rtosel.code=this.rtoOptions[i].code;
        this.rtosel.name=this.rtoOptions[i].name;
        this.rtosel.address=this.rtoOptions[i].address;
        this.rtosel.uocode='';  
      }
    }


    this.sel_rto_office=this.rtosel.code+'-'+this.rtosel.name+', '+this.rtosel.address;
    this.loadUO();
    
  }

  onPTWSelected(){

    let rto=this.rtosel.code;
    
    for(var i=0;i<this.ptwOptions.length;i++){
      
      if(rto==this.ptwOptions[i].code){
        
        this.rtosel.code=this.ptwOptions[i].code;
        this.rtosel.name=this.ptwOptions[i].name;
        this.rtosel.address=this.ptwOptions[i].address;
        this.rtosel.uocode='';  
      }
      
    }

    
    this.sel_rto_office=this.rtosel.code+'-'+this.rtosel.name+', '+this.rtosel.address;
    this.loadUO();
    
  }

  onUOSelected(){
    let uo=this.rtosel.uocode;
    for(var i=0;i<this.uoOptions.length;i++){
      if(uo==this.uoOptions[i].code){  
        this.rtosel.uocode=this.uoOptions[i].code;  
        this.sel_rto_office=this.uoOptions[i].code+'-'+this.uoOptions[i].name+', '+this.uoOptions[i].address;
      }
    }
  }

  closeModal()
  {
    this.modalctrl.dismiss();
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
      message: "Request for AIR Inspection ?",
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
          mode:"mvirequest",
          id:this.selacc.accid,
          veh:selvehs,
          rto:this.rtosel
       }
        this.api.post('mvi',postDate).subscribe((data: any)=>{
          this.loadDetails();
          this.loadMviDetails();

          this.pushNotification.sendNotification('MVI','MVIRequest',this.selacc.accid);

        });
    
        
      }

      reqMVIPDF(vehregno){
        console.log('reqMVIPDF');
        let ln='en';
        let pdfurl=environment.apiUrl+'reports/mvirequest.php?ln='+ln+'&id='+this.selacc.accid+'&veh='+vehregno;
        this.downloadAndOpenPdf(pdfurl);
   
      //this.openWithSystemBrowser(pdfurl)
      }

      resMVIPDF(vehregno){
        console.log('resMVIPDF');
        let ln='en';
        let pdfurl=environment.apiUrl+'reports/mviresponse.php?ln='+ln+'&id='+this.selacc.accid+'&veh='+vehregno;

        this.downloadAndOpenPdf(pdfurl);
   
     // this.openWithSystemBrowser(pdfurl)
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


    generateMIR(vehregno){
      console.log('generateMIR');
      let ln='en';
      let pdfurl=environment.darUrl+'form/pdf9View?accidentId='+this.selacc.accid+'&vehicleId='+vehregno;
      this.downloadAndOpenPdf(pdfurl);
 
    //this.openWithSystemBrowser(pdfurl)
    }


    viewMIR(vehregno){

      let ln='en';
      let pdfurl=environment.apiUrl+'reports/mirdocview.php?ln='+ln+'&id='+this.selacc.accid+'&veh='+vehregno;
      console.log('viewMIR',pdfurl);
      this.downloadAndOpenPdf(pdfurl);
  
    //this.openWithSystemBrowser(pdfurl)
    }

}
