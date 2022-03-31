import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';
import { AlertController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SelectlocationComponent } from '../../popups/selectlocation/selectlocation.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 


  pmjayno:any;
  pmjayflag:any;
  getnin:any;
  getmobile:any;
  mobnr:number;
  heightdefine="50";
  heightdefinepls="50"; hsploc:string;
  department:string;
  latlon:string;
  pass:string;
  repass:string;
  hptypeflag:boolean=true;
  hptypeflagspec:boolean=true;
  formdatas:any;
  selectedLanguage:string;
  addhospForm:FormGroup;
  isSubmitted = false;
  isLoading = false;
  datacombo=true;
  stnidcheck:any;
  gpscheck:any; 
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
  hospitalname:any;

  hpname:any;
  state:any;
  district:any;
  hpaddress:any;
  pincode:any;
  hptype:any;
  landline:any;
  classification:any;
  speciality:any;
  email:any;
  mobilenumber:any;
  uspassword:any;
  retypepassword:any;
  psdistrict:any;
  psation:any;
  gpslat:any;
  gpslng:any;
  

  invest1=false;
  invest2=true;
  invest3=true;
  titlevechile='PATIENT ';
  postdata2={'mode':'','language':''};
  postdata3={'mode':'','language':'','name':'','hpid':'','pid':''};
  postdata4={'mode':'','language':'','getmoblenr':'','getnin':'','pmemp':'','pmempnr':''
  ,'address':'','name':'','hpid':'',
  'classification':'','hospital_name':'','hospitaltype':'','landline':'','mobilenumber':'','password':'','postalcode':'','retypepassword':'','speciality':'','state':'','stationid':'','emailid':'','gpslat':'','gpslng':'','district':'','psdistrict':''};

  ln:any;
  accid:any;

  constructor(
    private modalctrl: ModalController,
    private api:ApiService,private router: Router,
  ) 
  {
    //this.build_addhp_form();
   }
   onSubmit(){
     if(this.uspassword!=this.retypepassword){
                                                alert("Please enter same password");
                                                return false;
     }
    if(this.gpslng==undefined){
                              alert("Hospital Location Required");
                              return false;

    }
    var splitted = this.state.split("_"); 

   this.postdata4.hospital_name=this.hpname;
   this.postdata4.address=this.hpaddress;
   this.postdata4.classification=this.classification;
   this.postdata4.password=this.uspassword;   
   this.postdata4.landline=this.landline;
   this.postdata4.emailid=this.email;
   this.postdata4.mobilenumber=this.mobilenumber;
   this.postdata4.psdistrict=this.psdistrict;
   this.postdata4.district=this.district;
   this.postdata4.stationid=this.psation;
   this.postdata4.gpslat=this.gpslat;
   this.postdata4.gpslng=this.gpslng;
   this.postdata4.hospitaltype=this.hptype;
   this.postdata4.state=this.state;
   this.postdata4.postalcode=this.pincode;
   this.postdata4.speciality=this.speciality;
   
   this.postdata4.getmoblenr=this.getmobile;
   this.postdata4.getnin=this.getnin;
   this.postdata4.pmemp=this.pmjayflag;
   this.postdata4.pmempnr=this.pmjayno;

   console.log(this.postdata4);
  // return false;

   this.hospital(this.postdata4).subscribe(
    (success:any) => {
      console.log(success);
       alert(success.error);
     //alert(success.errcode);
      if(success.errcode=='1'){
        this.router.navigate(['/login']);
      }
      

    },
    error => {
    console.log(error);
    } 
    );
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
         // this.addbtnflag=false;
         }
         else
         {
      //     this.addbtnflag=true;
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
    checkdigits($event: KeyboardEvent,cnt) {

    let value = (<HTMLInputElement>event.target).value;
    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }
      if (value.length > cnt) {
        value = value.slice(0,cnt)
      }
    (<HTMLInputElement>event.target).value = value;

  }

}

    public seletedhospital(event, item,hpname)
  {
  //  this.searchbox=true;
   // this.presentAlertMultipleButtons();
        this.heightdefine="50";
   ////     this.myhospitalname=hpname; 
        this.addhospForm.controls['hospital_name'].setValue(hpname);
    

        this.postdata3.mode='singlehospital';
        this.postdata3.language=this.ln;
        this.postdata3.hpid=item;
        this.singlehp(this.postdata3).subscribe(
          (success:any) => {
    
           console.log(success.hpdetails);
       //    alert(success.hpdetails[0].pincode);
       
          this.addhospForm.controls['postalcode'].setValue(success.hpdetails[0].pincode);
          this.addhospForm.controls['address'].setValue(success.hpdetails[0].address);
         // this.addhospForm.controls['state'].setValue(success.hpdetails[0].state_code);
         // this.addhospForm.controls['district'].setValue(success.hpdetails[0].district_code);
          this.addhospForm.controls['landline'].setValue(success.hpdetails[0].contactnr);
          this.addhospForm.controls['hospitaltype'].setValue(success.hpdetails[0].hp_type);
         //
        },
          error => {
          console.log(error);
          } 
          );
this.options9=null;
  }
  public singlehp(postdata2:any){

    return this.api.post_wot('datas_open.php',postdata2);
  
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
        this.mobnr = Number(value);  
        //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    //     this.addhospForm.controls['mobilenumber'].setValue(9632587414);
       
      }
      
    this.mobilenumber=value;
      //  this.addhospForm.controls['mobilenumber'].setValue(this.mobnr);
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
     //   this.mobnr = Number(value);  
        (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
        //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    //     this.addhospForm.controls['mobilenumber'].setValue(9632587414);
       
      }
      
    this.pincode=value;
      //  this.addhospForm.controls['mobilenumber'].setValue(this.mobnr);
    }

    checklandline($event: KeyboardEvent) {
      let value = (<HTMLInputElement>event.target).value;
  
      if ($event.target) {
        if (value == "") {
          value = value.slice(0, 0);
        }
  
        if (value.length > 14) {
          value = value.slice(0, 14)
        }
        this.mobnr = Number(value);  
          (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    //     this.addhospForm.controls['mobilenumber'].setValue(9632587414);
       
      }
      
   // this.landline=value;
      //  this.addhospForm.controls['mobilenumber'].setValue(this.mobnr);
    }
    get errorControl() {
     
      return this.addhospForm.controls;
    
    }
    public addhospital()
    {
      this.isSubmitted = true;
      if (!this.addhospForm.valid) {
   
        console.log('Please provide all the required values!')
        return false;
      } else {
    //    stnidcheck:any;
     //   gpscheck:any;

        this.stnidcheck=this.addhospForm.controls['stationid'].value;
        if(this.stnidcheck=='')
        {
          alert("Please enter police station details");
          return false;
        }
        this.gpscheck=this.addhospForm.controls['gpslat'].value;
        if(this.gpscheck=='')
        {
          alert("Please enter hospital location");
       //   return false;
        }
       this.pass=this.addhospForm.controls['password'].value;
       this.repass=this.addhospForm.controls['retypepassword'].value;
       if(this.pass==this.repass)
       {
 
       alert("check");

       this.formdatas=this.addhospForm.value;
  
this.hospital(this.formdatas).subscribe(
        (success:any) => {
          console.log(success);
        //  alert(success.error);
          alert(success.errcode);
          if(success.error=='1'){
            alert(success.errcode);
            this.router.navigate(['/login']);
          }
          
    
        },
        error => {
        console.log(error);
        } 
        );
       }
       else
       {
         alert("The Password should be same!");
         return false;
       }
      }
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
    public hospital(postData: any) {
      return this.api.post_wot('addhospital.php',postData);
    }
    async showmap() {
    //  this.phyopnion=this.healthform.controls['doctorsummary'].value; 
      const modal = await this.modalctrl.create({
        component: SelectlocationComponent,
        componentProps: {
          dept:'Hospital'
        }
      });
     modal.onWillDismiss().then(dataReturned => {
       // this.latlon = dataReturned.data;
       // this.latlon = dataReturned.data.lat;
        console.log('Received: ', dataReturned.data);
        if(dataReturned.data.lat!=undefined){
      
        this.gpslat=dataReturned.data.lat;
        this.gpslng=dataReturned.data.lng;
        this.hsploc='Lat:'+dataReturned.data.lat.toFixed(6)+',    Long:'+dataReturned.data.lng.toFixed(6);
        }
      //  this.healthform.controls['doctorsummary'].setValue(this.histroyreturn);
      });
      return await modal.present().then(_ => {
      //  console.log('Sending: ', this.department);
      }); 
    }
    public findmystation($event: KeyboardEvent)
    {
      let value = (<HTMLInputElement>event.target).value;
      
      if (value.length > 1)
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
            this.options1=success.hospital;
             
           },
        error => {
        console.log(error);
        } 
        );
      }
    }
    public autocomplete(postData: any) {
      return this.api.post_wot('datas_open.php',postData);
    }
    public seletedpolicestn(event, item,stnname)
    {
      
      
          this.heightdefinepls="50";       
          this.addhospForm.controls['police_stationname'].setValue(stnname);
          this.addhospForm.controls['stationid'].setValue(item);
          this.options1=null;
  
    }
  ngOnInit() {
  this.loadselection();
  }
  public loadselection(){
    //alert('call');
        this.postdata3.mode='loadstate';
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
         //   this.datacombo=false;
            this.options10=success.state;
            this.options12=success.specialities;
            this.options13=success.ghtypes;
           
            
         
        },
          error => {
          console.log(error);
          } 
          );
      
      }
     public selection(postdata3:any){
    
      return this.api.post_wot('datas_open.php',postdata3);
    
    }
    public showdistriict(event:any)
    {
      
      this.district=null;
      this.psdistrict=null;
      this.psation=null;
      this.pincode=null;
      this.hpaddress=null;
    //  alert(event.target.value);
      let str=event.target.value;
      var splitted = str.split("_"); 
//alert(splitted[0]);
      this.postdata3.mode='loaddistrict';
      this.postdata3.hpid=splitted[0];
      this.postdata3.pid=splitted[1];
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
            this.options11=success.district;
            this.options6=success.psdistrict;
           
               
         
        },
          error => {
          console.log(error);
          } 
          );

    }

    public showpolicestn(event:any)
    {
      this.psation=null;

      this.postdata3.mode='loadpolicestation';
      this.postdata3.hpid=event.target.value;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
            this.options5=success.policsstn;
           
            
         
        },
          error => {
          console.log(error);
          } 
          );

    }
   

}
