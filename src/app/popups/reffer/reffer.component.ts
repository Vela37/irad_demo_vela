import { Component, Input, OnInit } from '@angular/core';
import { ApiService} from '../../services/api.service';
import { TranslateConfigService } from '../../translate-config.service'; 
import { AlertController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-reffer',
  templateUrl: './reffer.component.html',
  styleUrls: ['./reffer.component.scss'],
})
export class RefferComponent implements OnInit {
  model = {}
  userName:any;
  
  @Input("hpname") hpname:any;
  @Input("district") district:any;
  @Input("showhp") showhp:any;
  @Input("driverinfo") driverinfo:any;
  @Input("name") name:any;
  @Input("ptype") ptype:any;
  @Input("gender") gender:any;
  @Input("age") age:any;
  @Input("address") address:any;
  @Input("firnumber") firnumber:any;
  @Input("id") id:any;
  
  @Input("patientid") patientid:any;
  @Input("hpid") hpid:any;
  @Input("patientdata") patientdata:any;

  ln:any;
  flag:boolean=true;
  flagtwo:boolean=true;
  options1:any;
  options2:any;
  hpsameornot:string='different_new';
  hpinformation:any;

  nameofhospital:string='Hospital Name';
state:string='State';
hpdistrict:string='District';
hpaddress:string='Hp Address';
hptype:string='Hp Type';
hppincode:string='Hp Pincode';
hppostmorterm:string='--';
ddfacility:string='--';


postdata3={'mode':'','language':'','id':'','crimeno':'','showhp':'','hpname':'','hpid':'','patientid':'','district':'','ptype':'','trancactionid':'','hpsameornot':''};

  constructor(private api:ApiService,private modalctrl: ModalController,
    private altctrls: AlertController
    ) {
    this.ln=localStorage.getItem('ln');
   }
 public loadselection(){
    //alert('call');
        this.postdata3.mode='loaddistrict';
        this.postdata3.id='33';
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
        
            this.options1=success.district;
         
        },
          error => {
          console.log(error);
          } 
          );
      
      }
      
     public selection(postdata3:any){
    
      return this.api.post('datas',postdata3);
    
    }
    public showdistriict(event:any)
    {
     // alert(event.target.value);

      this.postdata3.mode='loadhospital';
      this.postdata3.id=event.target.value;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
         //   this.datacombo=false;
            this.options2=success.hospital;
           
            
         
        },
          error => {
          console.log(error);
          } 
          );

    //  alert('qwwet');
    }
    async presentAlertConfirm() {
      const alert = await this.altctrls.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Do you want give postmorterm request to same hospital?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
        
              this.flag=false;
              this.flagtwo=true;
              this.hpsameornot='different_new';
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              this.flag=true;
              this.flagtwo=false;
              this.hpsameornot='same';
            }
          }
        ]
      });
  
      await alert.present();
    }
    public givereqeusttosamehp(){
//
      this.postdata3.mode='pmrequesttosamehp';
      this.postdata3.id=this.patientid;
      this.postdata3.hpid=this.hpid;
      this.postdata3.trancactionid=this.id;
      
      this.postdata3.ptype=this.ptype;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
      alert('scc');

        },
          error => {
          console.log(error);
          } 
          );
    
      }

    public loadfullhopitaldetails(){
   

      this.postdata3.mode='loadpatientfulldetails';
      this.postdata3.id=this.patientid;
      this.postdata3.hpid=this.hpid;
        this.postdata3.language=this.ln;
        this.selection(this.postdata3).subscribe(
          (success:any) => {
        this.hpinformation=success.hpdata[0].hp_patient;
         this.hpinformation=JSON.parse(this.hpinformation);
       
   
        this.nameofhospital=this.hpinformation.hpname;
        this.state=this.hpinformation.state;
        this.hpdistrict=this.hpinformation.dtname;
        this.hpaddress=this.hpinformation.address;
        this.hptype=this.hpinformation.hospital_type;

        this.hppincode=this.hpinformation.pincode;
        this.hppostmorterm=this.hpinformation.postmortem;
        this.ddfacility=this.hpinformation.ddfacility;

    

        },
          error => {
          console.log(error);
          } 
          );

    }
  ngOnInit() {
  console.log(this.patientdata);
    this.loadselection();
  }
  closemodal()
  {
    this.modalctrl.dismiss();
  }
  logForm() {
    console.log(this.model)
  }
  onSubmit(){
    

      this.postdata3.mode='refferbyhp';
      this.postdata3.ptype=this.ptype;
      this.postdata3.id=this.id;
      this.postdata3.patientid=this.patientdata.id;
      this.postdata3.hpname=this.hpname;
      this.postdata3.district=this.district;
      this.postdata3.hpsameornot=this.hpsameornot;
      console.log(this.postdata3);
     
      //return false;

      this.selection(this.postdata3).subscribe(
        (success:any) => {
         alert(success.msg);   
         this.closemodal(); 
      },
        error => {
        console.log(error);
        } 
        );
  }

}
