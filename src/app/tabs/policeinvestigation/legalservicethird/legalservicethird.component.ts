import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-legalservicethird',
  templateUrl: './legalservicethird.component.html',
  styleUrls: ['./legalservicethird.component.scss'],
})
export class LegalservicethirdComponent implements OnInit {
  accid:any;
  vehicle:any;
  victim:any;
  flag:any;
  vname:any;
  selacc:any;
  vehicle_reg_no:any;

  constructor(private modalctrl: ModalController,private api:ApiService)
   { 
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

   }
  death_income:any;
  death_future_prospects:any;
  death_less_personal_expenses:any;
  death_monthly_loss_depedency:any;
  death_anual_loss_depedency:any;
  death_mulltiplier:any;
  death_total_loss_dependency:any;
  death_medical_expenses:any;
  death_loss_funeral_expenses:any;
  death_any_other_pecuniary:any;
  
  death_loss_consortium:any;
  death_loss_for_love_affection:any;
  death_loss_estate:any;
  death_emotional_harm_etc:any;
  death_post_traumatic_stress_disorder:any;
  death_any_other_nonpecuniary:any;
  paying_cap_anual_income1:any;
  paying_cap_immovable_assets1:any;
  paying_cap_moveable_asset1:any;
  slsa_recommendation1:any;
//new 
death_total_compensation :any;
//new.

  inj_treatment:any;
  inj_convenance:any;
  inj_special_diet:any;
  inj_cost_nursing_attendant:any;
  inj_cost_artificial_limp:any;
  inj_treatment_still_continuing:any;
  inj_loss_income:any;
  inj_any_other_loss_req_special_treatment:any;
  inj_percentage_disablity:any;
  inj_loss_erning_capacity:any;
  inj_any_other_pecuniary_loss:any;
  inj_pain_suffering:any;
  inj_loss_amenities:any;
  inj_post_traumatic:any;
  inj_com_mental_phy_shock:any;
  inj_disfiguration:any;
  inj_loss_marriage_prospects:any;
  inj_loss_reputation:any;
  inj_anyother_non_pecuniary:any;
//new
inj_income:any;
inj_total_copensation:any;
inj_loss_of_future_income;
  multiplier:any;
//new .


  paying_cap_anual_income:any;
  paying_cap_immovable_assets:any;
  paying_cap_moveable_asset:any;
  slsa_recommendation:any;

  ngOnInit()
   {
    this.loadvehicle() ;

   }

  loadvehicle(){
    let postDate = {
  
        mode: "dar_vehicle",
        accid:this.accid,
  
    }
     this.api.post("datas", postDate).subscribe((rec: any) => {
      this.vehicle=rec.dar_vehicle;
     });
  
  
  
  }




  loadvehicledetail(event:any){



    let postDate = {
  
                        mode: "loadvictimsbyvehicle",
                        accid:this.accid,
                        vehicleid:event.target.value
  
                  }
  
  
  
   this.api.post("datas", postDate).subscribe((rec: any) => {
  
                      this.victim=rec.victims;
  
   });
   
    
      }

