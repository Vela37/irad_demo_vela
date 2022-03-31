import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';
import {UsersService } from '../../services/shared.service';
import { mod_feedback } from '../../models/model.userfeedback'; 
import { Router } from '@angular/router';
import { AddfeedbackComponent } from 'src/app/commonpages/feedback/addfeedback/addfeedback.component';
import { ReplyfeedbackComponent } from 'src/app/commonpages/feedback/replyfeedback/replyfeedback.component';
import { IonicModule, AlertController,ModalController,NavController , Platform } from '@ionic/angular';

import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { User } from '../../commonpages/login/user.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  selectedLanguage:string; msgList: any; filterData:any; searchTerm:any;
  isAuthenticated = false; user:User;
  private userSub: Subscription;
  feedbackform:FormGroup;
  passengers=new Array();
  accid:any; count:number=0;
  isSubmitted = false; feedbacks:any; loading:boolean=false;
  isLoading = false;
  public local_feedback:mod_feedback;
  messages:any; nickname = 'irad';
  constructor(
    private translateConfigService: TranslateConfigService,
    private fb:FormBuilder, private authService: AuthService,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalctrl: ModalController, private shserv:UsersService
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
      personname:[''],
      formname:[''],
      feedbacktype:[''],
      description:['',[Validators.required]],

   })
     }

     async addnewfeedback() {

      const modal = await this.modalctrl.create({
        component:AddfeedbackComponent,
        componentProps: {}
      });

     modal.onWillDismiss().then(dataReturned => {
        
     //   console.log('Receive: ', this.histroyreturn);
     this.funFeedback(0);
     
      });
      return await modal.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
      }); 
    }

   async deletefeedback(i){
      let feedback=this.feedbacks[i]; console.log(feedback);



      const alert = await this.alertCtrl.create({
        header: 'iRAD',
        //    subHeader: 'Passenger',
  
        message: `Are You Sure Want to Delete? `,
        buttons: [
          {
            text: 'Cancel',
           
            // role: 'cancel',
          },
          {
            text: 'CONFIRM',
            handler: () => {
              
              let postDate={
                mode:"hideFeedback", 
                id:feedback.id,
              }
              this.api.post('feedbacks',postDate).subscribe((data: any)=>{
                this.funFeedback(0);
            
               });

            }
  
          },
        ],
      });
  
      await alert.present();



      





    }


    


    async replyfeedback(i) {
      let feedback=this.feedbacks[i];
      const modal = await this.modalctrl.create({
        component:ReplyfeedbackComponent,
        componentProps: {
          'feedback':feedback,
        }
      });
      

     modal.onWillDismiss().then(dataReturned => {
        
     //   console.log('Receive: ', this.histroyreturn);
     this.funFeedback(0);
     
      });
      return await modal.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
      }); 
    }
  ngOnInit() {

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        //console.log(user.name);
      
        this.user=user; //console.log('this.user',this.user);
      }
    });


    this.funFeedback(0);

    

  }
public addfeedback()
{
  this.isSubmitted = true;
  if (!this.feedbackform.valid) {

    console.log('Please provide all the required values!')
    return false;
  } else {
           //personname
           this.local_feedback=new mod_feedback();
           this.local_feedback.accid =this.accid;
           this.local_feedback.personname =this.feedbackform.controls['personname'].value;
           this.local_feedback.formname =this.feedbackform.controls['formname'].value;
           this.local_feedback.feedbacktype =this.feedbackform.controls['feedbacktype'].value;
           this.local_feedback.description =this.feedbackform.controls['description'].value;

//console.log(this.local_feedback);
//return false;
           this.feedback(this.local_feedback).subscribe(
                (success:any) => {

                      this.presentAlert(success.error);
                      this.isLoading = false;
                      this.feedbackform.controls['formname'].setValue('');
                      this.feedbackform.controls['feedbacktype'].setValue('');
                      this.feedbackform.controls['description'].setValue('');

                         this.feedbackform.reset(this.feedbackform.value);
                    //  this.router.navigate(['acctabs/tab2']);

    },
    error => {
    console.log(error);
    } 
    );

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


setFilteredLocations(){
  this.filterData = this.feedbacks.filter((location) => {
    return location.username.toLowerCase().indexOf(this.searchTerm.toLowerCase().trim()) > -1;
  });
}



funFeedback(offset){
  if(offset==-1){
    if(this.feedbacks==undefined){
      console.log('data undefind');
      offset=0;
    }else{
      return false;
    }
  }

  this.loading=true;
  
  let postDate={
    mode:"loadFeedbacks", 
    type:"",
    offset:offset,
  }
  this.api.post('feedbacks',postDate).subscribe((data: any)=>{
    this.loading=false;

   // console.log('data',data.data);
    if(offset==0){ 
      this.feedbacks =data.data;
      this.count=data.count;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.feedbacks.push( data.data[i] );
      }
    }
    this.filterData= this.feedbacks;
   console.log('this.feedbacks - ',this.feedbacks.length);

   });
} 



refFeedback(event){
  console.log('Referesh Pending');
  this.funFeedback(0);
  event.target.complete();
}
scrollFeedback(event){
  if(this.feedbacks.length%10!=0) {
    console.log('Async operation has ended');
    event.target.disabled = true;
  }

  console.log('Scroll Pending');
  console.log('Pending Length ',this.feedbacks.length);
  this.funFeedback(this.feedbacks.length);
  event.target.complete();
}

viewProfile(username){
  console.log(username);
  this.shserv.viewProfile(username);
}


}
