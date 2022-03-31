import { Component, OnInit } from '@angular/core';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http/';
import { ApiService} from '../../services/api.service';
import {  PushnotificationService} from '../../services/pushnotification.service';
import { CreatenotificationComponent } from '../../commonpages/notification/createnotification/createnotification.component';
import { IonicModule, AlertController,ModalController,NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  fcmtoken: any;
  selacc:any;accid:any;
  notifications:any;loading:boolean=false;count:number=0;
  dev:boolean=false; user:any;
  notification_count:number=0; 
  reverse_notification:any[];

  constructor(private fcm:FCM,private platform: Platform,private http:HttpClient,
    private api:ApiService,private modalctrl: ModalController,private pushNotification:PushnotificationService,) { 
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
   // this.accid = this.selacc.accid;
    console.log("selacc",this.selacc);
  }

  ngOnInit() {
    this.user= JSON.parse(localStorage.getItem('userData'));
    this.dev = (localStorage.getItem('dev') === 'true');
    this.notifications=JSON.parse(localStorage.getItem('notification'));
    
    console.log("NOTIFICATION oninit",this.notifications)

    if(this.notifications==null){
      console.log("NOTIFICATION oninit",null);
      this.notification_count=0;
    }else{
      this.reverse_notification = this.notifications.reverse(); 
      this.notification_count=this.notifications.length;
    }

  }

  ionViewDidEnter(){
    this.notifications=JSON.parse(localStorage.getItem('notification'));
    

    if(this.notifications==null){
      console.log("NOTIFICATION oninit",null);
      this.notification_count=0; this.reverse_notification=null;
    }else{
      this.reverse_notification = this.notifications.reverse(); 
      this.notification_count=this.notifications.length;
    }
    
  }

  clearNotification(){
    localStorage.removeItem('notification');
    this.notifications=null;
    this.ionViewDidEnter();
  }

  testNotification(){
    this.pushNotification.sendNotification('OWN','testNotification','Hello');

  }

  deleteNotification(flag){

  }
  pslocationupdate(){
    this.pushNotification.sendNotification('PSLOCATIONUPDATE','PSLOCATIONUPDATE','Hello');
  }
  
funNotification(offset){
  if(offset==-1){
    if(this.notifications==undefined){
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
      this.notifications =data.data;
      this.count=data.count;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.notifications.push( data.data[i] );
      }
    }

   console.log('this.feedbacks - ',this.notifications.length);

   });
} 



refNotification(event){
  console.log('Referesh Pending');
  //this.funNotification(0);
  this.ionViewDidEnter();
  event.target.complete();
}

scrollNotification(event){
  if(this.notifications.length%10!=0) {
    console.log('Async operation has ended');
    event.target.disabled = true;
  }

  console.log('Scroll Pending');
  console.log('Pending Length ',this.notifications.length);
  this.funNotification(this.notifications.length);
  event.target.complete();
}


  async createNotification() {

    const modal = await this.modalctrl.create({
      component:CreatenotificationComponent,
      componentProps: {}
    });

   modal.onWillDismiss().then(dataReturned => {
      
   //   console.log('Receive: ', this.histroyreturn);
   //this.funNotification(0);
   
    });
    return await modal.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
    }); 
  }

}
