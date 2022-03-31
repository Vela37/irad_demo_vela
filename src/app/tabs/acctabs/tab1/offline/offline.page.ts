import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { DatePipe, Time } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { TranslateConfigService } from '../../../../translate-config.service';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { arrayobject} from '../../../../services/arrayobject';
import { mod_accident } from '../../../../models/model_accident'; 
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
  providers: [DatePipe]

})
export class OfflinePage implements OnInit {

  offlinedata:any;
  offlinedata2:any;
  dvdead:any;
  padead:any;
  pedead:any;
  totaldead:any;
  officename:string;
  selectedLanguage:string;
  params:any;
  isLoading = false;
  offlineform:FormGroup;
  postdat={'lat':'','lng':''};
  ln:any;
  fatalflag=true;
  options1:any;
  dataseverity:any=null;
  isSubmitted = false;
  public local_acc_model:mod_accident;
  selacc:any;
  message:string;
  loading:boolean;
  location:Location;
  data:any;
  poi:any; near_ps_loc:{'name':'',"distance":''}; ps_boundary:{'name':'',"distance":''};
  datetime:any;
  timeofaccident:any='empty'; acctime:any; accdate:any;
  accdatetime:any;
  numberinput:number[]=[];
  numberinput1:number[]=[];  accloc:string;
  date:Date;mindate:any=new Date();; maxdate:any=new Date();
  postdata2={'mode':'','language':''};

  
  constructor(
    

    private alertCtrl: AlertController,
    private router: Router,
    public arobj: arrayobject,
    public fb:FormBuilder,
    private api:ApiService,
    private datePipe: DatePipe,
    private dataService: DataService, 
    private translateConfigService: TranslateConfigService
  ) {
      
    this.dataseverity = this.arobj.diplayseverity();

    this.ln=localStorage.getItem('ln');
    for(let i=0;i<=99;i++) this.numberinput[i]=i;
    for(let j=1;j<=24;j++) this.numberinput1[j]=j;
    this.loading=false;
    this.dataService.setOption('datetime',  this.timeofaccident); 
    
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    this.buildform();
    this.offlineform.controls['driver_dead'].setValue(0);
    this.offlineform.controls['driver_injured'].setValue(0);
    this.offlineform.controls['pass_injured'].setValue(0);
    this.offlineform.controls['pass_dead'].setValue(0);
    this.offlineform.controls['ped_injured'].setValue(0);
    this.offlineform.controls['ped_dead'].setValue(0);

   }
   public resetaccident(){
  
    this.offlineform.controls['mod_severity'].setValue('');
    this.offlineform.controls['lname'].setValue('');
    this.offlineform.controls['vehiclecnt'].setValue('');
    this.offlineform.controls['driver_dead'].setValue(0);
    this.offlineform.controls['driver_injured'].setValue(0);
    this.offlineform.controls['pass_injured'].setValue(0);
    this.offlineform.controls['pass_dead'].setValue(0);
    this.offlineform.controls['ped_injured'].setValue(0);
    this.offlineform.controls['ped_dead'].setValue(0);
  }
    ngOnInit() {
      this.date = new Date();
  
      var d = new Date();
      var mm=''+d.getMinutes();
      if (mm.toString().length == 1) { mm = "0" + mm;  }
      this.acctime=d.getHours()+":"+mm;  console.log("ctime "+this.acctime);
  
  
      
      this.mindate.setDate( this.date.getDate() - 4 ); console.log(this.mindate);
      this.mindate= this.datePipe.transform(this.mindate, 'yyyy-MM-dd'); console.log(this.maxdate);
      this.maxdate= this.datePipe.transform(this.maxdate, 'yyyy-MM-dd'); console.log(this.maxdate);
      this.accdate=this.datePipe.transform(this.date, 'yyyy-MM-dd');
  
    }
    public buildform(){
      this.offlineform = this.fb.group({
       
        lname: ['', [Validators.required,Validators.maxLength(100)]],
        mod_severity: ['', [Validators.required]],
        vehiclecnt:['',[Validators.required]],
        driver_dead: ['', [Validators.required]],
        driver_injured: ['', [Validators.required]],
        pass_injured: ['', [Validators.required]],
        pass_dead: ['', [Validators.required]],
        ped_injured: ['', [Validators.required]],
        ped_dead: ['', [Validators.required]],
  
      })
    }
  public addaccident()
  {

    
    

    this.isSubmitted = true;
    if (!this.offlineform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      
      this.isLoading = true;
      this.local_acc_model=new mod_accident();
      this.local_acc_model.lat='latt';
      this.local_acc_model.lon='lon';
      this.local_acc_model.lname=this.offlineform.controls['lname'].value;
      this.local_acc_model.mvalue_date_time= this.datetime;
      this.local_acc_model.mvalue_vcount =this.offlineform.controls['vehiclecnt'].value;
      this.local_acc_model.mvalue_severity=this.offlineform.controls['mod_severity'].value;
      
      this.local_acc_model.driver_dead=this.offlineform.controls['driver_dead'].value;
      this.local_acc_model.driver_inj=this.offlineform.controls['driver_injured'].value;
      this.local_acc_model.pass_inj=this.offlineform.controls['pass_injured'].value;
      this.local_acc_model.pass_dead=this.offlineform.controls['pass_dead'].value;
      this.local_acc_model.ped_inj=this.offlineform.controls['ped_injured'].value;
      this.local_acc_model.ped_dead=this.offlineform.controls['ped_dead'].value;

      this.offlinedata=localStorage.getItem('offline');

    if(this.offlinedata==null || this.offlinedata=='0')
    {

        this.router.navigate(['/acctabs/tab1/offmedia']);
        localStorage.setItem('offline', JSON.stringify(this.local_acc_model));
    }
    else
    {
      
      alert('Please move existing data to online..');
      return false;         
      
    }

      

  
  
    }
  }
  get errorControl() {
    return this.offlineform.controls;
  }
}
