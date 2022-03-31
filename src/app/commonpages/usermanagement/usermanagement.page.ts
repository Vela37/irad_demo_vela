import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { UsersService } from '../../services/shared.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import {StateusercreationComponent} from '../usermanagement/stateusercreation/stateusercreation.component'
import {DistrictusercreationComponent} from '../usermanagement/districtusercreation/districtusercreation.component'
import {StationusercreationComponent} from '../usermanagement/stationusercreation/stationusercreation.component'
import {FieldofficerusercreationComponent} from '../usermanagement/fieldofficerusercreation/fieldofficerusercreation.component'
import { TransportusercreationComponent } from '../usermanagement/transportusercreation/transportusercreation.component'
import { RtocreationComponent } from '../usermanagement/rtocreation/rtocreation.component'
import {AddrtoComponent} from '../usermanagement/addrto/addrto.component'

import {AddhwcircleComponent} from '../usermanagement/addhwcircle/addhwcircle.component'
import {AddhwdivisionComponent} from '../usermanagement/addhwdivision/addhwdivision.component'
import {AddhwsubdivisionComponent} from '../usermanagement/addhwsubdivision/addhwsubdivision.component'
import {AddroadtypesComponent} from '../usermanagement/addroadtypes/addroadtypes.component'


import {AddpsstationComponent} from '../usermanagement/addpsstation/addpsstation.component'
import {AddpsdistrictComponent} from '../usermanagement/addpsdistrict/addpsdistrict.component'

import { HighwayusercreationComponent } from '../usermanagement/highwayusercreation/highwayusercreation.component'

import {ProjusercreationComponent  } from './projusercreation/projusercreation.component';


import {EntryhpusersComponent} from '../usermanagement/entryhpusers/entryhpusers.component';
import {AddentryuserComponent} from '../usermanagement/addentryuser/addentryuser.component';
import { AddinscompanyComponent } from './addinscompany/addinscompany.component';

import {UserfilterPipe } from '../../pipes/userfilter.pipe';
import { AddinsuserComponent } from './addinsuser/addinsuser.component';
import { AddinsusersComponent } from './addinsusers/addinsusers.component';
import { AddmactusersComponent } from './addmactusers/addmactusers.component';
import { AddlsausersComponent } from './addlsausers/addlsausers.component';
import { AddmactofficeComponent } from './addmactoffice/addmactoffice.component';
import { AddlsaofficeComponent } from './addlsaoffice/addlsaoffice.component';


@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
 
})
export class UsermanagementPage implements OnInit {
  private userSub: Subscription;isAuthenticated = false; loading:boolean=false; cdview:number=1;
  selectedLanguage:string;  params:any;user:any=null; 
  psDistrictUsers:any=null; psAdminUsers:any=null; psFieldUsers:any=null; 
  
  psStateUsers:any=null; psStateUsersfilter = {name: ''}; psStateUsers_searchstr:string='';
  
  psDistrictOptions:any=null;psStationUsers:any=null;

  transStateUsers:any=null;  projStateUsers:any=null;
  hwStateUsers:any=null; highwaysUsers:any=[];
  insuranceCompany:any=[];
  dev=false;

  MACTUsers:any; LSAUsers:any;
// Hospital  usermanagement 

  hospitalusers:any=null;
  hpname:any;
  hpadmin:any;

  constructor(
    private translateConfigService: TranslateConfigService,
    private api:ApiService,   private authService: AuthService, 
    private modalctrl: ModalController, private shserv:UsersService,
    private alertCtrl: AlertController
  ) { 

    console.log('cons'); 
  }

