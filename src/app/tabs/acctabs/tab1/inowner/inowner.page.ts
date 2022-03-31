import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inowner',
  templateUrl: './inowner.page.html',
  styleUrls: ['./inowner.page.scss'],
})
export class InownerPage implements OnInit {

  selectedLanguage:string;
  ingeneralform:FormGroup;
  params:any;
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
}
