import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingeneral',
  templateUrl: './ingeneral.page.html',
  styleUrls: ['./ingeneral.page.scss'],
})
export class IngeneralPage implements OnInit {
  selectedLanguage:string;
  params:any;
  ingeneralform:FormGroup;
  
  constructor(
    private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.build_general_form();
  }
  public build_general_form(){
    this.ingeneralform = this.fb.group({
              
                             vehicle_id:['',[Validators.required]],
                             driver_id:[''], 

   })
     }
  ngOnInit() {
  }
  public addValue(){}
  public addinvestigation(){}
  public showwitnessform(event:any){}
  
}
