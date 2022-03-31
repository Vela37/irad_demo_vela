import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service';
import { FormBuilder, FormGroup, Validators, Validator, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { mod_hospital } from '../../../../models/model.hospital';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../../../../services/data.service';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.page.html',
  styleUrls: ['./patientregister.page.scss'],
})
export class PatientregisterPage implements OnInit {
  maxDate:any;
  minDate:any;
  todayDate:any;
  fivedaysbefore:any;
  selectedLanguage: string;
  params: any;
  healthform:FormGroup;isSubmitted = false;
  public local_health: mod_hospital;
  accid: any;
  hpid: any;
  psstnid: any;
  searchbox = true;
  searchstation = true;
  dataObject: any;
  mystnname: string;
  myhospitalname: string;health1 = false;
  isLoading = false;shortgrd: string = 'S/O';guardinaname: string = 'Relation Name';
  patid:any='ID';
  postdata2 = { 'mode': '', 'language': '' };
  hospitalname: any;
  ln:any;
  options5:any;
  options4:any;
  datacombo = true;
  titlevechile = 'PATIENT REGISTER';
  age: number; 
  prfixcont:any; 

  arr_obj=[
    { 
      "Male": {
          "set1": [
              {id:"S/O",name:"Father"},
              {id:"C/O",name:"Guardian"}
          ]
        
      }, 
       "Female": {
          "set2": [
            {id:"D/O",name:"Father"},
            {id:"W/O",name:"Husband"},
            {id:"C/O",name:"Guardian"}

          ]
      },
      "TG": {
        "set3": [
          {id:"S/O",name:"Father"},
      //    {id:"W/O",name:"Husband"},
          {id:"C/O",name:"Guardian"}
        ]
    } 
  }];
  constructor(private translateConfigService: TranslateConfigService,
    private fb: FormBuilder,
    private router:Router,
    private dataService: DataService,
    private datePipe: DatePipe,
    private alertCtrl: AlertController,
    private api: ApiService,) { 
     this.todayDate=new Date();
     // this.todayDate = new Date(this.todayDate.Date() + 1);
      this.fivedaysbefore = new Date(new Date().getTime()-(5*24*60*60*1000));

     this.fivedaysbefore = this.datePipe.transform(this.fivedaysbefore, 'yyyy-MM-dd');
     this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
     // 24-06-2021
      this.dataObject=this.dataService.getOption();  

      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      this.translateConfigService.setLanguage(this.selectedLanguage);
      this.build_health_form();
  
      this.accid = localStorage.getItem('accid');
      this.hpid = localStorage.getItem('hpid');
      this.psstnid = localStorage.getItem('stnid');
      this.mystnname = localStorage.getItem('stnname');
      this.myhospitalname = localStorage.getItem('hpname');}

  ngOnInit() {

    this.minDate=this.fivedaysbefore;
    this.maxDate=this.todayDate;

    if(this.dataObject.dataflag==1)
    {
         this.prfixcont=this.arr_obj[0].Male.set1;
         this.healthform.controls['patient_name'].setValue(this.dataObject.persondata.name);
         this.healthform.controls['age'].setValue(this.dataObject.persondata.age);
         this.healthform.controls['gender'].setValue(this.dataObject.persondata.gender);
         this.healthform.controls['patient_address'].setValue(this.dataObject.persondata.tempaddress);
      
    
    }
        
    this.loadselection();
    this.local_health = new mod_hospital();
  }
  fixguradinalabel($event){

   if($event.target.value=='S/O'){
   this.guardinaname='Father Name';
   }else if($event.target.value=='D/O'){
    this.guardinaname='Father Name';
   }
   else if($event.target.value=='W/O'){
    this.guardinaname='Husband Name';
   }
   else if($event.target.value=='C/O'){
    this.guardinaname='Guardian Name';
   }

  }
  fixprefix($event) {

    this.prfixcont=null;

                                    if($event.target.value=="Male")
                                    {
                                      this.prfixcont=this.arr_obj[0].Male.set1;
                                      //this.guardinaname=this.isdfds;
                                    }
                                    else if($event.target.value=="Female")
                                    {
                                      this.prfixcont=this.arr_obj[0].Female.set2;
                                    }
                                    else if($event.target.value=="TG")
                                    {
                                      this.prfixcont=this.arr_obj[0].TG.set3;
                                    }
                                    else
                                    {
                                      this.prfixcont=this.arr_obj[0].Male.set1;
                                    }


  }
    filllabel($event) {
    if ($event.target.value == 'S/O') {
      this.guardinaname = 'Father Name';
      this.shortgrd = 'S/O';
    }
    else {
      this.guardinaname = 'Husband Name';;
      this.shortgrd = 'W/O';
    }
  }

