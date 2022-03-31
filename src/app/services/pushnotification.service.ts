import { ApiService } from './api.service';
import { Platform } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http/';

@Injectable({
    providedIn: 'root'
  })
export class PushnotificationService {
    devicetype: boolean = false;
    notificationdata = {
      'title': '', 'body': '', 'fcm_token': '','name':'', 'image':''
    };
    constructor(
        private platform: Platform,
        private fcm:FCM,
        private api: ApiService,
        private httpcli:HttpClient
    ) {

        this.devicetype = this.checkPlatform();
        if (this.devicetype) {
        }
    }

    checkPlatform() {
        console.log("checkPlatform");
        if (this.platform.is('cordova')) {
            console.log("mobile :true");
            return true;
        } else {
            console.log("mobile :false");
        }
        return false;
    }

    sendpushNotification(title,msg,token,img){
        var titlemsg="Title Irad";
        var bodymsg="Sample msg";
        var fcmtoken="fgh9Nxf43bY:APA91bGLlrBV16c6o2aIqkWB5beNVqHuMa5XKgPUgufDXgQAWXNwB37yEtaMMpHE_CSYqej13RRIubbl2yWCumAmta_rPKDXOaxhD1VZ4q9O5iWCuwFpWZvyOc6ubxaCK6Hd_mmHvCbd"
        let body = {
            "notification": {
              "title": title,
              "body": msg,
              "sound": "default",
              "click_action": "FCM_PLUGIN_ACTIVITY",
              "icon": "https://irad.parivahan.gov.in/favicon.ico",
              "image": img,    
            },
          "data": {
            "title": title,
            "message": msg,
            "image": img,
          },
            "to": token,
            "priority": "high",
            "restricted_package_name": ""
          }
          let options = new HttpHeaders().set('Content-Type', 'application/json');
          this.httpcli.post("https://fcm.googleapis.com/fcm/send", body, {
            headers: options.set('Authorization', 'key=AAAAiXSpLGE:APA91bFwOGIoSJUbcq0WCcjrb-m4F7VE8Gmikcs3t-Wt9nqRMLkEvgcwfeIbWAjtFiu-mnOt_xBfPG2gbbWv37eHjzoJ2GaLAHxx1pDEb5JK2nqmYr37-1ijdIrVvarBskkoGxKPji8Z'),
          }).subscribe();
    }

    sendpushNotificationmsg(title,msg,token){
      var titlemsg="Title Irad";
      var bodymsg="Sample msg";
      var fcmtoken="fgh9Nxf43bY:APA91bGLlrBV16c6o2aIqkWB5beNVqHuMa5XKgPUgufDXgQAWXNwB37yEtaMMpHE_CSYqej13RRIubbl2yWCumAmta_rPKDXOaxhD1VZ4q9O5iWCuwFpWZvyOc6ubxaCK6Hd_mmHvCbd"
      let body = {
          "notification": {
            "title": title,
            "body": msg,
            "sound": "default",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "https://irad.parivahan.gov.in/favicon.ico",
          },
        "data": {
          "title": title,
          "message": msg,
        },
          "to": token,
          "priority": "high",
          "restricted_package_name": ""
        }
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.httpcli.post("https://fcm.googleapis.com/fcm/send", body, {
          headers: options.set('Authorization', 'key=AAAAiXSpLGE:APA91bFwOGIoSJUbcq0WCcjrb-m4F7VE8Gmikcs3t-Wt9nqRMLkEvgcwfeIbWAjtFiu-mnOt_xBfPG2gbbWv37eHjzoJ2GaLAHxx1pDEb5JK2nqmYr37-1ijdIrVvarBskkoGxKPji8Z'),
        }).subscribe();
  }

    gettingFcmtoken(){
      let postDate = {
        mode: 'getfcmtoken',
        data: this.notificationdata,
      }
      this.api.post('notification', postDate).subscribe((data: any) => {
        if(data!=null){
          console.log(data);
          for(var i=0;i<data.data.length;i++){
            this.notificationdata.fcm_token=data.data[i].fcm;
            console.log(this.notificationdata);
            this.sendpushNotificationmsg(this.notificationdata.title,this.notificationdata.body,this.notificationdata.fcm_token);
            //this.sendNotification();
          }
        }      
          
      
        
      });
    }

    sendNotification(user,type,accid){

      let postDate = {
        mode: 'getNotificationDetails',
        user:user,
        type:type,
        accid:accid
      }

      this.api.post('notification', postDate).subscribe((data: any) => {
        if(data!=null){
          console.log(data);
          for(var i=0;i<data.tockens.length;i++){
                this.sendpushNotificationmsg(data.title,data.body,data.tockens[i].fcm);
            //this.sendNotification();
          }
        }      
          
      
        
      });

    }

}