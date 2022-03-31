import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-hospitaldocuments',
  templateUrl: './hospitaldocuments.component.html',
  styleUrls: ['./hospitaldocuments.component.scss'],
})
export class HospitaldocumentsComponent implements OnInit {

  image;
  fileType:any;
  filesPath:any;
  fileName:any;

  @Input() userdetails: any;
  @Input() patientdata: any;
  @Input() typeofreport: any;


  constructor(   private modalctrl:ModalController,
    private base64: Base64,
    private api:ApiService,
    private altctrls: AlertController) { }

  ngOnInit() {}
  changeListener($event) : void {
    // this.reportname='wound';
   // console.log($event.detail.value);
    this.filesPath  = $event.detail.value;
    this.fileName   = this.filesPath.substring(this.filesPath.lastIndexOf("/") + 1);
    this.fileType   = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);

  //  alert(this.fileType);

     this.readThis($event.target);
   
   }
   


 readThis(inputValue: any) {
   
   var file = document.querySelector(
     'input[type=file]')['files'][0]

   var myReader:FileReader = new FileReader();
   myReader.onloadend = (e) => {
     this.image = myReader.result;
     this.uploadsigneddocument();
   }
   myReader.readAsDataURL(file);
 }
 uploadsigneddocument() {

    let postDate = {
      mode: 'hospitaldocuments',
      mimetype: this.fileType,
      typeofreport: this.typeofreport,
      patient_id: this.patientdata.id,
      str: this.image
    }
    this.api.post('hospitaldocuments.php', postDate).subscribe((data: any) => {
        alert(data.msg);
        this.closemodal();
    // console.log(data);
 
    });
  }
  closemodal()
  {

    this.modalctrl.dismiss();
  }

}
