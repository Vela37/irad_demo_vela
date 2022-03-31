import { Component, OnInit } from '@angular/core';
//import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../services/api.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../../translate-config.service'; 
import { IonicModule, AlertController,ModalController,NavController , Platform } from '@ionic/angular';
//import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import{ environment } from  '../../../../environments/environment';


import { PatiententryComponent } from '../../view/edit/patiententry/patiententry.component';
import { PatienttreatmentComponent } from '../../view/edit/patienttreatment/patienttreatment.component';
import { PatientdocumentComponent } from '../../view/edit/patientdocument/patientdocument.component';
import { PatientreportsComponent } from '../../view/edit/patientreports/patientreports.component';

import { File } from "@ionic-native/file/ngx"; 
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { RefferComponent } from '../../../popups/reffer/reffer.component';



@Component({
  selector: 'app-victimtabs',
  templateUrl: './victimtabs.page.html',
  styleUrls: ['./victimtabs.page.scss'],
})
export class VictimtabsPage implements OnInit {

  user:any; 

  selectedLanguage:string; params:any;
  ln:any;
  
  ar_number:any;
  patientname:any;
  patienttype:any;
  patient_type:any;
  patient_id:any;
  injury_sevrity:any='hiii';

  
  timeof_arrival:any;
  patientdetails:any;
  lastupdate_personal_info:any;
  _personal_info_updateby:any;
  accid:any;
  accinformation:any;
  postdata2={'mode':'','language':''};
  patientdata:any;
  patData=new Array();
 // patientinfo: model_patientinfo=new model_patientinfo();

  selpatient:any; data
  constructor(
    private alertCtrl: AlertController,
    private translateConfigService: TranslateConfigService,
    private router: Router,
    private modalctrl: ModalController,
    private api:ApiService,
    private fileOpener: FileOpener,
    private ft:FileTransfer,
    private file: File 
  )
{}
  ngOnInit() {
    this.selpatient=JSON.parse(localStorage.getItem('selpatient')); console.log( this.selpatient);
    console.log("-------------------------------------");

    //console.log(this.selpatient.id);
    console.log("-------------------------------------");
if(this.selpatient!=null)
{
  this.loadpatiendata();
  
}
else{
  this.router.navigate(['/acctabs/listpatient']);

}
  }
  public loadpatiendata(){

    let postDate={
      mode:"patientview",
      ln:this.selectedLanguage,
      id:this.selpatient.id,
    }

  this.api.post('patientview.php',postDate).subscribe((data: any)=>{
      this.data =data.data[0]; 
    //  this.data['nature_ofinjury']=this.data['nature_ofinjury'].split(',');
      this.user=data.user.data;
    //  console.log("-------------------------------------");
      this.patienttype=  this.data.patient_type;
      this.patientname=  this.data.patient_name;
      this.patient_type=  this.data.patient_type;
      this.patient_id=  this.data.patient_id;
      this.ar_number=  this.data.ar_number;

      this.injury_sevrity=  this.data.injury_severity;
      
      this.timeof_arrival=  this.data.timeof_arrival_df;
      this.lastupdate_personal_info=  this.data.patient_info_chg_date;
      this._personal_info_updateby=  this.data.patient_info_chg_updateby;
      
      this.patientdetails=  this.data.patient_age+","+this.data.patient_address;
console.log("---------------this.patientname------------------------------");
console.log(this.data);
console.log("---------------this.patientname------------------------------");
//patient_type:any;
//patient_id:any;
   
if(data.data[0].accinformation)
{
     this.accinformation=JSON.parse(data.data[0].accinformation);
     this.accinformation=this.accinformation[0];
}  
     console.log(this.accinformation);
    });
  
  } 
  
  
  async accidentregister() {
  const modal = await this.modalctrl.create({
      component:PatiententryComponent,
      componentProps: {
      
      'patientdata':this.data,
      'userdetails':this.user,
   
      }
    });
    
   modal.onWillDismiss().then(dataReturned => {
    this.loadpatiendata();
    });
    return await modal.present().then(_ => {
    }); 
  }

  async showrefferhospital() {
    const modal = await this.modalctrl.create({
        component:RefferComponent,
        componentProps: {
        
        'patientdata':this.data,
        'userdetails':this.user,
     
        }
      });
      
     modal.onWillDismiss().then(dataReturned => {
    //  this.loadpatiendata();
      });
      return await modal.present().then(_ => {
      }); 
    }

  
  async patientreatment() {
    
    
    const modal = await this.modalctrl.create({
      component:PatienttreatmentComponent,
      componentProps: {
      
      'patientdata':this.data,
      'userdetails':this.user,
   
      }
    });
   modal.onWillDismiss().then(dataReturned => {
    this.loadpatiendata();
       //   console.log('Receive: ', this.histroyreturn);
   
    });
    return await modal.present().then(_ => {
   
    }); 
  }

  
  async patiendocuments() {
    
    
    const modal = await this.modalctrl.create({
      component:PatientdocumentComponent,
      componentProps: {
      
      'patientdata':this.data,
      'userdetails':this.user,
   
      }
    });
   modal.onWillDismiss().then(dataReturned => {
    //this.loadpatiendata();
       //   console.log('Receive: ', this.histroyreturn);
   
    });
    return await modal.present().then(_ => {
   
    }); 
  }

  
  async patienreports() {  
    const modal = await this.modalctrl.create({
      component:PatientreportsComponent,
      //cssClass: 'fullscreen',
      componentProps: {
      
      'patientdata':this.data,
      'userdetails':this.user,
   
      }
    });
   modal.onWillDismiss().then(dataReturned => {
   this.loadpatiendata();
   
       //   console.log('Receive: ', this.histroyreturn);
   
    });
    return await modal.present().then(_ => {
   
    }); 
  }
}
