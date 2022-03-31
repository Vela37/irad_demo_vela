import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular'; 

@Component({
  selector: 'app-accimgview',
  templateUrl: './accimgview.component.html',
  styleUrls: ['./accimgview.component.scss'],
})
export class AccimgviewComponent implements OnInit {
  @Input() mediainfo:any;

  sliderOpts={
    zoom: {
      maxRatio:1
    }
  }
  constructor(private modalctrl: ModalController,) {
   }

  ngOnInit() {
    console.log("ZoomImg",this.mediainfo);
  }
 
  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
}
