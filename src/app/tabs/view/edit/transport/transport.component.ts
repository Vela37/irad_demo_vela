import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AlertController, ModalController } from "@ionic/angular";

import { TranslateConfigService } from "../../../../translate-config.service";

@Component({
  selector: "app-transport",
  templateUrl: "./transport.component.html",
  styleUrls: ["./transport.component.scss"],
})
export class TransportComponent implements OnInit {
  @Input() transportinfo: any; mindate:any; maxdate:any;
  vehicle = new Array();
  isLoading = false;
  isSubmitted = false;
  datacombo = true;
  postdata3 = { mode: "", language: "" };
  postdata4 = { mode: "", language: "", btype: "" };

  options1: any;
  options2: any;
  options3: any;
  options4: any;
  options5: any;
  options6: any;
  options7: any;
  options8: any;
  options9: any;
  options10: any;
  options11: any;
  options12: any;
  options13: any;
  options14: any;
  options15: any;
  options16: any;
  options17: any;

  ln: any;
  mechflag = true;
  selacc: any;
  accid: any;
  tradeflag = true;
  validityflag = true;
  permitflag = true;
  selectedLanguage: string;
  params: any;

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private modalctrl: ModalController,
    private translateConfigService: TranslateConfigService
  ) {
  console.log("---------------------------");
//  console.log(this.transportinfo.vehicle_bullbars);
  
  console.log("---------------------------");
  
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem("ln");
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit() {
    console.log("TRANSPORT DATA", this.transportinfo);
    this.loadallvehicle();
    this.loadselection();
    this.loadcondtionofbrake();
    this.showsteeringcond();
  }

  public showsteeringcond() {
    this.options14 = null;
    this.postdata4.mode = "condtionofsteering";
    this.postdata4.btype = this.transportinfo.streeringtype;
    this.postdata4.language = this.ln;
    this.condtionofbrake(this.postdata4).subscribe(
      (success: any) => {
        this.options14 = success.condtion;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public condtionofbrake(postdata4: any) {
    return this.api.post("datas", postdata4);
  }

  public loadselection() {
    this.postdata3.mode = "transportdata";
    this.postdata3.language = this.ln;
    this.selection(this.postdata3).subscribe(
      (success: any) => {
        this.datacombo = false;
        this.options1 = success.tyrecondition;
        this.options2 = success.vehicledamagestatus;
        this.options3 = success.footbrake_fluidair_failure;

        this.options4 = success.footbrake_mechanical_failure;
        this.options5 = success.handbrakefailure;
        this.options6 = success.steeringtype;

        this.options7 = success.mechsteering;
        this.options8 = success.hydpowersteering;
        this.options9 = success.elepowsteering;
        this.options10 = success.vehicletype;
        this.options11 = success.vehicledefect;
        this.options12 = success.permitcategory;
        this.options13 = success.conditionofbreak;
        this.options14 = success.streeingcond;
        this.options15 = success.regnnumbertype;
        this.options16 = success.accidentdueto;
        this.options17 = success.braketypes;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public loadcondtionofbrake() {
    this.options13 = null;
    this.postdata4.mode = "condtionofbrake";
    this.postdata4.btype = this.transportinfo.cfhandbreak;
    this.postdata4.language = this.ln;
    this.condtionofbrake(this.postdata4).subscribe(
      (success: any) => {
        this.options13 = success.condtionofbrake;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public flagmech(event: any) {
    if (event.target.value == "yes") {
      this.mechflag = false;
    } else {
      this.mechflag = true;
    }
  }

  public selection(postdata3: any) {
    return this.api.post("datas", postdata3);
  }

  public flagpermit(event: any) {
    if (event.target.value == "1") {
      this.permitflag = false;
    } else {
      this.permitflag = true;
    }
  }

  public loadallvehicle() {
    let postDate = {
      mode: "listallvehicle",
      ln: this.selectedLanguage,
      accid: this.accid,
    };
    this.api.post("accupdate", postDate).subscribe((data: any) => {
      var tmp = data.vehiclelist;
      for (var i = 0; i < tmp.length; i++) {
        this.vehicle.push(Array(i, tmp[i][0], tmp[i][1]));
      }
      console.log(this.vehicle);
    });
  }

  public regchange(event: any) {
    if (event.target.value == "3") {
      this.tradeflag = false;
    } else {
      this.tradeflag = true;
    }

    if (event.target.value == "1") {
      this.validityflag = true;
    } else {
      this.validityflag = false;
    }
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  saveModal() {
    let reply = { transportinfo: this.transportinfo };
    console.log(this.transportinfo);

    this.updatePedestrian();

    // this.modalctrl.dismiss(reply);
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov};
    this.modalctrl.dismiss();
  }

  async updatePedestrian() {
   // console.log( this.transportinfo.breakseorn);
   // return false;
    //this.isLoading=true;
    let postDate = {
      mode: "transportinfo",
      pedinfo: this.transportinfo,
    };
    this.api.post("update", postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log("updated");

        this.modalctrl.dismiss(true);
      }
      // this.isLoading=false;
    });
  }

  async getplacoflocation(event: any) {
    var res = event.target.value;
    //alert(res);
    if (res == "others") {
      const alert = await this.alertCtrl.create({
        cssClass: "my-custom-class",
        header: "Place of Inspection",
        inputs: [
          {
            name: "name1",
            type: "text",
            placeholder: "Type Place of Inspection",
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              // console.log('Confirm Cancel');
              this.transportinfo.place_ins = res;
            },
          },
          {
            text: "Ok",
            handler: (alertData) => {
              //  console.log('Confirm Ok');
              console.log(alertData.name1);

              this.transportinfo.place_ins = alertData.name1;
            },
          },
        ],
      });

      await alert.present();
    } else {
    }
  }
// Raghul Change
  checkdigitsdamage($event: KeyboardEvent, cnt) {
    let value = (<HTMLInputElement>event.target).value;
    //console.log(value);

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value == "0") {
        value = value.slice(0, 0);
      }

      if (value.length > cnt) {
        value = value.slice(0, cnt);
      }
      (<HTMLInputElement>event.target).value = value;
    }
  }
}
