import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { Router } from '@angular/router';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dischargetreatment',
  templateUrl: './dischargetreatment.component.html',
  styleUrls: ['./dischargetreatment.component.scss'],
})
export class DischargetreatmentComponent implements OnInit {

  ln:any='en';
  private apiUrl = environment.apiUrl;
  model: any = {};
  
  postdata3={'mode':'','language':'','pid':'','hpid':'','showpolice':'','discharge_remarks':'','discharge_advise':'','discharge_treatement':'',
  'discharge_woundcertificate':'',
  'discharge_condtionofadmission':'',
  'woundcertificate':'',
  'discharge_clincalinvestgation':'',
  'discharge_condtionofdischarge':'',
  'doctor_name':'',
  'hpname':'',
  'psname':'',
  'treatment':'',
  'discharge_time':'',
  'discharge_doctorname':'',
  'discharge_doctor_regno':'',
  'discharge_showpolice':'',
  'discharge_ipno':'',
};



  @Input() flag: string='no';
  @Input() patientid: any;
  @Input() patientdata: any;
  @Input() userdetails: any;
  @Input() ipno: any;
 
  //showpls
  constructor(private modalctrl:ModalController,
    private api:ApiService,
    private altctrls: AlertController,
    private router: Router,
    private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService) { }

  ngOnInit() {
    //alert(this.showpls);
    if(this.patientdata.treatment_saveflag=='0')
{
  this.flag='yes';
}
  }
  editflagchage(){
    this.flag='yes';
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
      

      this.openWithSystemBrowser(pdfurl)  
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
public  dischargetreatemt()
{
  //'showpls':this.data.discharge_showpolice,
  
  this.postdata3.mode='generate_discharge';
  this.postdata3.discharge_clincalinvestgation=this.patientdata.discharge_clincalinvestgation;
  this.postdata3.woundcertificate=this.patientdata.woundcertificate;
  this.postdata3.discharge_condtionofadmission=this.patientdata.discharge_condtionofadmission;
  this.postdata3.discharge_condtionofdischarge=this.patientdata.discharge_condtionofdischarge;
  this.postdata3.doctor_name=this.patientdata.doctor_name;
 // this.postdata3.hpname=this.hpname;
  //this.postdata3.psname=this.psname;
  this.postdata3.discharge_time=this.patientdata.discharge_time;
  this.postdata3.discharge_doctorname=this.patientdata.discharge_doctorname;
  this.postdata3.discharge_doctor_regno=this.patientdata.discharge_doctor_regno;
  this.postdata3.pid=this.patientdata.id;
  this.postdata3.discharge_ipno=this.patientdata.ipno;
  this.postdata3.discharge_woundcertificate=this.patientdata.discharge_woundcertificate;
  this.postdata3.discharge_treatement=this.patientdata.discharge_treatement;
  this.postdata3.discharge_advise=this.patientdata.discharge_advise;
  this.postdata3.discharge_remarks=this.patientdata.discharge_remarks;
//  this.postdata3.discharge_showpolice=this.patientdata.discharge_showpolice;
  this.postdata3.discharge_showpolice='No';

  

   this.adddischarge(this.postdata3).subscribe(
     (success:any) => {
   alert(success.msg);
   this.modalctrl.dismiss(true);
  

   
},
     error => {
     console.log(error);
     } 
     );

}


async showmsg() {
  if(this.patientdata.discharge_showpolice=='No'){
      return false;
  }
  const alert = await this.altctrls.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    message: "Do you want submit report to police? once you submitted to police you can't edit",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          return false;

        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
   
        }
      }
    ]
  });

  await alert.present();
} 
closemodal()
{

  this.modalctrl.dismiss(false);

}
public adddischarge(postdata2:any){

  return this.api.post('datas.php',postdata2);

}
}
