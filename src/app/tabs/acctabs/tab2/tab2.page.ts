import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx'
import { LocalstorageService } from '../../../services/localstorage.service';
import { Localdb } from '../../../services/localdb';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//const { Network } = Plugins;

// let handler = Network.addListener('networkStatusChange', (status) => {
//   console.log("Network status changed", status);
// });

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedLanguage: string;
  params: any; state_code: any;
  isAuthenticated = false;
  private userSub: Subscription;
  accid: any;
  offlineflag = false;
  name = null; role = null; flag = 0; dept: any;
  link = 'login';
  review = 'login';
  offline = 'login';
  mobiledevice: boolean;
  netstat: any = { "connected": false, "connectionType": "checking" };
  localSeverity = [{ 'id': '1', 'name': 'Fatal' }, { 'id': '2', 'name': 'Grievous Injury' }, { 'id': '3', 'name': 'Simple Injury Hospitalized' }, { 'id': '4', 'name': 'Simple Injury Non Hospitalized' }, { 'id': '5', 'name': 'No Injury' }];

  constructor(private translateConfigService: TranslateConfigService, private authService: AuthService, private network: Network
    , private localdb: LocalstorageService,private local: Localdb,
    private locationAccuracy: LocationAccuracy,
    private androidPermissions: AndroidPermissions,) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');

  }

  ngOnInit() {
    console.log("TAB2 Oninit");
    this.accid = localStorage.getItem('accid');

    this.state_code = localStorage.getItem('state_code');
    this.checkNetwork();
// this.mobiledevice = this.localdb.checkPlatform();
//         if (this.mobiledevice) {
//           this.checkGPSPermission();
//          // this.local.getlocalAccidentData();
//         }
    
    this.flag = 5;
    this.link = '/acctabs/tab1/location';
    this.review = '/acctabs/tab3';
    this.offline = '/acctabs/tab1/offline';

    this.authService.autoLogin(); console.clear();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log('user'); //console.log(user); // console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) { //console.log(user.name);

        localStorage.setItem('officename', user.name);
        localStorage.setItem('state_code', user.state_code);
        this.name = user.name; this.dept = user.dept;
        this.role = user.role; this.state_code = user.state_code;
        //this.role=5;
        this.flag = 1

        if (this.dept == 1) {  //  1;"Police"
          if (+this.role == 5) {
            this.link = '/acctabs/tab1/location';
          } else if (+this.role <= 4) {
            this.link = '/admintabs/tab1';
          } else {
            console.log('Police Link Not Defind');
          }

        } else if (this.dept == 2) {   //2;"Transport"
          this.link = '/acctabs/tab3';
        } else if (this.dept == 3) {   //3;"Highways"
          this.link = '/acctabs/tab3';
        } else if (this.dept == 4) {   //4;"Health"

          this.link = '/acctabs/tab1/patientregister';
          localStorage.setItem('hpid', user.userid);
          localStorage.setItem('hpname', user.name);

        } else {
          console.log('user dept Link Not Defind', user);
        }
        /*
                if(this.dept==4){
                  this.link='/acctabs/tab1';
                }
        
                else if( +this.role==6){
                  this.flag=6;  this.link='/acctabsedit/tab3';
                }else if( +this.role==5){
                  this.flag=5;  this.link='/acctabs/tab1/location';
                }else if(+this.role<=4){
                   this.flag=1; this.link='/admintabs/tab1';
                }else if(+this.role==50 || +this.role==80 || +this.role==90){
                  this.flag=5080;  this.link='/acctabs/tab3';
                } */

      } else {
        this.flag = 0
      }




    });
    //this.localdb.checkLocalStorage();

  }


  //Check if application having GPS access permission  
  checkGPSPermission() { console.log("checkGPSPermission requesting");
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    result => {
      if (result.hasPermission) {

        //If having permission show 'Turn On GPS' dialogue
        this.askToTurnOnGPS();
      } else {

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
  console.log("requestGPSPermission requesting");
  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
    if (canRequest) {
      console.log("4");
    } else {
      //Show 'GPS Permission Request' dialogue
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
        .then(
          () => {
            // call method to turn on GPS
            console.log("requestGPSPermission askToTurnOnGPS");
            this.askToTurnOnGPS();
          },
          error => { this.alertmsgGPS();
            //Show alert if user click on 'No Thanks'
            console.log("requestGPSPermission rejecting");
            //alert('You cannot use the application without giving permission to GPS');
            
          }
        );
    }
  });
} 

askToTurnOnGPS() {
  console.log("askToTurnOnGPS requesting");
  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {
      // When GPS Turned ON call method to get Accurate location coordinates
      console.log("GPS Permission accepted"); 
    },
    error => this.alertmsgLocation()
    //alert('Error requesting location permissions ' + JSON.stringify(error))
  );
}

alertmsgGPS(){
  alert('You cannot use the application without giving permission to GPS ')
  navigator['app'].exitApp();
}


alertmsgLocation(){
  alert('You cannot use the application without giving permission to Location ')
  navigator['app'].exitApp();
}

  languageChanged() {
    console.log('Language');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    localStorage.setItem('ln', this.selectedLanguage);
  }

  ionViewWillEnter() {
    console.log("IonViewWillEnter For Tab2Page")
    
    var platform_check = this.localdb.checkPlatform();
     
      if (this.checkNetwork()) {
        this.mobiledevice = this.localdb.checkPlatform();
        if (this.mobiledevice) {
          this.local.getlocalAccidentData();
        }
      }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.checkNetwork();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  checkNetwork() {
    if (this.network.type != "none") {
      console.log("TRUE")
      this.offlineflag = false;

      return true;
    }
    else {
      console.log("FALSE")
      this.offlineflag = true;

      return false;
    }
  }
  //  async networkcheck(){



  // this.netstat = await Network.getStatus(); console.log(' Network status');
  // //console.log(status); 
  // let handler = Network.addListener('networkStatusChange', (status) => {
  //   //console.log("Network status changed", status);
  //    this.netstat=status;

  //    //console.log('----------------------');
  //   // console.log(this.netstat);

  //  //  console.log('----------------------');
  // });

  // }
}
