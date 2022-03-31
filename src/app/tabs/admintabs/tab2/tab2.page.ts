import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';

import { IonicModule, NavController, Platform } from '@ionic/angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { LocalstorageService } from '../../../services/localstorage.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedLanguage: string;
  params: any;
  accid: any;
  user: any;

  reportList: any; reporturl: any;
  reportList2: any; reporturl2: any;

  otherreportList: any;

  data: any;
  constructor(private translateConfigService: TranslateConfigService, private api: ApiService,
    public platform: Platform, public navCtrl: NavController, private iab: InAppBrowser, private localdb: LocalstorageService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();

    this.reportList = new Array(
      'Accidents Classified According to Month of the Year',  //  1
      'Accidents Classified According to Area and Time of the Day', //  2
      'Accidents Classified According to Weather Conditions', //  3
      'Accidents According to the Classification of Road', //  4
      'Accidents Classified According to Road Environment',
      'Accidents Classified According to Road Features',
      'Accidents Classified According to Junction Type',
      'Accidents Classified According to Traffic Control at Junction',
      'Accidents Classified According to Pedestrian Infrastructure',//9
      'Accidents Classified According to Type of Impacting Vehicle/Objects', //10
      'Accidents Classified According to Age of Impacting Vehicles',
      'Accidents Classified According to Load Condition of Involved Vehicle',
      'Accidents Classified According to Type of Collision', //13
      'Accidents Classified According to Type of Traffic Violations',
      'Accidents Classified According to Use/Non-use of Safety Device by Victim',
      'Accidents Classified According to License of Drivers',
      'Accidents Classified Accordingto Type of Road Users',
      'Accidents Classified According to Type of Victims, Age and Gender'
    );

    this.reporturl = new Array(
      '',
      'reports/report1.php?',
      'reports/report2.php?',
      'reports/report3.php?',
      'reports/report4.php?',
      'reports/report5.php?',
      'reports/report6.php?',
      'reports/report7.php?',
      'reports/report8.php?',
      'reports/report9.php?',
      'reports/report10.php?',
      'reports/report11.php?',
      'reports/report12.php?',
      'reports/report13.php?',
      'reports/report14.php?',
      'reports/report15.php?',
      'reports/report16.php?',
      'reports/report17.php?',
      'reports/report18.php?',


    );

    this.reportList2 = new Array(
      'State wise',
      'District wise'
    );
    this.reporturl2 = new Array(
      undefined,
      'reports/report_statewise.php?id=1',
      'reports/report_districtwise.php?state='
      // 'reports/report3.php',

    );
  }

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.accid = localStorage.getItem('accid');

    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log(this.user.state_code, '-', this.user);
    if (this.user.state_code != null) {
      this.reporturl2[1] = undefined;
      this.reporturl2[2] += this.user.state_code;
    } else {
      this.reporturl2[2] = undefined;
    }
    console.log(this.reporturl2);

    this.loadReport2();
  }

  checkPlatform() { console.log(this.platform);
    console.log("checkPlatform");
    if (this.platform.is('android')) {
      console.log("mobile :true");
      return true;
    } else {
      console.log("mobile :false");
    }
    return false;
  }

  ionViewDidEnter() {
    //this.createBarChart();
    // this.loadDashboard();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.loadReport2();
    refresher.target.complete();


  }

  loadReport2() {
    let postDate = {
      mode: 'otherReports',
    }
    this.api.post('reports.php', postDate).subscribe((data: any) => {

      this.otherreportList = data.data;

    });


  }

  /*viewDoc(){
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    
    this.document.viewDocument('assets/doc/doc1.PDF', 'application/pdf', options)
  }*/


  showReports(url) {


    //window.open(environment.apiUrl + url + '&token=' +  this.user._token, '_blank').focus();
     url=environment.apiUrl + url + '&token=' +  this.user._token
    this.openURL(url);
    return false;

    console.log(url);
    var platform_check = this.localdb.checkPlatform(); console.log(platform_check); //return false;
    if (platform_check) {

    let options: InAppBrowserOptions = {
      target:'_blank',
      location: 'no',//'yes' Or 'no' 
      hidden: 'no', //Or  'yes'
      clearcache: 'yes',
      clearsessioncache: 'yes',
      zoom: 'yes',//Android only ,shows browser zoom controls 
      hardwareback: 'yes',
      mediaPlaybackRequiresUserAction: 'no',
      shouldPauseOnSuspend: 'no', //Android only 
      closebuttoncaption: 'Close', //iOS only
      disallowoverscroll: 'no', //iOS only 
      toolbar: 'yes', //iOS only 
      enableViewportScale: 'no', //iOS only 
      allowInlineMediaPlayback: 'no',//iOS only 
      presentationstyle: 'pagesheet',//iOS only 
      fullscreen: 'yes',//Windows only    
    };

    this.platform.ready().then(() => {

      let token = this.user._token;
      const browser = this.iab.create(environment.apiUrl + url + '&token=' + token, '', options);
    });

  }else{

    window.open(environment.apiUrl + url + '&token=' +  this.user._token, '_blank').focus();


  }

  }

  showReport(flag) { 

let url=environment.apiUrl + this.reporturl[flag] + '&token=' +  this.user._token;

this.openURL(url); return false;

  

console.log(flag);
    var platform_check = this.localdb.checkPlatform(); console.log(platform_check); //return false;
    if (platform_check==true) {

      let options: InAppBrowserOptions = {
        target:'_blank',
        location: 'no',//'yes' Or 'no' 
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'yes',//Android only ,shows browser zoom controls 
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only 
        closebuttoncaption: 'Close', //iOS only
        disallowoverscroll: 'no', //iOS only 
        toolbar: 'yes', //iOS only 
        enableViewportScale: 'no', //iOS only 
        allowInlineMediaPlayback: 'no',//iOS only 
        presentationstyle: 'pagesheet',//iOS only 
        fullscreen: 'yes',//Windows only    
      };

      this.platform.ready().then(() => {

        let token = this.user._token;
        const browser = this.iab.create(environment.apiUrl + this.reporturl[flag] + '&token=' + token, '', options);
      });
    }else{

      window.open(environment.apiUrl + this.reporturl[flag] + '&token=' +  this.user._token, '_blank').focus();


    }

  }


  showReport2(flag) {

    var platform_check = this.localdb.checkPlatform();
    if (platform_check) {

    let options: InAppBrowserOptions = {
      target:'_blank',
      location: 'no',//'yes' Or 'no' 
      hidden: 'no', //Or  'yes'
      clearcache: 'yes',
      clearsessioncache: 'yes',
      zoom: 'yes',//Android only ,shows browser zoom controls 
      hardwareback: 'yes',
      mediaPlaybackRequiresUserAction: 'no',
      shouldPauseOnSuspend: 'no', //Android only 
      closebuttoncaption: 'Close', //iOS only
      disallowoverscroll: 'no', //iOS only 
      toolbar: 'yes', //iOS only 
      enableViewportScale: 'no', //iOS only 
      allowInlineMediaPlayback: 'no',//iOS only 
      presentationstyle: 'pagesheet',//iOS only 
      fullscreen: 'yes',//Windows only    
    };

    this.platform.ready().then(() => {


      let token = this.user._token;
      const browser = this.iab.create(environment.apiUrl + this.reporturl2[flag] + '&token=' + token, '', options);
    });

  }else{

    window.open(environment.apiUrl  + this.reporturl2[flag] + '&token=' +  this.user._token, '_blank').focus();


  }


  }

  openURL(url){

    //for webapp

   if(!this.localdb.checkPlatform()){
    window.open( url + '&token=' +  this.user._token, '_blank').focus(); return false;
   }else{
 
   // for mobile

 let options: InAppBrowserOptions = {
  target:'_blank',
  location: 'no',//'yes' Or 'no' 
  hidden: 'no', //Or  'yes'
  clearcache: 'yes',
  clearsessioncache: 'yes',
  zoom: 'yes',//Android only ,shows browser zoom controls 
  hardwareback: 'yes',
  mediaPlaybackRequiresUserAction: 'no',
  shouldPauseOnSuspend: 'no', //Android only 
  closebuttoncaption: 'Close', //iOS only
  disallowoverscroll: 'no', //iOS only 
  toolbar: 'yes', //iOS only 
  enableViewportScale: 'no', //iOS only 
  allowInlineMediaPlayback: 'no',//iOS only 
  presentationstyle: 'pagesheet',//iOS only 
  fullscreen: 'yes',//Windows only    
};

this.platform.ready().then(() => {

  let token = this.user._token;
  const browser = this.iab.create(url, '', options);
});


  }
}

}