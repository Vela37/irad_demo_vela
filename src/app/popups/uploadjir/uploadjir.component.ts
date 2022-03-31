import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-uploadjir',
  templateUrl: './uploadjir.component.html',
  styleUrls: ['./uploadjir.component.scss'],
})
export class UploadjirComponent implements OnInit {
  fileToUpload: File = null;
  previewUrl:any = null;
  fileURL:any;
  
  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  reportname='none';
  @Input() vehilce: any;
  @Input() accid: any;
  showflag:any='1';


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
   ssuploadsigneddocument(){
     console.log(this.vehilce);
     console.log(this.accid);

   }
   
   uploadsigneddocument() {
    this.showflag='0';
    let postDate = {
      mode: 'signedjir',
      vehilce: this.vehilce,
      accid: this.accid,
      str: this.image
    }
    this.api.post('mvi.php', postDate).subscribe((data: any) => {
    //alert(data.sts);
    if(data.sts=='1')
    {
      this.closemodal();
    
    }
    // console.log(data);
    this.showflag='1';
    });
  }
   
 readThis(inputValue: any) {
   
   var file = document.querySelector(
     'input[type=file]')['files'][0]

   var myReader:FileReader = new FileReader();
   myReader.onloadend = (e) => {
     this.image = myReader.result;
   //  console.log(this.image);
     this.uploadsigneddocument();
   }
   myReader.readAsDataURL(file);
 }
 closemodal()
 {

   this.modalctrl.dismiss();
 }
  ngOnInit() {}

}
