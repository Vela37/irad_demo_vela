import { Component, OnInit, Input  } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insuranceinjuryedit',
  templateUrl: './insuranceinjuryedit.component.html',
  styleUrls: ['./insuranceinjuryedit.component.scss'],
})
export class InsuranceinjuryeditComponent implements OnInit {
  @Input() insuranceinjured: any;

  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {}


  closeModal()  {
    let reply = { 'geninfo':this.insuranceinjured};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
 saveModal(){
  let postData={
    accident_id:this.insuranceinjured.accident_id,
    person_id:this.insuranceinjured.person_id,
   
    inj_treatment:this.insuranceinjured.inj_treatment, 
    inj_convenance:this.insuranceinjured.inj_convenance, 
    inj_special_diet:this.insuranceinjured.inj_special_diet, 
    inj_cost_artificial_limp:this.insuranceinjured.inj_cost_artificial_limp, 
    inj_loss_erning_capacity:this.insuranceinjured.inj_loss_erning_capacity, 
    inj_loss_income:this.insuranceinjured.inj_loss_income, 
    inj_any_other_loss:this.insuranceinjured.inj_any_other_loss, 
    inj_com_mental_phy_shock:this.insuranceinjured.inj_com_mental_phy_shock, 
    inj_pain_suffering:this.insuranceinjured.inj_pain_suffering, 
    inj_loss_amenities:this.insuranceinjured.inj_loss_amenities, 
    inj_disfiguration:this.insuranceinjured.inj_disfiguration, 
    inj_loss_of_marriage:this.insuranceinjured.inj_loss_of_marriage, 
    inj_loss_ear_inc_har_dis:this.insuranceinjured.inj_loss_ear_inc_har_dis, 
    inj_total_copensation:this.insuranceinjured.inj_total_copensation, 
    
   
     
   }
   console.log(postData);
 }

}
