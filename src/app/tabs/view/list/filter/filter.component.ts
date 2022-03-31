import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../../services/api.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  @Input() selection: any;
  segment: string = "filter";
  postdata4 = { mode: "", language: "", state: "", district: "" };
  fld_state: any;
  fld_district: any;
  fld_station: any;
  state: any;
  district: any;
  dev: boolean = false;
  station: any;
  ln: any;
  severity = [
    { id: 1, title: "Fatal" },
    { id: 2, title: "Grievous" },
    { id: 3, title: "Simple Injury Hospitalized" },
    { id: 4, title: "Simple Injury Non Hospitalized" },
    { id: 5, title: "No Injury" },
  ];

  orderby = [
    { id: 'accident_id', title: "Accident Id" },
    { id: 'accident_date_time', title: "Accident Date" },
    { id: 'severity', title: "Severity" },
    { id: 'fir_number', title: "FIR No" },
  ];

  selseg: any = "filter";
  acclegend: any; today: String = new Date().toISOString();
  constructor(private modalctrl: ModalController, private api: ApiService) { }

  ngOnInit() {

    

    this.loadstate();
    console.log("ngOnInit-selection", this.selection);

    
    this.dev = localStorage.getItem("dev") === "true";
  }

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
    this.selseg = ev.detail.value;
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  save() {
    console.log("save - selection", this.selection);
    this.modalctrl.dismiss(this.selection);
  }
  public loadstate() {
    this.state = null;
    this.postdata4.mode = "loadStates";
    this.postdata4.language = this.ln;
    this.load(this.postdata4).subscribe(
      (success: any) => {
        this.state = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public loaddistrict() {
    // this.state=null;
    this.postdata4.mode = "loadDistricts";
    this.postdata4.state = this.fld_state;
    this.postdata4.language = this.ln;
    this.load(this.postdata4).subscribe(
      (success: any) => {
        this.district = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public loadpolice() {
    // this.state=null;
    this.postdata4.mode = "loadStations";
    this.postdata4.state = this.fld_state;
    this.postdata4.district = this.fld_district;
    this.postdata4.language = this.ln;
    this.load(this.postdata4).subscribe(
      (success: any) => {
        this.station = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public load(postdata4: any) {
    return this.api.post("selection.php", postdata4);
  }

  clear() {
    this.selection = { severity: "", dar:"", state: "", district: "", station: "", year: "" ,fromdate:'',todate:'',orderby:'',ordertype:'desc' };
    //this.selection.severity = "";
  }
}
