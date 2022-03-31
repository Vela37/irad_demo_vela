import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';

@Component({
  selector: 'app-deathreason',
  templateUrl: './deathreason.component.html',
  styleUrls: ['./deathreason.component.scss'],
})
export class DeathreasonComponent implements OnInit {


  @Input() histroy: any;
  selectedLanguage:string;
  @Input() wardno:string; 
  @Input() diedon:string; 
  @Input() immediatecause:string; 
  @Input() antcause:string; 
  @Input() othersignificant:string; 
  @Input() mannerofdeath:string; 
  @Input() ifwomen:string; 
  @Input() wasdelivery:string; 
  @Input() dateofverification:string; 
  
  
  
  
    constructor(
      private translateConfigService: TranslateConfigService,
      private modalctrl:ModalController) {
        this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
        this.selectedLanguage = localStorage.getItem('ln');
        this.translateConfigService.setLanguage(this.selectedLanguage);
       }
  
    ngOnInit() {
    }
    closemodal()
    {
      this.histroy = { 
  
        wardno:this.wardno,
        diedon:this.diedon,
        immediatecause:this.immediatecause,
        antcause:this.antcause, 
        othersignificant:this.othersignificant, 
        mannerofdeath:this.mannerofdeath, 
        ifwomen:this.ifwomen, 
        wasdelivery:this.wasdelivery, 
        dateofverification:this.dateofverification 
      
      };
  
      this.modalctrl.dismiss(this.histroy);
    }
}
