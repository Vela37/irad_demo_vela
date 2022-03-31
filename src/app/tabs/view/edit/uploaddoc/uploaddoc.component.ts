import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-uploaddoc',
  templateUrl: './uploaddoc.component.html',
  styleUrls: ['./uploaddoc.component.scss'],
})
export class UploaddocComponent implements OnInit {


  fileToUpload: File = null;
  previewUrl:any = null;
  fileURL:any;
  
  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  reportname='none';
  
  @Input() flag: string='No';
  @Input() userdetails: any;
  @Input() patientdata: any;
  @Input() typeofreport: any;
  showflag:any='1';

  ImageBaseData:any;
   constructor(
    private modalctrl:ModalController,
    private base64: Base64,
    private api:ApiService,
    private altctrls: AlertController) { }
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
     this.showflag='0';
     let postDate = {
       mode: 'signedoc',
       docname: this.typeofreport,
       state: this.userdetails.state,
       district_code: this.userdetails.district_code,
       station_code: this.userdetails.station_code,
       office_id: this.userdetails.office_id,
       accident_id: this.patientdata.accident_id,
       patient_id: this.patientdata.id,
       mimetype: this.fileType,
       str: this.image
     }
     this.api.post('healthdoc.php', postDate).subscribe((data: any) => {
     alert(data.msg);
     this.closemodal();
     // console.log(data);
     this.showflag='1';
     });
   }
   
  ngOnInit() {}
  closemodal()
  {

    this.modalctrl.dismiss();
  }
    

}

