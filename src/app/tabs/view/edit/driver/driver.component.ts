import { Component, Input, OnInit } from '@angular/core';
import { model_driverinfo } from '../../../../models/model_driverinfo';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  @Input() driverinfo: model_driverinfo;
  
  titlevechile='DRIVER ';
  datacombo=true;
  age: number;

  selectedLanguage:string; params: any; saratiflag:boolean=false;
  postdata3={'mode':'','language':''};
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  options6:any;
  options7:any;
  options8:any;
  options9:any;
  options10:any;
  options11:any;
  options12:any;
  options13:any;
  options16:any;

  
  ln:any;  
  noedit=false;
  nationality_flag=true;
  postdata2={'licencenumber':'','accid':''};
  constructor(private api:ApiService,private modalctrl: ModalController) {
    this.ln=localStorage.getItem('ln');
   }

  ngOnInit() {
  //  console.log("Driver INFO",this.driverinfo.injurytype);
    this.driverinfo.injurytype = this.driverinfo.injurytype.split(",");
    this.loadselection();
 //   alert(this.driverinfo.drivinglicencetype);
  }

  public changenationality(event:any)
    {
      if(event.target.value=="0")
      {
          this.nationality_flag=true;

      }
      else
      {
        this.nationality_flag=false;
      }
    }
    checkdigits($event: KeyboardEvent,cnt) {
      let value = (<HTMLInputElement>event.target).value;
     // console.log(value);
  
      if ($event.target) {
        if (value == "") {
          value = value.slice(0, 0);
        }
  
        if (value.length > cnt) {
          value = value.slice(0,cnt)
        }
      (<HTMLInputElement>event.target).value = value;
  
    }
  
  }
    public getsarthi(){
      this.saratiflag=true;
  this.postdata2.licencenumber=this.driverinfo.license_number;
  this.postdata2.accid=this.driverinfo.accid;
  this.getsarathiservice(this.postdata2).subscribe(
    (success:any) => {

      
     // this.noedit=true;
      this.saratiflag=false;
      console.log("SARATHI",success);
      if(success.iradobj!=null)
  {
      this.noedit=true;
      // this.VechileDriverFG.controls['driver_name'].disable();
      // this.VechileDriverFG.controls['current_satus'].disable();
      // this.VechileDriverFG.controls['gender'].disable();
     
      // this.VechileDriverFG.controls['driver_name'].disable();
      // this.VechileDriverFG.controls['cov_class'].disable();
  
      
      //this.driverinfo.license_number=success.iradobj[0]['status'];
      this.driverinfo.ser_name=success.iradobj[0]['name'];
      this.driverinfo.ser_gender=success.iradobj[0]['gender'];
      this.driverinfo.ser_mobileno=success.iradobj[0]['mobileNo'];
      this.driverinfo.residence=success.iradobj[0]['permAdd1']+','+(success.iradobj[0]['permAdd2'])+','+(success.iradobj[0]['permAdd3']);      
      this.driverinfo.vehilceclass=success.iradobj[0].vehicleClass[0]+','+success.iradobj[0].vehicleClass[1];
      console.log("VEHICLE cLASS",success.iradobj[0].vehicleClass[0]+','+success.iradobj[0].vehicleClass[1]);
      console.log("VEHICLE cLASS LEngth",success.iradobj[0].vehicleClass.length);

}
    },
    error => {
    console.log(error);
    } 
    );
    }

    public getsarathiservice(postData2){

      //return this.http.post(this.apiUrl+'services/sarathi',data);
    
      return this.api.post('services/sarathi1',postData2);
    
    
    }
    checkage($event: KeyboardEvent) {
      let value = (<HTMLInputElement>event.target).value;
  
      this.age = Number(value);       // returns 0
  
  
      if ($event.target) {
        if (value == "") {
          value = value.slice(0, 0);
        }
  
        if (value.length > 3) {
  
          value = value.slice(0, 2)
  
        }
        if (this.age > 125) {
  
          value = value.slice(0, 2)
        }
  //alert(value);
      //  (<HTMLInputElement>event.target).value =value;
    //  this.VechileDriverFG.controls['modeoftransport'].setValue('0');
      this.driverinfo.age=value;
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
        (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    //    this.driverinfo.ser_mobileno=value; 
      }
    
    }

    closeModal() {
      //let reply = { 'geninfo': this.geninfo };
      this.modalctrl.dismiss();
      // console.log(this.geninfo);
    }

  public loadselection(){
    //alert('call');
        this.postdata3.mode='vehicledata';
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
            this.datacombo=false;
            this.options1=success.severity;
            this.options2=success.education;
            this.options3=success.delay;
            this.options4=success.modeoftranport;
            this.options5=success.defect;
            this.options6=success.man;
            this.options7=success.damage;
            this.options11=success.injurytype;
            this.options12=success.occupation;
            this.options13=success.regstatus;
            this.options16=success.drivinglicencetype;
            
            
        },
          error => {
          console.log(error);
          } 
          );
      
      }
      
     public selection(postdata3:any){
    
      return this.api.post('datas',postdata3);
    
    }


    saveModal() {
      let reply = { 'driverinfo': this.driverinfo };
      console.log(this.driverinfo);
     
     this.updateDriver();
   
     // this.modalctrl.dismiss(reply);
     
    }
  
    cancelmodal() {
      //this.histroy = { accid:this.accid,nov:this.nov}; 
      this.modalctrl.dismiss();
    }
  
    async  updateDriver(){
      //this.isLoading=true; 
      
      console.log(this.driverinfo);
    //  return false;

      let postDate={
        mode:'driver',
        driverinfo:this.driverinfo
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
