import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { HospitaldocumentsComponent } from '../../edit/hospitaldocuments/hospitaldocuments.component';


import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-patientdocument',
  templateUrl: './patientdocument.component.html',
  styleUrls: ['./patientdocument.component.scss'],
})
export class PatientdocumentComponent implements OnInit {

  returnpath: string = "";

  @Input() userdetails: any;
  @Input() patientdata: any;
  @Input() typeofreport: any;

  constructor(
    private modalctrl:ModalController,
    private api:ApiService,
    private fileChooser:FileChooser,
    private iab: InAppBrowser,
    private base64: Base64,
    private file: File,
    private filePath: FilePath
) { }

  ngOnInit() {}
  closemodal() {

    this.modalctrl.dismiss();
  }
  
  public viewdocument(doc)
  {
    let pdfurl = '';
    pdfurl = environment.apiUrl + 'hospitaldocumentview.php?pid=' + this.patientdata.id+'&docname='+doc;
    this.openWithSystemBrowser(pdfurl)  
  }

  
 options: InAppBrowserOptions = {
   location: 'yes',//Or 'no' 
   hidden: 'no', //Or  'yes'
   clearcache: 'yes',
   clearsessioncache: 'yes',
   zoom: 'yes',//Android only ,shows browser zoom controls 
   hardwareback: 'yes',
   mediaPlaybackRequiresUserAction: 'no',
   shouldPauseOnSuspend: 'no', //Android only 
   closebuttoncaption: 'Close', //iOS only
   disallowoverscroll: 'no', //iOS only 
   toolbar: 'yes', //iOS only 
   enableViewportScale: 'no', //iOS only 
   allowInlineMediaPlayback: 'no',//iOS only 
   presentationstyle: 'pagesheet',//iOS only 
   fullscreen: 'yes',//Windows only    
 };
 public openWithSystemBrowser(url: string) {
   let target = "_system";
   this.iab.create(url, target, this.options);
 }
  pickFile(ftype) {
  
    //  alert('hiiiiiiiiiiii');
   
  this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((filePath) => {
        this.returnpath = filePath;
        console.log("Size", this.returnpath);
        let mimetype = filePath.substring(filePath.lastIndexOf('.') + 1);
        console.log("filename", mimetype);

        this.file.resolveLocalFilesystemUrl(this.returnpath).then(file => {
          file.getMetadata((metadata) => {
            let filesize = metadata.size / 1024 / 1024;
            console.log("filesize", filesize);
            if (filesize > 10) {
              alert("Video size is greater than 10 MB");
              console.log("Video size is greater than 10 MB");
            }
            else {

              this.getBase64StringByFilePath(this.returnpath)
                .then((res) => {
                  //alert('res 64 ' + res); //this.audio=res;
                  var base64Only = res.slice(34);

                  console.log("File Base64 ", base64Only);
                  //do something with base64 string

                  let postdata3={
                    mode:'doctpatient',
                    str:base64Only,
                    ftype:ftype,
                    mimetype:mimetype
                  }
                 // console.log(postdata);
                 this.addpatientdocuments(postdata3).subscribe(
                  (success:any) => {
                                     alert(success.msg);
                               //      this.closemodal();
                
             },
                  error => {
                  console.log(error);
                  } 
                  );
            
            });
            }
          }
          )
        });

      })
    })

  }

  public getBase64StringByFilePath(fileURL: string): Promise<string> {

    return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
        resolve(base64File);
      }, (err) => {
        console.log(err);
      });
    })
  }

  async documentupload(typeofreport) 
{
const modal = await this.modalctrl.create({
    component: HospitaldocumentsComponent,
    cssClass: 'halfscreen',
      componentProps: { 
        'patientdata':this.patientdata,
        'userdetails':this.userdetails,
        'typeofreport':typeofreport,
     }
  });
  modal.onWillDismiss().then(dataReturned => {
   // this.loduploaded();
  });
  return await modal.present().then(_ => {
  });
}

  public addpatientdocuments(postdata2:any){
                                               return this.api.post('docupload',postdata2);
                                         }


}
