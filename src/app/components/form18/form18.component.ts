import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-form18',
  templateUrl: './form18.component.html',
  styleUrls: ['./form18.component.scss'],
})
export class Form18Component implements OnInit {
  selacc:any;
  accid:any;
  constructor(private modalctrl: ModalController,private api:ApiService)
   {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    }
  accident_id:any;
  award_date:any;
  case_no:any;
  case_title:any;
  award_amount:any;
  date_notice_depositer:any;
  date_notice_tribunal:any;
  amount_interest:any;
  amount_deposit_date:any;
  amount_interest_uptodate:any;
  amount_status:any;
  action_taken:any;
  release_date:any;
  mode_release:any;
  remarks:any;

  maxdate:any;
  mindate:any;

  ngOnInit() {}
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }


  savebutton(){
  
    let postData={
      mode: 'award',
      accident_id:this.accid,
      award_date:this.award_date,
      case_no:this.case_no,
      case_title:this.case_title,
      award_amount:this.award_amount,
      date_notice_depositer:this.date_notice_depositer,
      date_notice_tribunal:this.date_notice_tribunal,
      amount_interest:this.amount_interest,
      amount_deposit_date:this.amount_deposit_date,
      amount_interest_uptodate:this.amount_interest_uptodate,
      amount_status:this.amount_status,
      action_taken:this.action_taken,
      release_date:this.release_date,
      mode_release:this.mode_release,
      remarks:this.remarks,
     
}


 this.api.post("mact",postData).subscribe((rec: any) => {
    
  //alert(rec.Message);
  alert(rec.msg);
  this.modalctrl.dismiss();
   });

console.log(postData);
  }
}
