import { Component, Input, OnInit } from '@angular/core';
import { model_driverinfo } from '../../../models/model_driverinfo';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-masterupdate',
  templateUrl: './masterupdate.component.html',
  styleUrls: ['./masterupdate.component.scss'],
})
export class MasterupdateComponent implements OnInit {

 /* @Input("tableName") tableName: any;
  @Input("id") id: any;
  @Input("en") en: any;
  @Input("ta") ta: any;
  @Input("hi") hi: any;
  @Input("te") te: any;
  @Input("kn") kn: any;
  @Input("mr") mr: any;
  @Input("asm") asm: any;*/
  @Input("selecteddata") selecteddata: any;
  @Input("tableName") tableName: any;
  @Input("ln") ln: any;


  isLoading: boolean = false;

  constructor(private modalctrl: ModalController,
    private api: ApiService, private alertCtrl: AlertController,) { }

  ngOnInit() { }

  closeModal() {
    this.modalctrl.dismiss(false);
  }

 

  updateColumn() {
    this.isLoading = true;
    let postDate = {
      mode: 'updateData',
      table:this.tableName,
      updatedata:this.selecteddata,
      ln:this.ln 
    }

    this.api.post('mastertables', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('updated');
        //alert("Update successfully");
        this.modalctrl.dismiss(true);
      }
      this.isLoading = false;
    });
  }

  humanize(str) {
    str=str.substring(3);
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

}
