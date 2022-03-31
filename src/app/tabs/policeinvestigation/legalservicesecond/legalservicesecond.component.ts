import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-legalservicesecond',
  templateUrl: './legalservicesecond.component.html',
  styleUrls: ['./legalservicesecond.component.scss'],
})
export class LegalservicesecondComponent implements OnInit {

  constructor(private modalctrl: ModalController,private api:ApiService)
   {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

    }

  accid:any;
  vehicle:any;
  accused:any;
  selacc:any;
  vehicle_reg_no:any;
  vname:any;
  acc_fled_spot:any;
  acc_reported_to_police:any;
  acc_provided_any_assitance_victim:any;
  acc_took_victim_hospital:any;
  nature_of_injuries:any;
  acc_remained_spot_police_arrived:any;
  acc_cooperated_investigation:any;
  acc_removed_vehicle_police_arrived:any;
  acc_paid_compensation_medical_expenses:any;
  acc_previous_convictions:any;
  acc_close_friend_victim:any;
  acc_age:any;
  acc_gender:any;
  acc_suffered_injuries:any;
  acc_discharged_duties:any;



  acc_other_information:any;
  deri_fled_mvact:any;


  acc_apaent_contributing_cir:any;
  acc_aggressive_driving:any;
  acc_irresponsible_behaviour:any;




  acc_prosecuted:any;
  acc_visited_victim_hospital:any;
  get_veh_no:any;
  ser_name:any;
  accusedname:any;
  id_slsa:any;

  //new
  victim:any;
  flag:any;
  ngOnInit()
   {
    this.loadvehicle() ;
    this.loadaccused() ;

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
  loadaccused(){
    let postDate = {
      mode: "loadaccused",
       accid:this.accid,
  
    }
     this.api.post("datas", postDate).subscribe((rec: any) => {
      this.accused=rec.accused;
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(postDate);
      console.log(rec.accused);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

     });

  
  }



  // loadvehicle(){

  //   console.log("loadvehicle  working")
  //   let postDate = {
  
  //       mode: "loadaccused",
  //       accid:this.accid,
      
  
  //   }
  //    this.api.post("datas", postDate).subscribe((rec: any) => {
  //     this.vehicle=rec.accused;
  //     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  //     console.log(postDate);
  //     console.log(rec.accused);
  //     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");


  //    });
  
  
  
  // }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  savebutton(){


    let postData={
      
	//  accident_id:this.accident_id,
	//   person_id:this.person_id,
	//   person_type:this.person_type,
	//   nature_of_injuries:this.nature_of_injuries,
	//   brief_description_of_offense:this.brief_description_of_offense,
  //   vehicle_id:this.vehicle_id,
     
  vehicle_id: this.accusedname.vehicle_id,
  accident_id: this.accusedname.accident_id,
 person_id:this.accusedname.id,
  person_type: "Driver",


   acc_fled_spot:this.acc_fled_spot,
   acc_reported_to_police:this.acc_reported_to_police,
   acc_provided_any_assitance_victim:this.acc_provided_any_assitance_victim,
   acc_took_victim_hospital:this.acc_took_victim_hospital,


   nature_of_injuries:this.nature_of_injuries,
   acc_remained_spot_police_arrived:this.acc_remained_spot_police_arrived,
   acc_cooperated_investigation:this.acc_cooperated_investigation,
   acc_removed_vehicle_police_arrived:this.acc_removed_vehicle_police_arrived,
   acc_paid_compensation_medical_expenses:this.acc_paid_compensation_medical_expenses,
   acc_previous_convictions:this.acc_previous_convictions,
   acc_close_friend_victim:this.acc_close_friend_victim,
   acc_age:this.acc_age,
   acc_gender:this.acc_gender,
   acc_suffered_injuries:this.acc_suffered_injuries,
   acc_discharged_duties:this.acc_discharged_duties,
   acc_prosecuted:this.acc_prosecuted,
   acc_other_information:this.acc_other_information,
   deri_fled_mvact:this.deri_fled_mvact,
 
   acc_apaent_contributing_cir:this.acc_apaent_contributing_cir.join(),
   acc_aggressive_driving:this.acc_aggressive_driving.join(),
   acc_irresponsible_behaviour:this.acc_irresponsible_behaviour.join(),

   acc_visited_victim_hospital:this.acc_visited_victim_hospital,
   victim_id:this.vname.id,
   id_slsa:"233",

     }
     console.log("--------------",postData);
//return false;
     this.api.darsave("slsaaccused",postData).subscribe((rec: any) => {
  
      //alert(rec.Message);
      alert("sucess");
      this.modalctrl.dismiss();
      });
     
     console.log("--------------",postData);







  }

  loadvehicledetail(event:any){
    let postDate = {
                        mode: "loadvictimsbyvehicle",
                        accid:this.accid,
                        vehicleid:event.target.value
                  }
console.log('working v' ,postDate)
   this.api.post("datas", postDate).subscribe((rec: any) => {
                      this.victim=rec.victims;
   });

      }
      loadvictimdetails(event:any){
        console.log("------>",event.target.value);
  
                    if(event.target.value.injury_severity=='1')
                    {
                      this.flag=1;
                    }
                    else
                    {
                      this.flag=2;
                    }
        }
}
