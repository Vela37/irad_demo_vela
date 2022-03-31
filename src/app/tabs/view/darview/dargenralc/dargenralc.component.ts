import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dargenralc',
  templateUrl: './dargenralc.component.html',
  styleUrls: ['./dargenralc.component.scss'],
})
export class DargenralcComponent implements OnInit {
  @Input() generaldata: any;
  constructor(private api:ApiService, private modalctrl: ModalController) { }
  
 




  ngOnInit() {}


  closeModal()  {
    let reply = { 'geninfo':this.generaldata};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }

 cancelmodal()
 {
   //this.histroy = { accid:this.accid,nov:this.nov}; 

   this.modalctrl.dismiss();
 }



 saveModal(){
  let postDate={
    mode:"dargenral",
    investofficername:this.generaldata.investofficername, 
    investofficernumber:this.generaldata.investofficernumber, 
    investofficeraddress:this.generaldata.investofficeraddress, 
    nature:this.generaldata.nature, 
    whoreportAcc:this.generaldata.whoreportAcc,  
    reportingPersonname:this.generaldata.reportingPersonname, 
    reportingPersonaddress:this.generaldata.reportingPersonaddress, 
    cctvAvailability:this.generaldata.cctvAvailability, 
    lossOfproperty:this.generaldata.lossOfproperty, 
    otherLoss:this.generaldata.otherLoss, 
    briefDescriptionaccident:this.generaldata.briefDescriptionaccident, 
    dtSiteplan:this.generaldata.dtSiteplan, 
    descriptionSiteplan:this.generaldata.descriptionSiteplan, 

 }
 console.log(postDate);
  
 }
//  saveModal()  {
//   //let data= { 'geninfo':'geninfo'};
//   console.log(this.generaldata);

//   var dateObj = new Date(this.generaldata.datetime+'');
//   let accdatetime = dateObj;
//   console.log("dateObj1", dateObj);

//   var dateObj = new Date(this.generaldata.repdatetime+'');
//   let repdatetime = dateObj;
//   console.log("dateObj2", dateObj);

//   console.log('get time', accdatetime.getTime(),'>',repdatetime.getTime(),accdatetime.getTime()>repdatetime.getTime() );

//   // if (accdatetime.getTime() > repdatetime.getTime()) {
//   //   console.log(1);
//   //   alert("Reporting Date Time must be Greater than Accident Time");
//   //   return false;
//   // }


//   if(this.generaldata.vehicles_count<(+this.generaldata.driver_dead+ +this.generaldata.driver_inj)){
//     console.log(this.generaldata.vehicles_count+'<'+(+this.generaldata.driver_dead+ +this.generaldata.driver_inj))
//     alert("Vehicle count must be greater than or equal to driver(s) ");
//     return false;
//   }

//   if(this.generaldata.severity!=1 && (this.generaldata.driver_dead!=0 || this.generaldata.pass_dead!=0 || this.generaldata.ped_dead!=0)){
//     alert("Some one is dead so severity myst be Fatal");
//     return false;
//   }

//   if(this.generaldata.severity==1 && (this.generaldata.driver_dead==0 && this.generaldata.pass_dead==0 && this.generaldata.ped_dead==0)){
//     alert("No one is Dead so severiy should not be Fatal");
//     return false;
//   }

//   console.log(this.generaldata);

//  // this.updateGeninfo()

//  this.modalctrl.dismiss(true);
// }

// updateGeninfo(){
//   this.isLoading=true; 
//   let postDate={
//     mode:'geninfo',
//     geninfo:this.geninfo
//   }
//   this.api.post('update',postDate).subscribe((data: any)=>{
//     console.log(data); 
//     if(data.flag==true){
//       console.log('updated');
//       this.modalctrl.dismiss(true);
//     }
//     this.isLoading=false; 
//   });
// }



}
