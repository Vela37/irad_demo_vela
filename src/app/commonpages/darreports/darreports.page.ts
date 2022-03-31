import { AlertController, ModalController } from "@ionic/angular";
import { Component, OnInit } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from "rxjs";
import { User } from "../../commonpages/login/user.model";
import { UsersService } from '../../services/shared.service';

import { DarlinksComponent } from './darlinks/darlinks.component';
import { SumbitformsComponent } from './sumbitforms/sumbitforms.component';
import { DarlinksumbittedComponent } from './darlinksumbitted/darlinksumbitted.component';
import { DarhelpComponent } from './darhelp/darhelp.component';
import {ExaminationComponent  } from './examination/examination.component';


// PDF VIEW

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../environments/environment';





@Component({
  selector: 'app-darreports',
  templateUrl: './darreports.page.html',
  styleUrls: ['./darreports.page.scss'],
})
export class DarreportsPage implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;
  user: User;
  mactdetails:any;
  legaldetails:any;
  alreadyconnected:any;
  reportdata:any;
  vehicledata:any;
  generaldata:any;
  passengerdata:any;
  pedestriandata:any;
  victimdata:any;
  alldata:any;
  accid: any;
  selacc: any;
  flag: any;
  submissionflag: any;
  
  constructor(
    private modalctrl: ModalController,
    private translateConfigService: TranslateConfigService, public shserv:UsersService,
    private iab: InAppBrowser,
    private api: ApiService, private authService: AuthService)
     {

      this.selacc = JSON.parse(localStorage.getItem('selacc'));
      this.accid = this.selacc.accid;

      }

      
  ngOnInit() {
    this.loadconnectedins();
    this.flagtochange();
    this.loadinformstatus();
    this.changeflag();
    this.loadreports();
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; 
      if (this.isAuthenticated) {
        console.log(user.name);
        this.user = user;
      }
    });
  }


  isShow(formno){
    //console.log(formno);

    if(this.user.dept=='1' && (formno==1 || formno==2 || formno==3 || formno==4 || formno==5 || formno==6 || formno=='6A' || formno==7 || formno==8 || formno==9 || formno==10 ) ){
      return true;
    }else  if(this.user.dept=='7' && (formno==11 ) ){
        return true;
    }else  if(this.user.dept=='6' && (formno==12 ) ){
        return true;    
    }else  if(this.user.dept=='5' && (formno==13 || formno==14 || formno==15 || formno==16  || formno==17 || formno==18 || formno==19 ) ){
        return true;    
    }else {
      return false;
    }
   
  }

  changeflag(){
    

    let postDate={
      mode:'darlinkstatusmodal',
      accid:this.accid,
      lang:'en',
   }
    this.api.post('datas',postDate).subscribe((data: any)=>{
      //alert(data.checkstatus.getcount);
    //  this.flag=data.checkstatus.getcount;
      if(data.checkstatus.getcount!=0)
      {
        this.flag=1;
      }
      else
      {
        this.flag=0;
      }
    });

}
loadconnectedins(){

  let postDate={
    mode:'loadconnectedins',
    accid:this.accid
    
 }

  this.api.post('datas',postDate).subscribe((data: any)=>{
  

 // this.vehiclelist=data.data;
    this.alreadyconnected=data.vehicle;

    console.log(this.alreadyconnected);

    for (let i = 0; i < data.vehicle.length; i++) {

      this.alreadyconnected[i].get_insurance = JSON.parse(this.alreadyconnected[i].get_insurance);
    }

});

}

showdepts(){
  if(this.flag=='1'){
    this.ifformsubmitted()
  }else if(this.flag=='0'){
    this.ifnotformsubmitted()
  }
}

