import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
//import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-accmapping',
  templateUrl: './accmapping.component.html',
  styleUrls: ['./accmapping.component.scss'],
})
export class AccmappingComponent implements OnInit {

  @Input() pid: any;
  @Input() hid: any;
  @Input() pname: any;
  @Input() gender: any;
  @Input() address: any;
  @Input() hpname: any;
  @Input() hpaddr: any;
  @Input() timeof_arrival: any;

  ln:any;
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;

  acc_psid:any;
  psaccid:any;
  ptype:any;

  @Input() drid:any;
  @Input() paid:any;
  @Input()  prid:any;
  
  type1:any=true;
  type2:any=true;
  type3:any=true;
  type4:boolean=true;

  accinfo:any=true;

  
  postdata3={'accid':'','mode':'','acc_personid':'','language':'','id':'','crimeno':'','showhp':'','hpname':'','district':'','ptype':''};

  constructor(
    private api:ApiService,
    private modalctrl: ModalController
    ) { 

    }

  ngOnInit() {
  
    console.log(this.pid);
    this.loadaccid();
  
  }
  public linkprocess(){

  // alert('hiii'); 
 //  alert(this.drid);
  if(this.ptype=='Driver'){
        if(this.drid!=undefined)
            {
            //  alert(this.drid);
          //  alert(this.drid);
            this.acc_psid=this.drid;
            }
            else
            {
              alert('Please select driver');
              return false;
            }
  }

  if(this.ptype=='Passenger'){
    if(this.paid!=undefined)
        {
        //  alert(this.paid);
      //  alert(this.paid);
        this.acc_psid=this.paid;

        }
        else
        {
          alert('Please select Passenger');
          return false;
        }
}

if(this.ptype=='Pedestrian'){
  if(this.prid!=undefined)
      {
            //  alert(this.prid);
              this.acc_psid=this.prid;
      }
      else
      {
        alert('Please select Pedestrian');
        return false;
      }
}

  this.postdata3.mode='linkprocess';
  this.postdata3.accid=this.psaccid;
  this.postdata3.id=this.pid;
  this.postdata3.hpname=this.hid;
  this.postdata3.ptype=this.ptype;
  this.postdata3.acc_personid=this.acc_psid;
  this.getdata(this.postdata3).subscribe(
    (success:any) => {
      
//      this.options1=success.pdata;
      alert(success.message);
      this.closemodal();
  },
    error => {
    console.log(error);
    } 
    );

  }
  public loadaccid(){

        this.postdata3.mode='accidmapping';
        this.postdata3.id='33';
        this.postdata3.language=this.ln;
        this.getdata(this.postdata3).subscribe(
          (success:any) => {
        
            this.options1=success.pdata;
         
        },
          error => {
          console.log(error);
          } 
          );
      
      }

      public showtype(event:any){
     // alert(event.target.value);
      if(event.target.value=='Driver')
      {

          this.type1=false;
          this.type2=true;
          this.type3=true;
      
}
      else if(event.target.value=='Passenger')
      {

        this.type1=true;
        this.type2=false;
        this.type3=true;
 

      }
      else if(event.target.value=='Pedestrian')
      {

        this.type1=true;
        this.type2=true;
        this.type3=false;
 
      }
      
      }
        public showpersons(event:any){

        this.options2=null;
        this.options3=null;
        this.options4=null;

//alert(event.target.value);
this.postdata3.mode='loadaccidentvictims';
this.postdata3.id=event.target.value;
this.postdata3.language=this.ln;
this.getdata(this.postdata3).subscribe(
  (success:any) => {

    this.type4=false;
    this.accinfo=success.pdata[0];
    this.options2=success.driver;
    this.options3=success.passnger;
    this.options4=success.pedestrian;
 
},
  error => {
  console.log(error);
  } 
  );


      }
      
     public getdata(postdata3:any){
    
      return this.api.post('datas.php',postdata3);
    
    }

    closemodal()
    {
    //  alert('dddd');
      this.modalctrl.dismiss();
    }

}
