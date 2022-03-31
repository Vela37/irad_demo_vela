import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../services/api.service";
import { model_vechile } from "../../../models/model.vechile";
@Component({
  selector: "app-detailservice",
  templateUrl: "./detailservice.component.html",
  styleUrls: ["./detailservice.component.scss"],
})
export class DetailserviceComponent implements OnInit {
 
  segment:any='vahan';
  veh_regno:any=null; vahan:any=null;
  licence_number:any=null; sarathi:any=null;
  userinput:any=null; userdetails:any=null;
  
  

  constructor(private modalctrl: ModalController, private api: ApiService) {}

 
  ngOnInit() {}

  public getVahanDetails() {

    let postDate={
      regno:this.veh_regno,
    }
    this.api.post('services/vahan1',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data!=false){
        this.vahan=data;
      }
    });
  
  }

  public getSarathiDetails() { // TN3020120004688

    let postDate={
      licencenumber:this.licence_number,
    }
    this.api.post('services/sarathi1',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data!=false){
        this.sarathi=data;
      }
    });
 
  }

  public getuserDetails() { // TN3020120004688

    let postDate={
      mode:'userSearch',
      userinput:this.userinput,
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data!=false){
        this.userdetails=data;
      }
    });
 
  }


  closeModal() {
    this.modalctrl.dismiss();
  }


  

 
}
