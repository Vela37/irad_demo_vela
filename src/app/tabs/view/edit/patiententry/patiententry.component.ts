import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../../../translate-config.service';

@Component({
  selector: 'app-patiententry',
  templateUrl: './patiententry.component.html',
  styleUrls: ['./patiententry.component.scss'],
})
export class PatiententryComponent implements OnInit {

  
  shortgrd: string = 'S/O';guardinaname: string = 'Relation Name';
  age: number;

  @Input() flag: string = 'No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  arr_obj=[
    { 
      "Male": {
          "set1": [
              {id:"S/o",name:"Father"},
              {id:"C/o",name:"Guardian"}
          ]
        
      }, 
       "Female": {
          "set2": [
            {id:"D/o",name:"Father"},
            {id:"W/o",name:"Husband"},
            {id:"C/o",name:"Guardian"}

          ]
      },
      "TG": {
        "set3": [
          {id:"S/o",name:"Father"},
      //    {id:"W/O",name:"Husband"},
          {id:"C/o",name:"Guardian"}
        ]
    } 
  }];
  prfixcont:any; 
  postdata2 = { 'mode': '', 'language': '' };
  options5:any;
  options4:any;
  selectedLanguage: string; params: any;
  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    private translateConfigService: TranslateConfigService,
    private altctrls: AlertController) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  
  ngOnInit() {
    this.loadselection();
  //   console.log("userdetails", this.userdetails);
  //   console.log("patientdata", this.patientdata);
  //   alert(this.patientdata.gurdian_type);
    if(this.patientdata.gurdian_type=='S/O')
    {
      this.guardinaname = 'Father Name';
    }
    else
    {
      this.guardinaname = 'Husband Name';;
    }
            if(this.patientdata.gender=='Male')
            {
              this.prfixcont=this.arr_obj[0].Male.set1;
            }
            else if(this.patientdata.gender=='Female')
            {
              this.prfixcont=this.arr_obj[0].Female.set2;
            }
            else if(this.patientdata.gender=='TG')
            {
              this.prfixcont=this.arr_obj[0].TG.set3;
            }
            else
            {
              this.prfixcont=this.arr_obj[0].Male.set1;
            }

  }
  checkage($event: KeyboardEvent) {
    // event.preventDefault();
     let value = (<HTMLInputElement>event.target).value;
 
     this.age = Number(value);       // returns 0
 
 
     if ($event.target) {
       if (value == "") {
         value = value.slice(0, 0);
       }
 
       if (value.length > 3) {
 
         value = value.slice(0, 3)
 
       }
       if (this.age > 125) {
 
         value = value.slice(0, 2)
       }
 
       (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
     }
 
 
   }
  public loadselection() {

  this.postdata2.mode = 'healthdata';
    this.postdata2.language = 'en';
    this.selection(this.postdata2).subscribe(
      (success: any) => {

       
        this.options5 = success.modeoftranport;
        this.options4 = success.severity;

      },
      error => {
        console.log(error);
      }
    );
  }
  public selection(postdata2: any) {

    return this.api.post('datas.php', postdata2);

  }

  checkdigits($event: KeyboardEvent,cnt) {
    let value = (<HTMLInputElement>event.target).value;
    //console.log(value);

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > cnt) {
        value = value.slice(0,cnt)
      }
    (<HTMLInputElement>event.target).value = value;

  }
}
  closemodal() {

    this.modalctrl.dismiss();
  }
  fixguradinalabel($event){

    if($event.target.value=='S/O'){
    this.guardinaname='Father Name';
    }else if($event.target.value=='D/O'){
     this.guardinaname='Father Name';
    }
    else if($event.target.value=='W/O'){
     this.guardinaname='Husband Name';
    }
    else if($event.target.value=='C/O'){
     this.guardinaname='Guardian Name';
    }
 
   }
   fixprefix($event) {
 
     this.prfixcont=null;
 
                                     if($event.target.value=="Male")
                                     {
                                       this.prfixcont=this.arr_obj[0].Male.set1;
                                       //this.guardinaname=this.isdfds;
                                     }
                                     else if($event.target.value=="Female")
                                     {
                                       this.prfixcont=this.arr_obj[0].Female.set2;
                                     }
                                     else if($event.target.value=="TG")
                                     {
                                       this.prfixcont=this.arr_obj[0].TG.set3;
                                     }
                                     else
                                     {
                                       this.prfixcont=this.arr_obj[0].Male.set1;
                                     }
 
 
   }
     filllabel($event) {
     if ($event.target.value == 'S/O') {
       this.guardinaname = 'Father Name';
       this.shortgrd = 'S/O';
     }
     else {
       this.guardinaname = 'Husband Name';;
       this.shortgrd = 'W/O';
     }
   }
 

  public  onSubmit()
  {
    let postdata3={
      mode:'patient_information',
      info:this.patientdata
    }
    

     this.adddrunkendetails(postdata3).subscribe(
       (success:any) => {
                          alert(success.msg);
                          this.closemodal();
     
  },
       error => {
       console.log(error);
       } 
       );

  }
  public adddrunkendetails(postdata2:any){

    return this.api.post('datas.php',postdata2);
  
  }
  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      this.patientdata.contact_number=value;
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
     // this.healthform.controls['contact_number'].setValue(value);
    }

  }
  editflagchage() {
    this.flag = 'yes';
  }

  saveModal() {
    console.log(this.patientdata);
    let postDate = {
      mode: 'addPatientdata',
      user: this.patientdata
    }
    this.api.post('usermanagement', postDate).subscribe((data: any) => {
      console.log(data);
    });
  }


}

