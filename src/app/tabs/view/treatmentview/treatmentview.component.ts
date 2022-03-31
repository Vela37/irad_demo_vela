import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

//-------------------- Request popups----------------------

import { PmrequestComponent } from '../edit/pmrequest/pmrequest.component';
import { DdrequestComponent } from '../edit/ddrequest/ddrequest.component';

//-------------------- common popups for police and helath department----------------------
/*
import { PoliceintimationComponent } from 'src/app/popups/policeintimation/policeintimation.component';
import { AccidentregisterComponent } from 'src/app/popups/accidentregister/accidentregister.component';
import { DischargetreatmentComponent } from '../../../popups/dischargetreatment/dischargetreatment.component';
import { DrunkendrivetestComponent } from '../../../popups/drunkendrivetest/drunkendrivetest.component';
import { PostmortermreportComponent } from '../../../popups/postmortermreport/postmortermreport.component';
*/
@Component({
  selector: 'app-treatmentview',
  templateUrl: './treatmentview.component.html',
  styleUrls: ['./treatmentview.component.scss'],
})
export class TreatmentviewComponent implements OnInit {


  model = {}
  userName:any;
  seg: any = 0;
  selectedLanguage: string; params:any;
  @Input("hpname") hpname:any;
  @Input("district") district:any;
  @Input("showhp") showhp:any;
  @Input("driverinfo") driverinfo:any;
  @Input("name") name:any;
  @Input("ptype") ptype:any;
  @Input("gender") gender:any;
  @Input("age") age:any;
  @Input("address") address:any;
  @Input("firnumber") firnumber:any;
  @Input("id") id:any;
  
  @Input("patientid") patientid:any;
  @Input("hpid") hpid:any;
  @Input("fulldata") fulldata:any;

  veh:any;
  

  @Input("drunken_driver_hospitalid") drunken_driver_hospitalid:any;
  @Input("drunken_driver_hospitalshow") drunken_driver_hospitalshow:any;
  @Input("drunken_driver_reqdate") drunken_driver_reqdate:any;
  @Input("drunken_driver_reqpoliceid") drunken_driver_reqpoliceid:any;
  @Input("drunken_driver_request") drunken_driver_request:any;
  @Input("drunken_driver_resultdate") drunken_driver_resultdate:any;




  @Input("pm_requestdate") pm_requestdate:any;
  @Input("pm_requestofficer") pm_requestofficer:any;
  @Input("pm_resultdate") pm_resultdate:any;
  @Input("pm_request_flag") pm_request_flag:any;
  @Input("pm_request") pm_request:any;
  @Input("pm_hospitalid") pm_hospitalid:any;

