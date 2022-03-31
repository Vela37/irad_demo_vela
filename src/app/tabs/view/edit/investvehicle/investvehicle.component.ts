import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { model_vehicleinfo } from '../../../../models/model_vehicleinfo';
import { TranslateConfigService } from '../../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { investigationreport_model } from '../../../../models/investigationreport_model';
import { Router } from '@angular/router';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UploadingdocumentComponent } from '../../reportsview/uploadingdocument/uploadingdocument.component';
import { AddfamilyComponent } from '../../../view/edit/addfamily/addfamily.component';
import { AddchildComponent } from '../../../view/edit/addchild/addchild.component';


@Component({
  selector: 'app-investvehicle',
  templateUrl: './investvehicle.component.html',
  styleUrls: ['./investvehicle.component.scss'],
})
export class InvestvehicleComponent implements OnInit {
  
  emailid:any;
  selectedvehicleid:any; 
  km_driven:any; 
  vehicle_driven_by:any; 
  driver_father_name:any; 
  offending_vehicle_spotted:any; 
  
driver_without_supervision:any;  
driver_lapsed_learner_lic:any;  
witness_check:any; 
driver_scientific_report:any;  

vehicle_impounded_police:any;  
driver_mobile_usage:any;
driver_mobile_no:any;  
driver_imei:any;  
previousaccfir:any;  
driver_make_model:any; 
previousacc:any; 
dricashlessTreatment:any; 

driver_license_suspended: any;
bank_name:any;  
acc_holdername:any;  
acc_number:any;  
ifsc_code:any;  
bank_address:any;  
dri_marital_status:any;  
permanent_disability:any;  
permanent_disability_details:any;  
sole_earning_member:any;  

treatment_details_of_deceased:any;  
natureofinjury:any;  
injury_type:any;  
hospitaldetails:any;  
driver_date_of_death:any; 
surgerydetails:any; 

expense_details_of_deceased:any;  
dri_injured_or_not: boolean = true; 
permit_fitness_verified: boolean = true;
permit_fitness_verified_reasons ;


owner_save_flag:any=0;  
driver_save_flag:any=0;


dri_employed_or_not: boolean = true; 
dri_name_add_employer:any;  
driver_income:any;  
dri_assessed_to_income_tax: boolean = true;

dri_cashless_treatment: boolean = true;  
dri_loss_to_property:any;  
dri_value_of_loss:any;  
dri_additional_info:any;  
dri_relief_amount:any;  

driver_remainder_date:any; 

victim_remainder_date:any;

  veh_ref_id: any;
  owner_mobile_no: any;
  recdata:any;
  patient:any;
  owner_occupation: any;
  owner_father_name:  any;
  owner_veh_type:  any;
  owner_report_acc: any;
  dri_license_authority: any;
  license_verfied: any;
  
  owner_report_dt: any;
  owner_details_pre_ins: any;
  owner_ins_claims:  any;
  owner_driver_ran_ownerproduce: any;
  owner_claimants_settlement:  any;
  owner_mact: any;

  ln: any;
  schoolName: any;
  options1: any;
  vehicleinfo: model_vehicleinfo = new model_vehicleinfo();
  docinfo: investigationreport_model = new investigationreport_model();
  selectedLanguage: string; params: any;
  isDisabled: boolean = false;
  mother_name:any;
  guardian_name:any;
  investofficernumber:any;
  lossOfproperty:any;
  segflag: any = 0;
  postdata = { 'mode': '', 'accid': '' };
  vehiclecombo = true; 
  //accidentData = new Array();
  accidentData:any;
  selacc: any;
  accid: any;
  vehno = { 'vehlist': '' };
  addfamilybtn: any = 0;
  driverFamily: any;
  driverFamilyval: any;
  vehicledata = {
    'acc_id': '', 'owner_veh_type': '', 'owner_report_acc': true, 'owner_report_dt': '',
    'owner_details_pre_ins': '', 'owner_ins_claims': '',
    'owner_veh_gps': true, 'owner_relevant_details_provided': false,
    'owner_veh_emergencybtn': false, 'owner_emergencybtn_works': true,
    'owner_driver_ran_ownerproduce': true, 'owner_claimants_settlement': true, 'owner_mact': true,

    'owner_regveh_doc': false, 'owner_ins_offending_doc': true,
    'owner_permit_doc': true, 'owner_fitnesscertificate_doc': true,
    'owner_proof_owner_doc': false, 'owner_photo_specimen_sign_doc': false,

    'driver_without_supervision': '', 'driver_lapsed_learner_lic': '', 'driver_alcohol_usage': true,
    'driver_scientific_report': false, 'driver_mobile_usage': true, 'driver_mobile_no': '', 'driver_imei': '', 'driver_make_model': '',
    'driver_involved_inacc': false, 'driver_firno': '', 'driver_district': '', 'driver_policestation': '', 'driver_education': '',
    'driver_income': '', 'driver_license_suspended': false,
    'driver_victim_disposition': '',

    'driver_lic_doc': false, 'driver_proof_identify_doc': true,
    'driver_photo_specimen_sign_doc': true, 'driver_proof_employment_doc': true,
    'driver_legal_heir_doc': false, 'driver_post_moterm_doc': false,
    'driver_death_cert_doc': true, 'driver_proof_of_deceased_doc': true,
    'driver_medical_legal_doc': false, 'driver_multi_angle_photos_doc': false,

    'vehicle_driven_by': '',
    'permit_fitness_verified_reasons': ''

  }

  savebtn: boolean = true;
  vehicle: any; driver: any;
  addlosses: any = 0;
  
