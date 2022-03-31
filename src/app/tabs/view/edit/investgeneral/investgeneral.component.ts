import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import { model_geninfo } from '../../../../models/model_geninfo';
import { TranslateConfigService } from '../../../../translate-config.service';
import { AlertController,ModalController } from '@ionic/angular';
import { investigationreport_model } from '../../../../models/investigationreport_model';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx"; 
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ReportrequirementComponent } from '../../../view/reportsview/reportrequirement/reportrequirement.component';

import { AuthService } from "../../../../commonpages/login/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../../../commonpages/login/user.model";
//import { count } from 'console';


@Component({
  selector: 'app-investgeneral',
  templateUrl: './investgeneral.component.html',
  styleUrls: ['./investgeneral.component.scss'],
})
export class InvestgeneralComponent implements OnInit {
 

  isAuthenticated = false;
  private userSub: Subscription;
  user: User;
  list:any;
  postdata3={'mode':'','language':''};
  ln:any;
  options1:any;
  maxdate:any;
  mindate:any;
  accdatetime:any;
  geninfo: model_geninfo = new model_geninfo();
  docinfo: investigationreport_model=new investigationreport_model();
  selectedLanguage: string; params: any;
  accid: any; selacc: any;
  generaldata={'acc_id':'','officer_name':'',
               'officer_address':'','officer_number':'',
               'who_report_acc':'','cctv_availability':'',
               'acc_description':'description acc','dt_siteplan':'',
               'description_siteplan':'description test','fir_doc':true,
               'siteplan_doc':false,'photos_scene_allangles_doc':true,
               'photos_vehicles_allangles_doc':true,'cctv_footage_doc':true,
               'report_173crpc_doc':false,'driver_doc':false,
               'owner_doc':false,'ins_comp_doc':true,
               'claimant_doc':false,'reg_authority_doc':true,
               'hospital_doc':false}

               updateData: any = 0;

               fir_doc:boolean=false;
               siteplan_doc:boolean=true;        

               isDisabled: boolean=false;
               savebtn:boolean=true;
               vehicle:any;pedestriandata: any;

  pass: any[]=[];
  ///////////////////////////////////////
  addReports: any = 0;
  doc_upload_check: any = [];  
  fileType:any;
  filesPath:any;
  fileName:any;
  investofficername:any;
  image;
  docData:string[]= ['', '', '', '', '', '', '', '', '', '', '', ''];

  constructor(private authService: AuthService,private api:ApiService,private translateConfigService:TranslateConfigService,private platform:Platform,private file: File ,
    public loadingController: LoadingController,private iab: InAppBrowser,private fileOpener: FileOpener,private ft:FileTransfer,public navCtrl: NavController,
   
    public httpClient: HttpClient,private modalctrl:ModalController,private toastController: ToastController,) { 
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln=localStorage.getItem('ln');

    
     this.selacc=JSON.parse(localStorage.getItem('selacc'));
     this.accid =this.selacc.accid;
     console.log("AccId",this.selacc);
     this.geninfo.accident_id=this.accid;
  }

