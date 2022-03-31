import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-addcourtdata',
  templateUrl: './addcourtdata.component.html',
  styleUrls: ['./addcourtdata.component.scss'],
})
export class AddcourtdataComponent implements OnInit {

  accid:any;
  flag:any;
  constructor(private modalctrl: ModalController,private api:ApiService, private authService: AuthService) 
  { 
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
  }
  @Input() selacc:any; user:any;
  private userSub: Subscription; isAuthenticated = false;
  vehicle:any;
  victim:any;

  vname:any
  vehicle_reg_no:any;

  accident_id:any;
  vehicle_id:any;
  person_id:any;
  person_type:any;




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
  death_interest:any;


  

  inj_treatment:any;
  inj_convenance:any;
  inj_special_diet:any;
  inj_cost_nursing_attendant:any;
  inj_loss_income:any;
  inj_cost_artificial_limp:any;
  inj_any_other_loss:any;
  inj_com_mental_phy_shock:any;
  inj_pain_suffering:any;
  inj_loss_amenities:any;
  inj_disfiguration:any;
  inj_loss_of_marriage:any;
  inj_loss_ear_inc_har_dis:any;
  inj_per_disablity:any;
  inj_loss_ami_life_span:any;
  inj_per_loss_earning:any;
  in_loss_future_income:any;
  inj_total_copensation:any;
  inj_interest:any;
  inj_income:any;
  multiplier:any;
  permanent_or_temporary_disablity:any;
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


  closeModal(){

    this.modalctrl.dismiss();

  }
  
  savebutton(){
    let postData={
   mode: 'addinsurance',
   vehicleId:this.vehicle_reg_no,
   accidentId:this.accid,
   personId: this.vname.id,
   personType: this.vname.ptype,

   injTreatment:this.inj_treatment,
   injConvenance:this.inj_convenance,
   injSpecialDiet:this.inj_special_diet,
   injCostNursingAttend:this.inj_cost_nursing_attendant,
   injCostArtificialLimp:this.inj_cost_artificial_limp,
   injLossIncome:this.inj_loss_income,
   injAnotherLoss:this.inj_any_other_loss,
   injPhyShock:this.inj_com_mental_phy_shock,
   injPainSuffer:this.inj_pain_suffering,
   lossAmenities:this.inj_loss_amenities,
   injDisfiguration:this.inj_disfiguration,
   injLossOfMarriage:this.inj_loss_of_marriage,
   injLossHarDis:this.inj_loss_ear_inc_har_dis,
   injDisability:this.inj_per_disablity,
   permanent_or_temporary_disablity:this.permanent_or_temporary_disablity,
   injLifeSpan:this.inj_loss_ami_life_span,
   injLossEarning:this.inj_per_loss_earning,
   inj_income:this.inj_income,
  multiplier:this.multiplier,
   injLossFutureIncome:this.inj_income * this.inj_per_loss_earning *  this.multiplier,
   injTotalCompensation:this.inj_treatment * 1 + this.inj_convenance * 1 + this.inj_special_diet * 1 + this.inj_cost_nursing_attendant * 1 +  this.inj_loss_income * 1 + this.inj_cost_artificial_limp * 1 + this.inj_any_other_loss * 1 + this.inj_com_mental_phy_shock * 1 + this.inj_pain_suffering * 1 +this. inj_loss_amenities * 1 + this.inj_disfiguration * 1 + this.inj_loss_of_marriage * 1 + this.inj_loss_ear_inc_har_dis * 1  + this.inj_loss_ami_life_span * 1  +  (this.inj_income *this. inj_per_loss_earning * this. multiplier)  * 1  ,
   injInterest:this.inj_interest,
   //id_insurance:'23432',
  //inj_income:'232',
  //inj_medical_treatment:'23423',
  //inj_permenant_disablity:'0',

 }
 console.log(postData);
  this.api.darsave("savePetitionerInjured",postData).subscribe((rec: any) => {
      
   alert(rec.Message);
   });
  console.log("--------------",postData);

}
savebutton2(){


  let postData={
      mode: 'addinsurance',
      vehicle_id:this.vehicle_reg_no,
      accident_id:this.accid,
      person_id: this.vname.id,
      person_type: this.vname.ptype,
      
 death_income:this.death_income,
 death_future_prospects:this.death_future_prospects,
 death_less_personal_expenses:this.death_less_personal_expenses,
 death_monthly_loss_depedency: (this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses,
 death_anual_loss_depedency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12,
 death_mulltiplier:this.death_mulltiplier,
 death_total_loss_dependency:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier,
 death_medical_expenses:this.death_medical_expenses,
 death_loss_consortium:this.death_loss_consortium,
 death_loss_for_love_affection:this.death_loss_for_love_affection,
 death_loss_estate:this.death_loss_estate,
 death_loss_funeral_expenses:this.death_loss_funeral_expenses,
 death_total_compensation:((this.death_income * 1 + this.death_future_prospects * 1) - this.death_less_personal_expenses)*12*this.death_mulltiplier * 1 + this.death_medical_expenses * 1  + this.death_loss_consortium  * 1 + this.death_loss_for_love_affection  * 1 + this.death_loss_estate * 1  + this.death_loss_funeral_expenses *1,
//id_insurance:64515,
death_interest:this.death_interest,




}
 this.api.darsave("savePetitionerDeceased",postData).subscribe((rec: any) => {
    
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();  });
 
 console.log("--------------",postData);





}


}