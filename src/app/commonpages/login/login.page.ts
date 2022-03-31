import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateConfigService } from '../../translate-config.service';
import { DataService } from '../../services/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//import { Plugins } from ' /core';
import { environment } from 'src/environments/environment';
//import { randomBytes } from 'crypto';
import {Md5} from 'ts-md5/dist/md5';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
export enum ConnectionStatus {
  Online,
  Offline
}

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

import * as CryptoJS from 'crypto-js';
//console.log('hello',Md5.hashStr('hello'));

//const { Device } = Plugins;

//const { Network } = Plugins;

// let handler = Network.addListener('networkStatusChange', (status) => {
//   console.log("Network status changed", status);
// });

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedLanguage:string='en'; dev:boolean=false;
  params:any; d_uuid:any;
  isLoginMode = true;
  isLoading = false;  
  deviceInfo:any; dept=1;
  captcha:any;
  showPassword:boolean; passwordtype:string; captchasrc:string; capchanum=Math.floor((Math.random()*10000));;
  offlineflag=false;
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  fcmtoken: any;

  netstat:any={"connected":true, "connectionType":"checking"};  error: string = null;
  constructor( private router: Router,
    private uniqueDeviceID: UniqueDeviceID, private uid:Uid,
    private androidPermissions: AndroidPermissions,
    private authService: AuthService,
    private geolocation: Geolocation,
    private translateConfigService: TranslateConfigService,
    private dataService: DataService,
    private toastController: ToastController,
    private network: Network,
    private fcm: FCM,
    private platform: Platform,
    private api: ApiService,
   // private MD5: Md5
    )
   {
    this.selectedLanguage = localStorage.getItem('ln'); console.log('this.selectedLanguage',this.selectedLanguage);
    if(this.selectedLanguage==null) this.selectedLanguage='en';
    localStorage.setItem('ln',this.selectedLanguage);

    localStorage.setItem('dev','true');

    this.translateConfigService.setLanguage(this.selectedLanguage);
    //this.getPermission();
    //this.getUniqueDeviceID();

    this.showPassword=false; 
    this.captchasrc=environment.apiUrl+'captcha/captcha.php';
    console.log(this.captchasrc);
    this.dept=1;
   }

   SHpassword(){
    this.showPassword=!this.showPassword;
    this.dept=1;
   }
   languageChanged(evnt){ 

   this.translateConfigService.setLanguage(this.selectedLanguage);
   localStorage.setItem('ln',this.selectedLanguage);
   //this.selectedLanguage='te';
  // this.refresh();
 }
 refresh(): void {
  window.location.reload();
}

  ngOnInit() {
    this.dev = (localStorage.getItem('dev') === 'true');
   this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

   this.selectedLanguage = localStorage.getItem('ln');
   
   this.networkcheck();
   this.checkNetwork();
   this.initializeNetworkEvents();
    this.getPermission();
   // this.getUniqueDeviceID();
    //alert('MAC'+this.getID_UID('MAC'));
    //alert('UUID'+this.getID_UID('UUID'));
    localStorage.setItem('uuid1', this.getID_UID('UUID'));
   // localStorage.removeItem('userData');
   // localStorage.removeItem('accid');
  }
  reload_Captcha(){
    this.capchanum=Math.floor((Math.random()*10000));
    this.captchasrc=environment.apiUrl+'captcha/captcha.php?'+this.capchanum++;
    this.captcha='';

  }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => { this.d_uuid=uuid;
        console.log('uuid',uuid);
        localStorage.setItem('uuid', uuid);
        //alert('uuuuid'+JSON.stringify(uuid));
        //this.UniqueDeviceID = uuid;
      })
      .catch((error: any) => {
        console.log('uuid',error); 
       //  alert(JSON.stringify(error));
       // this.UniqueDeviceID = "Error! ${error}";
      });
  }

  getID_UID(type){
    if(type == "IMEI"){
      return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }

  getPermission(){

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if(res.hasPermission){
        
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          console.log("Persmission Granted Please Restart App!");
        }).catch(error => {
          console.log("Error! "+error);
        });
      }
    }).catch(error => {
      console.log("Error! "+error);
    });
  }

   async networkcheck(){
  
     await this.geolocation.getCurrentPosition().then((position) => {
      console.log(position); 

      let loc={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
        accuracy:position.coords.accuracy,
      };
      localStorage.setItem('logingps', JSON.stringify(loc));

     }).catch(error => {
      console.log("Error! "+error);
    });
    
    //const info = await Device.getInfo();
    //console.log(info);
   // this.deviceInfo=info;
   
   // localStorage.setItem('deviceInfo', JSON.stringify(info));
    //console.log('deviceInfo', JSON.stringify(info));

    //localStorage.setItem('uuid', info.uuid);


  // this.netstat = await Network.getStatus(); console.log(' Network status');
  // console.log(status); 
  // let handler = Network.addListener('networkStatusChange', (status) => {
  //   console.log("Network status changed", status); this.netstat=status;
  // });

  }

  onSubmit1(form: NgForm) { console.log(form);
    
    //console.log('hello',Md5.hashStr('hello'));
 
      if (!form.valid) {
        return;
      }

    this.error=null; 
    var userid = form.value.userid; //console.log(userid);
    var password = form.value.password; //console.log(password);
    var dept = form.value.dept; console.log('dept',dept);
    var encpassword= window.btoa(password);
     encpassword= window.btoa(encpassword);
  
    var captcha =form.value.captcha; //console.log(captcha);

    var rand=(Md5.hashStr(captcha)).toString().substring(3,13)
  
    encpassword= window.btoa(encpassword+'||'+window.btoa(captcha));
    var salt="QPALZM";
    var md5password=(Md5.hashStr(rand+salt+Md5.hashStr(password))).toString();
  
    if(password==''){ this.error='Please Enter Password'}
    if(userid==''){ this.error='Please Enter UserID'}
    let authObs: Observable<AuthResponseData>;

   
    if(this.error!=null) return;

    this.isLoading = true;
    if (this.isLoginMode) {
      localStorage.setItem(userid, captcha);
      authObs = this.authService.login(userid, md5password,dept,captcha,'');
    } else {
      authObs = this.authService.signup(userid, password);
    }

    authObs.subscribe(
      resData => { this.error = resData.message;
        console.log(resData); console.log('con success');
        this.isLoading = false; this.dataService.setOption('role',  resData.role);  
        if(resData.role==undefined){  console.log('login failed ');
        
        this.reload_Captcha();
      }else {
       
       // console.log('loc stor usrid',localStorage.getItem(resData.userid));
       // console.log(resData); console.log('con 1 success');
       var cap=localStorage.getItem(resData.userid);
       localStorage.removeItem(userid);
        if(userid==resData.userid && captcha==resData.localId && cap==resData.localId){
          this.getFcmtoken();
          this.router.navigate(['/home']);
          console.log('in');
        }else{
          this.error = 'Login Failed';
          this.reload_Captcha();
        }
        
        //this.router.navigate(['/acctabs/tab2']);
      }

      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
console.log(form);
    //form.reset();
  
  }

  onSubmit(form: NgForm) { console.log(form);
    
    //console.log('hello',Md5.hashStr('hello'));
 
      if (!form.valid) {
        return;
      }

    this.error=null; 
    var userid = form.value.userid.trim(); //console.log(userid);
    var password = form.value.password.trim(); //console.log(password);
    var dept = form.value.dept; console.log('dept',dept);
    var encpassword= window.btoa(password);
     encpassword= window.btoa(encpassword);
  
    var captcha =form.value.captcha.trim(); //console.log(captcha);
   //var captcha =Math.floor(1000 + Math.random() * 9000)+'';

    var rand=(Md5.hashStr(captcha)).toString().substring(3,13)
  
    encpassword= window.btoa(encpassword+'||'+window.btoa(captcha));
    var salt="QPALZM";
    var md5password=(Md5.hashStr(rand+salt+Md5.hashStr(password))).toString();
    console.log('md5password',md5password)
    var aesmd5password=this.encryptUsingAES256(md5password);
   // console.log(form.reset());
    //form.value.userid='';
   // form.value.password='';
    if(password==''){ this.error='Please Enter Password'}
    if(userid==''){ this.error='Please Enter UserID'}
    let authObs: Observable<AuthResponseData>;

   
    if(this.error!=null) return;

    this.isLoading = true;
    if (this.isLoginMode) {
      localStorage.setItem(userid, captcha);
      authObs = this.authService.login(userid, aesmd5password,dept,captcha,md5password);
    } else {
      authObs = this.authService.signup(userid, password);
    }

    authObs.subscribe(
      resData => { this.error = resData.message;
        console.log(resData); console.log('con success');
       // var dec_dept=resData.dept=this.get(resData.dept);
       // var dec_role=resData.role=this.get(resData.role);
      //  var dec_name=resData.name=this.get(resData.name);
        
      //  console.log("DECRYPT_VAL", dec_dept,dec_name,dec_role);
        this.isLoading = false; this.dataService.setOption('role',  resData.role);  
        if(resData.role==undefined){  console.log('login failed ');
        this.reload_Captcha();
      }else {
       
       // console.log('loc stor usrid',localStorage.getItem(resData.userid));
       // console.log(resData); console.log('con 1 success');
       var cap=localStorage.getItem(resData.userid);
       localStorage.removeItem(userid);
        if(userid==resData.userid && captcha==resData.localId && cap==resData.localId){
          this.getFcmtoken();
          console.log(form.reset());
          //alert("Note: All previously Logged in devices are Logged out");
          this.router.navigate(['/home']);
          console.log('in');
        }else{
          this.error = 'Login Failed';
          this.reload_Captcha();
          this.authService.logout();
        }
        
        //this.router.navigate(['/acctabs/tab2']);
      }

      },
      errorMessage => {
        console.log(errorMessage);
        this.reload_Captcha();
        this.error = 'Check Username Password and Captcha please ';
        this.isLoading = false;
        this.authService.logout();
      }
    );
console.log(form);
    //form.reset();
  
  }

  getFcmtoken() {
    
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {

      //Notifications
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        this.fcmtoken = token;
        console.log("Starting Saving Fcm Token");
        this.saveFcmtoken();
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


saveFcmtoken() {
  console.log("Saving Fcm Token");
  let postDate = {
    mode: 'fcmtoken',
    fcm: this.fcmtoken
  }
  this.api.post('pushnotification', postDate).subscribe((data: any) => {
    console.log(data);

  });
}


get(value){
  var key = CryptoJS.enc.Utf8.parse("veudhegorasusadh");
  //var iv = CryptoJS.enc.Utf8.parse(keys);
  let val="c5dKyBvTQ/sTeJSRJts/jg=="
  var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128,
      //iv: iv,
      mode: CryptoJS.mode.ECB,
      //padding: CryptoJS.pad.Pkcs7
  });

  console.log("Encrypt end=",decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
}

  ionViewDidEnter() {
    console.log("login Entered");
    this.reload_Captcha();

    this.networkcheck();
    this.getPermission();
    this.error = '';
    //this.reload_Captcha();

   // localStorage.removeItem('userData');
   // localStorage.removeItem('accid');
   // this.getUniqueDeviceID();
    //alert('MAC'+this.getID_UID('MAC'));
    //alert('UUID'+this.getID_UID('UUID'));
   // localStorage.setItem('uuid', this.getID_UID('UUID'));
  }

  hspRegister(){
    console.log('hspRegister');
    this.router.navigate(['/register']);
  }


  
  checkNetwork() {
    if (this.network.type != "none") {
      console.log("TRUE")
      this.offlineflag=false;
        return true;
    }
    else {
      console.log("FALSE")
      this.offlineflag=true;
        return false;
    }
  }

  public initializeNetworkEvents() {
    console.log("Network entered");
 
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
  
    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    }); 
  }
  
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
  
    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
    if(connection=='Online'){
      this.offlineflag=false;
    }
    else{
      this.offlineflag=true;
    }      
  }

  encryptUsingAES256(data) {
    //data=window.btoa(data);
    let _key = CryptoJS.enc.Utf8.parse("veudhegorasusadh");
    let _iv = CryptoJS.enc.Utf8.parse("0000000000000000");
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), _key, {
        keySize: 128,
       // iv: _iv,
        mode: CryptoJS.mode.ECB,
        //padding: CryptoJS.pad.Pkcs7
      });
    encrypted = encrypted.toString();

    console.log(encrypted);
    return encrypted;
  
  }
  decryptUsingAES256(en_data) {
    let _key = CryptoJS.enc.Utf8.parse("veudhegorasusadh");
    let _iv = CryptoJS.enc.Utf8.parse("0000000000000000");
    // let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    let decrypted = CryptoJS.AES.decrypt(
      en_data, _key, {
        keySize: 128,
       // iv: _iv,
        mode: CryptoJS.mode.ECB,
        //padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      console.log(decrypted);
      return decrypted;
  }
}
