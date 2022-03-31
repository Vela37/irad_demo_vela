import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { Router } from '@angular/router';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-drunkendrivetest',
  templateUrl: './drunkendrivetest.component.html',
  styleUrls: ['./drunkendrivetest.component.scss'],
})
export class DrunkendrivetestComponent implements OnInit {
  postdata3={'mode':'','language':'','pid':'','hpid':'','showpolice':'',
  'histroyalleged':'','histroystated':'','detailsofinjuries':'',
  'physicalexaminnations':'',
  'dd_gait':'',
  'dd_selfcontrol':'',
  'dd_memory':'',
  'dd_oritime':'',
  'dd_reactiontime':'',
  'dd_smellinbreath':'',
  'dd_fingernose':'',
  'dd_remsign':'',
  'dd_specialexmn':'',
  'dd_reflexes':'',
  'dd_anyfindings':'',
  'dd_timeofexamin':'',
  'dd_history':'',
  'dd_consent':'',
  'dd_arrest':'',
  'dd_showpolice':'',
  'dd_speech':'',
  'dd_clothing':'',
  'dd_generaldispostion':'',
};

@Input() flag: string='no';
@Input() patientid: any;
@Input() patientdata: any;
@Input() userdetails: any;
@Input() ipno: any;


  
  
ln:any='en';
private apiUrl = environment.apiUrl;
  
  constructor(private modalctrl:ModalController,
    private api:ApiService,
    private altctrls: AlertController,
    private router: Router,
    private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService) { }

  ngOnInit() {
    if(this.patientdata.drunken_saveflag=='0')
    {
      this.flag='yes';
    }

  }
  async showmsg() {
    if(this.patientdata.dd_showpolice=='No'){
        return false;
    }
    const alert = await this.altctrls.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Do you want submit report to police? once you submitted to poilce you can't edit",
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
  closemodal()
  {

    this.modalctrl.dismiss(false);
  }
  editflagchage(){
    this.flag='yes';
}

public  generateaccregister()
{
  
  
  this.postdata3.mode='generate_drunken';
  this.postdata3.showpolice=this.patientdata.accregister_police_show;
  this.postdata3.pid=this.patientdata.id;
  this.postdata3.dd_anyfindings=this.patientdata.dd_anyfindings;
  this.postdata3.dd_reflexes=this.patientdata.dd_reflexes;
  this.postdata3.dd_specialexmn=this.patientdata.dd_specialexmn;
  this.postdata3.dd_remsign=this.patientdata.dd_remsign;
  this.postdata3.dd_fingernose=this.patientdata.dd_fingernose;
  this.postdata3.dd_gait=this.patientdata.dd_gait;
  this.postdata3.dd_reactiontime=this.patientdata.dd_reactiontime;
  this.postdata3.dd_oritime=this.patientdata.dd_oritime;
  this.postdata3.dd_memory=this.patientdata.dd_memory;
  this.postdata3.dd_selfcontrol=this.patientdata.dd_selfcontrol;
  this.postdata3.dd_smellinbreath=this.patientdata.dd_smellinbreath;
  this.postdata3.dd_timeofexamin=this.patientdata.dd_timeofexamin;
  this.postdata3.dd_history=this.patientdata.dd_history;
  this.postdata3.dd_consent=this.patientdata.dd_consent;
  this.postdata3.dd_arrest=this.patientdata.dd_arrest;
 // this.postdata3.dd_showpolice=this.patientdata.dd_showpolice;
  this.postdata3.dd_showpolice='No';

  this.postdata3.dd_speech=this.patientdata.dd_speech;
  this.postdata3.dd_clothing=this.patientdata.dd_clothing;
  this.postdata3.dd_generaldispostion=this.patientdata.dd_generaldispostion;
 
  
  


   this.adddrunkendetails(this.postdata3).subscribe(
     (success:any) => {
alert(success.msg);
this.modalctrl.dismiss(true);
this.router.navigate(['/victim']);

         // alert(success.message);
   
},
     error => {
     console.log(error);
     } 
     );

}
public adddrunkendetails(postdata2:any){

  return this.api.post('datas.php',postdata2);

}

}
