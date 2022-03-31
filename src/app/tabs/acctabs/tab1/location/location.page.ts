import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../models/location.model';
import { LocationService } from '../../../../services/location.service';
import { ApiService } from '../../../../services/api.service';
import { DatePipe, Time } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { TranslateConfigService } from '../../../../translate-config.service';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { arrayobject } from '../../../../services/arrayobject';
import { mod_accident } from '../../../../models/model_accident';
import { Router } from '@angular/router';
import { DatabaseService } from '../../../../services/database.service';
import { AlertController, ModalController } from '@ionic/angular';

import { LocalstorageService } from '../../../../services/localstorage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { MapComponent } from './map/map.component';

import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

export enum ConnectionStatus {
  Online,
  Offline
}
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  providers: [DatePipe]
})
export class LocationPage implements OnInit {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  totaldead: any; countdead: boolean = false; countinj: boolean = false; locdisable: boolean = false;
  fatalflag = true; repdatetime: any; mintime: any; maxtime: any; currentdatetime = new Date();
  offlineflag = false;
  dvdead: any;
  getoffdata: any;
  padead: any;
  pedead: any;
  roaddisp: any;

  officename: string;
  selectedLanguage: string = 'en'; params: any;
  isLoading = false;
  loginform: FormGroup;
  postdat = { 'lat': '', 'lng': '' };
  ln: any;

  options1: any;
  dataseverity: any = null;
  isSubmitted = false;
  public local_acc_model: mod_accident;
  selacc: any;
  message: string;
  loading: boolean;
  mobiledevice: boolean;
  location: Location = new Location();
  data: any;
  poi: any; near_ps_loc: { 'name': '', "distance": '' }; ps_boundary: { 'name': '', "distance": '' };
  datetime: any;
  timeofaccident: any = 'empty'; acctime: any; accdate: any; reptime: any; repdate: any;
  accdatetime: any;
  numberinput: number[] = [];
  numberinput1: number[] = []; accloc: string;
  vehicleInput: any[] = []; numberInputDriver: number[] = [];
  date: Date; mindate: any = new Date("January 01, 2021"); maxdate: any = new Date();
  postdata2 = { 'mode': '', 'language': '' };
  disable_btn = false;
  localSeverity = [{ 'id': '1', 'name': 'Fatal' }, { 'id': '2', 'name': 'Grievous Injury' }, { 'id': '3', 'name': 'Simple Injury Hospitalized' }, { 'id': '4', 'name': 'Simple Injury Non Hospitalized' }, { 'id': '5', 'name': 'No Injury' }];

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  constructor(
    private alertCtrl: AlertController, private modalctrl: ModalController,
    private router: Router,
    public arobj: arrayobject,
    public fb: FormBuilder,
    private locService: LocationService,
    private api: ApiService,
    private datePipe: DatePipe,
    private network: Network,
    private toastController: ToastController,
    private dataService: DataService, private localdb: LocalstorageService,
    private translateConfigService: TranslateConfigService,
    private platform: Platform,
    private geolocation: Geolocation
  ) {

    this.getoffdata = localStorage.getItem('offline');

    if (this.getoffdata == '0' || this.getoffdata == null) {
      this.offlineflag = true;

    }
    else {
      this.offlineflag = false;
    }


    this.ln = localStorage.getItem('ln');
    for (let i = 0; i <= 500; i++) this.numberinput[i] = i;
    for (let j = 1; j <= 24; j++) { this.numberinput1[j] = j; this.vehicleInput[j] = j; }

    this.numberInputDriver[0] = 0;
    this.loading = false;
    this.dataService.setOption('datetime', this.timeofaccident);

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.buildform();
    this.loginform.controls['driver_dead'].setValue(0);
    this.loginform.controls['driver_injured'].setValue(0);
    this.loginform.controls['pass_injured'].setValue(0);
    this.loginform.controls['pass_dead'].setValue(0);
    this.loginform.controls['ped_injured'].setValue(0);
    this.loginform.controls['ped_dead'].setValue(0);
    this.loginform.controls['animal_injured'].setValue(0);
    this.loginform.controls['animal_dead'].setValue(0);


  }

