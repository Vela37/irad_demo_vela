import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
//import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-forwarding',
  templateUrl: './forwarding.component.html',
  styleUrls: ['./forwarding.component.scss'],
})
export class ForwardingComponent implements OnInit {


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
  remarks:any;

  @Input() drid:any;
  @Input() paid:any;
  @Input()  prid:any;
  
  type1:any=true;
  type2:any=true;
  type3:any=true;
  type4:boolean=true;

  accinfo:any=true;

  
  postdata3={'accid':'','mode':'','acc_personid':'','language':'','id':'','crimeno':'','showhp':'','hpname':'','district':'','ptype':'','hpid':''};

  constructor(
    private api:ApiService,
    private modalctrl: ModalController
    ) { 

    }

  ngOnInit() {
  
    console.log(this.pid);
    this.loadaccid();
  
  }
  public forwardprocess(){

    let postDate={
      mode:'policeforward',
      hpid:this.hid,
      patientid:this.pid,
      state:this.psaccid,
      district:this.drid,
      station:this.paid,
      remarks:this.remarks
    }

 
  this.getdata(postDate).subscribe(
    (success:any) => {

            alert(success.message);
            this.closemodal();
  },
    error => {
    console.log(error);
    } 
    );

  }
  public loadaccid(){

this.options1=null;
this.options2=null;
this.options3=null;

        this.postdata3.mode='loadstates';
        this.postdata3.id='33';
        this.postdata3.language=this.ln;
        this.getdata(this.postdata3).subscribe(
          (success:any) => {
        
            this.options1=success.state;
         
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
        public showdistricts(event:any){

          this.options2=null;
          this.options3=null;
          

//alert(event.target.value);
this.postdata3.mode='loadpolicedistrict';
this.postdata3.id=this.psaccid;
this.postdata3.language=this.ln;
this.getdata(this.postdata3).subscribe(
  (success:any) => {

    this.options2=success.district;
 
},
  error => {
  console.log(error);
  } 
  );


      }

      public showstations(event:any){

      
      
        this.options3=null;
        
        //alert(event.target.value);
        this.postdata3.mode='loadpolicestation';
        this.postdata3.hpid=this.drid;
        this.postdata3.language=this.ln;
        this.getdata(this.postdata3).subscribe(
          (success:any) => {
        
            this.options3=success.policsstn;
         
        },
          error => {
          console.log(error);
          } 
          );
        
        
              }
      
     public getdata(postdata3:any){
    
      return this.api.post('datas',postdata3);
    
    }

    closemodal()
    {
    //  alert('dddd');
      this.modalctrl.dismiss();
    }

}
