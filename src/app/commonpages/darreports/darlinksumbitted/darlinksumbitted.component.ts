import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
//import { DarforwardComponent } from '../../popups/darforward/darforward.component';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-darlinksumbitted',
  templateUrl: './darlinksumbitted.component.html',
  styleUrls: ['./darlinksumbitted.component.scss'],
})
export class DarlinksumbittedComponent implements OnInit {


  constructor(private modalctrl: ModalController,private api:ApiService, private authService: AuthService) { }
  @Input() selacc:any;
  @Input() accid:any;
  
  user:any;
  private userSub: Subscription; isAuthenticated = false;
  ctrl_typeofcourt:any;
  ctrl_courtlist:any;
  ctrl_district:any;
  ctrl_taluk:any;
  data_courttype:any;
  data_court:any;
  data_taluk:any;
  district:any
  courtflag:boolean=false;
  courtflagtwo:boolean=false;
  courtlist:boolean=false;

  legalctrl_typeofcourt:any;
  legalctrl_courtlist:any;
  legalctrl_district:any;
  legalctrl_taluk:any;
  legaldata_courttype:any;
  legaldata_court:any;
  legaldata_taluk:any;
  legaldistrict:any;

  insurancelist:any;
  legalcourtflag:boolean=false;
  legalcourtflagtwo:boolean=false;
  legalcourtlist:boolean=false;
    insurance_id:any;

    changeflag:any=0;
    legalchangeflag:any=0;
    masterchangeflag:any=0;
    editmact:any=0;
    editlegal:any=0;


    mactdetails:any;
    legaldetails:any;
    alreadyconnected:any;

    showchangemact(){
    this.editmact=1;
    
    }
    showchangelegal(){
     
      this.editlegal=1;
      
      }

  ngOnInit() {

    console.log(this.accid);
    this.loadcourt();
    this.legalloadcourt();
  //  this.loadinsurance();
    this.flagtochange();

   // this.districtloading();
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.user=user;
      }
    });
  }
  flagtochange(){
    

    let postDate={

      mode:'darlinkstatus',
      accid:this.accid,
      lang:'en',
      
   }
    this.api.post('datas',postDate).subscribe((data: any)=>{
      this.masterchangeflag=data.checkstatus.getcount;

          this.changeflag=data.mact.link;
          let madata=JSON.parse(data.mact.get_courtdetails);
          let ledata=JSON.parse(data.legal.get_legalservice);

      //    console.log(ledata);

          this.mactdetails=madata;
          this.legaldetails=ledata;
          this.legalchangeflag=data.legal;

        
      
     


    });

  
  }

    loadinsurance(){

 //this.loadcourtsss();
    
    let postDate={
      mode:'loadinsurance',
      lang:'en',
      
   }
    this.api.darsave('loadInsuranceDetails',postDate).subscribe((data: any)=>{

      this.insurancelist=data.data;

      console.log(this.insurancelist);

    });
  
}
  legalcallcortlisttaluk(){

    //loadtaluk
      this.data_court=null;
      
      let postDate={
       mode:"loadTalukLegalList",
       typeofcourt:this.ctrl_typeofcourt,
       district:this.ctrl_district,
       taluk:this.ctrl_taluk
     }
     this.api.darsave('legalServiceList', postDate).subscribe((data: any) => {    
       if(data.count=='0')
       {
         alert("Not found any taluk court");
         return false;
       }    
       this.data_court=data.legalServiceList;  
        });
     
     
     }

  legalloadcourt(){
    let postDate={
      lang:'en',
      tableArrayName:['legaltype']
   }
    this.api.darsave('user/master',postDate).subscribe((data: any)=>{

      this.legaldata_courttype=data.legaltype;
     });
  
}

legalshowlevel()
{
  
  this.legaldistrict=null;
  this.legaldata_taluk=null;
  this.legaldata_court=null;
  

  if(this.legalctrl_typeofcourt=='3')
  {
    this.legalcourtflag=true;
    this.legalcourtlist=true;
    this.legaldistrictloading();
  }
  else if(this.legalctrl_typeofcourt=='4')
  {
    this.legalcourtflag=true;
    this.legalcourtflagtwo=true;
    this.legalcourtlist=true;
    this.legaldistrictloading();

  }
  else
  {
    this.legalcourtflag=false;
    this.legalcourtflagtwo=false;
    this.legalcourtlist=false;
  }


}
legaldistrictloading(){

  this.legaldata_court=null;

let postDate = {
mode: 'loaddistrict'

}
this.api.darsave('loaddistrict', postDate).subscribe((data: any) => {
console.log("datafghdghe----------------------------------------------------------");
console.log(data);

console.log("datafghdghe---------------------------------------------------------");

this.legaldistrict=data.district;

});

}

