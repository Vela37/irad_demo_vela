import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiService } from "../../../../services/api.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateConfigService } from "../../../../translate-config.service";
import { mod_transport } from "../../../../models/model.transport";
import { AlertController } from "@ionic/angular";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-transport",
  templateUrl: "./transport.page.html",
  styleUrls: ["./transport.page.scss"],
})
export class TransportPage implements OnInit {
  maxDate: any;
  minDate: any;
  todayDate: any;
  fivedaysbefore: any; mindate:any;maxdate:any;
  vahanobj: any;
  postdata = { regno: "", accid: "" };

  age: number;
  injtype = new Array();
  transport: FormGroup;
  selectedLanguage: string;
  params: string;
  vehicle = new Array();
  selacc: any;
  accid: any;
  data: any;
  year: any;
  useryear: any;
  yearflag = true;
  tradeflag = true;
  validityflag = true;
  transport1 = false;
  transport2 = true;
  transport3 = true;
  permitflag = true;
  mechflag = true;

  isLoading = false;
  isSubmitted = false;
  datacombo: false;
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
  public mod_vechileobj: mod_transport;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private api: ApiService,
    public fb: FormBuilder,
    private datePipe: DatePipe,
    private translateConfigService: TranslateConfigService
  ) {
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem("ln");
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.todayDate = new Date();
    // this.todayDate = new Date(this.todayDate.Date() + 1);
    this.fivedaysbefore = new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000));

    this.fivedaysbefore = this.datePipe.transform(this.fivedaysbefore, 'yyyy-MM-dd');
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
  }
  // this.todayDate=new Date();
  // this.todayDate = new Date(this.todayDate.Date() + 1);
  // this.fivedaysbefore = new Date(new Date().getTime()-(5*24*60*60*1000));

  // this.fivedaysbefore = this.datePipe.transform(this.fivedaysbefore, 'yyyy-MM-dd');
  // this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
  ngOnInit() {
    this.mod_vechileobj = new mod_transport();

    this.buildtransport();
    this.loadallvehicle();
    this.loadselection();
  }
  checkdigits($event: KeyboardEvent, cnt) {
    let value = (<HTMLInputElement>event.target).value;
    //console.log(value);

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > cnt) {
        value = value.slice(0, cnt)
      }
      (<HTMLInputElement>event.target).value = value;

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
  /// End

  ionViewDidEnter() {
    this.selacc = JSON.parse(localStorage.getItem("selacc"));
    this.accid = this.selacc.accid;
    //  this.ln=localStorage.getItem('ln');
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: "iRAD",
      //    subHeader: 'Passenger',
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
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
              this.mod_vechileobj.place_ins = res;
            },
          },
          {
            text: "Ok",
            handler: (alertData) => {
              //  console.log('Confirm Ok');
              console.log(alertData.name1);

              this.mod_vechileobj.place_ins = alertData.name1;
            },
          },
        ],
      });

      await alert.present();
    } else {
    }
  }
  checkmaxspeed($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value);       // returns 0


    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {

        value = value.slice(0, 3)

      }
      if (this.age > 400) {

        value = value.slice(0, 2)
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    }


  }
  public showmiddle() {
    this.transport1 = true;
    this.transport2 = false;
    this.transport3 = true;
  }
  public showlast() {
    this.transport1 = true;
    this.transport2 = true;
    this.transport3 = false;
  }
  public showbasic() {
    this.transport1 = false;
    this.transport2 = true;
    this.transport3 = true;
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

  public flagpermit(event: any) {
    if (event.target.value == "1") {
      this.permitflag = false;
    } else {
      this.permitflag = true;
    }
  }

  public getvahanservice(postData) {
    // return this.api.post("services/vahan_testdata", postData);
    return this.api.post("services/vahan1", postData);
    //  return this.api.post('https://irad.parivahan.gov.in/irad86/api_live7/sample/vahan1.php?regno=tn32aq2541',postData);
  }

  async presentAlertConfirm() {

    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Confirm!",
      message: "Do you want overwrite existing data?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            //  return false;
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Confirm Okay");
            this.getvahandata();
            //   return true;
          },
        },
      ],
    });

    await alert.present();
  
  }

  public getvahandata() {
    var res = this.transport.controls["vehicle_reg_no"].value.split("*");
    this.postdata.regno = res[1];
    this.getvahanservice(this.postdata).subscribe((success: any) => {
      this.vahanobj = success;
      //  console.log(this.vahanobj);
      if (this.vahanobj["stautsMessage"] == "OK") {
        this.transport.controls["ownername"].setValue(
          this.vahanobj["rc_owner_name"]
        );
        this.transport.controls["make"].setValue(
          this.vahanobj["rc_maker_model"]
        );
        this.transport.controls["makeclass"].setValue(
          this.vahanobj["rc_maker_desc"]
        );
        this.transport.controls["engineno"].setValue(
          this.vahanobj["rc_eng_no"]
        );
        this.transport.controls["chassisno"].setValue(
          this.vahanobj["rc_chasi_no"]
        );
        this.transport.controls["color"].setValue(this.vahanobj["rc_color"]);
        this.transport.controls["inscomname"].setValue(
          this.vahanobj["rc_insurance_comp"]
        );
        this.transport.controls["inscrtpolicyno"].setValue(
          this.vahanobj["rc_insurance_policy_no"]
        );
        this.transport.controls["inscrtvalidity"].setValue(
          this.vahanobj["rc_insurance_upto"]
        );
        this.transport.controls["tax"].setValue(this.vahanobj["rc_tax_upto"]);
        this.transport.controls["regloadenweg"].setValue(
          this.vahanobj["rc_unld_wt"]
        );
        this.transport.controls["seat_cap"].setValue(
          this.vahanobj["rc_seat_cap"]
        );
        this.transport.controls["fitcertval"].setValue(
          this.vahanobj["rc_fit_upto"]
        );
        this.transport.controls["vclass"].setValue(
          this.vahanobj["rc_vh_class_desc"]
        );
        this.transport.controls["yearofmanfac"].setValue(
          this.vahanobj["rc_manu_month_yr"]
        );
	 
     // convert user input value into date object
     var birthDate = new Date(this.vahanobj["rc_regn_dt"]);
     console.log(" birthDate"+ birthDate);
    
    // get difference from current date;
    var difference=Date.now() - birthDate.getTime(); 
       
    var  ageDate = new Date(difference); 
    var calculatedAge=   Math.abs(ageDate.getUTCFullYear() - 1970);
    //alert(calculatedAge);


    let vage=parseInt(new Date().getFullYear()+'') - parseInt(this.vahanobj["rc_regn_dt"].substr(this.vahanobj["rc_regn_dt"].length - 4));
   // let cyear =  new Date().getFullYear();
   // vage=cyear-vage; 
   console.log(vage, new Date().getFullYear()+'',''+this.vahanobj["rc_regn_dt"].substr(this.vahanobj["rc_regn_dt"].length - 4));
    this.transport.controls["vage"].setValue(
      vage
    );

    this.transport.controls["registration_date"].setValue(
      this.vahanobj["rc_regn_dt"]
    );
//        rc_regn_dt
        //   this.transport.controls["vtype"].setValue(this.vahanobj["rc_vch_catg"]);
        this.transport.controls["polctrlcertval"].setValue(
          this.vahanobj["rc_pucc_upto"]
        );
        this.transport.controls["permitvalidity"].setValue(
          this.vahanobj["rc_np_upto"] 
        );
        this.transport.controls["permitno"].setValue(
          this.vahanobj["rc_np_no"]
        );
        this.transport.controls["permitissuedby"].setValue(
          this.vahanobj["rc_np_issued_by"]
        );
        this.transport.controls["vowneraddr"].setValue(
          this.vahanobj["rc_present_address"]
        );

        this.mod_vechileobj.rc_unld_wt = this.vahanobj["rc_unld_wt"];
        this.mod_vechileobj.rc_gvw = this.vahanobj["rc_gvw"];
        this.mod_vechileobj.rc_no_cyl = this.vahanobj["rc_no_cyl"];
        this.mod_vechileobj.rc_cubic_cap = this.vahanobj["rc_cubic_cap"];
        this.mod_vechileobj.rc_seat_cap = this.vahanobj["rc_seat_cap"];
        this.mod_vechileobj.rc_stand_cap = this.vahanobj["rc_stand_cap"];
        this.mod_vechileobj.rc_sleeper_cap = this.vahanobj["rc_sleeper_cap"];
        this.mod_vechileobj.rc_wheelbase = this.vahanobj["rc_wheelbase"];
        this.mod_vechileobj.rc_fit_upto = this.vahanobj["rc_fit_upto"];
        this.mod_vechileobj.rc_tax_upto = this.vahanobj["rc_tax_upto"];
        this.mod_vechileobj.rc_np_no = this.vahanobj["rc_np_no"];
        this.mod_vechileobj.rc_np_upto = this.vahanobj["rc_np_upto"];
        this.mod_vechileobj.rc_np_issued_by = this.vahanobj["rc_np_issued_by"];
        this.mod_vechileobj.rc_financer = this.vahanobj["rc_financer"];
        this.mod_vechileobj.rc_permanent_address =
          this.vahanobj["rc_permanent_address"];
        this.mod_vechileobj.rc_present_address =
          this.vahanobj["rc_present_address"];
        this.mod_vechileobj.rc_body_type_desc =
          this.vahanobj["rc_body_type_desc"];
        this.mod_vechileobj.rc_owner_sr = this.vahanobj["rc_owner_sr"];
      }
    });
  }

  public flagmech(event: any) {
    if (event.target.value == "yes") {
      this.mechflag = false;
    } else {
      this.mechflag = true;
    }
  }
  /*
  public getplacoflocation(event:any){
    var res = event.target.value;
    //alert(res);
  if(res=='others')
  {
  //  alert("get input box");
    this.mod_vechileobj.place_ins='typing location';
  }
  else
  {
    this.mod_vechileobj.place_ins=res;

  }
  
}

*/
  public loadsteering(vtype) {
    //  alert(vtype);
    this.options14 = null;
    this.postdata4.mode = "loadsteering";
    this.postdata4.btype = vtype;
    this.postdata4.language = this.ln;
    this.condtionofbrake(this.postdata4).subscribe(
      (success: any) => {
        this.options6 = success.steeringtype;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public editvehicle(event: any) {

   // return false;

    // alert(this.transport.controls['vehicle_reg_no'].get);

    //let text = event.target.options[event.target.options.selectedIndex].text;
    //alert(text);
    //  alert(event.target.value);
    var res = event.target.value.split("*");

    // this.selecteduserid=event.target.value;
    //    this.mod_vechileobj.vregn_nr=event.target.value;

    let postDate = {
      mode: "singlevehicleload",
      ln: this.selectedLanguage,
      accid: this.accid,
      uid: res[0],
    };
    this.api.post("accupdate", postDate).subscribe((data: any) => {
      this.data = data.vehicle;
     // console.log(this.data.vehicle_type);
      this.loadsteering(this.data.vehicle_type);

     /*

      this.transport.controls["polctrlcertval"].setValue(
        this.data["rc_pucc_upto"]
      );
      
      this.transport.controls["registration_date"].setValue(this.data["registration_date"]);
      this.transport.controls["fitcertval"].setValue(this.data["rc_fit_upto"]);
      this.transport.controls["permitvalidity"].setValue(this.data["rc_np_no"]);
      this.transport.controls["permitno"].setValue(this.data["rc_np_upto"]);
      this.transport.controls["permitissuedby"].setValue(
        this.data["rc_np_issued_by"]
      );
      this.transport.controls["seat_cap"].setValue(this.data["rc_seat_cap"]);
      //  this.transport.controls['regcrtval'].setValue(this.data['rc_fit_upto']);
      this.transport.controls["tax"].setValue(this.data["rc_tax_upto"]);
      this.transport.controls["uloadenweight"].setValue(
        this.data["rc_unld_wt"]
      );
      this.transport.controls["vtype"].setValue(this.data["vehicle_type"]);
      this.transport.controls["vclass"].setValue(this.data["vehicle_class"]);
      this.transport.controls["ownername"].setValue(this.data["service_ownername"]);
      this.transport.controls["regcrtval"].setValue(this.data["regcrtval"]);
      this.transport.controls["vowneraddr"].setValue(this.data["owneraddr"]);
      this.transport.controls["make"].setValue(this.data["vehicle_make"]);
      this.transport.controls["makeclass"].setValue(this.data["vehicle_model"]);
      this.transport.controls["engineno"].setValue(this.data["engine_nr"]);
      this.transport.controls["chassisno"].setValue(this.data["chasis_number"]);
      this.transport.controls["color"].setValue(this.data["color"]);
      this.transport.controls["yearofmanfac"].setValue(this.data["rc_manu_month_yr"]);
      this.transport.controls["inscomname"].setValue(
        this.data["insurance_details"]
      );
      this.transport.controls["inscrtpolicyno"].setValue(
        this.data["insurance_policyno"]
      );
      this.transport.controls["inscrtvalidity"].setValue(
        this.data["insurance_validity"]
      );

      this.mod_vechileobj.rc_unld_wt = this.data["rc_unld_wt"];
      this.mod_vechileobj.rc_gvw = this.data["rc_gvw"];
      this.mod_vechileobj.rc_no_cyl = this.data["rc_no_cyl"];
      this.mod_vechileobj.rc_cubic_cap = this.data["rc_cubic_cap"];
      this.mod_vechileobj.rc_seat_cap = this.data["rc_seat_cap"];
      this.mod_vechileobj.rc_stand_cap = this.data["rc_stand_cap"];
      this.mod_vechileobj.rc_sleeper_cap = this.data["rc_sleeper_cap"];
      this.mod_vechileobj.rc_wheelbase = this.data["rc_wheelbase"];
      this.mod_vechileobj.rc_fit_upto = this.data["rc_fit_upto"];
      this.mod_vechileobj.rc_tax_upto = this.data["rc_tax_upto"];
      this.mod_vechileobj.rc_np_no = this.data["rc_np_no"];
      this.mod_vechileobj.rc_np_upto = this.data["rc_np_upto"];
      this.mod_vechileobj.rc_np_issued_by = this.data["rc_np_issued_by"];
      this.mod_vechileobj.rc_financer = this.data["rc_financer"];
      this.mod_vechileobj.rc_permanent_address =
        this.data["rc_permanent_address"];
      this.mod_vechileobj.rc_present_address = this.data["rc_present_address"];
      this.mod_vechileobj.rc_body_type_desc = this.data["rc_body_type_desc"];
*/
      //
    });
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.transport.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}
  public savedetails() {
    console.log(this.findInvalidControls());

    this.isSubmitted = true;
    if (!this.transport.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      this.isLoading = true;
      this.mod_vechileobj.accident_id = this.accid;
      var vehno = this.transport.controls["vehicle_reg_no"].value;
      var vehresult = vehno.split("*");

      this.mod_vechileobj.vehicle_reg_no = vehresult[0];
      this.mod_vechileobj.language = this.selectedLanguage;
      this.mod_vechileobj.regno_status = "known_hit run_not known";
      this.mod_vechileobj.regno_type =
        this.transport.controls["regno_type"].value;
      this.mod_vechileobj.temp_regno_validity =
        this.transport.controls["temp_regno_validity"].value;
      this.mod_vechileobj.f19_mileage =
        this.transport.controls["f19_mileage"].value;
      this.mod_vechileobj.f19_tp_purpose =
        this.transport.controls["f19_tp_purpose"].value;
      //  this.mod_vechileobj.f19_sno=this.transport.controls['f19_sno'].value;
      this.mod_vechileobj.f19_tp_dt =
        this.transport.controls["f19_tp_dt"].value;
      this.mod_vechileobj.vclass = this.transport.controls["vclass"].value;
      this.mod_vechileobj.vtype = this.transport.controls["vtype"].value;
      this.mod_vechileobj.vowneraddr =
        this.transport.controls["vowneraddr"].value;
      this.mod_vechileobj.vownername =
        this.transport.controls["ownername"].value;

      this.mod_vechileobj.make = this.transport.controls["make"].value;
      this.mod_vechileobj.makeclass =
        this.transport.controls["makeclass"].value;
      this.mod_vechileobj.yearofmanfac =
        this.transport.controls["yearofmanfac"].value;


        
      this.mod_vechileobj.vage = this.transport.controls["vage"].value;
      this.mod_vechileobj.engineno = this.transport.controls["engineno"].value;
      this.mod_vechileobj.chassisno =
        this.transport.controls["chassisno"].value;
      this.mod_vechileobj.color = this.transport.controls["color"].value;
      this.mod_vechileobj.seat_cap = this.transport.controls["seat_cap"].value;
      this.mod_vechileobj.max_speed =
        this.transport.controls["max_speed"].value;

      this.mod_vechileobj.uloadenweight =
        this.transport.controls["uloadenweight"].value;
      this.mod_vechileobj.vdescription =
        this.transport.controls["vdescription"].value;
      this.mod_vechileobj.permitcat =
        this.transport.controls["permitcat"].value;
      this.mod_vechileobj.permitno = this.transport.controls["permitno"].value;
      this.mod_vechileobj.permitissuedby =
        this.transport.controls["permitissuedby"].value;
      this.mod_vechileobj.permitvalidity =
        this.transport.controls["permitvalidity"].value;
      this.mod_vechileobj.fitcertstatus =
        this.transport.controls["fitcertstatus"].value;
      this.mod_vechileobj.fitcertval =
        this.transport.controls["fitcertval"].value;
      this.mod_vechileobj.regloadenweg =
        this.transport.controls["regloadenweg"].value;
      this.mod_vechileobj.regcrtval =
        this.transport.controls["regcrtval"].value;
      this.mod_vechileobj.polctrlcertval =
        this.transport.controls["polctrlcertval"].value;
      this.mod_vechileobj.inscomname =
        this.transport.controls["inscomname"].value;
      this.mod_vechileobj.inscrtpolicyno =
        this.transport.controls["inscrtpolicyno"].value;
      this.mod_vechileobj.tax = this.transport.controls["tax"].value;
      this.mod_vechileobj.inscrtvalidity =
        this.transport.controls["inscrtvalidity"].value;

      this.mod_vechileobj.effoffoodbreak =
        this.transport.controls["effoffoodbreak"].value;
      this.mod_vechileobj.effofhandbreak =
        this.transport.controls["effofhandbreak"].value;

        this.mod_vechileobj.breakseorn =
        this.transport.controls["breakseorn"].value;
        //new inspection date and driving licence sub vela
        this.mod_vechileobj.inspection_date = this.transport.controls["inspection_date"].value;
        this.mod_vechileobj.driving_license_submit_flag = this.transport.controls["driving_license_submit_flag"].value;
      this.mod_vechileobj.vlength = this.transport.controls["vlength"].value;
      this.mod_vechileobj.vwidth = this.transport.controls["vwidth"].value;
      this.mod_vechileobj.vheight = this.transport.controls["vheight"].value;
      //this.mod_vechileobj.heightofbtoe =
       // this.transport.controls["heightofbtoe"].value;


      //this.mod_vechileobj.place_ins=this.transport.controls['place_ins'].value;
      if (this.transport.controls["place_ins"].value != "others") {
        this.mod_vechileobj.place_ins =
          this.transport.controls["place_ins"].value;
      }
      //  this.mod_vechileobj.cffb_hydair=this.transport.controls['cffb_hydair'].value;
      this.mod_vechileobj.damge_sustained =
        this.transport.controls["damge_sustained"].value;
      this.mod_vechileobj.cause_of_acc =
        this.transport.controls["cause_of_acc"].value;
      this.mod_vechileobj.conditionofbreak =
        this.transport.controls["conditionofbreak"].value;
      this.mod_vechileobj.vdamagestat =
        this.transport.controls["vdamagestat"].value;
      this.mod_vechileobj.cffb_mech =
        this.transport.controls["cffb_mech"].value;
      this.mod_vechileobj.cfhandbreak =
        this.transport.controls["cfhandbreak"].value;
      this.mod_vechileobj.streeringtype =
        this.transport.controls["streeringtype"].value;
      this.mod_vechileobj.streeingcond =
        this.transport.controls["streeingcond"].value;
      this.mod_vechileobj.tyrecond = this.transport.controls["tyrecond"].value;
      this.mod_vechileobj.opif_vd_rd =
        this.transport.controls["opif_vd_rd"].value;
      this.mod_vechileobj.mech_fstat =
        this.transport.controls["mech_fstat"].value;

      this.mod_vechileobj.vdefecttype =
        this.transport.controls["vdefecttype"].value;
      this.mod_vechileobj.skidmark = this.transport.controls["skidmark"].value;
      // this.mod_vechileobj.skidleng = this.transport.controls["skidleng"].value;
      /*
      this.mod_vechileobj.trackmark =
        this.transport.controls["trackmark"].value;
        */
      this.mod_vechileobj.disposofv =
        this.transport.controls["disposofv"].value;
      this.mod_vechileobj.whechkrepiss =
        this.transport.controls["whechkrepiss"].value;
      this.mod_vechileobj.whecfxiss =
        this.transport.controls["whecfxiss"].value;
      this.mod_vechileobj.cfxno = this.transport.controls["cfxno"].value;
      this.mod_vechileobj.cfxdate = this.transport.controls["cfxdate"].value;
      this.mod_vechileobj.checkreportdate =
        this.transport.controls["checkreportdate"].value;

      this.mod_vechileobj.checkreportnr =
        this.transport.controls["checkreportnr"].value;
      this.mod_vechileobj.trade_plate_issuedby =
        this.transport.controls["trade_plate_issuedby"].value;

      this.mod_vechileobj.painttransfer =
        this.transport.controls["painttransfer"].value;
      this.mod_vechileobj.locationoftransfer =
        this.transport.controls["locationoftransfer"].value;
      this.mod_vechileobj.coloroftransfer =
        this.transport.controls["coloroftransfer"].value;
      this.mod_vechileobj.installingcng =
        this.transport.controls["installingcng"].value;
      /*
        this.mod_vechileobj.changeofvehiclebody =
        this.transport.controls["changeofvehiclebody"].value;
        */
      this.mod_vechileobj.hornfunctional =
        this.transport.controls["hornfunctional"].value;
      this.mod_vechileobj.lightsfuntional =
        this.transport.controls["lightsfuntional"].value;
      this.mod_vechileobj.faultynumberplate =
        this.transport.controls["faultynumberplate"].value;
      this.mod_vechileobj.airbags = this.transport.controls["airbags"].value;
      this.mod_vechileobj.airbagsfunctional =
        this.transport.controls["airbagsfunctional"].value;
      this.mod_vechileobj.airbagreasons =
        this.transport.controls["airbagreasons"].value;
      this.mod_vechileobj.tintedglass =
        this.transport.controls["tintedglass"].value;
      this.mod_vechileobj.educationalvehicle =
        this.transport.controls["educationalvehicle"].value;
      this.mod_vechileobj.psvinstalled =
        this.transport.controls["psvinstalled"].value;
      this.mod_vechileobj.psvfunctional =
        this.transport.controls["psvfunctional"].value;
      this.mod_vechileobj.parkingsensors =
        this.transport.controls["parkingsensors"].value;
      this.mod_vechileobj.sensorfunctional =
        this.transport.controls["sensorfunctional"].value;
      this.mod_vechileobj.vehicletracking =
        this.transport.controls["vehicletracking"].value;
      this.mod_vechileobj.vehicletrackingfunctional =
        this.transport.controls["vehicletrackingfunctional"].value;
     // 
      //Reghul Change
      this.mod_vechileobj.registration_date =
        this.transport.controls["registration_date"].value;
        this.mod_vechileobj.wheeltype =
        this.transport.controls["wheeltype"].value;
      this.mod_vechileobj.wiperstype =
        this.transport.controls["wiperstype"].value;
      this.mod_vechileobj.mirrorstype =
        this.transport.controls["mirrorstype"].value;
      this.mod_vechileobj.whethervmb =
        this.transport.controls["whethervmb"].value;
      this.mod_vechileobj.vehmodby = this.transport.controls["vehmodby"].value;
      this.mod_vechileobj.wrpsi = this.transport.controls["wrpsi"].value;
      this.mod_vechileobj.wfy = this.transport.controls["wfy"].value;
      this.mod_vechileobj.tofs = this.transport.controls["tofs"].value;
      this.mod_vechileobj.dodamages =
        this.transport.controls["dodamages"].value;
      /// End
      this.mod_vechileobj.device_fit = this.transport.controls["device_fit"].value;
      this.mod_vechileobj.vehicle_bullbars = this.transport.controls["vehicle_bullbars"].value;
      this.mod_vechileobj.vehicle_reflectivetapes = this.transport.controls["vehicle_reflectivetapes"].value;
      this.mod_vechileobj.vehicle_windscreen = this.transport.controls["vehicle_windscreen"].value;

      console.log(this.mod_vechileobj);
      // return false;

      this.updatevehicle(this.mod_vechileobj).subscribe(
        (success: any) => {
          this.presentAlert(success.msg);
          this.isLoading = false;
          if (success.error == '1') {


            this.router.navigate(["acctabs/tab1"]);
          }
        },
        (error) => { }
      );

      console.log(this.mod_vechileobj);
    }
  }

  public updatevehicle(postData: any) {
    return this.api.post("rto", postData);
  }

  get errorControl() {
    return this.transport.controls;
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
        this.vehicle.push(Array(i, tmp[i][0], tmp[i][1] + "*" + tmp[i][0]));
        // console.log(tmp[i][0]);
      }

      console.log("---udhaya----");
      console.log(this.vehicle);
      console.log("---suriyan----");
    });
  }

  public loadcondtionofbrake(event: any) {
    this.options13 = null;
    this.postdata4.mode = "condtionofbrake";
    this.postdata4.btype = event.target.value;
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

  public showsteeringcond(event: any) {
    this.options14 = null;
    this.postdata4.mode = "condtionofsteering";
    this.postdata4.btype = event.target.value;
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
        this.options1 = success.tyrecondition;
        this.options2 = success.vehicledamagestatus;
        this.options3 = success.footbrake_fluidair_failure;
        this.options4 = success.footbrake_mechanical_failure;
        this.options5 = success.handbrakefailure;
        //    this.options6 = success.steeringtype;
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

  public selection(postdata3: any) {
    return this.api.post("datas", postdata3);
  }

  checkage($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value); // returns 0

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {
        value = value.slice(0, 3);
      }
      if (this.age > 125) {
        value = value.slice(0, 2);
      }

      this.transport.controls["vage"].setValue(value);
    }
  }

  checseat($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value); // returns 0

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {
        value = value.slice(0, 3);
      }
      if (this.age > 150) {
        value = value.slice(0, 2);
      }

      this.transport.controls["seat_cap"].setValue(value);
    }
  }
  /*
      checkpercentage($event: KeyboardEvent) 
      {
        let value = (<HTMLInputElement>event.target).value;
        
    this.age=Number(value);  
          if (value.length > 3) {
    
            value = value.slice(0, 3)
          
          }
          if(this.age>100)
          {
           
             value = value.slice(0, 2)
          }
          
this.transport.controls['effoffoodbreak'].setValue(value);

      }
      checkpercetwo($event: KeyboardEvent) 
      {
        let value = (<HTMLInputElement>event.target).value;
        
    this.age=Number(value);  
          if (value.length > 3) {
    
            value = value.slice(0, 3)
          
          }
          if(this.age>100)
          {
           
             value = value.slice(0, 2)
          }
          
this.transport.controls['effofhandbreak'].setValue(value);

      }
*/
  checkyear($event: KeyboardEvent) {
    this.year = new Date().getFullYear();
    let value = (<HTMLInputElement>event.target).value;
    this.useryear = Number(value);
    this.year = Number(this.year);

    if (this.useryear >= 1900 && this.useryear <= this.year) {
      this.yearflag = true;
    } else {
      this.yearflag = false;
    }

    if (this.useryear > this.year) {
      value = value.slice(0, 3);
    }
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    this.transport.controls["yearofmanfac"].setValue(value);
  }


  
  public buildtransport() {
    this.transport = this.fb.group({
      vehicle_reg_no: ['', [Validators.required]],
      regno_type: [""],
      registration_date: [""],
    //  uid: [""],
     // mode: [""],
    //  accident_id: [""],
    //  language: [""],
     // officer_name: [""],
     // regno_status: [""],
    //  regno: [""],
      temp_regno_validity: [""],
      trade_plate_issuedby: [""],
    //  trade_plate_validity: [""],
     // f19_sno: [""],
      f19_tp_dt: [""],
      f19_tp_purpose: [""],
      f19_mileage: [""],
      vclass: [""],
      vtype: [""],
      vowneraddr: [""],
      make: [""],
      makeclass: [""],
      yearofmanfac: [""],
      vage: [""],
      ownername: [""],
    //  owneraddr: [""],
      engineno: [""],
      chassisno: [""],
      color: [""],
      seat_cap: [""],
      uloadenweight: [""],
      max_speed: [""],
      vdescription: [""],
      permitcat: [""],
      permitno: [""],
      permitvalidity: [""],
      permitissuedby: [""],
      fitcertstatus: [""],
      fitcertval: [""],
      regloadenweg: [""],
      regcrtval: [""],
      polctrlcertval: [""],
      inscomname: [""],
     // inscomaddr: [""],
      inscrtpolicyno: [""],
      inscrtvalidity: [""],
      tax: [""],
    //  req_police: [""],
    //  mvi_name: [""],
    //  mvi_req_dt: [""],
      place_ins: [""],
    //  lefthanddrive: [""],
      vlength: [""],
      vwidth: [""],
      vheight: [""],
    //  heightofbtoe: [""],
      damge_sustained: [""],
      cause_of_acc: [""],
      vdamagestat: [""],
      conditionofbreak: [""],
      effoffoodbreak: [""],
      effofhandbreak: [""],
      breakseorn: [""],
    //  cffb_hydair: [""],
      cffb_mech: [""],
      cfhandbreak: [""],
      streeringtype: [""],
      streeingcond: [""],
      tyrecond: [""],
      opif_vd_rd: [""],
      mech_fstat: [""],
      vdefecttype: [""],
      skidmark: [""],
    //  trackmark: [""],
      // skidleng: [""],
      disposofv: [""],
      whechkrepiss: [""],
      whecfxiss: [""],
      cfxno: [""],
      inspection_date: [""],
      driving_license_submit_flag: [""],
      cfxdate: [""],
      checkreportdate: [""],
      checkreportnr: [""],
     // insdt: [""],
      painttransfer: [""],
    //  dispinstallingcngosofv: [""],
      locationoftransfer: [""],
   //   paintcolor: [""],
      vehicletrackingfunctional: [""],
      vehicletracking: [""],
      sensorfunctional: [""],
      parkingsensors: [""],
      psvfunctional: [""],
      psvinstalled: [""],
      educationalvehicle: [""],
      tintedglass: [""],
      airbagreasons: [""],
      airbagsfunctional: [""],
      airbags: [""],
      faultynumberplate: [""],
      lightsfuntional: [""],
      hornfunctional: [""],
      //changeofvehiclebody: [""],
      installingcng: [""],
      coloroftransfer: [""],
     // brakestatus: [""],
     device_fit:[""],
     vehicle_bullbars:[""],
     vehicle_reflectivetapes:[""],
     vehicle_windscreen:[""],
      wheeltype: [""],
      wiperstype: [""],
      mirrorstype: [""],
      whethervmb: [""],
      vehmodby: [""],
      wrpsi: [""],
      wfy: [""],
      tofs: [""],
      dodamages: [""]
    });
  }
}
