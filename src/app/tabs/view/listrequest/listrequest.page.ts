import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../../../translate-config.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController,ModalController } from '@ionic/angular';
import { AuthService } from '../../../commonpages/login/auth.service';
import { of, Subscription } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DataService } from '../../../services/data.service';

import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular'; 
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import{ environment } from  '../../../../environments/environment';

export enum ConnectionStatus {
  Online,
  Offline
}

@Component({
  selector: 'app-listrequest',
  templateUrl: './listrequest.page.html',
  styleUrls: ['./listrequest.page.scss'],
})
export class ListrequestPage implements OnInit {
  selectedLanguage:string;  params:any;  mobiledevice:any=false;
  role:number; dept:number;
  isAuthenticated = false;
  private userSub: Subscription;
  accid:any;
  segflag:any;

  data: any;
  disabled_data:any; pending_data:any; postmortem_data:any;
  comp_data:any; loading:boolean=true;
  drunkenness_data:any; 
  
  searchInput:any; searchedInput:any
  search_data:any;
  dataset = { 'mode': '','hospitalid': '','id': '','patient_id': '','pm_request_flag': '','typeofperson': '','accident_id': '','fullset': '' };


  offlineflag:boolean;
  databaseObj: SQLiteObject;
  readonly database_name: string = "iRad_database.db";
  readonly table_name: string = "locationtable";
  readonly sev_table_name: string= "severitytable";
  row_data: any = [];
  private apiUrl= environment.apiUrl;
  constructor(  public platform: Platform, private iab: InAppBrowser,
    private translateConfigService: TranslateConfigService,
    private router:Router,
    private api:ApiService, private authService: AuthService,
    private alertController: AlertController,
    private sqlite: SQLite,
    private network: Network,    
    private dataService: DataService,
    private toastController: ToastController,

  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

   
//    this.showwarning();

  
   }
   viewpatient(i){

    console.log(this.drunkenness_data[i]);
    this.data=this.drunkenness_data[i];
    localStorage.setItem('selpatient', JSON.stringify(this.data));
    this.router.navigate(['/victim']);
  }
   checkNetwork() {
    if (this.network.type != "none") {
        return true;
    }
    else {
        return false;
    }
  }
 
  ngOnInit() {
    this.dataService.setOption('dataflag',  '0'); 
    this.dataService.setOption('typeofperson',  '0'); 
    this.dataService.setOption('refaccid',  '0'); 
    this.dataService.setOption('persondata',  '0'); 
    this.dataService.setOption('dd',  '0'); 
    this.dataService.setOption('pm',  '0'); 
    console.log("LIST PAGE OnInit")
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.accid=localStorage.getItem('accid');
    this.networkChecking();
    this.tabLoading();

    // this.authService.autoLogin();
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user; //console.log(user);
    //   console.log('user'); console.log(user);
    //   if(this.isAuthenticated){ console.log(user.name);
    //     this.role=+user.role;
    //     this.dept=+user.dept;
    //   }
    // });

  }

  networkChecking(){
    if (this.checkNetwork()) {
      // This will call when network avaiable 
      this.offlineflag=false; 
      console.log(this.offlineflag)
    }
    else {
       // This will call when network is not available
       this.offlineflag=true;    
       console.log(this.offlineflag)  
    }
  }

  tabLoading(){
    if(this.offlineflag==false){
      console.log("Getting patient Data")
    
      this.funPending(0);

      this.authService.autoLogin();
      this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.role=+user.role;
        this.dept=+user.dept;
      }
    });
  }
  else{
    console.log("Getting Local Data")
      this.getLocalData();
  }
  }

  getLocalData(){
    this.segflag=5;
    this.loading=true;
    this.createDB();
  }

   // Create DB if not there
   createDB() {
    this.sqlite.create({
    name: this.database_name,
    location: 'default'
  })
    .then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.createLocTable();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  
}

