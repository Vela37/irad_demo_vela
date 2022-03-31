import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService} from '../../services/api.service';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-hospitaljur',
  templateUrl: './hospitaljur.page.html',
  styleUrls: ['./hospitaljur.page.scss'],
})
export class HospitaljurPage implements OnInit {

 

 
  postdata2 = { 'mode': '', 'language': '' };
  postdata3={'mode':'','language':'','name':'','hpid':'','pid':''};
  postdata4={'mode':'','language':'','address':'','name':'','hpid':'','postmorterm':'',
  'classification':'','hospital_name':'','hospitaltype':'','joint_director':'','landline':'','mobilenumber':'','password':'',
  'postalcode':'','retypepassword':'','speciality':'','state':'','stationid':'','emailid':'','gpslat':'','gpslng':'',
  'district':'',
  'totalbed':'',
  'inpatienbed':'',
  'noicubed':'',
  'fulloptheatre':'',
  'no_of_ot':'',
  'bloodbank':'',
  'mrecord':'',
  'ambservice':'',
  'lab':'',
  'psdistrict':''};

  mobnr:number;
  hptypeflag:boolean=true;
  hptypeflagspec:boolean=true;
  jd:boolean=true;
  district:any;
  psdistrict:any;
  psation:any;
  pincode:any;
  hpaddress:any;
  hospitalname:any;

  hpname:any;
  state:any;
  hptype:any;
  landline:any;
  classification:any;
  speciality:any;
  email:any;
  mobilenumber:any;
  uspassword:any;
  retypepassword:any;
  gpslat:any;
  gpslng:any;
  ln:any;
  combo_load:any;
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  governmenthospitaltype:any;

  joint_director:any;
  hpdata:any;
  healthform:FormGroup;
  age:any;

  constructor(private router: Router,private modalctrl: ModalController,private fb:FormBuilder, private api:ApiService,private toastController:ToastController) {  
   // this.dept=1;
   this.buildform();
   this.loadgovernmenthospitaltype();
  }
  loadgovernmenthospitaltype(){
    let postDate={
      lang:'en',
      tableArrayName:['governmenthospitaltype']
   }
    this.api.darsave('user/master',postDate).subscribe((data: any)=>{

      this.governmenthospitaltype=data.governmenthospitaltype;
      //console.log(this.governmenthospitaltype)
     });
  }
 public buildform(){
  this.healthform = this.fb.group({
    rhospitalname:['',[Validators.required]],
    raddress:['',[Validators.required]],
    remail:['',[Validators.required]],
    rpincode:['',[Validators.required]],
    rhospitaltype:['',[Validators.required]],
    rspecility:[],
    rclassfication:[''],
    rlandline:[''],
    //totalbed:[''],
    //noinpatientsbed:[''],
    //nooficubed:[''],
    //fullyequipedtheatre:[''],
    //numberofot:[''],
    //bloodbank:[''],
    //medicalrecord:[''],
    //ambulance:[''],
    //lab:[''],
    pmflag:[''],
    rstate:['',[Validators.required]],
    rdistrict:['',[Validators.required]],
    rpdistrict:['',[Validators.required]],
    rpstation:['',[Validators.required]],
    rjd:['',[Validators.required]],
  })
 }
  public hptypeshow(event:any)
  {
  //  alert(event.target.value);
   if(event.target.value=="Government"){
     
     this.hptypeflag=false;
     this.hptypeflagspec=true;

   }
   else
   {
     this.hptypeflag=true;
     this.hptypeflagspec=false;

   }
 }

 checkdigits($event: KeyboardEvent,controlname,cnt) {

    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > cnt) {
        value = value.slice(0, cnt)
      }
    
