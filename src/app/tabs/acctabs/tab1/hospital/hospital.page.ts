import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
import { mod_hospital } from '../../../../models/model.hospital'; 
import { AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DropinionComponent } from '../../../../popups/dropinion/dropinion.component';
import { DeathreasonComponent  } from 'src/app/popups/deathreason/deathreason.component';
import { DdformComponent  } from 'src/app/popups/ddform/ddform.component';
import {  PatientstmtComponent } from 'src/app/popups/patientstmt/patientstmt.component';
import { DataService } from '../../../../services/data.service';


import {  PatienthistroyComponent } from 'src/app/popups/patienthistroy/patienthistroy.component';
import { TreatmentComponent } from '../../../../popups/treatment/treatment.component';
import { MyhospitalComponent } from '../../../../popups/myhospital/myhospital.component';
import { DrcertificateComponent } from '../../../../popups/drcertificate/drcertificate.component';
import { ShowmystationComponent } from '../../../../popups/showmystation/showmystation.component';
import { PatientbodyComponent } from '../../../../popups/patientbody/patientbody.component';
import { PmrequestComponent } from '../../../../popups/pmrequest/pmrequest.component';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {

  age: number;  maxdate:any=new Date();
  public dinner: string;
  phyopnion:any;
  mystnname:string;
  myhospitalname:string;

  public histroy:any;
  public histroyreturn:any;

  public ddreport:any;
  public ddreportreturn:any;


  public treatment:any;
  public treatmentreturn:any;

  public causeofdeath:any;
  public causeofdeathreturn:any;

  public drsummary:any;
  public drsummaryreturn:any;
  
  phytreatment:any;
  ddflag:boolean=true;

  heightdefine="50";
  heightdefinepls="50";
  selectedLanguage:string;
    params:any;
  healthform:FormGroup;
  isSubmitted = false;
  isLoading = false;
  addbtnflag = true;
  
  datacombo=true;
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  options6:any;
  options7:any;
  options8:any;
  options9:any;
  options10:any;
  options11:any;
  options12:any;
  options13:any;
  options14:any;
  hospitalname:any;
  health1=false;
  health2=true;
  health3=true;
  refflag=true;
  titlevechile='PATIENT DETAILS';
  postdata2={'mode':'','language':''};
  postdata3={'mode':'','language':'','name':'','hpid':''};
  ln:any;
  accid:any;
  hpid:any;
  psstnid:any;
  searchbox=true;
  searchstation=true;
  dataObject:any;

  public local_health:mod_hospital;

  constructor(private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private dataService: DataService,
    private modalctrl: ModalController,

  ) {
    this.dataObject=this.dataService.getOption();  
    console.log('-----udhaya------');
    
console.log(this.dataObject.dataflag);
console.log('-----udhaya------');
console.log(this.dataObject.persondata);

//alert(this.dataObject.pm);
   //alert(this.dataObject.getOption('pm'));  

              this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
              this.selectedLanguage = localStorage.getItem('ln');
              this.translateConfigService.setLanguage(this.selectedLanguage);
              this.build_health_form();
              this.accid=localStorage.getItem('accid');
              this.hpid=localStorage.getItem('hpid');
              this.psstnid=localStorage.getItem('stnid');
              this.mystnname=localStorage.getItem('stnname');
              this.myhospitalname=localStorage.getItem('hpname');
              
                if(this.hpid==null)
                {
                    this.searchbox=false;
                }
                else
                {
                  this.searchbox=true;
                }
                if(this.psstnid==null)
                {
                    this.searchstation=false;
                }
                else
                {
                  this.searchstation=true;
                }
             //   this.showwarning();
   
   }
   async  showwarning() {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      message: 'Drunken Certificate and Postmorterm certificate generated based on Police request',
      buttons: ['Agree']
    });

    await alert.present();
  }
   public build_health_form(){
 this.healthform = this.fb.group({
 

                          patient_type:['',[Validators.required]],
                          patient_id:['', [Validators.maxLength(50)]],
                          timeof_arrival:['',[Validators.required]], 
                          hospitalization_mode:[''],
                          pre_arrivalintimation:[''],
                          ddrequest:[''],
                          prearrival_traumaflag:[''],
                          breathing:[''],
                          informant_name:['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]],
                          relationship_patient_type:[''],
                          contact_address:['', [Validators.minLength(3), Validators.maxLength(200)]],
                          contact_number:['', [Validators.pattern('[5-9]\\d{9}')]],    
                          patient_name:['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]],
                          patient_address:['', [Validators.minLength(3), Validators.maxLength(200)]],
                          gender:[''],
                          age:[''],
                          patient_occupation:[''],                          
                          identification_marks1:['', [Validators.minLength(2), Validators.maxLength(100)]],
                          identification_marks2:['', [Validators.minLength(2), Validators.maxLength(100)]],
                          injury_severity:[''],
                          injury_type:[''],
                          nature_ofinjury:[''],
                          conscious:[''],
                          orientation:[''],
                          hospital_name:[''],
                          hospital_type:[''], 
                          police_stationname:[''],
                          intimationto_police:[''],
                          description_pupil:[''],
                          discharge_time:[''],
                          outcome:[''],
                          referral_institution:[''],
                          reason_for_referral:[''],
                          dr_name:['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]],
                          docto_register:['', [Validators.minLength(2), Validators.maxLength(50)]],
                          specialization:[''],
                        
                          treatment:[''],
                          physician_opinion:[''],
                          histroy:[''],
                          doctorsummary:[''],
                                
                          xray:[''],
                          wardno:[''],
                          xraydate:[''],
                          ctscan:[''],
                          ctscandate:[''],
                          hospital_desposition:[''],
                           
 
})
  }
  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      this.healthform.controls['contact_number'].setValue(value);
    }

  }
  checkage($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value);       // returns 0


    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {

        value = value.slice(0, 3)

      }
      if (this.age > 125) {

        value = value.slice(0, 2)
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    }


  }
  public seletedpolicestn(event, item,stnname)
  {
    
        this.searchstation=true;
        this.heightdefinepls="50";       
        this.healthform.controls['police_stationname'].setValue(stnname);
        localStorage.setItem('stnid',item);
        localStorage.setItem('stnname',stnname);
        this.mystnname=stnname;

        
  }
  public seletedhospital(event, item,hpname)
  {
    this.searchbox=true;
   // this.presentAlertMultipleButtons();
        this.heightdefine="50";
        this.myhospitalname=hpname; 
        this.healthform.controls['hospital_name'].setValue(hpname);
        localStorage.setItem('hpid',item);
        localStorage.setItem('hpname',hpname);

        this.postdata3.mode='singlehospital';
        this.postdata3.language=this.ln;
        this.postdata3.hpid=item;
        this.singlehp(this.postdata3).subscribe(
          (success:any) => {
    
           //console.log(success.hpdetails);
         //  alert(success.hpdetails[0].pincode);
       
       //    this.healthform.controls['pincode'].setValue(success.hpdetails[0].pincode);
        //   this.healthform.controls['district'].setValue(success.hpdetails[0].townname);
         
        },
          error => {
          console.log(error);
          } 
          );
this.options9=null;



  }
  public findmypolicestn($event: KeyboardEvent)
  {
    let value = (<HTMLInputElement>event.target).value;
    if (value.length > 2)
    {

    this.postdata3.mode='findhp';
    this.postdata3.language=this.ln;
    this.postdata3.name=value;
    this.autocomplete(this.postdata3).subscribe(
      (success:any) => {

       
        if(success.count==0)
        {
          this.heightdefine="100";
          this.addbtnflag=false;
        }
        else
        {
          this.addbtnflag=true;
          this.heightdefine="200";
        }
        this.options9=success.hospital;
         
     
    },
      error => {
      console.log(error);
      } 
      );
    }
  }
  public findmystation($event: KeyboardEvent)
  {
    let value = (<HTMLInputElement>event.target).value;
    
    if (value.length > 2)
    {
      this.postdata3.mode='finstation';
      this.postdata3.language=this.ln;
      this.postdata3.name=value;
      this.autocomplete(this.postdata3).subscribe(
        (success:any) => {
          if(success.count==0)
          {
            this.heightdefinepls="100";
           
          }
          else
          {
         
            this.heightdefinepls="200";
          }
          this.options10=success.hospital;
           
         },
      error => {
      console.log(error);
      } 
      );
    }
  }
  public findmyhospital($event: KeyboardEvent)
  {
    let value = (<HTMLInputElement>event.target).value;
  //  console.log(value);
  if (value.length > 2)
  {
    
    this.postdata3.mode='findhp';
    this.postdata3.language=this.ln;
    this.postdata3.name=value;
    this.autocomplete(this.postdata3).subscribe(
      (success:any) => {

       
        if(success.count==0)
        {
          this.heightdefine="100";
          this.addbtnflag=false;
        }
        else
        {
          this.addbtnflag=true;
          this.heightdefine="200";
        }
        this.options9=success.hospital;
         
     
    },
      error => {
      console.log(error);
      } 
      );
    }  
  }
  public showopnion(){
 
    alert('hiiii');
   //this.presentModal();
  
  }
  
  async presentModal() 
  {
  
    this.phyopnion=this.healthform.controls['physician_opinion'].value; 
    const modal = await this.modalctrl.create({
      component: DropinionComponent,
      componentProps: {
        lunch: this.phyopnion
      }
    });
  
    modal.onWillDismiss().then(dataReturned => {
      this.dinner = dataReturned.data;
      console.log('Receive: ', this.dinner);
      this.healthform.controls['physician_opinion'].setValue(this.dinner);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    });
  
  }
  public gotoaddhospital()
  {
    this.router.navigate(['/acctabs/tab1/addhospital']);
  }
  public showmiddle(){

    this.health1=true;
    this.health2=false;
    this.health3=true;
    this.titlevechile='PATIENT DETAILS';

}
public showlast(){

  this.titlevechile='PATIENT DETAILS';
this.health1=true;
this.health2=true;
this.health3=false;



}


