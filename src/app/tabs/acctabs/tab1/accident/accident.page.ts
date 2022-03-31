import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
import { arrayobject} from '../../../../services/arrayobject';
import { mod_accident } from '../../../../models/model_accident'; 
import { model_spotimage } from '../../../../models/model_spotimage'; 

import { DataService } from '../../../../services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { TranslateConfigService } from '../../../../translate-config.service'; 

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-accident',
  templateUrl: './accident.page.html',
  styleUrls: ['./accident.page.scss'],
})
export class AccidentPage implements OnInit {

  ln:any;
  datacombo=true;
  others1:any;
  others2:any;
  others3:any;
  others4:any;
  
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  options6:any;
  options7:any;
  options8:any;

  selectedLanguage:string;
  params:any;
  accid:any;
  isSubmitted = false;
  isLoading = false;
  validflag:boolean=false;
  dataseverity:any=null;
  datacrashtypey:any=null;
  datacollisiontype:any=null;
  dataobservation:any=null;
  datalandmark:any=null;
  datatransferhospital:any=null;
  dataObject:any;
  public local_acc_model:mod_accident;
  public local_image:model_spotimage;
  loginform:FormGroup; selacc:any;
  dataset={'mode':'','accid':'','vechile':''};
  validaccid:boolean=false;
  postdata3={'mode':'','language':''};


  constructor(private alertCtrl: AlertController,public fb:FormBuilder,private translateConfigService: TranslateConfigService,  private camera: Camera, 
    private router: Router,private api:ApiService,public arobj: arrayobject,private dataService: DataService,private sanitizer: DomSanitizer) {
    
      this.selacc=JSON.parse(localStorage.getItem('selacc'));
      this.accid =this.selacc.accid;
      this.ln=localStorage.getItem('ln');
    this.dataObject=this.dataService.getOption();  

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    //alert(this.dataObject.datetime);
if(this.dataObject.datetime=='empty')
{

   this.validflag=true;
}
this.checkroadinformation();

    //console.log(this.dataObject.poi);
    /*
    this.loginform=this.fb.group({
      'poi':[''],
      'ltype':['',[Validators.required]],
      'lname':['',[Validators.required]],
      'distance':['',[Validators.required]],
      'direction':['',[Validators.required]],
      'mod_severity':['',[Validators.required]],
      'colliontype':['',[Validators.required]],
      'intials':['',[Validators.required]],
      'modeoftransfer':['',[Validators.required]],
      'vehiclecnt':['',[Validators.required,Validators.maxLength(2),Validators.pattern('^[0-9]*$')]],
      'passengercnt':['',[Validators.required,Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
      'pedestriancnt':['',[Validators.required,Validators.maxLength(3),Validators.pattern('^[0-9]*$')]]
    });

    */
    this.loginform = this.fb.group({
   
      colliontype: ['',[Validators.required]],
      collionnature: ['',[Validators.required]],
      intials: ['',[Validators.required]],
      localbody: ['',[Validators.required]],
      roadweather: ['',[Validators.required]],
      roadlight: ['',[Validators.required]],
      ctl_accspot: ['',[Validators.required]],
      ctl_visibility: ['',[Validators.required]],
      ctl_roadname: ['',[Validators.required]],
      ctl_roadtype: ['',[Validators.required]]
     
    })

   }
   photo: SafeResourceUrl;

   ionViewDidEnter() {
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
    this.ln=localStorage.getItem('ln');
  }

   public checkroadinformation()
   {
   
     this.dataset.mode='general';
     this.dataset.accid=this.accid;
 
     this.getroad(this.dataset).subscribe(
       (success:any) => {
 
            
       
              if(success.updated!=0)
              {
                this.validaccid=true;
              }
           
     
       },
       error => {
 
                      
     } 
       );
 
   }
   public getroad(dataset:any){

    return this.api.post('pending',dataset);

}
   async takePicture() {
    
   

     const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData.da);
     this.photo = 'data:image/jpeg;base64,'+imageData;


