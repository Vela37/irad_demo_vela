import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, AlertController,ModalController,NavController , Platform } from '@ionic/angular';
import { ApiService} from '../../../services/api.service';


@Component({
  selector: 'app-replyfeedback',
  templateUrl: './replyfeedback.component.html',
  styleUrls: ['./replyfeedback.component.scss'],
})
export class ReplyfeedbackComponent implements OnInit {

  @Input() feedback:any;
  feedbackuser:any;
  replytype:any;
  msg:any;
  replymsg:any; f:any;
  loading=false;
  constructor(    private modalctrl: ModalController ,private api:ApiService,   ) { }

  ngOnInit() {
    this.loading=false;
    this.f=this.feedback
    console.log(this.feedback);
  }
  closemodal()
  {
  
    this.modalctrl.dismiss();
  }
 
 cancelmodal()
 {
   //this.histroy = { accid:this.accid,nov:this.nov}; 

   this.modalctrl.dismiss();
 }

 saveModal()  {
  //let data= { 'geninfo':'geninfo'};
  this.loading=true;
  let postDate={
    mode:"replyFeedback", 
   id:this.f.id,
   reply:this.replymsg
  }
  console.log('postDate',postDate);
  this.api.post('feedbacks',postDate).subscribe((data: any)=>{
    this.loading=false;

    console.log('data',data.data);
    this.closemodal();

   });

// this.modalctrl.dismiss(true);
}


}
