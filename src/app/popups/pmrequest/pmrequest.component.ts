import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';


@Component({
  selector: 'app-pmrequest',
  templateUrl: './pmrequest.component.html',
  styleUrls: ['./pmrequest.component.scss'],
})
export class PmrequestComponent implements OnInit {

  
  postdata3={'mode':'','language':'','tabname':'','pid':'','hpid':''};
  shhide:any;
  options1:any;
  pmdetails:any;
  @Input() fulldata: any;
  @Input() ptype: any;
  @Input() place: any;
  @Input() refhp: any;
  @Input() personid: any;
  pernoname:any;
  age:any;
  residenecy:any;
  severity:any;
  gender:any;
  occupation:any;
  residence:any;
  officername:any;
  hospital:any;

  constructor(
    private api:ApiService,
    private translateConfigService: TranslateConfigService,
    private modalctrl:ModalController) {

  }
     
  public referalflag(event:any)
  {

              if(event.target.value=="YES")
            {
                this.shhide=true;
            }
            else
            {
              this.shhide=false;
            }

  }
  ngOnInit() {
    console.log(this.fulldata);
   this.showpmhospitals();
   this.showofficilalhospitals();
  }
  public showofficilalhospitals()
  {
    this.postdata3.mode='officialhospitals';
    this.postdata3.tabname=this.ptype;
    this.postdata3.pid=this.personid;

     this.officilalhospitals(this.postdata3).subscribe(
       (success:any) => {
      console.log(success.user.data);
        this.options1=success.hplist;

     },
       error => {
       console.log(error);
       } 
       );
  }
  public officilalhospitals(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  public showpmhospitals(){
    
    this.postdata3.mode='pmrequest';
    this.postdata3.tabname=this.ptype;
    this.postdata3.pid=this.personid;

     this.singlehp(this.postdata3).subscribe(
       (success:any) => {
      console.log(success.user.data);
        this.pernoname=success.pmdata[0].personname;
        this.age=success.pmdata[0].age;
        this.residenecy=success.pmdata[0].residence;
        this.severity=success.pmdata[0].injury_severity;
        this.gender=success.pmdata[0].gender;
        this.occupation=success.pmdata[0].occupation;

        this.officername=success.user.data.name;

       // this.occupation=success.data;

      //  alert(this.pernoname);
      //pmdata
     },
       error => {
       console.log(error);
       } 
       );
  }
  
  public singlehp(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  public  giverequest()
  {
    if(this.hospital==undefined)
    {
      alert('Select Hospital Name');
      return false;
    }
    this.postdata3.mode='addpmrequest';
    this.postdata3.tabname=this.ptype;
    this.postdata3.pid=this.personid;
    this.postdata3.hpid=this.hospital;

     this.addpmrequest(this.postdata3).subscribe(
       (success:any) => {

            alert(success.message);
     
  },
       error => {
       console.log(error);
       } 
       );

  }
  public addpmrequest(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  closemodal()
  {

    this.pmdetails = { 
  
      place:this.place,
      refhp:this.refhp
    };
    this.modalctrl.dismiss(this.pmdetails);
  }
}
