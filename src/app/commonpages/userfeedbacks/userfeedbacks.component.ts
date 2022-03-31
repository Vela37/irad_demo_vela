import { Component, OnInit, Input,Output,EventEmitter   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-userfeedbacks',
  templateUrl: './userfeedbacks.component.html',
  styleUrls: ['./userfeedbacks.component.scss'],
})
export class UserfeedbacksComponent implements OnInit {

  @Input() suggestions:string;
  constructor(private modalctrl:ModalController) { }

  ngOnInit() {
  }
          closemodal()
            {
              this.modalctrl.dismiss(this.suggestions);
            }

}


