import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../../../translate-config.service'; 

@Component({
  selector: 'app-patienttreatment',
  templateUrl: './patienttreatment.component.html',
  styleUrls: ['./patienttreatment.component.scss'],
})
export class PatienttreatmentComponent implements OnInit {


  @Input() flag: string='No';
  @Input() userdetails: any;
  @Input() patientdata: any;

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
  options15:any;
  options16:any;
  selectedLanguage:string; params:any;
  postdata2={'mode':'','language':''};
  ln:any;
  age:any;

   constructor(
    private modalctrl:ModalController,
    private api:ApiService,
    private translateConfigService:TranslateConfigService,
    private altctrls: AlertController) { 
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    }

  ngOnInit() {
  
    
    this.loadselection();
  //  console.log("userdetails",this.userdetails);
   // console.log("patientdata",this.patientdata);
   this.patientdata.nature_ofinjury= this.patientdata.nature_ofinjury.split(',');
   this.patientdata.injury_type= this.patientdata.injury_type.split(',');
   this.patientdata.specialization= this.patientdata.specialization.split(',');
   this.patientdata.xray= this.patientdata.xray.split(',');
   this.patientdata.ctscan= this.patientdata.ctscan.split(',');
  }
  closemodal()
  {

    this.modalctrl.dismiss();
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

      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');
    }


  }

  checkthreedigitdis($event: KeyboardEvent) {


    this.age = String(this.patientdata.dyalistic_bp);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 3)

      }
     
    //  this.patientdata.dyalistic_bp=this.age;
    
      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');


  }
  checkthreedigit($event: KeyboardEvent) {


    this.age = String(this.patientdata.systalic_bp);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 3)

      }
     
     // this.patientdata.systalic_bp=this.age;
    
     (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');


  }

  checkthreedigipulse($event: KeyboardEvent) {


    this.age = String(this.patientdata.pulse_heratrate);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 3)

      }
     
    //  this.patientdata.pulse_heratrate=this.age;
    
      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');


  }

  checkthrtemper($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;


    this.age = String(this.patientdata.temperature);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 3)

      }
     
     // this.patientdata.temperature=this.age;
      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');


  }
  checktwo($event: KeyboardEvent) {


    this.age = String(this.patientdata.respiratory_rate);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 2)

      }
     
      this.patientdata.respiratory_rate=this.age;
    
      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');


  }

  checktwospo($event: KeyboardEvent) {


    this.age = String(this.patientdata.spo2);  

      if (this.age.length > 2) {

        this.age = this.age.slice(0, 2)

      }
     
   //   this.patientdata.spo2=this.age;
      (<HTMLInputElement>event.target).value = this.age.replace(/\D/g, '');



  }
  public  onSubmit()
  {
    let postdata3={
      mode:'patient_treatment',
      info:this.patientdata
    }
    

     this.adddrunkendetails(postdata3).subscribe(
       (success:any) => {
                          alert(success.msg);
                          this.closemodal();
     
  },
       error => {
       console.log(error);
       } 
       );

  }
  public adddrunkendetails(postdata2:any){

    return this.api.post('datas.php',postdata2);
  
  }
  editflagchage(){
    this.flag='yes';
}

public loadselection(){
  //  alert("called");
  // localStorage.getItem('hpid');
  
   

   this.postdata2.mode='healthdata';
   this.postdata2.language=this.ln;
   this.selection(this.postdata2).subscribe(
     (success:any) => {

       
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
       this.options15=success.treatment;
       this.options16=success.findings;
       
   },
     error => {
     console.log(error);
     } 
     );
  }
  
  public selection(postdata2:any){

    return this.api.post('datas.php',postdata2);
  
  }


  saveModal(){
    console.log(this.patientdata);
    let postDate={
      mode:'addPatientdata',
      user:this.patientdata
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);       
    });
  }


}
