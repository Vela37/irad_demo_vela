import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inpedestrian',
  templateUrl: './inpedestrian.page.html',
  styleUrls: ['./inpedestrian.page.scss'],
})
export class InpedestrianPage implements OnInit {

 
  selectedLanguage:string;
  ingeneralform:FormGroup;
  pedestrians=new Array();
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
  }
  public build_general_form(){
    this.ingeneralform = this.fb.group({
              
                            
                             whotookvictim:[''],
                             hospitalizeddate:['']

   })
     }
  ngOnInit() {
    this.loadpedstrian();
  }
  public loadpedstrian()
  {
  
    
    let postDate={
        mode:'listpedestrian',
        ln:this.selectedLanguage,
        accid:this.accid
      }
      this.api.post('editthree',postDate).subscribe((data: any)=>{
         
        var tmp=data.data;
        for(var i=0;i<tmp.length;i++){

     this.pedestrians.push(Array(i,tmp[i][0],tmp[i][2]));


    }
  });
}
public addValue(){}
public editpedestrian(event:any){}
public addinvestigation(){}

}
