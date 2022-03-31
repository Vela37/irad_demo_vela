import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-insurancedeathedit',
  templateUrl: './insurancedeathedit.component.html',
  styleUrls: ['./insurancedeathedit.component.scss'],
})
export class InsurancedeatheditComponent implements OnInit {
  @Input() insurancedeath: any;
  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {

    console.log(this.insurancedeath)
  }

  closeModal()  {
    let reply = { 'geninfo':this.insurancedeath.person_id};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
 saveModal(){
  let postData={

    accident_id:this.insurancedeath.accident_id,
    person_id:this.insurancedeath.person_id,
    death_income:this.insurancedeath.death_income, 
    death_future_prospects:this.insurancedeath.death_future_prospects, 
    death_less_personal_expenses:this.insurancedeath.death_less_personal_expenses, 
    death_monthly_loss_depedency:this.insurancedeath.death_monthly_loss_depedency, 
    death_anual_loss_depedency:this.insurancedeath.death_anual_loss_depedency, 
    death_mulltiplier:this.insurancedeath.death_mulltiplier, 
    death_total_loss_dependency:this.insurancedeath.death_total_loss_dependency, 
    death_medical_expenses:this.insurancedeath.death_medical_expenses, 
    death_loss_consortium:this.insurancedeath.death_loss_consortium, 
    death_loss_for_love_affection:this.insurancedeath.death_loss_for_love_affection, 
    death_loss_estate:this.insurancedeath.death_loss_estate, 
    death_loss_funeral_expenses:this.insurancedeath.death_loss_funeral_expenses, 
    death_total_compensation:this.insurancedeath.death_total_compensation, 
    
   
     
   }


   this.api.darsave("updateinsudeath",postData).subscribe((rec: any) => {

    //alert(rec.Message);
   // alert("sucess");
  //  this.modalctrl.dismiss();
  });
  // console.log(postData);
 }
}
