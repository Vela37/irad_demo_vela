import { Component, OnInit } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/shared.service';

import { ChangepwdComponent } from '../profile/changepwd/changepwd.component';
import { ProfileupdateComponent } from '../profile/profileupdate/profileupdate.component';
import { Subscription } from 'rxjs';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {PmjayComponent} from '../profile/pmjay/pmjay.component';
import { Base64 } from '@ionic-native/base64/ngx';
import {environment  } from '../../../environments/environment';



import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import {HpinfrastructureComponent} from '../profile/hpinfrastructure/hpinfrastructure.component';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  postdata2 = { 'mode': '', 'language': '' };
  private userSub: Subscription; isAuthenticated = false;
  selectedLanguage: string; params: any; user: any;
  psdata: any;
  healthuser: any = null;

  userp = {
    "name": "",
    "username":null,
    "role": "",
    "dept": "",
    "ps": "",
    "office":null,
    "district": "",
    "state": "",
    "mobile":null,
    "email":null,
    "designation":null,
    "regno":null,
    "status": "",
  };
  options1: any;

  capturedSnapURL: string = "assets/logos/user.png";
  imgqty: number = 100;
  img: SafeResourceUrl = "assets/logos/user.png";

  profilepicbase:any=environment.apiUrl+'captcha/profilepic.php?';

  
  locationCoords: any;
  timetest: any;

  focount:any=null;

  constructor(
    private router: Router, private shserv:UsersService,
    private translateConfigService: TranslateConfigService,
    private api: ApiService, private authService: AuthService,
    private modalctrl: ModalController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private webview: WebView,
    private sanitizer: DomSanitizer,
    private plt: Platform,
    private base64: Base64,
    
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private alertController:AlertController,
    
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    console.log('selectedLanguage ', this.selectedLanguage);
    
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();
  }
  ngOnInit() {
    //this.checkGPSPermission();
    // alert('hospital_police');
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    console.log('selectedLanguage ', this.selectedLanguage);

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;

       this.img=environment.apiUrl+'captcha/profilepic.php?'+ this.user.userid;

      }

    });

   this.loadProfile();

  }

  showFOCountDetails(){


    this.api.post('profile.php', { mode: 'FOwisecount', ln: this.selectedLanguage }).subscribe((data: any) => {
    
      if(data.data.length!=0){
        this.focount=data.data;
      }else{
        this.focount=-1;
      }

    })

  }

  viewProfile(usrname) {
  
    console.log(usrname);
    this.shserv.viewProfile(usrname);
  
  }

  async editinfrasruture() {
    console.log("User Profile values", this.user);
    const modalped = await this.modalctrl.create({
      component: HpinfrastructureComponent,
      componentProps: { 'infrastr': this.healthuser }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {

      this.loadProfile();
 
    });
    return await modalped.present().then(_ => {
    
    });

  }

  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          console.log("checkGPSPermission if");
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          console.log("checkGPSPermission else");
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              console.log("requestGPSPermission if");
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              console.log("requestGPSPermission else");
              this.presentAlertConfirm();
              //alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        console.log("askToTurnOnGPS if");

        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => 
      this.presentAlertConfirm()
     // this.router.navigate['/settings']
      //alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Without GPS permission you cannot use this application. Are you sure?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {this.checkGPSPermission();}
      }, {
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  
    await alert.present();
  }


  doRefresh(event){
   
    this.loadProfile();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  loadProfile(){
    this.api.post('profile.php', { mode: 'profile', ln: this.selectedLanguage }).subscribe((res: any) => {


      if(res.error!=undefined){
        console.log('resdata',data);
        this.authService.logout();
        this.router.navigate(['/home']);
      }

      // console.log(res); 
      this.healthuser = null; var data = res.data[0];
      if (+this.user.dept <= 3 || +this.user.dept == 10 ||  +this.user.dept == 5 ||  +this.user.dept == 6 ||  +this.user.dept == 7) {


        this.userp.name =  data.name ;
        this.userp.username =  data.username ;
        // console.log('dataddd - ',this.userp.name); 
        this.userp.dept = data.get_department + ' - (' + data.dept + ')';
        this.userp.role = data.get_role_name;
        if(data.state_code!=null){
          this.userp.state = data.get_statename + ' - (' + data.state_code + ')';
        }else{           this.userp.state=null;        }
        
        if(data.district_code!=null){
          this.userp.district = data.get_ps_districtname + ' - (' + data.district_code + ')';
        }else{          this.userp.district=null;        }

        if(data.ps_code!=null){
          this.userp.ps = (data.ps_code == null) ? null : data.get_ps_name + ' - (' + data.ps_code + ')';
        }else{          this.userp.ps=null;        }

          this.userp.email =data.email;
          this.userp.mobile =data.mobile;
          this.userp.designation =data.designation;
          this.userp.regno =data.regno;
        this.userp.status = data.active;
        this.userp.office=data.office_id;

      } else {
        this.healthuser = res.data[0];
      }


      // if (data.dept == 1 && (data.role_code == 4 || data.role_code == 5)) {
      //   this.loadselection();
      // }

    });
  }

  async pmjayedit() {
    console.log("User Profile values", this.user);
    const modalped = await this.modalctrl.create({
      component: PmjayComponent,
      componentProps: { 'pmjayinfo': this.healthuser }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {

      this.loadProfile();
 
    });
    return await modalped.present().then(_ => {
    
    });

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
    localStorage.setItem('ln', this.selectedLanguage);

  }

  public loadselection() {

    this.postdata2.mode = 'hospital_police';

    this.selection(this.postdata2).subscribe(
      (success: any) => {
        this.options1 = success.hplist;
        console.log(success);


      },
      error => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {

    return this.api.post('datas.php', postdata2);

  }


  async userinfoEdit() {
    console.log("User Profile values", this.user);
    const modalped = await this.modalctrl.create({
      component: ChangepwdComponent,
      componentProps: { 'userinfo': this.user }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

      this.loadProfile();

      //if(dataReturned.data==true)
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }


  async profileEdit() {
    console.log("User Profile Edit", this.user);
    const modalped = await this.modalctrl.create({
      component: ProfileupdateComponent,
      componentProps: { 'profileeditinfo': this.userp }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      //if(dataReturned.data==true)
      this.loadProfile();
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }



  loadPoliceStations() {
    let postDate = {
      mode: 'loadPoliceStations',
      //zone:this.rtoinfo.zone
    }
    this.api.post('transportconfig', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.data.length > 0) {
        this.psdata = data.data;
      } else {
        this.psdata = -1
      }
      console.log(this.psdata);

    });

  }


  reDirect() {
    this.router.navigate(['/hospitalprofile']);
  }

  async selectImage() {
    if (this.plt.is('cordova')) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } else {
      console.log("Browser");
    }


  }



  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: this.imgqty,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    // var mainPhotolen=this.restingPlacePhotos.length;
    this.camera.getPicture(options).then(imagePath => {
      console.log(imagePath)
      let resPath = this.pathForImage(imagePath);
      this.getBase64StringByFilePath(imagePath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          var data = "data:image/jpeg;base64," + base64Only;
          console.log("Length ",base64Only);
          console.log("Data",data);
          this.uploadProfile(data);


          //do something with base64 string
        });
      this.img = resPath;
      let base64Image = 'data:image/jpeg;base64,' + imagePath;
      this.capturedSnapURL = base64Image;
      console.log("Base64",base64Image);
      
      

    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      //this.Path=converted;
      const safeImg = this.sanitizer.bypassSecurityTrustUrl(converted);
      console.log("CONVERTED-", converted)
      console.log("SAFEIMG" + safeImg)
      return converted;
    }
  }

  public getBase64StringByFilePath(fileURL: string): Promise<string> {

    return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
        resolve(base64File);
      }, (err) => {
        console.log(err);
      });
    })
  }

  uploadProfile(data) {
    let postDate = {
      mode: 'updateProfilepic',
      profilepic: data
    }
    this.api.post('profile.php', postDate).subscribe((data: any) => {
      console.log(data);      

    });

  }
}
