import { Component, Input, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-addentryuser',
  templateUrl: './addentryuser.component.html',
  styleUrls: ['./addentryuser.component.scss'],
})
export class AddentryuserComponent implements OnInit {


  @Input() flag: string = 'No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  mobnr:number;

  loginid:any;
  emailid:any;
  mobilenr:any;
  Password:any;
  selectedLanguage: string; params: any;
  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    private translateConfigService: TranslateConfigService,
    private altctrls: AlertController) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  public  onSubmit()
  {
    let postdata3={
      mode:'addentryhpusers',
      loginid:this.loginid,
      emailid:this.emailid,
      mobilenr:this.mobilenr,
      password:this.Password,
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

  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      this.mobnr = Number(value);  
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
  //     this.addhospForm.controls['mobilenumber'].setValue(9632587414);
     
    }
    
  this.mobilenr=value;
    //  this.addhospForm.controls['mobilenumber'].setValue(this.mobnr);
  }

  public adddrunkendetails(postdata2:any){

    return this.api.post('usermanagement',postdata2);
  
  }
  ngOnInit() {}
  closemodal() {

    this.modalctrl.dismiss();
  }

}
