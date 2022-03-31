import { Component, OnInit } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { UserfeedbacksComponent } from '../../userfeedbacks/userfeedbacks.component';


@Component({
  selector: 'app-feedbackview',
  templateUrl: './feedbackview.page.html',
  styleUrls: ['./feedbackview.page.scss'],
})
export class FeedbackviewPage implements OnInit {
  sending:string;
  receving:string;
  constructor(
    private modalctrl: ModalController
  ) { }

  ngOnInit() {
  }
  async presentModal() 
  {
  
  //  this.sending='udhaya'; 
    const modal = await this.modalctrl.create({
      component: UserfeedbacksComponent,
      componentProps: {
        'suggestions':'udhay'
      }
    });
  
    modal.onWillDismiss().then(dataReturned => {
      this.receving = dataReturned.data;
      console.log('Receive: ', this.receving);

    });
    return await modal.present().then(_ => {
    
    });
  
  }

}
