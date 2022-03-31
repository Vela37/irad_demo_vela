import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
import { DataService } from '../../../../services/data.service';

//import { mod_court } from '../../../../models/model.court'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-indriver',
  templateUrl: './indriver.page.html',
  styleUrls: ['./indriver.page.scss'],
})
export class IndriverPage implements OnInit {
  driverid:string;
  newUser:string;
  selectedLanguage:string;
  ingeneralform:FormGroup;
  injury_flag:boolean;
  changests1:boolean;
  changests2:boolean;
  ln:any;
  accid:any;
  severity:any;
  dataObject:any;
  params:any;
  postdata2={'mode':'','language':'','accid':'','vid':''};
  checked : boolean = false;

  constructor(
    private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private dataService: DataService,
    private alertCtrl: AlertController
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.build_form();
    this.accid=localStorage.getItem('accid');
    this.dataObject=this.dataService.getOption();
    this.driverid=this.dataObject['driverid'];
  }
  public addValue(){}
   
public build_form(){
  this.ingeneralform = this.fb.group({
              
    vehicle_id:['',[Validators.required]],
    driver_id:[''], 

})
}
infuryflag(): void {
      this.checked = !this.checked; 
      if(this.checked)
      {
        this.injury_flag=false;
     
      }
      else
      {
  
        this.injury_flag=true;
      }
    
  }
  public gedriverinfo(){
    
    this.postdata2.mode='driverinfo';
    this.postdata2.language=this.ln;
    this.postdata2.accid=this.accid;
    this.selection(this.postdata2).subscribe(
      (success:any) => {

      console.log(success.driver[0]);
      this.severity=success.driver[0]['injury_severity'];
     // this.severity=success.driver[0]['drunk'];
      alert(success.driver[0]['drunk']);
     // alert(this.severity);
         if(this.severity<=3)
           {
         //   alert('injured');
           // this.injury_flag=true;
           this.changests1=true;
           this.injury_flag=false;

          //  alert('hide hp');   
        //  console.log(this.changests1);         
           }
           else if(this.severity==null)
           {
         //   alert('no details found about driver injury');
           }
           else
           {
        //    alert('not injured');
            this.changests1=false;
            this.injury_flag=true;
         //   console.log(this.changests1);
           // alert('show hp');
         //   this.injury_flag=false;
       //     this.changests1=false;
           }
           if(success.driver[0]['drunk']=='yes')
           {
            this.changests2=true;

           }
           else
           {
            this.changests2=false;

           }

     
    },
      error => {
      console.log(error);
      } 
      );
   }

   public selection(postdata2:any){

     return this.api.post('datas',postdata2);
   
   }
  ngOnInit() {
    this.gedriverinfo();
           //  this.userService.castUser.subscribe(user => this.user = user);
  }
  public addinvestigation(){}

}
