import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-darpassengeredit',
  templateUrl: './darpassengeredit.component.html',
  styleUrls: ['./darpassengeredit.component.scss'],
})
export class DarpassengereditComponent implements OnInit {
  @Input() passengerinfo: any;

  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {}
  closeModal()  {
    let reply = { 'geninfo':this.passengerinfo};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
}