      this.healthform.controls[controlname].setValue(value);
    }

}

  public showpolicestn(event:any)
  {
   
    this.psation=null;

    this.postdata3.mode='loadpolicestation';
    this.postdata3.hpid=event.target.value;
      this.postdata3.language=this.ln;
      this.selection(this.postdata3).subscribe(
        (success:any) => {
          this.options4=success.policsstn;
         
          
       
      },
        error => {
        console.log(error);
        } 
        );

  }
  
  checkpincode($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 6) {
        value = value.slice(0, 6)
      }
      this.mobnr = Number(value);  
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
  //     this.addhospForm.controls['mobilenumber'].setValue(9632587414);
     
    }
    
  this.pincode=value;
    //  this.addhospForm.controls['mobilenumber'].setValue(this.mobnr);
  }
  public updatedetails(){

    
    this.postdata4.mode='hpupdate';
    this.postdata4.hospital_name=this.healthform.controls['rhospitalname'].value;
    this.postdata4.address=this.healthform.controls['raddress'].value;
    this.postdata4.classification=this.healthform.controls['rclassfication'].value;
    this.postdata4.landline=this.healthform.controls['rlandline'].value;
    this.postdata4.emailid=this.healthform.controls['remail'].value;
    this.postdata4.psdistrict=this.healthform.controls['rpdistrict'].value;
    this.postdata4.district=this.healthform.controls['rdistrict'].value;
    this.postdata4.stationid=this.healthform.controls['rpstation'].value;
    this.postdata4.hospitaltype=this.healthform.controls['rhospitaltype'].value; 
    this.postdata4.state=this.healthform.controls['rstate'].value;
    this.postdata4.postalcode=this.healthform.controls['rpincode'].value;
    this.postdata4.speciality=this.healthform.controls['rspecility'].value;
    this.postdata4.postmorterm=this.healthform.controls['pmflag'].value;
    this.postdata4.joint_director=this.healthform.controls['rjd'].value;

    //-------------------------------------------------------------------------
/*
    this.postdata4.lab=this.healthform.controls['lab'].value;
    this.postdata4.totalbed=this.healthform.controls['totalbed'].value;
    this.postdata4.inpatienbed=this.healthform.controls['noinpatientsbed'].value;
    this.postdata4.noicubed=this.healthform.controls['nooficubed'].value;
    this.postdata4.fulloptheatre=this.healthform.controls['fullyequipedtheatre'].value;
    this.postdata4.no_of_ot=this.healthform.controls['numberofot'].value;
    this.postdata4.bloodbank=this.healthform.controls['bloodbank'].value;
    this.postdata4.mrecord=this.healthform.controls['medicalrecord'].value;
    this.postdata4.ambservice=this.healthform.controls['ambulance'].value;

    */
  
    console.log(this.postdata4);
   // return false;

    this.selection(this.postdata4).subscribe(
      (success:any) => {
        alert(success.message);
      //  this.options2=success.district;
       // this.options3=success.psdistrict;
       
           
     
    },
      error => {
      console.log(error);
      } 
      );

  }
  public showdistriict(event:any)
    {

  let str=event.target.value;
  if(str=='33_29'){
    this.jd=false;
  }
  else
  {
    this.jd=true;
  }
  //alert(str);
    var splitted = str.split("_"); 
     this.postdata3.mode='hploaddistrict';
      this.postdata3.hpid=splitted[0];
      this.postdata3.pid=splitted[1];
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
            this.options2=success.district;
            this.options3=success.psdistrict;
           
               
         
        },
          error => {
          console.log(error);
          } 
          );

    }

  public loadprofile() {
//alert("ff");
    this.postdata2.mode = 'loadprofile';
   
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        


        
        this.hpdata = success.hpdetails[0];
        console.log(this.hpdata);
        
        if(this.hpdata.police_state=='29'){
          this.jd=false;
        }
        else
        {
          this.jd=true;
        }
        
        this.psation=this.hpdata.police_stationid;

      //  alert(this.hpdata.police_stationid);

      //alert(this.hpdata.state+"_"+this.hpdata.police_state);
       if(this.state==null){

         this.combo_load=true;
       
        }
      //  alert(this.hpdata.speciality);

      


      this.hpdata = success.hpdetails[0];
      this.psation=this.hpdata.police_stationid;

   
      /*
       lab, totalbed, noinpatientsbed, nooficubed, fullyequipedtheatre, 
       no_of_ot, bloodbank, medicalrecord, ambulance
      */


      this.healthform.controls['rlandline'].setValue(this.hpdata.landline);
      this.healthform.controls['rhospitalname'].setValue(this.hpdata.hpname);
      this.healthform.controls['raddress'].setValue(this.hpdata.address);
      this.healthform.controls['remail'].setValue(this.hpdata.emailid);
      this.healthform.controls['rpincode'].setValue(this.hpdata.pincode);
      this.healthform.controls['rhospitaltype'].setValue(this.hpdata.hospital_type);
      this.healthform.controls['pmflag'].setValue(this.hpdata.postmortem);

   //   this.healthform.controls['totalbed'].setValue(this.hpdata.totalbed);
    //  this.healthform.controls['noinpatientsbed'].setValue(this.hpdata.noinpatientsbed);
     // this.healthform.controls['nooficubed'].setValue(this.hpdata.nooficubed);
     // this.healthform.controls['fullyequipedtheatre'].setValue(this.hpdata.fullyequipedtheatre);
     // this.healthform.controls['numberofot'].setValue(this.hpdata.no_of_ot);
     // this.healthform.controls['bloodbank'].setValue(this.hpdata.bloodbank);
     // this.healthform.controls['medicalrecord'].setValue(this.hpdata.medicalrecord);
     // this.healthform.controls['ambulance'].setValue(this.hpdata.ambulance);
     // this.healthform.controls['lab'].setValue(this.hpdata.lab);

      if(this.hpdata.hospital_type=="Government")
      {
        this.hptypeflag=false;
        this.hptypeflagspec=true;

      }
      else
      {
        this.hptypeflag=true;
        this.hptypeflagspec=false;
      }
      
      let str = this.hpdata.speciality;
      if(str!=undefined)
      this.healthform.controls['rspecility'].setValue(str.split(","));

      this.healthform.controls['rclassfication'].setValue(this.hpdata.claasification);
      this.healthform.controls['rstate'].setValue(this.hpdata.state+"_"+this.hpdata.police_state);
      this.healthform.controls['rpstation'].setValue(this.hpdata.police_stationid);
      this.healthform.controls['rdistrict'].setValue(this.hpdata.district);
      this.healthform.controls['rpdistrict'].setValue(this.hpdata.police_district);
     this.healthform.controls['rjd'].setValue(this.hpdata.joint_director);

        
        

      },
      error => {
        console.log(error);
      }
    );
  }
  public loadscombo() {

    this.postdata2.mode = 'loadcombo';
   
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        


        

     
        this.options1 = success.state;
        this.options2 = success.dist;
        this.options3 = success.pdist;
        this.options4 = success.station;
        this.options5 = success.jd;
          
  
        
        

      },
      error => {
        console.log(error);
      }
    );
  }
  public selection(postdata2: any) {

    return this.api.post('datas.php', postdata2);

  }

  ngOnInit() {
    this.loadscombo();
    this.loadprofile();

  }
  closeModal() {
 
    this.router.navigate(['/profile']);

  }


}
