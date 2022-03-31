import { Component, OnInit } from '@angular/core';
import { arrayobject } from '../../../../services/arrayobject';
import { FormBuilder, FormGroup, Validators, Validator, AbstractControl } from '@angular/forms';
import { mod_pedestrian } from '../../../../models/model.pedestrain';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../../../translate-config.service';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { AlertController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pedestrian',
  templateUrl: './pedestrian.page.html',
  styleUrls: ['./pedestrian.page.scss'],
})
export class PedestrianPage implements OnInit {

  age: number;
  passport = false; 
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

  postdata2 = { 'mode': '', 'language': '' };

  isSubmitted = false;
  isLoading = false;
  vechile_count: number = 0;
  updated_count: number = 0;
  remaing_count: number = 0;
  accidentData = new Array();
  ln: any;
  postdata = { 'mode': '', 'accid': '' };

  dataset = { 'mode': '', 'accid': '', 'vechile': '' };
  audio: any; audio4play:any;
  dataseverity: any = null;
  passpedRegForm: FormGroup;
  validaccid: boolean = true;
  selacc: any; accid: any;
  selectedLanguage: string;
  params: any;

  audiotype:any;
  public local_passped: mod_pedestrian;

  selped={
    'vechile_id':'',
    'mod_passpedname':'',
    'radiogender':'',
    'pass_severity':'',
    'modeoftransport':'',
    'hospitaldelay':'',
    'education':'',
    'dinjurytype':'',
    'pedpostion':'',
    'pedaction':'',
    'mod_age':'',
    'mod_mobile':'',
    'mod_occupation':'',
    'nationality':'',
    'passport_nr':'',
    'mod_residence':'',
    
  }

  constructor(private alertCtrl: AlertController, private translateConfigService: TranslateConfigService,
    private mediaCapture: MediaCapture, private base64: Base64,
    private router: Router, public arobj: arrayobject, private fb: FormBuilder, private api: ApiService,
    private sanitizer: DomSanitizer
    ) {
    this.dataseverity = this.arobj.diplayseverity();

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.build_passped_form();
    this.selacc = JSON.parse(localStorage.getItem('selacc')); console.log(this.selacc);
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem('ln');

    if (this.accid != null) {
      this.validaccid = false;
    }
    this.checkpassenger();
    this.checkvechilecount();


  }

  ionViewWillLeave(){
    this.saveLocal();
  }


  ionViewDidEnter() {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    //  this.ln=localStorage.getItem('ln');

    console.log("Check",localStorage.getItem(this.accid+'pedestrian'));
    this.selped=JSON.parse(localStorage.getItem(this.accid+'pedestrian'));
    console.log("Selected Pedestrian Value is",this.selped);

    if(this.selped!=null){
      //this.VechileDriverFG.controls['vacategory'].setValue(this.selveh.vacategory);
      this.passpedRegForm.controls['vechile_id'].setValue(this.selped.vechile_id);
      this.passpedRegForm.controls['mod_passpedname'].setValue(this.selped.mod_passpedname);
      this.passpedRegForm.controls['radiogender'].setValue(this.selped.radiogender);
      this.passpedRegForm.controls['pass_severity'].setValue(this.selped.pass_severity);
      this.passpedRegForm.controls['modeoftransport'].setValue(this.selped.modeoftransport);
      this.passpedRegForm.controls['hospitaldelay'].setValue(this.selped.hospitaldelay);
      this.passpedRegForm.controls['education'].setValue(this.selped.education);
      this.passpedRegForm.controls['dinjurytype'].setValue(this.selped.dinjurytype);
      this.passpedRegForm.controls['pedpostion'].setValue(this.selped.pedpostion);
      this.passpedRegForm.controls['pedaction'].setValue(this.selped.pedaction);
      this.passpedRegForm.controls['mod_age'].setValue(this.selped.mod_age);
      this.passpedRegForm.controls['mod_mobile'].setValue(this.selped.mod_mobile);
      this.passpedRegForm.controls['mod_occupation'].setValue(this.selped.mod_occupation);
      this.passpedRegForm.controls['nationality'].setValue(this.selped.nationality);
      this.passpedRegForm.controls['passport_nr'].setValue(this.selped.passport_nr);
      this.passpedRegForm.controls['mod_residence'].setValue(this.selped.mod_residence);
      
     }
  }