  lossdescription=[
    {
      'title':'Income of the deceased',
      'desc':''
    },{
      'title':'Future prospects',
      'desc':''
    },{
      'title':'Medical expenses',
      'desc':''      
    },{
      'title':'Funeral expenses',
      'desc':''
    },{
      'title':'Loss of consortium',
      'desc':''
    },{
      'title':'Loss of love and affection',
      'desc':''      
    },{
      'title':'Loss of estate',
      'desc':''
    },{
      'title':'Expenditure incurred on treatment,conveyance,special diet,attendant etc.',
      'desc':''
    },{
      'title':'If treatment is still continuing,give the estimate of expenditure likely to be incurred on future treatment',
      'desc':''      
    },{
      'title':'Loss of income',
      'desc':''
    },{
      'title':'Any other loss which may require any special tratment or aid to the injured for rest of his life',
      'desc':''
    },{
      'title':'Percentage of disability assessed and nature of disability as permanent or temporary',
      'desc':''      
    },{
      'title':'Pain and suffering',
      'desc':''
    },{
      'title':'Loss of amenities of life, inconvenience,hardships,disappointment etc',
      'desc':''
    },{
      'title':'Disfiguration',
      'desc':''      
    },{
      'title':'Loss of marriage prospects',
      'desc':''
    },{
      'title':'Loss of Reputation',
      'desc':''
    },{
      'title':'Loss of Earning capacity',
      'desc':''
    },{
      'title':'Value of loss/damage to the property',
      'desc':''      
    },{
      'title':'Compensation claimed',
      'desc':''
    },{
      'title':'Any other pecuniary loss/damage',
      'desc':''      
    },{
      'title':'Any other non-pecuniary loss/damage',
      'desc':''
    }
  ]

  minor_child_details={
    'name':'','age':'','sex':'','caste':'',
    'father_name':'','mother_name':'','guardian_name':'','family_income':'',
    'permanent_address':'','present_address':'','contact_no':'',
    'child_disabled':'','child_disabled_details':'',  
    'economic_condition':'','level_of_education':'',
    'ews_quota':'','going_to_school_or_not':'',
    'school_region':'','school_syllabus':'',
    'private_management':'','monthly_school_fee':'',
    'annual_school_fee':'','pvt_tution_fee':'',
    'other_fee':'','type_of_skill_development':'',
    'cost_of_skill_development':'',
    'any_injury':'','injury_details':'','loss_of_body_part':'','psychological_counselling_required':'','long_term_support_required':'',
    'cost_immediate_treatment':'',
    'cost_longterm_treatment':'',
    'diet_nutrition_expenses':''
  }

  updateData: any = 0;
  report_details={
    'veh_no':'',
    'veh_ref':'',
    'veh_id':'',
    'driver_id':'',
    'mode':'veh'
  }


  constructor(private api: ApiService, private translateConfigService: TranslateConfigService, private modalctrl: ModalController, private route: Router, 
    public navCtrl: NavController,private toastController: ToastController,) {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln = localStorage.getItem('ln');


    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    this.vehicleinfo.accid = this.accid;

    console.log("entered investigation passenger", this.accid);
  }
  occupation:any;
  ngOnInit() {
    this.checkvechilecount();
    this. legalloadcourt()



  }
  legalloadcourt(){
    let postDate={
      lang:'en',
      tableArrayName:['occupation']
   }
    this.api.darsave('user/master',postDate).subscribe((data: any)=>{

      this.occupation=data.occupation;
      console.log('<---Occupation ',data.legaltype)
     });
  
}
  async goToUploadDoc(flag) {
    console.log("Flag sending to report")
    this.modalctrl.dismiss();

    const modal = await this.modalctrl.create({
        component:UploadingdocumentComponent,
        componentProps: {'flagId':  flag }
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }


  goToReport(flag){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        report_flag:JSON.stringify(flag),
        report_details: JSON.stringify(this.report_details)
      }
  };

  console.log("Sending",navigationExtras);
  this.navCtrl.navigateForward(['reportsview'], navigationExtras);
  this.modalctrl.dismiss();
    //this.router.navigate(['/reportsview',this.veh_ref_no]);
  }
  
  

  setVehicledetails(veh){
    console.log("Event recieving val",veh);
       
    console.log("Veh Details ",veh.id);
    this.report_details.veh_id=veh.id;
    this.report_details.veh_no=veh.vehicle_reg_no;
    this.vehicleinfo.vehRegNo=veh.vehicle_reg_no;

    this.vehicleinfo.driverrefId = veh.driverid;
    console.log("EVENT Assigned ",this.report_details);   

  }
 
  gettingDriverDetails(event: any) {
   
    //alert(event.target.value);
    console.log("EVENT", event.target.value);
    //
    let veh=event.target.value;
    //alert(ddd.id);
    this.selectedvehicleid=veh.id
    this.veh_ref_id=veh.id;
    this.getDriverDetails();
    this.setVehicledetails(event.target.value);
    this.getVehicleData();
    this.getFamily();
  }

  addLosses() {
    this.addlosses = 1;
  }

  cancelloss() {
    this.addlosses = 0;
  }