createLocTable() {
  this.databaseObj.executeSql(`
  CREATE TABLE IF NOT EXISTS ${this.table_name}  (pid INTEGER PRIMARY KEY, PoliceJurisdictionCode varchar(255), PoliceJurisdictionName varchar(255), LocationName varchar(255), Lat varchar(255), Long varchar(255), Gps varchar(255), Accq varchar(255), Poi varchar(255), ValueDateTime varchar(255), ReportDateTime varchar(255), VehicleCount varchar(255), Severity varchar(255)
  , DriverDead varchar(255), DriverInjury varchar(255), PassengerInjury varchar(255), PassengerDead varchar(255), PedestInjury varchar(255), PedestDead varchar(255), AnimalInjury varchar(255), AnimalDead varchar(255), Language varchar(255), AccId varchar(255), Flag varchar(255))
  `, [])
    .then(() => {
      //alert('Table Created!');
      console.log("Location Table Created in list!")
      this.getRows();
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
}


// Retrieve rows from table
getRows() {
  this.databaseObj.executeSql(`
 SELECT * FROM ${this.table_name}
 `, [])
   .then((res) => {
     this.row_data = [];
     if (res.rows.length > 0) {         
       for (var i = 0; i < res.rows.length; i++) {
         this.row_data.push(res.rows.item(i));      
       }
       //this.data=this.row_data;
       this.loading=false;
     }
   })
   .catch(e => {
     alert("error " + JSON.stringify(e))
   });
}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }


  funPending(offset){
    if(offset==0){ 
     // alert('inside');
      this.drunkenness_data =[];
      
      console.log(this.drunkenness_data);
    }
   // alert('ddd');
    this.segflag=1;  
    if(offset==-1){
      if(this.drunkenness_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    
    let postDate={
      mode:'drunkenness', 
      type:"",
      offset:offset,
    }
    this.api.post('pmddrequest',postDate).subscribe((data: any)=>{
      this.loading=false;
      if(offset==0){ 
        this.drunkenness_data =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.drunkenness_data.push( data.data[i] );
        }
      }

      console.log('this.drunkenness_data - ',this.drunkenness_data.length, this.drunkenness_data);

     });
   //  console.log(this.drunkenness_data);

  }

  refLocal(event){
    console.log('Refresh Disabled');
    this.getLocalData();
    event.target.complete();
  }

  refPending(event){
   // alert('hii');
    console.log('Referesh Pending');
    this.funPending(0);
    event.target.complete();
  }
  scrollPending(event){
    if(this.drunkenness_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Pending');
    console.log('Pending Length ',this.drunkenness_data.length);
   // this.funPending(this.drunkenness_data.length);
    event.target.complete();
  }


  funCompleted(offset){ 

    this.segflag=2; 
    if(offset==-1){
      if(this.comp_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    let postDate={
      mode:'postmortem',
      type:"",
      offset:offset,
    }
    this.api.post('pmddrequest',postDate).subscribe((data: any)=>{
      this.loading=false;
    if(offset==0){ 
      this.comp_data =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.comp_data.push( data.data[i] );
      }
    }
    console.log('this.postmordem - ',this.comp_data.length, this.comp_data);

     });

  }

  refCompleted(event){
    console.log('Referesh Completed');
    this.funCompleted(0);
    event.target.complete();
  }
  scrollCompleted(event){
    if(this.comp_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Completed');
    console.log('Pending Length ',this.comp_data.length);
    this.funCompleted(this.comp_data.length);
    event.target.complete();
  }

  refferalload(offset){ 
    this.segflag=3; 
    if(offset==-1){
      if(this.disabled_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    let postDate={
      mode:'refferal',
      type:"",
      offset:offset,
    }
    this.api.post('pmddrequest',postDate).subscribe((data: any)=>{
      this.loading=false;
    if(offset==0){ 
      this.disabled_data =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.disabled_data.push( data.data[i] );
      }
    }
    console.log('this.postmordem - ',this.disabled_data.length, this.disabled_data);

     });
  }
  funDisabled(offset){
    this.segflag=3;   
    if(offset==-1){
      if(this.disabled_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }
    this.loading=true; 
    let postDate={
      mode:'treatment',
      type:"disabled"
    }
    this.api.post('pmddrequest',postDate).subscribe((data: any)=>{
      this.loading=false;
      if(offset==0){ 
        this.disabled_data =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.disabled_data.push( data.data[i] );
        }
      }
      console.log('this.disabled_data - ',this.disabled_data.length, this.disabled_data);
      

     });
  }

  refDisabled(event){
    console.log('Referesh Disabled');
    this.funDisabled(0);
    event.target.complete();
  }
  scrollDisabled(event){
    if(this.disabled_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.disabled_data.length);
    this.funDisabled(this.disabled_data.length);
    event.target.complete();
  }
  funSearch(){
    this.segflag=4; 
  }
  funSearchEnter(offset){
   // console.log('on search input ',event);
    console.log(this.searchInput);
    
    if(this.searchInput.length<2){ 
      console.log("3 chars please");
      return false;
    }

    if(offset==-1){
      this.search_data=undefined;
        console.log('data undefind');
        offset=0;
        this.searchedInput=null;
      
    }

    this.loading=true; 
    let postDate={
      mode:"patientSearch",
      text:this.searchInput,
      offset:offset,
    }
    this.api.post('patientlist',postDate).subscribe((data: any)=>{
      this.loading=false;
      this.searchedInput=this.searchInput;
      if(offset==0){ 
        this.search_data =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.search_data.push( data.data[i] );
        }
      }
      
      console.log('this.search_data - ',this.search_data.length, this.search_data);
     });
  }
  scrollSearch(event){


    console.log('Scroll Search');
    console.log('Search Length ',this.search_data.length);
    this.funSearchEnter(this.search_data.length);
    event.target.complete();
  }

  onSearchCancel(){
    console.log('on search cancel ');
    this.searchInput=null; this.searchedInput=null;
    this.search_data=null;
  }

  editAccident(i){

    console.log('view ',i);
    var data;
    if(this.segflag==1){
      data=this.drunkenness_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }

    console.log(i,data);
  
    localStorage.setItem('selpatient', JSON.stringify(data));
   // localStorage.setItem('accid',this.data[i].accid);
 
   this.router.navigate(['/acctabs/tab1']);
   
  }

  
  updateAccident(i){

    console.log(i,this.data[i]);
    localStorage.setItem('selpatient', JSON.stringify(this.data[i]));
    localStorage.setItem('accid',this.data[i].accid);

   this.router.navigate(['/acctabsupdate/tab1']);
    
  }


  async  handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'iRAD',
      message: 'Are you Sure want to Delete this Accident?',
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }

  async  showwarning() {
    const alert = await this.alertController.create({
      header: 'iRAD',
      message: 'Drunken Certificate and Postmorterm certificate generated based on Police request',
      buttons: ['Agree']
    });

    await alert.present();
  }



  viewAccident(i){
    console.log('view ',i);
    var data;
    if(this.segflag==1){
      data=this.drunkenness_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }else if(this.segflag==4){
      data=this.search_data[i];
    }

    console.log(i,data);
    localStorage.setItem('selpatient', JSON.stringify(data));
    //localStorage.setItem('accid',data.accid);
     this.router.navigate(['/patientview']);
  }


  viewAccidentPDF(i){
    this.router.navigate(['/accview']);
  }

  ionViewWillEnter() {  
    console.log("ionViewWillEnter @ List Page")
    this.networkChecking();
    this.tabLoading();
   /* setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);*/
  }


  async deleteAccident(i) {
    let alert = await this.alertController.create({
      header: 'iRAD',
      message: 'Are you Sure want to Delete this Accident ?',
      inputs: [
        {
          name: 'reason',
          placeholder: 'Reason'
        }
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log(data);
            if (data.reason) {
              this.deleteAccident1(i,data.reason);
            }
            else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  deleteAccident1(i,remarks){


    console.log('delete ',i);
    var data;
    if(this.segflag==1){
      data=this.drunkenness_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }

   console.log('delete');
       console.log(i,data);
   
       let postDate={
         mode:"disable",
         id:data.accid,
         remarks:remarks,
       }
       this.api.post('accview',postDate).subscribe((data: any)=>{
         console.log(data); 
       });
   
       
     }
  
  async requestMVI(i) {
    console.log('Req MVI ',i);
    var data;
    if(this.segflag==1){
      data=this.drunkenness_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }
    
    localStorage.setItem('selpatient', JSON.stringify(data));
    localStorage.setItem('accid',data.accid);
   // this.router.navigate(['/main']); 
  // alert("work in progress");
   this.router.navigate(['/mvi']);
   
  }
  addrefferal(i){

 //   alert(this.disabled_data[i].typeofperson);
   //return false;
    if(this.disabled_data[i].typeofperson=='Patient'){
      
        
       this.dataset.mode="hp_to_hp";
       this.dataset.hospitalid=this.disabled_data[i].hospitalid;
       this.dataset.id=this.disabled_data[i].id;
       this.dataset.patient_id=this.disabled_data[i].patient_id;
       this.dataset.pm_request_flag=this.disabled_data[i].pm_request_flag;
       this.dataset.typeofperson=this.disabled_data[i].typeofperson;
       this.dataset.accident_id=this.disabled_data[i].accident_id;
       this.dataset.fullset=this.disabled_data[i];
      
    }
    else
    {
      this.dataset.mode="refferalupdate";
      this.dataset.hospitalid=this.disabled_data[i].hospitalid;
      this.dataset.id=this.disabled_data[i].id;
      this.dataset.patient_id=this.disabled_data[i].patient_id;
      this.dataset.pm_request_flag=this.disabled_data[i].pm_request_flag;
      this.dataset.typeofperson=this.disabled_data[i].typeofperson;
      this.dataset.accident_id=this.disabled_data[i].accident_id;
      this.dataset.fullset=this.disabled_data[i];
      


    }
 console.log(this.dataset);
//return false;
    this.api.post('datas',this.dataset).subscribe((data: any)=>{
 
      alert(data.msg);
      
       this.router.navigate(['/acctabs/listpatient']);
      });
                }
  addpatientboth(i){


this.dataService.setOption('dataflag',  '1'); 
this.dataService.setOption('typeofperson',  '1'); 
this.dataService.setOption('persondata',  this.comp_data[i]); 
this.dataService.setOption('dd',  '1'); 
this.dataService.setOption('pm',  '1'); 
this.dataService.setOption('refaccid',this.comp_data[i].accident_id); 

this.router.navigate(['/acctabs/tab1/patientregister']);


}
addpatient(i){

  console.log(this.drunkenness_data[i]);
 // return false;
 // console.log(this.drunkenness_data[i]);
    // alert(this.drunkenness_data[i].accident_id);

  this.dataService.setOption('dataflag',  '1'); 
  this.dataService.setOption('typeofperson',  '1'); 
  this.dataService.setOption('persondata',this.drunkenness_data[i]); 
  this.dataService.setOption('dd',  '1'); 
  this.dataService.setOption('pm',  '0'); 
  this.dataService.setOption('refaccid',this.drunkenness_data[i].accident_id); 
  
  this.router.navigate(['/acctabs/tab1/patientregister']);
  
  
  }
    viewDDrequest(i){
    let data=this.drunkenness_data[i];
   // let ln=this.selectedLanguage; 
   let ln='en';
  let pdfurl=environment.apiUrl+'reports/ddreport.php?ln='+ln+'&id='+data.id;
console.log(pdfurl);
  const options: DocumentViewerOptions = {
    title: 'My PDF'
  }
  
 // this.document.viewDocument(pdfurl, 'application/pdf', options)

 this.platform.ready().then(() => {

  let options : InAppBrowserOptions = {
      location : 'no',//'yes' Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
  };

    const browser = this.iab.create(pdfurl,'',options);

});

  }

}