legalloadtaluk(){

  if(this.legalctrl_typeofcourt=='3')
  {
  this.legalcallcortlistdistrict();
  }
  else if(this.legalctrl_typeofcourt=='4')
  {
  
    this.legaldata_taluk=null;
    this.legaldata_court=null;
  
     let postDate={
       mode:"loadtaluk_court",
       district:this.legalctrl_district
    }
    console.log(postDate);
     this.api.darsave('loadtaluk',postDate).subscribe((data: any)=>{
     this.legaldata_taluk=data.taluk;
     });
   
  }
     
   
    
  }
  legalcallcortlistdistrict()
{
  
 this.legaldata_court=null;
 let postDate={
  mode:"loadDistrictLegalList",
  typeofcourt:this.legalctrl_typeofcourt,
  district:this.legalctrl_district

}
this.api.darsave('legalServiceList', postDate).subscribe((data: any) => {    
  if(data.count=='0')
  {
    alert("Not found any district court");
    return false;
  }    
  this.legaldata_court=data.legalServiceList;  
   });


}

  closeModal(){
    this.modalctrl.dismiss();

  }
  //tableArrayName
  showlevel()
  {
    
    this.district=null;
    this.data_taluk=null;
    this.data_court=null;
    

    if(this.ctrl_typeofcourt=='3')
    {
      this.courtflag=true;
      this.courtlist=true;
      this.districtloading();
    }
    else if(this.ctrl_typeofcourt=='4')
    {
      this.courtflag=true;
      this.courtflagtwo=true;
      this.courtlist=true;
      this.districtloading();

    }
    else
    {
      this.courtflag=false;
      this.courtflagtwo=false;
      this.courtlist=false;
    }


  }

  loadcourt(){

 //this.loadcourtsss();
    
    let postDate={
      lang:'en',
      tableArrayName:['courttype']
   }
    this.api.darsave('user/master',postDate).subscribe((data: any)=>{

      this.data_courttype=data.courttype;
     });
  
}

  loadcourtsss(){

 

    
    let postDate={
      mode:'courtdetails',
      lang:'en',
      tableArrayName:['courttype']
   }
   console.log(postDate);
   //return false;
    this.api.darsave('loadcourtprofile',postDate).subscribe((data: any)=>{
   // this.ctrl_taluk=data.taluk;
   console.log("------------------------");
   console.log(data.courttype);
  this.data_courttype=data.courttype
   console.log("------------------------");
     });
  
}

  loadtaluk(){

if(this.ctrl_typeofcourt=='3')
{
this.callcortlistdistrict();
}
else if(this.ctrl_typeofcourt=='4')
{

  this.data_taluk=null;
  this.data_court=null;

   let postDate={
     mode:"loadtaluk_court",
     district:this.ctrl_district
  }
  console.log(postDate);
   this.api.darsave('loadtaluk',postDate).subscribe((data: any)=>{
   this.data_taluk=data.taluk;
   });
 
}
   
 
  
}
callcortlistdistrict()
{
  
 this.data_court=null;
 let postDate={
  mode:"loadDistrictCourtList",
  typeofcourt:this.ctrl_typeofcourt,
  district:this.ctrl_district

}
this.api.darsave('courtlist', postDate).subscribe((data: any) => {    
  if(data.count=='0')
  {
    alert("Not found any district court");
    return false;
  }    
  this.data_court=data.courtList;  
   });


}

callcortlisttaluk(){

//loadtaluk
  this.data_court=null;
  
  let postDate={
   mode:"loadSubordinateCourtList",
   typeofcourt:this.ctrl_typeofcourt,
   district:this.ctrl_district,
   taluk:this.ctrl_taluk
 }
 this.api.darsave('courtlist', postDate).subscribe((data: any) => {    
   if(data.count=='0')
   {
     alert("Not found any taluk court");
     return false;
   }    
   this.data_court=data.courtList;  
    });
 
 
 }



  districtloading(){

                      this.data_court=null;
    
let postDate = {
       mode: 'loaddistrict'
      
     }
     this.api.darsave('loaddistrict', postDate).subscribe((data: any) => {
       console.log("datafghdghe----------------------------------------------------------");
       console.log(data);

       console.log("datafghdghe---------------------------------------------------------");

        this.district=data.district;
      
     });
 
   }
   onSubmitlegal(){
    
    let postDate={
       mode:"darlinklegal",
       typeofcourt:this.legalctrl_typeofcourt,
       accidentId:this.accid,
       district:this.legalctrl_district,
       taluk:this.legalctrl_taluk,
       status:'1',
       legalId:this.legalctrl_courtlist
   }

   console.log(postDate);
   
   //return false;

    this.api.post('datas',postDate).subscribe((data: any)=>{
     
      alert(data.msg);
    
    });

    
  }
   onSubmitdar(){
    
        let postDate={
          mode:"darlinkmact",
           typeofcourt:this.ctrl_typeofcourt,
           accidentId:this.accid,
           district:this.ctrl_district,
           taluk:this.ctrl_taluk,
           status:'1',
           courtId:this.ctrl_courtlist
       }
       console.log(postDate);
       
      // return false;

        this.api.post('datas',postDate).subscribe((data: any)=>{
         
          alert(data.msg);
          this.modalctrl.dismiss();
        });
    
        
      }

}
