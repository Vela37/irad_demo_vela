import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../../../translate-config.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss'],
})
export class PassengerComponent implements OnInit {

  selectedLanguage:string; params: any; isSubmitted:boolean=false;

  @Input() passengerinfo:any;
  titlepassenger="Passenger";
  accidentData = new Array();
  vehiclecombo = true;
  selacc: any; accid: any;

  vechile_count: number = 0;
  updated_count: number = 0;
  remaing_count: number = 0;
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
  ln:any;

  postdata = { 'mode': '', 'accid': '' };
  dataset = { 'mode': '', 'accid': '', 'vechile': '' };
  postdata2 = { 'mode': '', 'language': '' };

  constructor(private api:ApiService,private modalctrl: ModalController,private translateConfigService: TranslateConfigService,) { 
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);

    this.checkvechilecount();

    this.checkpassenger();
    
  }

  ngOnInit() {
    console.log("Passenger Info",this.passengerinfo);
    this.accid = this.selacc.accid;
    this.loadselection()
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
      this.passengerinfo.mobile=value; 
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

  public loadselection() {

    this.postdata2.mode = 'passengerdata';
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

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  checkvechilecount() {
    this.postdata.mode = 'vechilelist';
    this.postdata.accid = this.accid;
    this.findremaining(this.postdata).subscribe(
      (success: any) => {
        var tmp = success.updated;
        for (var i = 0; i < tmp.length; i++) {
          // console.log(tmp[i]);
          this.accidentData.push(Array(i, tmp[i][0], tmp[i][1]));
          this.vehiclecombo = false;
        }
      },
      error => {
        console.log(error);
      });
  }

  public findremaining(postdata: any) {

    return this.api.post('pending', postdata);

  }


  checkpassenger() {
    // alert("calling");
    this.dataset.mode = 'passenger';
    this.dataset.accid = this.accid;
    //console.log(this.dataset);
    //return false;

    this.getpassengercount(this.dataset).subscribe(
      (success: any) => {
        //alert(this.dataset);
        //  alert(success.updated);

        // alert(success.sql2);

        this.vechile_count = success.overall;
        this.updated_count = success.updated;
        this.remaing_count = success.overall - success.updated;

        //  alert(this.vechile_count);
        //  alert(this.updated_count); 

        if (this.vechile_count <= success.updated) {
          this.validaccid = true;
        } else {
          this.validaccid = false;
        }
      },
      error => {

        //  console.log(error);

      }
    );
  }


  public getpassengercount(postdata: any) {

    return this.api.post('pending', postdata);
  }

  saveModal() {
    let reply = { 'passengerinfo': this.passengerinfo };
    console.log(this.passengerinfo);
   
   this.updatePassenger();
 
   // this.modalctrl.dismiss(reply);
   
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  async  updatePassenger(){
    //this.isLoading=true; 
    let postDate={
      mode:'passenger',
      passengerinfo:this.passengerinfo
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
 