async pmrequest() 
  {
  
  
    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
      componentProps: {
        'place':this.local_health.pm_flag,
        'refhp':this.local_health.pm_refferal,
 
      }
    });
  
    modal.onWillDismiss().then(dataReturned => {
   
      this.causeofdeathreturn = dataReturned.data;
      console.log('Received:',this.causeofdeathreturn );
      this.local_health.pm_flag=this.causeofdeathreturn.place; 
      this.local_health.pm_refferal=this.causeofdeathreturn.refhp; 
    });
    return await modal.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
    });
  
  }
  
public ddrequestform(event:any)
{

      if(event.target.value=="YES")
{
this.ddflag=false;
}
else
{
this.ddflag=true;
}
}
public referalflag(event:any)
  {

//alert(event.target.value);
    if(event.target.value=="4")
  {
this.refflag=false;
  }
  else
  {
    this.refflag=true;
  }

  }
public showbasic(){
  this.titlevechile='PATIENT DETAILS';

this.health1=false;
this.health2=true;
this.health3=true;


}
  public loadselection(){
    
   // localStorage.getItem('hpid');
    this.hospitalname=localStorage.getItem('hpname');
    this.healthform.controls['hospital_name'].setValue(this.hospitalname);

    this.postdata2.mode='healthdata';
    this.postdata2.language=this.ln;
    this.selection(this.postdata2).subscribe(
      (success:any) => {

        this.datacombo=false;
        this.options1=success.severity;
        this.options2=success.nature;
        this.options3=success.ocuupation;
        this.options4=success.injurytype;
        this.options5=success.modeoftranport;
        this.options6=success.referral;
        this.options7=success.outcome;
        this.options8=success.pupil;
        this.options9=success.conscious;
        this.options10=success.traumaflag;
        this.options11=success.xray;
        this.options12=success.ctscan;
        this.options13=success.specialities;
        this.options14=success.hospital_dispostion;
       
        
        
    },
      error => {
      console.log(error);
      } 
      );
   }
   public selection(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  public autocomplete(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  public singlehp(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  public addhealth()
{
  console.log(this.healthform);
  console.log(this.healthform.controls);
  this.isSubmitted = true;
  if (!this.healthform.valid) {
   // alert("validation failed");
    console.log('Please provide all the required values!')
    return false;
  } else {
//    alert("validation ok");wardno
    this.local_health.accid =this.accid;
    this.local_health.patient_type =this.healthform.controls['patient_type'].value;
    this.local_health.patient_id =this.healthform.controls['patient_id'].value; 
    this.local_health.wardno =this.healthform.controls['wardno'].value; 
   // this.local_health.dateof_incident =this.healthform.controls['dateof_incident'].value;
    this.local_health.timeof_arrival =this.healthform.controls['timeof_arrival'].value;
  //  this.local_health.placeof_incident =this.healthform.controls['placeof_incident'].value;
   // this.local_health.placeof_incident =this.healthform.controls['placeof_incident'].value;
    this.local_health.hospitalization_mode =this.healthform.controls['hospitalization_mode'].value;
    this.local_health.informant_name =this.healthform.controls['informant_name'].value;
    this.local_health.relationship_patient_type =this.healthform.controls['relationship_patient_type'].value;
    this.local_health.contact_address =this.healthform.controls['contact_address'].value;
    this.local_health.contact_number =this.healthform.controls['contact_number'].value;
    this.local_health.patient_name =this.healthform.controls['patient_name'].value;
    this.local_health.gender =this.healthform.controls['gender'].value;
    this.local_health.patient_address =this.healthform.controls['patient_address'].value;
    this.local_health.age =this.healthform.controls['age'].value;
    this.local_health.patient_occupation =this.healthform.controls['patient_occupation'].value;
    this.local_health.identification_marks1 =this.healthform.controls['identification_marks1'].value;
    this.local_health.identification_marks2 =this.healthform.controls['identification_marks2'].value;
    this.local_health.injury_severity =this.healthform.controls['injury_severity'].value;
    this.local_health.injury_type =this.healthform.controls['injury_type'].value;
    this.local_health.nature_ofinjury =this.healthform.controls['nature_ofinjury'].value;
    this.local_health.conscious =this.healthform.controls['conscious'].value;
    
    this.local_health.orientation =this.healthform.controls['orientation'].value;
    this.local_health.intimationto_police =this.healthform.controls['intimationto_police'].value;
    this.local_health.description_pupil =this.healthform.controls['description_pupil'].value;
    this.local_health.discharge_time =this.healthform.controls['discharge_time'].value;
    this.local_health.outcome =this.healthform.controls['outcome'].value;
    this.local_health.referral_institution =this.healthform.controls['referral_institution'].value;
    this.local_health.reason_for_referral =this.healthform.controls['reason_for_referral'].value;
    this.local_health.dr_name =this.healthform.controls['dr_name'].value;
    
   // this.local_health.docto_register =this.healthform.controls['docto_register'].value;
    this.local_health.specialization =this.healthform.controls['specialization'].value;
    this.local_health.prearrival =this.healthform.controls['pre_arrivalintimation'].value;
    this.local_health.pre_hp_traumaflag =this.healthform.controls['prearrival_traumaflag'].value;
    this.local_health.breathing =this.healthform.controls['breathing'].value;

    this.local_health.xray =this.healthform.controls['xray'].value;
    this.local_health.xraydate =this.healthform.controls['xraydate'].value;
    this.local_health.ctscan =this.healthform.controls['ctscan'].value;
    this.local_health.ctscandate =this.healthform.controls['ctscandate'].value;

    this.local_health.hospital_desposition =this.healthform.controls['hospital_desposition'].value;

    
    this.local_health.dr_regnno =this.healthform.controls['docto_register'].value;
    this.local_health.treatment =this.healthform.controls['treatment'].value;
    this.local_health.histroy =this.healthform.controls['histroy'].value;
    this.local_health.physician_opinion =this.healthform.controls['physician_opinion'].value;
if(this.dataObject.dataflag==1){

//alert(this.dataObject.persondata.id);
                                this.local_health.person_id =this.dataObject.persondata.id;
                                this.local_health.typeofperson =this.dataObject.persondata.typeofperson;
                                this.local_health.ddflag =this.dataObject.dd;
                                this.local_health.pmflag =this.dataObject.pm;
                                this.local_health.refaccid =this.dataObject.refaccid;

  }
  
/*
  
*/
    

   
   

   // outcome
 
    
    console.log(this.local_health);

   // return false;

  this.health(this.local_health).subscribe(
    (success:any) => {

       this.presentAlert(success.error);
       this.isLoading = false;
       this.healthform.reset(this.healthform.value);
       this.router.navigate(['/acctabs/tab1']);
   // shirt 36 pant 32

    },
    error => {
    console.log(error);
    } 
    );

  }

}
get errorControl() {

  return this.healthform.controls;

}
async presentAlert(msg) {
  const alert = await this.alertCtrl.create({
    header: 'iRAD',
//    subHeader: 'Passenger',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertMultipleButtons() {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    subHeader: 'Subtitle',
    message: 'This is an alert message.',
    buttons: ['Cancel', 'Open Modal', 'Delete']
  });

  await alert.present();
}
public health(postData: any) {

  return this.api.post('hospital',postData);

}
  ngOnInit() {
   // alert(this.dataObject.dataflag);
    if(this.dataObject.dataflag==1)
    {

//      console.log(this.dataObject.persondata);
  
         this.healthform.controls['patient_name'].setValue(this.dataObject.persondata.name);
         this.healthform.controls['age'].setValue(this.dataObject.persondata.age);
         this.healthform.controls['patient_address'].setValue(this.dataObject.persondata.tempaddress);
         this.healthform.controls['injury_severity'].setValue(this.dataObject.persondata.injury_severity);
         this.healthform.controls['injury_type'].setValue(this.dataObject.persondata.injurytype);
         this.healthform.controls['nature_ofinjury'].setValue(this.dataObject.persondata.natureofinjury);
         
    
        }

    this.loadselection();
    this.local_health=new mod_hospital();

  }
  
  async showmystn() {

    this.phyopnion=this.healthform.controls['patient_id'].value; 
    const modal = await this.modalctrl.create({
      component:ShowmystationComponent,
      componentProps: {
        histroy: this.phyopnion
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.histroyreturn = dataReturned.data;
      console.log('Receive: ', this.histroyreturn);
      if(this.histroyreturn=='yes')
      {
        this.searchstation=false;
        
        this.healthform.controls['police_stationname'].setValue('');
      }
     // if(this.histroyreturn)
      this.healthform.controls['patient_id'].setValue(this.histroyreturn);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    }); 
  
  }
  async showmyhospital() {

    this.phyopnion=this.healthform.controls['patient_id'].value; 
    const modal = await this.modalctrl.create({
      component: MyhospitalComponent,
      componentProps: {
        histroy: this.phyopnion
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.histroyreturn = dataReturned.data;
      console.log('Receive: ', this.histroyreturn);
      if(this.histroyreturn=='yes')
      {
        this.searchbox=false;
        
        this.healthform.controls['hospital_name'].setValue('');
      }
     // if(this.histroyreturn)
      this.healthform.controls['patient_id'].setValue(this.histroyreturn);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    }); 
  }

  async showhistroy() {
    this.phyopnion=this.healthform.controls['histroy'].value; 
    const modal = await this.modalctrl.create({
      component: PatienthistroyComponent,
      componentProps: {
        histroy: this.phyopnion
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.histroyreturn = dataReturned.data;
      console.log('Receive: ', this.histroyreturn);
      this.healthform.controls['histroy'].setValue(this.histroyreturn);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    }); 
  }
  async showcauseofdeath() {
   // this.causeofdeath=this.healthform.controls['patient_id'].value; 
    const modal = await this.modalctrl.create({
      component: DeathreasonComponent,
      componentProps: {
        'wardno':this.local_health.cau_wardno,
        'diedon':this.local_health.cau_diedon,
        'immediatecause':this.local_health.cau_immediatecause, 
        'antcause':this.local_health.cau_antcause, 
        'othersignificant':this.local_health.cau_othersignificant, 
        'mannerofdeath':this.local_health.cau_mannerofdeath, 
        'ifwomen':this.local_health.cau_ifwomen, 
        'wasdelivery':this.local_health.cau_wasdelivery, 
        'dateofverification':this.local_health.cau_dateofverification 
      }
    }); 
    modal.onWillDismiss().then(dataReturned => { 
      this.causeofdeathreturn = dataReturned.data;
      console.log('Receive: ', this.causeofdeathreturn);
      this.local_health.cau_wardno=this.causeofdeathreturn.wardno; 
      this.local_health.cau_diedon=this.causeofdeathreturn.diedon; 
      this.local_health.cau_immediatecause=this.causeofdeathreturn.immediatecause; 
      this.local_health.cau_antcause=this.causeofdeathreturn.antcause; 
      this.local_health.cau_othersignificant=this.causeofdeathreturn.othersignificant; 
      this.local_health.cau_mannerofdeath=this.causeofdeathreturn.mannerofdeath; 
      this.local_health.cau_ifwomen=this.causeofdeathreturn.ifwomen; 
      this.local_health.cau_wasdelivery=this.causeofdeathreturn.wasdelivery; 
      this.local_health.cau_dateofverification=this.causeofdeathreturn.dateofverification; 

     // console.log(this.local_health);
    });
    return await modal.present().then(_ => {
   //   console.log('Sending: ', this.causeofdeath);
    });
   
  }
  async showhchecklist() {
 
   

    const modal = await this.modalctrl.create({
      component: PatientbodyComponent,
      componentProps: {

        'systalicbp': this.local_health.gc_systalicbp,
        'dialisticbp': this.local_health.gc_dialisticbp,
        'pulseheartrate': this.local_health.gc_pulseheartrate,
        'spo2': this.local_health.gc_spo2,
        'temperature': this.local_health.gc_temperature,
        'respiraterate': this.local_health.gc_respiraterate
      
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.ddreportreturn = dataReturned.data;
      console.log('Receive: ', this.ddreportreturn);
    

      this.local_health.gc_systalicbp=this.ddreportreturn.systalicbp; 
      this.local_health.gc_dialisticbp=this.ddreportreturn.dialisticbp; 
      this.local_health.gc_pulseheartrate=this.ddreportreturn.pulseheartrate; 
      this.local_health.gc_spo2=this.ddreportreturn.spo2; 
      this.local_health.gc_temperature=this.ddreportreturn.temperature; 
      this.local_health.gc_respiraterate=this.ddreportreturn.respiraterate; 

      console.log(this.local_health);
    
});
    return await modal.present().then(_ => {

    //  console.log('Sending: ', this.ddreport);
    }); 
  }
  async showhddreport() {
    
    const modal = await this.modalctrl.create({
      component: DdformComponent,
      componentProps: {

        'dr': this.local_health.dd_drname,
        'drreg': this.local_health.dd_drreg,
        'dropnion': this.local_health.dd_opinion,
        'influence': this.local_health.dd_influence,
        'symtomps': this.local_health.dd_syptoms
      
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.ddreportreturn = dataReturned.data;
      console.log('Receive: ', this.ddreportreturn);
    

      this.local_health.dd_drname=this.ddreportreturn.dr; 
      this.local_health.dd_drreg=this.ddreportreturn.drreg; 
      this.local_health.dd_opinion=this.ddreportreturn.dropinion; 
      this.local_health.dd_influence=this.ddreportreturn.alc_influe; 
      this.local_health.dd_syptoms=this.ddreportreturn.symptom; 

      console.log(this.local_health);
    
});
    return await modal.present().then(_ => {

    //  console.log('Sending: ', this.ddreport);
    }); 
  }

  async showtreatment() {
    this.phytreatment=this.healthform.controls['treatment'].value; 
    const modal = await this.modalctrl.create({
      component: TreatmentComponent,
      componentProps: {
        treatment: this.phytreatment
      }
    }); 
    modal.onWillDismiss().then(dataReturned => { 
      this.treatmentreturn = dataReturned.data;
      console.log('Receive: ', this.treatmentreturn);
      this.healthform.controls['treatment'].setValue(this.treatmentreturn);

    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phytreatment);
    });
   
  }

  //public causeofdeath:any;
  //public causeofdeathreturn:any;

  

  async showpatientstatement() {

   // this.phyopnion=this.healthform.controls['patientstatement'].value; 
    const modal = await this.modalctrl.create({
      component: PatientstmtComponent,
      componentProps: {
        histroy: this.phyopnion
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.histroyreturn = dataReturned.data;
      console.log('Receive: ', this.histroyreturn);
  //    this.healthform.controls['patientstatement'].setValue(this.histroyreturn);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    }); 
   
  }
  async showdrcertificate() {
    this.phyopnion=this.healthform.controls['doctorsummary'].value; 
    const modal = await this.modalctrl.create({
      component: DrcertificateComponent,
      componentProps: {
        histroy: this.phyopnion
      }
    });
   modal.onWillDismiss().then(dataReturned => {
      this.histroyreturn = dataReturned.data;
      console.log('Receive: ', this.histroyreturn);
      this.healthform.controls['doctorsummary'].setValue(this.histroyreturn);
    });
    return await modal.present().then(_ => {
      console.log('Sending: ', this.phyopnion);
    }); 
  }
  
}
