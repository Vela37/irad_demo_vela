import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { arrayobject } from 'src/app/services/arrayobject';


@Component({
  selector: 'app-addchild',
  templateUrl: './addchild.component.html',
  styleUrls: ['./addchild.component.scss'],
})
export class AddchildComponent implements OnInit {


  @Input() accid:any;
  @Input() id:any;
  @Input() type:any;

 	
  childname: any;
  childage: any;
  childgen:any;
  childfather:any;
  childmother:any;
  childguardian:any;
  familyincome:any;
  childperadd:any;
  childpresadd:any;
  childfamilyno:any;
  childable:any;
  preslivcon:any;
  childcaste:any;

  ceducatiobstatus:any;
  ewsquota:any;
  notattendsch:any;
  corpan:any;
  govother:any;
  privman:any;
  montfee:any;
  annualfee:any;
  privatefee:any;
  logisticfee:any;
  skilldev:any;
  costinvolved:any;
  

  constructor(private modalctrl: ModalController,private api:ApiService, private authService: AuthService) { }

  childanyinju:any;
  bodypartloss:any;
  councilingtreat:any;
  longtermsupport:any;
  costimmediate:any;
  costlong:any;
  dietnut:any;

  ngOnInit() {}
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  savebutton() {
    

  
    let postData={

      mode: 'dar_pedestrian',
      name: this.childname,
      age: this.childage,
      sex: this.childgen,
      caste: this.childcaste,
      father_name: this.childfather,
      mother_name: this.childmother,
      guardian_name: this.childguardian,
      family_income: this.familyincome,
      permanent_address: this.childperadd,
      present_address: this.childpresadd,
      contact_no: this.childfamilyno,

      childrenable: this.childable,

      economic_condition: this.preslivcon,
      level_of_education: this.ceducatiobstatus,
      ews_quota: this.ewsquota,
      going_to_school_or_not: this.notattendsch,

      private_management: this.corpan,
      // govotherboards: this.govother,
      // privateman: this.privman,

      monthly_school_fee: this.montfee,
      annual_school_fee: this.annualfee,
      pvt_tution_fee: this.privatefee,

      childlogisticfee: this.logisticfee,

      cost_of_skill_development: this.skilldev,
      childcostinvolved: this.costinvolved,

      any_injury: this.childanyinju,
      loss_of_body_part: this.bodypartloss,
      psychological_counselling_required: this.councilingtreat,
      long_term_support_required: this.longtermsupport,
      cost_immediate_treatment: this.costimmediate,
      cost_longterm_treatment: this.costlong,
      diet_nutrition_expenses: this.dietnut,
      acc_id: this.accid,
      user_type:this.type,
      whose_child: this.id

    }

    console.log("----->", postData);
    this.api.darsave('user/insertVictimChildDetails',postData).subscribe((data: any)=>{


    //  alert("Details added");
     // alert(data.msg);
  //  this.closeModal();    
      });
      alert("Details added");
      this.closeModal();
    console.log("--------------",postData);
  }


}
