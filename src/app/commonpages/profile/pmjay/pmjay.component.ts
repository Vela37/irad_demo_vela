import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-pmjay',
  templateUrl: './pmjay.component.html',
  styleUrls: ['./pmjay.component.scss'],
})
export class PmjayComponent implements OnInit {

  @Input() pmjayinfo: any;


  constructor(private modalctrl: ModalController, private api:ApiService) { }

  ngOnInit() {

   // console.log(this.pmjayinfo);
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
      mode:'pmjayupdate',
      info:this.pmjayinfo
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
