import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';


@Component({
  selector: 'app-drcertificate',
  templateUrl: './drcertificate.component.html',
  styleUrls: ['./drcertificate.component.scss'],
})
export class DrcertificateComponent implements OnInit {


  @Input() histroy: any;
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

    this.modalctrl.dismiss(this.histroy);
  }


}
