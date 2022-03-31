import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../../translate-config.service';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  tot_acc:any; 
 
  currstate:any=null;
  currdistrict:any=null;

  statesevwise:any[]=[];
  districtwise:any[]=[];
  stationtwise:any[]=[];
 

  img: SafeResourceUrl = "assets/logos/iRAD_LOGO.png";

  state: boolean = false;
  viewFlag:any="country";
  indacc:any=null; indacc1:any=null;
  districtacc:any=null;
  stationacc:any=null;
  stateacc:any=null;loading:boolean=true;
  toatal_acc: boolean = true;
  selectedLanguage: string; params: any;
  
  public config = {
    animation: 'count', 
    format: ',ddd',
    theme: 'minima',
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

  selection={'state':'','district':'','station':''};

  dashboard = {
    title: 'Loading ...',
    fatal : 0,
    grevious:0,
    simple_injury_h:0,
    simple_injury_nh:0,
    no_injury:0,
    injured:0,
    dead:0,
    totaccident : 0,
    totalperson: 0
  };
  

  constructor(private translateConfigService: TranslateConfigService,private authService:AuthService,private route:Router,
    private api: ApiService,public loadingController: LoadingController,) {
    console.log("constructor",this.selection);
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
  }


  ngOnInit() {
    console.log("oninit",this.selection);
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;

        if(this.user.dept==1){
          if(this.user.role==1){
            this.viewFlag="country";
            this.title="All India ";
            this.getTotalAccident();
          }else if(this.user.role==2){
             this.viewFlag="district";
             this.title="District wise";
             this.getDistrictAccidents(this.user.state_code);
            // this.getStateAccidents();            
          }else if(this.user.role==3){
            this.viewFlag="station";
            this.title="Stationwise";
            this.getStationAccidents(this.user.state_code,this.user.district_code);
            //this.getStationAccidents(this.user.state_code,this.user.district);
          }
        }else if(this.user.dept==10){
          if(this.user.state_code==null){
            this.getTotalAccident();
          } else if(this.user.district_code == null) {
            this.viewFlag = "district"
            this.title = "District wise";
            this.getDistrictAccidents(this.user.state_code);
          }else {
            this.viewFlag="station";
            this.title="Stationwise";
            this.getStationAccidents(this.user.state_code,this.user.district_code);
          }
        }
        else{          
          this.getTotalAccident();

        }
      }
    });

  }
  enablestationflash(std,dt,scode,flg){
    this.loading=false;
    let postDate = {
      mode: 'flashcardloadstation',
      state:std,
      district:dt,
      station:scode,
    }
    this.api.post('dashboard_open', postDate).subscribe((data: any) => {
    
      console.log(data);
      
      this.stationtwise[scode]=data.data;

    
    });
  }
  enabledistrictflash(std,dt){
   // alert(std);
   // alert(dt);
    //if(this.statesevwise[i]!=undefined){ return false}
    
    this.loading=false;
    let postDate = {
      mode: 'flashcardloaddistrict',
      state:std,
      district:dt,
    }
    this.api.post('dashboard_open', postDate).subscribe((data: any) => {

     // this.indacc=data.data[0];
      //this.indacc1=data.data1;
      this.loading=true;
      console.log('----------------');
      console.log(data.data);
      console.log('-----------------');
      this.districtwise[dt]=data.data;
     console.log(this.districtwise);
     
    });
  }
  loadstatewise(i){

    //console.log(this.statesevwise[i]);

    if(this.statesevwise[i]!=undefined){ return false}

   //alert(i);
   // alert('calling');

    this.loading=false;
    //this.indacc={'count':'85475','title':'India'};
    let postDate = {
      mode: 'flashcardload',
      state:i,
    }
    this.api.post('dashboard_open', postDate).subscribe((data: any) => {
     // console.log(data);
      this.indacc=data.data[0];
      this.indacc1=data.data1;
      this.loading=true;
      console.log('----------------');
      console.log(data.data);
      console.log('-----------------');
      this.statesevwise[i]=data.data;
      console.log("--------------------");
      console.log(this.statesevwise);
      this.statesevwise;
    });

  
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter",this.selection);
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter",this.selection);    
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave",this.selection);
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave",this.selection);
  }


  viewAccidentData(state,district,code,offset){
    console.log("Get acc list");
    this.viewFlag="list";
    this.accidentview=true;
    
    this.selection.state=state;
    this.selection.district=district;
    this.selection.station=code;

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


  refPending(event){
    console.log('Referesh Pending');

    this.viewAccidentData(this.selection.state,this.selection.district,this.selection.station,0);
    event.target.complete();
  }
  scrollPending(event){
    if(this.accident_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Pending');
    console.log('Pending Length ',this.accident_data.length);
    this.viewAccidentData(this.selection.state,this.selection.district,this.selection.station,this.accident_data.length);
    event.target.complete();
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
    
   // alert('hiiii'); 

    this.toatal_acc = false;
    this.state = true;
    this.getStateAccidents();
  }

  

  enableDistricts(code){
   // alert('districts'); 
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

  back1() {
    this.toatal_acc = true;
    //this.state = false;

    console.log('back' ,this.viewFlag);
    //this.route.navigate(['/tab2']);

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
      this.getDistrictAccidents(this.selection.state);
    }else if(this.viewFlag=="list"){
      this.viewFlag="station"
      this.title="Station wise";
      this.accidentview=false;
      this.getStationAccidents(this.selection.state,this.selection.district);
    }
  }

  back() {
    this.toatal_acc = true;
    //this.state = false;

    console.log('back', this.viewFlag);
    //this.route.navigate(['/tab2']);
    if (this.user.role == 1) {
      console.log("Back role1");
      if (this.viewFlag == "state") {
        this.viewFlag = "country";
        this.title = "All INDIA";
        this.getTotalAccident();
      } else if (this.viewFlag == "district") {
        this.viewFlag = "state";
        this.title = "State wise";
        this.getStateAccidents();
      } else if (this.viewFlag == "station") {
        this.viewFlag = "district"
        this.title = "District wise";
        this.getDistrictAccidents(this.selection.state);
      } else if (this.viewFlag == "list") {
        this.viewFlag = "station"
        this.title = "Station wise";
        this.accidentview = false;
        this.getStationAccidents(this.selection.state, this.selection.district);
      }
    } else if (this.user.role == 2) {
      console.log("Back role2");
      if (this.viewFlag == "station") {
        console.log("entered back role 2");
        this.viewFlag ="country";
        console.log("View Flag",this.viewFlag);
        this.title = "District wise";
        this.getDistrictAccidents(this.selection.state);
        // this.getStateAccidents();            
      } else if (this.viewFlag == "list") {
        this.viewFlag = "station";
        this.title = "Station wise";
        this.getStationAccidents(this.selection.state, this.selection.district);
        //this.getStationAccidents(this.user.state_code,this.user.district);
      }
    } else if (this.user.role == 3) {
      console.log("Back role3");
      if (this.viewFlag == "list") {
        this.viewFlag == '';
        this.title = "Station wise";
        this.getStationAccidents(this.selection.state, this.selection.district);
      }
    } else if (this.user.dept == 10) {
      console.log("Back dept 10");

      if (this.user.state_code == null) {
        this.getTotalAccident();
      } else if(this.user.district_code == null) {
        this.viewFlag = "district"
        this.title = "District wise";
        this.getDistrictAccidents(this.selection.state);
      }else {
         if (this.viewFlag == "station") {
          this.viewFlag = "";
          this.title = "District wise";
          this.getDistrictAccidents(this.selection.state);
        } else if (this.viewFlag == "list") {
          this.viewFlag = "station"
          this.title = "Station wise";
          this.accidentview = false;
          this.getStationAccidents(this.selection.state, this.selection.district);
        }
      }
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

  getTotalAccident11() {
    this.loading=false;
    //this.indacc={'count':'85475','title':'India'};
    let postDate = {
      mode: 'indiaAccidents',
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      console.log(data);
      this.indacc=data.data[0];
      this.loading=true;
      
    });

  }
  getTotalAccident() {
  
  
  //  alert('calling');

    this.loading=false;
    //this.indacc={'count':'85475','title':'India'};
    let postDate = {
      mode: 'indiaAccidents',
    }
    this.api.post('dashboard_open', postDate).subscribe((data: any) => {
      console.log(data);
      this.indacc=data.data[0];
      this.indacc1=data.data1;
      this.loading=true;
      
    });

  }

  getStateAccidents(){
    this.viewFlag="state";
    this.title="State wise";
    this.loading=false;
    //this.showLoader();
    let postDate = {
      mode: 'statewiseAccidents',
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
    //  console.log(data);
      this.stateacc=data.data;
console.log(this.statesevwise);
      for(let i=0;i<this.stateacc.length;i++){
        this.statesevwise[this.stateacc.code]=[];
   //  console.log(this.stateacc.code);
      }
      console.log(this.statesevwise);

      //console.log(data.data1.array_to_json);
     // this.stateacc=data.data1.array_to_json;
      this.loading=true;
      this.hideLoader();
      //console.log(this.stateacc);
    });

  }

  getDistrictAccidents(code){
    this.viewFlag="district";
    this.title="District wise";
    this.currstate=code;
    this.selection.state=code;
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
   //   this.stateacc=data.data;
      console.log(this.statesevwise);
            for(let i=0;i<this.districtacc.length;i++){
              this.districtwise[this.districtacc.code]=[];
         //  console.log(this.stateacc.code);
            }
      this.loading=true;
      
    });

  }

  getStationAccidents(state,code){
    this.viewFlag="station";
    this.title="Station wise";
    this.currstate=state; this.districtacc=code;
    this.loading=false;
    this.selection.state=state;
    this.selection.district=code;
    //this.showLoader();
    let postDate = {
      mode: 'stationwiseAccidents',
      state: state,
      district: code
    }
    this.api.post('dashboard', postDate).subscribe((data: any) => {
      console.log("Station",data);
      this.stationacc=data.data;

      console.log(this.statesevwise);
      for(let i=0;i<this.stationacc.length;i++){
        this.stationtwise[this.stationacc.code]=[];
   //  console.log(this.stateacc.code);
      }

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
