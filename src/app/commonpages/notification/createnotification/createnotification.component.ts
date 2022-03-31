import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http/';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import {  PushnotificationService} from '../../../services/pushnotification.service';


@Component({
  selector: 'app-createnotification',
  templateUrl: './createnotification.component.html',
  styleUrls: ['./createnotification.component.scss'],
})
export class CreatenotificationComponent implements OnInit {
  //FCM Token
  //d99kFBMn2vw:APA91bG8VJllLA1wUYfoumaDG9Q06FeWcxjVeUFV2BHMCJXn0ok1ifwBZ0fAYZ6PqdgJ7NKm4MbGM2dZekYuiUolVHAFVspY0fo8A6rj1u4DMVAXLUcDvPLNymeznUW1LrrmLDUFA-km
  selectedLanguage: string; params: any;
  fcmtoken: any;
  fileType: any;
  filesPath: any;
  fileName: any;
  image;notification_img:any;
  
  notificationdata = {
    'title': '', 'body': '', 'fcm_token': '','name':'', 'image':''
  };
  constructor(private modalctrl: ModalController, 
    private api: ApiService, private http: HttpClient,
    private toastController:ToastController,private pushNotification:PushnotificationService,
    private fcm: FCM, private platform: Platform) { }

  ngOnInit() { }

  sendNotification() {
    let body = {
      "notification": {
        "title": this.notificationdata.title,
        "body": this.notificationdata.body,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "param1": "value1",
        "param2": "value2"
      },
      "to": this.notificationdata.fcm_token,
      "priority": "high",
      "restricted_package_name": ""
    }
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post("https://fcm.googleapis.com/fcm/send", body, {
      headers: options.set('Authorization', 'key=AAAAiXSpLGE:APA91bFwOGIoSJUbcq0WCcjrb-m4F7VE8Gmikcs3t-Wt9nqRMLkEvgcwfeIbWAjtFiu-mnOt_xBfPG2gbbWv37eHjzoJ2GaLAHxx1pDEb5JK2nqmYr37-1ijdIrVvarBskkoGxKPji8Z'),
    })
      .subscribe();
  }

  gettingFcmtoken(){
    this.notificationdata.image=this.image;
    let postDate = {
      mode: 'getfcmtoken',
      data: this.notificationdata,
    }
    this.api.post('notification', postDate).subscribe((data: any) => {
      if(data!=null){
        console.log(data);
        this.notification_img=data.img_url;
        for(var i=0;i<data.data.length;i++){
          this.notificationdata.fcm_token=data.data[i].fcm;
          console.log(this.notificationdata);
          this.pushNotification.sendpushNotification(this.notificationdata.title,this.notificationdata.body,this.notificationdata.fcm_token,this.notification_img);
          //this.sendNotification();
        }
      }      
        
     this.modalctrl.dismiss(true);
      
    });
  }

  changeListener($event): void {
    // this.reportname='wound';
    console.log("EVENT///", $event);
    console.log("$event.target.files", $event.target.files);

    this.filesPath = $event.detail.value;
    this.fileName = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
    this.fileType = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);


    if (this.fileType == "jpg") {
      console.log("Proper Format")
      this.readThis();

    } else {
      console.log("Improper format");
      this.presentToast("Select a proper file type");
    }



  }

  readThis() {

    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log("base 64 VAL", this.image);
    

    }
    console.log("Filepath", this.filesPath);

    myReader.readAsDataURL(file);
  }

  postImg(img) {
    let postDate = {
      mode: "loadFeedbacks",
      type: "",
      offset: "",
    }
    this.api.post('feedbacks', postDate).subscribe((data: any) => {
      


    });
  }


  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  getFcmtoken() {

    this.platform.ready().then(() => {
      if (this.platform.is('android')) {

        //Notifications
        this.fcm.subscribeToTopic('all');
        this.fcm.getToken().then(token => {
          this.fcmtoken = token;
          console.log("Starting Saving Fcm Token");
          console.log("FCM token", token);
        })
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })
        this.fcm.onTokenRefresh().subscribe(token => {
          this.fcmtoken = token;
          console.log("FCM TOKEN", token);
        });
        //end notifications.
      }

    });

  }

  closemodal() {
    this.modalctrl.dismiss();
  }
}
