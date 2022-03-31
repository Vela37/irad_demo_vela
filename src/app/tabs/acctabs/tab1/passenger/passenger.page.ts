import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { arrayobject } from '../../../../services/arrayobject';
import { mod_passped } from '../../../../models/model.passenger';
import { Router } from '@angular/router';

import { TranslateConfigService } from '../../../../translate-config.service';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { AlertController } from '@ionic/angular';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.page.html',
  styleUrls: ['./passenger.page.scss'],
})
export class PassengerPage implements OnInit {

  passport = false;
  age: number;
  vehiclecombo = true;
  datacombo = true;
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  options5: any;
  options6: any;
  options7: any;
  options8: any;
  lengthflag = false;
  isSubmitted = false;
  selectedLanguage: string;
  params: any;
  isLoading = false;
  dataseverity: any = null;
  public local_passped: mod_passped;

  passengerform: FormGroup;
  accidentData = new Array();
  vechile_count: number = 0;
  updated_count: number = 0;
  remaing_count: number = 0;
  validaccid: boolean = true;
  selacc: any; accid: any;
  audio: any;
  ln: any;


  postdata = { 'mode': '', 'accid': '' };
  dataset = { 'mode': '', 'accid': '', 'vechile': '' };
  postdata2 = { 'mode': '', 'language': '' };

  audio4play:any;audiotype:any;

  selpass={
    'vechile_id':'',
    'mod_passpedname':'',
    'radiogender':'',
    'mod_occupation':'',
    'pass_severity':'',
    'dinjurytype':'',
    'modeoftransport':'',
    'hospitaldelay':'',
    'education':'',
    'passposition':'',
    'safetydevice':'',
    'passaction':'',
    'mod_age':'',
    'mod_mobile':'', 
    'nationality':'',
    'passport_nr':'',
    'mod_residence':'',
  }

  constructor(private alertCtrl: AlertController, private translateConfigService: TranslateConfigService,
    private mediaCapture: MediaCapture,private sanitizer: DomSanitizer,private base64: Base64,
    private router: Router, private fb: FormBuilder, public arobj: arrayobject, private api: ApiService) {
    this.dataseverity = this.arobj.diplayseverity();

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.build_passped_form();
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem('ln');
    //alert(this.accid);
    if (this.accid != null) {

      this.validaccid = false;
    }
    this.checkvechilecount();
    this.checkpassenger();


  }

  ngOnInit() {
    this.loadselection();


  }

  ionViewWillLeave(){
    this.saveLocal();
  }


  ionViewDidEnter() {

    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    //  this.ln=localStorage.getItem('ln');

    console.log("Check",localStorage.getItem(this.accid+'passenger'));
    this.selpass=JSON.parse(localStorage.getItem(this.accid+'passenger'));
    console.log("Selected Passenger Value is",this.selpass);

    if(this.selpass!=null){
      //this.VechileDriverFG.controls['vacategory'].setValue(this.selveh.vacategory);
      this.passengerform.controls['vechile_id'].setValue(this.selpass.vechile_id);
      this.passengerform.controls['mod_passpedname'].setValue(this.selpass.mod_passpedname);
      this.passengerform.controls['radiogender'].setValue(this.selpass.radiogender);
      this.passengerform.controls['mod_occupation'].setValue(this.selpass.mod_occupation);
      this.passengerform.controls['pass_severity'].setValue(this.selpass.pass_severity);
      this.passengerform.controls['dinjurytype'].setValue(this.selpass.dinjurytype);
      this.passengerform.controls['modeoftransport'].setValue(this.selpass.modeoftransport);
      this.passengerform.controls['hospitaldelay'].setValue(this.selpass.hospitaldelay);
      this.passengerform.controls['education'].setValue(this.selpass.education);
      this.passengerform.controls['passposition'].setValue(this.selpass.passposition);
      this.passengerform.controls['safetydevice'].setValue(this.selpass.safetydevice);
      this.passengerform.controls['passaction'].setValue(this.selpass.passaction);
      this.passengerform.controls['mod_age'].setValue(this.selpass.mod_age);
      this.passengerform.controls['mod_mobile'].setValue(this.selpass.mod_mobile);
      this.passengerform.controls['nationality'].setValue(this.selpass.nationality);
      this.passengerform.controls['passport_nr'].setValue(this.selpass.passport_nr);
      this.passengerform.controls['mod_residence'].setValue(this.selpass.mod_residence);
      
     }
  }


