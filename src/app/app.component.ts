//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { AuthService } from './commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { TranslateConfigService } from './translate-config.service';
import { environment } from '../environments/environment';

import { NotificationComponent } from '../app/tabs/notification/notification.component';
import { AlertController, ModalController } from '@ionic/angular';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Location } from '@angular/common';
import { QueryList, ViewChildren } from '@angular/core';

import { IonRouterOutlet } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  backButtonSubscription;
  img: SafeResourceUrl = "assets/logos/user.png";

  version: any = environment.version
  allpages = {
    "login": {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    "home": {
      title: 'Home',
      url: '/acctabs/tab2',
      icon: 'home'
    },
    "dashboard": {
      title: 'Dashboard',
      url: '/admintabs',
      icon: 'desktop'
    },
    "profile": {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    "settings": {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }, "courtprofile": {
      title: 'Court Info',
      url: '/courtprofile',
      icon: 'ribbon'
    },
    "legalprofile": {
      title: 'Legal Info',
      url: '/legalprofile',
      icon: 'ribbon'
    },
    "insuranceprofile": {
      title: 'Insurance Info',
      url: '/insuranceprofile',
      icon: 'cash-outline'
    },
    "usermanage": {
      title: 'User Management',
      url: '/usermanagement',
      icon: 'people'
    },
    "link": {
      title: 'Link',
      url: '/rolepersonalization',
      icon: 'link'
    },
    "stationinfo": {
      title: 'Station Info',
      url: '/stationinfo',
      icon: 'trail-sign'
    },
    "feedback": {
      title: 'Feedback',
      url: '/feedback',
      icon: 'create'
    },
    "help": {
      title: 'Help',
      url: '/help',
      icon: 'help-circle'
    },
    "about": {
      title: 'About iRAD',
      url: '/about',
      icon: 'information-circle'
    },
    "releasenotes": {
      title: 'Release Notes',
      url: '/releasenotes',
      icon: 'logo-firebase'
    }

  };

  pages = [];

  isAuthenticated = false;
  private userSub: Subscription;
  name = null; role = null; logintime: any;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform, private alertCtrl: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private modalctrl: ModalController,
    private translateConfigService: TranslateConfigService,
    private _location: Location,
    private alertController: AlertController,
    private fcm: FCM
  ) {
    this.backButtonEvent();
    this.initializeApp();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    console.log('selectedLanguage ', this.selectedLanguage);

    this.pages.push(this.allpages['home']);

  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {

        var temparray = ['/admintabs/tab1', '/acctabs/tab2', '/login'];

        if (temparray.includes(this.router.url)) {

          if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
            this.lastTimeBackPress = new Date().getTime();
            this.presentAlertConfirm();
          } else {
            console.log("3");
            navigator['app'].exitApp();
          }

        } else {
          console.log("1");
          await this._location.back();
        }

        /*
                if (this.router.url != '/profile') {
                  // await this.router.navigate(['/']);
                  console.log("1");
                  await this._location.back();
                } else if (this.router.url === '/profile') {
                  console.log("2");
                  if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
                    this.lastTimeBackPress = new Date().getTime();
                    this.presentAlertConfirm();
                  } else {
                    console.log("3");
                    navigator['app'].exitApp();
                  }
                }
                */
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }


  ngOnInit() {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    console.log('selectedLanguage ', this.selectedLanguage);

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) { //console.log(user.name);

        this.logintime = localStorage.getItem('logintime'); console.log('login time' + this.logintime);
        this.name = user.name;
        this.img = environment.apiUrl + 'captcha/profilepic.php?' + user.userid;
        this.role = user.role;
        if (+this.role == 40 || +this.role == 50 || +this.role == 80 || +this.role == 90 || +this.role == 37) {
          this.pages = [];
          this.pages.push(this.allpages['home']);
          this.pages.push(this.allpages['profile']);
          this.pages.push(this.allpages['settings']);
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);
        } else if (+this.role > 30 && +this.role < 36) {
          this.pages = [];
          this.pages.push(this.allpages['dashboard']);
          this.pages.push(this.allpages['profile']);
          // this.pages.push(this.allpages['settings']);
          this.pages.push(this.allpages['usermanage']);
          //  this.pages.push(this.allpages['link']);
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);

        } else if (+this.role == 5) {
          this.pages = [];
          this.pages.push(this.allpages['home']);
          this.pages.push(this.allpages['profile']);
          this.pages.push(this.allpages['settings']);
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);

          //  this.router.navigate(['/acctabs/tab2']);

        } else if (+this.role == 4) {
          this.pages = [];
          this.pages.push(this.allpages['dashboard']);
          this.pages.push(this.allpages['profile']);
          this.pages.push(this.allpages['settings']);
          this.pages.push(this.allpages['usermanage']);
          this.pages.push(this.allpages['stationinfo']);
          // this.pages.push(this.allpages['link']);
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);

        } else if (+this.role <= 3) {
          this.pages = [];
          this.pages.push(this.allpages['dashboard']);
          this.pages.push(this.allpages['profile']);
          this.pages.push(this.allpages['settings']);
          this.pages.push(this.allpages['usermanage']);
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);



        } else if (+user.dept == 3) {
          this.pages = [];
          if (+user.role != 75) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          } else {
            this.pages.push(this.allpages['home']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }

        } 
        else if (+user.dept == 5) {
          this.pages = [];
          if (+user.role == 64) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
             this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          } else if (+user.role == 61) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['courtprofile']);
             this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          } 
          else if (+user.role== 65) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['courtprofile']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }
          else {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['courtprofile']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }

        }
        else if (+user.dept == 6) {
          this.pages = [];
          if (+user.role == 20) {

            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            //this.pages.push(this.allpages['legalprofile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          } 
          else if (+user.role== 22) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['legalprofile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }
          else {
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }

        }

        else if (+user.dept == 7) {
          this.pages = [];
          if (+user.role == 24) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            //this.pages.push(this.allpages['insuranceprofile']);
             this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['feedback']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          } 
          else if (+user.role== 25 || +user.role== 26 ) {
            this.pages.push(this.allpages['dashboard']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }
          else {
            this.pages.push(this.allpages['about']);
            this.pages.push(this.allpages['profile']);
            this.pages.push(this.allpages['settings']);
            this.pages.push(this.allpages['usermanage']);
            this.pages.push(this.allpages['releasenotes']);
            this.pages.push(this.allpages['help']);
          }

        }
        else if (+user.dept == 10) {
          this.pages = [];

          this.pages.push(this.allpages['dashboard']);
          this.pages.push(this.allpages['profile']);
          this.pages.push(this.allpages['settings']);
          if (user.district_code == null) { this.pages.push(this.allpages['usermanage']); }
          this.pages.push(this.allpages['feedback']);
          this.pages.push(this.allpages['about']);
          this.pages.push(this.allpages['releasenotes']);
          this.pages.push(this.allpages['help']);

        }

      } else {
        this.pages = [];
        this.pages.push(this.allpages['login']);
        this.pages.push(this.allpages['settings']);
        this.pages.push(this.allpages['about']);
        this.pages.push(this.allpages['releasenotes']);
        this.pages.push(this.allpages['help']);
      }



    });


    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map(p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });


  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      var platform_check = this.checkPlatform();
      console.log("Mobile True", platform_check);
      if (platform_check) {

        this.fcm.onNotification().subscribe(data => {
          console.log(data);


          if (data.wasTapped) {
            var a = [];
            var array = [];
            var check_notify = localStorage.getItem('notification');
            console.log("Check Notify", check_notify);
            if (localStorage.getItem('notification') != null) {
              array = JSON.parse(localStorage.getItem('notification'));
            }

            array.push(data);
            console.log("ARRAY", array);
            localStorage.setItem('notification', JSON.stringify(array));

            console.log('Received in background');
            console.log("Tapped and navigating");
            this.router.navigate(['/notification']);
          } else {
            console.log('Received in foreground');
          }


        });
      }
    });
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


  async onLogout() {


    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Do You want to <strong>Logout</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');

            console.log(' this.authService.logout()');
            this.authService.logout();
            localStorage.removeItem('usrData');
            localStorage.removeItem('selacc');
            localStorage.clear();
            this.name = '';
            this.pages = [];
            this.pages.push(this.allpages['login']);
            this.pages.push(this.allpages['about']);


          }
        }
      ]
    });

    await alert.present();



  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  selectedLanguage: string;
  params: any



  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
  }

  async openNotification() {
    const modalped = await this.modalctrl.create({
      component: NotificationComponent, cssClass: 'fullscreen',
      componentProps: { 'notification': '' }
      /* componentProps: { 
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);

    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }





}
