import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tot_acc:any;
  tn_number = 5465464;
  maharashtra_number = 664600;
  up_number = 6876861;
  kt_number = 87979890;
  currstate:any=null;
  currdistrict:any=null;
 

  img: SafeResourceUrl = "assets/logos/iRAD_LOGO.png";

  state: boolean = false;
  viewFlag:any="country";
  indacc:any=null;
  districtacc:any=null;
  stationacc:any=null;
  stateacc:any=null;loading:boolean=true;
  toatal_acc: boolean = true;
  selectedLanguage: string; params: any;
  
  public config = {
    animation: 'count',
    format: ',ddd',
    theme: 'plaza',
    value: 50,
    auto: true,
  }

  private userSub: Subscription;
  isAuthenticated = false;
  user: any;
  title:any;
  //Themes 
  //default, minima, digital, car, plaza, slot-machine, train-station
  accidentview:any=false;
  accident_data:any; 
  acc_count:number;

  constructor(private translateConfigService: TranslateConfigService,private authService:AuthService,private route:Router,
    private api: ApiService,public loadingController: LoadingController,) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }


  ngOnInit() {
    
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.clear();
        console.log(user);
        this.user = user;

        if(this.user.dept==1){
          if(this.user.role==1){
            this.viewFlag="country";
            this.title="Country wise";
            this.getTotalAccident();
          }else if(this.user.role==2){
             this.viewFlag="district";
             this.title="District wise";
             this.getDistrictAccidents(this.user.state_code);
            // this.getStateAccidents();            
          }else if(this.user.role==3){
            this.viewFlag="station";
            this.title="Station wise";
            this.getStationAccidents(this.user.state_code,this.user.district_code);
            //this.getStationAccidents(this.user.state_code,this.user.district);
          }
        }else{
          this.getTotalAccident();

        }
      }
    });

  }


  viewAccidentData(state,district,code,offset){
    this.accidentview=true;
    this.viewFlag="";
    if(offset==-1){
      if(this.accident_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    
    let postDate={
      mode:"acclistread", 
      state:state,
      district:district,
      code:code,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      this.loading=false;
      if(offset==0){ 
        this.accident_data =data.data;
        this.acc_count=data.count;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.accident_data.push( data.data[i] );
        }
      }

      console.log('this.pending_data - ',this.accident_data.length, this.accident_data);

     });
  }

  viewAccident(i){
    console.log('view ',i);
    var data;
    data=this.accident_data[i];

    console.log(i,data);
    localStorage.setItem('selacc', JSON.stringify(data));
    //localStorage.setItem('accid',data.accid);
     this.route.navigate(['/accview']);
  }

  enableStates() {    
    this.toatal_acc = false;
    this.state = true;
    this.getStateAccidents();
  }

  

  enableDistricts(code){
    let state_code=code;
    this.getDistrictAccidents(state_code);
    this.viewFlag="district";
    this.title="District wise";
  }

  enableStation(state,code){
    this.viewFlag="station";
    this.title="Station wise";
    let station_code=code;
    this.getStationAccidents(state,station_code);
  }

  back() {
    this.toatal_acc = true;
    //this.state = false;

    console.log('back' ,this.viewFlag);
    this.route.navigate(['/tab2']);

    if(this.viewFlag=="state"){
      this.viewFlag="country";
      this.title="Country wise";
      this.getTotalAccident();
    }else if(this.viewFlag=="district"){
      this.viewFlag="state"
      this.title="State wise";
      this.getStateAccidents();
    }else if(this.viewFlag=="station"){
      this.viewFlag="district"
      this.title="District wise";
      this.getDistrictAccidents(this.currstate);
    }else if(this.viewFlag==""){
      this.accident_data=true;
    }
  }

  doRefresh(event){
  
      if(this.viewFlag=="country"){
        this.getTotalAccident();
      }else if(this.viewFlag=="state"){
        this.getStateAccidents();
      }else if(this.viewFlag=="district"){
        this.getDistrictAccidents(this.currstate);
      }else if(this.viewFlag=="station"){
        this.getStationAccidents(this.currstate,this.currdistrict);
      }
    
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  getTotalAccident() {
    this.loading=false;
    let postDate = {
      mode: 'indiaAccidents',
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      console.log(data);
      this.indacc=data.data[0];
      this.loading=true;
      
    });

  }

  getStateAccidents(){
    this.viewFlag="state"
    this.title="State wise";
    this.loading=false;
    //this.showLoader();
    let postDate = {
      mode: 'statewiseAccidents',
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      console.log(data);
      this.stateacc=data.data;
      this.loading=true;
      this.hideLoader();
    });

  }

  getDistrictAccidents(code){
    this.viewFlag="district";
    this.title="District wise";
    this.currstate=code;
    this.loading=false;
    console.log("State CODE", code);
    //this.showLoader();
    let postDate = {
      mode: 'districtwiseAccidents',
      state: code
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      this.hideLoader();
      console.log(data);
      this.districtacc=data.data;
      this.loading=true;
      
    });

  }

  getStationAccidents(state,code){
    this.viewFlag="station";
    this.title="Station wise";
    this.currstate=state; this.districtacc=code;
    this.loading=false;
    //this.showLoader();
    let postDate = {
      mode: 'stationwiseAccidents',
      state: state,
      district: code
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      console.log("Station",data);
      this.stationacc=data.data;

      this.loading=true;
      this.hideLoader();
    });
  }

  showLoader() {
    this.loadingController.create({
      message: 'loading ...',
      spinner: "circles"
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
  
}
