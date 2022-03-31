import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../services/api.service';
import { mod_feedback } from '../../../models/model.userfeedback'; 
import { Router } from '@angular/router';
import { IonicModule, AlertController,ModalController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.scss'],
})
export class AddfeedbackComponent implements OnInit {

  selectedLanguage:string; msgList: any;
  feedbackform:FormGroup;
  passengers=new Array();
  accid:any;
  isSubmitted = false;
  loading = false;
  public local_feedback:mod_feedback;
  messages:any; nickname = 'irad';
  constructor(
    private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalctrl: ModalController,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.build_feedback_form();
    this.accid=localStorage.getItem('accid');
 //   alert(this.accid);



   }
   public build_feedback_form(){
    this.feedbackform = this.fb.group({
      
                            
                               source:[''],
                               contactdetails:[''],
                               datereceived:[''],
                               personname:[''],
                               formname:[''],
                               feedbacktype:[''],
                               description:['',[Validators.required]],

   })
     }

  ngOnInit() {

    this.loading=false;

  }
public addfeedback()
{
  this.isSubmitted = true;   
  if (!this.feedbackform.valid &&  !this.loading) {
   
    console.log('Please provide all the required values!')
    return false;
  } else {
    this.loading=true;
           //personname
           this.local_feedback=new mod_feedback();
           this.local_feedback.accid =this.accid;
           this.local_feedback.source =this.feedbackform.controls['source'].value;
           this.local_feedback.contactdetails =this.feedbackform.controls['contactdetails'].value;
           this.local_feedback.datereceived =this.feedbackform.controls['datereceived'].value;
           this.local_feedback.personname =this.feedbackform.controls['personname'].value;
           this.local_feedback.formname =this.feedbackform.controls['formname'].value;
           this.local_feedback.feedbacktype =this.feedbackform.controls['feedbacktype'].value;
           this.local_feedback.description =this.feedbackform.controls['description'].value;




           let postDate={
            mode:"addFeedback", 
           feedback:this.local_feedback
          }
          console.log('postDate',postDate);
          this.api.post('feedbacks',postDate).subscribe((data: any)=>{
            this.loading=false;
        
            console.log('data',data.data);
            this.closemodal();

           });


  }
}
public feedback(postData: any) {

  return this.api.post('feedback',postData);

}

async presentAlert(msg) {
  const alert = await this.alertCtrl.create({
    header: 'iRAD',
//    subHeader: 'Passenger',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}
get errorControl() {

  return this.feedbackform.controls;

}
closemodal(){
  this.modalctrl.dismiss();
}

}
