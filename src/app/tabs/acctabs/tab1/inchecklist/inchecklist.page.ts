import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inchecklist',
  templateUrl: './inchecklist.page.html',
  styleUrls: ['./inchecklist.page.scss'],
})
export class InchecklistPage implements OnInit {

  params:any;
  selectedLanguage:string;
  courtform:FormGroup;
  isSubmitted = false;
  isLoading = false;
  datacombo=true;
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  options6:any;
  options7:any;
  options8:any;
  options9:any;
  hospitalname:any;
  invest1=false;
  invest2=true;
  invest3=true;
  titlevechile='PATIENT ';
  postdata2={'mode':'','language':''};
  postdata3={'mode':'','language':'','name':'','hpid':''};
  ln:any;
  accid:any;
 // public local_court:mod_court;
  constructor(private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.accid=localStorage.getItem('accid');
    this.build_court_form();
   }
   public build_court_form(){
    this.courtform = this.fb.group({
              
                             vehicle_id:['',[Validators.required]],
                             driver_id:[''], 

   })
     }

  ngOnInit() {
  }
public showbasic(){}
public addcourt(){}
}