  public saveLocal(){
    // console.log("Saving Local",event.target.value);
     this.selpass={
    'vechile_id':this.passengerform.controls['vechile_id'].value,
    'mod_passpedname':this.passengerform.controls['mod_passpedname'].value,
    'radiogender':this.passengerform.controls['radiogender'].value,
    'mod_occupation':this.passengerform.controls['mod_occupation'].value,
    'pass_severity':this.passengerform.controls['pass_severity'].value,
    'dinjurytype':this.passengerform.controls['dinjurytype'].value,
    'modeoftransport':this.passengerform.controls['modeoftransport'].value,
    'hospitaldelay':this.passengerform.controls['hospitaldelay'].value,
    'education':this.passengerform.controls['education'].value,
    'passposition':this.passengerform.controls['passposition'].value,
    'safetydevice':this.passengerform.controls['safetydevice'].value,
    'passaction':this.passengerform.controls['passaction'].value,
    'mod_age':this.passengerform.controls['mod_age'].value,
    'mod_mobile':this.passengerform.controls['mod_mobile'].value, 
    'nationality':this.passengerform.controls['nationality'].value,
    'passport_nr':this.passengerform.controls['passport_nr'].value,
    'mod_residence':this.passengerform.controls['mod_residence'].value,
    }
  
     
     console.log("Selected Vehicle",this.selpass);
     localStorage.setItem(this.accid+'passenger', JSON.stringify(this.selpass));
 
   }

  //  myFunction(event) {
  //   event.preventDefault();
  //   this.puntoscanje = Number(`${this.puntoscanje}${event.key}`)
  //   if (isNaN(this.puntoscanje)) {
  //     this.puntoscanje = 0;
  //   }
  //   if( this.puntoscanje >= this.points){
  //     this.puntoscanje = this.points;
  //   }
  //   var PuntosDescto = 10 ;
  //   var calculo = ( this.puntoscanje / PuntosDescto).toFixed(2);
  //   this.descuento = calculo;
  // }

