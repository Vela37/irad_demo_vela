import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inpassenger',
  templateUrl: './inpassenger.page.html',
  styleUrls: ['./inpassenger.page.scss'],
})
export class InpassengerPage implements OnInit {

  selectedLanguage:string;
  ingeneralform:FormGroup;
  passengers=new Array();
  accid:any;
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
    this.accid=localStorage.getItem('accid');

  }
  public build_general_form(){
    this.ingeneralform = this.fb.group({
              
                            
                             whotookvictim:[''],
                             hospitalizeddate:['']

   })
     }
     public addValue(){}
     public loadpasseger()
  {
  
    
    let postDate={
        mode:'listpassenger',
        ln:this.selectedLanguage,
        accid:this.accid
      }
      this.api.post('editone',postDate).subscribe((data: any)=>{
         
        var tmp=data.data;
        for(var i=0;i<tmp.length;i++){

     this.passengers.push(Array(i,tmp[i][0],tmp[i][1]));

     
    }

  });
  
  }
  ngOnInit() {
    this.loadpasseger();

  }
  

public addinvestigation(){}
public editpassenger(event:any){}
}
