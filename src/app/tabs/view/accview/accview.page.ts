import { Component, OnInit } from "@angular/core";
import { IonicModule, NavController, Platform } from "@ionic/angular";

import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";

import { environment } from "../../../../environments/environment";
import { TranslateConfigService } from "../../../translate-config.service";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ApiService } from "../../../services/api.service";
import { UsersService } from '../../../services/shared.service';
import {  PushnotificationService} from '../../../services/pushnotification.service';

import {
  DocumentViewer,
  DocumentViewerOptions,
} from "@ionic-native/document-viewer/ngx";
import { AlertController, ModalController } from "@ionic/angular";

import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { VideoPlayer } from "@ionic-native/video-player/ngx";
import { AuthService } from "../../../commonpages/login/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { GeneralComponent } from "../edit/general/general.component";
import { User } from "../../../commonpages/login/user.model";

import { PedestrianComponent } from "../edit/pedestrian/pedestrian.component";
import { WitnesseditComponent } from "../edit/witnessedit/witnessedit.component";

import { model_geninfo } from "../../../models/model_geninfo";
import { model_pedestrian } from "../../../models/model_pedestrian";

import { model_vehicleinfo } from "src/app/models/model_vehicleinfo";
import { VehicleComponent } from "../edit/vehicle/vehicle.component";

import { model_driverinfo } from "src/app/models/model_driverinfo";
import { DriverComponent } from "../edit/driver/driver.component";

import { PassengerComponent } from "../edit/passenger/passenger.component";
import { model_passengerinfo } from "src/app/models/model_passengerinfo";

import { TransportComponent } from "../edit/transport/transport.component";
import { model_transportinfo } from "src/app/models/model_transportinfo";

import { model_roadinfo } from "src/app/models/model_roadinfo";
import { RoadComponent } from "../edit/road/road.component";

import { DdrequestComponent } from "../edit/ddrequest/ddrequest.component";
import { PmrequestComponent } from "../edit/pmrequest/pmrequest.component";
import { TreatmentviewComponent } from "src/app/tabs/view/treatmentview/treatmentview.component";

import { MediaviewComponent } from "../mediaview/mediaview.component";
import { FirComponent } from "./fir/fir.component";

