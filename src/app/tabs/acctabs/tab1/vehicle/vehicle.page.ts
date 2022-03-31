import { Component, OnInit } from '@angular/core';
import { arrayobject} from '../../../../services/arrayobject';
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { model_vechile } from '../../../../models/model.vechile'; 
import { ApiService} from '../../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  //  TN3220040001680
  //  TN0620150009934
  //  TN2320160001117
  //  TN32AQ2540
  audio: any; audio4play:any; audiotype:any; driver_image:SafeResourceUrl; imgqty: number = 20; img:any;
  addressboxes:boolean=true;
  perm:boolean=true;
  tempr:boolean=true;
  datacombo=true;
  vcategory=true;
  nationality_flag=true;
  chkedit=false;
  selectedLanguage:string;
  postdata3={'mode':'','language':''};
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
  option14:any;
  options15:any;
  options16:any;
  vahanflag:boolean=false;
  saratiflag:boolean=false;
  public mod_vechileobj:model_vechile;

  params:any;
  licenscecount:any;
  licencechange:any;
  hitrundes:any;
 // postdata3={'mode':'','language':''};
  postdata4={'mode':'','vtype':'','language':''};

  isSubmitted = false;
  isLoading = false;
  disabledobj:boolean=false;

  checked : boolean = false;
  readonly : boolean = true;

  insurance:any;
  insurancepoly:any;
  insurancevalid:any;
  regndate:any;
              registerdat:any;
              chasis:any;
              enginenr:any;
              rcno:any;
              rcon:any;
              owner:any;
              vclass:any;
              fuel:any;
              make:any;
              model:any;

              arr_obj=[
                { 
                  "cycle": {
                      "set1": [
                          {id:"Bicycle",name:"Bicycle"},
                          {id:"Tricycle",name:"Tricycle"},
                          {id:"Modified",name:"Modified"},
                          {id:"0",name:"Others"}
                      ]
                    
                  }, 
                   "twowheeler": {
                      "set2": [
                        {id:"Geared MotorBikes",name:"Geared MotorBikes"},
                        {id:"Geared Scooters",name:"Geared Scooters"},
                        {id:"0",name:"Others"}
            
                      ]
                  },
                  "fourwheeler": {
                    "set3": [
                      {id:"Car",name:"Car"},
                      {id:"Jeep",name:"Jeep"},
                      {id:"Taxi",name:"Taxi"},
                      {id:"Van",name:"Van"},
                      {id:"SUV",name:"SUV"},
                      {id:"Tempo",name:"Tempo"},
                      {id:"Tractor",name:"Tractor"},
                      {id:"0",name:"Others"}
                    ]
                },
                "heavy": {
                  "set4": [
                    {id:"Load Carrier",name:"Load Carrier"},
                    {id:"Bus",name:"Bus"},
                    {id:"Lorry",name:"Lorry"},
                    {id:"Truck",name:"Truck"},
                    {id:"Heavy articulated Vehicle",name:"Heavy articulated Vehicle"},
                    {id:"Trolly",name:"Trolly"},
                    {id:"0",name:"Others"}
                  ]
              },
              "cart": {
                "set5": [
                  {id:"Hand Drwan Cart",name:"Hand drwan cart"},
                  {id:"Animal Drawn Cart",name:"Animal drwan cart"},
                  {id:"Motorised Cart",name:"Motorised Cart"},
                  {id:"0",name:"Others"}
                ]
            },
            "three": {
              "set6": [
                {id:"Auto Rickshaw",name:"Auto Rickshaw"},
                {id:"Cycle Rickshaw",name:"Cycle Rickshaw"},
                {id:"Modified",name:"Modified"},
                {id:"0",name:"Others"}
                
              ]
            }
            
            }];

  vechile_subtype:any;null;
  vechile_grpname:string='Vechile Sub Type';

  noedit=false;
  others1:any;
  others2:any;
  others3:any;
  birthdate:any;
  age:any;
  vechile_count:number=0;
  updated_count:number=0;
  remaing_count:number=0;
