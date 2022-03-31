import { Component, Input, OnInit } from "@angular/core";
import { model_roadinfo } from "../../../../models/model_roadinfo";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../../services/api.service";
import { TranslateConfigService } from "../../../../translate-config.service";

@Component({
  selector: "app-road",
  templateUrl: "./road.component.html",
  styleUrls: ["./road.component.scss"],
})
export class RoadComponent implements OnInit {
  @Input() roadinfo: any;
  postdata2 = { mode: "", language: "" };

  ports: any = [];

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

  options5r = [];
  options5u = [];

  splitted: any;

  road_name1: any;

  lengthd: any;
  checkdvalue: any = false;
  changeval: any;

  ln: any;
  selectedLanguage: string;
  params: any;
  hor = true;
  ver = true;
  selacc: any;
  accid: any;
  isSubmitted = false;
  loc_rdsh: boolean = false;
  ongoing: any;
  options27: any;

  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem("ln");
  }

  ngOnInit() {

    console.log("edit pedinfo", this.roadinfo);
    this.loadselection();
    if (this.roadinfo.onoing_road_work == true) {
      this.ongoing = "yes";
    } else {
      this.ongoing = "no";
    }
  }
  ionViewDidEnter() {
    let str = this.roadinfo.geometric_factors;
    if (str != undefined) this.roadinfo.geometric_factors = str.split(",");
     let str1 = this.roadinfo.remedial_measures;
    if (str1 != undefined) this.roadinfo.remedial_measures = str1.split(",");
    

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
        this.options5 = success.roadtype;
        this.options6 = success.pedes;
        this.options7 = success.roadfea;
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
            name: "3  Lane (1 Way)",
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
          },
        ];

        this.options25 = success.geometricFactors;
        this.options26 = success.roadMedian;

        this.options14.forEach((item: any) => {
          this.ports.push(item);
        });

        this.options5.forEach((item: any) => {
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
        this.splitted = this.roadinfo.road_name.toString().split(" - ");
        this.roadinfo.road_name = this.splitted[0];
        this.road_name1 = this.splitted[1];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {
    return this.api.post("datas", postdata2);
  }

  public changefeature(event: any) {
    if (event.target.value == "v") {
      this.hor = true;
      this.ver = false;
    } else {
      this.ver = true;
      this.hor = false;
    }
  }

  public Location(event: any) {
    if (event.target.value == "1"|| event.target.value == "5") {
      this.roadinfo.vertical_curve = "";
      this.roadinfo.horizontal_curve = "";
    } else if (event.target.value == "2") {
      this.roadinfo.vertical_curve = "";
      this.roadinfo.junction_type = "";
      this.roadinfo.junction_control = "";
    } else if (event.target.value == "3") {
      this.roadinfo.horizontal_curve = "";
      this.roadinfo.junction_type = "";
      this.roadinfo.junction_control = "";
    } else if (event.target.value == "4") {
      this.roadinfo.vertical_curve = "";
      this.roadinfo.horizontal_curve = "";
      this.roadinfo.junction_type = "";
      this.roadinfo.junction_control = "";
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
      //this.roadinfo.road_shoulder_type = "";
    }
  }

  cancelmodal() {
    this.modalctrl.dismiss();
  }

  closeModal() {
    this.modalctrl.dismiss();
  }

  onChangeOngoing(event: any) {
    console.log(event.target.value);
    if (event.target.value == "yes") {
      this.roadinfo.onoing_road_work = "true";
    } else {
      this.roadinfo.onoing_road_work = "false";
    }
    console.log(this.roadinfo.onoing_road_work);
  }

  saveModal() {
    this.updateGeninfo();
  }

  updateGeninfo() {
    if (this.road_name1.length != 0) {
      this.changeval = this.roadinfo.road_name + " - " + this.road_name1;
      this.roadinfo.road_name = this.changeval;
    }
    let postDate = {
      mode: "roaddetilas",
      roadinfo: this.roadinfo,
    };
    this.api.post("update", postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log("updated");
        this.modalctrl.dismiss(true);
      }
    });
  }
}