import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import {
  ActionSheetController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { SubmitoshoComponent } from "./submitosho/submitosho.component";

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@Component({
  selector: "app-accview",
  templateUrl: "./accview.page.html",
  styleUrls: ["./accview.page.scss"],
})
export class AccviewPage implements OnInit {
  witness:any;
  selectedLanguage: string; dev:boolean=false;
  seg: any = 0;
  segtrans: any = 0;
  role: number;
  geninfo: model_geninfo = new model_geninfo();
  pedestrianinfo: model_pedestrian = new model_pedestrian();
  vehicleinfo: model_vehicleinfo = new model_vehicleinfo();
  driverinfo: model_driverinfo = new model_driverinfo();
  passengerinfo: model_passengerinfo = new model_passengerinfo();
  transportinfo: model_transportinfo = new model_transportinfo();
  roadinfo: model_roadinfo = new model_roadinfo();
  isAuthenticated = false;
  user: User;
  private userSub: Subscription;
  params: any;
  isLoading: boolean = false;
  firnumber: any;
  showfirinput: boolean = false;
  selacc: any;
  accid: any;
  validaccid: boolean = true;
  driver: any;
  data: any;
  vehicle: any;
  passenger: any;
  pedestrian: any;
  env: any;
  firs: any;
  trans: any;
  images: any;
  audios: any;
  videos: any;
  videourl: string[] = ["", "", ""];
  imageurl: string[] = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
  accinfo: any;
  severity = 1;
  items = [0, 1, 2, 3, 4, 5];
  mediacount: any = "";
  firNumber: any; mapscreenflag: boolean = false;
  private apiUrl = environment.apiUrl;

  returnpath;
  any;
  changefoflag:any=0; fouser:any;fousers:any;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService,
    private router: Router,
    private api: ApiService,
    private authService: AuthService,
    private document: DocumentViewer,
    private photoViewer: PhotoViewer,
    private VideoPlayer: VideoPlayer,
    private alertCtrl: AlertController,
    private modalctrl: ModalController,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private previewAnyFile: PreviewAnyFile,
    public loadingController: LoadingController,
    private fileOpener: FileOpener,
    private ft: FileTransfer, private pushNotification:PushnotificationService,
    private transfer: FileTransfer,  private shserv:UsersService,
    private file: File
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    console.log("selectedLanguage ", this.selectedLanguage);
  }

  async pmrequestpassenger(i, j) {
    let passenger = this.vehicle[i].passengers[j];
    //  console.log(passenger);
    //   console.log(passenger.id);

    //  alert(passenger.pm_hospitalid);
    //   alert(passenger.patient_id);

    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
      componentProps: {
        id: passenger.id,
        ptype: "Passenger",
        name: passenger.name,
        gender: passenger.gender,
        age: passenger.age,
        address: passenger.residence,
        curaddress: passenger.residence,
        firnumber: this.data.fir_number,
        hpname: passenger.pm_hospitalid,
        showhp: passenger.pm_hospitalshow,
        distrcit: passenger.pm_hospitalid,
        patientid: passenger.patient_id,
        hpid: passenger.hospitalid,
        hpdetails: "",
        pm_requestdate: passenger.pm_requestdate,
        pm_hospitalid: passenger.pm_hospitalid,
        pm_hospitaldetailas: passenger.pm_hospitaldetailas,
        pm_requestofficer: passenger.pm_requestofficer,
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }

  async pmrequestpedestrian(i) {
    let pedestrian = this.pedestrian[i];

    // console.log(pedestrian);
    // console.log(pedestrian.id);

    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
      componentProps: {
        id: pedestrian.id,
        ptype: "Pedestrian",
        name: pedestrian.name,
        gender: pedestrian.gender,
        age: pedestrian.age,
        address: pedestrian.residence,
        curaddress: pedestrian.residence,
        firnumber: this.data.fir_number,
        hpname: pedestrian.pm_hospitalid,
        showhp: pedestrian.pm_hospitalshow,
        distrcit: pedestrian.pm_hospitalid,
        patientid: pedestrian.patient_id,
        hpid: pedestrian.hospitalid,
        hpdetails: "",
        pm_requestdate: pedestrian.pm_requestdate,
        pm_hospitalid: pedestrian.pm_hospitalid,
        pm_hospitaldetailas: pedestrian.pm_hospitaldetailas,
        pm_requestofficer: pedestrian.pm_requestofficer,
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  shveh(flag) {
    console.log(flag);
    this.seg = flag;
  }
  shtrans(flag) {
    console.log(flag);
    this.segtrans = flag;
  }

  changeFOUser(){
    this.changefoflag=1;
    this.loadFOUsers();

  }
  loadFOUsers(){
    let postDate = {
      mode: "loadFOUsers",
    };
    this.api.post("accview.php", postDate).subscribe((data: any) => {
      this.fousers=data.data;
      this.fouser=this.data.fo_user;
    });
  }
  updateFOUser(){

    if(this.fouser==''){ console.log('no user selected'); return false}
    if(this.fouser==this.data.fo_user){ console.log('same user');return false}


    let postDate = {
      mode: "updateFOUsers",
      fouser:this.fouser,
      accid:this.accid
    };
    this.api.post("accview.php", postDate).subscribe((data: any) => {
      this.data.fouser=data.data[0].fouser;

    });

    this.changefoflag=0;



  }
  async viewpassengerinformation(i, j) {
    let passenger = this.vehicle[i].passengers[j];

    console.log(passenger);
    //return false;
    const modal = await this.modalctrl.create({
      component: TreatmentviewComponent,
      //      cssClass: 'halfscreen',
      componentProps: {
        id: passenger.id,
        ptype: "Passenger",
        name: passenger.name,
        gender: passenger.gender,
        age: passenger.age,
        address: passenger.residence,
        curaddress: passenger.residence,
        firnumber: this.data.fir_number,
        hpname: passenger.pm_hospitalid,
        showhp: passenger.pm_hospitalid,
        distrcit: passenger.pm_hospitalid,
        patientid: passenger.patient_id,
        hpid: passenger.hospitalid,
        hpdetails: passenger.hpdetails,
        pm_requestdate: passenger.pm_requestdate,
        pm_requestofficer: passenger.pm_requestofficer,
        pm_resultdate: passenger.pm_resultdate,
        pm_request_flag: passenger.pm_request_flag,
        pm_request: passenger.pm_request,
        pm_hospitalid: passenger.pm_hospitalid,
        pm_hospitaldetailas: passenger.pm_hospitaldetailas,
        fulldata: passenger,
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  async viewtreatmentpedestrian(i) {
    const modal = await this.modalctrl.create({
      component: TreatmentviewComponent,
      //  cssClass: 'halfscreen',
      componentProps: {
        id: this.pedestrian[i].id,
        ptype: "Pedestrian",
        name: this.pedestrian[i].name,
        gender: this.pedestrian[i].gender,
        age: this.pedestrian[i].age,
        address: this.pedestrian[i].residence,
        curaddress: this.pedestrian[i].residence,
        firnumber: this.data.fir_number,
        hpname: this.pedestrian[i].pm_hospitalid,
        showhp: this.pedestrian[i].pm_hospitalid,
        distrcit: this.pedestrian[i].pm_hospitalid,
        patientid: this.pedestrian[i].patient_id,
        hpid: this.pedestrian[i].hospitalid,
        hpdetails: this.pedestrian[i].hpdetails,
        pm_requestdate: this.pedestrian[i].pm_requestdate,
        pm_requestofficer: this.pedestrian[i].pm_requestofficer,
        pm_resultdate: this.pedestrian[i].pm_resultdate,
        pm_request_flag: this.pedestrian[i].pm_request_flag,
        pm_request: this.pedestrian[i].pm_request,
        pm_hospitalid: this.pedestrian[i].pm_hospitalid,
        pm_hospitaldetailas: this.pedestrian[i].pm_hospitaldetailas,
        fulldata: this.pedestrian[i],
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  async viewtreatment(i) {
    //    console.log(this.vehicle[i]);

    const modal = await this.modalctrl.create({
      component: TreatmentviewComponent,
      //  cssClass: 'halfscreen',

      componentProps: {
        id: this.vehicle[i].driver.id,
        ptype: "Driver",
        name: this.vehicle[i].driver.ser_name,
        gender: this.vehicle[i].driver.ser_gender,
        age: this.vehicle[i].driver.age,
        address: this.vehicle[i].driver.residence,
        curaddress: this.vehicle[i].driver.residence,
        firnumber: this.data.fir_number,
        hpname: this.vehicle[i].driver.pm_hospitalid,
        showhp: this.vehicle[i].driver.pm_hospitalid,
        distrcit: this.vehicle[i].driver.pm_hospitalid,
        patientid: this.vehicle[i].driver.patient_id,
        hpid: this.vehicle[i].driver.hospitalid,
        hpdetails: this.vehicle[i].driver.hpdetails,
        pm_requestdate: this.vehicle[i].driver.pm_requestdate,
        pm_requestofficer: this.vehicle[i].driver.pm_requestofficer,
        pm_resultdate: this.vehicle[i].driver.pm_resultdate,
        pm_request_flag: this.vehicle[i].driver.pm_request_flag,
        pm_request: this.vehicle[i].driver.pm_request,
        pm_hospitalid: this.vehicle[i].driver.pm_hospitalid,
        drunken_driver_hospitalid:
          this.vehicle[i].driver.drunken_driver_hospitalid,
        drunken_driver_hospitalshow:
          this.vehicle[i].driver.drunken_driver_hospitalshow,
        drunken_driver_reqdate: this.vehicle[i].driver.drunken_driver_reqdate,
        drunken_driver_reqpoliceid:
          this.vehicle[i].driver.drunken_driver_reqpoliceid,
        drunken_driver_request: this.vehicle[i].driver.drunken_driver_request,
        drunken_driver_resultdate:
          this.vehicle[i].driver.drunken_driver_resultdate,
        pm_hospitaldetailas: this.vehicle[i].driver.pm_hospitaldetailas,
        fulldata: this.vehicle[i].driver,
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }

  public downloadpmpdf(flag) {
    if (flag == null) {
      alert("Report not genereated");
      return false;
    }

    let ln = this.selectedLanguage;
    let pdfurl = "";
    pdfurl =
      environment.apiUrl +
      "reports/health_pmcertificate.php?ln=" +
      ln +
      "&pid=" +
      flag;

    this.openWithSystemBrowser(pdfurl);
  }

  public downloadddpdf(flag) {
    if (flag == null) {
      alert("Report not genereated");
      return false;
    }

    let ln = this.selectedLanguage;
    let pdfurl = "";
    pdfurl =
      environment.apiUrl +
      "reports/health_ddcertificate.php?ln=" +
      ln +
      "&pid=" +
      flag;
    this.openWithSystemBrowser(pdfurl);
  }
  async pmrequest(i) {
    //accident_id
    console.log("--------------------------");
    console.log(this.vehicle[i].driver);
    // console.log(this.vehicle[i].driver.ser_name);
    console.log("--------------------------");
    //

    // alert(this.vehicle[i].driver.patient_id);
    const modal = await this.modalctrl.create({
      component: PmrequestComponent,
      componentProps: {
        id: this.vehicle[i].driver.id,
        ptype: "Driver",
        name: this.vehicle[i].driver.ser_name,
        gender: this.vehicle[i].driver.ser_gender,
        age: this.vehicle[i].driver.age,
        address: this.vehicle[i].driver.residence,
        curaddress: this.vehicle[i].driver.residence,
        firnumber: this.data.fir_number,
        hpname: this.vehicle[i].driver.pm_hospitalid,
        showhp: this.vehicle[i].driver.pm_hospitalid,
        distrcit: this.vehicle[i].driver.pm_hospitalid,
        patientid: this.vehicle[i].driver.patient_id,
        hpid: this.vehicle[i].driver.hospitalid,
        hpdetails: this.vehicle[i].driver.hpdetails,
        pm_requestdate: this.vehicle[i].driver.pm_requestdate,
        pm_hospitalid: this.vehicle[i].driver.pm_hospitalid,
        pm_hospitaldetailas: this.vehicle[i].driver.pm_hospitaldetailas,
        pm_requestofficer: this.vehicle[i].driver.pm_requestofficer,
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  async ddrequest(i) {
    console.log(this.vehicle[i]);
    const modal = await this.modalctrl.create({
      component: DdrequestComponent,
      componentProps: {
        id: this.vehicle[i].driver.id,
        ptype: "Driver",
        name: this.vehicle[i].driver.ser_name,
        patientid: this.vehicle[i].driver.patient_id,
        hpid: this.vehicle[i].driver.hospitalid,
        hpdetails: this.vehicle[i].driver.hpdetails,
      },
    });
    /*
    'gender': this.vehicle[i].driver.ser_gender,
          'age':this.vehicle[i].driver.age,
          'address':this.vehicle[i].driver.residence,
          'curaddress':this.vehicle[i].driver.residence,
          'firnumber': this.data.fir_number,
          'hpname': this.vehicle[i].driver.pm_hospitalid,
          'showhp':  this.vehicle[i].driver.pm_hospitalid,
          'distrcit':  this.vehicle[i].driver.pm_hospitalid
    */

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  async geninfoEdit() {
    this.geninfo.accident_id = this.data.accident_id;
    this.geninfo.fir_number = this.data.fir_number;
    this.geninfo.investigating_officer = this.data.investigating_officer;
    this.geninfo.datetime = this.data.datetime;
    this.geninfo.repdatetime = this.data.repdatetime;
    this.geninfo.accdate=this.data.accdate;
    this.geninfo.landmarks = this.data.landmarks;
    this.geninfo.severity = this.data.severity;
    this.geninfo.vehicles_count = this.data.vehicles_count;

    this.geninfo.pass_inj = this.data.pass_inj;
    this.geninfo.pass_dead = this.data.pass_dead;
    this.geninfo.ped_inj = this.data.ped_inj;
    this.geninfo.ped_dead = this.data.ped_dead;
    this.geninfo.driver_inj = this.data.driver_inj;
    this.geninfo.driver_dead = this.data.driver_dead;
    this.geninfo.animal_inj = this.data.animal_inj;
    this.geninfo.animal_dead = this.data.animal_dead;

    this.geninfo.total_dead = this.data.total_dead;

    
    this.geninfo.road_name = this.data.accinfo.road_name;
    this.geninfo.road_class = this.data.accinfo.road_class;

    this.geninfo.total_injured = this.data.total_injured;
    this.geninfo.localbody = this.data.accinfo.localbody;
    //this.geninfo.collisiontype=this.data.accinfo.collision_type;
    
    let str = this.data.accinfo.collision_type;
    if (str != undefined) this.geninfo.collisiontype = str.split(",");

    let strx = this.data.accinfo.collnature;
    if (strx != undefined) this.geninfo.collisionnature = strx.split(",");

     str =  this.data.accinfo.initial_observation;
    if (str != undefined) this.geninfo.observation = str.split(",");
    
    //this.geninfo.observation = this.data.accinfo.initial_observation;
    str = this.data.accinfo.weather;
    if (str != undefined) this.geninfo.weather = str.split(",");
    this.geninfo.lightcondtion = this.data.accinfo.lightcondtion;
    str = this.data.accinfo.accident_spot;
    if (str != undefined) this.geninfo.accident_spot = str.split(",");
    this.geninfo.visibility = this.data.accinfo.visibilty;
    console.log("acc geninfo send", this.geninfo.visibility);
    const modal = await this.modalctrl.create({
      component: GeneralComponent,
      componentProps: { geninfo: this.geninfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modal.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showGenInfo();
    });
    return await modal.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async pedestrianinfoEdit(i) {
    console.log("ped loop index val", i);

    this.pedestrianinfo.accid = this.pedestrian[i].accident_id;
    this.pedestrianinfo.id = this.pedestrian[i].id;
    this.pedestrianinfo.name = this.pedestrian[i].name;
    this.pedestrianinfo.age = this.pedestrian[i].age;
    this.pedestrianinfo.gender = this.pedestrian[i].gender;
    this.pedestrianinfo.injury_severity = this.pedestrian[i].injury_severity;
    this.pedestrianinfo.modeoftransport = this.pedestrian[i].modeoftransport;
    this.pedestrianinfo.hospitaldelay = this.pedestrian[i].hospitaldelay;
    this.pedestrianinfo.ped_natureofinjury =
      this.pedestrian[i].ped_natureofinjury;
    this.pedestrianinfo.ped_injurytype = this.pedestrian[i].ped_injurytype;
    this.pedestrianinfo.pedpostion = this.pedestrian[i].pedpostion;

    this.pedestrianinfo.pedaction = this.pedestrian[i].pedaction;
    this.pedestrianinfo.mobile = this.pedestrian[i].mobile;
    this.pedestrianinfo.residence = this.pedestrian[i].residence;
    this.pedestrianinfo.occupation = this.pedestrian[i].occupation;
    this.pedestrianinfo.nationality = this.pedestrian[i].nationality;
    this.pedestrianinfo.education = this.pedestrian[i].education;

    console.log("ped values", this.pedestrianinfo);
    const modalped = await this.modalctrl.create({
      component: PedestrianComponent,
      componentProps: { pedinfo: this.pedestrianinfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showDetails("pedestrian");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async vehicleinfoedit(i) {
    this.vehicleinfo = this.vehicle[i];

    /*
    this.vehicleinfo.accid = this.vehicle[i].accident_id;
    this.vehicleinfo.id = this.vehicle[i].id;

    this.vehicleinfo.vehiclecategory = this.vehicle[i].vehiclecategory;
    this.vehicleinfo.regnstatus = this.vehicle[i].regnstatus;
    this.vehicleinfo.hitandrun = this.vehicle[i].hitandrun;
    this.vehicleinfo.disposition = this.vehicle[i].disposition;
    this.vehicleinfo.accused_victim = this.vehicle[i].accused_victim;
    this.vehicleinfo.loadcategory = this.vehicle[i].loadcategory;
    this.vehicleinfo.vehicle_owner = this.vehicle[i].vehicle_owner;
    this.vehicleinfo.color = this.vehicle[i].color;
    this.vehicleinfo.vehicle_reg_no = this.vehicle[i].vehicle_reg_no;

    this.vehicleinfo.owneraddr = this.vehicle[i].owneraddr;
    this.vehicleinfo.load_condtions = this.vehicle[i].load_condtions;
    this.vehicleinfo.vehicle_type = this.vehicle[i].vehicle_type;
    this.vehicleinfo.vehicle_subtype = this.vehicle[i].vehicle_subtype;
    this.vehicleinfo.vehicle_make = this.vehicle[i].vehicle_make;
    this.vehicleinfo.vehicle_model = this.vehicle[i].vehicle_model;
    this.vehicleinfo.insurance_details = this.vehicle[i].insurance_details;
    this.vehicleinfo.insurance_policyno = this.vehicle[i].insurance_policyno;
    this.vehicleinfo.insurance_validity = this.vehicle[i].insurance_validity;
    this.vehicleinfo.mechanical_failure = this.vehicle[i].mechanical_failure;
    this.vehicleinfo.registration_date = this.vehicle[i].registration_date;
    this.vehicleinfo.chasis_number = this.vehicle[i].chasis_number;
    this.vehicleinfo.engine_nr = this.vehicle[i].engine_nr;
    this.vehicleinfo.vehicle_class = this.vehicle[i].vehicle_class;
    this.vehicleinfo.fuel_type = this.vehicle[i].fuel_type;
    this.vehicleinfo.rc_statuson = this.vehicle[i].rc_statuson;
    this.vehicleinfo.rc_status = this.vehicle[i].rc_status;
    this.vehicleinfo.registered_at = this.vehicle[i].registered_at;

    */
    let str = this.vehicle[i].manoeuvre;
    if (str != undefined) this.vehicleinfo.manoeuvre = str.split(",");

    str = this.vehicle[i].vdamage;
    if (str != undefined) this.vehicleinfo.vdamage = str.split(",");

    const modal = await this.modalctrl.create({
      component: VehicleComponent,
      componentProps: { vehicleinfo: this.vehicleinfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modal.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      this.showDetails("vehicle");
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showDetails("vehicle");
    });
    return await modal.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async driverinfoEdit(i) {
    console.log("ped loop index val", i);

    this.driverinfo.accid = this.vehicle[i].accident_id;
    this.driverinfo.id = this.vehicle[i].driver.id;

    this.driverinfo.nationality = this.vehicle[i].driver.nationality;
    this.driverinfo.injurytype = this.vehicle[i].driver.injurytype;
    this.driverinfo.natureofinjury = this.vehicle[i].driver.natureofinjury;
    this.driverinfo.cellphonedriving = this.vehicle[i].driver.cellphonedriving;
    this.driverinfo.injury_severity = this.vehicle[i].driver.injury_severity;

    this.driverinfo.safety_device = this.vehicle[i].driver.safety_device;
    this.driverinfo.drunk = this.vehicle[i].driver.drunk;
    this.driverinfo.modeoftransport = this.vehicle[i].driver.modeoftransport;
    this.driverinfo.hospitaldelay = this.vehicle[i].driver.hospitaldelay;

    this.driverinfo.license_number = this.vehicle[i].driver.license_number;
    this.driverinfo.ser_name = this.vehicle[i].driver.ser_name;
    this.driverinfo.vehilceclass = this.vehicle[i].driver.vehilceclass;
    this.driverinfo.ser_gender = this.vehicle[i].driver.ser_gender;
    //this.driverinfo.license_type = this.driverinfo[i].license_type;
    this.driverinfo.ser_mobileno = this.vehicle[i].driver.ser_mobileno;
    this.driverinfo.mobile_no = this.vehicle[i].driver.mobile_no;
    this.driverinfo.residence = this.vehicle[i].driver.residence;
    this.driverinfo.remarks = this.vehicle[i].driver.remarks;
    this.driverinfo.age = this.vehicle[i].driver.age;
    this.driverinfo.education = this.vehicle[i].driver.education;
    this.driverinfo.drivinglicencetype = this.vehicle[i].driver.drivinglicencetype;
    // ser_mobileno
    console.log("driver values", this.driverinfo);
    const modalped = await this.modalctrl.create({
      component: DriverComponent,
      componentProps: { driverinfo: this.driverinfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      //if(dataReturned.data==true)
      this.showDetails("vehicle");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async passengerinfoEdit(i, j) {
    console.log("ped loop index val", i, j);

    let vehicle = this.vehicle[i];
    let passenger = this.vehicle[i].passengers[j];

    //console.log('vehicle',vehicle);

    // console.log('passenger',passenger);

    this.passengerinfo.accid = this.vehicle[i].accident_id;
    this.passengerinfo.id = passenger.id;

    this.passengerinfo.vehicle_reg_no = vehicle.vehicle_reg_no;
    this.passengerinfo.name = passenger.name;
    this.passengerinfo.gender = passenger.gender;
    this.passengerinfo.occupation = passenger.occupation;
    this.passengerinfo.injury_severity = passenger.injury_severity;

    let str = passenger.pass_injurytype;
    if (str != undefined) this.passengerinfo.pass_injurytype = str.split(",");

    this.passengerinfo.modeoftransport = passenger.modeoftransport;
    this.passengerinfo.hospitaldelay = passenger.hospitaldelay;
    this.passengerinfo.pass_natureofinjury = passenger.pass_natureofinjury;

    this.passengerinfo.pass_position = passenger.pass_position;
    this.passengerinfo.safety_device = passenger.safety_device;
    this.passengerinfo.pass_action = passenger.pass_action;
    this.passengerinfo.age = passenger.age;
    this.passengerinfo.mobile = passenger.mobile;
    this.passengerinfo.nationality = passenger.nationality;
    this.passengerinfo.residence = passenger.residence;
    this.passengerinfo.education = passenger.education;

    console.log("passenger values", this.passengerinfo);
    const modalped = await this.modalctrl.create({
      component: PassengerComponent,
      componentProps: { passengerinfo: this.passengerinfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      this.showDetails("vehicle");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async transportinfoEdit(i) {
    console.log("ped loop index val", i);

    let transport = this.trans[i];

    //console.log('vehicle',vehicle);

    // console.log('passenger',passenger);
    // this.transportinfo.cfxdatenumber = transport.cfxdatenumber;
    this.transportinfo.cfxdate = transport.cfxdate;

    this.transportinfo.cause_of_acc = transport.cause_of_acc;
    this.transportinfo.gvehicledamagestatus = transport.gvehicledamagestatus;
    this.transportinfo.gvehicledefect = transport.gvehicledefect;
    this.transportinfo.cffb_mech = transport.cffb_mech;

    this.transportinfo.cfhandbreak = transport.cfhandbreak;
    this.transportinfo.temp_regno_validity = transport.temp_regno_validity;
    this.transportinfo.rc_owner_sr = transport.rc_owner_sr;
    this.transportinfo.accident_id = transport.accident_id;
    this.transportinfo.vehicle_reg_no = transport.vehicle_reg_no;

    this.transportinfo.veh_no = transport.veh_no;
    this.transportinfo.regno_type = transport.regno_type;
    this.transportinfo.regcrtval = transport.regcrtval;
    this.transportinfo.regloadenweg = transport.regloadenweg;
    this.transportinfo.trade_plate_issuedby = transport.trade_plate_issuedby;
    this.transportinfo.f19_sno = transport.f19_sno;
    this.transportinfo.f19_tp_purpose = transport.f19_tp_purpose;
    this.transportinfo.f19_tp_dt = transport.f19_tp_dt;
    this.transportinfo.f19_mileage = transport.f19_mileage;
    this.transportinfo.vclass = transport.vclass;
    this.transportinfo.vtype = transport.vtype;
    this.transportinfo.make = transport.make;
    this.transportinfo.makeclass = transport.makeclass;
    this.transportinfo.ownername = transport.ownername;

    // this.transportinfo.injury_severity = vehicle.owneraddress;
    this.transportinfo.rc_manu_month_yr = transport.rc_manu_month_yr;
    this.transportinfo.vage = transport.vage;
    this.transportinfo.engineno = transport.engineno;
    this.transportinfo.chassisno = transport.chassisno;
    this.transportinfo.vdescription = transport.vdescription;
    this.transportinfo.color = transport.color;
    this.transportinfo.uloadenweight = transport.uloadenweight;
    this.transportinfo.max_speed = transport.max_speed;
    //this.transportinfo.injury_severity = vehicle.rc_val;
    // this.transportinfo.injury_severity = vehicle.place_of_inspection;
    this.transportinfo.inscomname = transport.inscomname;
    this.transportinfo.seat_cap = transport.seat_cap;
    this.transportinfo.inscrtpolicyno = transport.inscrtpolicyno;
    this.transportinfo.inscrtvalidity = transport.inscrtvalidity;

    this.transportinfo.permitcat = transport.permitcat;
    this.transportinfo.permitissuedby = transport.permitissuedby;
    this.transportinfo.permitno = transport.permitno;
    this.transportinfo.permitvalidity = transport.permitvalidity;
    this.transportinfo.fitcertstatus = transport.fitcertstatus;
    this.transportinfo.fitcertval = transport.fitcertval;
    this.transportinfo.polctrlcertval = transport.polctrlcertval;
    this.transportinfo.place_ins = transport.place_ins;

   //new inspection date and driving licence sub vel
    this.transportinfo.inspection_date = transport.inspection_date;
    this.transportinfo.driving_license_submit_flag = transport.driving_license_submit_flag;
    this.transportinfo.vlength = transport.vlength;
    this.transportinfo.vwidth = transport.vwidth;
    this.transportinfo.vheight = transport.vheight;
    this.transportinfo.heightofbtoe = transport.heightofbtoe;
    this.transportinfo.cfhandbreak = transport.cfhandbreak;
    this.transportinfo.conditionofbreak = transport.conditionofbreak; ///conditionofbreak

    this.transportinfo.effoffoodbreak = transport.effoffoodbreak;
    this.transportinfo.effofhandbreak = transport.effofhandbreak;
    this.transportinfo.mech_fstat = transport.mech_fstat;
    this.transportinfo.tyrecond = transport.tyrecond;
    this.transportinfo.opif_vd_rd = transport.opif_vd_rd;
    this.transportinfo.cffb_mech = transport.cffb_mech;

    //console.log("CFFB_MECH1",transport.cffb_mech);
    let str = transport.cffb_mech;
    if (str != undefined) this.transportinfo.cffb_mech = str.split(",");

    // console.log("CFFB_MECH2",this.transportinfo.cffb_mech);

    this.transportinfo.vdefecttype = transport.vdefecttype;
    let vdefect = transport.vdefecttype;
    if (vdefect != undefined)
      this.transportinfo.vdefecttype = vdefect.split(",");

    this.transportinfo.disposofv = transport.disposofv;
    this.transportinfo.tax = transport.tax;
    this.transportinfo.streeringtype = transport.streeringtype;
    this.transportinfo.streeingcond = transport.streeingcond;

    console.log("streeingcond1", transport.streeingcond);
    let streed = transport.streeingcond;
    if (streed != undefined)
      this.transportinfo.streeingcond = streed.split(",");
    console.log("streeingcond2", this.transportinfo.streeingcond);

    this.transportinfo.vdamagestat = transport.vdamagestat;

    let vdamage = transport.vdamagestat;
    if (vdamage != undefined)
      this.transportinfo.vdamagestat = vdamage.split(",");

    this.transportinfo.damge_sustained = transport.damge_sustained;
    this.transportinfo.skidmark = transport.skidmark;
    //this.transportinfo.skidleng = transport.skidleng;
    this.transportinfo.trackmark = transport.trackmark;
    this.transportinfo.whechkrepiss = transport.whechkrepiss;
    this.transportinfo.whecfxiss = transport.whecfxiss;


    // New Field
    this.transportinfo.vowneraddr = transport.vowneraddr;
    this.transportinfo.cfxno = transport.cfxno;
    this.transportinfo.checkreportnr = transport.checkreportnr;
    this.transportinfo.checkreportdate = transport.checkreportdate;
    this.transportinfo.painttransfer = transport.painttransfer;
    this.transportinfo.locationoftransfer = transport.locationoftransfer;
    this.transportinfo.coloroftransfer = transport.coloroftransfer;
    this.transportinfo.installingcng = transport.installingcng;
    this.transportinfo.changeofvehiclebody = transport.changeofvehiclebody;
    this.transportinfo.hornfunctional = transport.hornfunctional;
    this.transportinfo.lightsfuntional = transport.lightsfuntional;
    this.transportinfo.faultynumberplate = transport.faultynumberplate;
    this.transportinfo.airbags = transport.airbags;
    this.transportinfo.airbagsfunctional = transport.airbagsfunctional;
    this.transportinfo.airbagreasons = transport.airbagreasons;
    this.transportinfo.tintedglass = transport.tintedglass;
    this.transportinfo.educationalvehicle = transport.educationalvehicle;
    this.transportinfo.psvinstalled = transport.psvinstalled;
    this.transportinfo.psvfunctional = transport.psvfunctional;
    this.transportinfo.parkingsensors = transport.parkingsensors;
    this.transportinfo.sensorfunctional = transport.sensorfunctional;
    this.transportinfo.vehicletracking = transport.vehicletracking;
    this.transportinfo.vehicletrackingfunctional = transport.vehicletrackingfunctional;

    // New Field Raghul rc_manu_month_yr
    this.transportinfo.wheeltype = transport.wheeltype;
    this.transportinfo.wiperstype = transport.wiperstype;
    this.transportinfo.mirrorstype = transport.mirrors;
    this.transportinfo.whethervmb = transport.whethervmb;
    this.transportinfo.wrpsi = transport.wrpsi;
    this.transportinfo.wfy = transport.wfy;
    this.transportinfo.vehmodby = transport.vehmodby;
  //  this.transportinfo.tofs = transport.tofs;
    this.transportinfo.dodamages = transport.dodamages;
    this.transportinfo.tyrecond = transport.tyrecond;
    this.transportinfo.cause_of_acc = transport.cause_of_acc;
    this.transportinfo.wheeltype = transport.wheeltype;
    this.transportinfo.wiperstype = transport.wiperstype;
    this.transportinfo.mirrorstype = transport.mirrors;
    this.transportinfo.whethervmb = transport.whethervmb;
    this.transportinfo.vehmodby = transport.vehmodby;
    this.transportinfo.wrpsi = transport.wrpsi;
    this.transportinfo.wfy = transport.wfy;
    this.transportinfo.tofs = transport.tofs;
    this.transportinfo.dodamages = transport.dodamages;
    this.transportinfo.dispinstallingcngosofv = transport.dispinstallingcngosofv;
    this.transportinfo.breakseorn = transport.breakseorn;

    this.transportinfo.vehicle_windscreen = transport.vehicle_windscreen;
    this.transportinfo.vehicle_reflectivetapes = transport.vehicle_reflectivetapes;
    this.transportinfo.vehicle_bullbars = transport.vehicle_bullbars;
    this.transportinfo.device_fit = transport.device_fit;
    
    console.log("passenger values", this.passengerinfo);
    const modalped = await this.modalctrl.create({
      component: TransportComponent,
      componentProps: { transportinfo: this.transportinfo },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      this.showDetails("transport");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }
  async firinfoEdit() {

  }

  viewProfile(usrname) {
  
    console.log(usrname);
    this.shserv.viewProfile(usrname);
  
  }

  async roadinfoEdit() {
    console.log("vehicle", this.env);
    this.roadinfo.accid = this.env.accident_id;
    this.roadinfo.road_name = this.env.road_name;
    this.roadinfo.area_type = this.env.area_type;
    this.roadinfo.roadshoulder = this.env.roadshoulder;
    this.roadinfo.road_number = this.env.road_number;
    this.roadinfo.road_chainage = this.env.road_chainage;

    this.roadinfo.road_type = this.env.road_type;
    this.roadinfo.surfacetype = this.env.surfacetype;

    this.roadinfo.typeofroad = this.env.typeofroad;

    this.roadinfo.surfacecondtion = this.env.surfacecondtion;
    this.roadinfo.roadconstruction = this.env.roadconstruction;
    this.roadinfo.topology = this.env.topology;
    this.roadinfo.vert = this.env.vert;
    this.roadinfo.hori = this.env.hori;

    this.roadinfo.roadwork = this.env.roadwork;
    this.roadinfo.trafficmovement = this.env.trafficmovement;

    this.roadinfo.road_junctiontype = this.env.road_junctiontype;
    this.roadinfo.junctioncontrol = this.env.junctioncontrol;
    this.roadinfo.road_speedlimit = this.env.road_speedlimit;
    let str = this.env.pedestrian_infra;
    if (str != undefined) this.roadinfo.pedestrian_infra = str.split(",");
    this.roadinfo.nooflanes = this.env.nooflanes;
    this.roadinfo.phy_divider = this.env.phy_divider;

    this.roadinfo.remedial = this.env.remedial;
    this.roadinfo.gradient = this.env.gradient;

    this.roadinfo.roadmargin = this.env.roadmargin;
    this.roadinfo.roadwidth = this.env.roadwidth;
    this.roadinfo.getaccidentlocations = this.env.accidentlocations;
    this.roadinfo.getsightdistance = this.env.getsightdistance;
    this.roadinfo.rdshtype = this.env.rdshtype;
    this.roadinfo.getroadmrkings = this.env.getroadmrkings;
    this.roadinfo.getroadsignboard = this.env.getroadsignboard;

    this.roadinfo.vertical_curve = this.env.vertical_curve;
    this.roadinfo.horizontal_curve = this.env.horizontal_curve;
    this.roadinfo.junction_type = this.env.junction_type;
    this.roadinfo.junction_control = this.env.junction_control;
    this.roadinfo.road_shoulder_type = this.env.road_shoulder_type;
    this.roadinfo.onoing_road_work = this.env.onoing_road_work;
    this.roadinfo.geometric_factors = this.env.geometric_factors;
    this.roadinfo.road_median = this.env.typeofmedian;
    console.log('------------');
    console.log( this.roadinfo.road_median);
        console.log('------------');

   // road_median
    console.log("passenger values", this.passengerinfo);
    const modalped = await this.modalctrl.create({
      component: RoadComponent,
      componentProps: { roadinfo: this.env },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      this.showDetails("environment");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  async mediaView() {
    const modalped = await this.modalctrl.create({
      component: MediaviewComponent,
      componentProps: { mediainfo: "" },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      //if(dataReturned.data==true)
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  ngOnInit() {
    this.dev = (localStorage.getItem('dev') === 'true');
    this.firnumber = "";
    //this.accid=localStorage.getItem('accid');
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    console.log(this.selacc);

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user.name);
        this.role = +user.role;
        this.user = user;
        console.log("this.user", this.user);
      }
    });

    // console.clear();
    this.selectedLanguage = localStorage.getItem("ln");
    this.showGenInfo();
    // this.showDetails('pedestrian');
    //this.showDetails('vehicle');
  }

  refPending(event){
    console.log('Referesh Pending');
    this.showGenInfo();
    event.target.complete();
  }

  ionViewDidEnter() {
    // console.clear();
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    console.log(this.selacc);
    this.showGenInfo();
    this.selectedLanguage = localStorage.getItem("ln");
    console.log("ionViewDidEnter selectedLanguage ", this.selectedLanguage);
  }

  viewLocation(flag) {
    localStorage.setItem('mapscreenflag', flag);
    this.router.navigate(["/viewaccloc"]);
  }

  showGenInfo() {
    this.accid = this.selacc.accid;
    let postDate = {
      mode: "generalinfo",
      ln: this.selectedLanguage,
      id: this.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {
      console.log(data.data[0]);
      this.data = data.data[0];
      console.log(this.data);
      this.data.accinfo = this.accinfo = JSON.parse(data.data[0].accinfo);
      if (this.accinfo == null) {
        this.accinfo = this.data.accinfo = false;
        this.severity = 2;
      }

      localStorage.setItem("lat", this.data.latitude);
      localStorage.setItem("lon", this.data.longitude);
      //alert(this.data.fir_number);
      // console.log('this.data',this.data);
      this.firnumber = this.data.fir_number;
      if (this.data.fir_number == undefined) {
        this.showfirinput = false;
      }
      //  console.log(this.data);
    });
  }

  async SubmotToSHO() {


    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to SUBMIT !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.SubmotToSHOconf();
          }
        }
      ]
    });

    await alert.present();

  }
  SubmotToSHOconf() {
    this.accid = this.selacc.accid;
    let postDate = {
      mode: "submittosho",
      id: this.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {


    });
  }

  checkSubmotToSHO1() {
    this.accid = this.selacc.accid;
    let postDate = {
      mode: "checksubmittosho",
      id: this.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {
      console.log(data);



    });



  }


  async checkSubmotToSHO() {
    const modalped = await this.modalctrl.create({
      component: SubmitoshoComponent, // cssClass: 'halfscreen',
      componentProps: { data: this.data },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      //if(dataReturned.data==true)
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }



  showDetails(flag) {
    if (flag != "") {
      let postDate = {
        mode: flag,
        ln: this.selectedLanguage,
        id: this.accid,
      };
      this.api.post("accview", postDate).subscribe((data: any) => {
        console.log(data); //console.log('flag ',flag);
        // if(data.data==null){ console.log(' data is null'); return }
        if (flag == "vehicle") {
          this.vehicle = data.data; // console.log('vehicle data ',this.vehicle);

          for (let i = 0; i < data.data.length; i++) {
            this.vehicle[i].passengers = JSON.parse(this.vehicle[i].passengers);
            this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
          }
          console.log("vehicle data json ", this.vehicle);
        } else if (flag == "pedestrian") {
          this.pedestrian = data.data;
          console.log("pedestrian data ", this.pedestrian);
        }else if (flag == "witness") {
          this.witness = data.data;
          console.log("witness data ", this.pedestrian);
        } 
         else if (flag == "firinfo") {
          this.trans = data.data;
          // if(this.trans==undefined)  ;//this.trans=-1;
          console.log("fir data", this.trans);
        } else if (flag == "environment") {
          this.env = data.data[0];
          if (this.env == undefined) this.env = -1;
          console.log("environment data ", this.env);
        } else if (flag == "transport") {
          this.trans = data.data;
          // if(this.trans==undefined)  ;//this.trans=-1;
          console.log("Transport data ", this.trans);
        } else if (flag == "media") {

          if (this.platform.is("android")) {
            this.mapscreenflag = true;
            console.log("mobile :true");
          }

          this.images = data.images;
          console.log(this.images);
          this.videos = data.videos;
          console.log(this.videos);
          this.audios = data.audio;

          this.mediacount =
            this.images.length + this.videos.length + this.audios.length;
        }
      });
    } else {
      console.log("invalid request");
    }
  }


  async reportAsPending() {


    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Do You want to move to pending?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');


            let postDate = {
              mode: "movetopending",
              id: this.accid,
            };
            this.api.post("update", postDate).subscribe((data: any) => {
              console.log(data);
              if (data.flag == true) {
                this.showfirinput = false;
                this.router.navigate(["/list"]);

                this.pushNotification.sendNotification('SHO','movetopending',this.accid);

                // this.showGenInfo();
              }
              // this.isLoading = false;
            });



          }
        }
      ]
    });

    await alert.present();




  }

  updateFir() {
    // this.isLoading=true;
    // alert(this.firnumber);
    if (this.firnumber != "") {
      let postDate = {
        mode: "updatefir",
        ln: this.selectedLanguage,
        id: this.accid,
        firnumber: this.firnumber,
      };
      this.api.post("update", postDate).subscribe((data: any) => {
        console.log(data);
        if (data.flag == true) {
          this.showfirinput = false;
          this.showGenInfo();
        }
        this.isLoading = false;
      });
    } else {
      alert("Invalid FIR/CSR Number \nPlease Enter Valid FIR/CSR Number ");
      this.isLoading = false;
    }
    this.isLoading = false;
  }
  firedit() {
    this.showfirinput = true;
  }

  viewaccReportPDF(flag) {
    let ln = this.selectedLanguage;
    let pdfurl = "";
    if (flag == 1) {
      pdfurl =
        environment.apiUrl +
        "reports/accidentpdf.php?ln=" +
        ln +
        "&id=" +
        this.accid;
    } else if (flag == 2) {
      pdfurl =
        environment.apiUrl +
        "reports/radmspdf.php?ln=" +
        ln +
        "&id=" +
        this.accid;
    } else if (flag == 3) {
      pdfurl =
        environment.apiUrl +
        "reports/policefir.php?ln=" +
        ln +
        "&id=" +
        this.accid;
    } else if (flag == 4) {
      pdfurl =
        environment.apiUrl +
        "reports/morthpdf.php?ln=" +
        ln +
        "&id=" +
        this.accid;
    } else if (flag == 5) {
      pdfurl =
        environment.apiUrl + "reports/fir.php?ln=" + ln + "&id=" + this.accid;
    }
    else if (flag == 31) {
      pdfurl =
        environment.apiUrl + "reports/roaddetails.php?ln=" + ln + "&id=" + this.accid;
    }
    else if (flag == 6) {
      pdfurl =
        environment.apiUrl +
        "reports/transport.php?ln=" +
        ln +
        "&id=" +
        this.accid;
    }

    if (this.platform.is("android")) {
      this.downloadAndOpenPdf(pdfurl);
      console.log("mobile :true");
    } else {
      this.openWithSystemBrowser(pdfurl);
      console.log("mobile :false");
    }

    /*
    console.log(pdfurl);
        const options: DocumentViewerOptions = {
          title: 'My PDF'
        }
        
       // this.document.viewDocument('assets/1.pdf', 'application/pdf', options);
    
       this.platform.ready().then(() => {
    
        let options : InAppBrowserOptions = {
            location : 'no',//'yes' Or 'no' 
            hidden : 'no', //Or  'yes'
            clearcache : 'yes',
            clearsessioncache : 'yes',
            zoom : 'yes',//Android only ,shows browser zoom controls 
            hardwareback : 'yes',
            mediaPlaybackRequiresUserAction : 'no',
            shouldPauseOnSuspend : 'no', //Android only 
            closebuttoncaption : 'Close', //iOS only
            disallowoverscroll : 'no', //iOS only 
            toolbar : 'yes', //iOS only 
            enableViewportScale : 'no', //iOS only 
            allowInlineMediaPlayback : 'no',//iOS only 
            presentationstyle : 'pagesheet',//iOS only 
            fullscreen : 'yes',//Windows only    
        };
    
          const browser = this.iab.create(pdfurl,'',options);
    
      });*/
  }

  downloadAndOpenPdf(pdf_url) {
    console.log("PDF_URL", pdf_url);
    this.showLoader();
    let pdfurl = "";
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(pdf_url, `${path}myfile.pdf`).then((entry) => {
      let url = entry.toURL();

      if (this.platform.is("android")) {
        this.hideLoader();
        this.fileOpener.open(url, "application/pdf");
      }
    });
  }

  showLoader() {
    this.loadingController
      .create({
        message: "Please wait loading...",
        spinner: "circles",
      })
      .then((res) => {
        res.present();
      });
  }

  hideLoader() {
    this.loadingController
      .dismiss()
      .then((res) => {
        console.log("Loading dismissed!", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  viewFiles(pdfurl) {
    console.log("Pdf URL", pdfurl);
    // this.fileChooser.open().then((fileuri) => {
    //   this.filePath.resolveNativePath(fileuri).then((filePath) => {
    //     this.returnpath = filePath;
    //     console.log("Size", this.returnpath);
    //     let mimetype = filePath.substring(filePath.lastIndexOf('.') + 1);
    //     console.log("filename", mimetype);

    // this.previewAnyFile.preview(this.returnpath)
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));

    this.previewAnyFile.preview(pdfurl).then(
      () => { },
      (err) => {
        alert(JSON.stringify);
      }
    );
    //   })
    // })
  }

  viewRadmsPDF() {
    let ln = this.selectedLanguage;
    let pdfurl =
      environment.apiUrl + "reports/radms.php?ln=" + ln + "&id=" + this.accid;
    console.log(pdfurl);
    const options: DocumentViewerOptions = {
      title: "My PDF",
    };

    // this.document.viewDocument(pdfurl, 'application/pdf', options)

    this.platform.ready().then(() => {
      let options: InAppBrowserOptions = {
        location: "no", //'yes' Or 'no'
        hidden: "no", //Or  'yes'
        clearcache: "yes",
        clearsessioncache: "yes",
        zoom: "yes", //Android only ,shows browser zoom controls
        hardwareback: "yes",
        mediaPlaybackRequiresUserAction: "no",
        shouldPauseOnSuspend: "no", //Android only
        closebuttoncaption: "Close", //iOS only
        disallowoverscroll: "no", //iOS only
        toolbar: "yes", //iOS only
        enableViewportScale: "no", //iOS only
        allowInlineMediaPlayback: "no", //iOS only
        presentationstyle: "pagesheet", //iOS only
        fullscreen: "yes", //Windows only
      };

      const browser = this.iab.create(pdfurl, "", options);
    });
  }

  viewImg(flag) {
    console.log("imageurl", this.imageurl[flag]);
    let index = -1;
    console.log("flag " + flag);
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].flag == flag) {
        index = i;
        break;
      }
    }
    console.log("flag n" + flag);
    if (this.imageurl[flag] != "") {
      this.imageurl[flag] = "";
      return;
    }

    console.log(flag);
    console.log(this.images[index].label);
    let imgurl =
      this.apiUrl + "accmedia/image.php?id=" + this.accid + "&f=" + flag;
    console.log(imgurl);
    // this.imageurl[flag]=imgurl;
    //alert(this.imageurl[flag]);

    //this.photoViewer.show(imgurl, this.images[flag].label);
    //this.photoViewer.show(imgurl+' 49');
    //this.photoViewer.show(imgurl, this.images[flag].label, {share: false})
    // window.open(imgurl)

    this.platform.ready().then(() => {
      let options: InAppBrowserOptions = {
        location: "no", //'yes' Or 'no'
        hidden: "no", //Or  'yes'
        clearcache: "yes",
        clearsessioncache: "yes",
        zoom: "yes", //Android only ,shows browser zoom controls
        hardwareback: "yes",
        mediaPlaybackRequiresUserAction: "no",
        shouldPauseOnSuspend: "no", //Android only
        closebuttoncaption: "Close", //iOS only
        disallowoverscroll: "no", //iOS only
        toolbar: "yes", //iOS only
        enableViewportScale: "no", //iOS only
        allowInlineMediaPlayback: "no", //iOS only
        presentationstyle: "pagesheet", //iOS only
        fullscreen: "yes", //Windows only
      };

      const browser = this.iab.create(imgurl, "_system", options);
    });
  }

  playVideo(flag) {
    if (this.videourl[flag] != "") {
      this.videourl[flag] = "";
      return;
    }

    let videourl =
      this.apiUrl + "accmedia/video.php?id=" + this.accid + "&f=" + flag;
    this.videourl[flag] = videourl;
    //window.open(videourl);
    console.log(videourl);
    this.VideoPlayer.play(videourl)
      .then(() => {
        console.log("video completed");
      })
      .catch((err) => {
        console.log(err);
      });

    /*
        this.platform.ready().then(() => {
    
          let options : InAppBrowserOptions = {
              location : 'no',//'yes' Or 'no' 
              hidden : 'no', //Or  'yes'
              clearcache : 'yes',
              clearsessioncache : 'yes',
              zoom : 'yes',//Android only ,shows browser zoom controls 
              hardwareback : 'yes',
              mediaPlaybackRequiresUserAction : 'no',
              shouldPauseOnSuspend : 'no', //Android only 
              closebuttoncaption : 'Close', //iOS only
              disallowoverscroll : 'no', //iOS only 
              toolbar : 'yes', //iOS only 
              enableViewportScale : 'no', //iOS only 
              allowInlineMediaPlayback : 'no',//iOS only 
              presentationstyle : 'pagesheet',//iOS only 
              fullscreen : 'yes',//Windows only    
          };
      
            const browser = this.iab.create(videourl,'',options);
    
          });*/
  }

  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes", //Windows only
  };

  public openWithSystemBrowser(url: string) {
    let target = "_system";
    this.iab.create(url, target, this.options);
  }
  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.iab.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.iab.create(url, target, this.options);
  }

  async firEditdetails() {
    this.firNumber = this.data.fir_number;
    const modal = await this.modalctrl.create({
      component: FirComponent,
      componentProps: {
        geninfo: this.data
      }
    });

    modal.onWillDismiss().then((dataReturned) => {
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showGenInfo();
    });
    return await modal.present().then((_) => { });
  }


  updateCCTNSdata(){

    let postDate = {
      mode: "updateCCTNSdata",
      id:this.selacc.accid
    };
    this.api.post("services/cctns.php", postDate).subscribe((data: any) => {
      console.log(data);
    });
  
  }

  procedToeDAR(){
    let postDate = {
      mode: "procedtoedar",
      accid:this.accid
    };
    this.api.post("accview.php", postDate).subscribe((data: any) => {
      
      console.log(data);

      if(data.flag==true){
        this.router.navigate(['/investigation']);
      }

      //this.router.navigate(['/investigation']);

    });

    

  }

  async witnessEdit(i) {
    console.log("ped loop index val", i);
    console.log("ped loop index val", this.witness[i].accident_id);
    const modalped = await this.modalctrl.create({
      component: WitnesseditComponent,
      componentProps: { witnessinfo: this.witness[i] },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      if (dataReturned.data == true) this.showDetails("witness");
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }


  

}

