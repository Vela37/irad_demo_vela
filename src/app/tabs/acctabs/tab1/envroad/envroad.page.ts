import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiService } from "../../../../services/api.service";
import { Router } from "@angular/router";
import { TranslateConfigService } from "../../../../translate-config.service";
import { AlertController } from "@ionic/angular";

import { mod_road } from "../../../../models/model.road";
import { IonicSelectableComponent } from "ionic-selectable";
import { Subscription } from "rxjs";

@Component({
  selector: "app-envroad",
  templateUrl: "./envroad.page.html",
  styleUrls: ["./envroad.page.scss"],
})
export class EnvroadPage implements OnInit {
  public road_model: mod_road;
  ports: any = [];
  portsSubscription: Subscription;

  isSubmitted = false;
  selectedLanguage: string;
  params: any;
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  options5: any;
  options6: any;
  options7: any;
  options8: any;
  options9: any;
  datacombo = true;
  topo = false;
  options10: any;
  options11: any;

  options12: any;
  options13: any;
  options14: any;
  options15: any;

  options16: any;
  options17: any;
  options18: any;
  options19: any;
  options20: any;

  options21: any;
  options22: any;

  options24: any;

  options25: any;

  options26: any;
  options27: any;

  options5r = [];
  options5u = [];

  lengthd: any;

  checkdvalue: any = false;

  age: number;

  hor = true;
  ver = true;

  isLoading = false;
  vechile_count: number = 0;
  updated_count: number = 0;
  remaing_count: number = 0;
  dataset = { mode: "", accid: "", vechile: "" };

  roadformFG: FormGroup;
  road1 = true;
  road2 = false;
  road3 = false;
  all: any;
  roadgroupeincrement: number = 1;
  chk: number;
  decchk: number;
  prvbutton = false;
  nxtbutton = true;
  postdata2 = { mode: "", language: "" };

  validaccid: boolean = true;
  selacc: any;
  accid: any;
  ln: any;
  loc_rdsh: boolean = false;
 
  // remedial:any=[];

  constructor(
    private alertCtrl: AlertController,
    private translateConfigService: TranslateConfigService,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.roadform();

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem("ln");
    this.roadformFG.controls["accid"].setValue(this.accid);
    if (this.accid != null) {
      this.validaccid = false;
    }
    this.checkroadinformation();
  }

  // filterPorts(ports: Port[], text: string) {
  //   return ports.filter(port => {
  //     return port.name.toLowerCase().indexOf(text) !== -1 ||
  //       //port.country.name.toLowerCase().indexOf(text) !== -1 ||
  //       port.id.toString().toLowerCase().indexOf(text) !== -1;
  //   });
  // }

  // searchPorts(event: {
  //   component: IonicSelectableComponent,
  //   text: string
  // }) {
  //   let text = event.text.trim().toLowerCase();
  //   event.component.startSearch();

  //   // Close any running subscription.
  //   if (this.portsSubscription) {
  //     this.portsSubscription.unsubscribe();
  //   }

  //   if (!text) {
  //     // Close any running subscription.
  //     if (this.portsSubscription) {
  //       this.portsSubscription.unsubscribe();
  //     }

  //     event.component.items = [];
  //     event.component.endSearch();
  //     return;
  //   }

  //   this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
  //     // Subscription will be closed when unsubscribed manually.
  //     if (this.portsSubscription.closed) {
  //       return;
  //     }
  //     console.log("----------<<>><<------- ",this.options12);
  //     console.log("----------<<<<------- ",ports);
  //     console.log("----------<<<<------- ",text);
  //     event.component.items = this.filterPorts(this.options12, text);
  //     console.log( event.component.items);
  //     event.component.endSearch();
  //   });
  // }

  ngOnInit() {
    this.loadselection();
    //this.ports = this.portService.getPorts();
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }

  ionViewDidEnter() {
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem("ln");
  }

  rdshChange() {
    this.loc_rdsh = !this.loc_rdsh;
  }

