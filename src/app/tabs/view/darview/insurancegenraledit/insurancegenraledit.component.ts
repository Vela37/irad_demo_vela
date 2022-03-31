import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-insurancegenraledit',
  templateUrl: './insurancegenraledit.component.html',
  styleUrls: ['./insurancegenraledit.component.scss'],
})
export class InsurancegenraleditComponent implements OnInit {
  @Input() insurancegen: any;
  intimation_received_date_time_insured:any;
  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {

console.log(this.insurancegen)

  }
  closeModal()  {
    let reply = { 'geninfo':this.insurancegen};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
 saveModal(){
  let postData={
    
    accident_id:this.insurancegen.accident_id,
    vehicle_id:this.insurancegen.vehicle_id,
    //intimation_received_date_time_insured:this.insurancegen.intimation_received_date_time_insured, 
   // dateof_appt_designated_officer_by_ins:this.insurancegen.dateof_appt_designated_officer_by_ins, 
    designated_officer_name:this.insurancegen.designated_officer_name, 
    designated_officer_residence:this.insurancegen.designated_officer_residence, 
   //surveyor_appointment_date:this.insurancegen.surveyor_appointment_date, 
    surveyor_investigator_name:this.insurancegen.surveyor_investigator_name, 
    surveyor_investigator_residence:this.insurancegen.surveyor_investigator_residence, 
   // dateof_surveyor_investigator_report:this.insurancegen.dateof_surveyor_investigator_report, 
    //dateof_designated_officer_report:this.insurancegen.dateof_designated_officer_report, 
    form_filled_within_30:this.insurancegen.form_filled_within_30, 
   }

   this.api.darsave("updateinsurance",postData).subscribe((rec: any) => {
  
    //alert(rec.Message);
    alert("sucess");
    this.modalctrl.dismiss();
  });


   console.log(postData);
 }
}
