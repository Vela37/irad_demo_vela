import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { ApiService} from '../../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invehicle',
  templateUrl: './invehicle.page.html',
  styleUrls: ['./invehicle.page.scss'],
})
export class InvehiclePage implements OnInit {

  titlevechile:any;
  selectedLanguage:string;
  ingeneralform:FormGroup;
  accid:any=null;
  vehicelist=new Array();
  driverlist=new Array();
  params:any;
  constructor(
    private translateConfigService: TranslateConfigService,
    private fb:FormBuilder,
    private api:ApiService,
    private router: Router,
    private alertCtrl: AlertController
  ) 
  {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    this.accid=localStorage.getItem('accid');

  }
  public loadvehicledriver()
  {
  
    
    let postDate={
        mode:'vehicledrivernew',
        ln:this.selectedLanguage,
        accid:this.accid
      }
      this.api.post('accupdate',postDate).subscribe((data: any)=>{

      //  console.log(data.listdriver); 
        var tmp=data.listdriver;
        var tmp2=data.vehicledriver;

        for(var i=0;i<tmp.length;i++){

     this.driverlist.push(Array(i,tmp[i][0],tmp[i][1],tmp[i][2],tmp[i][3]));

    }
    for(var i=0;i<tmp2.length;i++){

      this.vehicelist.push(Array(i,tmp2[i][0],tmp2[i][1],tmp2[i][4])); 
      
     }


console.log(this.driverlist);

});
  
  //console.log(this.vehicelist);
  //console.log(this.driverlist );

}
  
public editvehicle(v)
{
  
  localStorage.setItem('vid',v);
  this.router.navigate(['/acctabs/tab1/inowner']);

}


public editdriver(d)
{

  localStorage.setItem('dvrid',d);
  
  this.router.navigate(['/acctabs/tab1/indriver']);
}
  ngOnInit() {
    this.loadvehicledriver();

  }
  public addValue(){}
}