     //imageData will hold the full file path so we need to extract filename and path using file plugin 
    /*
     this.base64.encodeFile(imageData).then((base64File: string) => {
        console.log(base64File); this.photo=base64File;
      }, (err) => {
        console.log(err);
      });
*/
     console.log(this.photo);

    }, (err) => {
     // Handle error
     console.log(err);
    });
     
   }
  ngOnInit() {
  //  this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  this.loadselection();
 // this.loadintial();

/*
      this.dataseverity=this.arobj.diplayseverity();
      this.datacrashtypey=this.arobj.diplaycrashtype();
      this.datacollisiontype=this.arobj.diplaycollisiontype();
      this.dataobservation=this.arobj.diplayobservation();
      this.datalandmark=this.arobj.diplaylandmark();
      this.datatransferhospital=this.arobj.diplaytransferhospital();

*/

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

public showpreview(){

 // alert(this.loginform.controls['mod_severity'].value);
}

public loadcollison(){
  this.postdata3.mode='collison';
  this.postdata3.language=this.ln;
  this.collison(this.postdata3).subscribe(
    (success:any) => {
      this.options1=success.data;
  },
    error => {
    console.log(error);
    } 
    );
 }
 public collison(postdata3:any){

  return this.api.post('datas',postdata3);

}
public loadselection(){
  this.postdata3.mode='generaldata';
  this.postdata3.language=this.ln;
  this.intial(this.postdata3).subscribe(
    (success:any) => {
      this.datacombo=false;
      this.options1=success.collison;
      this.options2=success.collnature;
      this.options3=success.intial;
      this.options4=success.localbody;

      this.options5=success.weather;
      this.options6=success.roadlight;
      this.options7=success.accspot;
      this.options8=success.roadclass;

  },
    error => {
    console.log(error);
    } 
    );
 }
 public intial(postdata3:any){

  return this.api.post('datas',postdata3);

}
  public addaccident() 
  {

    this.isSubmitted = true;
      if (!this.loginform.valid) {
        console.log('Please provide all the required values!')
        return false;
      } else {
        this.isLoading = true;
        this.local_acc_model=new mod_accident();

this.local_acc_model.action= this.accid;



this.local_acc_model.mvalue_collision=this.loginform.controls['colliontype'].value;
this.local_acc_model.collisonnature=this.loginform.controls['collionnature'].value;
this.local_acc_model.mvalue_observation=this.loginform.controls['intials'].value;
this.local_acc_model.localbody=this.loginform.controls['localbody'].value;
this.local_acc_model.language=this.ln;;


this.local_acc_model.roadweather=this.loginform.controls['roadweather'].value;
this.local_acc_model.roadlight=this.loginform.controls['roadlight'].value;
this.local_acc_model.ctl_visibility=this.loginform.controls['ctl_visibility'].value;
this.local_acc_model.ctl_accspot=this.loginform.controls['ctl_accspot'].value;

this.local_acc_model.ctl_roadname=this.loginform.controls['ctl_roadname'].value;
this.local_acc_model.ctl_roadtype=this.loginform.controls['ctl_roadtype'].value;

      this.updateaccident(this.local_acc_model).subscribe(
        (success:any) => {
         // alert(success.msg);
          this.presentAlert(success.msg);
          this.isLoading = false;
          this.router.navigate(['/acctabs/tab1']);
   
        },
        error => {
          this.isLoading = false;
        } 
        );


      }
    

        

  }
  get errorControl() {

    return this.loginform.controls;
  }
  public updateaccident(postData: any) {

    return this.api.post('generaldetails',postData);
}
public imageupload(){
//alert("imageupload");
  this.local_image=new model_spotimage();
  
  this.local_image.mode='spot';
  this.local_image.accid= this.accid;
  this.local_image.spot_image=this.photo;

this.updateimage(this.local_image).subscribe(
  (success:any) => {

                     // alert(success.msg);
                      console.log(success);
                      this.router.navigate(['/acctabs/tab1']);
  },
  error => {

  } 
  );

}
public updateimage(postData: any) {
 // alert("updateimage");
  return this.api.post('media',postData);

}
public getvalue1(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="0")

   { 
      this.presentPrompt1();
   }
    
}
async presentPrompt1() {
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


public getvalue2(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="0")

   { 
      this.presentPrompt2();
   }
    
}
async presentPrompt2(){
  const alert = await this.alertCtrl.create({
    inputs: [
     
      {
        name: 'username',
        placeholder: 'Others',
      
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
          this.others2=data.username;
        }
      },
    ]
 });
 await alert.present(); 
}
public getvalue3(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="0")

   { 
      this.presentPrompt3();
   }
    
}
async presentPrompt3() {
  const alert = await this.alertCtrl.create({
    inputs: [
     
      {
        name: 'username',
        placeholder: 'Others',
      
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
          this.others3=data.username;
        }
      },
    ]
 });
 await alert.present(); 
}
}