  checkage($event: KeyboardEvent) {
   // event.preventDefault();
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
  checkdigits($event: KeyboardEvent,cnt) {
    let value = (<HTMLInputElement>event.target).value;
   // console.log(value);

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
  
  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
        (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    //  this.passengerform.controls['mod_mobile'].setValue(value);
    }

  }

  public loadnatureofinjury() {
    this.postdata2.mode = 'natureofinjury';
    this.postdata2.language = this.ln;
    this.natureofinjury(this.postdata2).subscribe(
      (success: any) => {
        this.options4 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public natureofinjury(postdata2: any) {

    return this.api.post('datas', postdata2);

  }


  public loadpassengerposition() {
    this.postdata2.mode = 'passengerposition';
    this.postdata2.language = this.ln;
    this.passengerposition(this.postdata2).subscribe(
      (success: any) => {
        this.options5 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public passengerposition(postdata2: any) {

    return this.api.post('datas', postdata2);

  }
  public loadpassengeraction() {
    this.postdata2.mode = 'passengeraction';
    this.postdata2.language = this.ln;
    this.passengeraction(this.postdata2).subscribe(
      (success: any) => {
        this.options7 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public passengeraction(postdata2: any) {

    return this.api.post('datas', postdata2);

  }
  public loadoccupation() {
    this.postdata2.mode = 'occupation';
    this.postdata2.language = this.ln;
    this.occupation(this.postdata2).subscribe(
      (success: any) => {
        this.options6 = success.data;
      },
      error => {
        console.log(error);
      }
    ); 
  }
  public occupation(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  public loadseverity() {
    this.postdata2.mode = 'severity';
    this.postdata2.language = this.ln;
    this.severity(this.postdata2).subscribe(
      (success: any) => {
        this.options1 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public severity(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  takeAudio() {
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => { console.log(data); this.audio = data; 
          console.log("Audio name",this.audio[0].name);
          var afterDot = this.audio[0].name.substr(this.audio[0].name.indexOf('.'));
          this.audiotype = afterDot.split('.').pop();
          console.log("after dot value",this.audiotype);
          console.log("after dot value",this.audio[0].fullPath);
          this.getBase64StringByFilePath(this.audio[0].fullPath)
          .then((res) => { //alert('res 64 '+res); //this.audio=res;
            console.log("Value audio",res);
              var base64Only = res.slice(34);
              
              this.audio="data:audio/mp3;base64,"+base64Only;
              this.audio4play = this.sanitizer.bypassSecurityTrustResourceUrl(this.audio);
              console.log(' this.audio', this.audio);
              //do something with base64 string
          });
          },
        (err: CaptureError) => console.error(err)
      );
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

  checkvechilecount() {
    this.postdata.mode = 'vechilelist';
    this.postdata.accid = this.accid;
    this.findremaining(this.postdata).subscribe(
      (success: any) => {
        var tmp = success.updated;
        for (var i = 0; i < tmp.length; i++) {
          // console.log(tmp[i]);
          this.accidentData.push(Array(i, tmp[i][0], tmp[i][1]));
          this.vehiclecombo = false;
        }
      },
      error => {
        console.log(error);
      });
  }

  checkpassenger() {
    // alert("calling");
    this.dataset.mode = 'passenger';
    this.dataset.accid = this.accid;
    //console.log(this.dataset);
    //return false;

    this.getpassengercount(this.dataset).subscribe(
      (success: any) => {
        //alert(this.dataset);
        //  alert(success.updated);

        // alert(success.sql2);

        this.vechile_count = success.overall;
        this.updated_count = success.updated;
        this.remaing_count = success.overall - success.updated;

        //  alert(this.vechile_count);
        //  alert(this.updated_count); 

        if (this.vechile_count <= success.updated) {
          this.validaccid = true;
        } else {
          this.validaccid = false;
        }
      },
      error => {

        //  console.log(error);

      }
    );
  }


  public getpassengercount(postdata: any) {

    return this.api.post('pending', postdata);
  }

  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

  }
  onSearchChange(searchValue: string): void {

    if (searchValue.length != 10) {
      this.lengthflag = true;
    }
    else {
      this.lengthflag = false;
    }

  }
  public build_passped_form() {



    this.passengerform = this.fb.group({
      vechile_id: ['', [Validators.required]],
      pass_severity: ['', [Validators.required]],
      dinjurytype: [''],
      education: [''],
      passposition: [''],
      passaction: [''],
      safetydevice: ['', [Validators.required]],
      mod_passpedname: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50)]],
      mod_age: [''],
      modeoftransport: [''],
      hospitaldelay: [''],
      radiogender: ['', [Validators.required]],
      mod_mobile: ['', [Validators.pattern('[5-9]\\d{9}')]],
      mod_residence: ['', [Validators.minLength(3), Validators.maxLength(200)]],
      //  mod_residence:['',[Validators.minLength(3),Validators.maxLength(200),Validators.pattern('')]],
      mod_occupation: [''],
      nationality: ['Indian'],
      passport_nr: ['', [Validators.minLength(3), Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]+$')]],

    })

    //this.passengerform.controls['nationality'].setValue('0');

  }

  get errorControl() {

    return this.passengerform.controls;
  }

  public changenationality(event: any) {
    if (event.target.value == "1") {
      this.passport = true;

    }
    else {
      this.passport = false;
    }
  }

  change_education(event:any)
  {
     let value = (<HTMLInputElement>event.target).value;
   if(event.target.value=="1")
   {
      console.log('change_education',true);
      console.log('options12',this.options6);

      this.options6[0]['disabled']=true;
    this.options6[3]['disabled']=true;
    this.options6[5]['disabled']=true;
    this.options6[12]['disabled']=true;

   } 
   else if  (event.target.value=="2")
   {
    console.log('change_education',true);
    console.log('options12',this.options6);

    this.options6[0]['disabled']=true;
  this.options6[3]['disabled']=true;
  this.options6[5]['disabled']=true;
  this.options6[10]['disabled']=true;
  this.options6[12]['disabled']=true;
   }
   else if (event.target.value=="3")
   {
    console.log('change_education',true);
    console.log('options12',this.options6);

    this.options6[0]['disabled']=true;
  this.options6[3]['disabled']=true;
  this.options6[5]['disabled']=true;
  this.options6[10]['disabled']=true;
  this.options6[12]['disabled']=true;
   }
   else if (event.target.value=="7")
   {
     this.options6[0]['disabled']=true;
   this.options6[3]['disabled']=true;
   this.options6[5]['disabled']=true;
   this.options6[10]['disabled']=true;
   this.options6[12]['disabled']=true;
   }
   else
   {
    console.log('change_education',false);
    this.options6[0]['disabled']=false;
      this.options6[3]['disabled']=false;
      this.options6[5]['disabled']=false;
      this.options6[10]['disabled']=false;
      this.options6[12]['disabled']=false;
    }
  }

  public getvalue(event: any)
   {
    if (event.target.value == "4") 
    {
      this.passengerform.controls['modeoftransport'].setValue('0');
      this.passengerform.controls['hospitaldelay'].setValue('0');
      this.passengerform.controls['modeoftransport'].disable();
      this.passengerform.controls['hospitaldelay'].disable();
    }
    else 
    {
      this.passengerform.controls['modeoftransport'].enable();
      this.passengerform.controls['hospitaldelay'].enable();
    }

  }

  public loadinjurytype() {
    this.postdata2.mode = 'injurytype';
    this.postdata2.language = this.ln;
    this.injurytype(this.postdata2).subscribe(
      (success: any) => {
        this.options2 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public injurytype(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

 
  public addpassenger() {
    // alert("hi inside");
    console.log(this.passengerform); //return false;
    //
    this.isSubmitted = true;
    if (!this.passengerform.valid) {
      // alert("validation failed");
      console.log('Please provide all the required values!')
      return false;
    } else {

      this.isLoading = true;

      this.local_passped = new mod_passped();
      this.local_passped.accid = this.accid;
      this.local_passped.vechileid = this.passengerform.controls['vechile_id'].value;
      this.local_passped.mvalue_service_name = this.passengerform.controls['mod_passpedname'].value;
      this.local_passped.mvalue_age = this.passengerform.controls['mod_age'].value;
      this.local_passped.mvalue_gender = this.passengerform.controls['radiogender'].value;
      this.local_passped.mvalue_residence = this.passengerform.controls['mod_residence'].value;
      this.local_passped.mvalue_occupation = this.passengerform.controls['mod_occupation'].value;
      this.local_passped.mvalue_mobile = this.passengerform.controls['mod_mobile'].value;
      this.local_passped.mvalue_severity = this.passengerform.controls['pass_severity'].value;
      this.local_passped.mvalue_safety = this.passengerform.controls['safetydevice'].value;
      this.local_passped.pass_action = this.passengerform.controls['passaction'].value;
      this.local_passped.pass_position = this.passengerform.controls['passposition'].value;
      this.local_passped.education = this.passengerform.controls['education'].value;
      this.local_passped.pass_injurytype = this.passengerform.controls['dinjurytype'].value;

      this.local_passped.modeoftrasnport = this.passengerform.controls['modeoftransport'].value;
      this.local_passped.hospitaldelay = this.passengerform.controls['hospitaldelay'].value;
      this.local_passped.nationality = this.passengerform.controls['nationality'].value;
      this.local_passped.passportnr = this.passengerform.controls['passport_nr'].value;
      this.local_passped.language = this.ln;
      
      this.local_passped.audio=this.audio4play;
      this.local_passped.audiotype=this.audiotype;

      this.addpaasenger(this.local_passped).subscribe(
        (success: any) => {

          //    alert(success.error);
          this.presentAlert(success.error);
          this.isLoading = false;
          this.passengerform.reset(this.passengerform.value);

          localStorage.removeItem(this.accid+'passenger');
          this.passengerform.reset();
          /*
          this.passengerform.controls['vechile_id'].setValue(-1);
          this.passengerform.controls['mod_passpedname'].setValue('');
          this.passengerform.controls['mod_age'].setValue('');
          this.passengerform.controls['radiogender'].setValue(-1);
          this.passengerform.controls['mod_residence'].setValue('');
          this.passengerform.controls['mod_occupation'].setValue(-1);
          this.passengerform.controls['mod_mobile'].setValue('');
          this.passengerform.controls['pass_severity'].setValue(-1);
          this.passengerform.controls['safetydevice'].setValue(-1);
          this.passengerform.controls['passaction'].setValue('');
          this.passengerform.controls['passposition'].setValue(-1);
          this.passengerform.controls['dnatureofinjury'].setValue(-1);
          this.passengerform.controls['dinjurytype'].setValue(-1);
          */
          this.router.navigate(['/acctabs/tab1']);
          //  this.router.navigate(['/acctabs/tab1']);

        },
        error => {
          console.log(error);
        }
      );
    }
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
  public loadselection() {

    this.postdata2.mode = 'passengerdata';
    this.postdata2.language = this.ln;
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        this.datacombo = false;
        this.options1 = success.severity;
        this.options2 = success.injurytype;
        this.options6 = success.ocuupation;
        this.options4 = success.education;
        this.options3 = success.modeoftranport;
        this.options7 = success.action;
        this.options5 = success.postion;
        this.options8 = success.hospitalzation;


      },
      error => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {

    return this.api.post('datas', postdata2);

  }
  public addpaasenger(postData: any) {

    return this.api.post('passenger', postData);

  }
}
