import { Component, Input, OnInit } from '@angular/core';
import { model_pedestrian } from '../../../../models/model_pedestrian';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-pedestrian',
  templateUrl: './pedestrian.component.html',
  styleUrls: ['./pedestrian.component.scss'],
})
export class PedestrianComponent implements OnInit {
  
  selectedLanguage:string; params: any;

  @Input('pedinfo') pedinfo: model_pedestrian

  postdata = { 'mode': '', 'accid': '' };
  dataset = { 'mode': '', 'accid': '', 'vechile': '' };
  postdata2 = { 'mode': '', 'language': '' };
  vechile_count: number = 0;
  updated_count: number = 0;
  remaing_count: number = 0;
  accid: any;
  selacc: any; isSubmitted:boolean=false
  accidentData = new Array();
  ln: any;
  vehiclecombo = true;
  validaccid: boolean = true;
  datacombo = true;
  options1: any;
  options2: any;
  options3: any;
  options4: any;
  options5: any;
  options6: any;
  options7: any;
  options8: any;

  constructor(private api: ApiService, private modalctrl: ModalController,) {
    this.selacc = JSON.parse(localStorage.getItem('selacc')); console.log(this.selacc);
    this.accid = this.selacc.accid;
    this.ln = localStorage.getItem('ln');

    this.checkpassenger();
    this.checkvechilecount();
  }

  ngOnInit() {
    console.log('edit pedinfo', this.pedinfo);
    this.loadseverity();
    this.loadselection();
    this.pedinfo.ped_injurytype = this.pedinfo.ped_injurytype.split(",");
  }

  public loadselection() {

    this.postdata2.mode = 'pedestriandata';
    this.postdata2.language = this.ln;
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        this.datacombo = false;
        this.options1 = success.severity;
        this.options2 = success.injurytype;
        this.options6 = success.ocuupation;
        this.options4 = success.education;
        this.options3 = success.modeoftranport;
        this.options7 = success.action;
        this.options5 = success.postion;
        this.options8 = success.hospitalzation;


      },
      error => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  public getpassengercount(postdata: any) {

    return this.api.post('pending', postdata);
  }

  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

  }

  public loadseverity() {
    this.postdata2.mode = 'severity';
    this.postdata2.language = this.ln;
    this.severity(this.postdata2).subscribe(
      (success: any) => {
        this.options1 = success.data;
      },
      error => {
        console.log(error);
      }
    );
  }
  public severity(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  checkvechilecount() {
    this.postdata.mode = 'vechilelist';
    this.postdata.accid = this.accid;
    this.findremaining(this.postdata).subscribe(
      (success: any) => {
        var tmp = success.updated;
        for (var i = 0; i < tmp.length; i++) {

          this.accidentData.push(Array(i, tmp[i][0], tmp[i][1]));
          this.vehiclecombo = false;
        }
      },
      error => {
        console.log(error);
      });
  }
  checkpassenger() {

    this.dataset.mode = 'pedestrian';
    this.dataset.accid = this.accid;

    this.getpassengercount(this.dataset).subscribe(
      (success: any) => {


        this.vechile_count = success.overall;
        this.updated_count = success.updated;
        this.remaing_count = success.overall - success.updated;

        // console.log('this.remaing_count', this.remaing_count);

        if (+this.remaing_count > 0) {
          this.validaccid = false;
        } else {
          this.validaccid = true;
        }
        // console.log('this.validaccid', this.validaccid);
      },
      error => {
      }
    );
  }

  public getvalue(event: any) {

    if (event.target.value == "4") {

      this.pedinfo.modeoftransport=0;
      this.pedinfo.hospitaldelay=0;
      this.pedinfo.modeoftransport=0;

    }
    else {
     
    }

  }
  checkage($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    let age= Number(value);       // returns 0


    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {

        value = value.slice(0, 3)

      }
      if (age > 125) {

        value = value.slice(0, 2)
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    }


  }
  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }
  
      if (value.length > 10) {
        value = value.slice(0, 10)
      }
    //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      this.pedinfo.mobile.mobile=value; 
    }
  
  }
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  
   saveModal() {
    // alert("jjj");
    let reply = { 'geninfo': this.pedinfo };
    console.log(this.pedinfo);
   
   this.updatePedestrian();
 
   // this.modalctrl.dismiss(reply);
   
  }

  updatepedestriandetails(){
   // alert("hiiii");
    let postDate={
      mode:'pedestrian',
      pedinfo:this.pedinfo
    }
    this.api.post('update',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);
      }
     // this.isLoading=false; 
    });
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  async  updatePedestrian(){
    //this.isLoading=true; 
    let postDate={
      mode:'pedestrian',
      pedinfo:this.pedinfo
    }
    this.api.post('update',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);
      }
     // this.isLoading=false; 
    });
  }

}
