import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateConfigService } from '../../../../translate-config.service';
import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-offlinemedia',
  templateUrl: './offlinemedia.page.html',
  styleUrls: ['./offlinemedia.page.scss'],
})
export class OfflinemediaPage implements OnInit {


  selectedLanguage: string;
  isLoading: boolean;
  params: any; video: any = [];
  dataset = { 'mode': '', 'accid': '', 'spot_image': '' };
  validaccid: boolean = true;
  accid: any;

  constructor(private translateConfigService: TranslateConfigService,
    private router: Router,
    private api: ApiService,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    private base64: Base64,
    private sanitizer: DomSanitizer) {
    this.accid = localStorage.getItem('accid'); //this.photos[0] = this.accid;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    if (this.accid != null) {
      this.validaccid = false;
    }
    this.video[0] = '';
  }

  photos: SafeResourceUrl = [];
  photos_us: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  video_us: number[] = [0, 0, 0];
  private interval: any;



  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   // this.createins();
    let mapscreen = localStorage.getItem('mapscreen');
    //let imageData=this.getBase64StringByFilePath('mapscreen.jpg');
    //alert(mapscreen);
    if (mapscreen !== '') {
      this.getBase64StringByFilePath(mapscreen)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          this.photos[0] = "data:image/jpg;base64," + base64Only;

          //  alert('screen '+this.photos[0]);
          this.photos_us[0] = 1;
          this.uploadpicture(0);
          localStorage.removeItem('mapscreen');
          //do something with base64 string
        });
    }
  }
  async takePicture(flag) {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //this.photos[flag] = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
      this.photos[flag] = 'data:image/jpeg;base64,' + imageData;
      this.photos_us[flag] = 1;
      // console.log(this.photos);

    }, (err) => {
      // Handle error
      console.log(err);
    });

  }

  imgSave() {  //this.uploadpicture(0); return;
    let a = 0;

    for (let i = 1; i <= 10; i++) {
      if (this.photos_us[i] >= 1 && this.photos_us[i] != 3) {

        console.log(this.photos_us[i]);
        a = 1;
      }
    }
    if (a = 1) {
      this.interval = setInterval(() => {
        this.checkImgUpload();
      }, 1000);
    } else {

      console.log('clear interval');

      clearInterval(this.interval);
    }
    this.uploadVideo(1);
    this.uploadVideo(2);
    //alert("Images uploaded sucessfully");
  }

  checkImgUpload() {

    this.isLoading = false;

    console.log('checkImgUpload');
    for (let i = 1; i <= 10; i++) {
      if (this.photos_us[i] == 1) {
        this.isLoading = true;
        console.log('upload img ', i);
        this.uploadpicture(i); break;
      }
    }

    // this.uploadVideo(1);
    // this.uploadVideo(2);

    if (this.isLoading == false) {
      clearInterval(this.interval);
      this.router.navigate(['acctabs/tab1']);
      this.isLoading = false;
    }
  }

  uploadpicture(flag) {
    this.photos_us[flag] = 2;

    console.log(this.dataset);

    let postDate = {
      mode: 'imageupload',
      accid: this.accid,
      imageflag: flag,
      image: this.photos[flag]
    }
    // alert(JSON.stringify(postDate));
    this.api.post('imgupload', postDate).subscribe(
      (data: any) => {
        console.log(data);
        this.photos_us[flag] = 3;

      });

  }

  public uploadimg() {

    let postDate = {
      mode: 'updatefir',
      id: '1',
    }
    this.api.post('update', postDate).subscribe((data: any) => {
      console.log(data);

    });

    // return this.api.post('accimages',postdata);
  }


  createins() {

    this.dataset.mode = 'add';
    this.dataset.accid = this.accid;
    this.dataset.spot_image = '000';
    this.uploadimg2(this.dataset).subscribe(
      (success: any) => {

        // alert(success.image);
        // alert(success.imgflag);
        if (success.imgflag == '1') {
          //  alert("show");
          this.validaccid = false;
        }
        else {
          //  alert("hide");
          this.validaccid = true;
        }
      },
      error => {
      }
    );


  }
  public uploadimg2(postdata: any) {

    return this.api.post('addmedia', postdata);
  }

  takeVideo(flag) {

    //alert('video ' + flag);
    // this.setvideo();// return ;

    let options: CaptureVideoOptions = { limit: 1, duration: 10, quality: 0 };
    this.mediaCapture.captureVideo(options).then(res => {


      var filePath = res[0].fullPath;
      //this.locurl=res[0].localURL; //alert('loc url '+res[0].localURL);
      this.getBase64StringByFilePath(filePath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          this.video[flag] = "data:video/mp4;base64," + base64Only;

          this.video_us[flag] = 1;
          //do something with base64 string
        });



    }, (err) => {
      console.log(err);
    });
  }


  uploadVideo(flag) {

    if(this.video_us[flag]==0) return;

    let postDate = {
      mode: 'videoupload',
      accid: this.accid,
      videoflag: flag,
      video: this.video[flag]
    }
    // alert(JSON.stringify(postDate));

    this.video_us[flag] = 2;

    this.api.post('accvideo', postDate).subscribe(
      (success: any) => {

        this.video_us[flag] = 3;
        //console.log(success);
        //alert(success);

      },
      error => {
        this.video_us[flag] = 1;

      }
    );

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

}