  saveLoss() {
    this.addlosses = 0;
    console.log(this.lossdescription);
    console.log("Driver Ref ID", this.vehicleinfo.driverrefId);
    let postDate = {
      accid: this.vehicleinfo.accid,
      ref_id: this.vehicleinfo.driverrefId,
      whoseloss: "Vehicle",
      loss_description: this.lossdescription
    }

    this.api.darsave('dar/familylosses', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');

      this.presentToast("Family losses Data saved !");
      //this.modalctrl.dismiss(true);
    });

  }


  
  
 getDriverDetails () {
    let postDate = {
      mode: 'vehicle',
      ln: this.selectedLanguage, 
      id: this.accid
    }
    this.api.post('accview', postDate).subscribe((data: any) => {
      console.log(data);

      this.vehicle = data.data;  // console.log('vehicle data ',this.vehicle);

      for (let i = 0; i < data.data.length; i++) {
        this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
        this.driver = this.vehicle[i].driver;
        console.log("Driver Details", this.driver);

        console.log("Driver Id", this.driver.vehicle_id);
        if(this.driver.vehicle_id==this.report_details.veh_id){
          // this.vehicleinfo.driverrefId = this.driver.id;
          this.report_details.veh_ref=this.driver.id;
          this.report_details.driver_id=this.driver.id;
          this.vehicleinfo.drivername = this.driver.ser_name;
        }
      }
      

      console.log('vehicle Driver Ref ID ', this.vehicleinfo.driverrefId);

    });

  }

  addfamily() {
    this.addfamilybtn = 1;
  }

  getFamily() {
    let vehicle = {
      'acc_id': '',
      'type': 'Vehicle'
    }
    vehicle.acc_id = this.accid;

    let postDate = {
      mode: 'investvehicle',
      general: vehicle,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getfamily', postDate).subscribe((data: any) => {
      console.log(data);
      this.driverFamily = data;
      console.log('updated');

    //  this.presentToast("Vehicle driver family Data fetched !");
      //this.modalctrl.dismiss(true);
    });
  }

  cancelfamily() {
    this.addfamilybtn = 0;

  }

  savefamily_old() {
    this.addfamilybtn = 0;

    let postDate = {
      vehicle: this.vehicleinfo
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/driverfamily', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');


      this.presentToast("Vehicle driver family Data saved !");
      //this.modalctrl.dismiss(true);
    });

  }

  getVehicleData() {

  //this.owner_save_flag=2;
  //this.driver_save_flag=2;
    // alert("hiii");
    let vehicle = {
      'acc_id': '',
      'ref_id': '',
      'veh_no': ''
    }
    vehicle.acc_id = this.accid;
    vehicle.ref_id = this.vehicleinfo.driverrefId;
    vehicle.veh_no =this.vehicleinfo.vehRegNo;
    console.log("RefId Pass", vehicle.ref_id);
    console.log("Get Vehicle", vehicle);

    let postDate = {
      mode: 'investpassenger',
      general: vehicle,
      //pedestriandoc: this.docinfo
    }
    this.driver_save_flag=0;
    this.owner_save_flag= 0;

    let loadd={
      mode:'getdarvehicle',
      accid :this.accid,
      ref_id : this.selectedvehicleid
    }

    console.log("-----post datat---->",loadd);
  //  return false;
    this.api.post('datas', loadd).subscribe((succ: any) => {
      
      this.recdata=succ.darvehicle; 
      this.patient=succ.patient; 
      console.log('---succ.patient------>',succ.patient);
      
      if(this.recdata && this.recdata.driver_save_flag)
      {
            this.driver_save_flag= this.recdata.driver_save_flag;
      }
      if(this.recdata && this.recdata.owner_save_flag)
      {
            this.owner_save_flag= this.recdata.owner_save_flag;
      }
      if(this.patient && this.patient.hpaddress!=null)
      {

        for (let i = 0; i < this.patient.length; i++) 

      {
     

          this.patient[i].patientdetails = JSON.parse(this.patient[i].patientdetails);
          
      }
      this.patient.patientdetails=JSON.parse(this.patient.patientdetails);
      
      this.treatment_details_of_deceased=this.patient.patientdetails.discharge_treatement+","+this.patient.patientdetails.treatment;
      this.hospitaldetails=this.patient.hpname+","+this.patient.hpaddress;
      this.natureofinjury=this.patient.patientdetails.get_natureofinjury;
      this.injury_type=this.patient.patientdetails.get_injury_type;
      }

//alert( this.driver_save_flag);
      /*  this.owner_mobile_no= this.recdata.owner_mobile_no;
      this.owner_occupation= this.recdata.owner_occupation;
      this.owner_father_name = this.recdata.owner_father_name;
      this.owner_veh_type=this.recdata.owner_veh_type;
      this.owner_report_acc=this.recdata.owner_report_acc;
      this.owner_report_dt=this.recdata.owner_report_dt;
      this.owner_details_pre_ins=this.recdata.owner_details_pre_ins;
      this.owner_ins_claims=this.recdata.owner_ins_claims;
      this.owner_driver_ran_ownerproduce=this.recdata.owner_driver_ran_ownerproduce;
      this.owner_claimants_settlement=this.recdata.owner_claimants_settlement;
      this.owner_mact=this.recdata.owner_mact;
      
      
      this.km_driven=this.recdata.km_driven;
      this.offending_vehicle_spotted=this.recdata.offending_vehicle_spotted;
      this.driver_father_name=this.recdata.driver_father_name;
      this.driver_without_supervision=this.recdata.driver_without_supervision;
      this.driver_lapsed_learner_lic= this.recdata.driver_lapsed_learner_lic;
      this.vehicle_impounded_police= this.recdata.vehicle_impounded_police;
      this.driver_imei=this.recdata.driver_imei;
      this.driver_make_model= this.recdata.driver_make_model;
      this.bank_name=this.recdata.bank_name;
      this.acc_holdername=this.recdata.acc_holdername;
      this.acc_number= this.recdata.acc_number;
      this.ifsc_code= this.recdata.ifsc_code;
      this.dri_marital_status=this.recdata.dri_marital_status;
      this.permanent_disability= this.recdata.permanent_disability;
      this.permanent_disability_details= this.recdata.permanent_disability_details;
      this.driver_income= this.recdata.driver_income;
      this.dri_loss_to_property=this.recdata.dri_loss_to_property;
      this.dri_additional_info= this.recdata.dri_additional_info;
      this.dri_relief_amount=this.recdata.dri_relief_amount;
*/

    });
    return false;

    this.api.darsave('dar/getvehicle', postDate).subscribe((data: any) => {
    //  this.vehicleinfo=null;
      console.log(data);
      console.log('updated');
      if (data != null) {
        this.updateData = 1;
        if (data.submitCheck == true) {
          console.log("Data submit2", data.submitCheck);
          this.isDisabled = true;
          this.savebtn = false;
        }
        console.log('----------->',data);
 
      //  alert(data.ownerFathername);
        this.veh_ref_id=data.vehrefId;      
        this.owner_mobile_no= data.ownermobileno;
        this.owner_occupation= data.ownerOccupation;
    //    this.owner_Father_name = data.ownerFathername;
        this.owner_veh_type=data.ownerVehtype;
        this.owner_report_acc=data.ownerReportacc;
        this.owner_report_dt=data.ownerReportdt;
        this.owner_details_pre_ins=data.ownerDetailspreins;
        this.owner_ins_claims=data.ownerInsclaims;
        this.owner_driver_ran_ownerproduce=data.ownerproducedriver;
        this.owner_claimants_settlement=data.vehamountpaidcompensation;
        this.owner_mact=data.vehmactcase;

        
      //  this.vehicleinfo.owner_mobile_no = data.ownermobileno;
     //   this.vehicleinfo.vehusetype = data.ownerVehtype;
      //  this.vehicleinfo.vehinsuranceinform = data.ownerReportacc;
        this.vehicleinfo.vehinsuranceinformdate = data.ownerReportdt;
        this.vehicleinfo.vehinsurancepolicy = data.ownerDetailspreins;
        this.vehicleinfo.vehclaimsmade = data.ownerInsclaims;
        // this.vehicleinfo.vehwithgps = data.ownerVehgps;
        // this.vehicleinfo.vehwithgpsinformedpolice = data.ownerRelevantdetailsprovided;
        // this.vehicleinfo.vehemergencybtn = data.ownerVehemergencybtn;
        // this.vehicleinfo.vehemergencybtnworking = data.ownerEmergencybtnworks;
        //this.vehicleinfo.ownerproducedriver = data.ownerDriverranownerproduce;
        //this.vehicleinfo.vehamountpaidcompensation = data.ownerClaimantssettlement;

        this.vehicleinfo.expenseDetailsofdeceased=data.expenseDetailsofdeceased;
        this.vehicleinfo.treatmentDetailsofdeceased=data.treatmentDetailsofdeceased;
        this.vehicleinfo.permitfitnessVerifiedreasons=data.permitfitnessVerifiedreasons;
        this.vehicleinfo.ownerReportedacctoInsdt=data.ownerReportedacctoInsdt;
        this.vehicleinfo.victimType=data.victimType;
        this.vehicleinfo.driver_remainder_date=data.driverRemainderdate;
        this.vehicleinfo.owner_remainder_date=data.ownerRemainderdate;
        this.vehicleinfo.victim_remainder_date=data.victimRemainderdate;

        this.vehicleinfo.permanentDisabilitydetails=data.permanentDisabilitydetails;
        this.vehicleinfo.permanentDisability=data.permanentDisability;
  
        if(data.soleEarningmember==true){
          console.log("soleEarningmember",true);
          this.vehicleinfo.soleEarningmember = "true";
        }else{
          console.log("soleEarningmember",false);
          this.vehicleinfo.soleEarningmember = "false";
        }

        if(data.driInjuredornot==true){
          console.log("driInjuredornot",true);
          this.vehicleinfo.driInjuredornot = "true";
        }else{
          console.log("driInjuredornot",false);
          this.vehicleinfo.driInjuredornot = "false";
        }

        if(data.permitfitnessVerified==true){
          console.log("permitfitnessVerified",true);
          this.vehicleinfo.permitfitnessVerified = "true";
        }else{
          console.log("permitfitnessVerified",false);
          this.vehicleinfo.permitfitnessVerified = "false";
        }

        
        if (data.ownerReportacc == true) {
          console.log("val1", true);
          this.vehicleinfo.vehinsuranceinform = "true";
        } else {
          console.log("val1", false);
          this.vehicleinfo.vehinsuranceinform = "false";
        }

        if (data.ownerVehgps == true) {
          console.log("val2", true);
          this.vehicleinfo.vehwithgps = "true";
        } else {
          console.log("val2", false);
          this.vehicleinfo.vehwithgps = "false";
        }

        if (data.ownerRelevantdetailsprovided == true) {
          console.log("val3", true);
          this.vehicleinfo.vehwithgpsinformedpolice = "true";
        } else {
          console.log("val3", false);
          this.vehicleinfo.vehwithgpsinformedpolice = "false";
        }

        if (data.ownerVehemergencybtn == true) {
          console.log("val4", true);
          this.vehicleinfo.vehemergencybtn = "true";
        } else {
          console.log("val4", false);
          this.vehicleinfo.vehemergencybtn = "false";
        }

        if (data.ownerEmergencybtnworks == true) {
          console.log("val5", true);
          this.vehicleinfo.vehemergencybtnworking = "true";
        } else {
          console.log("val5", false);
          this.vehicleinfo.vehemergencybtnworking = "false";
        }

        if (data.ownerDriverranownerproduce == true) {
          console.log("val6", true);
          this.vehicleinfo.ownerproducedriver = "true";
        } else {
          console.log("val6", false);
          this.vehicleinfo.ownerproducedriver = "false";
        }

        if (data.ownerClaimantssettlement == true) {
          console.log("val7", true);
          this.vehicleinfo.vehamountpaidcompensation = "true";
        } else {
          console.log("val1", false);
          this.vehicleinfo.vehamountpaidcompensation = "false";
        }
        console.log("mact", data.ownerMact);
        if (data.ownerMact == true) {
          console.log("val8", true);
          this.vehicleinfo.vehmactcase = "true";
        } else {
          console.log("val1", false);
          this.vehicleinfo.vehmactcase = "false";
        }

        this.vehicleinfo.llrsupervision = data.driverWithoutsupervision;
        this.vehicleinfo.lapsedlicense = data.driverLapsedlearnerlic;
        //this.vehicleinfo.driveralocohol = data.driverAlcoholusage;
        //this.vehicleinfo.scientificreport = data.driverScientificreport;
        //this.vehicleinfo.mobileatacc = data.driverMobileusage;
        this.vehicleinfo.drimobile = data.driverMobileno;
        this.vehicleinfo.drimobileimei = data.driverImei;
        this.vehicleinfo.drimobilemake = data.driverMakemodel;
        //this.vehicleinfo.previousacc = data.driverInvolved_inacc;
        this.vehicleinfo.previousaccfir = data.driverFirno;
        this.vehicleinfo.previousaccdistrict = data.driverDistrict;
        this.vehicleinfo.previousaccps = data.driverPolicestation;
        this.vehicleinfo.drivereducation = data.driverEducation;
        this.vehicleinfo.driverincome = data.driverIncome;
        //this.vehicleinfo.licensesuspended = data.driverLicensesuspended;
        this.vehicleinfo.victimdisposition = data.driverVictimdisposition;

        if (data.driverAlcoholusage == true) {
          this.vehicleinfo.driveralocohol = "true";
        } else {
          this.vehicleinfo.driveralocohol = "false";
        }

        if (data.driverScientificreport == true) {
          this.vehicleinfo.scientificreport = "true";
        } else {
          this.vehicleinfo.scientificreport = "false";
        }

        if (data.driverMobileusage == true) {
          this.vehicleinfo.mobileatacc = "true";
        } else {
          this.vehicleinfo.mobileatacc = "false";
        }

        if (data.driverInvolved_inacc == true) {
          this.vehicleinfo.previousacc = "true";
        } else {
          this.vehicleinfo.previousacc = "false";
        }

        if (data.driverLicensesuspended == true) {
          this.vehicleinfo.licensesuspended = "true";
        } else {
          this.vehicleinfo.licensesuspended = "false";
        }

        this.vehicleinfo.vehdrivenby = data.vehicleDrivenby;

        this.vehicleinfo.vehinspectionvehicle = data.vehInspectionvehicle;
        this.vehicleinfo.vehinspectionreport = data.vehInspectionreport;
        this.vehicleinfo.vehlocationinspection = data.vehLocationinspection;
        this.vehicleinfo.vehpainttransfer = data.vehPainttransfer;
        this.vehicleinfo.vehcolorpainttransfer = data.vehColorpainttransfer;
        this.vehicleinfo.vehlocationpainttransfer1 = data.vehLocationpainttransfer1;
        this.vehicleinfo.vehtypescratch = data.vehTypescratch;
        this.vehicleinfo.vehlocationpainttransfer2 = data.vehLocationpainttransfer2;
        this.vehicleinfo.vehcngkit = data.vehCngkit;
        this.vehicleinfo.vehchangevehbody = data.vehChangevehbody;
        this.vehicleinfo.vehtyrecondition = data.vehTyrecondition;
        this.vehicleinfo.vehhorninstalled = data.vehHorninstalled;
        this.vehicleinfo.vehbrakelightsfunctional = data.vehBrakelightsfunctional;
        this.vehicleinfo.vehfaultynoplate = data.vehFaultynoplate;
        this.vehicleinfo.vehfittedairbags = data.vehFittedairbags;
        this.vehicleinfo.vehairbagsdeployed = data.vehAirbagsdeployed;
        this.vehicleinfo.vehairbagreason = data.vehAirbagreason;
        this.vehicleinfo.vehtintedglass = data.vehTintedglass;
        this.vehicleinfo.vehspeedlimiter = data.vehSpeedlimiter;
        this.vehicleinfo.vehspeedlimiterfunctional = data.vehSpeedlimiterfunctional;
        this.vehicleinfo.vehrearparkingsensor = data.vehRearparkingsensor;
        this.vehicleinfo.vehrearparkingsensorworks = data.vehRearparkingsensorworks;
        this.vehicleinfo.vehrearparkingsensorreason = data.vehrearparkingsensorreason;
        this.vehicleinfo.vehtrackingdevices = data.vehTrackingdevices;
        this.vehicleinfo.vehtrackingdevicesworks = data.vehTrackingdevicesworks;
        this.vehicleinfo.vehdescriptiondamage = data.vehDescriptiondamage;
        this.vehicleinfo.vehsteercond = data.vehSteercond;
        this.vehicleinfo.vehwheelcond = data.vehWheelcond;
        this.vehicleinfo.vehwipercond = data.vehWipercond;
        this.vehicleinfo.vehwindowcond = data.vehWindowcond;
        this.vehicleinfo.vehmirrorcond = data.vehMirrorcond;
        this.vehicleinfo.vehcondofvehicleextra = data.vehCondofvehicleextra;
        this.vehicleinfo.bankName = data.bankName;
        this.vehicleinfo.accHoldername = data.accHoldername;
        this.vehicleinfo.accNumber = data.accNumber;
        this.vehicleinfo.ifscCode = data.ifscCode;
        this.vehicleinfo.bankAddress = data.bankAddress;

        this.vehicleinfo.drimaritalStatus = data.driMaritalstatus;
        this.vehicleinfo.drioccupationName = data.driOccupationname;
        this.vehicleinfo.driemployedOrnot = data.driEmployedornot;
        this.vehicleinfo.drinameAddressemployer = data.driNameaddressemployer;
        this.vehicleinfo.driassessedToincometax = data.driAssessedtoincometax;
        this.vehicleinfo.drireimbursementMedicalexpense = data.driReimbursementmedicalexpense;
        this.vehicleinfo.dricashlessTreatment = data.driCashlesstreatment;
        this.vehicleinfo.drilossToproperty = data.driLosstoproperty;
        this.vehicleinfo.drivalueOfloss = data.driValueofloss;
        this.vehicleinfo.driadditionalInfo = data.driAdditionalinfo;
        this.vehicleinfo.drireliefAmount = data.driReliefamount;
        
        this.vehicleinfo.vehicle_impounded_police = data.vehicleImpoundedpolice;
        this.vehicleinfo.offending_vehicle_spotted = data.offendingVehiclespotted;

        
        this.vehicleinfo.ownerfather = data.ownerFathername;
        this.vehicleinfo.driverfather = data.driverFathername;
        this.vehicleinfo.ownerOccupation = data.ownerOccupation;
        this.vehicleinfo.driLicenseauthority = data.driLicenseauthority;
        this.vehicleinfo.driLicensevalidity = data.driLicensevalidity;
        this.vehicleinfo.kmDriven = data.kmDriven;
        ///////////////////////////////////////////////////////////////////////////////
        // if(data.driverlicensetype == "")
        console.log("driverlicensetype",data.driverlicensetype);
        this.vehicleinfo.license = data.driverlicensetype;


        if (data.driEmployedornot == true) {
          console.log("val1", true);
          this.vehicleinfo.driemployedOrnot = "true";
        } else {
          console.log("val1", false);
          this.vehicleinfo.driemployedOrnot = "false";
        }

        if (data.driAssessedtoincometax == true) {
          console.log("val2", true);
          this.vehicleinfo.driassessedToincometax = "true";
        } else {
          console.log("val2", false);
          this.vehicleinfo.driassessedToincometax = "false";
        }

        if (data.driReimbursementmedicalexpense == true) {
          console.log("val3", true);
          this.vehicleinfo.drireimbursementMedicalexpense = "true";
        } else {
          console.log("val3", false);
          this.vehicleinfo.drireimbursementMedicalexpense = "false";
        }

        if (data.driCashlesstreatment == true) {
          console.log("val4", true);
          this.vehicleinfo.dricashlessTreatment = "true";
        } else {
          console.log("val4", false);
          this.vehicleinfo.dricashlessTreatment = "false";
        }

        if (data.victimOrNot == true) {
          console.log("witnesscheck", true);
          this.vehicleinfo.witnesscheck = "true";
        } else {
          console.log("witnesscheck", false);
          this.vehicleinfo.witnesscheck = "false";
        }


        this.presentToast("Vehicle Data fetched !");
      }else{
        this.updateData=0;
        console.log("updateData",this.updateData);
      }
    });

    let load={
      mode:'getdarvehicle',
      vehicle :this.accid,
      ref_id : this.vehicleinfo.driverrefId
    }
    this.api.post('datas', load).subscribe((succ: any) => {
      
//      alert("123456789");
   // console.log('udhayay--->',succ);
      this.recdata=succ.darvehicle;
 //alert(this.recdata.owner_father_name);
 //     alert(data.owner_father_name);
 
      this.veh_ref_id=this.recdata.veh_ref_id;      
      this.owner_mobile_no= this.recdata.owner_mobile_no;
      this.owner_occupation= this.recdata.owner_occupation;
      this.owner_father_name = this.recdata.owner_father_name;
      this.owner_veh_type=this.recdata.owner_veh_type;
      this.owner_report_acc=this.recdata.owner_report_acc;
      this.owner_report_dt=this.recdata.owner_report_dt;
      this.owner_details_pre_ins=this.recdata.owner_details_pre_ins;
      this.owner_ins_claims=this.recdata.owner_ins_claims;
      this.owner_driver_ran_ownerproduce=this.recdata.owner_driver_ran_ownerproduce;
      this.owner_claimants_settlement=this.recdata.owner_claimants_settlement;
      this.owner_mact=this.recdata.owner_mact;


    });
  }

  savingFamilydetails(){
    this.savefamily();
    if(this.vehicleinfo.famAge<=18){
      this.saveMinorChilddetails();
    }
    
  }

  savefamily(){
    this.addfamilybtn=0;

    let postDate = {
      familydetails: this.vehicleinfo,
      type:"Vehicle",
      ref_id:this.vehicleinfo.driverrefId

      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/familydetails', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      this.presentToast("Familydetails Data saved for driver !");
      //this.modalctrl.dismiss(true);
    });

  }

  saveMinorChilddetails(){
    this.addfamilybtn=0;
    this.minor_child_details.name=this.vehicleinfo.famName
    this.minor_child_details.age=this.vehicleinfo.famAge
    this.minor_child_details.sex=this.vehicleinfo.famGender

    console.log(this.lossdescription);
    let postDate = {
      accid: this.vehicleinfo.accid,
      victimid:this.vehicleinfo.driverrefId,
      whoseChild:"Pedestrian",
      minorchilddetails:this.minor_child_details
    }

    this.api.darsave('dar/minorchild', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');

      this.presentToast("Minor child details Data saved !");
      //this.modalctrl.dismiss(true);
    });

  }

  

  checkvechilecount() {
    this.postdata.mode = 'dar_vehicle';
    this.postdata.accid = this.accid;
    this.api.post('datas', this.postdata).subscribe((data: any) => {
      this.vehiclecombo=false;
      this.accidentData=data.dar_vehicle;
  });
  }


  public findremaining(postdata: any) {
    return this.api.post('pending', postdata);

  }

  public viewVehOwner() {
    console.log("Vehicle Owner");
    this.segflag = 1;
  }

  public viewVehDriver() {
    console.log("Vehicle Driver");
    this.segflag = 2;
  }
