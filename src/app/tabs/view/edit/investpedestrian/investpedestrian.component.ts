import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { model_pedestrian } from '../../../../models/model_pedestrian';
import { TranslateConfigService } from '../../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { investigationreport_model } from '../../../../models/investigationreport_model';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UploadingdocumentComponent } from '../../reportsview/uploadingdocument/uploadingdocument.component';

import { AddfamilyComponent } from '../../../view/edit/addfamily/addfamily.component';
import { AddchildComponent } from '../../../view/edit/addchild/addchild.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

// import { Darform13Component } from 'src/app/components/darform13/darform13.component';
// import { Darform14Component } from 'src/app/components/darform14/darform14.component';
@Component({
  selector: 'app-investpedestrian',
  templateUrl: './investpedestrian.component.html',
  styleUrls: ['./investpedestrian.component.scss'],
})
export class InvestpedestrianComponent implements OnInit {
  patient:any;
  injury_type:any; 

tratmentdeta:any;
fatherName:any;
docname:any;
hospitalname:any;
employedOrnot:any;
sugundergone:any;

emailid:any;
father_name:any;
dob:any;
marital_status:any;
employed_or_not:any;
name_add_employer:any;
employeeaddress:any;
income:any;
assessed_to_income_tax:any;
treatment_details_of_deceased:any;
medical_expenses_incurred:any;
cashless_treatment:any;
form6sub:any;
date_of_death:any;
sole_earning_member:any;
natureofinjury_description:any;
expense_details_of_deceased:any;
hospital_address:any;
hospital_treatment_period:any;
doctor_name:any;
// doctorname:any;
hospital_treatment_details:any;
hospital_treatment_surgery_details:any;
permanent_disability:any;
permanent_disability_details:any;
pecuniaryloss:any;
expendiure_on_treatment:any;
estimate_expenditure:any;
expenditure_conveyance:any;
lossincome:any;
lossearcapacity:any;
pecunairy_loss:any;
reimbursement_medical_expense:any;
value_of_loss:any;
compensation_claimed:any;
statusofpedstrian:any;
vehicleid: any;

  common:any='1';
  severity:any='0';

  ln: any;
  options1: any;
  pedestrianinfo: model_pedestrian = new model_pedestrian();
  docinfo: investigationreport_model = new investigationreport_model();
  selectedLanguage: string; params: any;

  vehiclecombo = true;
  postdata = { 'mode': '', 'accid': '' };
  pass: any;
  pedestrian = { 'name': '' }; 
  vehno = { 'vehlist': '' };
  accidentData = new Array();
  selacc: any;
  accid: any; pedestriandata: any;
  private isDisabled: boolean = false;
  savebtn: boolean = true;
  addfamilybtn: any = 0;
  addlosses: any = 0;

  updateData: any = 0;
  pedName:any="";
  driver: any;

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

  
  report_details={
    'veh_no':'',
    'veh_ref':'',
    'veh_id':'',
    'ped_id':'',
    'mode':'ped'
  }

  vehicle:any;

  constructor(private api: ApiService, private translateConfigService: TranslateConfigService, private modalctrl: ModalController, private toastController: ToastController,
    public navCtrl: NavController,) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln = localStorage.getItem('ln');


    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    this.pedestrianinfo.accid = this.accid;

