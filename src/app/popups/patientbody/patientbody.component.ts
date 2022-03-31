import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';

@Component({
  selector: 'app-patientbody',
  templateUrl: './patientbody.component.html',
  styleUrls: ['./patientbody.component.scss'],
})
export class PatientbodyComponent implements OnInit {

  selectedLanguage:string;
  @Input() histroy: any;
  @Input() systalicbp:string;
  @Input() dialisticbp:string;
  @Input() pulseheartrate:string;
  @Input() spo2:string;
  @Input() temperature:string;
  @Input() respiraterate:string;

  constructor(
    private translateConfigService: TranslateConfigService,
    private modalctrl:ModalController) {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      this.translateConfigService.setLanguage(this.selectedLanguage);
     }

  ngOnInit() {}
  closemodal()
  {
  
    this.histroy = { systalicbp:this.systalicbp,dialisticbp:this.dialisticbp,pulseheartrate:this.pulseheartrate,spo2:this.spo2,temperature:this.temperature,respiraterate:this.respiraterate };


    this.modalctrl.dismiss(this.histroy);
  }

}