/*
  public viewVehicle() {
    console.log("Vehicle Driver");
    this.segflag = 3;
  }
  */

  public closeModal() {
    this.modalctrl.dismiss();
  }

  saveModal(flag) {
    if (flag == "0") {

      this.vehicleinfo.submitCheck = false;
      console.log("0", this.vehicleinfo.submitCheck);
    } else {
      console.log("1")
      this.vehicleinfo.submitCheck = true;
      this.savebtn = false;
      console.log("1", this.vehicleinfo.submitCheck);

    }
    if (this.vehicleinfo.vehinsuranceinform == "true") {
      this.vehicleinfo.vehinsuranceinform = true;
    } else {
      this.vehicleinfo.vehinsuranceinform = false;
    }
    if (this.vehicleinfo.vehwithgps == "true") {
      this.vehicleinfo.vehwithgps = true;
    } else {
      this.vehicleinfo.vehwithgps = false;
    }

    if (this.vehicleinfo.vehwithgpsinformedpolice == "true") {
      this.vehicleinfo.vehwithgpsinformedpolice = true;
    } else {
      this.vehicleinfo.vehwithgpsinformedpolice = false;
    }
    if (this.vehicleinfo.vehemergencybtn == "true") {
      this.vehicleinfo.vehemergencybtn = true;
    } else {
      this.vehicleinfo.vehemergencybtn = false;

    }
    if (this.vehicleinfo.vehemergencybtnworking == "true") {
      this.vehicleinfo.vehemergencybtnworking = true;
    } else {
      this.vehicleinfo.vehemergencybtnworking = false;

    }

    if (this.vehicleinfo.ownerproducedriver == "true") {
      this.vehicleinfo.ownerproducedriver = true;

    } else {
      this.vehicleinfo.ownerproducedriver = false;

    }

    if (this.vehicleinfo.vehamountpaidcompensation == "true") {
      this.vehicleinfo.vehamountpaidcompensation = true;
    } else {
      this.vehicleinfo.vehamountpaidcompensation = false;

    }

    if (this.vehicleinfo.vehmactcase == "true") {
      this.vehicleinfo.vehmactcase = true;
    } else {
      this.vehicleinfo.vehmactcase = false;

    }
    if (this.vehicleinfo.driveralocohol == "true") {
      this.vehicleinfo.driveralocohol = true;
    } else {
      this.vehicleinfo.driveralocohol = false;

    }

    if (this.vehicleinfo.scientificreport == "true") {
      this.vehicleinfo.scientificreport = true;
    } else {
      this.vehicleinfo.scientificreport = false;

    }

    if (this.vehicleinfo.mobileatacc == "true") {
      this.vehicleinfo.mobileatacc = true;
    } else {
      this.vehicleinfo.mobileatacc = false;

    }

    if (this.vehicleinfo.previousacc == "true") {
      this.vehicleinfo.previousacc = true;
    } else {
      this.vehicleinfo.previousacc = false;

    }

    if (this.vehicleinfo.licensesuspended == "true") {
      this.vehicleinfo.licensesuspended = true;
    } else {
      this.vehicleinfo.licensesuspended = false;

    }

    if (this.docinfo.witnesscheck == "true") {
      this.docinfo.witnesscheck = true;
    } else {
      this.docinfo.witnesscheck = false;

    }

    if (this.vehicleinfo.driemployedOrnot == 'true') {
      console.log("employedOrnot true");
      this.vehicleinfo.driemployedOrnot = true;
    } else {
      console.log("employedornot false");
      this.vehicleinfo.driemployedOrnot = false;
    }

    if (this.vehicleinfo.driassessedToincometax == 'true') {
      console.log("assessedToincometax true");
      this.vehicleinfo.driassessedToincometax = true;
    } else {
      console.log("pedestrianinfo false");
      this.vehicleinfo.driassessedToincometax = false;
    }

    if (this.vehicleinfo.drireimbursementMedicalexpense == 'true') {
      console.log("reimbursementMedicalexpense true");
      this.vehicleinfo.drireimbursementMedicalexpense = true;
    } else {
      console.log("reimbursementMedicalexpense false");
      this.vehicleinfo.drireimbursementMedicalexpense = false;
    }

    if (this.vehicleinfo.dricashlessTreatment == 'true') {
      console.log("cashlessTreatment true");
      this.vehicleinfo.dricashlessTreatment = true;
    } else {
      console.log("cashlessTreatment false");
      this.vehicleinfo.dricashlessTreatment = false;
    }

    /////////////////////////////////////////
    if (this.vehicleinfo.soleEarningmember == 'true') {
      console.log("soleEarningmember true");
      this.vehicleinfo.soleEarningmember = true;
    } else {
      console.log("soleEarningmember false");
      this.vehicleinfo.soleEarningmember = false;
    }

    if (this.vehicleinfo.driInjuredornot == 'true') {
      console.log("driInjuredornot true");
      this.vehicleinfo.driInjuredornot = true;
    } else {
      console.log("driInjuredornot false");
      this.vehicleinfo.driInjuredornot = false;
    }

    if (this.vehicleinfo.permitfitnessVerified == 'true') {
      console.log("permitfitnessVerified true");
      this.vehicleinfo.permitfitnessVerified = true;
    } else {
      console.log("permitfitnessVerified false");
      this.vehicleinfo.permitfitnessVerified = false;
    }

    if (this.vehicleinfo.license == 'Others') {
      console.log("License others");
      this.vehicleinfo.license = this.vehicleinfo.otherslicense;
    }

    console.log("Marital Status", this.vehicleinfo.drimaritalStatus);

    this.vehicleinfo.updateData=this.updateData;
    console.log("updateData",this.vehicleinfo.updateData);

    let postDate = {
      vehicle: this.vehicleinfo,
      vehicledoc: this.docinfo,
      vehicleno: this.report_details.veh_id,
    } 

    console.log("posted", postDate);


    this.api.darsave('dar/vehicle', postDate).subscribe((data: any) => {
      console.log("DAta", data);
      console.log('updated');


      this.presentToast("Vehicle data saved Successfully !");
      this.modalctrl.dismiss(true);
    });


    // let postDate = {
    //   mode: 'investvehicle',
    //   vehicle: this.vehicleinfo,
    //   pedestriandoc: this.docinfo
    // }
    // this.api.post('dar', postDate).subscribe((data: any) => {
    //   console.log(data);
    //     console.log('updated');

    //     this.presentToast("User Created Successfully !");
    //     this.modalctrl.dismiss(true);

    // });
  }
  //
  storedriverdetails(){ 
    //    dri_value_of_loss
    let postDate = {
      mode: 'dardriverupdate',
      acc_id: this.accid,
      veh_ref_id: this.veh_ref_id,
      driver_without_supervision:this.driver_without_supervision,
      driver_scientific_report:this.driver_scientific_report,
      driver_father_name:this.driver_father_name,
      driver_mobile_no:this.driver_mobile_no,
      emailid:this.emailid,
      km_driven:this.km_driven,
      offending_vehicle_spotted:this.offending_vehicle_spotted,
      driver_lapsed_learner_lic: this.driver_lapsed_learner_lic,
      vehicle_impounded_police: this.vehicle_impounded_police,
      driver_imei:this.driver_imei,
      previousacc:this.previousacc,
      previousaccfir:this.previousaccfir,
      sole_earning_member:this.sole_earning_member,
      bank_address:this.bank_address,
      driver_license_suspended:this.driver_license_suspended,
      driver_make_model: this.driver_make_model,
      bank_name:this.bank_name,
      acc_holdername:this.acc_holdername,
      acc_number: this.acc_number,
      ifsc_code: this.ifsc_code,
      dri_marital_status:this.dri_marital_status,
      permanent_disability: this.permanent_disability,
      permanent_disability_details: this.permanent_disability_details,
      driver_income: this.driver_income,
      dri_loss_to_property:this.dri_loss_to_property,
      dri_additional_info: this.dri_additional_info,
      dri_relief_amount:this.dri_relief_amount,
      dri_value_of_loss:this.dri_value_of_loss,
      
      dricashlessTreatment:this.dricashlessTreatment,
      drireimbursementMedicalexpense:this.natureofinjury,
      dri_assessed_to_income_tax:this.natureofinjury,
      nature_description_injury:this.natureofinjury,
      dri_name_add_employer:this.dri_name_add_employer,
      dri_employed_or_not:this.dri_employed_or_not,
      expense_details_of_deceased:this.expense_details_of_deceased,
      injury_type:this.injury_type,
      treatment_details:this.treatment_details_of_deceased,
      hospital_details:this.hospitaldetails,
      driver_date_of_death:this.driver_date_of_death
        }
    console.log("driver-------------->",postDate); 
//    return false;

    this.api.post('datas', postDate).subscribe((data: any) => {
      alert(data.msg);
          console.log("DAta", data);
          console.log('updated');
          this.presentToast("Vehicle data saved Successfully !");
          this.modalctrl.dismiss(true);
    
        });
  }