async ifnotformsubmitted() {
    
    const modal = await this.modalctrl.create({
      component: DarlinksComponent,
      componentProps: {
      accid:this.accid
      },
    });

    modal.onWillDismiss().then((dataReturned) => { 

      this.loadinformstatus();
      this.flagtochange();
      this.loadconnectedins();
    });
    return await modal.present().then((_) => { });
  }

  async ifformsubmitted() {
    
    const modal = await this.modalctrl.create({
      component: DarlinksumbittedComponent,
      componentProps: {
      accid:this.accid
      },
    });

    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }
  flagtochange(){ 

    let postDate={
      mode:'darlinkstatus',
      accid:this.accid,
      lang:'en',
   }

    this.api.post('datas',postDate).subscribe((data: any)=>{

            if(data.mact)
            {
              let madata=JSON.parse(data.mact.get_courtdetails);
              this.mactdetails=madata;
            }     
            
            if(data.legal)
            {  
              let ledata=JSON.parse(data.legal.get_legalservice);
              this.legaldetails=ledata;
            }
          
    });

  
  }

  viewProfile(usrname) {
  
    console.log(usrname);
    this.shserv.viewProfile(usrname);
  
  }
  async submitdoc(fm)
  {

    if(fm.get_edarupdateflag!=null)
    {
    this.submissionflag=1;
    }
    else
    {
      this.submissionflag=0;
    }
  //  alert(fm.formno);
   // return false;
  //  console.log();
//return false;
    const modal = await this.modalctrl.create({
      component: SumbitformsComponent,
      componentProps: {    
      accid:this.accid,
      fulldetails:fm,
      submission:this.submissionflag,
      reports:fm.formno
      },
    });

    modal.onWillDismiss().then((dataReturned) => { 

      this.loadinformstatus();
     // this.flagtochange();
     // this.loadconnectedins();

    });
    return await modal.present().then((_) => { });
  }


  async openHelp()
  {
  
    const modal = await this.modalctrl.create({
      component: DarhelpComponent,
      componentProps: {  formno:''  },
    });

    modal.onWillDismiss().then((dataReturned) => { 

    });
    return await modal.present().then((_) => { });
  }

  public loadinformstatus()
  {
   // alert('2345678');

    let postDate={
      mode:"reportstoshow",    
      accid:this.accid 
   }
      this.api.post('datas',postDate).subscribe((data: any)=>{ 

      this.reportdata=data.reports;
      for (let i = 0; i < this.reportdata.length; i++) { 
        
        this.reportdata[i].get_edarupdateflag = JSON.parse(this.reportdata[i].get_edarupdateflag);
      //  this.reportdata[i].get_edarupdateflaginsurance = JSON.parse(this.reportdata[i].get_edarupdateflag);
      }

 // console.log(this.reportdata);
     

      

      });
}
  public viewdocumentcommon(id)

  {
    
      if(id==1)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf1view?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }

      if(id==2)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf2View?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }
     
      
    }

    public viewdocumentowner(vehicle)
    {
      

  

            let pdfurl = '';
            pdfurl = environment.darUrl + 'form/pdf4View?accidentId='+this.accid+"&vehicleId="+vehicle.id;

            this.openWithSystemBrowser(pdfurl)  
        
       
      
      }
      public viewdocumentdriver(vehicle)
      {
        
  
 
              let pdfurl = '';
              pdfurl = environment.darUrl + 'form/pdf3View?accidentId='+this.accid+"&vehicleId="+vehicle.id;
  
              this.openWithSystemBrowser(pdfurl)  
          
         
        
        }

        public viewinterims(vehicle)
        {

   
                let pdfurl = '';
                pdfurl = environment.darUrl + 'form/pdf5View?accidentId='+this.accid+"&vehicleId="+vehicle.vehicle_id;
    
                this.openWithSystemBrowser(pdfurl)  
            
           
          
          }
          //http://10.163.30.225:8081/form/pdf7View?accidentId=202129592360121&vehicleId=8432&refId=8178&vehicleRegNo=TN32AQ2535&mode=veh
          public viewvictims(vehicle)
          {
          let mode='';
           if(vehicle.top=='Passenger')
           {
             mode='pass';
           }
           if(vehicle.top=='Pedestrian')
           {
             mode='ped';

           }
           if(vehicle.top=='vehicle')
           {
              mode='veh';

           }
              let pdfurl = '';

              pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+vehicle.id+"&vehicle_id="+vehicle.vehicle_id+"&mode="+mode;              this.openWithSystemBrowser(pdfurl)     

          

            
            }

            public viewdetailedaccident(vehicle)
            {
            let mode='';
             if(vehicle.top=='Passenger')
             {
               mode='pass';
             }
             if(vehicle.top=='Pedestrian')
             {
               mode='ped';
  
             }
             if(vehicle.top=='vehicle')
             {
                mode='veh';
  
             }
                let pdfurl = '';
                pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+vehicle.vehicle_id+"&vehicleRegNo="+vehicle.vehicle+"&mode="+mode;         
                this.openWithSystemBrowser(pdfurl)     
  
            
  
              
              }

              // http://10.163.30.225:8081/form/pdf8View?accidentId=202129592360121
              viewsiteplan(){
                let pdfurl = '';
                pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;

                this.openWithSystemBrowser(pdfurl)     

              }
              viewmvi(vehicle){
  ///console.log(vehicle);
  //return false;

                let pdfurl = '';
                pdfurl = environment.darUrl + 'form/pdf9View?accidentId='+this.accid+"&vehicleId="+vehicle.vehicle_reg_no;
                this.openWithSystemBrowser(pdfurl)     

              }
              viewverification(vehicle){

                let pdfurl = '';
                pdfurl = environment.darUrl + 'form/pdf10View?accidentId='+this.accid+"&vehicleRegNo="+vehicle.id;
                this.openWithSystemBrowser(pdfurl)     

              }

  loadreports(){
    
   let postDate={
    mode:"reports",    
    accid:this.accid 
 }
    this.api.post('datas',postDate).subscribe((data: any)=>{
    
      
      this.alldata=data.all;
      this.victimdata=data.victims;
      this.pedestriandata=data.passenger;
      this.passengerdata=data.passenger;
     // console.log("--->",this.passengerdata);
      this.generaldata=data.general;
      this.vehicledata=data.vehicle;
      for (let i = 0; i < this.vehicledata.length; i++) {
          
        this.vehicledata[i].driver = JSON.parse(this.vehicledata[i].driver);
      //  this.vehicledata[i].darvehicle = JSON.parse(this.vehicledata[i].darvehicle);
      }
      
    });

    
    
}

options: InAppBrowserOptions = {
  location: 'yes',//Or 'no' 
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
public openWithSystemBrowser(url: string) {
  let target = "_system";
  this.iab.create(url, target, this.options);
}


async fixExamination(){
    
  const modal = await this.modalctrl.create({
    component: ExaminationComponent,
    componentProps: { 'accid':this.accid },
  });

  modal.onWillDismiss().then((dataReturned) => { 

  });
  return await modal.present().then((_) => { });
}
  


}
