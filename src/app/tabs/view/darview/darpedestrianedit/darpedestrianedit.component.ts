import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-darpedestrianedit',
  templateUrl: './darpedestrianedit.component.html',
  styleUrls: ['./darpedestrianedit.component.scss'],
})

export class DarpedestrianeditComponent implements OnInit {
  @Input() pedestrianinfo: any;

  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {}
  closeModal()  {
    let reply = { 'geninfo':this.pedestrianinfo};
   this.modalctrl.dismiss(reply); 
  // console.log(this.geninfo);
 }
}
