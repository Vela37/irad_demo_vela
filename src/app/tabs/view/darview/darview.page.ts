import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { model_geninfo } from '../../../models/model_geninfo';
import { Router } from "@angular/router";


// PDF VIEW

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../../environments/environment';


import { AuthService } from "../../../commonpages/login/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../../commonpages/login/user.model";
import { AlertController, ModalController } from '@ionic/angular';


import { InsuranceinjuryeditComponent } from 'src/app/tabs/view/darview/insuranceinjuryedit/insuranceinjuryedit.component';
import { InsurancegenraleditComponent } from 'src/app/tabs/view/darview/insurancegenraledit/insurancegenraledit.component';
import { InsurancedeatheditComponent } from 'src/app/tabs/view/darview/insurancedeathedit/insurancedeathedit.component';

import {DargenralcComponent} from  'src/app/tabs/view/darview/dargenralc/dargenralc.component'
import {DarpassengereditComponent} from  'src/app/tabs/view/darview/darpassengeredit/darpassengeredit.component'
import {DarpedestrianeditComponent} from  'src/app/tabs/view/darview/darpedestrianedit/darpedestrianedit.component'
import {DarfamilyeditComponent} from  'src/app/tabs/view/darview/darfamilyedit/darfamilyedit.component'
import {DarchildeditComponent} from  'src/app/tabs/view/darview/darchildedit/darchildedit.component'




export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@Component({
  selector: 'app-darview',
  templateUrl: './darview.page.html',
  styleUrls: ['./darview.page.scss'],
})
export class DarviewPage implements OnInit {
  selectedLanguage: any;
  owner_report_acc: any;
  owner_veh_gps: any;
  isAuthenticated = false;
  private userSub: Subscription;
  user: User;

  params: any;
  data: any;
  pedestriandata:any;
  passengerdata:any;
  vehcount: any;
  geninfo: model_geninfo = new model_geninfo();

  generaldata = {
    'acc_id': '', 'underSection':'','investofficername': '', 'investofficernumber': '','reportingPersonname': '','reportingPersonaddress': '',
    'investofficeraddress': '', 'lossOfproperty':'', 'otherLoss':'', 'descriptionacc': '', 'whoreportAcc': '',
    'cctvAvailability': '', 'descriptionSiteplan': '', 'dtSiteplan': '', 'witnessCheck': '', 'nature': '', 'briefDescriptionaccident': ''

  }
  
 

  vehicledata = {
    'llrsupervision': '', 'lapsedlicense': '', 'vehdrivenby': '', 'driveralocohol': '',
    'scientificreport': '', 'mobileatacc': '', 'drimobile': '',
    'drimobileimei': '', 'drimobilemake': '', 'previousacc': '', 'previousaccfir': '',
    'previousaccdistrict': '', 'previousaccps': '', 'drivereducation': '', 'driverincome': '',
    'licensesuspended': '', 'vehusetype': '', 'vehinsuranceinform': '',
    'vehinsuranceinformdate': '', 'vehinsurancepolicy': '', 'vehclaimsmade': '', 'vehwithgps': '',
    'vehwithgpsinformedpolice': '', 'vehemergencybtn': '', 'vehemergencybtnworking': '',
    'ownerproducedriver': '', 'vehamountpaidcompensation': '', 'vehmactcase': '', 
    'bankName':'','accHoldername':'','accNumber':'','ifscCode':'','bankAddress':'','victimdisposition': '',
    'owner_mobile_no': '','vehInspectionvehicle':'','vehInspectionreport':'','vehLocationinspection':'',
    'vehPainttransfer':'','vehColorpainttransfer':'','vehLocationpainttransfer1':'',
    'vehTypescratch':'','vehLocationpainttransfer2':'','vehCngkit':'',
    'vehChangevehbody':'','vehTyrecondition':'','vehHorninstalled':'',
    'vehBrakelightsfunctional':'','vehFaultynoplate':'','vehFittedairbags':'',
    'vehAirbagsdeployed':'','vehAirbagreason':'','vehTintedglass':'',
    'vehSpeedlimiter':'','vehSpeedlimiterfunctional':'','vehRearparkingsensor':'',
    'vehRearparkingsensorworks':'','vehrearparkingsensorreason':'','vehTrackingdevices':'',
    'vehTrackingdevicesworks':'','vehDescriptiondamage':'','vehSteercond':'',
    'vehWheelcond':'','vehWipercond':'','vehWindowcond':'',
    'vehMirrorcond':'','vehCondofvehicleextra':''
  };
  selacc: any;
  accid: any;
  postdata = { 'mode': '', 'accid': '' };
  accidentData = new Array();
  vehno = { 'vehlist': '' }; 
  vehicle: any;