  ngOnInit() {
    
    //this.apitest();
    this.getGeneralData();
    this.loadProfile();
    this.loadCombo();

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user.name);
        this.user = user;
      }
    });
  }

  

  ionViewWillLeave(){

  }

  loadCombo(){
    
    let tables = 
      {'name': 'mst_dar_who_report_acc'};
    

    let postData = {
      general: tables,
      //pedestriandoc: this.docinfo
    }

      this.api.darsave('dar/whoreportacc', postData).subscribe((data: any) => {
      
      console.log(data);
      //this.modalctrl.dismiss(true);
    });
  }

  public apitest(){
   
    let postDate={
      mode:"ingeneral"
    }
    this.api.post('inv',postDate).subscribe((data: any)=>{
      console.log("who reported acc",data);
      this.options1=data.whoreported;
      
    });
  }


  public closeModal(){
    this.modalctrl.dismiss();
  }

  saveModal(flag){
  //  alert('call');
    // let postDate = {
    //   mode: 'investgeneral',
    //   general: this.geninfo,
    //   pedestriandoc: this.docinfo
    // }

    if(flag=="0"){
      
      this.geninfo.submitCheck=false;
      console.log("0",this.geninfo.submitCheck);
    }else{
      console.log("1")
      this.savebtn=false;
      this.geninfo.submitCheck=true;
      console.log("1",this.geninfo.submitCheck);

    }
    console.log(this.geninfo.cctv);

    console.log("AccPerson",this.geninfo.reportaccperson);


    console.log("this.generaldata.acc_description",this.generaldata.acc_description);

    let postDate = {
      general: this.geninfo,
      generaldoc:this.docinfo,
      accId: this.accid
    }
console.log('----->',postDate);
//return false;

    this.geninfo.updateData=this.updateData;
    console.log("updateData",this.geninfo.updateData);
    
    this.api.darsave('dar/general', postDate).subscribe((data: any) => {
      alert(data.Message);
    //  alert("check");
   //   let ddd= JSON.parse(data);
    //  alert(ddd);
      this.modalctrl.dismiss(true);
      //console.log(data);
       // console.log('updated');
      //  this.closeModal();
      //  this.presentToast("User Created Successfully !");
        
    });
  }

  


  goToReport(flag){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        report_flag: flag
      }
  };

  console.log("Sending",navigationExtras);
  //this.navCtrl.navigateForward(['reportsview'], navigationExtras);
    this.modalctrl.dismiss();
    //this.router.navigate(['/reportsview',this.veh_ref_no]);
  }


  async goToReportrequirement(flagmode_report,flag) {
    console.log("Flag sending to report",flagmode_report)
    this.modalctrl.dismiss();

    const modal = await this.modalctrl.create({
        component:ReportrequirementComponent,
        componentProps: {'flagId':  flagmode_report,
                          'report_or_not':flag}
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }


  // genersteReport(flag){
  //     this.addReports=1
  //     let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //         img_type: flag
  //       }
  //   };
  
  //   console.log("Sending to Gallery",navigationExtras);
  //   //this.route.navigate(['/acctabs/tab1/map']);
  //   localStorage.setItem('img_type', flag);
  //   this.route.navigate(['/acctabs/tab1/media'], navigationExtras);  
  // }
  
  viewPdf(flag){
    console.log("VehList///",this.accid);
    let ln = this.selectedLanguage;
    let pdfurl = '';

    this.doc_upload_check[flag]=1;

      console.log("AcciD",this.accid);
      // console.log("veh_no",this.veh_ref_id.veh_id);
      // console.log("veh_no",this.veh_ref_id.veh_no);

      if (flag == 1) {
        pdfurl = environment.darUrl + 'form/pdf1view?accidentId='+this.accid;
      } else if (flag == 2) { 
        pdfurl = environment.darUrl + 'form/pdf2View/'+this.accid;
      } else if (flag == 5) { //vehrefid
        pdfurl = environment.darUrl + 'form/pdf5View?accidentId='+this.accid
        "&vehrefid="+
        this.accid;
      } else if (flag == 7) { 
        this.doc_upload_check[flag]=2;
        pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid;
      } else if (flag == 8) { 
        pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
      } 
      // else if (flag == 9) { //vehregno
      //   pdfurl = environment.darUrl + 'form/pdf9View?accidentId='+this.accid
      //   "&vehregno="+
      //   this.veh_ref_id.veh_no;
      // } else if (flag == 10) { //vehregno
      //   pdfurl = environment.darUrl + 'form/pdf10View?accidentId='+this.accid
      //   "&vehregno="+
      //   this.veh_ref_id.veh_no;
      // }

    if (this.platform.is('android')) {
      this.downloadAndOpenPdf(pdfurl);
      console.log("mobile :true");
    } else {
      this.openWithSystemBrowser(pdfurl);
      console.log("mobile :false");
    }

  }

  downloadPdf(flag){
    console.log("VehList///",this.accid);
    let ln = this.selectedLanguage;
    let pdfurl = '';

    this.doc_upload_check[flag]=1;

      console.log("AcciD",this.accid);

      if (flag == 1) {
        pdfurl = environment.darUrl + 'form/pdf1?accidentId='+this.accid;
      } else if (flag == 2) { 
        pdfurl = environment.darUrl + 'form/pdf2/'+this.accid;
      } else if (flag == 5) { //vehrefid
        pdfurl = environment.darUrl + 'form/pdf5?accidentId='+this.accid
        "&vehrefid="+
        this.accid;
      } else if (flag == 7) { 
        pdfurl = environment.darUrl + 'form/pdf7?accidentId='+this.accid;
      } else if (flag == 8) { 
        pdfurl = environment.darUrl + 'form/pdf8?accidentId='+this.accid;
      } else if (flag == 9) { //vehregno
        pdfurl = environment.darUrl + 'form/pdf9?accidentId='+this.accid
        "&vehregno="+
        this.accid;
      } else if (flag == 10) { //vehregno
        pdfurl = environment.darUrl + 'form/pdf10?accidentId='+this.accid
        "&vehregno="+
        this.accid;
      }

    if (this.platform.is('android')) {
      this.downloadAndOpenPdf(pdfurl);
      console.log("mobile :true");
    } else {
      this.openWithSystemBrowser(pdfurl);
      console.log("mobile :false");
    }

  }

  
  downloadAndOpenPdf(pdf_url){
    console.log("PDF_URL",pdf_url)
    this.showLoader();
    let pdfurl="";
    let path=this.file.dataDirectory;
    const transfer=this.ft.create();

    transfer.download(pdf_url,`${path}myfile.pdf`).then(entry=>{
      let url=entry.toURL();

      if(this.platform.is('android')){
        this.hideLoader();
        this.fileOpener.open(url,'application/pdf');
      }
    })
  }

  showLoader() {
    this.loadingController.create({
      message: 'Please wait loading...',
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
    let target = "_blank";
    this.iab.create(url, target, this.options);
  }
  loadaddress($event) : void {
//console.log($event);
    let pid=$event.target.value;
    //alert(pid);
    for(let i=0;i<this.list.length;i++){
      if(pid==this.list[i].id){

        this.geninfo.reporting_person_name= this.list[i].name; 
        this.geninfo.reporting_person_address=this.list[i].address;
        this.geninfo.reporting_person_mobile=this.list[i].mobile;
        
      }

      }
  
  }

  changeListener($event,flag) : void {
    // this.reportname='wound';
    console.log("Flag",flag);
    console.log("$event.target.files",$event.target.files);
    this.filesPath  = $event.detail.value;
    this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
    this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);

     
     if(this.fileType=="pdf"){
       console.log("Proper Format")
       this.readThis($event.target,flag,this.fileName);  
       
     }else{
       console.log("Improper format");
       this.presentToast("Select a proper file type");
     }
   }

   readThis(inputValue: any,flag,fileName) {
    
    var file = document.querySelector(
      'input[type=file]')['files'][0]

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log("base 64 VAL",this.image);
      this.docData[flag]=this.image;
    }
    console.log("Filepath",this.filesPath);
   
    myReader.readAsDataURL(file);
  }

  savePdf(flag,docname){
    let postDate = {
      //mode: 'imageupload',
      accidentId:this.accid,
      modeOfTheDocument: 'dar',
      nameOfTheDocument: docname,
      documents: this.docData[flag],
      linkId:'',
      remarks:'',
      active:'',
      insertedBy:this.geninfo.investofficername
    }
    // alert(JSON.stringify(postDate));
    this.api.darsave('dar/insertdocuments', postDate).subscribe(
      (data: any) => {
        console.log(data); 
        this.doc_upload_check[flag]=3;
        
        
      });
  }

  getGeneralData(){
    //this.generaldata.acc_id='123456';
   
    this.generaldata.acc_id = this.accid;
    let postDate = {
      general: this.generaldata,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getgeneral', postDate).subscribe((data: any) => {
      
      console.log(data);
      if(data!=null){
        this.updateData = 1;
        console.log('updated');
        
       
        if(data.submitCheck==true){
          console.log("Data submit2",data.submitCheck);
          this.isDisabled=false;
          this.savebtn=false;
        }
        console.log("Disabled true",this.isDisabled);
        this.geninfo.investofficername=data.officerName;
        this.geninfo.investofficernumber=data.officerNumber;
        this.geninfo.investofficeraddress=data.officerAddress;
        this.geninfo.descriptionacc=data.accDescription;
        this.geninfo.reportaccperson=data.whoreportAcc;
        this.geninfo.dtsiteplan=data.dtSiteplan;
        this.geninfo.underSection=data.underSection;
        this.geninfo.siteplandescription=data.descriptionSiteplan;
        this.geninfo.lossOfproperty=data.lossOfproperty;
        this.geninfo.otherLoss=data.otherLoss;
        this.geninfo.natureAcc=data.natureAcc;
        this.geninfo.reporting_person_name=data.reportingPersonname;
        this.geninfo.reporting_person_mobile=data.reportingPersonmobile;
        this.geninfo.reporting_person_address=data.reportingPersonaddress;
        
        this.geninfo.hospitalRemainderdate=data.hospitalRemainderdate;
        this.geninfo.regAuthorityremainderdate=data.regAuthorityremainderdate;
        this.geninfo.brief_description_acc=data.briefDescriptionaccident;
        

        //this.geninfo.cctv=data.cctvAvailability;
        console.log("Data check",this.geninfo.cctv);
        if(data.cctvAvailability==true){
          this.geninfo.cctv="true";
        }else{
          this.geninfo.cctv="false";

        }

        this.presentToast("General Data fetched !");
      }
      else{
        this.updateData=0;
        console.log("updateData",this.updateData);
      }
        //this.modalctrl.dismiss(true);
    });
  }

  loadProfile(){
    this.api.post('profile.php', { mode: 'profile', ln: this.selectedLanguage }).subscribe((res: any) => {


      if(res.error!=undefined){
        console.log('resdata',data);
        // this.authService.logout();
        // this.router.navigate(['/home']);
      }

      // console.log(res); 
      //this.healthuser = null;
       var data = res.data[0];


        this.geninfo.investofficername =  data.name ;

        this.geninfo.investofficernumber =  data.mobile ;

        this.geninfo.investofficeraddress =  data.get_ps_name ;
      // if (data.dept == 1 && (data.role_code == 4 || data.role_code == 5)) {
      //   this.loadselection();
      // }

    });
  }
  checkforReportingPerson(){

    let postdata={
      "mode":'loadreportedperson',
      "accid":this.accid,
      "type":this.geninfo.reportaccperson,
      "userid":this.user.userid
    }

    this.api.post('datas', postdata).subscribe((data: any) => {

       this.list=data.list;
    
});

  }
  checkforReportingPerson_old(){
    console.log("CHECK WOrks!!!",this.geninfo.reportaccperson);
    if(this.geninfo.reportaccperson=="Driver"){
      console.log("checkforReportingPerson1",this.geninfo.reportaccperson);
      this.getDrivers();
    }else if(this.geninfo.reportaccperson=="Witness"){
      console.log("checkforReportingPerson3",this.geninfo.reportaccperson);
      this.getWitness();

    }
  }

  getWitness(){
    console.log("WItness Data",this.accid);
    let postDate = {
     // witness: this.accid,
      accId: this.accid
      //pedestriandoc: this.docinfo
    }

    

    this.api.darsave('dar/getwitness', postDate).subscribe((data: any) => {
      
      console.log("Witness",data);
      this.pass.push[data];
      console.log("Witness",data);
      
        console.log('updated');       
       
        
        this.presentToast("Witness Data fetched !");
        //this.modalctrl.dismiss(true);
    });
    
  }

  getDrivers() {
    let postDate = {
      mode: 'vehicle',
      ln: this.selectedLanguage,
      id: this.accid
    }
    //this.pass.length=0;
    this.api.post('accview', postDate).subscribe((data: any) => {
      console.log(data);

      this.vehicle = data.data;  // console.log('vehicle data ',this.vehicle);

      for (let i = 0; i < data.data.length; i++) {
        this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
        this.pass = this.vehicle[i].driver;
        console.log("Driver Details", this.pass);
      }
      console.log("Total Driver Details", this.pass);
      // this.vehicleinfo.drivername = this.driver.ser_name;
      // console.log("Vehicle Id", this.driver.vehicle_id);
      // this.vehicleinfo.driverrefId = this.driver.vehicle_id;

      // console.log('vehicle data json ', this.vehicleinfo.driverrefId);

    });

  }

  getPedestrian() {
    let postDate = {
      mode: 'pedestrian',
      ln: this.selectedLanguage,
      id: this.accid
    }
    this.api.post('accview', postDate).subscribe((data: any) => {
      console.log(data);        //console.log('flag ',flag);
      // if(data.data==null){ console.log(' data is null'); return }

      this.pedestriandata = data.data;  // console.log('vehicle data ',this.vehicle);

      for (let i = 0; i < data.data.length; i++) {
        console.log("Pedestrian Name", this.pedestriandata[i].name);
        //this.vehicle[i].pedestrian = JSON.parse(this.vehicle[i].pedestrian);
        //this.pass.push(this.pedestriandata[i]);
        console.log("Pedestrian check---",this.pass);
        this.pass=this.pedestriandata[i];
        console.log("Pedestrian Details", this.pass);
        // this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
      }
      console.log('vehicle data json ', this.pedestriandata);

    });

  }


  getPassengers() {
    let postDate = {
      mode: 'vehicle',
      ln: this.selectedLanguage,
      id: this.accid
    }
    this.api.post('accview', postDate).subscribe((data: any) => {
      console.log(data);        //console.log('flag ',flag);
      // if(data.data==null){ console.log(' data is null'); return }
      
          this.vehicle = data.data;  // console.log('vehicle data ',this.vehicle);

        for (let i = 0; i < data.data.length; i++) {
          this.vehicle[i].passengers = JSON.parse(this.vehicle[i].passengers);
          this.pass=this.vehicle[i].passengers;
          console.log("Passenger Details",this.pass);
          this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
        }
        console.log('vehicle data json ', this.vehicle);
      
    });

}

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

}
