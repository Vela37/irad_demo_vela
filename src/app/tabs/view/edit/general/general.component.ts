import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import {model_geninfo }  from '../../../../models/model_geninfo';
import {ApiService} from '../../../../services/api.service';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  
  selectedLanguage:string; params: any;

  @Input() geninfo:model_geninfo; accmin:any=new Date(); accmax:any=new Date(); repmax:any=new Date();
  postdata2={'mode':'','language':''};
  ln:any; maxdate: any = new Date();
  countdead:boolean=false;
  countinj:boolean=false;
  vehicleInput:any[]=[];
  numberInputDriver:number[]=[]; 
  options1:any;
  options2:any;
  options3:any;
  options4:any;
  options5:any;
  options6:any;
  options7:any;
  options8:any;
  
  sev:any;
  numberinput:number[]=[];
  
  isLoading:boolean=false; 
  others2:any;
  datacombo=true;
  postdata3={'mode':'','language':''};

  constructor(private modalctrl:ModalController,
    private api:ApiService,private alertCtrl: AlertController,
    private datePipe: DatePipe,
    ) {
    this.ln=localStorage.getItem('ln');
    this.loadseverity();
    
    for(let i=0;i<=500;i++) this.numberinput[i]=i;
    for(let j=1;j<=50;j++){ 
      this.vehicleInput[j]=j;
     }
   }



  closeModal()  {
     let reply = { 'geninfo':this.geninfo};
    this.modalctrl.dismiss(reply); 
   // console.log(this.geninfo);
  }

  cancelmodal()
  {
    //this.histroy = { accid:this.accid,nov:this.nov}; 

    this.modalctrl.dismiss();
  }
  ngOnInit() {
    console.log('edit geninfo',this.geninfo);
    this.loadselection();
    //this.numberInputDriver[0]=this.geninfo.vehicles_count;
    this.numberInputDriver=[]; //this.numberInputDriver[0]=0;
    for(let j=0;j<=this.geninfo.vehicles_count;j++){ this.numberInputDriver[j]=j; }

    

    for(let j=1;j<= (+this.geninfo.vehicles_count)+50;j++){ 
      this.vehicleInput[j]=j;
     }
     let date = new Date(); 
     this.geninfo.datetime = new Date(new Date(this.geninfo.datetime).getTime() - date.getTimezoneOffset()*1).toISOString();

     this.geninfo.repdatetime = new Date(new Date(this.geninfo.repdatetime).getTime() - date.getTimezoneOffset()*1).toISOString();


     this.accmin=new Date(this.geninfo.accdate);   console.log('this.accmin : ',this.accmin) ; 
     this.accmin.setDate(this.accmin.getDate() - 1);
     this.accmin = this.datePipe.transform(this.accmin, 'yyyy-MM-dd'); console.log(this.accmin);

     this.accmax=new Date(this.geninfo.accdate);   console.log('this.accmax : ',this.accmax) ; 
     this.accmax.setDate(this.accmax.getDate() + 1);
     this.accmax = this.datePipe.transform(this.accmax, 'yyyy-MM-dd'); console.log(this.accmax); 

     this.repmax=new Date(this.geninfo.accdate);   console.log('this.accmax : ',this.repmax) ; 
     this.repmax.setDate(this.repmax.getDate() + 20);
     this.repmax = this.datePipe.transform(this.repmax, 'yyyy-MM-dd'); console.log(this.repmax); 

     this.maxdate = this.datePipe.transform(this.maxdate, 'yyyy-MM-dd'); console.log(this.maxdate);

  }
  saveModal()  {
    //let data= { 'geninfo':'geninfo'};
    console.log(this.geninfo);

    var dateObj = new Date(this.geninfo.datetime+'');
    let accdatetime = dateObj;
    console.log("dateObj1", dateObj);

    var dateObj = new Date(this.geninfo.repdatetime+'');
    let repdatetime = dateObj;
    console.log("dateObj2", dateObj);

    console.log('get time', accdatetime.getTime(),'>',repdatetime.getTime(),accdatetime.getTime()>repdatetime.getTime() );

    // if (accdatetime.getTime() > repdatetime.getTime()) {
    //   console.log(1);
    //   alert("Reporting Date Time must be Greater than Accident Time");
    //   return false;
    // }


    if(this.geninfo.vehicles_count<(+this.geninfo.driver_dead+ +this.geninfo.driver_inj)){
      console.log(this.geninfo.vehicles_count+'<'+(+this.geninfo.driver_dead+ +this.geninfo.driver_inj))
      alert("Vehicle count must be greater than or equal to driver(s) ");
      return false;
    }

    if(this.geninfo.severity!=1 && (this.geninfo.driver_dead!=0 || this.geninfo.pass_dead!=0 || this.geninfo.ped_dead!=0)){
      alert("Some one is dead so severity myst be Fatal");
      return false;
    }

    if(this.geninfo.severity==1 && (this.geninfo.driver_dead==0 && this.geninfo.pass_dead==0 && this.geninfo.ped_dead==0)){
      alert("No one is Dead so severiy should not be Fatal");
      return false;
    }

    console.log(this.geninfo);

    this.updateGeninfo()

   this.modalctrl.dismiss(true);
 }

  updateGeninfo(){
    this.isLoading=true; 
    let postDate={
      mode:'geninfo',
      geninfo:this.geninfo
    }
    this.api.post('update',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
        this.modalctrl.dismiss(true);
      }
      this.isLoading=false; 
    });
  }



  public loadseverity(){
    this.postdata2.mode='severity'; console.log('------------------ data call-----------');
    this.postdata2.language=this.ln;
    this.severity(this.postdata2).subscribe(
      (success:any) => {
        this.sev=success.data;
        console.log('severity',this.options1); 
    },
      error => {
      console.log(error);
      } 
      );
   }
   public severity(postdata2:any){

    return this.api.post('datas',postdata2);
  
  }

  public loadselection(){
    this.postdata3.mode='generaldata';
    this.postdata3.language=this.ln;
    this.intial(this.postdata3).subscribe(
      (success:any) => {
        this.datacombo=false;
        this.options1=success.collison;
        this.options2=success.collnature;
        this.options3=success.intial;
        this.options4=success.localbody;
  
        this.options5=success.weather;
        this.options6=success.roadlight;
        this.options7=success.accspot;
        this.options8=success.roadclass;
    },
      error => {
      console.log(error);
      } 
      );
   }

   public intial(postdata3:any){

    return this.api.post('datas',postdata3);
  
  }

  public getSeverity(e){
    console.log(e.detail.value);
    if (e.detail.value>1){
      this.countdead=true; 

      this.geninfo.driver_dead=0;
      this.geninfo.pass_dead=0;
      this.geninfo.ped_dead=0;

    }else{
      this.countdead=false;
    }
    if (e.detail.value==5){
      this.countinj=true; 

      this.geninfo.driver_inj=0;
      this.geninfo.pass_inj=0;
      this.geninfo.ped_inj=0;
      
    }else{
      this.countinj=false;
    }
  }

  public vehicleInputChange(e,obj){
    console.log(e); console.log(obj);
    if(e.detail.value=='more'){ console.log('in');
      let l=obj.length; console.log(l);
      for(let j=l;j<=l+25;j++){  this.vehicleInput[j]=j; 
       
      }
      console.log(obj);

      this.geninfo.vehicles_count=0;
       
    }else{

    this.numberInputDriver=[]; this.numberInputDriver[0]=0;
    for(let j=0;j<=e.detail.value;j++){ this.numberInputDriver[j]=j; }
    //this.geninfo.driver_inj=0;
    //this.geninfo.driver_dead=0;

    }
  }

  public getvalue2(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="0")

   { 
      this.presentPrompt2();
   }
    
}
public getvalue3(event:any)
{

   // alert(event.target.value);
   if(event.target.value=="0")

   { 
      //this.presentPrompt3();
   }
    
}
async presentPrompt2(){
  const alert = await this.alertCtrl.create({
    inputs: [
     
      {
        name: 'username',
        placeholder: 'Others',
      
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log(data.username);
          this.others2=data.username;
        }
      },
    ]
 });
 await alert.present(); 
}

}
