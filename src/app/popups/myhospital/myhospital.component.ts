import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';

@Component({
  selector: 'app-myhospital',
  templateUrl: './myhospital.component.html',
  styleUrls: ['./myhospital.component.scss'],
})
export class MyhospitalComponent implements OnInit {

  
  @Input() histroy: any;
  @Input() searchflag: any;
  selectedLanguage:string;
  hpid:any;
  postdata3={'mode':'','language':'','name':'','hpid':''};
  
  address:any;
  townname:any;
  pincode:any;
  state:any;
  contactnr:any;
  hpname:any;
  id:any;

  
  constructor(
    private api:ApiService,
    private translateConfigService: TranslateConfigService,
    private modalctrl:ModalController) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      this.translateConfigService.setLanguage(this.selectedLanguage);
      this.hpid=localStorage.getItem('hpid');
    
   // localStorage.setItem('hpid',item);  
     }

  ngOnInit() {
    this.postdata3.mode='singlehospital';
   // this.postdata3.language=this.ln;
    this.postdata3.hpid=this.hpid;
    this.singlehp(this.postdata3).subscribe(
      (success:any) => {

      // console.log(success.hpdetails[0]['address'][0]['address']);

       this.address=success.hpdetails[0]['address'];
       this.townname=success.hpdetails[0]['townname'];
       this.pincode=success.hpdetails[0]['pincode'];
       this.state=success.hpdetails[0]['state'];
       this.contactnr=success.hpdetails[0]['contactnr'];
       this.hpname=success.hpdetails[0]['hpname'];
       this.id=success.hpdetails[0]['id'];
       
     //  alert(success.hpdetails[0]['address'][0].pincode);
   
   //    this.healthform.controls['pincode'].setValue(success.hpdetails[0]['address'][0].pincode);
    //   this.healthform.controls['district'].setValue(success.hpdetails[0]['address'][0].townname);
     
    },
      error => {
      console.log(error);
      } 
      );
  }
  public singlehp(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }
  closemodal()
  {

    this.searchflag='no';
    
    this.modalctrl.dismiss(this.searchflag);
  }
  searcclosemodal()
  {
    localStorage.setItem('hpid',null);
    this.searchflag='yes';
    
    this.modalctrl.dismiss(this.searchflag);
  }

  
}
