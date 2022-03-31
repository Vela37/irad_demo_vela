import { Component, OnInit, Input } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
@Component({
  selector: "app-accsubmit",
  templateUrl: "./accsubmit.component.html",
  styleUrls: ["./accsubmit.component.scss"],
})
export class AccsubmitComponent implements OnInit {
  
  constructor(private modalctrl: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalctrl.dismiss();
  }

  accsubmittosho(){
    
  }
}
