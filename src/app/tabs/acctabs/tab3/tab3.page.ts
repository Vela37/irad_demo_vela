import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  selectedLanguage:string;
  params:any;
  accid:any;
  segflag:any;

  constructor(
    private translateConfigService: TranslateConfigService,
    private router:Router,
    private api:ApiService,
    private alertController: AlertController,

    ){
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
  }
  
 
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.accid=localStorage.getItem('accid');
    this.funPending();
  }

  data: any;
  disabled_data:any;
  comp_data:any;
  pending_data:any;

  funPending(){
    this.segflag=1; this.data =false;
    
    let postDate={
      mode:"acclist",
      type:"pending"
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      //console.log(data.data); 
      this.pending_data =data.data;  this.data =data.data;
     });

    

  }

  funCompleted(){
    this.segflag=2;  this.data =false;
    let postDate={
      mode:"acclist",
      type:"completed"
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      //console.log(data.data); 
     this.comp_data =data.data; this.data =data.data;
     });
  }

  funDisabled(){

    this.segflag=3;   this.data =false;
    let postDate={
      mode:"acclist",
      type:"disabled"
    }
    this.api.post('acclist',postDate).subscribe((data: any)=>{
      //console.log(data.data); 
      this.disabled_data =data.data; this.data =data.data;
     });
  }


  editAccident(i){

    console.log(i,this.data[i]);
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('accid',this.data[i].accid);
   // this.router.navigate(['/main']); 
  // alert("work in progress");
   this.router.navigate(['/acctabs/tab1']);
    /*this.selacc =
          {
          'accid': 'TN12312399',
          'datetime': '28 Dec 2019 5.30 PM',
          'landmark': 'Anna squar 100 metres.'
          };
          localStorage.setItem('selacc', JSON.stringify(this.pending_data[i])); */
  }

  
  updateAccident(i){

    console.log(i,this.data[i]);
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('accid',this.data[i].accid);

   this.router.navigate(['/acctabsupdate/tab1']);
    
  }


  async  handleButtonClick() {
    const alert = await this.alertController.create({
      header: 'iRAD',
      message: 'Are you Sure want to Delete this Accident?',
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }

  deleteAccident1(i,remarks){



 console.log('delete');
    console.log(i,this.data[i]);

    let postDate={
      mode:"disable",
      id:this.data[i].accid,
      remarks:remarks,
    }
    this.api.post('accview',postDate).subscribe((data: any)=>{
      console.log(data); 
    });

    
  }

  viewAccident(i){

    console.log(i,this.data[i]);
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('selacc', JSON.stringify(this.data[i]));
    localStorage.setItem('accid',this.data[i].accid);
   // this.router.navigate(['/main']); 
  // alert("work in progress");
   this.router.navigate(['/accview']);
    /*this.selacc =
          {
          'accid': 'TN12312399',
          'datetime': '28 Dec 2019 5.30 PM',
          'landmark': 'Anna squar 100 metres.'
          };
          localStorage.setItem('selacc', JSON.stringify(this.pending_data[i])); */
  }


  viewAccidentPDF(i){
    this.router.navigate(['/accview']);
  }

  ionViewWillEnter() {
   /* setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);*/
  }


  async deleteAccident(i) {
    let alert = await this.alertController.create({
      header: 'iRAD',
      message: 'Are you Sure want to Delete this Accident ?',
      inputs: [
        {
          name: 'reason',
          placeholder: 'Reason'
        }
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log(data);
            if (data.reason) {
              this.deleteAccident1(i,data.reason);
            }
            else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  

}