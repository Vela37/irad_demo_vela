import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';


@Component({
  selector: 'app-showmystation',
  templateUrl: './showmystation.component.html',
  styleUrls: ['./showmystation.component.scss'],
})
export class ShowmystationComponent implements OnInit {


  @Input() histroy: any;
  @Input() searchflag: any;
  selectedLanguage:string;
  stnid:any;
  postdata3={'mode':'','language':'','name':'','hpid':''};
  
  state_name:any;
  district_name:any;
  ps_name:any;


  constructor(
    private api:ApiService,
    private translateConfigService: TranslateConfigService,
    private modalctrl:ModalController) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      this.translateConfigService.setLanguage(this.selectedLanguage);
      this.stnid=localStorage.getItem('stnid');
    
   // localStorage.setItem('hpid',item);  
     }

  ngOnInit() {
    this.postdata3.mode='singlestation';
   // this.postdata3.language=this.ln;
    this.postdata3.hpid=this.stnid;
    this.singlehp(this.postdata3).subscribe(
      (success:any) => {

console.log(success);
   
       this.state_name=success.stndetails[0]['state_name'];
       this.district_name=success.stndetails[0]['district_name'];
       this.ps_name=success.stndetails[0]['ps_name'];
      
     
   
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
    localStorage.setItem('stnid',null);
    this.searchflag='yes';
    
    this.modalctrl.dismiss(this.searchflag);
  }

}