    console.log("entered investigation passenger", this.accid);
  }

  ngOnInit() {
    this.checkvechilecount();
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
    this.report_details.mode="ped";
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
  
  setVehicleDetails() {
    console.log("Event recieving",this.vehno);
    console.log("SPliting ",this.vehno.vehlist.split(","));
    let veh_details;
    veh_details=this.vehno.vehlist.split(",");

    this.report_details.veh_id=veh_details[2];
    this.report_details.veh_no=veh_details[1];
    this.getDriverDetails();
    console.log("EVENT Assigned ",this.report_details);   

  
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
              this.report_details.veh_ref=this.driver.id;
        }
      }
      

    });

  }


  getPedestrianslist(event: any) {

    let gett=event.target.value;
let veh_details;
veh_details=gett.split(",");
this.vehicleid=veh_details[2];
    this.pedestriandata=null;
    this.statusofpedstrian=null;
    
    this.common='1';
    this.severity='0';

    console.log("Event", event.target.value);
    this.setVehicleDetails();
    this.showPedestrian();
  }

  reimpursement_addional_details:any;
  relief_amount:any;
  savebutton() {

    
    console.log("show ped data------>>>>",this.statusofpedstrian);
  

    let postData={
      mode: 'addpedestrian',
      acc_id :this.statusofpedstrian.accident_id,
      patient_disposition:"a",
      veh_no:this.statusofpedstrian.vehicle_id,
      emailid:this.emailid,
      marital_status:this.marital_status,
      employed_or_not:this.employed_or_not,
      name_add_employer:this.name_add_employer,
      income:this.income,
      assessed_to_income_tax:this.assessed_to_income_tax,
      reimbursement_medical_expense:this.reimbursement_medical_expense,
      reimpursement_addional_details:this.reimpursement_addional_details,
      relief_amount:this.relief_amount,
      cashless_treatment:this.cashless_treatment,
      // loss_to_property:"a",
      value_of_loss:this.value_of_loss,
      // additional_info:"a",
      // relief_amount:"a",
      pedestrian_ref_id:this.statusofpedstrian.id,
      sole_earning_member:this.sole_earning_member,
      treatment_details_of_deceased:this.treatment_details_of_deceased,
      expense_details_of_deceased:this.expense_details_of_deceased,
      permanent_disability:this.permanent_disability,
      permanent_disability_details:this.permanent_disability_details,
      estimate_expenditure:this.estimate_expenditure,
      expenditure_conveyance:this.expenditure_conveyance,
      father_name:this.father_name,

      victim_remainder_date:"a",
      
      medical_expenses_incurred:this.medical_expenses_incurred,
      id:123,
      doctor_name:this.doctor_name,
      hospital_address:this.hospital_address,
      hospital_treatment_period:this.hospital_treatment_period,
      hospital_treatment_details:this.hospital_treatment_details,
      hospital_treatment_surgery_details:this.hospital_treatment_surgery_details,
      hospital_flag:"a",
      natureofinjury_description:this.natureofinjury_description,
      compensation_claimed:this.compensation_claimed,
      date_of_death:this.date_of_death,
      pecunairy_loss:this.pecunairy_loss,
      expendiure_on_treatment:this.expendiure_on_treatment
    }

    console.log("--------------",postData);
//return false;
    this.api.darsave('dar/insertPedestrian', postData).subscribe((data: any) => {
     alert(data.Message);
     this.closeModal();
    });
  }
  callpassenger(pid,vid){

    let postData={
      mode: 'get_pedestrianone',
      ln: this.selectedLanguage,
      accident_id: this.accid,
      pid: pid,
      vehicle_id: vid,
    }
    this.api.post('datas', postData).subscribe((data: any) => {
      this.patient=data.patient;   
      for (let i = 0; i < this.patient.length; i++) 
      {
          this.patient[i].patientdetails = JSON.parse(this.patient[i].patientdetails);    
      }
      
      this.doctor_name=this.patient[0].patientdetails.doctor_name;
      this.hospital_address=this.patient[0].hpname+","+this.patient[0].hpaddress;
      this.treatment_details_of_deceased=this.patient[0].patientdetails.discharge_treatement+","+this.patient[0].patientdetails.treatment;
      this.natureofinjury_description=this.patient[0].patientdetails.get_natureofinjury;
      this.injury_type=this.patient[0].patientdetails.get_injury_type;
  
    });
  }

  
  onPedestrianselect(event: any) {
  
    let gett=event.target.value;
    this.callpassenger(gett.id,this.vehicleid);


    //patientdetails
    this.common='1';
    this.severity='0';
    this.statusofpedstrian=null;
    
    console.log("Pedestrian-------", event.target.value);

    this.statusofpedstrian=event.target.value;
  
    //console.log("show---------",this.statusofpedstrian.id);
  
    let hospitaldata = JSON.parse(this.statusofpedstrian.patientdetails);
  //  console.log("Pedestrian-------",hospitaldata);
//return false;
if(hospitaldata!=null)
{

    this.tratmentdeta=hospitaldata.treatment;
    this.fatherName=hospitaldata.gurdian_name;
    this.docname=hospitaldata.doctor_name;
    this.hospitalname=this.statusofpedstrian.hpname+","+this.statusofpedstrian.hpaddress;

}
else
{
  this.tratmentdeta=null;
  this.fatherName=null;
}
  

   // alert(hospitaldata.treatment);
    this.common=this.statusofpedstrian.status;
  
    
    this.severity=this.statusofpedstrian.injury_severity;
    
    /*
   
    this.pedestrianinfo.pedestrianrefId = event.target.value.id;
    this.report_details.ped_id=event.target.value.id;
    this.pedName=event.target.value.name;
    console.log("Paed NAme", this.pedName);
    console.log("Report Details ", this.report_details);

    this.getPedestrianData();

    */
  }

 
  async addfamilymembers() {
    
    const modal = await this.modalctrl.create({
        component:AddfamilyComponent,
        componentProps: {
          accid:this.statusofpedstrian.accident_id,
          id:this.statusofpedstrian.id,
          type:'Pedestrian',
       
        }
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }

    async addchild() {
    
      const modal = await this.modalctrl.create({
          component:AddchildComponent,
          componentProps: {
            accid:this.statusofpedstrian.accident_id,
            id:this.statusofpedstrian.id,
            type:'Pedestrian',
         
          }
        });
       modal.onWillDismiss().then(dataReturned => {
        
        });
        return await modal.present().then(_ => {
        }); 
      }
    
  addfamily() {
    this.addfamilybtn = 1;
  }

  addLosses() {
    this.addlosses = 1;
  }

  cancelloss() {
    this.addlosses = 0;
  }

  cancelfamily() {
    this.addfamilybtn = 0;
  }

  saveLoss() {
    this.addlosses = 0;
    console.log(this.lossdescription);
    let postDate = {
      accid: this.pedestrianinfo.accid,
      ref_id: this.pedestrianinfo.pedestrianrefId,
      whoseloss: "Pedestrian",
      loss_description: this.lossdescription
    }

    this.api.darsave('dar/familylosses', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');

      this.presentToast("Family losses Data saved !");
      //this.modalctrl.dismiss(true);
    });

  }

  savefamily() {
    this.addfamilybtn = 0;

    let postDate = {
      familydetails: this.pedestrianinfo,
      type: "Pedestrian",
      ref_id: this.pedestrianinfo.pedestrianrefId

      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/familydetails', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');


      this.presentToast("Familydetails Data saved !");
      //this.modalctrl.dismiss(true);
    });

  }
  savingFamilydetails(){
    this.savefamily();
    if(this.pedestrianinfo.famAge<=18){
      this.saveMinorChilddetails();
    }
  }

  saveMinorChilddetails(){
    this.addfamilybtn=0;
    this.minor_child_details.name=this.pedestrianinfo.famName
    this.minor_child_details.age=this.pedestrianinfo.famAge
    this.minor_child_details.sex=this.pedestrianinfo.famGender

    console.log(this.lossdescription);
    let postDate = {
      accid: this.pedestrianinfo.accid,
      victimid:this.pedestrianinfo.pedestrianrefId,
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
  getPedestrianData() {
    let pedestrian = {
      'acc_id': '',
      'ref_id': ''
    }
    pedestrian.acc_id = this.accid;
    pedestrian.ref_id = this.pedestrianinfo.pedestrianrefId;
    console.log("RefId Ped", pedestrian.ref_id);

    let postDate = {
      mode: 'investpassenger',
      pedestrian: pedestrian,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getpedestrian', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');
      if (data != null) {
        this.updateData = 1;
        if (data.submitCheck == true) {
          console.log("Data submit2", data.submitCheck);
          this.isDisabled = true;
          this.savebtn = false;
        }
        this.pedestrianinfo.victimdisposition = data.patientDisposition;
        if (data.victimOrNot == true) {
          this.docinfo.witnesscheck = "true";
        } else {
          this.docinfo.witnesscheck = "false";
        }


        this.pedestrianinfo.maritalStatus = data.maritalStatus;
        this.pedestrianinfo.occupationName = data.occupationName;
        //this.pedestrianinfo.employedOrnot = data.employedOrnot;
        this.pedestrianinfo.nameAddressemployer = data.nameAddressemployer;
        this.pedestrianinfo.income = data.income;
        //this.pedestrianinfo.assessedToincometax = data.assessedToincometax;
        //this.pedestrianinfo.reimbursementMedicalexpense=data.reimbursementMedicalexpense;
        //this.pedestrianinfo.cashlessTreatment=data.cashlessTreatment;
        this.pedestrianinfo.lossToproperty = data.lossToproperty;
        this.pedestrianinfo.valueOfloss = data.valueOfloss;
        this.pedestrianinfo.additionalInfo = data.additionalInfo;
        this.pedestrianinfo.reliefAmount = data.reliefAmount;

        this.pedestrianinfo.fatherName=data.fatherName;
      this.pedestrianinfo.dob=data.dob;
      this.pedestrianinfo.expenditureConveyance=data.expenditureConveyance;
      this.pedestrianinfo.estimateExpenditure=data.estimateExpenditure;
      this.pedestrianinfo.permanentDisabilitydetails=data.permanentDisabilitydetails;
      this.pedestrianinfo.permanentDisability=data.permanentDisability;
      this.pedestrianinfo.schoolName=data.schoolName;
      this.pedestrianinfo.expenseDetailsofdeceased=data.expenseDetailsofdeceased;
      this.pedestrianinfo.treatmentDetailsofdeceased=data.treatmentDetailsofdeceased;
      this.pedestrianinfo.victim_remainder_date=data.victimRemainderdate;
      this.pedestrianinfo.victimType=data.victimType;

      if(data.permanentDisability==true){

        console.log("permanentDisability",true);
        this.pedestrianinfo.permanentDisability = "true";
      }else{
        console.log("permanentDisability",false);
        this.pedestrianinfo.permanentDisability = "false";
      }

      if(data.soleEarningmember==true){
        console.log("soleEarningmember",true);
        this.pedestrianinfo.soleEarningmember = "true";
      }else{
        console.log("soleEarningmember",false);
        this.pedestrianinfo.soleEarningmember = "false";
      }


        if (data.employedOrnot == true) {
          console.log("val1", true);
          this.pedestrianinfo.employedOrnot = "true";
        } else {
          console.log("val1", false);
          this.pedestrianinfo.employedOrnot = "false";
        }

        if (data.assessedToincometax == true) {
          console.log("val2", true);
          this.pedestrianinfo.assessedToincometax = "true";
        } else {
          console.log("val2", false);
          this.pedestrianinfo.assessedToincometax = "false";
        }

        if (data.reimbursementMedicalexpense == true) {
          console.log("val3", true);
          this.pedestrianinfo.reimbursementMedicalexpense = "true";
        } else {
          console.log("val3", false);
          this.pedestrianinfo.reimbursementMedicalexpense = "false";
        }

        if (data.cashlessTreatment == true) {
          console.log("val4", true);
          this.pedestrianinfo.cashlessTreatment = "true";
        } else {
          console.log("val4", false);
          this.pedestrianinfo.cashlessTreatment = "false";
        }

        this.presentToast("Pedestrian Data fetched !");
      }else{
        this.updateData=0;
        console.log("updateData",this.updateData);
      }
    });

  }


  showPedestrian() {
    console.log("VehList",this.vehno.vehlist);
    let veh_details;
    veh_details=this.vehno.vehlist.split(",");
    console.log("VehList",veh_details[2]);

// this.statusofpedstrian

    let postData={
      mode: 'dar_pedestrian',
      ln: this.selectedLanguage,
      accident_id: this.accid,
      vehicle_id: veh_details[2]
    }
    // let postDate = {
    //   mode: 'pedestrian',
    //   ln: this.selectedLanguage,
    //   id: this.accid
    // }
    this.api.post('datas', postData).subscribe((data: any) => {
      console.log(data);        
      this.pedestriandata=data.dar_pedestrian;
      
      //get_pedestrainstatus
      // this.pedestriandata = data.data;  // console.log('vehicle data ',this.vehicle);

      // for (let i = 0; i < data.data.length; i++) {
      //   console.log("Pedestrian Name", this.pedestriandata[i].name);
      //   //this.vehicle[i].pedestrian = JSON.parse(this.vehicle[i].pedestrian);
      //   this.pass = this.pedestriandata[i];
      //   console.log("Pedestrian Details", this.pass);
      //   // this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
      // }
      console.log('pedestriandata json ', this.pedestriandata);

    });

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


  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

  }

  public closeModal() {
    this.modalctrl.dismiss();
  }

  saveModal(flag) {
    if (flag == "0") {

      this.pedestrianinfo.submitCheck = false;
      console.log("0", this.pedestrianinfo.submitCheck);
    } else {
      console.log("1")
      this.savebtn = false;
      this.pedestrianinfo.submitCheck = true;
      console.log("1", this.pedestrianinfo.submitCheck);

    }


    if (this.pedestrianinfo.employedOrnot == 'true') {
      console.log("employedOrnot true");
      this.pedestrianinfo.employedOrnot = true;
    } else {
      console.log("employedornot false");
      this.pedestrianinfo.employedOrnot = false;
    }

    if (this.pedestrianinfo.assessedToincometax == 'true') {
      console.log("assessedToincometax true");
      this.pedestrianinfo.assessedToincometax = true;
    } else {
      console.log("pedestrianinfo false");
      this.pedestrianinfo.assessedToincometax = false;
    }

    if (this.pedestrianinfo.reimbursementMedicalexpense == 'true') {
      console.log("reimbursementMedicalexpense true");
      this.pedestrianinfo.reimbursementMedicalexpense = true;
    } else {
      console.log("reimbursementMedicalexpense false");
      this.pedestrianinfo.reimbursementMedicalexpense = false;
    }

    if (this.pedestrianinfo.cashlessTreatment == 'true') {
      console.log("cashlessTreatment true");
      this.pedestrianinfo.cashlessTreatment = true;
    } else {
      console.log("cashlessTreatment false");
      this.pedestrianinfo.cashlessTreatment = false;
    }
    this.pedestrianinfo.updateData=this.updateData;
    console.log("updateData",this.pedestrianinfo.updateData);

    let postDate = {
      mode: 'investpedestrian',
      pedestrian: this.pedestrianinfo,
      pedestriandoc: this.docinfo,
      vehicleno: this.report_details.veh_id,
      pedname: this.pedName
    }
    this.api.darsave('dar/pedestrian', postDate).subscribe((data: any) => {
      console.log(data);
      console.log('updated');

      this.presentToast("User Created Successfully !");
      this.modalctrl.dismiss(true);

    });
    this.closeModal();
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
  // async form13() {
    
  //   const modal = await this.modalctrl.create({
  //       component:Darform13Component,
  //       componentProps: {
  //         accid:this.statusofpedstrian.accident_id,
  //         id:this.statusofpedstrian.id,
  //         type:'Passenger',
       
  //       }
  //     });
  //    modal.onWillDismiss().then(dataReturned => {
      
  //     });
  //     return await modal.present().then(_ => {
  //     }); 
  //   }


    
  // async form14() {
    
  //   const modal = await this.modalctrl.create({
  //       component:Darform14Component,
  //       componentProps: {
  //         accid:this.statusofpedstrian.accident_id,
  //         id:this.statusofpedstrian.id,
  //         type:'Passenger',
       
  //       }
  //     });
  //    modal.onWillDismiss().then(dataReturned => {
      
  //     });
  //     return await modal.present().then(_ => {
  //     }); 
  //   }

}
