import { DatePipe } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiService } from "../../../../services/api.service";

@Component({
  selector: "app-fir",
  templateUrl: "./fir.component.html",
  styleUrls: ["./fir.component.scss"],
})
export class FirComponent implements OnInit {
  @Input() geninfo: any;
  mindate: any = new Date("January 01, 2021"); maxdate: any = new Date();
  postdata2 = { mode: "", language: "" };
  fird: any; 
  ln: any;
  firNumbUp: any; actSection: any; firdatetime:any;
  sectionsList: any; vehList: any;
  vicacq: any; accused: any;
  firresponse: any;
  // checkboxval1: any;
  // checkboxval2: any;
  // checkboxval3: any;
  // checkboxval4: any;
  // checkboxval5: any;
  // checkboxval6: any;

  act: any; acts:any;sections:any;
  section: any;

  accused_victim: any;

  flagmessage: boolean = false;
  flagmessage1: boolean = false;
  flagmessage2: boolean = false;
  flagmessage3: boolean = false;

  constructor(
    private modalctrl: ModalController,
    private api: ApiService, private datePipe: DatePipe,
    private alertCtrl: AlertController
  ) {
    this.ln = localStorage.getItem("ln");

  }

  ngOnInit() {
    console.log(this.geninfo)
    this.getActSection();
   // this.getAcqVicList(this.geninfo.accident_id);
    //this.fir_number, ipc_section,fo_user,io_user,
    this.firNumbUp = this.geninfo.fir_number;
    this.act = this.geninfo.act.split(' , ');
    this.section = this.geninfo.section.split(' , ');
    this.firdatetime = this.geninfo.firdatetime;

    this.maxdate = this.datePipe.transform(this.maxdate, 'yyyy-MM-dd'); console.log(this.maxdate);

  }

  public getActSection() {
    let postFirDate = {
      mode: "firselection",
      accid:this.geninfo.accident_id
    };
    this.api.post("accview", postFirDate).subscribe((data: any) => {
      console.log(data);
      let success = data;
      if (data != false) {
        this.vehList = success.data;
        let a = []; let j = 0;
        for (let i = 0; i < this.vehList.length; i++) {
          if (this.vehList[i].accused_victim == 'Accused') {
            a[j++] = this.vehList[i].value;
          }

        }
        this.accused = a;
      }
      if (data.data != null) {
        this.sectionsList = data.data;
        this.acts = data.acts;
        this.sections = data.sections;
        
        this.act = this.geninfo.act.split(' , ');
        this.section = this.geninfo.section.split(' , ');
      }


      
    });
  }

  public getAcqVicList(accid) {
    let postFirDate = {
      mode: "acqviclist",
      id: accid
    };
    this.api.post("accview", postFirDate).subscribe((data: any) => {
      console.log(data);
      let success = data;
      if (data != false) {
        this.vehList = success.data;
        let a = []; let j = 0;
        for (let i = 0; i < this.vehList.length; i++) {
          if (this.vehList[i].accused_victim == 'Accused') {
            a[j++] = this.vehList[i].value;
          }

        }
        this.accused = a;

      } else {
        console.log(data);
      }
    });
  }

  public getChangeFlag(e) {

    let firn = e.detail.value.trim();
    if (firn != null || firn != "") {
      this.flagmessage = false;
    }
    this.firNumbUp = firn;
  }

  public getActChangeFlag(e) {

    console.log(this.act);
    console.log(this.sections);

    if(this.act.length==this.acts.length){
      this.sectionsList=this.sections
    }else{
      this.sectionsList=[];
      for(let j=0;j<this.act.length;j++){
      for(let i=0;i<this.sections.length;i++){

        if(this.act[j]==this.sections[i].act){
          this.sectionsList.push(this.sections[i]);
        }
      }
    }
    }
    console.log('this.sectionsList',this.sectionsList);
    
  }

  public getSectionChangeFlag(e) {

    let sec = e.detail.value.trim();
    if (sec != null || sec != "") {
      this.flagmessage2 = false;
    }
    this.section = sec;
  }

  // public getChangeFlag1(e){

  //   let acts = e.detail.value.trim();
  //   if(acts != null || acts != ""){
  //     this.flagmessage1 = false;
  //   }
  //   this.actSection = acts;
  // }

  // public getChangeFlag2(e){

  //   let vicac = e.detail.value.trim();
  //   if(vicac != null || vicac != ""){
  //     this.flagmessage2 = false;
  //   }
  //   this.vicacq = vicac;
  // }

  sendFir() {

    if (this.firNumbUp == null || this.firNumbUp == "" || this.firNumbUp == undefined) {
      this.flagmessage = true;
      console.log(this.firNumbUp);
    } else if (this.act == null || this.act == "" || this.act == undefined) {
      this.flagmessage1 = true;
      console.log(this.act);
    } else if (this.section == null || this.section == "" || this.section == undefined) {
      this.flagmessage2 = true;
      console.log(this.section);
    // } else if (this.accused == null || this.accused == "" || this.accused == undefined) {
    //   this.flagmessage3 = true;
    //   console.log(this.accused);
    } else {
      this.saveFirModal();
    }

  }

  public saveFirModal() {

    let postDate = {
      mode: "updatefir",
      firNumber: this.firNumbUp,
      act: this.act.join(' , '),
      section: this.section.join(' , '),
      vicacq: this.accused,
      accid: this.geninfo.accident_id,
      firdatetime:this.firdatetime
    };

    this.api.post("update", postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        this.firresponse = data;
        this.modalctrl.dismiss(true);
      } else {
        console.log(data);
      }
    });
  }

  cancelmodal() {
    this.modalctrl.dismiss();
  }

  closeModal() {
    this.modalctrl.dismiss();
  }

}
