import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';



@Component({
  selector: 'app-ddform',
  templateUrl: './ddform.component.html',
  styleUrls: ['./ddform.component.scss'],
})
export class DdformComponent implements OnInit {

  @Input() histroy: any;
  selectedLanguage:string;params:any;
  @Input() dr:string;
  @Input() drreg:string;
  
  @Input() dropnion:string;
  @Input() influence:string;
  @Input() symtomps:string;
  opiononflag:boolean=true;

  constructor(
    private translateConfigService: TranslateConfigService,
    private modalctrl:ModalController) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      this.translateConfigService.setLanguage(this.selectedLanguage);
     }
     

  ngOnInit() {
  }
  public opinionchange(event:any)
  {
    
    if(event.target.value=="1")
  {
      this.opiononflag=false;
  }else
  {
  this.opiononflag=true;
  }
  
}
  closemodal()
  {
  
    this.histroy = { dr:this.dr,drreg:this.drreg,dropinion:this.dropnion,alc_influe:this.influence,symptom:this.symtomps };


    this.modalctrl.dismiss(this.histroy);
  }

}
