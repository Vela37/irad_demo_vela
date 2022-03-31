import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-policeintimation',
  templateUrl: './policeintimation.component.html',
  styleUrls: ['./policeintimation.component.scss'],
})
export class PoliceintimationComponent implements OnInit {


  postdata3={'mode':'','language':'','pid':'','hpid':'','pls_policeshow':'',
 
};


@Input() flag: string='no';
@Input() userdetails: any;
@Input() patientdata: any;

@Input() pls_policeshow: any;
todayDate:any;

ln:any='en';
private apiUrl = environment.apiUrl;

  constructor(private modalctrl:ModalController,
    private api:ApiService,
    private altctrls: AlertController,
    private router: Router,
    private datePipe: DatePipe,
    private translateConfigService: TranslateConfigService,
    private iab: InAppBrowser

    ) {  
  
  }

  ngOnInit() {
    this.todayDate=new Date();

    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
//    console.log(this.patientdata.id);
    
  //  alert(this.police_created_date);
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
public  generateplsrequest()
  {
    
    
    this.postdata3.mode='generate_policeintimation';
    this.postdata3.pid=this.patientdata.id;
    this.postdata3.pls_policeshow='Yes';
  
   
    

 
     this.adddrunkendetails(this.postdata3).subscribe(
       (success:any) => {
                          alert(success.msg);
                         
                          let dats={
                            date:this.todayDate,
                            flag:true
                          }
                          this.modalctrl.dismiss(dats);

     
  },
       error => {
       console.log(error);
       } 
       );

  }
  async showmsg() {
   
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
            this.generateplsrequest();
          }
        }
      ]
    });

    await alert.present();
  } 
  public adddrunkendetails(postdata2:any){

    return this.api.post('datas.php',postdata2);
  
  }
  closemodal()
  {
    let dats={
      date:this.todayDate,
      flag:false
    }
    this.modalctrl.dismiss(dats);
  }


}
