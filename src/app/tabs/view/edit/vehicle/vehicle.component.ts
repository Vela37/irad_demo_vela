import { Component, Input, OnInit } from "@angular/core";
import { model_vehicleinfo } from "../../../../models/model_vehicleinfo";
import { ApiService } from "../../../../services/api.service";
import { AlertController, ModalController } from "@ionic/angular";
import { tick } from "@angular/core/testing";

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.component.html",
  styleUrls: ["./vehicle.component.scss"],
})
export class VehicleComponent implements OnInit {
  selectedLanguage: string;
  params: any;

  @Input() vehicleinfo: model_vehicleinfo;

  isSubmitted: boolean = false;

  vahanflag: boolean = false;
  saratiflag: boolean = false;
  validaccid: boolean = true;

  checked: boolean = false;
  disabledobj: boolean = false;
  datacombo = true;
  postdata3 = { mode: "", language: "" };
  postdata = { regno: "", accid: "" };
  vahanobj: any;
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
  chkedit = false;
  isEnabled = true;
  ln: any;

  postdata4 = { mode: "", vtype: "", language: "" };

  constructor(private api: ApiService, private modalctrl: ModalController) {
    this.ln = localStorage.getItem("ln");
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  ngOnInit() {
    this.loadcondtions();
    this.loadfullvehicletype();

    console.log("VEHICLEINFO", this.vehicleinfo);

    if (this.vehicleinfo.hitandrun != true) {
      this.vehicleinfo.hitandrun = false;
    }

    this.loadselection();
  }
  public loadcondtions() {
    //alert(this.vehicleinfo.fuel_type);

    this.options14 = null;
    this.postdata4.mode = "loadcondtions";
    this.postdata4.vtype = this.vehicleinfo.loadcategory;
    this.postdata4.language = this.ln;
    this.vtypes(this.postdata4).subscribe(
      (success: any) => {
        this.options14 = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public loadfullvehicletype(){
    // this.VechileDriverFG.controls['uservehiclesubtype'].setValue('0');
    // this.VechileDriverFG.controls['uservehicletype'].setValue('0');
    // this.options9=null;

    this.options8=null;
    this.postdata3.mode='fullvtypes';
    this.postdata3.language=this.ln;
    this.fullvtypes(this.postdata3).subscribe(
      (success:any) => {
        this.options8=success.data;
    },
      error => {
      console.log(error);
      } 
      );
   }
   public fullvtypes(postdata3:any){
    return this.api.post('datas',postdata3);
  }

  public loadselection() {
    //alert('call');
    this.postdata3.mode = "vehicledata";
    this.postdata3.language = this.ln;
    this.selection(this.postdata3).subscribe(
      (success: any) => {
        let vl = success;
        console.log("******",vl);
        this.datacombo = false;
        this.options1 = success.severity;
        this.options2 = success.nature;
        this.options3 = success.delay;
        this.options4 = success.modeoftranport;
        this.options5 = success.defect;
        this.options6 = success.man;
        this.options7 = success.damage;
        this.options11 = success.injurytype;
        this.options12 = success.occupation;
        this.options13 = success.regstatus;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public selection(postdata3: any) {
    return this.api.post("datas", postdata3);
  }

  public getsubtype(event: any) {
    //this.VechileDriverFG.controls['uservehiclesubtype'].setValue('0');

    this.options9 = null;
    this.postdata4.mode = "subtypes";
    this.postdata4.vtype = event.target.value;
    this.postdata4.language = this.ln;
    this.vtypes(this.postdata4).subscribe(
      (success: any) => {
        this.options9 = success.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public subtypes(postdata3: any) {
    return this.api.post("datas", postdata3);
  }

  public vtypes(postdata3: any) {
    return this.api.post("datas", postdata3);
  }

  public getvahanservice(postData) {
    return this.api.post("services/vahan1", postData);
  }
  public getvahan() {
    this.vahanflag = true;

    this.postdata.regno = this.vehicleinfo.vehicle_reg_no;
    console.log("this.postdata", this.postdata);

    this.getvahanservice(this.postdata).subscribe(
      (success: any) => {
        console.log("vahan", success);

        this.vahanobj = success;
        this.vehicleinfo.vehicle_reg_no = this.vahanobj.rc_regn_no;
        this.vehicleinfo.insurance_validity = this.vahanobj.rc_insurance_upto;
        this.vehicleinfo.insurance_policyno =
          this.vahanobj.rc_insurance_policy_no;
        this.vehicleinfo.vehicle_make = this.vahanobj.rc_maker_desc;
        this.vehicleinfo.vehicle_model = this.vahanobj.rc_maker_model;
        this.vehicleinfo.owneraddr = this.vahanobj.rc_permanent_address;

        this.vehicleinfo.rc_pucc_no = this.vahanobj.rc_pucc_no;
        this.vehicleinfo.rc_pucc_upto = this.vahanobj.rc_pucc_upto;
        this.vehicleinfo.rc_wheelbase = this.vahanobj.rc_wheelbase;
        this.vehicleinfo.rc_stand_cap = this.vahanobj.rc_stand_cap;
        this.vehicleinfo.rc_sleeper_cap = this.vahanobj.rc_sleeper_cap;
        this.vehicleinfo.rc_seat_cap = this.vahanobj.rc_seat_cap;
        this.vehicleinfo.rc_cubic_cap = this.vahanobj.rc_cubic_cap;
        this.vehicleinfo.rc_gvw = this.vahanobj.rc_gvw;
        this.vehicleinfo.rc_unld_wt = this.vahanobj.rc_unld_wt;
        this.vehicleinfo.rc_manu_month_yr = this.vahanobj.rc_manu_month_yr;
        this.vehicleinfo.rc_insurance_comp = this.vahanobj.rc_insurance_comp;

        this.vehicleinfo.rc_np_issued_by = this.vahanobj.rc_np_issued_by;
        this.vehicleinfo.rc_np_upto = this.vahanobj.rc_np_upto;
        this.vehicleinfo.rc_np_no = this.vahanobj.rc_np_no;
        this.vehicleinfo.rc_body_type_desc = this.vahanobj.rc_body_type_desc;
        this.vehicleinfo.rc_norms_desc = this.vahanobj.rc_norms_desc;
        this.vehicleinfo.rc_color = this.vahanobj.rc_color;
        this.vehicleinfo.rc_fuel_desc = this.vahanobj.rc_fuel_desc;
        this.vehicleinfo.rc_vch_catg = this.vahanobj.rc_vch_catg;
        this.vehicleinfo.rc_permanent_address =
          this.vahanobj.rc_permanent_address;
        this.vehicleinfo.rc_present_address = this.vahanobj.rc_present_address;
        this.vehicleinfo.rc_f_name = this.vahanobj.rc_f_name;
        this.vehicleinfo.rc_owner_sr = this.vahanobj.rc_owner_sr;
        this.vehicleinfo.service_ownername = this.vahanobj.rc_owner_name;
        
        if (this.vahanobj["stautsMessage"] == "OK") {
          this.vahanflag = false;
          //   this.chkedit=true;
          console.log("vahan success");
        } else {
          console.log("vahan failed");
          // this.vahandata=false;
          // this.loadfullvehicletype();
          // this.mod_vechileobj.vaahanflag='0';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onVehRegnoKeyUp(event) {
    let newValue = event.target.value;

    let regExp = new RegExp("^[A-Za-z0-9?]+$");

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }

    if (newValue.length > 10) {
      event.target.value = newValue.slice(0, 14);
    }
  }

  saveModal() {
    let reply = { vehicleinfo: this.vehicleinfo };
    let v1 = this.vehicleinfo;
    console.log("---------------------->", v1);

    this.updateVehicle();

    // this.modalctrl.dismiss(reply);
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov};
    this.modalctrl.dismiss();
  }

  async updateVehicle() {
    //this.isLoading=true;
    let postDate = {
      mode: "vehicle",
      vehicleinfo: this.vehicleinfo,
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
}