  public patienttype(event: any) {

    if (event.target.value == "IP") {
      this.patid ='IP ID';
    }
    else {
      this.patid ='OP ID';
    }
  
  }


  public build_health_form(){
    this.healthform = this.fb.group({
   
                             patient_type:['',[Validators.required]],
                             patient_id:['', [Validators.maxLength(50)]],
                             timeof_arrival:['',[Validators.required]], 
                             hospitalization_mode:[''],
                             patient_name:['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]],
                             gender:['',[Validators.required]],
                             age:[''],
                             mobile:[''],
                             gurdian_type:[''],
                             injury_severity:[''],
                             guradian_name:['', [Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]],
                             patient_address:['', [Validators.minLength(3), Validators.maxLength(200)]],
                             
    })
  }

  public loadselection() {
    this.hospitalname = localStorage.getItem('hpname');

  this.postdata2.mode = 'healthdata';
    this.postdata2.language = this.ln;
    this.selection(this.postdata2).subscribe(
      (success: any) => {

        this.datacombo = false;
        this.options5 = success.modeoftranport;
        this.options4 = success.severity;

      },
      error => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {

    return this.api.post('datas.php', postdata2);

  }

  public addhealth() {
  //  console.log(this.healthform);

   // console.log(this.healthform.controls);
    this.isSubmitted = true;
    if (!this.healthform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
//alert(this.healthform.controls['timeof_arrival'].value);

      this.local_health.accid = this.accid;
      this.local_health.patient_type = this.healthform.controls['patient_type'].value;
      this.local_health.patient_id = this.healthform.controls['patient_id'].value;
      this.local_health.timeof_arrival = this.healthform.controls['timeof_arrival'].value;
      this.local_health.hospitalization_mode = this.healthform.controls['hospitalization_mode'].value;
      this.local_health.patient_name = this.healthform.controls['patient_name'].value;
      this.local_health.gender = this.healthform.controls['gender'].value;      
      this.local_health.gurdian_type = this.healthform.controls['gurdian_type'].value;
      this.local_health.guradian_name = this.healthform.controls['guradian_name'].value;
      this.local_health.patient_address = this.healthform.controls['patient_address'].value;
      this.local_health.age = this.healthform.controls['age'].value;
      this.local_health.mobile = this.healthform.controls['mobile'].value;
      this.local_health.injury_severity = this.healthform.controls['injury_severity'].value;

      console.log(this.local_health.timeof_arrival);
      
      if (this.dataObject.dataflag == 1) {
        this.local_health.person_id = this.dataObject.persondata.id;
        this.local_health.typeofperson = this.dataObject.persondata.typeofperson;
        this.local_health.ddflag = this.dataObject.dd;
        this.local_health.pmflag = this.dataObject.pm;
        this.local_health.refaccid = this.dataObject.refaccid;
      }
      

      console.log(this.local_health);

      this.health(this.local_health).subscribe(
        (success: any) => {
          this.presentAlert(success.error);
          this.isLoading = false;
          this.healthform.reset(this.healthform.value);
          this.router.navigate(['acctabs/listpatient']);
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
  public health(postData: any) {
    return this.api.post('patiententry.php', postData);
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
  checkmobile($event: KeyboardEvent) {

    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
    this.healthform.controls['mobile'].setValue(value);
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

}
