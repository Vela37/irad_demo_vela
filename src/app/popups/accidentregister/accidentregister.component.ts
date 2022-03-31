import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accidentregister',
  templateUrl: './accidentregister.component.html',
  styleUrls: ['./accidentregister.component.scss'],
})
export class AccidentregisterComponent implements OnInit {


  //udhaya
  model: any = {};
  editflag:string='show';
  postdata3={'mode':'','language':'','pid':'','ar_number':'','hpid':'','showpolice':'','histroyalleged':'','histroystated':'','detailsofinjuries':'','physicalexaminnations':'',};

  
  

  
  @Input() flag: string='No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  @Input() accregister_police_show: any;

  ln:any='en';
    private apiUrl = environment.apiUrl;
    constructor(private modalctrl:ModalController,
    private api:ApiService,
    private altctrls: AlertController,
    private router: Router,
    private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService) { }

  ngOnInit() {

if(this.patientdata.accregister_saveflag=='0')
{
  this.flag='Yes';
}
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
                     this.flag='Yes';
                 }

                 async showmsg(flg) {
                  if(flg=='No'){
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
  onSubmit(){
// AccidentregisterComponent
   //return false;
   
    this.postdata3.mode='generate_accregister';
  //  this.postdata3.showpolice=this.patientdata.accregister_police_show;
    this.postdata3.showpolice='No';

    this.postdata3.pid=this.patientdata.id;
    this.postdata3.ar_number=this.patientdata.ar_number;
 //   this.postdata3.hpid=this.patientdata.hpid;
    this.postdata3.histroyalleged=this.patientdata.accregister_histroyalleged;
    this.postdata3.histroystated=this.patientdata.accregister_histroystated;
    this.postdata3.detailsofinjuries=this.patientdata.accregister_detailsofinjuries;
    this.postdata3.physicalexaminnations=this.patientdata.accregister_physicalexaminantions;

  //  patientdata.accregister_police_show
 
     this.addpmrequest(this.postdata3).subscribe(
       (success:any) => {
       alert(success.msg);

       this.modalctrl.dismiss(true);
       this.flag='NO';

     
  },
       error => {
       console.log(error);
       } 
       );
  
  }
  public addpmrequest(postdata2:any){

    return this.api.post('datas.php',postdata2);
  
  }
}
