import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../../../commonpages/login/auth.service';
import { of, Subscription } from 'rxjs';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular'; 
import { LocalstorageService } from '../../../services/localstorage.service';
import { MviComponent } from '../../../popups/mvi/mvi.component'
import { HwmasterComponent } from '../../../popups/hwmaster/hwmaster.component'
import { JirComponent } from '../../../popups/jir/jir.component';
import { FilterComponent } from "./filter/filter.component";

import { DarinformationComponent } from '../../../popups/darinformation/darinformation.component';
import { LegalinfoComponent } from '../../../popups/legalinfo/legalinfo.component';
import { InsuranceinformationsComponent } from '../../../popups/insuranceinformations/insuranceinformations.component';

export enum ConnectionStatus {
  Online,
  Offline
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  selectedLanguage:string;  params:any;  mobiledevice:any=false;
  role:number; dept:number;
  isAuthenticated = false;
  private userSub: Subscription;
  accid:any;
  segflag:any=1; filterflag:boolean=false; filtercontent:any;

  data: any;
  disabled_data:any;
  comp_data:any; loading:boolean=true;
  pending_data:any;  dev:boolean=false;
  darpending_data:any;
  
  searchInput:any; searchedInput:any
  search_data:any;
  
  offlineflag:boolean; pending_count:number; completed_count:number; disabled_count:number; darpending_count:number;
  databaseObj: SQLiteObject;
  readonly database_name: string = "iRAD.db";
  readonly table_name: string = "location";
  readonly sev_table_name: string= "mst_accident_severity";
  row_data: any = [];
  selection = { severity: "",dar:"", state: "", district: "", station: "", year: "" ,fromdate:'',todate:'',orderby:'',ordertype:'desc' };
  acclayer: any;
  
