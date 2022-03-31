import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../../services/api.service";
import { TranslateConfigService } from "../../../../translate-config.service";
import { Router } from "@angular/router";
import { dismiss } from "@ionic/core/dist/types/utils/overlays";
// Send Parameter
import { NavController } from "@ionic/angular";
import { NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { UploadingdocumentComponent } from '../../reportsview/uploadingdocument/uploadingdocument.component';


@Component({
  selector: "app-reportrequirement",
  templateUrl: "./reportrequirement.component.html",
  styleUrls: ["./reportrequirement.component.scss"],
})
export class ReportrequirementComponent implements OnInit {
  @Input() flagId: any;
  @Input() report_or_not: any;

  accidentData = new Array();
  postdata = { mode: "", accid: "" };
  selectedLanguage: string;
  params: any;
  accid: any;
  selacc: any;
  ln: any;
  vehno = { vehlist: "" };
  details = { details_ref_id: "" };
  vehiclecombo = true;
  veh_ref_no: any;
  mode_name: any;
  vehicle: any;
  pedestriandata: any;
  pass: any[];
  report_details = {
    veh_no: "",
    veh_ref: "",
    veh_id: "",
  };
  reportId: any;

  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    private translateConfigService: TranslateConfigService,
    public navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.ln = localStorage.getItem("ln");

    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    console.log("AccId", this.selacc);
  }

  ngOnInit() {
    console.log("flagId", this.flagId);
    console.log("report_or_not", this.report_or_not);
    this.checkvechilecount();
  }

  goToReport() {
    if (this.report_or_not == 1) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          report_flag: JSON.stringify(this.flagId),
          report_details: JSON.stringify(this.report_details),
        },
      };

      console.log("Sending", navigationExtras);
      this.navCtrl.navigateForward(["reportsview"], navigationExtras);
    } else if (this.report_or_not == 2) {
      this.goToUploadDoc(this.flagId);
    }
    this.modalctrl.dismiss();
    //this.router.navigate(['/reportsview',this.veh_ref_no]);
  }

  async goToUploadDoc(flag) {
    console.log("Flag sending to report");
    this.modalctrl.dismiss();

    const modal = await this.modalctrl.create({
      component: UploadingdocumentComponent,
      componentProps: { flagId: flag },
    });
    modal.onWillDismiss().then((dataReturned) => { });
    return await modal.present().then((_) => { });
  }

  getParticularDetails(event: any) {
    console.log("Event 2 recieving", event.target.value);
    if (event.target.value == 1) {
      this.mode_name = "Passenger";
      this.getPassengers();
      console.log("Event 2  Passenger", this.mode_name);
    } else if (event.target.value == 2) {
      this.mode_name = "Pedestrian";
      this.getPedestrian();
      console.log("Event 2 Pedestrian", this.mode_name);
    }
  }

  checkvechilecount() {
    this.postdata.mode = 'dar_vehicle';
    this.postdata.accid = this.accid;
    this.api.post('datas', this.postdata).subscribe((data: any) => {
      this.vehiclecombo = false;
      this.accidentData = data.dar_vehicle;
    });
  }

  getDriverDetails(event: any) {

    console.log("Veh Details ", event.target.value);
    this.report_details.veh_id = event.target.value.id;
    this.report_details.veh_no = event.target.value.vehicle_reg_no;
    console.log("EVENT Assigned ", this.report_details);

  }

  setDetails(event: any) {
    console.log("Event recieving for Details", this.details.details_ref_id);
  }

  getPedestrian() {
    let postDate = {
      mode: "pedestrian",
      ln: this.selectedLanguage,
      id: this.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {
      console.log(data); //console.log('flag ',flag);
      // if(data.data==null){ console.log(' data is null'); return }

      this.pedestriandata = data.data; // console.log('vehicle data ',this.vehicle);
      this.pass = this.pedestriandata;
      // for (let i = 0; i < data.data.length; i++) {
      //   console.log("Pedestrian Name", this.pedestriandata[i].name);
      //   //this.vehicle[i].pedestrian = JSON.parse(this.vehicle[i].pedestrian);
      //   //this.pass.push(this.pedestriandata[i]);
      //   console.log("Pedestrian check---",this.pass);

      //   console.log("Pedestrian Details", this.pass);
      //   // this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
      // }
      console.log("vehicle data json ", this.pedestriandata);
    });
  }

  getPassengers() {
    let postDate = {
      mode: "vehicle",
      ln: this.selectedLanguage,
      id: this.accid,
    };
    this.api.post("accview", postDate).subscribe((data: any) => {
      console.log(data); //console.log('flag ',flag);
      // if(data.data==null){ console.log(' data is null'); return }

      this.vehicle = data.data; // console.log('vehicle data ',this.vehicle);

      for (let i = 0; i < data.data.length; i++) {
        this.vehicle[i].passengers = JSON.parse(this.vehicle[i].passengers);
        this.pass = this.vehicle[i].passengers;
        console.log("Passenger Details", this.pass);
        this.vehicle[i].driver = JSON.parse(this.vehicle[i].driver);
      }
      console.log("vehicle data json ", this.vehicle);
    });
  }

  public closeModal() {
    this.modalctrl.dismiss();
  }

  // checkvechilecount() {
  //   this.postdata.mode = "vechilelist";
  //   this.postdata.accid = this.accid;
  //   this.findremaining(this.postdata).subscribe(
  //     (success: any) => {
  //       var tmp = success.updated;
  //       for (var i = 0; i < tmp.length; i++) {
  //         // console.log(tmp[i]);
  //         this.accidentData.push(Array(i, tmp[i][0], tmp[i][1]));
  //         console.log("Vehicle No---" + tmp[i][0]);
  //         this.vehiclecombo = false;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // public findremaining(postdata: any) {
  //   return this.api.post("pending", postdata);
  // }
}
