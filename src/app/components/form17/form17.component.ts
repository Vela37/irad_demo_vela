import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-form17',
  templateUrl: './form17.component.html',
  styleUrls: ['./form17.component.scss'],
})
export class Form17Component implements OnInit {
  maxdate:any;
  mindate:any;
  accident_id:any;
  investigation_delay:any;
  insurance_delay:any;
  award_date:any;
  create_bank_acc_near:any;
  date_bank_acc_create:any;
  date_passbook:any;
  permenent_res_addr:any;
  bank_acc_near:any;
  examined:any;
  

  mactexamined:any;
  datepassbook:any;
  selacc:any;
  accid:any;
  constructor(private modalctrl: ModalController,private api:ApiService) 
  {

    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
   }

  ngOnInit() {}
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }


  savebutton(){

    let postData={
      mode: 'compliance',
      accident_id:this.accid,
      investigation_delay:this.investigation_delay,
      insurance_delay:this.insurance_delay,
      award_date:this.award_date,
      create_bank_acc_near:this.create_bank_acc_near,
      date_bank_acc_create:this.date_bank_acc_create,
      date_passbook:this.award_date,
      permenent_res_addr:this.award_date,
      bank_acc_near:this.award_date,
      examined:this.award_date,
}


 this.api.post("mact",postData).subscribe((rec: any) => {
    
  //alert(rec.Message);
  alert(rec.msg);
  this.modalctrl.dismiss();
   });

console.log(postData);
  }

}