  public saveLocal(){
    // console.log("Saving Local",event.target.value);
     this.selped={
      'vechile_id':this.passpedRegForm.controls['vechile_id'].value,
      'mod_passpedname':this.passpedRegForm.controls['mod_passpedname'].value,
      'radiogender':this.passpedRegForm.controls['radiogender'].value,
      'pass_severity':this.passpedRegForm.controls['pass_severity'].value,
      'modeoftransport':this.passpedRegForm.controls['modeoftransport'].value,
      'hospitaldelay':this.passpedRegForm.controls['hospitaldelay'].value,
      'education':this.passpedRegForm.controls['education'].value,
      'dinjurytype':this.passpedRegForm.controls['dinjurytype'].value,
      'pedpostion':this.passpedRegForm.controls['pedpostion'].value,
      'pedaction':this.passpedRegForm.controls['pedaction'].value,
      'mod_age':this.passpedRegForm.controls['mod_age'].value,
      'mod_mobile':this.passpedRegForm.controls['mod_mobile'].value,
      'mod_occupation':this.passpedRegForm.controls['mod_occupation'].value,
      'nationality':this.passpedRegForm.controls['nationality'].value,
      'passport_nr':this.passpedRegForm.controls['passport_nr'].value,
      'mod_residence':this.passpedRegForm.controls['mod_residence'].value,
      
    }
  
     
     console.log("Selected Vehicle",this.selped);
     localStorage.setItem(this.accid+'pedestrian', JSON.stringify(this.selped));
 
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

  checkvechilecount() {
    this.postdata.mode = 'vechilelist';
    this.postdata.accid = this.accid;
    this.findremaining(this.postdata).subscribe(
      (success: any) => {
        var tmp = success.updated;
        for (var i = 0; i < tmp.length; i++) {

          this.accidentData.push(Array(i, tmp[i][0], tmp[i][1]));
          this.vehiclecombo = false;
        }
      },
      error => {
        console.log(error);
      });
  }
  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

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
  checkpassenger() {

    this.dataset.mode = 'pedestrian';
    this.dataset.accid = this.accid;

    this.getpassengercount(this.dataset).subscribe(
      (success: any) => {


        this.vechile_count = success.overall;
        this.updated_count = success.updated;
        this.remaing_count = success.overall - success.updated;

        // console.log('this.remaing_count', this.remaing_count);

        if (+this.remaing_count > 0) {
          this.validaccid = false;
        } else {
          this.validaccid = true;
        }
        // console.log('this.validaccid', this.validaccid);
      },
      error => {


      }
    );
  }
  public getvalue(event: any) {

    if (event.target.value == "4") {
      this.passpedRegForm.controls['modeoftransport'].setValue('0');
      this.passpedRegForm.controls['hospitaldelay'].setValue('0');
      this.passpedRegForm.controls['modeoftransport'].disable();
      this.passpedRegForm.controls['hospitaldelay'].disable();

    }
    else {
      this.passpedRegForm.controls['modeoftransport'].enable();
      this.passpedRegForm.controls['hospitaldelay'].enable();

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


  public getpassengercount(postdata: any) {

    return this.api.post('pending', postdata);
  }
  ngOnInit() {
    this.loadselection();

  }

  public loadselection() {

    this.postdata2.mode = 'pedestriandata';
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
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      //   subHeader: 'Pedestrian',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
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


  public build_passped_form() {

    //dnatureofinjury

    this.passpedRegForm = this.fb.group({
      vechile_id: ['', [Validators.required]],
      pass_severity: ['', [Validators.required]],
      modeoftransport: [''],
      hospitaldelay: [''],
      dinjurytype: [''],
      education: [''],
      mod_passpedname: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(40)]],
      mod_age: [''],
      radiogender: ['', [Validators.required]],
      mod_mobile: ['', [Validators.pattern('[5-9]\\d{9}')]],
      pedpostion: [''],
      pedaction: [''],
      mod_residence: ['', [Validators.minLength(3), Validators.maxLength(200)]],
      mod_occupation: [''],
      nationality: [''],
      passport_nr: ['', [Validators.minLength(3), Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9 ]+$')]],


    })

    //this.passpedRegForm.controls['nationality'].setValue('0');

  }

  get errorControl() {

    return this.passpedRegForm.controls;
  }

  public addpedestrain() {
    this.isSubmitted = true;
    if (!this.passpedRegForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {

      this.isLoading = true;
      this.local_passped = new mod_pedestrian();
      this.local_passped.accid = this.accid;
      this.local_passped.mvalue_service_name = this.passpedRegForm.controls['mod_passpedname'].value;
      this.local_passped.mvalue_age = this.passpedRegForm.controls['mod_age'].value;
      this.local_passped.mvalue_gender = this.passpedRegForm.controls['radiogender'].value;
      this.local_passped.mvalue_residence = this.passpedRegForm.controls['mod_residence'].value;
      this.local_passped.mvalue_occupation = this.passpedRegForm.controls['mod_occupation'].value;
      this.local_passped.mvalue_severity = this.passpedRegForm.controls['pass_severity'].value;
      this.local_passped.mvalue_mobile = this.passpedRegForm.controls['mod_mobile'].value;
      this.local_passped.dinjurytype = this.passpedRegForm.controls['dinjurytype'].value;
      this.local_passped.education = this.passpedRegForm.controls['education'].value;
      this.local_passped.vehicleid = this.passpedRegForm.controls['vechile_id'].value;

      this.local_passped.pedpostion = this.passpedRegForm.controls['pedpostion'].value;
      this.local_passped.pedaction = this.passpedRegForm.controls['pedaction'].value;
      this.local_passped.modeoftrasnport = this.passpedRegForm.controls['modeoftransport'].value;
      this.local_passped.hospitaldelay = this.passpedRegForm.controls['hospitaldelay'].value;
      this.local_passped.nationality = this.passpedRegForm.controls['nationality'].value;
      this.local_passped.passportnr = this.passpedRegForm.controls['passport_nr'].value;
      this.local_passped.language = this.ln;

      
      this.local_passped.audio=this.audio4play;
      this.local_passped.audiotype=this.audiotype;

      this.pedestrian(this.local_passped).subscribe(
        (success: any) => {

          // alert(success.error);
          this.presentAlert(success.error);
          this.isLoading = false;
          this.passpedRegForm.reset(this.passpedRegForm.value);
          localStorage.removeItem(this.accid+'pedestrian');
          this.passpedRegForm.reset();
          /*
                 this.passpedRegForm.controls['vechile_id'].setValue(-1);
                 this.passpedRegForm.controls['mod_passpedname'].setValue('');
                 this.passpedRegForm.controls['mod_age'].setValue('');
                 this.passpedRegForm.controls['radiogender'].setValue(-1);
                 this.passpedRegForm.controls['mod_residence'].setValue('');
                 this.passpedRegForm.controls['mod_occupation'].setValue(-1);
                 this.passpedRegForm.controls['mod_mobile'].setValue('');
                 this.passpedRegForm.controls['pass_severity'].setValue(-1); 
                 this.passpedRegForm.controls['dnatureofinjury'].setValue(-1);
                 this.passpedRegForm.controls['dinjurytype'].setValue(-1);
                 
          */
          
          this.router.navigate(['/acctabs/tab1']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  public changenationality(event: any) {
    if (event.target.value == "1") {
      this.passport = true;

    }
    else {
      this.passport = false;
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
      this.passpedRegForm.controls['mod_mobile'].setValue(value);
    }

  }


  public pedestrian(postData: any) {

    return this.api.post('pedestrian', postData);
  }

}
