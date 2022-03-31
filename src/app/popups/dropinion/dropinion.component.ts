import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service'; 
import{ FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../services/api.service';



@Component({
  selector: 'app-dropinion',
  templateUrl: './dropinion.component.html',
  styleUrls: ['./dropinion.component.scss'],
})
export class DropinionComponent implements OnInit {


  @Input() lunch: any;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  @Output() childButtonEvent = new EventEmitter();
   
  selectedLanguage:string;
  public dinner = {
    mainCourse: 'fried chicken',
    desert: 'chocolate cake'
  };

  
  note: string = "My Default Text";

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

    this.modalctrl.dismiss(this.lunch);
  }

}