  constructor(
    private translateConfigService: TranslateConfigService,
    private router:Router,
    private api:ApiService, private authService: AuthService,
    private alertController: AlertController,
    private sqlite: SQLite,
    private network: Network,    
    private toastController: ToastController,
    private localdb: LocalstorageService,
    private modalctrl: ModalController,
    ){
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
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
    this.dev = (localStorage.getItem('dev') === 'true');
    console.log("LIST PAGE OnInit")
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.accid=localStorage.getItem('accid');
    this.mobiledevice=this.localdb.checkPlatform();
    this.networkChecking();
    if(this.localdb.checkPlatform()){
      this.tabLoading();
    }

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
  async jir(i) {
    var data;
    data=this.comp_data[i];
    const modalped = await this.modalctrl.create({
      component: JirComponent,
      componentProps: { 
        'selacc': data, 
        'jir':data.jir, 
        'userSub': this.userSub 
    }
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
  async dar(i) {

    console.log('Req MVI ',i);
    var data;
    if(this.segflag==1){
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    } 
    localStorage.setItem('selacc', JSON.stringify(data));
    localStorage.setItem('accid',data.accid);
   //this.goTomvi(data);
    var data;
    data=this.comp_data[i];
    const modalped = await this.modalctrl.create({
      component: DarinformationComponent,
      componentProps: { 'selacc': data }
    });
    modalped.onWillDismiss().then(dataReturned => {
      console.log('Receive: ', dataReturned.data);     
    });
    return await modalped.present().then(_ => {
    });
  }
  async legal(i) {

   // console.log('Req MVI ',i);
   
    var data;
    if(this.segflag==1){
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    } 
    localStorage.setItem('selacc', JSON.stringify(data));
    localStorage.setItem('accid',data.accid);
  // this.goTomvi(data);
    var data;
    data=this.comp_data[i];
    const modalped = await this.modalctrl.create({
      component: LegalinfoComponent,
      componentProps: { 'selacc': data }
    });
    modalped.onWillDismiss().then(dataReturned => {
      console.log('Receive: ', dataReturned.data);     
    });
    return await modalped.present().then(_ => {
    });
  }
  async insurance(i) {

    // console.log('Req MVI ',i);
    
     var data;
     if(this.segflag==1){
       data=this.pending_data[i];
     }else if(this.segflag==2){
       data=this.comp_data[i];
     }else if(this.segflag==3){
       data=this.disabled_data[i];
     } 
     localStorage.setItem('selacc', JSON.stringify(data));
     localStorage.setItem('accid',data.accid);
   // this.goTomvi(data);
     var data;
     data=this.comp_data[i];
     const modalped = await this.modalctrl.create({
       component: InsuranceinformationsComponent,
       componentProps: { 'selacc': data }
     });
     modalped.onWillDismiss().then(dataReturned => {
       console.log('Receive: ', dataReturned.data);     
     });
     return await modalped.present().then(_ => {
     });
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
public redirectoreqlist(){
  
  
  this.router.navigate(['acctabs/hospitalrequest']);
}
  tabLoading(){
    if(this.offlineflag==false){
      console.log("Getting Pending Data")
     
      if(this.segflag==1){
      this.funPending(0);
      } else if(this.segflag==2){
      this.comp_data(0);
    }else if(this.segflag==3){
      this.funDisabled(0);
    }else{
      this.segflag=1;
      this.funPending(0);
    }

     

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
    this.segflag=1;  
    if(offset==-1){
      if(this.pending_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    
    let postDate={
      mode:"acclist", 
      type:"pending",
      selection:this.selection,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{


      if(data.error!=undefined){
        console.log('resdata',data);
        this.authService.logout();
        this.router.navigate(['/home']);
      }

      this.loading=false;
      if(offset==0){ 
        this.pending_data =data.data;
        this.pending_count=data.count;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.pending_data.push( data.data[i] );
        }
      }

      console.log('this.pending_data - ',this.pending_data.length, this.pending_data);

     });
  }

  refLocal(event){
    console.log('Refresh Disabled');
    this.getLocalData();
    event.target.complete();
  }

  refPending(event){
    console.log('Referesh Pending');
    this.funPending(0);
    event.target.complete();
  }
  scrollPending(event){
    if(this.pending_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Pending');
    console.log('Pending Length ',this.pending_data.length);
    this.funPending(this.pending_data.length);
    event.target.complete();
  }

  
  funDARPending(offset){
    this.segflag=5;  
    if(offset==-1){
      if(this.darpending_data==undefined){
        console.log('data undefind');
        offset=0;
      }else{
        return false;
      }
    }

    this.loading=true;
    
    let postDate={
      mode:"acclist", 
      type:"darpending",
      selection:this.selection,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{


      if(data.error!=undefined){
        console.log('resdata',data);
        this.authService.logout();
        this.router.navigate(['/home']);
      }

      this.loading=false;
      if(offset==0){ 
        this.darpending_data =data.data;
        this.darpending_count=data.count;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.darpending_data.push( data.data[i] );
        }
      }

      console.log('this.darpending_data - ',this.darpending_data.length, this.darpending_data);

     });
  }

  

  refDARPending(event){
    console.log('Referesh DAR Pending');
    this.funDARPending(0);
    event.target.complete();
  }
  scrollDARPending(event){
    if(this.darpending_data.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll DAR Pending');
    console.log('DAR Pending Length ',this.darpending_data.length);
    this.funPending(this.darpending_data.length);
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
      mode:"acclist",
      type:"completed",
      selection:this.selection,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      this.loading=false;
    if(offset==0){ 
      this.comp_data =data.data;
      this.completed_count=data.count;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.comp_data.push( data.data[i] );
      }
    }
    console.log('this.comp_data - ',this.comp_data.length, this.comp_data);

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
      mode:"acclist",
      type:"disabled",
      selection:this.selection,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      this.loading=false;
      if(offset==0){ 
        this.disabled_data =data.data;
        this.disabled_count=data.count;
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
      mode:"accSearch",
      selection:this.selection,
      text:this.searchInput,
      offset:offset,
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
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
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    } else if(this.segflag==5){
      data=this.darpending_data[i];
    }

    console.log(i,data);
  
    localStorage.setItem('selacc', JSON.stringify(data));
   // localStorage.setItem('accid',this.data[i].accid);
 
   this.router.navigate(['/acctabs/tab1']);
   
  }

  
  updateAccident(i){

    console.log(i,this.data[i]);
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
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



  viewdarAccident(i){
    console.log('view ',i);
    var data;
    if(this.segflag==1){
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }else if(this.segflag==4){
      data=this.search_data[i];
    }

    console.log(i,data);
    localStorage.setItem('selacc', JSON.stringify(data));
    //localStorage.setItem('accid',data.accid);
    // this.router.navigate(['/darview']);
    this.router.navigate(['/investigation']);

    }

  viewAccident(i){
    console.log('view ',i);
    var data;
    if(this.segflag==1){
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }else if(this.segflag==4){
      data=this.search_data[i];
    }else if(this.segflag==5){
      data=this.darpending_data[i];
    }

    console.log(i,data);
    localStorage.setItem('selacc', JSON.stringify(data));
    //localStorage.setItem('accid',data.accid);
     this.router.navigate(['/accview']);
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
      data=this.pending_data[i];
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
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }else if(this.segflag==5){
      data=this.darpending_data[i];
    }
    
    localStorage.setItem('selacc', JSON.stringify(data));
    localStorage.setItem('accid',data.accid);
   // this.router.navigate(['/main']); 
  // alert("work in progress");
   //this.router.navigate(['/mvi']);
   this.goTomvi(data);
   
  }

  async showHW(i) {
    console.log('Req MVI ',i);
    var data;
    if(this.segflag==1){
      data=this.pending_data[i];
    }else if(this.segflag==2){
      data=this.comp_data[i];
    }else if(this.segflag==3){
      data=this.disabled_data[i];
    }
    
    localStorage.setItem('selacc', JSON.stringify(data));
    localStorage.setItem('accid',data.accid);
   // this.router.navigate(['/main']); 
  // alert("work in progress");
   //this.router.navigate(['/mvi']);
   this.goToHW(data);
   
  }


  async goTomvi(data) {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: MviComponent,
      componentProps: { 'selacc': data }
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
  async goToHW(data) {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: HwmasterComponent,
      componentProps: { 'selacc': data }
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

  async openFilterList() {
    const modalped = await this.modalctrl.create({
      component: FilterComponent,
      componentProps: { selection: this.selection },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);

      if (dataReturned.data != undefined) {
        if (dataReturned.data.severity != undefined) {
          this.selection = dataReturned.data;
          console.log("Returened ", this.selection);
          this.applyFilter();
        }
      }
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  applyFilter() {
    console.log("applyFilter", this.selection);
   console.log('this.segflag : ',this.segflag);

   console.log('filterflag',this.filterflag); 
   
   this.filterflag=true;
   this.filtercontent='';

if(this.selection.severity!=''){ this.filtercontent+=' Severity in ('+this.selection.severity.toString()+') '; }

if(this.selection.dar!=''){ this.filtercontent+=' DAR ('+this.selection.dar.toString()+') '; }

if(this.selection.fromdate!=''){ 
  if(this.filtercontent!='') {this.filtercontent+= ' and '}
  this.filtercontent+=' Date From : '+new Date(this.selection.fromdate).toLocaleDateString() +'  ';}
if(this.selection.todate!=''){
  if(this.filtercontent!='') {this.filtercontent+= ' and '}
  this.filtercontent+=' To : '+new Date(this.selection.todate).toLocaleDateString() +' ';}
  

if(this.selection.orderby!=''){ this.filtercontent+=' order by : '+this.selection.orderby +' '+ this.selection.ordertype;}

    if(this.segflag==1){ console.log('filter pending');
    this.pending_data=undefined;
      this.funPending(-1);
    }else if(this.segflag==2){
      this.comp_data=undefined;
      this.funCompleted(-1);
    }else if(this.segflag==3){
      this.search_data=undefined;
      this.funDisabled(-1);
    }else if(this.segflag==4){
      this.disabled_data=undefined;
      this.funSearch();
    }
    
  }
  clearFilter(){
    this.filterflag=false;
    console.log('clear filter'); 
    this.selection = { severity: "", dar:"", state: "", district: "", station: "", year: "" ,fromdate:'',todate:'',orderby:'',ordertype:'desc' };
    
    if(this.segflag==1){ console.log('filter pending');
    this.pending_data=undefined;
      this.funPending(-1);
    }else if(this.segflag==2){
      this.comp_data=undefined;
      this.funCompleted(-1);
    }else if(this.segflag==3){
      this.search_data=undefined;
      this.funDisabled(-1);
    }else if(this.segflag==4){
      this.disabled_data=undefined;
      this.funSearch();
    }

  }
}
