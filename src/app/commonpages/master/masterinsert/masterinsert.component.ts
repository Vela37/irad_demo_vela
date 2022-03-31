import { Component, Input, OnInit } from '@angular/core';
import { model_driverinfo } from '../../../models/model_driverinfo';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-masterinsert',
  templateUrl: './masterinsert.component.html',
  styleUrls: ['./masterinsert.component.scss'],
})
export class MasterinsertComponent implements OnInit {
  @Input("tableName") tableName: any;

  inputdata= {
    en: '',
    ta: '',
    hi: '',
    te: '',
    kn: '',
    mr: '',
    asm:'',
    od:'',
    pa:'',
    ml:'',
    dispid:''
  }
  
  isLoading: boolean = false;

  constructor(private modalctrl: ModalController,
    private api: ApiService, private alertCtrl: AlertController,) { }

  ngOnInit() { }

  closeModal() {
    this.modalctrl.dismiss();
  }

  insertSingleRecord() {
    this.insertRecord();
  }

  insertRecord() {
    this.isLoading = true;
    let postDate = {
      mode: 'insertData',
      table:this.tableName,
      inputdata:this.inputdata
    }

    this.api.post('mastertables', postDate).subscribe((data: any) => {
      console.log(data);
      if (data.flag == true) {
        console.log('Inserted');
        //alert("Insert successfully");
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
