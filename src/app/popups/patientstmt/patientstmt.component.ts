import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';


@Component({
  selector: 'app-patientstmt',
  templateUrl: './patientstmt.component.html',
  styleUrls: ['./patientstmt.component.scss'],
})
export class PatientstmtComponent implements OnInit {


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
