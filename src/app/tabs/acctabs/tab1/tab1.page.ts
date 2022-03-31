import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { ModalController } from '@ionic/angular';
import { AccsubmitComponent } from "../../../popups/accsubmit/accsubmit.component";
import { SubmitoshoComponent } from "../../view/accview/submitosho/submitosho.component";


import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectedLanguage: string;
  params: any;
  user
  accid: any;
  selacc: any;

  v_pending: number;
  v_total: number;

  p_pending: any;
  p_total: any;

  ped_pending: any;
  ped_total: any;

  img_pending: any;
  img_total: any;

  env_pending: any;
  env_total: any;
  ped_road: any;

  genral: number;

  complete: boolean = true;
  postdat = { 'mode': '', 'accid': '' };

  role: any; trans: any; trans_total: any; dept: string;
  dev:boolean=false;
  loginuser: {
    userid: string;
    name: string;
    role: string;
    dept: string;
    state_code: string;
    district_code: string;
    station_code: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
  };

  constructor(private api: ApiService,
    private dataService: DataService,

    private modalctrl: ModalController,
    public navCtrl: NavController,
    public route:Router,

    private translateConfigService: TranslateConfigService) {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    //    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // this.accid=localStorage.getItem('accid');
    // this.checkvechilecount();

    const userData: {
      userid: string;
      name: string;
      role: string;
      dept: string;
      state_code: string;
      district_code: string;
      station_code: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.role = userData.role; //console.log('role',userData)
    this.dept = userData.dept;
    this.loginuser = JSON.parse(localStorage.getItem('userData'));
  }
  checkvechilecount() {
    // alert(this.accid);
    this.postdat.mode = 'allpending';
    this.postdat.accid = this.selacc.accid;
    this.getpending(this.postdat).subscribe(
      (success: any) => {


        console.log(success.data[0]);
        this.v_total = success.data[0][1];
        this.v_pending = success.data[0][2];

        this.p_total = success.data[0][3];
        this.p_pending = success.data[0][4];

        this.ped_total = success.data[0][5];
        this.ped_pending = success.data[0][6];

        this.ped_road = success.data[0][7];
        this.genral = success.data[0][8];

        this.trans = success.data[0][9];
        this.trans_total = success.data[0][10];
        console.log('trans', this.trans);

        if (this.v_total == this.v_pending && this.p_total == this.p_pending && this.ped_total == this.ped_pending && this.ped_road == 1 && this.v_total == this.trans) {
          this.complete = false;
        }
        //  v_total:any;
      },
      error => {


      }
    );
  }
  public getpending(postdat) {

    return this.api.post('pending', postdat);


  }
  gotoGallery(flag){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        img_type: flag
      }
  };

  console.log("Sending to Gallery",navigationExtras);
  //this.route.navigate(['/acctabs/tab1/map']);
  localStorage.setItem('img_type', flag);
  this.route.navigate(['/acctabs/tab1/media'], navigationExtras);  
  }
  
  ngOnInit() {
    this.dataService.setOption('dataflag', '0');
    this.dataService.setOption('typeofperson', '0');
    this.dataService.setOption('refaccid', '0');
    this.dataService.setOption('persondata', '0');
    this.dataService.setOption('dd', '0');
    this.dataService.setOption('pm', '0');
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    //this.accid= this.selacc.accid;

    /*this.selacc =
     {
     'accid': 'TN12312399',
     'datetime': '28 Dec 2019 5.30 PM',
     'landmark': 'Anna squar 100 metres.'
     };
     localStorage.setItem('selacc', JSON.stringify(this.selacc)); */
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.dev = localStorage.getItem("dev") === "true";

  }
  ionViewWillEnter() {
    //console.clear();
    console.log('ionViewWillEnter tav1');
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    //this.accid= this.selacc.accid;
    if (this.selacc != null) {
      this.checkvechilecount();
    }
    /* setTimeout(() => {
       this.data = {
         'heading': 'Normal text',
         'para1': 'Lorem ipsum dolor sit amet, consectetur',
         'para2': 'adipiscing elit.'
       };
     }, 5000);*/

    const userData: {
      userid: string;
      name: string;
      role: string;
      dept: string;
      state_code: string;
      district_code: string;
      station_code: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.role = userData.role; //console.log('role',userData)

    this.loginuser = JSON.parse(localStorage.getItem('userData'));
  }


  async accsubmit() {

    const modalped = await this.modalctrl.create({
      component: SubmitoshoComponent

    });

    modalped.onWillDismiss().then(dataReturned => {

    });
    return await modalped.present().then(_ => {

    });

  }

}
