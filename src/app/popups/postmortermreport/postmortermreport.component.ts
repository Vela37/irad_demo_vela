import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-postmortermreport',
  templateUrl: './postmortermreport.component.html',
  styleUrls: ['./postmortermreport.component.scss'],
})
export class PostmortermreportComponent implements OnInit {

  postdata3={'mode':'','language':'','pid':'','hpid':'',
  'diedon':'',
  'dateofverification':'',
  'wasdelivery':'',
  'wardno':'',
  'immediatecause':'',
  'antcause':'',
  'othersignificant':'',
  'pm_medicalofficer':'',
  'pm_assistedby':'',
  'pm_allegedcauseofdeath':'',
  'crime_no':'',
  'pm_policeshow':'',
  'pm_remarks':'',
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
    if(this.patientdata.postmortem_saveflag=='0')
    {
      this.flag='yes';
    }
  }
  async showmsg() {
    
    if(this.patientdata.pm_policeshow=='No'){
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
  closemodal()
  {

    this.modalctrl.dismiss(false);

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

public  generate_postmoretm()
{
  // nameofpractioner
  
  this.postdata3.mode='generate_pmcertificate';
  this.postdata3.pid=this.patientdata.id;
  this.postdata3.pm_remarks=this.patientdata.pm_remarks;
  //this.postdata3.pm_policeshow=this.patientdata.pm_policeshow;
  this.postdata3.pm_policeshow='No';
  this.postdata3.crime_no=this.patientdata.crime_no;
  this.postdata3.pm_allegedcauseofdeath=this.patientdata.pm_allegedcauseofdeath;
  this.postdata3.pm_assistedby=this.patientdata.pm_assistedby;
  this.postdata3.pm_medicalofficer=this.patientdata.pm_medicalofficer;
 

  
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