  pedestriansdata: any=null;
  paasengerdata: any;
  seg: any = 0; 
  shepassid: any = 0;
  shepedid: any = 0;
  viewped: any = 0; viewpass: any = 0; viewveh: any = 0; viewIns: any=0; 

  constructor(    private authService: AuthService,private router: Router,
    private translateConfigService: TranslateConfigService, private api: ApiService,    private iab: InAppBrowser,

    private toastController: ToastController,private modalctrl: ModalController) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    console.log("AccId", this.accid);
  }

  ngOnInit() {
    this.getGenInfo();
    this.getGeneralData();
    
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; 
      if (this.isAuthenticated) {
        console.log(user.name);
        this.user = user;
      }
    });
  }
  shepass(flag) {
    console.log(flag);
    this.shepassid = flag;
  }
  sheped(flag) {
    console.log(flag);
    this.shepedid = flag;
  }

  getGeneralData() {
    this.generaldata.acc_id = this.accid;


    let postDate = {
      general: this.generaldata,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getgeneral', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      this.generaldata.investofficername = data.officerName;
      this.generaldata.investofficernumber = data.officerNumber;
      this.generaldata.investofficeraddress = data.officerAddress;
      this.generaldata.descriptionacc = data.descriptionSiteplan;
      this.generaldata.acc_id = data.accId;
      this.generaldata.cctvAvailability = data.cctvAvailability;
      this.generaldata.descriptionSiteplan = data.descriptionSiteplan;
      this.generaldata.dtSiteplan = data.dtSiteplan;
      this.generaldata.witnessCheck = data.witnessCheck;
      this.generaldata.underSection=data.underSection;
      this.generaldata.lossOfproperty=data.lossOfproperty;
      this.generaldata.otherLoss=data.otherLoss;
      this.generaldata.nature=data.natureAcc;
      this.generaldata.briefDescriptionaccident=data.briefDescriptionaccident;
      this.generaldata.reportingPersonname=data.reportingPersonname;
      this.generaldata.reportingPersonaddress=data.reportingPersonaddress;
      this.generaldata.whoreportAcc=data.whoreportAcc;
      
      this.presentToast("General Data fetched !");
      //this.modalctrl.dismiss(true);
    });
  }