  public getSeverity(e) {
    console.log(e.detail.value);
    if (e.detail.value > 1) {
      this.countdead = true;

      this.loginform.controls['driver_dead'].setValue(0);
      this.loginform.controls['pass_dead'].setValue(0);
      this.loginform.controls['ped_dead'].setValue(0);

    } else {
      this.countdead = false;
    }
    if (e.detail.value == 5) {
      this.countinj = true;

      this.loginform.controls['driver_injured'].setValue(0);
      this.loginform.controls['pass_injured'].setValue(0);
      this.loginform.controls['ped_injured'].setValue(0);

    } else {
      this.countinj = false;
    }


    //console.log(this.countdead);
    //this.countdead=false;
  }

  public vehicleInputChange(e, obj) {
    console.log(e); console.log(obj);
    if (e.detail.value == 'more') {
      console.log('in');
      let l = obj.length; console.log(l);
      for (let j = l; j <= l + 25; j++) {
        this.vehicleInput[j] = j;

      }
      console.log(obj);
      this.loginform.controls['vehiclecnt'].setValue(0);

    } else {

      this.numberInputDriver = []; this.numberInputDriver[0] = 0;
      for (let j = 0; j <= e.detail.value; j++) { this.numberInputDriver[j] = j; }
      this.loginform.controls['driver_injured'].setValue(0);
      this.loginform.controls['driver_dead'].setValue(0);
    }
  }

  public goonline() {
    this.getoffdata = localStorage.getItem('offline');
    this.addoffline(this.getoffdata).subscribe(
      (success: any) => {
        //let ff=null;
        alert("Accident Id Generated");
        this.offlineflag = true;
        localStorage.setItem('offline', '0');

      },
      error => {

      }
    );

  }
  public addoffline(postData: any) {

    return this.api.post('storeoff', postData);
  }
  ngOnInit() {
    //this.options1=this.localdb.getSeverityRows();
    //console.log("DAta Sev", this.options1);
    this.options1 = this.localSeverity;
    this.loadseverity();
    // this.dataseverity=this.arobj.diplayseverity();
    if (!this.checkNetwork()) {
      this.disable_btn = true;
      this.getCurrentGPSCoordinates();
    }

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    //localStorage.setItem('officename',"DHARMALINGAM K (149397)");
    this.officename = localStorage.getItem('officename');


    this.date = this.currentdatetime;

    var d = this.currentdatetime;
    var mm = '' + d.getMinutes();
    if (mm.toString().length == 1) { mm = "0" + mm; }
    this.acctime = d.getHours() + ":" + mm; console.log("ctime " + this.acctime);
    this.reptime = d.getHours() + ":" + mm; console.log("ctime " + this.acctime);

    // this.mindate.setDate( this.date.getDate() - 4 ); console.log(this.mindate);
    // this.mindate= this.datePipe.transform(this.mindate, 'yyyy-MM-dd'); console.log(this.maxdate);
    this.maxdate = this.datePipe.transform(this.maxdate, 'yyyy-MM-dd'); console.log(this.maxdate);
    //this.maxdate='2020-07-07 11:00';
    this.accdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.repdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    // this.mindate='2019-12-01';
    this.locService.currentMessage.subscribe(message => this.message = message);
    // this.locService.currentLocation.subscribe(location => {
    //   this.location = location; //alert(JSON.stringify(this.location));
    //   this.dataService.setOption('loc',  this.location);  
    //   this.dataService.setOption('name',  'veera');  
    //   this.dataService.setOption('accdatetime',  this.accdatetime);  
    //   console.log('accdatetime'+this.accdatetime);
    //   console.log('this.location',this.location)
    //   if(this.location.lat!=0)   this. showLocation();
    // });
    // if(this.location.lat>1)  this. showLocation();
    //  console.log('in on onit',this.location);


  }

  // use geolocation to get user's device coordinates
  getCurrentGPSCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      this.location.lat=this.latitude;
      this.location.lng=this.longitude;
      