  loadvictimdetails(event:any){


    console.log("------>",event.target.value);
    
                if(event.target.value.injury_severity=='1')
                {
                  this.flag=1;
                }
                else
                {
                  this.flag=2;
                }
    
           
    
    }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  savebutton(){


    let postData={
      
      //  accident_id:this.accident_id,
      //   person_id:this.person_id,
      //   person_type:this.person_type,
      //   nature_of_injuries:this.nature_of_injuries,
      //   brief_description_of_offense:this.brief_description_of_offense,
      //   vehicle_id:this.vehicle_id,
         
    vehicle_id:this.vehicle_reg_no,
 accident_id:this.accid,
 person_id: this.vname.id,
 person_type: this.vname.ptype,

       death_income:this.death_income,
  death_future_prospects:this.death_future_prospects,
  death_less_personal_expenses:this.death_less_personal_expenses,

  death_monthly_loss_depedency: (this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses,
  //this.death_future_prospects,
 

  death_anual_loss_depedency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12,
  death_mulltiplier:this.death_mulltiplier,
  death_total_loss_dependency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier,
  death_medical_expenses:this.death_medical_expenses,
  death_loss_funeral_expenses:this.death_loss_funeral_expenses,
  death_any_other_pecuniary:this.death_any_other_pecuniary,
  
  death_loss_consortium:this.death_loss_consortium,
  death_loss_for_love_affection:this.death_loss_for_love_affection,
  death_loss_estate:this.death_loss_estate,
  death_emotional_harm_etc:this.death_emotional_harm_etc,
  death_post_traumatic_stress_disorder:this.death_post_traumatic_stress_disorder,
  death_any_other_nonpecuniary:this.death_any_other_nonpecuniary,
  id_slsa:"233",
  paying_cap_anual_income:this.death_income * 12,
  paying_cap_immovable_assets:this.paying_cap_immovable_assets1,
  paying_cap_moveable_asset:this.paying_cap_moveable_asset1,
  slsa_recommendation:this.slsa_recommendation1,
    
  death_total_compensation:  (((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier)* 1 + this.death_medical_expenses * 1 +this. death_loss_funeral_expenses * 1 + this.death_any_other_pecuniary * 1  + this.death_loss_consortium * 1 +this. death_loss_for_love_affection * 1 + this.death_loss_estate * 1 +this. death_emotional_harm_etc * 1 +  this.death_post_traumatic_stress_disorder * 1  + this.death_any_other_nonpecuniary * 1 


         }
         console.log("--------------",postData);
    //return false;
         this.api.darsave("slsadeath",postData).subscribe((rec: any) => {
      
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();          });
         
         console.log("--------------",postData);
    
    

  }

  savebutton2(){
    let postData={
      
      //  accident_id:this.accident_id,
      //   person_id:this.person_id,
      //   person_type:this.person_type,
      //   nature_of_injuries:this.nature_of_injuries,
      //   brief_description_of_offense:this.brief_description_of_offense,
      //   vehicle_id:this.vehicle_id,
         
      vehicle_id:this.vehicle_reg_no,
      accident_id:this.accid,
      person_id: this.vname.id,
      person_type: this.vname.ptype,
       
       inj_treatment:this.inj_treatment,
       inj_convenance:this.inj_convenance,
       inj_special_diet:this.inj_special_diet,
       inj_cost_nursing_attendant:this.inj_cost_nursing_attendant,
       inj_cost_artificial_limp:this.inj_cost_artificial_limp,
       inj_treatment_still_continuing:this.inj_treatment_still_continuing,
       inj_loss_income:this.inj_loss_income,
       inj_any_other_loss_req_special_treatment:this.inj_any_other_loss_req_special_treatment,
       inj_percentage_disablity:this.inj_percentage_disablity,
       inj_loss_erning_capacity:this.inj_loss_erning_capacity,
       inj_any_other_pecuniary_loss:this.inj_any_other_pecuniary_loss,
       inj_pain_suffering:this.inj_pain_suffering,
       inj_loss_amenities:this.inj_loss_amenities,
       inj_post_traumatic:this.inj_post_traumatic,
       inj_com_mental_phy_shock:this.inj_com_mental_phy_shock,
       inj_disfiguration:this.inj_disfiguration,
       inj_loss_marriage_prospects:this.inj_loss_marriage_prospects,
       inj_loss_reputation:this.inj_loss_reputation,
       inj_anyother_non_pecuniary:this.inj_anyother_non_pecuniary,
       multiplier:this.multiplier,
       inj_income:this.inj_income,
       inj_loss_of_future_income:this.inj_income * this.inj_loss_erning_capacity *  this.multiplier,
       inj_total_copensation: this.inj_treatment * 1 + this.inj_convenance * 1 + this.inj_special_diet * 1 +  this.inj_cost_nursing_attendant * 1 +this.inj_cost_artificial_limp * 1 + this.inj_treatment_still_continuing * 1 + this.inj_loss_income * 1 + this.inj_any_other_loss_req_special_treatment * 1  +(this.inj_income * this.inj_loss_erning_capacity *  this.multiplier) * 1 + this. inj_any_other_pecuniary_loss * 1 + this.inj_pain_suffering * 1 + this.inj_loss_amenities * 1 + this.inj_post_traumatic * 1 + this.inj_com_mental_phy_shock * 1 + this.inj_disfiguration * 1 + this.inj_loss_marriage_prospects * 1 + this.inj_loss_reputation *  1 +  this.inj_anyother_non_pecuniary * 1 ,
       id_slsa:"233",
       paying_cap_anual_income:this.inj_income * 12,
       paying_cap_immovable_assets:this.paying_cap_immovable_assets,
       paying_cap_moveable_asset:this.paying_cap_moveable_asset,
       slsa_recommendation:this.slsa_recommendation,
         }
         console.log("--------------",postData);
    //return false;
         this.api.darsave("slsainjured",postData).subscribe((rec: any) => {
      
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();          });
         
         console.log("--------------",postData);
  }
}