  ln:any;
  flag:boolean=true;
  flagtwo:boolean=true;
  options1:any;
  options2:any;
  hpsameornot:string='different_new';
  hpinformation:any;
  trtment:any;
  user:any;

nameofhospital:string='Hospital Name';
state:string='State';
hpdistrict:string='District';
hpaddress:string='Hp Address';
hptype:string='Hp Type';
hppincode:string='Hp Pincode';
hppostmorterm:string='--';
ddfacility:string='--';
patientinfo:any;

postdata3={'mode':'','language':'','id':'','crimeno':'','showhp':'','hpname':'','hpid':'','patientid':'','district':'','ptype':'','trancactionid':'','hpsameornot':''};
private apiUrl = environment.apiUrl;
  constructor(private api:ApiService,private modalctrl: ModalController,
    private altctrls: AlertController,
    private iab: InAppBrowser
    ) {
    this.ln=localStorage.getItem('ln');
   }
 public loadselection(){
    //alert('call');
        this.postdata3.mode='loaddistrict';
        this.postdata3.id='33';
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
        
            this.options1=success.district;
         
        },
          error => {
       //   console.log(error);
          } 
          );
      
      }
      
     public selection(postdata3:any){
    
      return this.api.post('datas.php',postdata3);
    
    }
    public showdistriict(event:any)
    {
     // alert(event.target.value);

      this.postdata3.mode='loadhospital';
      this.postdata3.id=event.target.value;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
         //   this.datacombo=false;
            this.options2=success.hospital;
           
            
         
        },
          error => {
      //    console.log(error);
          } 
          );

    //  alert('qwwet');
    }
    downloadddpdf(f){}
    async presentAlertConfirm() {
      const alert = await this.altctrls.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Do you want give postmorterm request to same hospital?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
        
              this.flag=false;
              this.flagtwo=true;
              this.hpsameornot='different_new';
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              this.flag=true;
              this.flagtwo=false;
              this.hpsameornot='same';
            }
          }
        ]
      });
  
      await alert.present();
    }
    public givereqeusttosamehp(){
//
      this.postdata3.mode='pmrequesttosamehp';
      this.postdata3.id=this.patientid;
      this.postdata3.hpid=this.hpid;
      this.postdata3.trancactionid=this.id;
      
      this.postdata3.ptype=this.ptype;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
      alert('scc');

        },
          error => {
          console.log(error);
          } 
          );
    
      }

    public loadfullhopitaldetails(){
   

      this.postdata3.mode='loadpatientfulldetails';
      this.postdata3.id=this.patientid;
      this.postdata3.hpid=this.hpid;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
        this.hpinformation=success.hpdata[0].hp_patient;
         this.hpinformation=JSON.parse(this.hpinformation);
       
   
        this.nameofhospital=this.hpinformation.hpname;
        this.state=this.hpinformation.state;
        this.hpdistrict=this.hpinformation.dtname;
        this.hpaddress=this.hpinformation.address;
        this.hptype=this.hpinformation.hospital_type;

        this.hppincode=this.hpinformation.pincode;
        this.hppostmorterm=this.hpinformation.postmortem;
        this.ddfacility=this.hpinformation.ddfacility;

    

        },
          error => {
          console.log(error);
          } 
          );

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
  
  //pdfurl = environment.apiUrl + 'reports/health_accregister.php?ln=' + this.ln + '&pid=' +flag;
  pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' +flag+'&docname=wound';

}
else if(rpt==3)
{
  
  //pdfurl = environment.apiUrl + 'reports/health_dischargecertificate.php?ln=' + this.ln + '&pid=' +flag;
  pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' +flag+'&docname=discharge';

}
else if(rpt==4)
{
 
  pdfurl = environment.apiUrl + 'reports/health_ddcertificate.php?ln=' + this.ln + '&pid=' +flag;
  pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' +flag+'&docname=drunken';

}
else if(rpt==5)
{
 
  pdfurl = environment.apiUrl + 'reports/health_pmcertificate.php?ln=' + this.ln + '&pid=' +flag;
  pdfurl = environment.apiUrl + 'healthdocumentview.php?pid=' +flag+'&docname=postmorterm';

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
  
  ngOnInit() {
    console.log("-----------------");
   // console.log(fulldata);
    console.log("-----------------");
  //            alert(this.pm_resultdate);

   // alert(this.patientid);
    this.loadtreatment();
    /*
    if(this.patientid==null)
    {
    
          this.flag=false;
          this.flagtwo=true;
    }
    else
    {
              this.presentAlertConfirm();
              this.loadfullhopitaldetails();
    }

    */

    this.loadselection();
  }
  closemodal()
  {
    this.modalctrl.dismiss();
  }
  logForm() {
  //  console.log(this.model)
  }
  onSubmit(){
    if(this.patientid==null)
    {
      this.patientid='no';
    }

      this.postdata3.mode='sendpmrequest';
      this.postdata3.ptype=this.ptype;
      this.postdata3.id=this.id;
      this.postdata3.patientid=this.patientid;
      this.postdata3.showhp=this.showhp;
      this.postdata3.hpname=this.hpname;
      this.postdata3.district=this.district;
      this.postdata3.crimeno=this.firnumber;
      this.postdata3.hpsameornot=this.hpsameornot;
    //  console.log(this.postdata3);
     
      //return false;

      this.selection(this.postdata3).subscribe(
        (success:any) => {
         alert(success.msg);   
         this.closemodal(); 
      },
        error => {
   //     console.log(error);
        } 
        );
  }
  shveh(flag) {
    console.log('this.trtment',this.trtment);
   // this.patientinfo=this.trtment[flag].patient;
//    console.log(flag);
    this.seg = flag;
  }

  async ddrequest(dataset) 
  { 
  //  console.log(this.vehicle[i]);
    const modal = await this.modalctrl.create({
    component: DdrequestComponent,
      componentProps: { 
        
       
        'id': dataset.id,
        'ptype':'Driver',
        'name': dataset.ser_name,
        'patientid': dataset.patient_id,
        'hpid': dataset.hospitalid,
        'hpdetails': dataset.hpdetails,
        'drunken_driver_reqdate': dataset.drunken_driver_reqdate,
        'drunken_driver_resultdate': dataset.drunken_driver_resultdate,
        'drunken_driver_hospitalid': dataset.drunken_driver_hospitalid,
        'curaddress':dataset.residence,
        'firnumber': '',
        'hpname': dataset.pm_hospitalid,
        'showhp':  dataset.pm_hospitalid,
        'distrcit':  dataset.pm_hospitalid,
        'pm_requestdate': dataset.drunken_driver_reqdate,
        'pm_hospitalid': dataset.pm_hospitalid,
        'pm_hospitaldetailas': dataset.pm_hospitaldetailas,
        'pm_requestofficer': dataset.drunken_driver_resultdate,
     }
  });
  

  modal.onWillDismiss().then(dataReturned => {
  });
  return await modal.present().then(_ => {
  });
  
  }
  pmmessage(){
    
    alert("Change severity to fatal");
    return false;
  }
  

  /*
  async policeintimation(i) 
  {
    console.log(i);
    return false;
 const modal = await this.modalctrl.create({
      component: PoliceintimationComponent,
        componentProps: { 
       //   'patientdata':this.patientdata,
      //    'userdetails':this.userdetails,
       }
    });
    modal.onWillDismiss().then(dataReturned => {
      
    });
    return await modal.present().then(_ => {
    });
  }
  */
  async pmrequest(dataset) 
  {
    
    //console.log(dataset.ser_gender);

    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
        componentProps: { 
         
          'id':dataset.id,
          'ptype':'Driver',
          'name': dataset.ser_name,
          'gender': dataset.ser_gender,
          'age':dataset.age,
          'patientid': dataset.patient_id,
          'address':dataset.residence,
          'hpdetails': dataset.hpdetails,
          'hpid': dataset.hospitalid,
          'curaddress':dataset.residence,
          'firnumber':'',
          'hpname': dataset.pm_hospitalid,
          'showhp':  dataset.pm_hospitalid,
          'distrcit':  dataset.pm_hospitalid,
          'pm_requestdate': dataset.pm_requestdate,
          'pm_hospitalid': dataset.pm_hospitalid,
          'pm_hospitaldetailas': dataset.pm_hospitaldetailas,
          'pm_requestofficer': dataset.pm_requestofficer
         
           
       }
    });
  
    modal.onWillDismiss().then(dataReturned => {
    });
    return await modal.present().then(_ => {
    });
  
  }


  async pmrequestpassenger(passenger) 
  {
      //console.log(dataset.ser_gender);

    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
        componentProps: { 
         
            'id': passenger.id,
            'ptype':'Passenger',
            'name': passenger.name,
            'gender': passenger.gender,
            'age':passenger.age,
            'address':passenger.residence,
            'curaddress':passenger.residence,
            'firnumber': '',
            'hpname': passenger.pm_hospitalid,
            'showhp':  passenger.pm_hospitalid,
            'distrcit':  passenger.pm_hospitalid,
            'patientid': passenger.patient_id,
            'hpid': passenger.hospitalid,
            'hpdetails': passenger.hpdetails,
            'pm_requestdate': passenger.pm_requestdate,
            'pm_requestofficer': passenger.pm_requestofficer,
            'pm_resultdate': passenger.pm_resultdate,
            'pm_request_flag': passenger.pm_request_flag,
            'pm_request': passenger.pm_request,
            'pm_hospitalid': passenger.pm_hospitalid,
            'pm_hospitaldetailas': passenger.pm_hospitaldetailas,
            'fulldata':passenger
         
           
       }
    });
  
    modal.onWillDismiss().then(dataReturned => {
    });
    return await modal.present().then(_ => {
    });
  
  }
  async pmrequestpedestrian(pedestrian)
  {
        
  
   // let pedestrian=this.pedestrian[i];
   
   // console.log(pedestrian);
   // console.log(pedestrian.id);

const modal = await this.modalctrl.create({
component: PmrequestComponent,
componentProps: { 
'id': pedestrian.id,
'ptype':'Pedestrian',
'name': pedestrian.name,
'gender': pedestrian.gender,
'age':pedestrian.age,
'address':pedestrian.residence,
'curaddress':pedestrian.residence,
'firnumber': '',
'hpname': pedestrian.pm_hospitalid,
'showhp': pedestrian.pm_hospitalshow,
'distrcit': pedestrian.pm_hospitalid,
'patientid': pedestrian.patient_id,
'hpid': pedestrian.hospitalid,
'hpdetails': '',
'pm_requestdate': pedestrian.pm_requestdate,
'pm_hospitalid': pedestrian.pm_hospitalid,
'pm_hospitaldetailas': pedestrian.pm_hospitaldetailas,
'pm_requestofficer': pedestrian.pm_requestofficer,

}
});

modal.onWillDismiss().then(dataReturned => {
});
return await modal.present().then(_ => {
});
  
 }

  loadtreatment(){

  //  alert(this.name);

    this.postdata3.mode='treatment';
    this.postdata3.ptype=this.id;
  

    this.selection(this.postdata3).subscribe(
      (success:any) => {
 
          
             this.trtment = success.data; 
             this.user = success.user.data; 
             console.log(this.user);

          for (let i = 0; i < success.data.length; i++) {
           
            this.trtment[i].patient = JSON.parse(this.trtment[i].patient);
          }

       //   console.log(this.trtment[0].patient);


    },
      error => {
  //    console.log(error);
      } 
      );
  }