/*
  getPassengerData() {
    this.generaldata.acc_id = this.accid;


    let postDate = {
      mode: 'investpassenger',
      passenger: this.generaldata,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getpassenger', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      this.passengerdata.victimdisposition = data.patientDisposition;
      this.passengerdata.witnessCheck = data.victimOrNot;

      this.presentToast("General Data fetched !");
      //this.modalctrl.dismiss(true);
    });
  }

  */

  getPedestrianData() {
    this.generaldata.acc_id = this.accid;


    let postDate = {
      mode: 'investpassenger',
      pedestrian: this.generaldata,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getpedestrian', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      this.pedestriandata.victimdisposition = data.patientDisposition;
      this.pedestriandata.witnessCheck = data.victimOrNot;

      this.presentToast("General Data fetched !");
      //this.modalctrl.dismiss(true);
    });
  }
  getPassengerData() {
  

    this.generaldata.acc_id = this.accid;
    let postDate = {
      mode: 'loadpassenger',
      passenger: this.generaldata,
      accid: this.accid
    }
    this.api.post('datas', postDate).subscribe((data: any) => {
      this.paasengerdata=data.data;

        for (let i = 0; i < data.data.length; i++) {
          this.paasengerdata[i].get_familymembers = JSON.parse(this.paasengerdata[i].get_familymembers);
          this.paasengerdata[i].get_childdetails = JSON.parse(this.paasengerdata[i].get_childdetails);

    }
    
    });


  }
  
  getPedestrianDataphp() {
    this.generaldata.acc_id = this.accid;
    let postDate = {
      mode: 'loadpedetrian',
      pedestrian: this.generaldata,
      accid: this.accid
    }

    this.api.post('datas', postDate).subscribe((data: any) => {
this.pedestriansdata=data.data;
        for (let i = 0; i < data.data.length; i++) {
          this.pedestriansdata[i].get_familymembers = JSON.parse(this.pedestriansdata[i].get_familymembers);
          this.pedestriansdata[i].get_childdetails = JSON.parse(this.pedestriansdata[i].get_childdetails);

    }
    });
  
  }

  reports()
  {
    this.router.navigate(["/dreports"]);
  }
  getVehicleData() {
    this.generaldata.acc_id = this.accid;

    let postDate = {
      mode: 'investpassenger',
      general: this.generaldata,
      //pedestriandoc: this.docinfo
    }
/*
      this.api.darsave('dar/getvehicle', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      this.vehicledata.owner_mobile_no = data.patientDisposition;
      this.vehicledata.vehusetype = data.ownerVehtype;
      this.vehicledata.vehinsuranceinform = data.ownerReportacc;
      this.vehicledata.vehinsuranceinformdate = data.ownerReportdt;
      this.vehicledata.vehinsurancepolicy = data.ownerDetailspreins;
      this.vehicledata.vehclaimsmade = data.ownerInsclaims;
      this.vehicledata.vehwithgps = data.ownerVehgps;
      this.vehicledata.vehwithgpsinformedpolice = data.ownerRelevantdetailsprovided;
      this.vehicledata.vehemergencybtn = data.ownerVehemergencybtn;
      this.vehicledata.vehemergencybtnworking = data.ownerEmergencybtnworks;
      this.vehicledata.ownerproducedriver = data.ownerDriverranownerproduce;
      this.vehicledata.vehamountpaidcompensation = data.ownerClaimantssettlement;
      this.vehicledata.vehmactcase = data.ownerMact;

      this.vehicledata.llrsupervision = data.driverWithoutsupervision;
      this.vehicledata.lapsedlicense = data.driverLapsedlearnerlic;
      this.vehicledata.driveralocohol = data.driverAlcoholusage;
      this.vehicledata.scientificreport = data.driverScientificreport;
      this.vehicledata.mobileatacc = data.driverMobileusage;
      this.vehicledata.drimobile = data.driverMobileno;
      this.vehicledata.drimobileimei = data.driverImei;
      this.vehicledata.drimobilemake = data.driverMakemodel;
      this.vehicledata.previousacc = data.driverInvolved_inacc;
      this.vehicledata.previousaccfir = data.driverFirno;
      this.vehicledata.previousaccdistrict = data.driverDistrict;
      this.vehicledata.previousaccps = data.driverPolicestation;
      this.vehicledata.drivereducation = data.driverEducation;
      this.vehicledata.driverincome = data.driverIncome;
      this.vehicledata.licensesuspended = data.driverLicensesuspended;
      this.vehicledata.victimdisposition = data.driverVictimdisposition;

      this.vehicledata.vehdrivenby = data.vehicleDrivenby;

      this.vehicledata.vehInspectionvehicle = data.vehInspectionvehicle;
      this.vehicledata.vehInspectionreport = data.vehInspectionreport;
      this.vehicledata.vehLocationinspection = data.vehLocationinspection;
      this.vehicledata.vehPainttransfer = data.vehPainttransfer;
      this.vehicledata.vehColorpainttransfer = data.vehColorpainttransfer;
      this.vehicledata.vehLocationpainttransfer1 = data.vehLocationpainttransfer1;
      this.vehicledata.vehTypescratch = data.vehTypescratch;
      this.vehicledata.vehLocationpainttransfer2 = data.vehLocationpainttransfer2;
      this.vehicledata.vehCngkit = data.vehCngkit;
      this.vehicledata.vehChangevehbody = data.vehChangevehbody;
      this.vehicledata.vehTyrecondition = data.vehTyrecondition;
      this.vehicledata.vehHorninstalled = data.vehHorninstalled;
      this.vehicledata.vehBrakelightsfunctional = data.vehBrakelightsfunctional;
      this.vehicledata.vehFaultynoplate = data.vehFaultynoplate;
      this.vehicledata.vehFittedairbags = data.vehFittedairbags;
      this.vehicledata.vehAirbagsdeployed = data.vehAirbagsdeployed;      
      this.vehicledata.vehAirbagreason = data.vehAirbagreason;
      this.vehicledata.vehTintedglass = data.vehTintedglass;
      this.vehicledata.vehSpeedlimiter = data.vehSpeedlimiter;
      this.vehicledata.vehSpeedlimiterfunctional = data.vehSpeedlimiterfunctional;
      this.vehicledata.vehRearparkingsensor = data.vehRearparkingsensor;
      this.vehicledata.vehRearparkingsensorworks = data.vehRearparkingsensorworks;
      this.vehicledata.vehrearparkingsensorreason = data.vehrearparkingsensorreason;
      this.vehicledata.vehTrackingdevices = data.vehTrackingdevices;
      this.vehicledata.vehTrackingdevicesworks = data.vehTrackingdevicesworks;
      this.vehicledata.vehDescriptiondamage = data.vehDescriptiondamage;
      this.vehicledata.vehSteercond = data.vehSteercond;
      this.vehicledata.vehWheelcond = data.vehWheelcond;
      this.vehicledata.vehWipercond = data.vehWipercond;
      this.vehicledata.vehWindowcond = data.vehWindowcond;
      this.vehicledata.vehMirrorcond = data.vehMirrorcond;
      this.vehicledata.vehCondofvehicleextra = data.vehCondofvehicleextra;

      this.vehicledata.bankName = data.bankName;
      this.vehicledata.accHoldername = data.accHoldername;
      this.vehicledata.accNumber = data.accNumber;
      this.vehicledata.ifscCode = data.ifscCode;
      this.vehicledata.bankAddress = data.bankAddress;

      this.presentToast("Vehicle Data fetched !");
     
    });

    */
  }


  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

  }


  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  getGenInfo() {
    //alert("hiiii");
    this.accid = this.selacc.accid;
    let postDate = {
      mode: "generalinfo",
      ln: this.selectedLanguage,
      id: this.accid,
    }
    this.api.post('darview', postDate).subscribe((data: any) => {
      console.log(data);
      //let vehiclecount;
    //  vehiclecount = data.data[0];
     // this.vehcount = vehiclecount.vehicles_count;
     // console.log("Vehicle count", this.vehcount);
      // this.data.accinfo = this.accinfo = JSON.parse(data.data[0].accinfo);
      // if (this.accinfo == null) {
      //   this.accinfo = this.data.accinfo = false;
      //   this.severity = 2;
      // }

      // localStorage.setItem('lat', this.data.latitude);
      // localStorage.setItem('lon', this.data.longitude);
      // //alert(this.data.fir_number);
      // // console.log('this.data',this.data);
      // this.firnumber = this.data.fir_number;
      // if (this.data.fir_number == undefined) {
      //   this.showfirinput = false;
      // }
      //  console.log(this.data);
    });
  }
  shveh(flag) {
    console.log(flag);
    this.seg = flag;
  }


  showDetails(docname) {
    console.log("Entered show details")

    if (docname != '') {
      if (docname == 'passenger') {
      
        this.viewpass = 1;
        this.getPassengerData();
      } else if (docname == 'pedestrian') {

        console.log("pedestrian");
        this.viewped = 1;
     //   this.getPedestrianData();
        this.getPedestrianDataphp();

      } else if (docname == 'insurances') {
        console.log("insurances");
        this.viewIns = 1;
        this.getInsuranceData();
      } 
    
      else if (docname = 'vehicle') {
        console.log("Vehicle")

        if (docname == 'vehicle') {
          this.viewveh = 1;
          let postDate = {
            mode: docname,
            ln: this.selectedLanguage,
            id: this.accid
          }
          this.api.post('darview', postDate).subscribe((data: any) => {
            console.log(data);        //console.log('flag ',flag);
            // if(data.data==null){ console.log(' data is null'); return }
            if (docname == 'vehicle') {
              this.vehicle = data.data;  // console.log('vehicle data ',this.vehicle);

              for (let i = 0; i < data.data.length; i++) {
                this.vehicle[i].passengers = JSON.parse(this.vehicle[i].passengers);
                this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
              }
              console.log('vehicle data json ', this.vehicle);
            }
            this.data = docname;
            console.log('-------------------------');
            console.log(this.vehicle);
            console.log('-------------------------');
          })
          this.getVehicleData();
        }
      }

    }
  }
  public darpassenger(id)
  {
  
      console.log(this.pedestriansdata[id]);
     // return false;
      

      let pdfurl = '';
    //  pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
 //     pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.pedestriansdata[id].pedestrian_ref_id+"&vehicle_id="+this.pedestriansdata[id].veh_no+"&mode="+mode;          
      pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.pedestriansdata[id].veh_no+"&refId="+this.pedestriansdata[id].pedestrian_ref_id+"&vehicleRegNo"+this.pedestriansdata[id].veh_no+"&mode=ped";
           http://10.163.30.225:8081/form/pdf7View?accidentId=202129592360119&vehicleId=8427&refId=&vehicleRegNo=TN32AB1234&mode=ped

      this.openWithSystemBrowser(pdfurl)  
   
  }
  viewPdfvehicle(flag)

  {
//    let pdfurl = '';

   //   pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.veh_ref_id.veh_id+"&vehicle_id="+this.veh_ref_id.veh_ref+"&mode="+this.veh_ref_id.mode;         
    //  this.openWithSystemBrowser(pdfurl)  
    /*
    else if(this.veh_ref_id.mode=="pass"){          
      pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.victim_ref_id+"&vehicle_id="+this.veh_ref_id.veh_id+"&mode="+this.veh_ref_id.mode;
    }else if(this.veh_ref_id.mode=="ped"){
      pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.victim_ref_id+"&vehicle_id="+this.veh_ref_id.veh_id+"&mode="+this.veh_ref_id.mode;          
    }
   */ 
  }
  public victimform(id,mode)
  {
  
      console.log(this.pedestriansdata[id]);
     // return false;
      

      let pdfurl = '';
    //  pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
      pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.pedestriansdata[id].pedestrian_ref_id+"&vehicle_id="+this.pedestriansdata[id].veh_no+"&mode="+mode;          
  
      this.openWithSystemBrowser(pdfurl)  
   
  }
  
  public viewdocumentpassenger(rpt,id)
  { 
    console.log('---->',this.paasengerdata);
    if(rpt==1)
    {
        let pdfurl = '';

        pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.paasengerdata[id].veh_no+"&refId="+this.paasengerdata[id].passenger_ref_id+"&vehicleRegNo"+this.paasengerdata[id].veh_no+"&mode=pass";


        this.openWithSystemBrowser(pdfurl)  
    }
    if(rpt==2)
    {
        let pdfurl = '';
        pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.paasengerdata[id].passenger_ref_id+"&vehicle_id="+this.paasengerdata[id].veh_no+"&mode=pass";          

        this.openWithSystemBrowser(pdfurl)  
    }

  }

  public viewdocumentpedestrian(rpt,id)
  { 
    
    if(rpt==1)
    {
        let pdfurl = '';

        pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.pedestriansdata[id].veh_no+"&refId="+this.pedestriansdata[id].pedestrian_ref_id+"&vehicleRegNo"+this.pedestriansdata[id].veh_no+"&mode=ped";


        this.openWithSystemBrowser(pdfurl)  
    }
    if(rpt==2)
    {
        let pdfurl = '';

        pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.pedestriansdata[id].passenger_ref_id+"&vehicle_id="+this.pedestriansdata[id].veh_no+"&mode=ped";          


        this.openWithSystemBrowser(pdfurl)  
    }

  }
  public viewdocumentcommon(id)
  {
      if(id==1)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf1view?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }

      if(id==2)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf2View?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }

      if(id==3)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }
  }
  public viewdocument(id)

  {
    if(id==1)
    {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf1view?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }
  else  if(id==2)
  {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }
  else  if(id==3)
  {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }

  else  if(id==4)
  {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }
  else  if(id==5)
  {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }
  

  }
  
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  public openWithSystemBrowser(url: string) {
    let target = "_system";
    this.iab.create(url, target, this.options);
  }




  insveh(flag){
    console.log("***************");

    console.log(flag);
    this.insseg = flag;
  }
  
  insvict(flag){
    console.log("***************");

    console.log(flag);
    this.insvictdert = flag;
  }

  insseg: any = 0; 
  insvictdert: any = 0;

  vehicleregno:any;
  deceased:any;
  insuranceinj:any;
  getInsuranceData(){
    this.generaldata.acc_id = this.accid;

    let postDate = {
      mode: 'darinsurance',
      accid: this.selacc.accid,
      //pedestriandoc: this.docinfo
    };

    this.api.post('dar', postDate).subscribe((data: any) => { 
     console.log(data);

     this.vehicleregno=data.dar_insurance;
     this.deceased=data.dar_insurance_death;
     this.insuranceinj=data.dar_insurance_injured;

     for (let i = 0; i < this.vehicleregno.length; i++) {
      this.vehicleregno[i].get_dar_insurance_death = JSON.parse(this.vehicleregno[i].get_dar_insurance_death);
      if(this.vehicleregno[i].get_dar_insurance_death!=null){
      for(let j=0;j<this.vehicleregno[i].get_dar_insurance_death.length;j++){
        if(this.vehicleregno[i].get_dar_insurance_death[j]!=undefined){
      this.vehicleregno[i].get_dar_insurance_death[j].get_personname = JSON.parse(this.vehicleregno[i].get_dar_insurance_death[j].get_personname);
        }
      }
    }
     if(this.vehicleregno[i].get_dar_insurance_injured!=null){
      this.vehicleregno[i].get_dar_insurance_injured = JSON.parse(this.vehicleregno[i].get_dar_insurance_injured);
      for(let j=0;j<this.vehicleregno[i].get_dar_insurance_injured.length;j++){
        if(this.vehicleregno[i].get_dar_insurance_injured[j]!=undefined)
        this.vehicleregno[i].get_dar_insurance_injured[j].get_personname = JSON.parse(this.vehicleregno[i].get_dar_insurance_injured[j].get_personname);
      }
     // this.vehicleregno[i].get_personname =this.vehicleregno[i].get_personname[0].name;
    }
  }
    console.log('vehicleregno',this.vehicleregno);
    


    
  //  console.log('-------before--------->',(this.vehicleregno[0].get_dar_insurance_death[0].get_personname));
   // console.log('-------after--------->',JSON.parse(this.vehicleregno[0].get_dar_insurance_death[0].get_personname));
/*
///  vela


for (let i = 0; i < this.vehicleregno.length; i++) {

  for (let j = 0; j < this.vehicleregno.length; j++) {
  this.vehicleregno[i].deceased[j].name = JSON.parse( this.vehicleregno[i].deceased[j].name);
  this.vehicleregno[i].deceased[j].name =this.vehicleregno[i].name[0].name;
  }
}



///
    //get_fatherdetails

     for (let i = 0; i < this.deceased.length; i++) {
      this.deceased[i].name = JSON.parse(this.deceased[i].name);
      this.deceased[i].name =this.deceased[i].name[0].name;
     
    }

    for (let i = 0; i < this.insuranceinj.length; i++) {
      this.insuranceinj[i].name = JSON.parse(this.insuranceinj[i].name);
      this.insuranceinj[i].name =this.insuranceinj[i].name[0].name;
     
    }

    console.log('deceased',this.deceased);
    console.log('deceased',this.deceased);
 */
          });

  }

  insurancegen: any;
  insurancedeath: any;
  insuranceinjured: any;
  async InsuranceEdit(i) {

    
    this.insurancegen = this.vehicleregno[i];
    const modal = await this.modalctrl.create({
        component:InsurancegenraleditComponent,
        componentProps: {
          insurancegen: this.insurancegen
       
        }
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }

    async InsuranceDeathEdit(i, j) {

      this.insurancedeath = this.vehicleregno[i].get_dar_insurance_death[j];
      const modal = await this.modalctrl.create({
          component:InsurancedeatheditComponent,
          componentProps: { 
            insurancedeath: this.insurancedeath

            
         
          }
        });
       modal.onWillDismiss().then(dataReturned => {
        
        });
        return await modal.present().then(_ => {
        }); 
      }
      async InsuranceInjuryEdit(i, j){
        
                this.insuranceinjured = this.vehicleregno[i].get_dar_insurance_injured[j];
        
        
        
                const modal = await this.modalctrl.create({
                    component:InsuranceinjuryeditComponent,
                    componentProps: {
                      insuranceinjured: this.insuranceinjured
        
                    }
                  });
                 modal.onWillDismiss().then(dataReturned => {
                  
                  });
                  return await modal.present().then(_ => {
                  }); 
                }

         async geninfoEdit() {
    
                  const modal = await this.modalctrl.create({
                      component:DargenralcComponent,
                      componentProps: {
                        generaldata: this.generaldata
                     
                      }
                    });
                   modal.onWillDismiss().then(dataReturned => {
                    
                    });
                    return await modal.present().then(_ => {
                    }); 
                  }
                  passengerinfo:any;

                  async Passengerdit(i) {
                    console.log("ped loop index val",  i);
            
                   this.passengerinfo = this.paasengerdata[i];
                   console.log('@@@@@@@@@',this.passengerinfo)
                    const modal = await this.modalctrl.create({
                        component:DarpassengereditComponent,
                        componentProps: {
                          passengerinfo: this.passengerinfo
                       
                        }
                      });
                     modal.onWillDismiss().then(dataReturned => {
                      
                      });
                      return await modal.present().then(_ => {
                      }); 
                    }

                    async Familyedit(i,j) {
                      console.log(this.pedestriansdata[i].get_familymembers[j]);
                      this.pedestrianinfo = this.pedestriansdata[i].get_familymembers[j]; 
                      
                      console.log('################################');
                      console.log(this.pedestrianinfo);
                      console.log('################################');
                    
                    
                                  const modal = await this.modalctrl.create({
                                      component:DarfamilyeditComponent,
                                      componentProps: {
                                        passengerinfo: this.pedestrianinfo
                                     
                                      }
                                    });
                                   modal.onWillDismiss().then(dataReturned => {
                                    
                                    });
                                    return await modal.present().then(_ => {
                                    }); 
                    }  
                    passfaminfo:any
                    async Familyeditpass(i) {
                      console.log(this.paasengerdata[i].get_familymembers[0]);
                      this.passfaminfo = this.paasengerdata[i].get_familymembers[0]; 
                      
                      console.log('################################');
                      console.log(this.passfaminfo);
                      console.log('################################');
                    
                    
                                  const modal = await this.modalctrl.create({
                                      component:DarfamilyeditComponent,
                                      componentProps: {
                                        passengerinfo: this.passfaminfo
                                     
                                      }
                                    });
                                   modal.onWillDismiss().then(dataReturned => {
                                    
                                    });
                                    return await modal.present().then(_ => {
                                    }); 
                    }  
                    
                    async ChildrenEdit(i,j){
                      //     let passenger = this. pedestriansdata[i].get_childdetails[j];
           console.log(this.paasengerdata[i].get_childdetails[j]);
           this.passengerinfo = this.paasengerdata[i].get_childdetails[j];          
           console.log(this.passengerinfo);
                           const modal = await this.modalctrl.create({
                               component:DarchildeditComponent,
                               componentProps: {
                                 passengerinfo: this.passengerinfo    
                               }
                             });
                            modal.onWillDismiss().then(dataReturned => {
                             
                             });
                             return await modal.present().then(_ => {
                             }); 
                           }  
                           pedestrianinfo:any;
                           async Pedestrianedit(i) {
                            console.log("ped loop index val", i);
                  
                         this.pedestrianinfo = this. pedestriansdata[i];
                  
                           
                            const modal = await this.modalctrl.create({
                                component:DarpedestrianeditComponent,
                                componentProps: {
                                  pedestrianinfo: this.pedestrianinfo
                               
                                }
                              });
                             modal.onWillDismiss().then(dataReturned => {
                              
                              });
                              return await modal.present().then(_ => {
                              }); 
                            }
                            async pedchild(i,j){
                              //     let passenger = this. pedestriansdata[i].get_childdetails[j];
                   console.log(this.pedestriansdata[i].get_childdetails[j]);
                   this.pedestrianinfo = this.pedestriansdata[i].get_childdetails[j];          
                   console.log(this.pedestrianinfo);
                                   const modal = await this.modalctrl.create({
                                       component:DarchildeditComponent,
                                       componentProps: {
                                         passengerinfo: this.pedestrianinfo    
                                       }
                                     });
                                    modal.onWillDismiss().then(dataReturned => {
                                     
                                     });
                                     return await modal.present().then(_ => {
                                     }); 
                                   }

}
