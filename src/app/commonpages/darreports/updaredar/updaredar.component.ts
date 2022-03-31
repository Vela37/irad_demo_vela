import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-updaredar',
  templateUrl: './updaredar.component.html',
  styleUrls: ['./updaredar.component.scss'],
})
export class UpdaredarComponent implements OnInit {

  fileToUpload: File = null;
  previewUrl:any = null;
  fileURL:any;

  @Input() accid:any;
  @Input() src:any;
  @Input() formreport:any;
  @Input() fulldetails:any;
  @Input() persondetails:any;


  fileType:any;
  filesPath:any;
  fileName:any;

  image;
  reportname='none';
  dataset={

    'mode': '',
    'mimetype': '',
    'accidentid':'',
    'formno': '',
    'persontype':'',
    'refid': '',
    'doctype':'',
    'docname':'',
    'srctypec':'',
    'flag':'',
    'file': '',
  }

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
        this.uploadfir();
      }
      myReader.readAsDataURL(file);
    }
    /*
    uploadsigneddocument() {

       let postDate = {
         mode: 'edar',
         mimetype: this.fileType,
         accident_id: this.accid,
         formno: this.accid,
         persontype: this.accid,
         refid: this.accid,
         doctype: this.accid,
         doc_name: this.accid,
         file: this.image
        }


        this.api.post('edardocuments.php', postDate).subscribe((data: any) => {

         alert(data.msg);
    
        });
     }

    */ 

     public uploadfir() {
       


  this.dataset = {
    mode: 'edar',
    mimetype: this.fileType,
    accidentid: this.accid,
    formno:this.fulldetails.formno,
    persontype:this.persondetails.ptype,
    refid:this.persondetails.id,
    doctype:'general',
    docname:this.formreport,
    srctypec:this.src,
    flag:'1',
    file: this.image
   }

console.log('final--->',this.dataset);
//return false;

   
     
      this.selection(this.dataset).subscribe(
        (success: any) => {
          alert(success.msg);

          this.modalctrl.dismiss();
  
        },
        error => {
          console.log(error);
        }
      );
    }


    public selection(postDate: any) {


     return this.api.post('edardocuments', postDate);
   //   return this.api.darsave('insertdocuments', postDate);
      
    }

 closemodal()
  {

    this.modalctrl.dismiss();
  }
  ngOnInit() {


    console.log(this.persondetails);

  //  alert(this.accid);
   // alert(this.formreport);
  }

}