storeownerdetails()
{



// 

    let postDate = {
      mode: 'darvehicleupdate',
      acc_id: this.accid,
      vehicle_driven_by: this.vehicle_driven_by,
      veh_ref_id: this.veh_ref_id,
      owner_mobile_no:this.owner_mobile_no,
      owner_occupation: this.owner_occupation,
      owner_father_name: this.owner_father_name,
      owner_veh_type:this.owner_veh_type,
      owner_report_acc: this.owner_report_acc,
      dri_license_authority: this.dri_license_authority,
      license_verfied: this.license_verfied,
      owner_report_dt:this.owner_report_dt,
      owner_details_pre_ins:this.owner_details_pre_ins,
      owner_ins_claims: this.owner_ins_claims,
      owner_driver_ran_ownerproduce: this.owner_driver_ran_ownerproduce,
      owner_claimants_settlement: this.owner_claimants_settlement,
      owner_mact: 'fase',
      // new
      permit_fitness_verified_reasons:this.permit_fitness_verified_reasons,
    } 
    console.log('---Udhaya--->',postDate);

 //   return false;

    this.api.post('datas', postDate).subscribe((data: any) => {
     
     
      alert(data.msg);
      console.log("DAta", data);
      console.log('updated');
      this.presentToast("Vehicle data saved Successfully !");
      this.modalctrl.dismiss(true);



    });
  
 


}
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  
  async addchild() {
    
    const modal = await this.modalctrl.create({
        component:AddchildComponent,
        componentProps: {
          mode: "driver",
          accid:this.accid,
          id:this.vehicleinfo.driverrefId,
          // id:this.statusofpedstrian.id,
          type:'Driver',
       
        }
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }

    async addfamilymembers() {
    
      const modal = await this.modalctrl.create({
          component:AddfamilyComponent,
          componentProps: {
            mode: "driver",
           accid:this.accid,
            id:this.vehicleinfo.driverrefId,

            // id:this.statusofpedstrian.id,
            type:'Driver',
         
          }
        });
       modal.onWillDismiss().then(dataReturned => {
        
        });
        return await modal.present().then(_ => {
        }); 
      }


}
