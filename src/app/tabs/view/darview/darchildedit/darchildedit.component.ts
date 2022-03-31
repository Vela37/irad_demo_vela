import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-darchildedit',
  templateUrl: './darchildedit.component.html',
  styleUrls: ['./darchildedit.component.scss'],
})
export class DarchildeditComponent implements OnInit {
  @Input() passengerinfo: any;

  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {}
  closeModal()  {
    let reply = { 'geninfo':this.passengerinfo};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
}