      this.accloc = "Lat:" + this.latitude + ',       Long:' + this.longitude;
console.log(this.accloc);

    }).catch((error) => {
      console.log('Error getting location', error);
      alert('Error getting location- '+ error.message);
    });
  }

  public accDateChange(e) {

    //alert("check this");

    console.log(e.detail.value);
    // console.log(this.date.getDate());
    var cd = this.datePipe.transform(this.date, 'yyyy-MM-dd') + ''; console.log(cd);
    var d = e.detail.value;
    //console.log("model"+ this.accdate);
    console.log(cd + "==" + d + "==" + this.accdate);

    this.maxtime = 10;
    this.mintime = 5;

    if (d.trim() == cd.trim()) {
      console.log(1);
      var t = this.currentdatetime;
      var mm = '' + t.getMinutes();
      if (mm.toString().length == 1) { mm = "0" + mm; }
      this.maxtime = t.getHours() + ":" + mm; console.log("ctime " + this.acctime);
      this.mintime = 10;

    } else {
      console.log(0);

    }
  }
  public accTimeChange() {
    console.log(this.acctime);
    var d = this.currentdatetime;// console.log(d);
    var acdt = new Date(this.accdate + " " + this.acctime); //console.log(acdt);
    if (d < acdt) {
      console.log(1);
      this.presentAlert("Accident Date Time must be less than current time");

      var mm = '' + d.getMinutes();
      if (mm.toString().length == 1) { mm = "0" + mm; }
      this.acctime = d.getHours() + ":" + mm; console.log("ctime " + this.acctime);
    } else {
      console.log(0);
    }
  }
  public checkReportingDate() {

    console.log(this.repdate, this.reptime);
    var d = this.currentdatetime;// console.log(d);
    var acdt = new Date(this.accdate + " " + this.acctime); //console.log(acdt);
    var rpdt = new Date(this.repdate + " " + this.reptime); //console.log(acdt);
    if (d < rpdt) {
      console.log(1);
      this.presentAlert("Reporting Date Time must be less than Current Time");
      return false;
    } else {
      if (acdt > rpdt) {
        console.log(1);
        this.presentAlert("Reporting Date Time must be Greater than Accident Time");
        return false;
      }
    }
    return true;
  }

  public loadseverity() {
    this.postdata2.mode = 'severity'; console.log('------------------ data call-----------');
    this.postdata2.language = this.ln;
    this.severity(this.postdata2).subscribe(
      (success: any) => {
        this.options1 = success.data;
        console.log("Severity", this.options1);
        this.currentdatetime = new Date(success.currentdatetime);
        console.log('currentdatetime : ', this.currentdatetime);

        if (success.mindate != undefined) {
          this.mindate = new Date(success.mindate);
        }

        this.date = this.currentdatetime;

        var d = this.currentdatetime;
        var mm = '' + d.getMinutes();
        if (mm.toString().length == 1) { mm = "0" + mm; }
        this.acctime = d.getHours() + ":" + mm; console.log("ctime " + this.acctime);
        this.reptime = d.getHours() + ":" + mm; console.log("ctime " + this.acctime);

        // this.mindate.setDate( this.date.getDate() - 75 ); console.log(this.mindate);
        this.mindate = this.datePipe.transform(this.mindate, 'yyyy-MM-dd'); console.log(this.maxdate);
        this.maxdate = this.datePipe.transform(this.maxdate, 'yyyy-MM-dd'); console.log(this.maxdate);
        //this.maxdate='2020-07-07 11:00';
        this.accdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        this.repdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');


      },
      error => {
        console.log(error);
      }
    );
  }
  public severity(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      subHeader: 'Location',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  public buildform() {
    this.loginform = this.fb.group({
      poi: [''],
      policejur: [''],
      roaddetails: [''],
      lname: ['', [Validators.required]],
      mod_severity: ['', [Validators.required]],
      vehiclecnt: ['', [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+$')]],
      driver_dead: ['', [Validators.required]],
      driver_injured: ['', [Validators.required]],
      pass_injured: ['', [Validators.required]],
      pass_dead: ['', [Validators.required]],
      ped_injured: ['', [Validators.required]],
      ped_dead: ['', [Validators.required]],
      animal_injured: ['', [Validators.required]],
      animal_dead: ['', [Validators.required]],

    })
  }

  updateMyDate($event) {
    console.log($event); // --> wil contains $event.day, $event.month and $event.year
    console.log($event.detail.value);
    if ($event.detail.value != '')
      this.router.navigate(['/acctabs/tab1/map']);
  }

  public addaccident() {




    if (this.maxdate < this.accdate || this.mindate > this.accdate) {
      this.accdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      this.presentAlert('Please Select valid Date Time <br> Last 15 days only allowed');
      return;
    }

      if (this.location.lat == 0) {
        this.presentAlert('Please Select Location');
        return;
  
      }
    
   

    this.accTimeChange();
    var b = this.checkReportingDate(); console.log(b);
    if (!b) return;

    /* this.postdat.lat=localStorage.getItem('lat');
     this.postdat.lat=localStorage.getItem('lon');
     
     if(this.postdat.lat=='' && this.postdat.lat=='')
     {
       
       this.presentAlert('Please Pick Location');
       return false;
     }*/

    console.log('save');
    console.log(this.datetime);
    console.log(this.accdate);
    console.log(this.acctime);

    var dateObj = new Date(this.accdate + ' ' + this.acctime);
    this.datetime = dateObj;
    console.log("dateObj1", dateObj);

    var dateObj = new Date(this.repdate + ' ' + this.reptime);
    this.repdatetime = dateObj;
    console.log("dateObj2", dateObj);

    if (this.datetime >= this.repdatetime) {
      console.log(1);
      this.presentAlert("Reporting Date Time must be Greater than Accident Time");
      return false;
    }

    this.dvdead = this.loginform.controls['driver_dead'].value;
    this.padead = this.loginform.controls['pass_dead'].value;
    this.pedead = this.loginform.controls['ped_dead'].value;



    this.totaldead = this.dvdead + this.padead + this.pedead

    if (this.totaldead > 0) {
      if (this.loginform.controls['mod_severity'].value != 1) {
        this.fatalflag = false;
        this.loginform.controls['mod_severity'].setValue('1');
        return false;

      }


    }

    let noveh = this.loginform.controls['vehiclecnt'].value;
    let dinjded = this.loginform.controls['driver_injured'].value + this.loginform.controls['driver_dead'].value;
    if (noveh < dinjded) {
      this.presentAlert("No of Vehicle(s) and Driver(s) Counts are not Matching");
      return false;
    }
    this.isSubmitted = true;
    if (!this.loginform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {

      //   return false;
      //   this.isLoading = true;


      this.local_acc_model = new mod_accident();
      //alert(this.local_acc_model.pass_dead+this.local_acc_model.ped_dead+this.local_acc_model.driver_dead);
      //return false;
      this.local_acc_model.investigating = 'accident';
      this.local_acc_model.policejurisicode = '000';
      this.local_acc_model.policejurisiname = this.loginform.controls['policejur'].value;
      this.local_acc_model.lat = this.location.lat;
      this.local_acc_model.lon = this.location.lng;
      this.local_acc_model.gps = localStorage.getItem('gps');
      this.local_acc_model.accq = localStorage.getItem('accq');
      this.local_acc_model.poi = this.loginform.controls['poi'].value;
      if (!(this.local_acc_model.poi == null || this.local_acc_model.poi == '')) {
        
        this.local_acc_model.poi = this.local_acc_model.poi == null ? null : (this.local_acc_model.poi).join(", ")
      }
      //this.local_acc_model.poi = this.local_acc_model.poi==null ? null :  (this.local_acc_model.poi).join(", ")
      this.local_acc_model.lname = this.loginform.controls['lname'].value;
      this.local_acc_model.mvalue_date_time = this.datetime;
      this.local_acc_model.report_datetime = this.repdatetime;
      this.local_acc_model.mvalue_vcount = this.loginform.controls['vehiclecnt'].value;
      this.local_acc_model.mvalue_severity = this.loginform.controls['mod_severity'].value;
      this.local_acc_model.roaddetails = this.loginform.controls['roaddetails'].value;

      this.local_acc_model.driver_dead = this.loginform.controls['driver_dead'].value;
      this.local_acc_model.driver_inj = this.loginform.controls['driver_injured'].value;
      this.local_acc_model.pass_inj = this.loginform.controls['pass_injured'].value;
      this.local_acc_model.pass_dead = this.loginform.controls['pass_dead'].value;
      this.local_acc_model.ped_inj = this.loginform.controls['ped_injured'].value;
      this.local_acc_model.ped_dead = this.loginform.controls['ped_dead'].value;

      this.local_acc_model.animal_inj = this.loginform.controls['animal_injured'].value;
      this.local_acc_model.animal_dead = this.loginform.controls['animal_dead'].value;

      this.local_acc_model.language = this.ln;
      if (this.local_acc_model.mvalue_severity == 1) {
        if (this.local_acc_model.pass_dead + this.local_acc_model.ped_dead + this.local_acc_model.driver_dead == 0) {
          this.presentAlert('Fatal Accident require minimum one death count');
          return false;

        }

      }
      //return false;
      this.isLoading = true;
      console.log("Location Page Model", this.local_acc_model);
      //return false; 
      if (this.checkNetwork()) {
        console.log("Uploading data...")
        this.updateaccident(this.local_acc_model).subscribe(
          (success: any) => {

            localStorage.setItem('lat', '');
            localStorage.setItem('lon', '');
            localStorage.setItem('accq', '');
            localStorage.setItem('gps', '');
            //alert(success.errormsg);
            this.presentAlert(success.errormsg);
            this.isLoading = false;
            if (success.flag == 1) {
              this.resetaccident();;

              this.router.navigate(['/acctabs/tab1/media']);
            }
            // cctabs/tab1/media


            this.selacc =
            {
              'accid': success.accid,
              'datetime': this.local_acc_model.mvalue_date_time,
              'landmark': this.local_acc_model.lname,
              'offlinedata': false
            };

            localStorage.setItem('selacc', JSON.stringify(this.selacc));

            localStorage.setItem('accid', success.accid);

          },
          error => {
            //  console.log(error);
          }
        );
      } else {
        console.log("you are Offline");
        if (this.localdb.checkPlatform()) {
          this.localdb.insertlocdata(this.local_acc_model).then((data: any) => {
            //console.log('check',JSON.parse(localStorage.getItem('selacc')));
            console.log("DATA", data);
            this.selacc = {
              'accid': data.insertId,
              'datetime': this.local_acc_model.mvalue_date_time,
              'landmark': this.local_acc_model.lname,
              'offlinedata': true
            };
            localStorage.setItem('selacc', JSON.stringify(this.selacc));
            this.isLoading = false;
            this.resetaccident();
            this.router.navigate(['/acctabs/tab1/media']);

          })
        }

      }

    }
  }




  get errorControl() {
    return this.loginform.controls;
  }
  public updateaccident(postData: any) {

    return this.api.post('locationnew', postData);
  }
  showLocation() {
    // alert(JSON.stringify(this.location));
    this.loading = true;
    this.api.post('police_service', { 'lat': this.location.lat, 'lng': this.location.lng })
      .subscribe(
        (data: any) => {
          console.log(data);
          this.loading = false;
          this.message = JSON.stringify(data);
          // alert( this.message)
          this.data = data;
          this.poi = new Array(); this.near_ps_loc = { 'name': '', "distance": '' }; this.ps_boundary = { 'name': '', "distance": "" };

          if (!data.ps_boundary.res) {

            this.near_ps_loc.name = data.near_ps_loc.near_police_station.ps_name;
            this.near_ps_loc.distance = data.near_ps_loc.near_police_station.distance;

            this.ps_boundary.name = data.ps_boundary.ps_boundary.ps_name;
            this.ps_boundary.distance = data.ps_boundary.ps_boundary.distance;

            // this.loginform.controls['policejur'].value;
            this.loginform.controls['policejur'].setValue(this.ps_boundary.name);
            this.loginform.controls['poi'].setValue(null);

            console.log('ps_boundary', data.ps_boundary);
            console.log('near_ps_loc', data.near_ps_loc);
          }

          for (var i = 1; i < data.poi.poi.length; i++) {
            this.poi.push(data.poi.poi[i]);
          }

          if(data.distance){
            console.log(data.distance);

            if(data.distance.km!=0){
             // alert(data.distance.state +'-'+ data.distance.km+'KM')
             let dis = Math.round((data.distance.km) * 100) / 100;
             this.presentAlert('You are away from <b>'+data.distance.state+'</b> by  ≈  <b> <span class = "assertive">' + dis + ' KM</span></b> <br>(Aerial Distance)');
            }
          }

        },
        (error) => {
          console.log(JSON.stringify(error));
          this.loading = true;
        });
    this.loading = true;
  }

  public addvalues() {

    // alert(this.timeofaccident);
    this.timeofaccident = this.datetime;
    this.dataService.setOption('datetime', this.timeofaccident);
    this.dataService.setOption('poi', this.poi);
    localStorage.setItem('datetime', this.timeofaccident);

    //  localStorage.setItem('lat',this.location.lat.toFixed(6)+'');
    // localStorage.setItem('lon',this.location.lng.toFixed(6)+'');
    //  alert(this.timeofaccident);

  }
  resetaccident() {
    console.log('reset');
    this.datetime = null;
    this.accloc = '';
    this.loginform.reset();
    this.loginform.controls['driver_dead'].setValue(0);
    this.loginform.controls['driver_injured'].setValue(0);
    this.loginform.controls['pass_injured'].setValue(0);
    this.loginform.controls['pass_dead'].setValue(0);
    this.loginform.controls['ped_injured'].setValue(0);
    this.loginform.controls['ped_dead'].setValue(0);
    this.loginform.controls['animal_injured'].setValue(0);
    this.loginform.controls['animal_dead'].setValue(0);
    this.roaddisp = '';
    this.poi = null;
  }

  selectLocation() {
    this.router.navigate(['/acctabs/tab1/map']);
  }

  ionViewDidEnter() {
    this.resetaccident();
    this.disable_btn = false;
    if (!this.checkNetwork()) {
      this.disable_btn = true;
      this.getCurrentGPSCoordinates();
    }
    return false;
    console.log('loc', this.location);
    if (this.location != undefined && this.location.lat != 0) {

      this.accloc = 'Lat:' + this.location.lat.toFixed(6) + ',       Long:' + this.location.lng.toFixed(6);
      console.log('accloc', this.accloc);
      this.getaddress(this.location);

    }

    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log('selectedLanguage  ionViewDidEnter', this.selectedLanguage);
    //console.clear();

    if (this.localdb.checkPlatform()) {
      console.log('this.localdb.checkPlatform', this.localdb.checkPlatform())
      this.localdb.select().then((data) => {

        console.log('data', data);
        console.log('local ---------------', this.options1);
        if (!this.options1) {
          this.options1 = data;
        }

      });

      this.mobiledevice = this.localdb.checkPlatform();
    }

  }
  public getaddress(loc) {
    let postDate = {

    }
    let urls = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + loc.lat + '&lon=' + loc.lng + '&zoom=18';
    this.api.url_post(urls, postDate).subscribe((data: any) => {
      this.loginform.controls['roaddetails'].setValue(data.display_name);
      this.roaddisp = data.display_name;
      //      localStorage.setItem('roadname',data.display_name);
      //   this.presentAlertConfirm(data);
    });

  }
  checkNetwork() {
    if (this.network.type != "none") {
      console.log("TRUE")
      this.offlineflag = false;
      return true;
    }
    else {
      console.log("FALSE")
      this.offlineflag = true;
      return false;
    }
  }


  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
    if (connection == 'Online') {
      this.offlineflag = false;
    }
    else {
      this.offlineflag = true;
    }
  }

  async pickLoc() {
    this.locdisable = true;
    console.log('pick Loc');
    console.log('location', this.location);
    const modalped = await this.modalctrl.create({
      component: MapComponent,
      componentProps: { 'location': this.location }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      this.locdisable = false;
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      console.log(this.location);



      if (dataReturned.data == true) {
        this.accloc = 'Lat:' + this.location.lat.toFixed(6) + ',       Long:' + this.location.lng.toFixed(6);
        console.log('accloc', this.accloc);
        this.getaddress(this.location);
        if (this.location.lat > 1) this.showLocation();
      }
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });



  }

}