  ngOnInit() {
    console.log('user1'); 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage(); console.log('user'); 
    this.selectedLanguage = localStorage.getItem('ln');
    this.authService.autoLogin();  console.log('user'); 
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user);
        this.user=user;
        this.showDept(+user.dept);
       //this.showDept(10);
      }
    });
    
   this.dev= (localStorage.getItem('dev') === 'true');

  }
  ionViewDidEnter() {
    this.transStateUsers=null;
    //this.showDept(+this.user.dept);

    this.authService.autoLogin();  console.log('user'); 
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user);
        this.user=user;
        this.showDept(+user.dept);
       //this.showDept(10);
      }
    });

  }

  showPassword(pwd,e){
  //  console.log(pwd,e.target);
    e.target.innerHTML=pwd;
    

  }

  showDept(d){ console.log('view- ',d);
    this.cdview=d;
    if(this.cdview==1){
      if(+this.user.role==1){
        this.loadPSStateUsers(0);
      }else  if(+this.user.role==2){
        this.loadPSDistrictUsers(0);
      }else  if(+this.user.role==3){
        this.loadPSAdminUsers(0);
      }else  if(+this.user.role==4){
        this.loadPSFieldUsers(0);
      }
  } else if(this.cdview==2){
    if(+this.user.role==1){
      this.loadTransStateUsers(0);
    }else if(+this.user.role==31){
      this.loadTransRTOUsers(0);
    }else if(+this.user.role==35){
      this.loadTransMVIUsers(0);  
    }
  } else if(this.cdview==10){
    if(this.user.state_code==null){
      this.loadProjStateUsers(0);
    }else if(this.user.state_code!=null){
      this.loadProjDistUsers(0);
    }
  }else if(this.cdview==3){
    
    if(+this.user.role==1){
      this.loadHwStateUsers(0);
    }else {
      this.loadHighwaysUsers(0);
    }

    
  }
  else if(this.cdview==4){
    if(+this.user.role==4){
      this.loadhospitalusers(0);
    
    }
  }else if(this.cdview==5){
    this.loadMACTUsers(0);

  }else if(this.cdview==6){
    this.loadLSAUsers(0);

  }else if(this.cdview==7){
        this.loadInsurance(0);
  }
    
  }
  async hospitalentryusers(hospitalusers) {
    // alert("hiiiii");
     console.log(hospitalusers);
     //console.log("Field User  values", this.psFieldUsers[i]);
     const modalped = await this.modalctrl.create({
       component: EntryhpusersComponent,
       componentProps: { 'fielduserdata': hospitalusers }
       /* componentProps: {
          'visibility':this.data.accinfo.visibilty,
          'refhp':'test',
        }*/
     });
  
     modalped.onWillDismiss().then(dataReturned => {
       this.loadhospitalusers(0);
       //   this.histroyreturn = dataReturned.data;
     //  console.log('Receive: ', dataReturned.data);
       //if(dataReturned.data==true)
     });
     return await modalped.present().then(_ => {
       //  console.log('Sending: ', this.phyopnion);
     });
  
   }
  loadhospitalusers(offset){

    this.loading=true;
    let postDate={
      mode:'loadHospitalEntryuser',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      this.hospitalusers =data.data;
      this.hpname=data.user.data.name;
      this.hpadmin=data.user.data.username;
      
     
     
  /*
  
      if(offset==0){ 
        this.transStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.transStateUsers.push( data.data[i] );
        }
      }
      console.log("transStateUsers",data);
      this.loading=false;
  
  */
  
     });
  
  }
  doRefresh(event){
   
    this.showDept(this.cdview);


    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }



  scrollStateUser(event){
    if(this.psStateUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.psStateUsers.length);
    this.loadPSStateUsers(this.psStateUsers.length);
    event.target.complete();
  }

  scrollDistrictUser(event){
    if(this.psDistrictUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.psDistrictUsers.length);
    this.loadPSDistrictUsers(this.psDistrictUsers.length);
    event.target.complete();
  }

  scrollStationUser(event){
    if(this.psStationUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.psStationUsers.length);
    this.loadPSAdminUsers(this.psStationUsers.length);
    event.target.complete();
  }

  loadPSStateUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadPStatesUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.psStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.psStateUsers.push( data.data[i] );
        }
      }
      console.log("psAdminUsers",data);
      this.loading=false;
     });

  }

  loadPSDistrictUsers(offset){
    this.loading=true;
    let postDate={
      mode:'loadPSDistrictsUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.psDistrictUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.psDistrictUsers.push( data.data[i] );
        }
      }
      console.log("psDistrictusers",data);
      this.loading=false;
     });
    // 
  }

  loadPSAdminUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadPStationUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.psStationUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.psStationUsers.push( data.data[i] );
        }
      }
      console.log("psAdmintUsers",data);
      this.loading=false;
     });

  }

  loadPSFieldUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadPFieldUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.psFieldUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.psFieldUsers.push( data.data[i] );
        }
      }
      console.log("psAdmintUsers",data);
      this.loading=false;
     });

  }


  

 /* loadPSDistrict(){
    let postDate={
      mode:'loadPSDistricts'
    //  district:this.rtosel.district
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      this.psDistrictOptions=data.data;
 
     });
  }*/
  async stateusercreation(u) {
    console.log("State User values", u);
    const modalped = await this.modalctrl.create({
      component: StateusercreationComponent,
      componentProps: { 'stateuserdata': u,seldept:1 }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if(dataReturned.data==true){   this.loadPSDistrictUsers(0);      }
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async projUserCreation(){

    console.log("proj user creation");
    const modalped = await this.modalctrl.create({
      component: ProjusercreationComponent,
      componentProps: { 'stateuserdata': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if(dataReturned.data==true){   this.loadProjStateUsers(0)      }
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async stateTransUserCreation(u) {
    console.log("State User values", u);
    const modalped = await this.modalctrl.create({
      component: StateusercreationComponent,
      componentProps: { 'stateuserdata': u,seldept:2 }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if(dataReturned.data==true){   
       // this.loadPSDistrictUsers(0);      
      }
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async stateHighwaysUserCreation(u) {
    console.log("HW values",u);

    const modalped = await this.modalctrl.create({
      component: StateusercreationComponent,
      componentProps: { 'stateuserdata': u,seldept:3 }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async stateProjUserCreation(u) {
    console.log("HW values",u);

    const modalped = await this.modalctrl.create({
      component: StateusercreationComponent,
      componentProps: { 'stateuserdata': u,seldept:10 }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async districtusercreation(u) {
    console.log("District User  values", u);
    const modalped = await this.modalctrl.create({
      component: DistrictusercreationComponent,
      componentProps: { 'districtuserdata': u}
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
       
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      if(dataReturned.data==true){   this.loadPSDistrictUsers(0);      }
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async stationusercreation(u) {
    console.log("Station User  values", u);
    const modalped = await this.modalctrl.create({
      component: StationusercreationComponent,
      componentProps: { 'stationuserdata': u}
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
      //if(dataReturned.data==true)
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }
 
  async fieldofficercreation(u) {
    console.log("Field User  values", u);
    const modalped = await this.modalctrl.create({
      component: FieldofficerusercreationComponent,
      componentProps: { 'fielduserdata': u }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      //if(dataReturned.data==true)
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }


  loadTransStateUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadTransStatesUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.transStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.transStateUsers.push( data.data[i] );
        }
      }
      console.log("transStateUsers",data);
      this.loading=false;
     });

  }

  scrollTransStateUser(event){
    if(this.transStateUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.transStateUsers.length);
    this.loadTransStateUsers(this.transStateUsers.length);
    event.target.complete();
  }


  loadProjStateUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadProjStatesUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.projStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.projStateUsers.push( data.data[i] );
        }
      }
      console.log("ProjStateUsers",data);
      this.loading=false;
     });

  }

  scrollProjStateUser(event){
    if(this.projStateUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.projStateUsers.length);
    this.loadProjStateUsers(this.projStateUsers.length);
    event.target.complete();
  }

  loadProjDistUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadProjDistUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.projStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.projStateUsers.push( data.data[i] );
        }
      }
      console.log("ProjStateUsers",data);
      this.loading=false;
     });

  }



  async rtocreation() {
    //console.log("RTO values",i);
    const modalped = await this.modalctrl.create({
      component: RtocreationComponent,
      componentProps: { 'rtodata': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async unitofficecreation() {
    //console.log("RTO values",i);
    const modalped = await this.modalctrl.create({
      component: RtocreationComponent,
      componentProps: { 'rtodata': this.user }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async deletePSDistrict(i) {
    let districtdata=this.psDistrictUsers[i];
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>delete</strong>!!!',
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
            this.deleteDistrict(districtdata);
          }
        }
      ]
    });

    await alert.present();
  }

  async deletePSStation(i) {
    let data=this.psStationUsers[i];
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>delete</strong>!!!',
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
            this.deleteStation(data);
          }
        }
      ]
    });

    await alert.present();
  }


  async deleteRTO(i) {
    let data=this.transStateUsers[i];
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>delete</strong>!!!',
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
            this.deleteRto(data);
          }
        }
      ]
    });

     await alert.present();
   }

  async deleteRTOUO(u) {
    let data=u;
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>delete</strong>!!!',
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
            this.deleteUO(data);
          }
        }
      ]
    });

    await alert.present();
  }
  
  deleteDistrict(data){
    console.log(data)
   // this.loading=true;
    let postDate={
      mode:'deletePSDistrict', 
      data:data
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        //this.loading=false;
      }
    });
  }

  deleteStation(data){
    console.log(data)
   // this.loading=true;
    let postDate={
      mode:'deletePSStation', 
      data:data
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
        this.loadPSAdminUsers(0);
        //this.loading=false;
      }
    });
  }


  deleteRto(data){
    console.log(data)
   // this.loading=true;
    let postDate={
      mode:'deleteRTO', 
      data:data
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
        this.loadTransRTOUsers(0);
        //this.loading=false;
      }
    });
  }

  deleteUO(data){
    console.log(data)
   // this.loading=true;
    let postDate={
      mode:'deleteUO', 
      data:data
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        //this.loading=false;
      }
    });
  }


  async psdistrictcreation() {
    //console.log("RTO values",i);
    const modalped = await this.modalctrl.create({
      component: AddpsdistrictComponent,
      componentProps: { 'psdistrictdata': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async psstationcreation(){
    //console.log("RTO values",i);
    const modalped = await this.modalctrl.create({
      component: AddpsstationComponent,
      componentProps: { 'psstationdata': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }



  async addroadtypes() {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: AddroadtypesComponent,
      componentProps: { 'roadtypes': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/ 

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addhwcircle() {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: AddhwcircleComponent,
      componentProps: { 'hwcircle': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }



  async addhwdivision() {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: AddhwdivisionComponent,
      componentProps: { 'hwdivision': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addhwsubdivision() {

    const modalped = await this.modalctrl.create({
      component: AddhwsubdivisionComponent,
      componentProps: { 'hwsubdivision': '' }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async rtousercreation(i) {
    console.log("RTO User  values");
    
    const modalped = await this.modalctrl.create({
      component: TransportusercreationComponent,
      componentProps: { 'rtouserdata': '', }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addrto(u) {
    //console.log("RTO values",i);

    const modalped = await this.modalctrl.create({
      component: AddrtoComponent,
      componentProps: { 'rtouser': u }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/

    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }
  

  
  loadTransRTOUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadTransRTOsUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.transStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.transStateUsers.push( data.data[i] );
        }
      }
      console.log("transStateUsers",data);
      this.loading=false;
     });

  }

  scrollTransRTOUser(event){
    if(this.transStateUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.transStateUsers.length);
    this.loadTransRTOUsers(this.transStateUsers.length);
    event.target.complete();
  }

  
  loadTransMVIUsers(offset){

    this.loading=true;
    let postDate={
      mode:'loadTransMVIUsers',
      offset:offset
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);

      if(offset==0){ 
        this.transStateUsers =data.data;
      }else {
        for(let i=0;i<data.data.length;i++) {
          this.transStateUsers.push( data.data[i] );
        }
      }
      console.log("transStateUsers",data);
      this.loading=false;
     });

  }

  scrollTransMVIUser(event){
    if(this.transStateUsers.length%10!=0) {
      console.log('Async operation has ended');
      event.target.disabled = true;
    }

    console.log('Scroll Disabled');
    console.log('disabled_data Length ',this.transStateUsers.length);
    this.loadTransRTOUsers(this.transStateUsers.length);
    event.target.complete();
  }

// Highways users

loadHwStateUsers(offset){

  this.loading=true;
  let postDate={
    mode:'loadHwStatesUsers',
    offset:offset
  }
  this.api.post('usermanagement',postDate).subscribe((data: any)=>{
    console.log(data);

    if(offset==0){ 
      this.hwStateUsers =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.hwStateUsers.push( data.data[i] );
      }
    }
    console.log("loadHwStatesUsers",data);
    this.loading=false;
   });

}

scrollHwStateUser(event){
  if(this.hwStateUsers.length%10!=0) {
    console.log('Async operation has ended');
    event.target.disabled = true;
  }

  console.log('Scroll Disabled');
  console.log('disabled_data Length ',this.hwStateUsers.length);
  this.loadHwStateUsers(this.hwStateUsers.length);
  event.target.complete();
}

loadInsurance(offset){ 
  this.loading=true;
  let postDate={
    mode:'loadINScompany',
    offset:offset
  }; console.log('loadINScompany');
  this.api.post('usermanagement',postDate).subscribe((data: any)=>{
   console.log(data);
    if(data.flag==true && data.data!=undefined ){
  if(offset==0){ 
     this.insuranceCompany =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.insuranceCompany.push( data.data[i] );
     }
    }
  }
    console.log("loadINScompany",this.insuranceCompany);
    this.loading=false;
   });

}
viewINSuser(u){
  
}

loadMACTUsers(offset){ 
  this.loading=true;
  let postDate={
    mode:'loadMACTUsers',
    offset:offset
  }; console.log('loadMACTUsers');
  this.api.post('usermanagement',postDate).subscribe((data: any)=>{
   console.log(data);
    if(data.flag==true && data.data!=undefined ){
  if(offset==0){ 
     this.MACTUsers =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.MACTUsers.push( data.data[i] );
     }
    }
  }
    console.log("loadMACTUsers",this.MACTUsers);
    this.loading=false;
   });

}

loadLSAUsers(offset){ 
  this.loading=true;
  let postDate={
    mode:'loadLSAUsers',
    offset:offset
  }; console.log('loadLSAUsers');
  this.api.post('usermanagement',postDate).subscribe((data: any)=>{
   console.log(data);
    if(data.flag==true && data.data!=undefined ){
  if(offset==0){ 
     this.LSAUsers =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.LSAUsers.push( data.data[i] );
     }
    }
  }
    console.log("loadLSAUsers",this.LSAUsers);
    this.loading=false;
   });

}



loadHighwaysUsers(offset){

  this.loading=true;
  let postDate={
    mode:'loadHighwaysUsers',
    offset:offset
  }
  this.api.post('usermanagement',postDate).subscribe((data: any)=>{
   // console.log(data);
    if(data.flag==true && data.data!=undefined ){
    if(offset==0){ 
      this.highwaysUsers =data.data;
    }else {
      for(let i=0;i<data.data.length;i++) {
        this.highwaysUsers.push( data.data[i] );
      }
    }
  }
    console.log("loadHighwaysUsers",data);
    this.loading=false;
   });

}

scrollHighwaysUsers(event){
  if(this.highwaysUsers.length%10!=0) {
    console.log('Async operation has ended');
    event.target.disabled = true;
  }

  console.log('Scroll Disabled');
  console.log('disabled_data Length ',this.highwaysUsers.length);
  this.loadHighwaysUsers(this.highwaysUsers.length);
  event.target.complete();
}


viewProfile(usrname) {
  
  console.log(usrname);
  this.shserv.viewProfile(usrname);

}


async viewHighwaysuser(u) {
  const modalped = await this.modalctrl.create({
    component: HighwayusercreationComponent,
    componentProps: { 'highwayuserdata': u }
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(3);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}


async addinscomapny() {
  const modalped = await this.modalctrl.create({
    component: AddinscompanyComponent,
    componentProps: { 'insdata': ''}
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(7);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

async viewINSusers(u) {
  const modalped = await this.modalctrl.create({
    component: AddinsusersComponent,
    componentProps: { 'insuserdata': u }
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(7);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

async viewMACTusers(u){

  const modalped = await this.modalctrl.create({
    component: AddmactusersComponent,
    componentProps: { 'mactusersdata': u }
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(5);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });
}

async addMACTOffice(){
  const modalped = await this.modalctrl.create({
    component: AddmactofficeComponent,
    componentProps: { 'mactdata': ''}
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(5);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

async viewLSAusers(u){

  const modalped = await this.modalctrl.create({
    component: AddlsausersComponent,
    componentProps: { 'lsausersdata': u }
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(6);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });


}
async addLSAOffice(){
  const modalped = await this.modalctrl.create({
    component: AddlsaofficeComponent,
    componentProps: { 'mactdata': ''}
    /* componentProps: { 
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/ 
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);           
    this.showDept(6);
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

}
