import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
})
export class TreatmentComponent implements OnInit {


  @Input() treatment: any;
  selectedLanguage:string;

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

    this.modalctrl.dismiss(this.treatment);
  }

}
