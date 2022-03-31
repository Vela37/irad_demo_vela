import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-legalservicegenral',
  templateUrl: './legalservicegenral.component.html',
  styleUrls: ['./legalservicegenral.component.scss'],
})
export class LegalservicegenralComponent implements OnInit {
  damgeorloss:any;
  emotionalharm:any;
  anyotherinj:any;
  constructor(private modalctrl: ModalController,private api:ApiService) 
  { 
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
console.log(this.accid);
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

  }
  accid:any;
  vehicle:any;
  selacc:any;
  vehicle_reg_no:any;
  victim:any;
  id:any;
  ptype:any;

  vname:any;


  brief_description_of_offense:any;
  physical_harm:any;
  accident_id:any;
  person_id:any;
  person_type:any;
  vehicle_id:any;
  emotional_harm:any
  damage_lose:any;
  any_damage_lose:any
  property_loss_damage:any;
  loss_suffered:any;
  ngOnInit() {
    
    
    console.log("working")
    this.loadvehicle() ;

  
  }

  loadvehicledetail(event:any){

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log(event.target.value );
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    let postDate = {
  
                        mode: "loadvictimsbyvehicle",
                        accid:this.accid,
                        vehicleid:event.target.value,

                  }
   this.api.post("datas", postDate).subscribe((rec: any) => {
                      this.victim=rec.victims;
                      console.log("************************************************");
                      console.log(rec.victims);
                      console.log("************************************************");
  
   });
   
    
      }




      loadvehicle(){
        let postDate = {
      
            mode: "dar_vehicle",
            accid:this.accid,
      
        }
         this.api.post("datas", postDate).subscribe((rec: any) => {
          this.vehicle=rec.dar_vehicle;
         });
      
      
      
      }
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  savebutton(){
console.log("VNAM",this.vname)

    let postData={
      
	//  accident_id:this.accident_id,
	//   person_id:this.person_id,
	//   person_type:this.person_type,
	//   nature_of_injuries:this.nature_of_injuries,inces
	//   brief_description_of_offense:this.brief_description_of_offense,
  //   vehicle_id:this.vehicle_id,
     
  
 vehicle_id:this.vehicle_reg_no,
 accident_id:this.accid,
 person_id: this.vname.id,
 person_type: this.vname.ptype,
 physical_harm: this.physical_harm,
 brief_description_of_offense: this.brief_description_of_offense,
 emotional_harm:this.emotional_harm,
 damage_lose:this.damage_lose,
 any_damage_lose:this.any_damage_lose,
 property_loss_damage:this.property_loss_damage,
 loss_suffered:this.loss_suffered,
     }

     
     console.log("--------------",postData);
//return false;
     this.api.darsave("slsagenral",postData).subscribe((rec: any) => {
  
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();      
      });
     
     console.log("--------------",postData);







  }
}
