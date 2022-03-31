import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { model_darinsurance } from '../../../models/model_darinsurance';
import { model_darinsurancedeath } from '../../../models/model_darinsurancedeath';
import { model_darinsuranceinjury } from '../../../models/model_darinsuranceinjury';


@Component({
  selector: 'app-insurancevehicle',
  templateUrl: './insurancevehicle.component.html',
  styleUrls: ['./insurancevehicle.component.scss'],
})
export class InsurancevehicleComponent implements OnInit {
  
  maxdate:any;
  mindate:any;
  vehicle_id:any;
  vid:any;
  accident_id:any;
  vehicle_make:any;
  vehicle_model:any;
  insurance_details:any;
  insurance_policyno:any;
  insurance_validity:any;
  nature_of_policy:any;
  intimation_received_date_time_insured:any;
  dateof_appt_designated_officer_by_ins:any;
  designated_officer_name:any;
  designated_officer_residence:any;
  surveyor_appointment_date:any;
  surveyor_investigator_residence:any;
  dateof_surveyor_investigator_report:any;
  dateof_designated_officer_report:any;
  form_filled_within_30:any;


 

  public darinsurancedeath:model_darinsurancedeath;
  public darinsuranceinjury:model_darinsuranceinjury;
  public darinsurance:model_darinsurance;



  surveyor_investigator_name:any;
name:any;
residence:any;
date_of_receipt_far:any;
date_of_receipt_iar:any;
date_of_receipt_dar:any;



  selacc: any;
  constructor(private api:ApiService, private modalctrl: ModalController)
   {
   


    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

    }
  common:any='1';
  user:any;
  ngOnInit() {

    this.darinsurancedeath=new model_darinsurancedeath(); 
    this.darinsuranceinjury=new model_darinsuranceinjury(); 
    this.darinsurance=new model_darinsurance(); 

    this.checkvechilecount();
    this.user= JSON.parse(localStorage.getItem('userData'));
    
    console.log('--------->',this.user.office_id)

  }
  postdata = { 'mode': '', 'accid': '' };
  accid: any;
  vehiclecombo = true; 
  accidentData:any;
  vehicle:any;




  // let postDate = {
  //   mode: "loadFOUsers",
  // };
  // this.api.post("accview.php", postDate).subscribe((data: any) => {
  //   this.fousers=data.data;
  //   this.fouser=this.data.fo_user;
  // });

  // checkvechilecount() {
  //   this.postdata.mode = 'dar_vehicle';
  //   this.postdata.accid = this.accid;

  //   // let postDate = {
  //   //   id: this.accid,
  //   // };

  //   this.api.post('datas', this.postdata).subscribe((data: any) => {
  //    // this.api.post("accview", postDate).subscribe((data: any) => {
  //     this.vehiclecombo=false;
  //   this.accidentData=data.dar_vehicle;
  //      this.vehicle = data.data
  //     console.log('***********************************');
  //     console.log(data.dar_vehicle);
  //    // console.log("vehicle data json ", this.vehicle);
  //     console.log('***********************************');
  // });
  // }

  checkvechilecount(){
    let postDate = {
        mode: "loadinsuredvehiclebycompany",
        accid:this.accid,
    }
     this.api.post("datas", postDate).subscribe((rec: any) => {
      this.vehicle=rec.dataset;
      console.log('***************************hi********');
       console.log(rec.dataset);
        console.log('***********************************');
     });



  }


  

  vehiclepolicy:any;
  loadvehicledetail(event:any){

console.log('*****************');
    console.log(event.target.value)
console.log('*****************');
this.vid=event.target.value.id;
this.vehicle_make=event.target.value.vehicle_make;
this.vehicle_make=event.target.value.vehicle_make;
this.vehicle_model=event.target.value.vehicle_model;
this.insurance_policyno=event.target.value.insurance_policyno;
this.insurance_validity=event.target.value.insurance_validity;
this.insurance_details=event.target.value.insurance_details;

  }

  getvehdetail(event: any) {

 
    
    this.common='1';

    console.log("Event", event.target.value);
    

    
  }



  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  vehicle_reg_no:any;
  savebutton(){

      

let postmydata={

  id_insurance:this.user.office_id,
  vehicle_id:this.vid,
  accident_id:this.accid,
  vehicle_make:this.vehicle_model,
  vehicle_model:this.vehicle_make,
  insurance_details:this.insurance_details,
  insurance_policyno:this.insurance_policyno,
  insurance_validity:this.insurance_validity,
  nature_of_policy:this.nature_of_policy,
  intimation_received_date_time_insured:this.intimation_received_date_time_insured,
  dateof_appt_designated_officer_by_ins:this.dateof_appt_designated_officer_by_ins,
  designated_officer_name:this.designated_officer_name,
  designated_officer_residence:this.designated_officer_residence,
  surveyor_appointment_date:this.surveyor_appointment_date,
  surveyor_investigator_name:this.surveyor_investigator_name,
  surveyor_investigator_residence:this.surveyor_investigator_residence,
  dateof_surveyor_investigator_report:this.dateof_surveyor_investigator_report,
  dateof_designated_officer_report:this.dateof_designated_officer_report,
  form_filled_within_30:this.form_filled_within_30,
  residence:"chennai",
  name:"ravi",
  date_of_receipt_far:"2022-02-16",
  date_of_receipt_iar:"2022-02-16",
  date_of_receipt_dar:"2022-02-16",
  
}

this.api.darsave("addInsurance",postmydata).subscribe((rec: any) => {
  
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();
    });

   console.log('--------------->',postmydata);



  }
  
  }