  public loadselection() {
    this.postdata2.mode = "envroad";
    this.postdata2.language = this.ln;
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        this.datacombo = false;
        this.options1 = success.junction;
        this.options2 = success.control;
        // this.options3=success.weather;
        // this.options4=success.roadlight;
        this.options5 = success.roadtype;
        this.options6 = success.pedes;
        this.options7 = success.roadfea;
        //this.options8=success.accspot;
        this.options9 = success.hori;
        this.options10 = success.vert;
        this.options11 = success.scondtion;
        this.options12 = success.roadconstruct;
        this.options13 = success.gradient;
        this.options14 = success.remedial;
        this.options15 = success.classfication;

        this.options16 = success.roadmarkings;
        this.options17 = success.sight_distance;
        this.options18 = success.roadaccidentlocations;
        this.options19 = success.roadsignboard;
        this.options20 = success.speedlimit;
        this.options21 = success.roadmargin;
        this.options22 = success.roadtopography;

        this.options24 = [
          {
            id: "1",
            name: "Single Lane (1 Way)",
          },
          {
            id: "2",
            name: "Single Lane (2 Way)",
          },
          {
            id: "3",
            name: "Immediate Lane",
          },
          {
            id: "4",
            name: "2 Lane (1 Way)",
          },
          {
            id: "5",
            name: "2 Lane (2 Way)",
          },
          {
            id: "6",
            name: "3 Lane (1 Way)",
          },
          {
            id: "7",
            name: "3 Lane (2 Way)",
          },
          {
            id: "8",
            name: "4 Lane Undivided (2 Way)",
          },
          {
            id: "9",
            name: "4 Lane Divided (2 way)",
          },
          {
            id: "10",
            name: "6 Lane Undivided (2 way)",
          },
          {
            id: "11",
            name: "6 Lane Divided (2 way)",
          },
          {
            id: "12",
            name: "8 Lane Divided (2 way)",
          },
        ];

        this.options27 = [
          {
            id: "1",
            name: "National Highway under NHAI",
          },
          {
            id: "2",
            name: "National Highway under State PWD",
          },
          {
            id: "3",
            name: "National Highway under other departments",
          },
          {
            id: "4",
            name: "State Highway",
          },
          {
            id: "5",
            name: "Corporation Road",
          },
          {
            id: "6",
            name: "Municipality Road",
          },
          {
            id: "7",
            name: "Panchayat Union Road",
          },
          {
            id: "8",
            name: "Panchayat Road",
          }
        ];

        this.options25 = success.geometricFactors;
        this.options26 = success.roadMedian;

        //console.log(">>>>>>>>>>>>> => 0", this.options5);
        this.options14.forEach((item: any) => {
          this.ports.push(item);
        });

        this.options5.forEach((item: any) => {
          // console.log(">>>>>>>>>>>>> => 0", item.id);
          if (
            item.id == 2 ||
            item.id == 3 ||
            item.id == 6 ||
            item.id == 7 ||
            item.id == 9 ||
            item.id == 1
          ) {
            this.options5r.push({
              id: item.id,
              name: item.name,
            });
          }

          if (
            item.id == 1 ||
            item.id == 11 ||
            item.id == 12 ||
            item.id == 13 ||
            item.id == 10
          ) {
            this.options5u.push({
              id: item.id,
              name: item.name,
            });
          }
        });
        // console.log(">>>>>>>>>>>>> ==> 2", this.options5rsu);
        // console.log(">>>>>>>>>>>>> ==> 1", this.options5u);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async presentAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: "iRAD",
      subHeader: "Road Details",
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  public selection(postdata2: any) {
    return this.api.post("datas", postdata2);
  }
  public topologychange(event: any) {
    if (event.target.value == "1") {
      this.topo = true;
    } else {
      this.topo = false;
    }
  }

  public Location(event: any) {
    if (event.target.value == "1" || event.target.value == "5") {
      this.roadformFG.controls["vertical_curve"].reset();
      this.roadformFG.controls["horizontal_curve"].reset();
      this.roadformFG.controls["road_width_curve"].reset();
    } else if (event.target.value == "2") {
      this.roadformFG.controls["vertical_curve"].reset();
      this.roadformFG.controls["junction_type"].reset();
      this.roadformFG.controls["junction_control"].reset();
    } else if (event.target.value == "3") {
      this.roadformFG.controls["horizontal_curve"].reset();
      this.roadformFG.controls["junction_type"].reset();
      this.roadformFG.controls["junction_control"].reset();
    } else if (event.target.value == "4") {
      this.roadformFG.controls["vertical_curve"].reset();
      this.roadformFG.controls["horizontal_curve"].reset();
      this.roadformFG.controls["junction_type"].reset();
      this.roadformFG.controls["junction_control"].reset();
      this.roadformFG.controls["road_width_curve"].reset();
    }
  }

  public RoadClassification(event: any) {
    if (event.target.value == "rural" || event.target.value == "suburban") {
      this.checkdvalue = true;
    } else if (event.target.value == "urban") {
      this.checkdvalue = true;
    }
  }

  public Shoulder(event: any) {
    if (event.target.value != "1") {
      this.roadformFG.controls["road_shoulder_type"].reset();
    }
  }

  // public spacecheck(event: any) {
  //   let valdata = event.target.value;
  //   if(valdata.length == 0){
  //     this.lengthd = 1;
  //   }

  // }

  public changefeature(event: any) {
    if (event.target.value == "v") {
      this.hor = true;
      this.ver = false;
    } else {
      this.ver = true;
      this.hor = false;
    }
  }

  public checkroadinformation() {
    // alert(this.accid);
    this.dataset.mode = "road";
    this.dataset.accid = this.accid;

    this.getroad(this.dataset).subscribe(
      (success: any) => {
        if (success.updated != 0) {
          this.validaccid = true;
        }
      },
      (error) => {}
    );
  }
  public getroad(dataset: any) {
    return this.api.post("pending", dataset);
  }

  roadform() {
    //"/^[a-zA-Z0-9]*$/"

    this.roadformFG = this.fb.group({
      road_classification: ["", [Validators.required]],
      //rdsh: [],
      //rdshtype: [""],
      accid: [""],
      road_name: ["", [Validators.required]],
      road_number: [""],
      road_chainage: [""],
      // ctl_roadchainage_metre: [""],
      road_name1: [""],
      ctl_features: [""],
      speed_limit: ["", [Validators.required]],
      type_carriageway: ["", [Validators.required]],
      junction_type: [""],
      junction_control: [""],
      onoing_road_work: ["", [Validators.required]],
      // ctl_trafficemovement: ["", [Validators.required]],
      area_type: ["", [Validators.required]],
      // roadsurfacetype:['',[Validators.required]],
      pedestrian_infrastructure: [""],
      physical_divider: [""],
      type_road: ["", [Validators.required]],
      surface_condition: ["", [Validators.required]],
      type_structure: ["", [Validators.required]],
      type_terrain: ["", [Validators.required]],
      type_surface_gradient: [""],
      vertical_curve: [""],
      road_width_curve: ["", [Validators.maxLength(7)]],
      geometric_factors: ["", [Validators.required]],
      road_median: [""],
      remedial_measures: [""],
      horizontal_curve: [""], 
      road_markings: [""],
      road_sign_board: [""],
      accident_locations: ["", [Validators.required]],
      surface_type: ["", [Validators.required]],
      sight_distance: ["", [Validators.required]],
      road_margins: ["", [Validators.required]],
      road_width: ["", [Validators.required]],
      road_shoulder_type: [""],
    });
  }
  get errorControl() {
    return this.roadformFG.controls;
  }

  checkdigit($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value); // returns 0

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {
        value = value.slice(0, 3);
      }
      if (this.age > 999) {
        value = value.slice(0, 2);
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, "");
    }
  }
  previousbtn() {
    //this.sd.tgroupeincrement=this.sd.tgroupeincrement-1;
    this.chk = this.roadgroupeincrement;
    if (this.chk >= 1 && this.chk <= 2) {
      this.roadgroupeincrement = --this.roadgroupeincrement;
      this.decchk = this.roadgroupeincrement;

      if (this.decchk == 1) {
        this.road1 = true;
        this.road2 = false;
        this.prvbutton = false;
        this.nxtbutton = true;
      } else if (this.decchk == 2) {
        this.road1 = false;
        this.road2 = true;
        this.prvbutton = true;
        this.nxtbutton = true;
      }
    } else {
      this.prvbutton = false;
    }
  }
  nextbtn() {
    this.chk = this.roadgroupeincrement;
    if (this.chk >= 1 && this.chk <= 2) {
      this.roadgroupeincrement = ++this.roadgroupeincrement;
      this.decchk = this.roadgroupeincrement;

      if (this.decchk == 1) {
        this.road1 = true;
        this.road2 = false;

        this.prvbutton = true;
      } else if (this.decchk == 2) {
        this.road1 = false;
        this.road2 = true;

        this.prvbutton = true;
        this.nxtbutton = false;
      } else if (this.decchk == 3) {
      }
    } else {
      this.prvbutton = true;
      this.nxtbutton = false;
    }
  }

  public addroad() {
    this.isSubmitted = true;
    if (!this.roadformFG.valid) {
      //   alert("validation failed");
      console.log("Please provide all the required values!");
      return false;
    } else {
      let lengthroad1 = this.roadformFG.controls["road_name1"].value;
      this.road_model = new mod_road();

      this.road_model.accid = this.accid;

      // let dval = this.roadformFG.controls["croad_name1"].value;
      this.road_model.road_classification =
        this.roadformFG.controls["road_classification"].value;
      //  console.log("------->!!!!!!!<--------",lengthroad1.length);
      if (lengthroad1.length == 0) {
        this.road_model.road_name = this.roadformFG.controls["road_name"].value;
      } else {
        this.road_model.road_name =
          this.roadformFG.controls["road_name"].value +
          " - " +
          this.roadformFG.controls["road_name1"].value;
      }

      this.road_model.road_number =
        this.roadformFG.controls["road_number"].value;
      this.road_model.road_chainage =
        this.roadformFG.controls["road_chainage"].value;
      // this.road_model.ctl_roadchainage_metre =
      //   this.roadformFG.controls["ctl_roadchainage_metre"].value;
      // this.road_model.ctl_features = this.roadformFG.controls["ctl_features"].value;
      this.road_model.speed_limit =
        this.roadformFG.controls["speed_limit"].value;
      this.road_model.type_carriageway =
        this.roadformFG.controls["type_carriageway"].value;
      this.road_model.junction_control =
        this.roadformFG.controls["junction_control"].value;
      this.road_model.onoing_road_work =
        this.roadformFG.controls["onoing_road_work"].value;
      // this.road_model.ctl_trafficemovement =
      //   this.roadformFG.controls["ctl_trafficemovement"].value;
      this.road_model.junction_type =
        this.roadformFG.controls["junction_type"].value;
      //this.road_model.roadlight=this.roadformFG.controls['roadlight'].value;
      //this.road_model.ctl_visibility=this.roadformFG.controls['ctl_visibility'].value;
      this.road_model.area_type = this.roadformFG.controls["area_type"].value;
      this.road_model.surface_type =
        this.roadformFG.controls["surface_type"].value;
      //this.road_model.roadsurfacetype=this.roadformFG.controls['roadsurfacetype'].value; // paved unpaved
      this.road_model.pedestrian_infrastructure =
        this.roadformFG.controls["pedestrian_infrastructure"].value;
      this.road_model.physical_divider =
        this.roadformFG.controls["physical_divider"].value;
      this.road_model.type_road = this.roadformFG.controls["type_road"].value;
      this.road_model.surface_condition =
        this.roadformFG.controls["surface_condition"].value;
      this.road_model.type_structure =
        this.roadformFG.controls["type_structure"].value;
      this.road_model.vertical_curve =
        this.roadformFG.controls["vertical_curve"].value;
      this.road_model.horizontal_curve =
        this.roadformFG.controls["horizontal_curve"].value;

      this.road_model.type_terrain =
        this.roadformFG.controls["type_terrain"].value;
      this.road_model.type_surface_gradient =
        this.roadformFG.controls["type_surface_gradient"].value;

      this.road_model.road_markings =
        this.roadformFG.controls["road_markings"].value;

      this.road_model.road_sign_board =
        this.roadformFG.controls["road_sign_board"].value;
      this.road_model.accident_locations =
        this.roadformFG.controls["accident_locations"].value;
      this.road_model.sight_distance =
        this.roadformFG.controls["sight_distance"].value;

      this.road_model.road_margins =
        this.roadformFG.controls["road_margins"].value;
      this.road_model.road_width = this.roadformFG.controls["road_width"].value;

      this.road_model.road_shoulder_type =
        this.roadformFG.controls["road_shoulder_type"].value;
      this.road_model.language = this.ln;

      this.road_model.road_width_curve =
        this.roadformFG.controls["road_width_curve"].value;
      this.road_model.geometric_factors =
        this.roadformFG.controls["geometric_factors"].value;
        this.road_model.road_median =
        this.roadformFG.controls["road_median"].value;

      // console.log(
      //   "<<-------->> <<>> <<-------------!!!!! == ",
      //   this.roadformFG.controls["remedial_measures"].value
      // );
      let remedialm = [];
      if (this.roadformFG.controls["remedial_measures"].value == "") {
        this.road_model.remedial_measures =
          this.roadformFG.controls["remedial_measures"].value;
      } else {
        let temparray = this.roadformFG.controls["remedial_measures"].value;
        for (let i = 0; i < temparray.length; i++) {
          remedialm[i] = temparray[i].id;
        }
      }

      this.road_model.remedial_measures = remedialm.join(",").split(",");
      // console.log("^^@@ -------------> ",this.road_model.remedial_measures);

      // console.log(this.road_model);

      this.isLoading = true;
      this.all = this.roadformFG.value;
      this.adddetails(this.road_model).subscribe(
        (success: any) => {
          // alert(success.error);
          this.presentAlert(success.error);
          this.router.navigate(["/acctabs/tab1"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  public adddetails(postData: any) {
    return this.api.post("roaddetails", postData);
  }
}
