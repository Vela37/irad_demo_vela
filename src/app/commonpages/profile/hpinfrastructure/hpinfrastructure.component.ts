import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";



@Component({
  selector: 'app-hpinfrastructure',
  templateUrl: './hpinfrastructure.component.html',
  styleUrls: ['./hpinfrastructure.component.scss'],
})
export class HpinfrastructureComponent implements OnInit {
  @Input() infrastr: any;

  threedigit:number;
  totalbed:any;
  constructor(private modalctrl: ModalController, private api:ApiService) { }

  ngOnInit() {

   // console.log(this.pmjayinfo);
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
  checkage($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.threedigit = Number(value);       // returns 0


    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {

        value = value.slice(0, 3)

      }
      if (this.threedigit > 125) {

        value = value.slice(0, 2)
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
    }


  }
  closemodal()
  {

    this.modalctrl.dismiss();
  }
  public  onSubmit()
  {
  //alert("dfsdfsdfsd");
    //console.log(this.pmjayinfo);
  //  return false;


    let postdata3={
      mode:'infraupdate',
      info:this.infrastr
    }
    

     this.adddrunkendetails(postdata3).subscribe(
       (success:any) => {
                          alert(success.message);
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
}