vahanobj:any;
  addr:any;
  tempaddr:any;
  allcat:any;
  vahandata=true;
  cat1:any;
  cat2:any;
  cat3:any;
  cat4:any;
  cat5:any;
  cat6:any;
  cat7:any;
  cat8:any;
  cat9:any;
  
  optionalmobile=true;

  datamanoeuvre:any=null;
  dataseverity:any=null;
  dataviolation:any=null;
  validaccid:boolean=true;
  selacc:any;accid:any=null;
  ln:any;
  progressbar:any='0.1';
  vechile1=true;
  vechile2=false;
  vechile3=false;
  title:any;
  subTitle:any;
  titlevechile='VEHICLE ';
  vgroupeincrement:number=1;
  decchk:number;
  prvbutton=false;
  nxtbutton=true;
  chk:number;
  VechileDriverFG:FormGroup;
  postdat={'mode':'','accid':''};
  postdata={'regno':'','accid':''};

  postdata2={'licencenumber':'','accid':''};

  selveh={
    'vacategory':'',
    'regnstatus':'',
    'vechile_registernr':'',
    'vdispostion':'',
    'vmotion':'',
    'vdamges':'',
    'vaccuedorivctim':'',
    'vdefect':'',
    'uservehicletype':'',
    'uservehiclesubtype':'',
    'loadcategory':'',
    'vloadcondtion':'',
    'vengine':'',
    'vchasis':'',
    'vownername':'',
    'vcolor':'',
    'vowneraddr':'',
    'vclass':'',
    'vmake':'',
    'vmodel':'',
    'vinsurance':'',
    'vpolicyexpiry':'',
    'nationality':'',
    'occupation':'',    
    'dinjurytype':'',
    'education':'',
    'cellphonedriving':'',
    'dseverity':'',
    'safety':'',
    'drunken':'',
    'modeoftransport':'',
    'hospitaldelay':'',
    'license_nr':'',
    'passport_nr':'',
    'driver_name':'',
    'cov_class':'',
    'gender':'',
    'current_satus':'',
    'dvr_mobile':'',
    'sec_mobile':'',
    'dvr_currentaddr2':'',
    'remarks':'',
  }



  constructor( private router: Router,private translateConfigService: TranslateConfigService,
    private mediaCapture: MediaCapture, private sanitizer: DomSanitizer, private base64: Base64,
    public arobj: arrayobject,private api:ApiService,private fb:FormBuilder,private alertCtrl: AlertController,
    
    private camera: Camera,
    private actionSheetController: ActionSheetController,

    ) { 
      this.selacc=JSON.parse(localStorage.getItem('selacc'));
      this.accid =this.selacc.accid;
    this.ln=localStorage.getItem('ln');
   // alert(this.ln);
 //   this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    this.buildvechileform();

     if(this.accid!=null){
       
                         this.validaccid=false;
                        // alert("hide cons");
       }
   
    
  //  alert(this.updated_count);
   // alert(this.vechile_count);
    
  }
  assigntempaddres()
  {  this.perm=false;
    this.tempr=true;
  
    this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');

           
  this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['tempaddlicesne'].value);  

  }

 
  changemethod(){
 

           
                          this.tempr=false;
                          this.perm=true;
                         
                          this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');

                        
                        this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['permentaddlicesne'].value);
                  
  
  
                    }

                    loadpermaddress(e){

                     
                      if(e.detail.checked)
                      {
                      //  this.VechileDriverFG.controls['loadtempaddress'].reset();

                        console.log(e.detail.checked);
                       // this.perm=false;
                        this.tempr=true;
                        this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');

                        
                        this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['permentaddlicesne'].value);
                      }else
                      {
                        this.perm=false;
                      }
                     
                      
                  
                    }

                    loadtempaddress(e){      
                      if(e.detail.checked)
                      {
                        console.log(e.detail.checked);
                     //  this.tempr=true;
                   // 
                //      this.VechileDriverFG.controls['checkboxperm'].reset();

                        this.perm=true;
                        this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');

                        
                        this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['tempaddlicesne'].value);
                      }
                      else
                      {
                        this.tempr=true;
                      }
                     
                      
                  
                    }

  ionViewWillLeave(){
    this.saveLocal();
  }


  ionViewDidEnter() {
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
  //  this.ln=localStorage.getItem('ln');

  console.log("Check",localStorage.getItem(this.accid+'vehicle'));
    this.selveh=JSON.parse(localStorage.getItem(this.accid+'vehicle'));
    console.log("Selected Vehicle Value is",this.selveh);

     if(this.selveh!=null){
      //this.VechileDriverFG.controls['vacategory'].setValue(this.selveh.vacategory);
      this.VechileDriverFG.controls['regnstatus'].setValue(this.selveh.regnstatus);
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.selveh.vechile_registernr);
      this.VechileDriverFG.controls['vdispostion'].setValue(this.selveh.vdispostion);
      this.VechileDriverFG.controls['vmotion'].setValue(this.selveh.vmotion);
      this.VechileDriverFG.controls['vdamges'].setValue(this.selveh.vdamges);
      this.VechileDriverFG.controls['vaccuedorivctim'].setValue(this.selveh.vaccuedorivctim);
      this.VechileDriverFG.controls['vdefect'].setValue(this.selveh.vdefect);
      this.VechileDriverFG.controls['uservehicletype'].setValue(this.selveh.uservehicletype);
      this.VechileDriverFG.controls['uservehiclesubtype'].setValue(this.selveh.uservehiclesubtype);
      this.VechileDriverFG.controls['loadcategory'].setValue(this.selveh.loadcategory);
      this.VechileDriverFG.controls['vloadcondtion'].setValue(this.selveh.vloadcondtion);
      this.VechileDriverFG.controls['vengine'].setValue(this.selveh.vengine);
      this.VechileDriverFG.controls['vclass'].setValue(this.selveh.vclass);
      this.VechileDriverFG.controls['vchasis'].setValue(this.selveh.vchasis);
      this.VechileDriverFG.controls['vmake'].setValue(this.selveh.vmake);
      this.VechileDriverFG.controls['vmodel'].setValue(this.selveh.vmodel);
      this.VechileDriverFG.controls['vinsurance'].setValue(this.selveh.vinsurance);
      this.VechileDriverFG.controls['vpolicyexpiry'].setValue(this.selveh.vpolicyexpiry);
      this.VechileDriverFG.controls['nationality'].setValue(this.selveh.nationality);
      this.VechileDriverFG.controls['occupation'].setValue(this.selveh.occupation);
      this.VechileDriverFG.controls['dinjurytype'].setValue(this.selveh.dinjurytype);
      this.VechileDriverFG.controls['education'].setValue(this.selveh.education);
      this.VechileDriverFG.controls['cellphonedriving'].setValue(this.selveh.cellphonedriving);
      this.VechileDriverFG.controls['dseverity'].setValue(this.selveh.dseverity);
      this.VechileDriverFG.controls['safety'].setValue(this.selveh.safety);
      this.VechileDriverFG.controls['drunken'].setValue(this.selveh.drunken);
      this.VechileDriverFG.controls['modeoftransport'].setValue(this.selveh.modeoftransport);
      this.VechileDriverFG.controls['hospitaldelay'].setValue(this.selveh.hospitaldelay);
      this.VechileDriverFG.controls['license_nr'].setValue(this.selveh.license_nr);
      this.VechileDriverFG.controls['passport_nr'].setValue(this.selveh.passport_nr);
      this.VechileDriverFG.controls['driver_name'].setValue(this.selveh.driver_name);

      this.VechileDriverFG.controls['cov_class'].setValue(this.selveh.cov_class);
      this.VechileDriverFG.controls['gender'].setValue(this.selveh.gender);
      this.VechileDriverFG.controls['current_satus'].setValue(this.selveh.current_satus);
      this.VechileDriverFG.controls['dvr_mobile'].setValue(this.selveh.dvr_mobile);
      this.VechileDriverFG.controls['sec_mobile'].setValue(this.selveh.sec_mobile);
      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.selveh.dvr_currentaddr2);
      this.VechileDriverFG.controls['remarks'].setValue(this.selveh.remarks);
      
     }

  }
  public changenationality(event:any)
    {
      if(event.target.value=="0")
      {
          this.nationality_flag=true;

      }
      else
      {
        this.nationality_flag=false;
      }
    }
  public getvahan()
    {

this.vahanflag=true;

    this.postdata.regno=this.VechileDriverFG.controls['vechile_registernr'].value;
    this.getvahanservice(this.postdata).subscribe(
      (success:any) => {
        
         this.vahanflag=false;
         
        
        this.vahanobj=success;

      
       if(this.vahanobj['stautsMessage']=='OK')
        {

             this.chkedit=true;
             this.VechileDriverFG.controls['vcolor'].setValue(this.vahanobj['rc_color']);
             this.VechileDriverFG.controls['vowneraddr'].setValue(this.vahanobj['rc_present_address']);
           
           this.VechileDriverFG.controls['vownername'].setValue(this.vahanobj['rc_owner_name']);
           this.VechileDriverFG.controls['vcolor'].setValue(this.vahanobj['rc_color']);
           this.VechileDriverFG.controls['vowneraddr'].setValue(this.vahanobj['rc_present_address']);
           this.VechileDriverFG.controls['vclass'].setValue(this.vahanobj['rc_vh_class_desc']);
           this.VechileDriverFG.controls['vmake'].setValue(this.vahanobj['rc_maker_desc']);
           this.VechileDriverFG.controls['vmodel'].setValue(this.vahanobj['rc_maker_model']);
if(typeof this.vahanobj['rc_insurance_upto']=='string'){

  
  this.VechileDriverFG.controls['vinsurance'].setValue(this.vahanobj['rc_insurance_comp']);
  this.VechileDriverFG.controls['vpolicyexpiry'].setValue(this.vahanobj['rc_insurance_upto']);
}
                                                 

           this.VechileDriverFG.controls['vengine'].setValue(this.vahanobj['rc_eng_no']);
           this.VechileDriverFG.controls['vchasis'].setValue(this.vahanobj['rc_chasi_no']);
           
          this.mod_vechileobj.vaahanflag='1';
          this.mod_vechileobj.vrgndate= this.vahanobj['rc_regn_dt'];
          this.mod_vechileobj.venginenr= this.vahanobj['rc_eng_no'];
          this.mod_vechileobj.vchasis= this.vahanobj['rc_chasi_no'];
          this.mod_vechileobj.service_vowner= this.vahanobj['rc_owner_name'];
          this.mod_vechileobj.vclass= this.vahanobj['rc_vh_class_desc'];
          this.mod_vechileobj.vfueltype= this.vahanobj['rc_fuel_desc'];
          this.mod_vechileobj.vmake= this.vahanobj['rc_maker_desc'];
          this.mod_vechileobj.vmodel= this.vahanobj['rc_maker_model'];
          this.mod_vechileobj.vrcstauson= this.vahanobj['rc_status_as_on'];
          this.mod_vechileobj.vinsuranecompany= this.vahanobj['rc_insurance_comp'];
          this.mod_vechileobj.vpolicyno= this.vahanobj['rc_insurance_policy_no'];
          this.mod_vechileobj.vrcstatus= this.vahanobj['rc_status'];
          this.mod_vechileobj.rcregistedat= this.vahanobj['rc_registered_at'];
          this.mod_vechileobj.service_ownerfather=this.vahanobj['rc_present_address'];
          this.mod_vechileobj.rc_owner_sr=this.vahanobj['rc_owner_sr'];
          this.mod_vechileobj.rc_vch_catg=this.vahanobj['rc_vch_catg'];
          this.mod_vechileobj.rc_norms_desc=this.vahanobj['rc_norms_desc'];
          this.mod_vechileobj.rc_pucc_upto=this.vahanobj['rc_pucc_upto'];
          this.mod_vechileobj.rc_pucc_no=this.vahanobj['rc_pucc_no'];
          this.mod_vechileobj.rc_f_name=this.vahanobj['rc_f_name'];

          this.mod_vechileobj.rc_unld_wt=this.vahanobj['rc_unld_wt'];
          this.mod_vechileobj.rc_gvw=this.vahanobj['rc_gvw'];
          this.mod_vechileobj.rc_no_cyl=this.vahanobj['rc_no_cyl'];
          this.mod_vechileobj.rc_cubic_cap=this.vahanobj['rc_cubic_cap'];
          this.mod_vechileobj.rc_seat_cap=this.vahanobj['rc_seat_cap'];
          this.mod_vechileobj.rc_stand_cap=this.vahanobj['rc_stand_cap'];
          this.mod_vechileobj.rc_sleeper_cap=this.vahanobj['rc_sleeper_cap'];
          this.mod_vechileobj.rc_wheelbase=this.vahanobj['rc_wheelbase'];
          this.mod_vechileobj.rc_fit_upto=this.vahanobj['rc_fit_upto'];
          this.mod_vechileobj.rc_tax_upto=this.vahanobj['rc_tax_upto'];
          this.mod_vechileobj.rc_np_no=this.vahanobj['rc_np_no'];
          this.mod_vechileobj.rc_np_upto=this.vahanobj['rc_np_upto'];
          this.mod_vechileobj.rc_np_issued_by=this.vahanobj['rc_np_issued_by'];
          this.mod_vechileobj.rc_financer=this.vahanobj['rc_financer'];
          this.mod_vechileobj.rc_permanent_address=this.vahanobj['rc_permanent_address'];
          this.mod_vechileobj.rc_present_address=this.vahanobj['rc_present_address'];
          this.mod_vechileobj.rc_body_type_desc=this.vahanobj['rc_body_type_desc'];
          this.mod_vechileobj.rc_manu_month_yr=this.vahanobj['rc_manu_month_yr'];
    
          //   
          
   //this.VechileDriverFG.controls['vcolor'].disable();
   // this.VechileDriverFG.controls['vowneraddr'].disable();
          this.VechileDriverFG.controls['vownername'].disable();
          this.VechileDriverFG.controls['vcolor'].disable();
          this.VechileDriverFG.controls['vowneraddr'].disable();
          this.VechileDriverFG.controls['vclass'].disable();
          this.VechileDriverFG.controls['vmake'].disable();
          this.VechileDriverFG.controls['vmodel'].disable();
          this.VechileDriverFG.controls['vinsurance'].disable();
          this.VechileDriverFG.controls['vpolicyexpiry'].disable();
          this.VechileDriverFG.controls['vchasis'].disable();
          this.VechileDriverFG.controls['vengine'].disable();
       
        }
        else
        {
          this.vahandata=false;
          this.loadfullvehicletype();   
          this.mod_vechileobj.vaahanflag='0';
        }
    
     
        
      },
      error => {
      console.log(error);
      } 
      );
     

  
    }

  addValue(): void {

//vechile_registernr
    this.checked = !this.checked; 
    if(this.checked)
    {
      this.disabledobj=true;
      this.mod_vechileobj.hitandrun='yes';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('Hit and Run'+" "+this.updated_count+1);
//      this.VechileDriverFG.controls['vechile_registernr'].valueChanges;
  if(this.VechileDriverFG.controls['vechile_registernr'].valueChanges){
    //alert("fff");
    this.changedetect();
  }    
//vechile_registernr
    }
    else
    {

      this.mod_vechileobj.hitandrun='no';
      this.mod_vechileobj.vregn_nr='';
      this.disabledobj=false;
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    
    }
  

}

