import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-form15',
  templateUrl: './form15.component.html',
  styleUrls: ['./form15.component.scss'],
})
export class Form15Component implements OnInit {
mindate:any;maxdate:any;
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
  death_loss_consortium:any;
  death_loss_for_love_affection:any;
  death_loss_estate:any;
  death_loss_funeral_expenses:any;


  death_total_compensation:any;

  death_rate_interest:any;
  death_interest_amount:any;
  total_amt_with_interest:any;
  award_amt_released:any;
  award_amt_in_fdrs:any;
  mode_disbursement:any;
  nest_date_award:any;


//**************************INJURY */

  treatment:any;
  convenance:any;
  special_diet:any;

  cost_nursing_attendant:any;
  cost_artificial_limp:any;
  loss_earning_cap:any;
  loss_income:any;
  any_other_loss:any;
  com_mental_phy_shock:any;
  pain_suffering:any;
  loss_amenities:any;
  disfiguration:any;
  loss_of_marriage:any;
  loss_ear_inc_har_dis:any;
  per_disablity:any;
  loss_ami_life_span:any;
  per_loss_earning:any;
  loss_future_income:any;
  total_copensation:any;
  interest:any;
  interest_amount:any;

 
  total_amt_with_interest1:any;
  award_amt_released1:any;
  award_amt_in_fdrs1:any;
  mode_disbursement1:any;
  nest_date_award1:any;

  inj_income:any;
  multiplier:any;
  selacc:any;
  accid:any;
  flag:any;
  vehicle:any;
  victim:any;
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
  vehicle_reg_no:any;
  vname:any;
  savebutton(){
    //alert("123456");
   // return false;
    let postData={
              mode: 'death',
              accident_id:this.accid,
              vehicle_id:this.vehicle_reg_no,
               person_id: this.vname.id,
              person_type: this.vname.ptype,

        loss_earning_cap:this.loss_earning_cap,
        any_other_loss:this.any_other_loss,
        treatment:this.treatment,
        convenance:this.convenance,
        special_diet:this.special_diet,
        cost_nursing_attendant:this.cost_nursing_attendant,
        cost_artificial_limp:this.cost_artificial_limp,
        loss_income:this.loss_income,
        com_mental_phy_shock:this.com_mental_phy_shock,
        pain_suffering:this.pain_suffering,
        loss_amenities:this.loss_amenities,
        disfiguration:this.disfiguration,
        loss_of_marriage:this.loss_of_marriage,
        loss_ear_inc_har_dis:this.loss_ear_inc_har_dis,
        per_disablity:this.per_disablity,
        loss_ami_life_span:this.loss_ami_life_span,
        per_loss_earning:this.per_loss_earning,
       inj_income:this.inj_income,
       multiplier:this.multiplier,
        loss_future_income:this.inj_income * this.per_loss_earning *  this.multiplier ,
        total_copensation:this.treatment * 1 + this.convenance * 1 + this.special_diet * 1 + this. cost_nursing_attendant * 1 +  this.cost_artificial_limp * 1 + this.loss_earning_cap * 1 +  this.loss_income * 1 + this.any_other_loss * 1 +  this.com_mental_phy_shock * 1 + this.pain_suffering * 1 + this.loss_amenities * 1 + this.disfiguration * 1 +  this.loss_of_marriage * 1 +  this.loss_ear_inc_har_dis  * 1  +  this.loss_ami_life_span * 1  + (this.inj_income *this. per_loss_earning * this. multiplier)* 1,
        interest:this.interest,
        interest_amount:this.interest_amount,

        total_amt_with_interest:(this.treatment * 1 + this.convenance * 1 + this.special_diet * 1 +  this.cost_nursing_attendant * 1 + this. cost_artificial_limp * 1 + this.loss_earning_cap * 1 + this. loss_income * 1 + this.any_other_loss * 1 +  this.com_mental_phy_shock * 1 + this.pain_suffering * 1 + this.loss_amenities * 1 + this.disfiguration * 1 +  this.loss_of_marriage * 1 +  this.loss_ear_inc_har_dis  * 1 +  this.loss_ami_life_span * 1  + (this.inj_income * this.per_loss_earning *  this.multiplier) * 1 ) * 1 + this.interest_amount * 1,
        award_amt_released:this.award_amt_released1,
        award_amt_in_fdrs:this.award_amt_in_fdrs1,
        
        mode_disbursement:this.mode_disbursement1,
        nest_date_award:this.nest_date_award1,
}
//alert("98765");

 this.api.darsave("form16insert",postData).subscribe((rec: any) => {
    
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();
       });
console.log(postData);
  }



  savebutton2(){

    let postData={
      vehicle_id:this.vehicle_reg_no,
      accident_id:this.accid,
      person_id: this.vname.id,
      person_type: this.vname.ptype,
      
 death_income:this.death_income,
 death_future_prospects:this.death_future_prospects,
 death_less_personal_expenses:this.death_less_personal_expenses,
 death_monthly_loss_depedency:(this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses,
 death_anual_loss_depedency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12,
 death_mulltiplier:this.death_mulltiplier,
 death_total_loss_dependency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier,
 death_medical_expenses:this.death_medical_expenses,
 death_loss_consortium:this.death_loss_consortium,
 death_loss_for_love_affection:this.death_loss_for_love_affection,
 death_loss_estate:this.death_loss_estate,
 death_loss_funeral_expenses:this.death_loss_funeral_expenses,
 death_total_compensation:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier * 1 + this.death_medical_expenses * 1  + this.death_loss_consortium  * 1 + this.death_loss_for_love_affection  * 1 + this.death_loss_estate * 1  + this.death_loss_funeral_expenses *1,
 death_rate_interest:this.death_rate_interest,
 death_interest_amount:this.death_interest_amount,
 total_amt_with_interest:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier * 1 + this.death_medical_expenses * 1  + this.death_loss_consortium  * 1 + this.death_loss_for_love_affection  * 1 + this.death_loss_estate * 1  + this.death_loss_funeral_expenses *1 + this.death_interest_amount * 1,
 award_amt_released:this.award_amt_released,
 award_amt_in_fdrs:this.award_amt_in_fdrs,
 mode_disbursement:this.mode_disbursement,
 nest_date_award:this.nest_date_award,


}


this.api.darsave("form15insert",postData).subscribe((rec: any) => {
    
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();

});
console.log(postData);

  }
}