/*
  async policeintimation(i) 
    {

      const modal = await this.modalctrl.create({
        component: PoliceintimationComponent,
          componentProps: { 
            'patientdata':this.trtment[i].patient,
            'userdetails':this.user,
         }
      });

   
    
      modal.onWillDismiss().then(dataReturned => {
      });
      return await modal.present().then(_ => {
      });
    }

 
    async accregister(i) 
    {
     
   const modal = await this.modalctrl.create({
        component: AccidentregisterComponent,
          componentProps: { 
            'patientdata':this.trtment[i].patient,
            'userdetails':this.user,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
      });
      return await modal.present().then(_ => {
      });
    }
    async dischargesummary(i) 
    {
   const modal = await this.modalctrl.create({
        component: DischargetreatmentComponent,
          componentProps: { 
            'patientdata':this.trtment[i].patient,
            'userdetails':this.user,
         }
      });
      modal.onWillDismiss().then(dataReturned => {
      });
      return await modal.present().then(_ => {
      });
    }
    async postmorterms(i) 
    {
   const modal = await this.modalctrl.create({
        component: PostmortermreportComponent,
        componentProps: { 
          'patientdata':this.trtment[i].patient,
          'userdetails':this.user,
       }
      });
      modal.onWillDismiss().then(dataReturned => {
      });
      return await modal.present().then(_ => {
      });
    }

    async drunkendriven(i) 
    {
   const modal = await this.modalctrl.create({
        component: DrunkendrivetestComponent,
        componentProps: { 
          'patientdata':this.trtment[i].patient,
          'userdetails':this.user,
       }
      });
      modal.onWillDismiss().then(dataReturned => {
      });
      return await modal.present().then(_ => {
      });
    }

    */
    
}
