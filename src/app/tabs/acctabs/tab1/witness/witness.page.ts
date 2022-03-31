import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../../services/api.service';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { AlertController,ActionSheetController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateConfigService } from '../../../../translate-config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router } from "@angular/router";
@Component({
  selector: 'app-witness',
  templateUrl: './witness.page.html',
  styleUrls: ['./witness.page.scss'],
})
export class WitnessPage implements OnInit {
  audio:any;
  audio4play:any; audiotype:any; img:any; photo:any;
  witnessname:any; selacc:any;
  witnessgender:any;
  witnessage:any;
  witnessoccupation:any;
  witnessno:any;
  witnessaddress:any;
  witnessinformation:any;
  constructor(
    private alertCtrl: AlertController, private translateConfigService: TranslateConfigService,
    private mediaCapture: MediaCapture, private base64: Base64,private router: Router,
    private api:ApiService,private sanitizer: DomSanitizer,   private camera: Camera, private actionSheetController: ActionSheetController,
  ) { }
  ngOnInit() {
    this.selacc = JSON.parse(localStorage.getItem('selacc')); console.log(this.selacc);

  }
  ionViewDidEnter() {
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
  }
  
  savebutton(){
    let postData={
      mode:'addWitness',
      accid:this.selacc.accid,
      name:this.witnessname,
      gender:this.witnessgender,
      age:this.witnessage,
      occupation:this.witnessoccupation,
      mobileno:this.witnessno,
      address:this.witnessaddress,
      witnessstatement:this.witnessinformation,
      photo:this.photo,
      audio:this.audio4play,
      audiotype:this.audiotype

    };

    this.api.post('witness', postData).subscribe((data: any) => {
      
      console.log(data);
      this.presentAlert(data.error);
      this.router.navigate(["acctabs/tab1"]);

     
    });

console.log('SAVE',postData);
  }

  CloseForm(){
    this.router.navigate(["acctabs/tab1"]);
  }
async selectImage() {



  const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    buttons: [{
      text: 'Use Camera',
      handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA);
      }
    },
    // {
    //     text: 'Gallery',
    //     handler: () => {
    //       //this.openGallery();
    //       //this.browsePhotos(this.camera.PictureSourceType.SAVEDPHOTOALBUM, flag, imgNo);
    //     }
    //   },
    {
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}
takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
    quality: 50,
    //targetWidth: 1280,
    //targetHeight: 1280,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
  // var mainPhotolen=this.restingPlacePhotos.length;
  this.camera.getPicture(options).then(imagePath => {
    // if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //   this.filePath.resolveNativePath(imagePath)
    //     .then(filePath => {            
    //       console.log('1')
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //       this.imageResizer.resize({
    //         uri: correctPath,
    //         quality: 60,
    //         width: 1280,
    //         height: 1280
    //       }).then((filePath: string)=>console.log('FileSize', filePath))
    //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo);

    //     });
    // } 
    //this.resizeImage(imagePath,flag,imgNo);
    this.img = imagePath;
    console.log('IIIMG', this.img);
    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo, this.img);

    this.getBase64StringByFilePath(imagePath)
    .then((res) => {
      //alert('res 64 ' + res); //this.audio=res;
      console.log('getBase64StringByFilePath res',res);
      var base64Only = res.slice(34);
      this.photo = "data:image/jpg;base64," + base64Only;

    });

  });
}


  takeAudio() { 
    let options: CaptureAudioOptions = { limit: 1 ,duration :30 }

    this.mediaCapture.captureAudio(options).then(res => { //alert(JSON.stringify(res))
      
      var afterDot = res[0].name.substr(res[0].name.indexOf('.'));
      this.audiotype = afterDot.split('.').pop();
      console.log("after dot value",this.audiotype);

      var filePath = res[0].fullPath; console.log('filePath',filePath)
      let locurl=res[0].localURL; //alert('loc url '+res[0].localURL);
      this.getBase64StringByFilePath(filePath)
          .then((res) => { //alert('res 64 '+res); //this.audio=res;
            console.log(res);
              var base64Only = res.slice(34);
              
              this.audio="data:audio/mp3;base64,"+base64Only;
              this.audio4play = this.sanitizer.bypassSecurityTrustResourceUrl(this.audio);
              console.log(' this.audio', this.audio);
              //do something with base64 string
          });
  }, (err) => {
    console.log(err);
  });

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

async presentAlert(msg) {
  const alert = await this.alertCtrl.create({
    header: 'iRAD',
    //   subHeader: 'Pedestrian',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

previewimg(){
  
}
}
