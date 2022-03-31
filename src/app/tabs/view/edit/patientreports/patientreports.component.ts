import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController,LoadingController, Platform  } from '@ionic/angular';

import { UploaddocComponent } from '../../edit/uploaddoc/uploaddoc.component';
import { SubmittingdocumentsComponent } from '../../edit/submittingdocuments/submittingdocuments.component';


import { PoliceintimationComponent } from 'src/app/popups/policeintimation/policeintimation.component';
import { AccidentregisterComponent } from '../../../../popups/accidentregister/accidentregister.component';
import { DischargetreatmentComponent } from '../../../../popups/dischargetreatment/dischargetreatment.component';
import { DrunkendrivetestComponent } from '../../../../popups/drunkendrivetest/drunkendrivetest.component';
import { PostmortermreportComponent } from '../../../../popups/postmortermreport/postmortermreport.component';

//import { CauseofdeathreportComponent } from '../../../../popups/causeofdeathreport/causeofdeathreport.component';
import { Base64 } from '@ionic-native/base64/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../../../environments/environment';

import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";


@Component({
  selector: 'app-patientreports',
  templateUrl: './patientreports.component.html',
  styleUrls: ['./patientreports.component.scss'],
})
export class PatientreportsComponent implements OnInit {

  reportstatus2:any;
  reportstatus3:any;
  reportstatus4:any;
  reportstatus5:any;
  ln:any;

  
  reportstatus_flag5:any;
  reportstatus_flag2:any;
  reportstatus_flag3:any;
  reportstatus_flag4:any;


  fileToUpload: File = null;
  previewUrl:any = null;
  fileURL:any;
  image;
  convertedstring:any;
  
  reportname='none';
  
  @Input() flag: string='No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  
  ImageBaseData:any;
   constructor(
    private modalctrl:ModalController,
    private base64: Base64,
    private iab: InAppBrowser,
    private api:ApiService,
    private ft:FileTransfer,
    private transfer: FileTransfer,
    private file: File, 
    public loadingController: LoadingController,
    public platform: Platform,
    private fileOpener: FileOpener,
    private altctrls: AlertController) { }