takeAudio() { 
  let options: CaptureAudioOptions = { limit: 1 ,duration :30 }

  this.mediaCapture.captureAudio(options).then(res => { //alert(JSON.stringify(res))
    
    var afterDot = res[0].name.substr(res[0].name.indexOf('.'));
    this.audiotype = afterDot.split('.').pop();
    console.log("after dot value",this.audiotype);

    var filePath = res[0].fullPath; console.log('filePath',filePath)
    let locurl=res[0].localURL; //alert('loc url '+res[0].localURL);
    this.getBase64StringByFilePath(filePath)
        .then((res) => { //alert('res 64 '+res); //this.audio=res;
          console.log(res);
            var base64Only = res.slice(34);
            
            this.audio="data:audio/mp3;base64,"+base64Only;
            this.audio4play = this.sanitizer.bypassSecurityTrustResourceUrl(this.audio);
            console.log(' this.audio', this.audio);
            //do something with base64 string
        });
}, (err) => {
  console.log(err);
});

}
public getBase64StringByFilePath(fileURL: string): Promise<string> {

  return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
          resolve(base64File);
      }, (err) => {
          console.log(err);
      });
  })
}
  public selectedtype(event:any)
  {
    
      this.hitrundes='';
      this.VechileDriverFG.controls['vsubtype'].setValue('')
      this.vechile_grpname='Vechile Sub Type';
      this.vechile_subtype=null;

  
         

          
          if(event.target.value=='cycle')
          {
           
       

            this.vechile_grpname='cycle';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].cycle.set1;
           

          }
          else if(event.target.value=='two wheeler')
          {
            this.vechile_grpname='Two wheeler';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].twowheeler.set2;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')

          }
          else if(event.target.value=='four wheeler')
          {
            this.vechile_grpname='Four Wheeler';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].fourwheeler.set3;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')
          }
          else if(event.target.value=='Heavy Vechile')
          {
            this.vechile_grpname='Heavy Vechile';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].heavy.set4;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')
          }
          else if(event.target.value=='Cart')
          {
            this.vechile_grpname='Cart';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].cart.set5;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')
          }
          else if(event.target.value=='three')
          {
            this.vechile_grpname='Three Wheeler';
            this.vechile_subtype=null;
            this.vechile_subtype=this.arr_obj[0].three.set6;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')
          }
          else
          {

            this.vechile_grpname='Vechile Sub Type';
            this.vechile_subtype=null;
            this.VechileDriverFG.controls['vechile_registernr'].setValue('')

          }

    
    }
  checkvechilecount()
  {
 
    this.postdat.mode='vechilepending';
    this.postdat.accid=this.accid;

    this.getvcount(this.postdat).subscribe(
      (success:any) => {

    //alert(success.overall);
    //alert(success.updated);
      
        this.vechile_count=success.overall;
        this.updated_count=success.updated;
        this.remaing_count=success.overall-success.updated;
     //   alert(this.vechile_count);
      //  alert(this.updated_count);
          if(success.overall<=success.updated)
              {
                   this.validaccid=true;
                   // alert("hide");
              }
              else
              {
                  this.validaccid=false;
                  //    alert("show");
              }
      },
      error => {

                     
    } 
      );
  } 
  public getvcount(postdat){

    return this.api.post('pending',postdat);


  }
 

 
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
   permaddressreset() {
  alert("hii");
  this.perm=false;
  this.tempr=false;
  
  }
   tempaddressreset() {
    alert("bye");
    this.perm=false;
    this.tempr=false;
  }
  async presentAlertConfirm() {
    
    const alert = await this.alertCtrl.create({
      header: 'Select current address',
      inputs: [
        {
          type: 'radio',
          label: 'Permenant Address in License',
          value: 'p'
        },
        {
          type: 'radio',
          label: 'Current Address in License',
          value: 'c'
        }
       
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
        //    console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
           // console.log('Selected Information', data);
            this.filladdressfiel(data);
          }
        }
      ]
    });

    await alert.present();
  }
  filladdressfiel(ss){

  //  console.log(ss);
    if(ss=='c')
    {

      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');
      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['tempaddlicesne'].value);

    }
    if(ss=='p')
    {
      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');
      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue(this.VechileDriverFG.controls['permentaddlicesne'].value);
    }
   

  }
  errorpageAlert() {
    const alert = this.alertCtrl.create({
    message: '',
    subHeader: 'Unknown Error',
    buttons: ['ok']}).then(alert=> alert.present());
  }

  public loadmanov(){
    this.postdata3.mode='manov';
    this.postdata3.language=this.ln;
    this.manov(this.postdata3).subscribe(
      (success:any) => {
  
        this.options3=success.data;
      // console.log(this.options1);
      
    },
      error => {
      console.log(error);
      } 
      );
   }
   public manov(postdata3:any){

    return this.api.post('datas',postdata3);
  
  }
  ngOnInit() {
  //  this.loadmanov();
    this.checkvechilecount();
  //  this.dataseverity=this.arobj.diplayseverity();
   // this.dataviolation=this.arobj.diplaytransferviolation();
   // this.datamanoeuvre=this.arobj.diplaymanoeuvre();
//vechile_disposition vechile_type vechile_subtype

//this.loaddamages();
//this.loadseverity();
//this.loadoccupation();
//this.loaddefect();
//this.loadinjurytype();
//this.loadnatureofinjury();
this.loadselection();
this.mod_vechileobj=new model_vechile(); 
//this.VechileDriverFG.controls['nationality'].setValue('0');
  }
  

  public loadselection(){
//alert('call');
    this.postdata3.mode='vehicledata';
    this.postdata3.language=this.ln;
    this.selection(this.postdata3).subscribe(
      (success:any) => {
        this.datacombo=false;
        this.options1=success.severity;
        this.options2=success.education;
        this.options3=success.delay;
        this.options4=success.modeoftranport;
        this.options5=success.defect;
        this.options6=success.man;
        this.options7=success.damage;
        this.options11=success.injurytype;
        this.options12=success.occupation;
        this.options13=success.regstatus;
        this.options15=success.regnnumbertype;
        this.options8=success.vehicletype;
        this.options16=success.drivinglicencetype;

     
    },
      error => {
      console.log(error);
      } 
      );
  
  }
  
 public selection(postdata3:any){

  return this.api.post('datas',postdata3);

}
  public buildvechileform(){

     
    this.VechileDriverFG = this.fb.group({
      vechile_registernr:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      vdispostion:[''],
      vmotion:[''],
      vaccuedorivctim:[''],
      vdamges:[''],
      cov_class:['',[Validators.minLength(2),Validators.maxLength(200)]],
      vdefect:[''],
      vacategory:[''],
      loadcategory:[''],
      vloadcondtion:[''],
      vownername:['',[Validators.minLength(2),Validators.maxLength(100)]],
      vclass:['',[Validators.minLength(2),Validators.maxLength(200)]],
      vowneraddr:['',[Validators.minLength(2),Validators.maxLength(200)]],
      uservehicletype:[''],
      uservehiclesubtype:[''],
      vcolor:['',[Validators.minLength(2),Validators.maxLength(50)]],
      vmake:['',[Validators.minLength(2),Validators.maxLength(200)]],
      vmodel:['',[Validators.minLength(2),Validators.maxLength(200)]],
      vinsurance:['',[Validators.minLength(2),Validators.maxLength(200)]],
      vpolicyexpiry:[''],
      dinjurytype:[''],
      education:[''],
      gender:[''],
      dseverity:[''],
      safety:[''],
      drunken:[''],
      violation:[''],
      cellphonedriving:[''],
      driver_name:['',[Validators.minLength(2),Validators.maxLength(200),Validators.pattern('^[a-zA-Z ]+$')]],
      current_satus:[''],
      licensevalidity:[''],
      license_nr:['',[Validators.minLength(2),Validators.maxLength(50)]],
      dvr_mobile:['',[Validators.pattern('[5-9]\\d{9}')]],
    //dvr_mobile:['',[Validators.pattern('[5-9]\\d{9}')]],
    //sec_mobile:['',[Validators.pattern('[5-9]\\d{9}')]],
      sec_mobile:['',[Validators.pattern('[5-9]\\d{9}')]],
      occupation:[''],
      licenseclass:[''],
      nationality:[''],
      passport_nr:[''],
      inter_licenese:[''],
      modeoftransport: [''],
      hospitaldelay: [''],
      regnstatus: [''],
      vengine: [''],
      vchasis: [''], 
      checkboxone: [''], 
      checkboxtwo: [''], 
      drivinglicencetype: [''], 
      permentaddlicesne: [''], 
      tempaddlicesne: [''], 
      checkboxperm: [''], 
      checkboxtemp: [''], 
      dvr_currentaddr2:['',[Validators.minLength(2),Validators.maxLength(200)]],
      remarks:['',[Validators.minLength(2),Validators.maxLength(200)]]
      
   })


  }
  get errorControl() {

    return this.VechileDriverFG.controls;
  }

  
  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    console.log(value);

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }
  
      if (value.length > 10) {
        value = value.slice(0, 10)
      }
    //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      this.VechileDriverFG.controls['dvr_mobile'].setValue(value); 
    }
  
  }

  checkmobilecurrent($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }
  
      if (value.length > 10) {
        value = value.slice(0, 10)
      }
    //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      this.VechileDriverFG.controls['sec_mobile'].setValue(value); 
    }
  
  }
  
  changedetect() {
    
      this.chkedit=false;
      this.VechileDriverFG.controls['vcolor'].setValue('');
      this.VechileDriverFG.controls['vowneraddr'].setValue('');
      this.VechileDriverFG.controls['vownername'].setValue('');
      this.VechileDriverFG.controls['vclass'].setValue('');
      this.VechileDriverFG.controls['vmake'].setValue('');
      this.VechileDriverFG.controls['vmodel'].setValue('');
      this.VechileDriverFG.controls['vinsurance'].setValue('');
      this.VechileDriverFG.controls['vpolicyexpiry'].setValue('');
      this.VechileDriverFG.controls['vchasis'].setValue('');
      this.VechileDriverFG.controls['vengine'].setValue('');

      this.VechileDriverFG.controls['vcolor'].enable();
      this.VechileDriverFG.controls['vowneraddr'].enable();
      this.VechileDriverFG.controls['vownername'].enable();
      this.VechileDriverFG.controls['vclass'].enable();
      this.VechileDriverFG.controls['vmake'].enable();
      this.VechileDriverFG.controls['vmodel'].enable();
      this.VechileDriverFG.controls['vinsurance'].enable();
      this.VechileDriverFG.controls['vpolicyexpiry'].enable();
      this.VechileDriverFG.controls['vchasis'].enable();
      this.VechileDriverFG.controls['vengine'].enable();

    
          this.mod_vechileobj.vaahanflag='';
          this.mod_vechileobj.vrgndate='';
          this.mod_vechileobj.venginenr= '';
          this.mod_vechileobj.vchasis='';
          this.mod_vechileobj.service_vowner='';
          this.mod_vechileobj.vclass='';
          this.mod_vechileobj.vfueltype='';
          this.mod_vechileobj.vmake='';
          this.mod_vechileobj.vmodel='';
          this.mod_vechileobj.vrcstauson='';
          this.mod_vechileobj.vinsuranecompany='';
          this.mod_vechileobj.vpolicyno='';
          this.mod_vechileobj.vrcstatus='';
          this.mod_vechileobj.rcregistedat='';
          this.mod_vechileobj.service_ownerfather='';
   
  
  
  }
    findchange($event: KeyboardEvent) {

//    localStorage.setItem('licencechange',this.licenscecount);
    this.addressboxes=true;
    this.mod_vechileobj.ser_swdname='';
    this.mod_vechileobj.ser_mobileNo='';
    this.mod_vechileobj.ser_dateOfBirth='';
    this.mod_vechileobj.ser_gender='';
    this.mod_vechileobj.ser_tempPin='';
    this.mod_vechileobj.ser_tempAdd3='';
    this.mod_vechileobj.ser_tempAdd2='';
    this.mod_vechileobj.ser_tempAdd1='';
    this.mod_vechileobj.ser_permPin='';
    this.mod_vechileobj.ser_permAdd3='';
    this.mod_vechileobj.ser_permAdd2='';
    this.mod_vechileobj.ser_permAdd1='';
    this.mod_vechileobj.ser_vehicleClass='';
    this.mod_vechileobj.ser_registration_Authority='';
    this.mod_vechileobj.ser_dlHillValdTill='';
    this.mod_vechileobj.ser_dlHazrdValdTill='';
    this.mod_vechileobj.ser_dlNonTransValdTill='';
    this.mod_vechileobj.ser_dlTransValdTill='';
    this.mod_vechileobj.ser_dateOfIssue='';
    this.mod_vechileobj.ser_status='';
    this.mod_vechileobj.ser_bloodGroup='';
    this.mod_vechileobj.ser_name='';
    this.mod_vechileobj.ser_dlOldLicnum='';
    this.mod_vechileobj.ser_licensenumbereturn='';
   
    this.noedit=false;
    this.VechileDriverFG.controls['driver_name'].setValue('');
    this.VechileDriverFG.controls['current_satus'].setValue('');
    this.VechileDriverFG.controls['gender'].setValue('');
    this.VechileDriverFG.controls['dvr_mobile'].setValue('');
    this.VechileDriverFG.controls['driver_name'].setValue('');
    this.VechileDriverFG.controls['cov_class'].setValue('');
    this.VechileDriverFG.controls['sec_mobile'].setValue('');
    this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');
    this.VechileDriverFG.controls['remarks'].setValue(''); 
   // this.VechileDriverFG.controls['occupation'].setValue('');    
    this.VechileDriverFG.controls['driver_name'].enable();
    this.VechileDriverFG.controls['current_satus'].enable();
    this.VechileDriverFG.controls['gender'].enable();
    this.VechileDriverFG.controls['driver_name'].enable();
    this.VechileDriverFG.controls['cov_class'].enable();

    
this.saratiflag=false;
}
public rgnstatuscheck(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="2"){
    this.VechileDriverFG.controls['vechile_registernr'].setValue('Unknown'+" "+this.updated_count+1);

   }
   else if(event.target.value=="3")
   {
    this.VechileDriverFG.controls['vechile_registernr'].setValue('Without Regn'+" "+this.updated_count+1);

   }
   else
   {
    this.VechileDriverFG.controls['vechile_registernr'].setValue('');

   }
   
  }

  public getvalue(event:any)
  {

     // alert(event.target.value);
     if(event.target.value=="0")

     { 
        this.presentPrompt();
     }
      
  }
  
  public vehiclecategory(event:any)
  {


    if(event.target.value=="0")
    { 
      this.VechileDriverFG.controls['vechile_registernr'].setValue('Non Motorised'+" "+this.updated_count+1)

      this.VechileDriverFG.get('uservehicletype').setValidators([Validators.required]); // 5.Set Required Validator
      this.VechileDriverFG.get('uservehicletype').updateValueAndValidity();
      this.vahandata=false;
      this.loadvehicletype();
      this.vcategory=false;

    }
    else
    {
      this.vcategory=true;
      this.VechileDriverFG.controls['vechile_registernr'].setValue('');
 
    this.VechileDriverFG.get('uservehicletype').clearValidators();
    this.VechileDriverFG.get('uservehicletype').updateValueAndValidity();

      this.vahandata=true;
     // this.loadfullvehicletype();
    }      
  }
  public getvalue2(event:any)
  {

     // alert(event.target.value);
     if(event.target.value=="0")

     { 
        this.presentPrompt2();
     }
      
  }
  
  public getvalue3(event:any)
  {
  var vtype=this.VechileDriverFG.controls['vtype'].value;
  if(vtype=='cycle')
  {
    if(this.checked){
      this.hitrundes='Hit and Run cycle '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }
 
  else if(vtype=='two wheeler') 
  {
    if(this.checked){
      this.hitrundes='Hit and Run two wheeler '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }
  
  else if(vtype=='four wheeler') 
  {
    if(this.checked){
      this.hitrundes='Hit and Run four wheeler '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }
  else if(vtype=='Heavy Vechile') 
  {
    if(this.checked){
      this.hitrundes='Hit and Run Heavy Vechile '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }
  else if(vtype=='Cart') 
  {
    if(this.checked){
      this.hitrundes='Hit and Run Cart '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }
  else if(vtype=='Three Wheeler') 
  {
    if(this.checked){
      this.hitrundes='Hit and Run Three Wheeler '+event.target.value+" "+this.updated_count+1;
      this.VechileDriverFG.controls['vechile_registernr'].setValue(this.hitrundes)
    }else{
      this.hitrundes='';
      this.VechileDriverFG.controls['vechile_registernr'].setValue('')
    }
  }




     // alert(event.target.value);
     if(event.target.value=="0")

     { 
        this.presentPrompt3();
     }
      
  }
  previousbtn()
  {
    //this.sd.tgroupeincrement=this.sd.tgroupeincrement-1;
    this.chk=this.vgroupeincrement;
    if (this.chk >= 1 && this.chk <=3) {
     
      this.vgroupeincrement=--this.vgroupeincrement;
      this.decchk=this.vgroupeincrement;

      if(this.decchk==1)
      {
        this.titlevechile='VEHICLE';
        this.progressbar='0.3';
        this.vechile1=true;
        this.vechile2=false;
     //   this.vechile3=false;
        this.prvbutton=false;
        this.nxtbutton=true;
      
      }
      else if(this.decchk==2)
      {
        this.titlevechile='DRIVER';
        this.progressbar='0.3';
        this.vechile1=false;
        this.vechile2=true;
   //     this.vechile3=false;
        this.prvbutton=true;
        this.nxtbutton=true;
      }
      /*
      else if(this.decchk==3)
      {
        this.titlevechile='CAUSE OF ACCIDENT';
        this.progressbar='1';
        this.vechile1=false;
        this.vechile2=false;
      //  this.vechile3=true;
        this.prvbutton=false;
        this.nxtbutton=false;

      }
      */

    }
    else{

      this.prvbutton=false;
   
    }
   
   
  }
  nextbtn()
    {
  
      this.chk=this.vgroupeincrement;
      if (this.chk >= 1 && this.chk <=3) {
       
        this.vgroupeincrement=++this.vgroupeincrement;
        this.decchk=this.vgroupeincrement;
  
        if(this.decchk==1)
        {
          this.titlevechile='VEHICLE';
          this.progressbar='0.3';
          this.vechile1=true;
          this.vechile2=false;
       //   this.vechile3=false;
          this.prvbutton=true;
        
        }
        else if(this.decchk==2)
        {
          this.titlevechile='DRIVER';
          this.progressbar='0.5';
          this.vechile1=false;
          this.vechile2=true;
          this.prvbutton=true;
         this.nxtbutton=false;
        }
        /*
        else if(this.decchk==3)
        {
        this.titlevechile='CAUSE OF ACCIDENT';
          this.progressbar='1';
          this.vechile1=false;
          this.vechile2=false;
     //     this.vechile3=true;
          this.prvbutton=true;
          this.nxtbutton=false;
        }
       */ 
  
      }
      else{
  
        this.prvbutton=true;
        this.nxtbutton=false;
  
      }
     
  }

  public saveLocal(){
    // console.log("Saving Local",event.target.value);
     this.selveh={
       'vacategory':this.VechileDriverFG.controls['vacategory'].value,
       'regnstatus':this.VechileDriverFG.controls['regnstatus'].value,
       'vechile_registernr':this.VechileDriverFG.controls['vechile_registernr'].value,
       'vdispostion':this.VechileDriverFG.controls['vdispostion'].value,
       'vmotion':this.VechileDriverFG.controls['vmotion'].value,
       'vdamges':this.VechileDriverFG.controls['vdamges'].value,
       'vaccuedorivctim':this.VechileDriverFG.controls['vaccuedorivctim'].value,
       'vdefect':this.VechileDriverFG.controls['vdefect'].value,
       'uservehicletype':this.VechileDriverFG.controls['uservehicletype'].value,
       'uservehiclesubtype':this.VechileDriverFG.controls['uservehiclesubtype'].value,
       'loadcategory':this.VechileDriverFG.controls['loadcategory'].value,
       'vloadcondtion':this.VechileDriverFG.controls['vloadcondtion'].value,
       'vengine':this.VechileDriverFG.controls['vengine'].value,
       'vchasis':this.VechileDriverFG.controls['vchasis'].value,
       'vownername':this.VechileDriverFG.controls['vownername'].value,
       'vcolor':this.VechileDriverFG.controls['vcolor'].value,
       'vowneraddr':this.VechileDriverFG.controls['vowneraddr'].value,
       'vclass':this.VechileDriverFG.controls['vclass'].value,
       'vmake':this.VechileDriverFG.controls['vmake'].value,
       'vmodel':this.VechileDriverFG.controls['vmodel'].value,
       'vinsurance':this.VechileDriverFG.controls['vinsurance'].value,
       'vpolicyexpiry':this.VechileDriverFG.controls['vpolicyexpiry'].value,
       'nationality':this.VechileDriverFG.controls['nationality'].value,
       'occupation':this.VechileDriverFG.controls['occupation'].value,
       
       'dinjurytype':this.VechileDriverFG.controls['dinjurytype'].value,
       'education':this.VechileDriverFG.controls['education'].value,
       'cellphonedriving':this.VechileDriverFG.controls['cellphonedriving'].value,
       'dseverity':this.VechileDriverFG.controls['dseverity'].value,
       'safety':this.VechileDriverFG.controls['safety'].value,
       'drunken':this.VechileDriverFG.controls['drunken'].value,
       'modeoftransport':this.VechileDriverFG.controls['modeoftransport'].value,
       'hospitaldelay':this.VechileDriverFG.controls['hospitaldelay'].value,
       'license_nr':this.VechileDriverFG.controls['license_nr'].value,
       'passport_nr':this.VechileDriverFG.controls['passport_nr'].value,
       'driver_name':this.VechileDriverFG.controls['driver_name'].value,
       'cov_class':this.VechileDriverFG.controls['cov_class'].value,
       'gender':this.VechileDriverFG.controls['gender'].value,
       'current_satus':this.VechileDriverFG.controls['current_satus'].value,
       'dvr_mobile':this.VechileDriverFG.controls['dvr_mobile'].value,
       'sec_mobile':this.VechileDriverFG.controls['sec_mobile'].value,
       'dvr_currentaddr2':this.VechileDriverFG.controls['dvr_currentaddr2'].value,
       'remarks':this.VechileDriverFG.controls['remarks'].value,
     }
     
     console.log("Selected Vehicle",this.selveh);
     localStorage.setItem(this.accid+'vehicle', JSON.stringify(this.selveh));
 
   }
  
  public savevehile(){


    //this.isLoading = true;
    this.isSubmitted = true;
    if(!this.VechileDriverFG.valid) {
       //   alert("validation failed");
       if(this.VechileDriverFG.controls['vechile_registernr'].value=='')
  {
    alert('Enter vehicle registration number....');
    this.previousbtn();
    return false;

  }
      console.log('Please provide all the required values!')
      return false;
    }
    else
    {
      this.isLoading = true;

      this.mod_vechileobj.wlc='1';
    //  alert(this.VechileDriverFG.controls['license_nr'].value);
      if(this.VechileDriverFG.controls['license_nr'].value=='' || this.VechileDriverFG.controls['license_nr'].value==null)
      {
        
        var lictmp="WLC "+this.VechileDriverFG.controls['vechile_registernr'].value;
        this.VechileDriverFG.controls['license_nr'].setValue(lictmp);
        this.mod_vechileobj.wlc='0';
      }
   //  return false;
      this.mod_vechileobj.accidentid=this.accid;
      this.mod_vechileobj.vregn_nr=this.VechileDriverFG.controls['vechile_registernr'].value;
      this.mod_vechileobj.regnstatus=this.VechileDriverFG.controls['regnstatus'].value;
      this.mod_vechileobj.vdisposition=this.VechileDriverFG.controls['vdispostion'].value;
      this.mod_vechileobj.vmotion=this.VechileDriverFG.controls['vmotion'].value;
      this.mod_vechileobj.vaccusedorvictim=this.VechileDriverFG.controls['vaccuedorivctim'].value;
      this.mod_vechileobj.vdamage=this.VechileDriverFG.controls['vdamges'].value;
      this.mod_vechileobj.vdefect=this.VechileDriverFG.controls['vdefect'].value;
      this.mod_vechileobj.vloadcondtion=this.VechileDriverFG.controls['vloadcondtion'].value;
      this.mod_vechileobj.vowner=this.VechileDriverFG.controls['vownername'].value;
      this.mod_vechileobj.vowneraddr=this.VechileDriverFG.controls['vowneraddr'].value;
      this.mod_vechileobj.vmake=this.VechileDriverFG.controls['vmake'].value;
      this.mod_vechileobj.vmodel=this.VechileDriverFG.controls['vmodel'].value;
      this.mod_vechileobj.vcolor=this.VechileDriverFG.controls['vcolor'].value;
      this.mod_vechileobj.vinsuranecompany=this.VechileDriverFG.controls['vinsurance'].value;
      this.mod_vechileobj.vpolicyexpiry=this.VechileDriverFG.controls['vpolicyexpiry'].value;
      this.mod_vechileobj.vchasis=this.VechileDriverFG.controls['vchasis'].value;
      this.mod_vechileobj.venginenr=this.VechileDriverFG.controls['vengine'].value;
      this.mod_vechileobj.drivinglicencetype=this.VechileDriverFG.controls['drivinglicencetype'].value;
      
      this.mod_vechileobj.vclass= this.VechileDriverFG.controls['vclass'].value;
      this.mod_vechileobj.mvehicletype= this.VechileDriverFG.controls['uservehicletype'].value;
      this.mod_vechileobj.mvehiclesubtype= this.VechileDriverFG.controls['uservehiclesubtype'].value;

      this.mod_vechileobj.vehiclecategory= this.VechileDriverFG.controls['vacategory'].value;
      this.mod_vechileobj.loadcategory= this.VechileDriverFG.controls['loadcategory'].value;
      

      this.mod_vechileobj.injurytype=this.VechileDriverFG.controls['dinjurytype'].value;
      this.mod_vechileobj.education=this.VechileDriverFG.controls['education'].value;
      this.mod_vechileobj.ser_gender=this.VechileDriverFG.controls['gender'].value;
      this.mod_vechileobj.severity=this.VechileDriverFG.controls['dseverity'].value;
      this.mod_vechileobj.seatbelt=this.VechileDriverFG.controls['safety'].value;
      this.mod_vechileobj.drunk=this.VechileDriverFG.controls['drunken'].value;
      this.mod_vechileobj.cellphoneused=this.VechileDriverFG.controls['cellphonedriving'].value;
      
      this.mod_vechileobj.drivemobile=this.VechileDriverFG.controls['dvr_mobile'].value;
      this.mod_vechileobj.ser_secmobile=this.VechileDriverFG.controls['sec_mobile'].value;

      this.mod_vechileobj.occupation=this.VechileDriverFG.controls['occupation'].value;
      this.mod_vechileobj.presentaddr=this.VechileDriverFG.controls['dvr_currentaddr2'].value;
      this.mod_vechileobj.remarks=this.VechileDriverFG.controls['remarks'].value;
    

      this.mod_vechileobj.modeoftrasnport=this.VechileDriverFG.controls['modeoftransport'].value;
      this.mod_vechileobj.hospitaldelay=this.VechileDriverFG.controls['hospitaldelay'].value;
     
      this.mod_vechileobj.nationality=this.VechileDriverFG.controls['nationality'].value;
      this.mod_vechileobj.passportnumber=this.VechileDriverFG.controls['passport_nr'].value;
      
      this.mod_vechileobj.language=this.ln;
   
      
     

      this.mod_vechileobj.ser_dlLicnum=this.VechileDriverFG.controls['license_nr'].value;

      this.mod_vechileobj.driver_name=this.VechileDriverFG.controls['driver_name'].value;
      this.mod_vechileobj.license_nr=this.VechileDriverFG.controls['license_nr'].value;

      this.mod_vechileobj.audio=this.audio4play;
      this.mod_vechileobj.audiotype=this.audiotype;
      this.mod_vechileobj.driver_image=this.driver_image;
//alert(this.VechileDriverFG.controls['dvr_mobile'].value);
//alert(this.VechileDriverFG.controls['sec_mobile'].value);
      console.log(this.mod_vechileobj.drivemobile);
      console.log(this.mod_vechileobj.ser_secmobile);
//      return false;
      this.addvehiledriver(this.mod_vechileobj).subscribe(
        (success:any) => {
       
         //alert(success.error);    
         this.presentAlert(success.error);
     // this.VechileDriverFG.reset();
      this.VechileDriverFG.reset(this.VechileDriverFG.value);
      this.isLoading=false;
      this.mod_vechileobj=null;
   //   this.VechileDriverFG.reset(this.VechileDriverFG.value);
      this.VechileDriverFG.controls['vcolor'].enable();
      this.VechileDriverFG.controls['vowneraddr'].enable();
      this.VechileDriverFG.controls['vownername'].enable();
      this.VechileDriverFG.controls['vclass'].enable();
      this.VechileDriverFG.controls['vmake'].enable();
      this.VechileDriverFG.controls['vmodel'].enable();
      this.VechileDriverFG.controls['vinsurance'].enable();
      this.VechileDriverFG.controls['vpolicyexpiry'].enable();

        
    this.VechileDriverFG.controls['driver_name'].enable();
    this.VechileDriverFG.controls['current_satus'].enable();
    this.VechileDriverFG.controls['gender'].enable();
    this.VechileDriverFG.controls['driver_name'].enable();
    this.VechileDriverFG.controls['cov_class'].enable();
    this.chkedit=false;
    this.noedit=false;
    localStorage.removeItem(this.accid+'vehicle');
    this.VechileDriverFG.reset();
      this.router.navigate(['/acctabs/tab1']);
      
      },
        error => {
        console.log(error);
        } 
        );
 
    }
  }
  
  public addvehiledriver(postData: any) {

    return this.api.post('addvehicledetails',postData);
}
public changeseveriy(event:any)

{

   if(event.target.value=="4" || event.target.value=="5" )
   { 
    this.VechileDriverFG.controls['modeoftransport'].setValue('0');
    this.VechileDriverFG.controls['hospitaldelay'].setValue('0');
    this.VechileDriverFG.controls['modeoftransport'].disable();
    this.VechileDriverFG.controls['hospitaldelay'].disable();

   }
   else
   {
    this.VechileDriverFG.controls['modeoftransport'].enable();
    this.VechileDriverFG.controls['hospitaldelay'].enable();

  }
    
}

public loadseverity(){

  this.postdata3.mode='severity';
  this.postdata3.language=this.ln;
  this.severity(this.postdata3).subscribe(
    (success:any) => {
      this.options6=success.data;
  },
    error => {
    console.log(error);
    } 
    );

}
public loadoccupation(){
  this.postdata3.mode='occupation';
  this.postdata3.language=this.ln;
  this.occupation(this.postdata3).subscribe(
    (success:any) => {
      this.options7=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public occupation(postdata3:any){

  return this.api.post('datas',postdata3);

}
public loaddamages(){
  this.postdata3.mode='damages';
  this.postdata3.language=this.ln;
  this.damages(this.postdata3).subscribe(
    (success:any) => {
      this.options1=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public damages(postdata3:any){

  return this.api.post('datas',postdata3);

}
loadcondtions(event:any){
 
  this.VechileDriverFG.controls['vloadcondtion'].setValue('0');

  this.options9=null;
  this.postdata4.mode='loadcondtions';
  this.postdata4.vtype=event.target.value;
  this.postdata4.language=this.ln;
  this.vtypes(this.postdata4).subscribe(
    (success:any) => {
      this.option14=success.data;
  },
    error => {
    console.log(error);
    } 
    );


}
public loadvehicletype(){
  this.options8=null;
  this.VechileDriverFG.controls['uservehiclesubtype'].setValue('0');
  this.options9=null;
 
  this.postdata3.mode='vtypes';
  this.postdata3.language=this.ln;
  this.vtypes(this.postdata3).subscribe(
    (success:any) => {
      this.options8=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public vtypes(postdata3:any){

  return this.api.post('datas',postdata3);

}

public loadfullvehicletype(){
  this.options8=null;
  this.VechileDriverFG.controls['uservehiclesubtype'].setValue('0');
  this.VechileDriverFG.controls['uservehicletype'].setValue('0');
  this.options9=null;
  this.options8=null;
 
  this.postdata3.mode='fullvtypes';
  this.postdata3.language=this.ln;
  this.fullvtypes(this.postdata3).subscribe(
    (success:any) => {
      this.options8=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public fullvtypes(postdata3:any){

  return this.api.post('datas',postdata3);

}
public getsubtype(event:any){
  
  this.VechileDriverFG.controls['uservehiclesubtype'].setValue('0');

  this.options9=null;
  this.postdata4.mode='subtypes';
  this.postdata4.vtype=event.target.value;
  this.postdata4.language=this.ln;
  this.vtypes(this.postdata4).subscribe(
    (success:any) => {
      this.options9=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public subtypes(postdata3:any){

  return this.api.post('datas',postdata3);

}
 public severity(postdata3:any){

  return this.api.post('datas',postdata3);

}


public loaddefect(){
  this.postdata3.mode='defect';
  this.postdata3.language=this.ln;
  this.getdefect(this.postdata3).subscribe(
    (success:any) => {
      this.options2=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public loadinjurytype(){
  this.postdata3.mode='injurytype';
  this.postdata3.language=this.ln;
  this.injurytype(this.postdata3).subscribe(
    (success:any) => {
      this.options5=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 
 /*
 public loadnatureofinjury(){
  this.postdata3.mode='natureofinjury';
  this.postdata3.language=this.ln;
  this.damages(this.postdata3).subscribe(
    (success:any) => {
      this.options4=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
*/ 

change_vdispostion(event){
  let value = (<HTMLInputElement>event.target).value;
  if(value=="Need to be towed")
  {
      console.log('change_vdispostion',true);
      console.log('options7',this.options7);
      
      this.options7[6]['disabled']=true;

  }else{

    console.log('change_vdispostion',false);
    this.options7[6]['disabled']=false;
  }

  
}

 public getdefect(postdata3:any){

  return this.api.post('datas',postdata3);

}
public injurytype(postdata3:any){

  return this.api.post('datas',postdata3);

}
public natureofinjury(postdata3:any){

  return this.api.post('datas',postdata3);

}




public getsarthi(){
     
  if(this.VechileDriverFG.controls['license_nr'].value==null || this.VechileDriverFG.controls['license_nr'].value=='')
  {
      return false;
  }
 
      this.VechileDriverFG.controls['driver_name'].setValue('');
      this.VechileDriverFG.controls['current_satus'].setValue('');
      this.VechileDriverFG.controls['gender'].setValue('');
      this.VechileDriverFG.controls['dvr_mobile'].setValue('');
      this.VechileDriverFG.controls['driver_name'].setValue('');
      this.VechileDriverFG.controls['cov_class'].setValue('');
      this.VechileDriverFG.controls['sec_mobile'].setValue('');
      this.VechileDriverFG.controls['dvr_currentaddr2'].setValue('');
      this.VechileDriverFG.controls['remarks'].setValue(''); 
      this.VechileDriverFG.controls['permentaddlicesne'].setValue(''); 
      this.VechileDriverFG.controls['tempaddlicesne'].setValue(''); 
     // this.VechileDriverFG.controls['occupation'].setValue('-1');
      
  this.saratiflag=true;
  this.postdata2.licencenumber=this.VechileDriverFG.controls['license_nr'].value;
  this.licenscecount=this.VechileDriverFG.controls['license_nr'].value;
  localStorage.setItem('licencechange',this.licenscecount);
  this.getsarathiservice(this.postdata2).subscribe(
    (success:any) => {

      

      
      
     // this.noedit=true;
      this.saratiflag=false;
      if(success.iradobj!=null)
  {
     this.addressboxes=false;
      this.noedit=true;
      this.VechileDriverFG.controls['driver_name'].disable();
      this.VechileDriverFG.controls['current_satus'].disable();
      this.VechileDriverFG.controls['gender'].disable();
     
      this.VechileDriverFG.controls['driver_name'].disable();
      this.VechileDriverFG.controls['cov_class'].disable();
      this.VechileDriverFG.controls['permentaddlicesne'].disable(); 
      this.VechileDriverFG.controls['tempaddlicesne'].disable(); 
      
    
    this.mod_vechileobj.sarathiflag='yes';

      this.VechileDriverFG.controls['current_satus'].setValue(success.iradobj[0]['status']);
      this.VechileDriverFG.controls['driver_name'].setValue(success.iradobj[0]['name']);
      this.VechileDriverFG.controls['gender'].setValue(success.iradobj[0]['gender']);
      this.VechileDriverFG.controls['dvr_mobile'].setValue(success.iradobj[0]['mobileNo']);
      if(success.iradobj[0]['mobileNo']!="")
      {
        this.VechileDriverFG.controls['dvr_mobile'].disable();
        this.optionalmobile=false;
      }
      this.VechileDriverFG.controls['cov_class'].setValue(success.iradobj[0]['vehicleClass']);
     // this.VechileDriverFG.controls['licensevalidity'].setValue(success.iradobj[0]['dlNonTransValdTill']);
       this.mod_vechileobj.ser_swdname=success.iradobj[0]['swdname'];
       this.mod_vechileobj.ser_mobileNo=success.iradobj[0]['mobileNo'];
       this.mod_vechileobj.ser_dateOfBirth=success.iradobj[0]['dateOfBirth'];
       this.mod_vechileobj.ser_gender=success.iradobj[0]['gender'];
       this.mod_vechileobj.ser_tempPin=success.iradobj[0]['tempPin'];
       this.mod_vechileobj.ser_tempAdd3=success.iradobj[0]['tempAdd3'];
       this.mod_vechileobj.ser_tempAdd2=success.iradobj[0]['tempAdd2'];
       this.mod_vechileobj.ser_tempAdd1=success.iradobj[0]['tempAdd1'];
       this.mod_vechileobj.ser_permPin=success.iradobj[0]['permPin'];
       this.mod_vechileobj.ser_permAdd3=success.iradobj[0]['permAdd3'];
       this.mod_vechileobj.ser_permAdd2=success.iradobj[0]['permAdd2'];
       this.mod_vechileobj.ser_permAdd1=success.iradobj[0]['permAdd1'];
       this.mod_vechileobj.ser_vehicleClass=success.iradobj[0]['vehicleClass'];
       this.mod_vechileobj.ser_registration_Authority=success.iradobj[0]['registration_Authority'];
       this.mod_vechileobj.ser_dlHillValdTill=success.iradobj[0]['dlHillValdTill'];
       this.mod_vechileobj.ser_dlHazrdValdTill=success.iradobj[0]['dlHazrdValdTill'];
       this.mod_vechileobj.ser_dlNonTransValdTill=success.iradobj[0]['dlNonTransValdTill'];
       this.mod_vechileobj.ser_dlTransValdTill=success.iradobj[0]['dlTransValdTill'];
       this.mod_vechileobj.ser_dateOfIssue=success.iradobj[0]['dateOfIssue'];
       this.mod_vechileobj.ser_status=success.iradobj[0]['status'];
       this.mod_vechileobj.ser_bloodGroup=success.iradobj[0]['bloodGroup'];
       this.mod_vechileobj.ser_name=success.iradobj[0]['name'];
       this.mod_vechileobj.ser_dlOldLicnum=success.iradobj[0]['dlOldLicnum'];
       this.mod_vechileobj.ser_licensenumbereturn=success.iradobj[0]['dlLicnum'];
       this.VechileDriverFG.controls['permentaddlicesne'].setValue(success.iradobj[0]['permAdd1']+","+success.iradobj[0]['permAdd2']+","+success.iradobj[0]['permAdd3']+","+success.iradobj[0]['permPin']); 
       this.VechileDriverFG.controls['tempaddlicesne'].setValue(success.iradobj[0]['tempAdd1']+","+success.iradobj[0]['tempAdd2']+","+success.iradobj[0]['tempAdd3']+","+success.iradobj[0]['tempPin']); 
    //   this.VechileDriverFG.controls['tempaddlicesne'].setValue(success.iradobj[0]['permAdd1']+","+success.iradobj[0]['permAdd1']); 
console.log('-------------------license-----------------------');     

       console.log(this.mod_vechileobj.ser_swdname);
       
console.log('------------------------------------------');
      }
else
{
  this.addressboxes=true;
 // alert('no');
  this.mod_vechileobj.sarathiflag='no';
  this.mod_vechileobj.driver_name=this.VechileDriverFG.controls['driver_name'].value;
  this.mod_vechileobj.license_nr=this.VechileDriverFG.controls['license_nr'].value;

}
    },
    error => {
    console.log(error);
    } 
    );

}
    public getvahanservice(postData){

     
      return this.api.post('services/vahan1',postData);


    }

    public getsarathiservice(postData2){

      //return this.http.post(this.apiUrl+'services/sarathi',data);

      return this.api.post('services/sarathi1',postData2);


    }
    async presentPrompt() {
      const alert = await this.alertCtrl.create({
        inputs: [
         
          {
            name: 'username',
            placeholder: 'Others String Description',
          
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log(data.username);
              this.others1=data.username;
            }
          },
        ]
     });
     await alert.present(); 
  }
  async presentPrompt2() {
    const alert = await this.alertCtrl.create({
      inputs: [
       
        {
          name: 'username2',
          placeholder: 'Others String Description',
        
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: second => {

          //  console.log(second.username2);
            this.others2=second.username2;
            
          }
        },
      ]
   });
   await alert.present(); 
}
async presentPrompt3() {
  const alert = await this.alertCtrl.create({
    inputs: [
     
      {
        name: 'username2',
        placeholder: 'Others String Description',
      
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: second => {

        //  console.log(second.username2);
          this.others3=second.username2;
          
        }
      },
    ]
 });
 await alert.present(); 
}
public CalculateAge(): void {
  this.birthdate = "10/10/1981";
if (this.birthdate) {
var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
console.log(this.age)
  }
}

async selectImage() {



  const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    buttons: [{
      text: 'Use Camera',
      handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA);
      }
    },{
        text: 'Gallery',
        handler: () => {
          this.openGallery();
          //this.browsePhotos(this.camera.PictureSourceType.SAVEDPHOTOALBUM, flag, imgNo);
        }
      },
    {
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}
takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
    quality: this.imgqty,
    //targetWidth: 1280,
    //targetHeight: 1280,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
  // var mainPhotolen=this.restingPlacePhotos.length;
  this.camera.getPicture(options).then(imagePath => {
    // if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //   this.filePath.resolveNativePath(imagePath)
    //     .then(filePath => {            
    //       console.log('1')
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //       this.imageResizer.resize({
    //         uri: correctPath,
    //         quality: 60,
    //         width: 1280,
    //         height: 1280
    //       }).then((filePath: string)=>console.log('FileSize', filePath))
    //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo);

    //     });
    // } 
    //this.resizeImage(imagePath,flag,imgNo);
    this.img = imagePath;
    console.log('IIIMG', this.img);
    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo, this.img);

    this.getBase64StringByFilePath(imagePath)
    .then((res) => {
      //alert('res 64 ' + res); //this.audio=res;
      console.log('getBase64StringByFilePath res',res);
      var base64Only = res.slice(34);
      this.driver_image = "data:image/jpg;base64," + base64Only;

    });

  });
}



openGallery() {

  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;

   let imgsize= this.checkImageSize(base64Image);
   console.log(imgsize);

   if(imgsize > 2048) { alert('Image size should be less than 2 MB '); return false; }


      this.driver_image = base64Image;
   
  }, (err) => {
    // Handle error
  });
}
checkImageSize(base64String) {
  let padding;
  let inBytes;
  let base64StringLength;
  if (base64String.endsWith('==')) { padding = 2; }
  else if (base64String.endsWith('=')) { padding = 1; }
  else { padding = 0; }

  base64StringLength = base64String.length;
  console.log(base64StringLength);
  inBytes = (base64StringLength / 4) * 3 - padding;
  console.log(inBytes);
  let kbytes = inBytes / 1000;
  console.log('kbytes', kbytes);


  return kbytes;
}

async previewimg() {


  const alert = await this.alertCtrl.create({
    header: 'iRAD',
    //    subHeader: 'Passenger',

    message: `<img src="${this.driver_image}" alt="img" class='imginalert' style='width: 100%; height: 100%;border: 2px solid #848383;border-radius: 5px;' >`,
    buttons: [
      {
        text: 'RETAKE',
        handler: () => {
          this.selectImage()
        }
        // role: 'cancel',
      },
      {
        text: 'CONFIRM',

      },
    ],
  });

  await alert.present();

}

}
