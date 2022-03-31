import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
//import { DarforwardComponent } from '../../popups/darforward/darforward.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-insuranceinformations',
  templateUrl: './insuranceinformations.component.html',
  styleUrls: ['./insuranceinformations.component.scss'],
})
export class InsuranceinformationsComponent implements OnInit {
  accid:any;
  constructor(private modalctrl: ModalController,private api:ApiService, private authService: AuthService) { }
  @Input() selacc:any; user:any;
  private userSub: Subscription; isAuthenticated = false;
  ctrl_typeofcourt:any;
  insurance_id:any;
  ctrl_district:any;
  ctrl_taluk:any;
  data_courttype:any;
  data_court:any;
  data_taluk:any;
  district:any
  courtflag:boolean=false;
  courtflagtwo:boolean=false;
  courtlist:boolean=false;
  ngOnInit() {
    this.loadinsurance();
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

  loadinsurance(){

 //this.loadcourtsss();
    
    let postDate={
      mode:'loadinsurance',
      lang:'en',
      
   }
    this.api.darsave('loadInsuranceDetails',postDate).subscribe((data: any)=>{

      this.data_court=data.data;
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

   onSubmit(){
    //
        let postDate={
          mode:"insuranceforward",
           accidentId:this.selacc.accid,
           status:'1',
           insurance_id:this.insurance_id
       }
       console.log(postDate);
       
       //return false;

        this.api.post('datas',postDate).subscribe((data: any)=>{
         
          alert(data.mess);
        
        });
    
        
      }


}