  ngOnInit() {
    this.loduploaded();
  //  console.log(this.userdetails);
    console.log(this.patientdata.injury_severity);
  //  this.getuploadeddocument();
  }
  public viewdocument(doc)
  {
    let pdfurl = '';
    pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' + this.patientdata.id+'&docname='+doc;
    this.openWithSystemBrowser(pdfurl)  
  }
  public downloadpmpdf(flag,rpt)
  {
    let pdfurl = '';
    if(flag==null)
    {
      alert("Report not genereated");
      return false;
    }

  if(rpt==1)
  {
  

    pdfurl = environment.apiUrl + 'reports/health_plreqquest.php?ln=' + this.ln + '&pid=' +flag;

  }
 else if(rpt==2)
{
  
  pdfurl = environment.apiUrl + 'reports/health_accregister.php?ln=' + this.ln + '&pid=' +flag;
//  pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' + this.patientdata.id+'&docname=wound';

}
else if(rpt==3)
{
  
  pdfurl = environment.apiUrl + 'reports/health_dischargecertificate.php?ln=' + this.ln + '&pid=' +flag;

}
else if(rpt==4)
{
 
  pdfurl = environment.apiUrl + 'reports/health_ddcertificate.php?ln=' + this.ln + '&pid=' +flag;

}
else if(rpt==5)
{
 
  pdfurl = environment.apiUrl + 'reports/health_pmcertificate.php?ln=' + this.ln + '&pid=' +flag;

}
     // let ln = this.selectedLanguage;
      

      //this.openWithSystemBrowser(pdfurl)  
      this.downloadAndOpenPdf(pdfurl);
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

  getuploadeddocument() {

   // console.log(this.patientdata);
    let postDate = {
      mode: 'getupload_doc',
      office_id: this.userdetails.office_id,
      accident_id: this.patientdata.accident_id,
      patient_id: this.patientdata.id
    }
    this.api.post('datas.php', postDate).subscribe((data: any) => {
      console.log(data);
    });
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
  closemodal()
  {

    this.modalctrl.dismiss();
  }
  /*
  changeListener($event) : void {
    //this.readThis($event.target);
    console.log($event);
    console.log('-------------------------');
    console.log($event.detail.value);
    this.fileURL=$event.detail.value;
  
      this.base64.encodeFile(this.fileURL).then((base64File: string) => {
          console.log(base64File);
      }, (err) => {
          console.log(err);
      });


  }
  */

  changeListener_wound($event) : void {
    this.reportname='wound';
    this.readThis($event.target);
  }
  changeListener_discharge($event) : void {
    this.reportname='discharge';
    this.readThis($event.target);
  }
  changeListener_drunkendrive($event) : void {
    this.reportname='drunkendrive';
    this.readThis($event.target);
  }
  changeListener_postmorterm($event) : void {
    this.reportname='postmorterm';
    this.readThis($event.target);
  }


  readThis(inputValue: any) {
    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
     // this.uploadsigneddocument();
    }
    myReader.readAsDataURL(file);
  }
  
   handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onSubmit(){
    

              console.log("hiiii");
  }
  editflagchage(){
    this.flag='yes';
}
loduploaded() {

  let postDate = {
    mode: 'getuploadedlist',
    pid:this.patientdata.id
  }
  this.api.post('datas.php', postDate).subscribe((data: any) => {

if(data.data2_cnt==0)
{    this.reportstatus_flag2=0;
   this.reportstatus2='';
}
else
{ 
this.reportstatus_flag2=1;
this.reportstatus2=data.data2.report_sumbitted_on;
}
//alert(this.reportstatus2);



if(data.data3_cnt==0)
{    this.reportstatus_flag3=0;
  this.reportstatus3='';
}
else
{ 
this.reportstatus_flag3=1;
this.reportstatus3=data.data4.report_sumbitted_on;
}

if(data.data4_cnt==0)
{   
  this.reportstatus_flag4=0;
  this.reportstatus4='';
}
else
{ 
this.reportstatus_flag4=1;
this.reportstatus4=data.data4.report_sumbitted_on;
}

if(data.data5_cnt==0)
{    this.reportstatus_flag5=0;
  this.reportstatus5='';
}
else
{ 
this.reportstatus_flag5=1;
this.reportstatus5=data.data5.report_sumbitted_on;
}
  });
}

async documentupload(typeofreport) 
{
const modal = await this.modalctrl.create({
    component: UploaddocComponent,
    cssClass: 'halfscreen',
      componentProps: { 
        'patientdata':this.patientdata,
        'typeofreport':typeofreport,
        'userdetails':this.userdetails,
     }
  });
  modal.onWillDismiss().then(dataReturned => {
    this.loduploaded();
  });
  return await modal.present().then(_ => {
  });
}
  async reportssubmission() 
    {
     // alert("fff");
   //   this.closemodal();
   const modal = await this.modalctrl.create({
        component: SubmittingdocumentsComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
      //  console.log(dataReturned.data.condtion);
      
        if(dataReturned.data.flag==true)
        {
          this.patientdata=dataReturned.data.resultdata.patientdata;
       

        }
       // this.patientdata=dataReturned.data.patientdata;
       
        
     //   this.loduploaded();
     /*   
     if(dataReturned.data.flag==true)
        {
        alert("sent");

        }
        else
        {
          alert("closed");
        }
        
        
        */
      });
      return await modal.present().then(_ => {
      });
    }
    async policeintimation() 
    {
   const modal = await this.modalctrl.create({
        component: PoliceintimationComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
        console.log(dataReturned.data);
        
        if(dataReturned.data.flag==true)
        {
          this.patientdata.police_created_date=dataReturned.data.date;
        }
        
        
      });
      return await modal.present().then(_ => {
      });
    }

    async acc_woundcertificate() 
    {

     
   const modal = await this.modalctrl.create({
        component: AccidentregisterComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
       // console.log(dataReturned);

        if(dataReturned.data==true){
          this.patientdata.accregister_saveflag='1';
        }
        

      });
      return await modal.present().then(_ => {
      });
    }


    async dischargesummary() 
    {
   const modal = await this.modalctrl.create({
        component: DischargetreatmentComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
        if(dataReturned.data==true){
          this.patientdata.treatment_saveflag='1';
        }
      });
      return await modal.present().then(_ => {
      });
    }
    
    async postmorterms() 
    {
   const modal = await this.modalctrl.create({
        component: PostmortermreportComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
        if(dataReturned.data==true){
          this.patientdata.postmortem_saveflag='1';
        }
      });
      return await modal.present().then(_ => {
      });
    }

    async drunkendriven() 
    {
   const modal = await this.modalctrl.create({
        component: DrunkendrivetestComponent,
          componentProps: { 
            'patientdata':this.patientdata,
            'userdetails':this.userdetails,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
        if(dataReturned.data==true){

                  this.patientdata.drunken_saveflag='1';
        
        }
      });
      return await modal.present().then(_ => {
      });
    }


}
