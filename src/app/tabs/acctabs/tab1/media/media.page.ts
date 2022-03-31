import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateConfigService } from '../../../../translate-config.service';
import { ApiService } from '../../../../services/api.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage'; 
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { model_img } from '../../../../models/model_img'
import { Network } from '@ionic-native/network/ngx';
//import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { ActivatedRoute } from '@angular/router';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {

  selectedLanguage: string;
  isLoading: boolean;
  params: any; video: any = [];
  dataset = { 'mode': '', 'accid': '', 'spot_image': '' };
  validaccid: boolean = true;
  accid: any; selacc: any;
  offlinedata: boolean = false;
  dept: any = 0;
  restingPlacePhotos: any = []; restingPlacePhotos_size: any = [];
  damageToVehiclePhotos: any = [];
  damageToPropertyPhotos: any = [];
  obstructionOfObjectsPhotos: any = [];
  junctionTypePhotos: any = [];
  roadSurfacePhotos: any = [];
  skidMarksPhotos: any = [];
  surroundingsPhotos: any = [];
  contributedAccidentPhotos: any = [];
  otherimg1Photos: any = [];
  otherimg2Photos: any = [];
  restingPlacePhotosString: any = [];
  damageToVehiclePhotosString: any = [];
  damageToPropertyPhotosString: any = [];
  obstructionOfObjectsPhotosString: any = [];
  junctionTypePhotosString: any = [];
  roadSurfacePhotosString: any = [];
  skidMarksPhotosString: any = [];
  surroundingsPhotosString: any = [];
  contributedAccidentPhotosString: any = [];
  otherimg1PhotosString: any = [];
  otherimg2PhotosString: any = [];
  totalPhotos: any = [];
  myRand: number;
  imgVer: any;
  photoPath: any;
  mobiledevice: boolean; imgqty: number = 100;
  pickedImage: any;
  loop: any = 0;
  videoflag: any = 0;
  imgobj: any[][] = [];

  loader: boolean = false;
  value: number;
  offlineflag = false;
  mobile_platform = true;
  disable_btn = false;
  buffer: number;

  img_type: any=0;

  constructor(private translateConfigService: TranslateConfigService,
    private router: Router, private alertCtrl: AlertController,
    private api: ApiService,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    private base64: Base64,
    private actionSheetController: ActionSheetController,
    private filePath: FilePath,
    private webview: WebView,
    private file: File,
    private storage: Storage,
    private plt: Platform,
    private localdb: LocalstorageService,
    //private imageResizer: ImageResizer,
    private toastController: ToastController,
    public loadingController: LoadingController,
    private network: Network,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params => {
        console.log("img_type receiving ---",params)
        this.img_type = params["img_type"];
    });

    // this.selacc=JSON.parse(localStorage.getItem('selacc'));
    // this.accid =this.selacc.accid;
    // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // if (this.accid != null) {
    //   this.validaccid = false;
    // }
    this.video[0] = '';


    const userData: {
      userid: string;
      name: string;
      role: string;
      dept: string;
      state_code: string;
      district_code: string;
      station_code: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    this.dept = userData.dept; console.log('dept', userData)
    for (let i = 1; i <= 11; i++) {
      // this.imgobj[i][1]=new model_img();
      this.imgobj[i] = [];
      for (var j: number = 1; j < 4; j++) {
        this.imgobj[i][j] = new model_img();
      }
    }
    console.log("Constructor", this.imgobj);
  }

  photos: SafeResourceUrl = [];
  img: SafeResourceUrl = [];
  photos_us: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  video_us: number[] = [0, 0, 0, 0, 0]; 
  private interval: any;

  checkNetwork() {
    if (this.network.type != "none") {
      console.log("TRUE")
      this.offlineflag = false;
      return true;
    }
    else {
      console.log("FALSE")
      this.offlineflag = true;
      return false;
    }
  }

  ionViewWillLeave() {
    this.hideLoader();
  }



  ngOnInit() {

    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

    this.checkNetwork();
    this.mobile_platform = this.localdb.checkPlatform();
    console.log("Mobile or not", this.mobile_platform);
    if (this.mobile_platform == false) {
      this.disable_btn = true;
      console.log("Disable btn", this.disable_btn);
    }
    if (localStorage.getItem('imgqty') == null) {

      this.imgqty = 100;
    } else {
      this.imgqty = parseInt(localStorage.getItem('imgqty'));
    }
    console.log("IMG QUANTITY", this.imgqty);

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // this.createins();
    if(this.checkNetwork){
    if(this.mobile_platform==true){
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
  
            //do something with base64 string
          });
      }
    }
  }
   
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    this.checkNetwork();
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;
    this.offlinedata = this.selacc.offlinedata;
    console.log('ionViewDidEnter', this.accid);
    console.log('OFFLINE DATA', this.offlinedata);
    console.log('/////', JSON.parse(localStorage.getItem('selacc')))
    this.mobiledevice = this.localdb.checkPlatform();
  }


  async previewimg(flag, imgNo) {

    this.photoPath = this.imgobj[flag][imgNo].image;

    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      //    subHeader: 'Passenger',

      message: `<img src="${this.photoPath}" alt="img" class='imginalert' style='width: 100%; height: 100%;border: 2px solid #848383;border-radius: 5px;' >`,
      buttons: [
        {
          text: 'RETAKE',
          handler: () => {
            this.selectImage(flag, imgNo)
          }
          // role: 'cancel',
        },
        {
          text: 'CONFIRM',

        },
      ],
    });

    await alert.present();

  }

  async selectImage(flag, imgNo) {

    console.log("Image Type Selecting"+this.img_type);
    this.img_type=JSON.parse(localStorage.getItem('img_type'));
    console.log("img_type local---", this.img_type);

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA, flag, imgNo);
        }
      },{
          text: 'Gallery',
          handler: () => {
            this.openGallery(flag, imgNo);
            //this.browsePhotos(this.camera.PictureSourceType.SAVEDPHOTOALBUM, flag, imgNo);
          }
        },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
/*
    if (this.img_type != 1) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, flag, imgNo);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } else if (this.img_type == 1) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Gallery',
          handler: () => {
            this.openGallery(flag, imgNo);
            //this.browsePhotos(this.camera.PictureSourceType.SAVEDPHOTOALBUM, flag, imgNo);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    } */

  }

  openGallery(flag, imgNo) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

     let imgsize= this.checkImageSize(base64Image);
     console.log(imgsize);

     if(imgsize > 2048) { alert('Image size should be less than 2 MB '); return false; }

      if (imgNo == 4) {
        for (let i = 1; i <= 3; i++) {
          if (this.imgobj[flag][i].image == null) {
            this.imgobj[flag][i].image = base64Image;
            this.imgobj[flag][i].filepath = base64Image;
            break;
          }
        }
      }
      else {
        this.imgobj[flag][imgNo].image = base64Image;
      }
    }, (err) => {
      // Handle error
    });
  }


  browsePhotos(sourceType: PictureSourceType, flag,imgNo) {

    const options = {
      sourceType: sourceType,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: this.imgqty,
      // saveToPhotoAlbum: false,
      // correctOrientation: true
    }

    // const options = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   sourceType: sourceType,
    //   mediaType: this.camera.MediaType.VIDEO
    // }

    // var options: CameraOptions = {
      // quality: this.imgqty,
      // //targetWidth: 1280,
      // //targetHeight: 1280,
      // sourceType: sourceType,
      // saveToPhotoAlbum: false,
      // correctOrientation: true
    // };

    this.camera.getPicture(options).then(imagePath => {
      console.log("ImgPath", imagePath);

      this.img = imagePath;
      console.log(' BROWSE IIIMG', this.img);
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      console.log('currentName',currentName);
      console.log('correctPath',correctPath);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo, this.img);


      // this.getBase64StringByFilePath(filePath)
      //   .then((res) => {
      //     //alert('res 64 ' + res); //this.audio=res;
      //     var base64Only = res.slice(34);
      //     this.video[flag] = "data:video/mp4;base64," + base64Only;


      //     this.video_us[flag] = 1;
      //     console.log("Video Length 0", this.video[0]);
      //     console.log("Video Length 1", this.video[1]);
      //     console.log("Video Length 2", this.video[2]);
      //     console.log("Video Length 3", this.video[3]);
      //     console.log("Video Length ", this.video.length);



      //     //do something with base64 string
      //   });

      // // var base64Only = imagePath.slice(34);
      // // this.video[flag] = "data:video/mp4;base64," + base64Only;
      // console.log("Gallery video", this.video[3]);
      // console.log("Gallery video length", this.video.length);

      // this.video_us[flag] = 1;

    });


  }



  takePicture(sourceType: PictureSourceType, flag, imgNo) {
    var options: CameraOptions = {
      quality: this.imgqty,
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
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(flag), flag, imgNo, this.img);

    });
  }



  createFileName(flag) {
    this.myRand = this.random();
    //var p_val:number=++mainPhotolen
    //this.imgVer=p_val;
    //console.log("TEST//////////"+p_val);
    var d = new Date(),
      n = d.getTime()
    var img_name = this.myRand + "-" + flag,
      newFileName = img_name + ".jpg";
    console.log("IMGNAME" + newFileName)

    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName, flag, imgNo, img) {
    console.log("newFileName///",newFileName);
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName, flag, imgNo, img);
      //return res_path
    }, error => {
      console.log(error);
      this.presentToast('Error while storing file.');
    });
  } 

  updateStoredImages(name, flag, imgNo, img) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      console.log("FILEPATH" + filePath)
      let resPath = this.pathForImage(filePath);
      this.photos[flag] = resPath;
      this.photos_us[flag] = 1;
      this.totalPhotos.push(resPath);
      console.log('accid', this.accid, 'resPath', resPath);
      console.log('imgNO', imgNo);
      // if (imgNo > 2) {
      console.log("Normal");
      console.log("FLAG IMG NO", flag, imgNo);
      console.log("IMG OBJ_-_-_-", this.imgobj);
      if (imgNo == 4) {
        for (let i = 1; i <= 3; i++) {
          if (this.imgobj[flag][i].image == null) {
            this.imgobj[flag][i].image = resPath;
            this.imgobj[flag][i].filepath = img;
            break;
          }
        }
      }
      else {
        this.imgobj[flag][imgNo].image = resPath;
      }
      console.log("IMG 1 CHECK", this.imgobj);
      this.restingPlacePhotos.push(resPath);
      this.restingPlacePhotosString.push(img);

      if(this.offlinedata ==true){
        if (this.mobiledevice) {
          this.localdb.insertingImgRow(flag, this.accid, img);
        }
      }
      console.log("RESPATH-" + img)
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      //this.Path=converted;
      const safeImg = this.sanitizer.bypassSecurityTrustUrl(converted);
      console.log("CONVERTED-", converted)
      console.log("SAFEIMG" + safeImg)
      return converted;
    }
  }

  saveLoop() {
    if (this.localdb.checkPlatform()) {
      if (this.offlinedata != true) {
        this.showLoader();
        this.videoLoop();
      }
      else {
        this.presentToast('You cannot push img because it is local data!!!');
        this.router.navigate(['acctabs/tab1']);
      }
    }
    else {
      this.router.navigate(['acctabs/tab1']);
    }
  }




  getImgCount(flag) {

    if (flag == 1) {
      console.log("restingPlacePhotos length", this.restingPlacePhotos.length);
      return this.restingPlacePhotos.length
    } else if (flag == 2) {
      console.log("damageToVehiclePhotos length", this.damageToVehiclePhotos.length);
      return this.damageToVehiclePhotos.length
    } else if (flag == 3) {
      console.log("obstructionOfObjectsPhotos length", this.obstructionOfObjectsPhotos.length);
      return this.obstructionOfObjectsPhotos.length
    } else if (flag == 4) {
      console.log("junctionTypePhotos length", this.junctionTypePhotos.length);
      return this.junctionTypePhotos.length
    } else if (flag == 5) {
      console.log("roadSurfacePhotos length", this.roadSurfacePhotos.length);
      return this.roadSurfacePhotos.length
    } else if (flag == 6) {
      console.log("skidMarksPhotos length", this.skidMarksPhotos.length);
      return this.skidMarksPhotos.length
    } else if (flag == 7) {
      console.log("surroundingsPhotos length", this.surroundingsPhotos.length);
      return this.surroundingsPhotos.length
    } else if (flag == 8) {
      console.log("contributedAccidentPhotos length", this.contributedAccidentPhotos.length);
      return this.contributedAccidentPhotos.length
    } else if (flag == 9) {
      console.log("otherimg1Photos length", this.otherimg1Photos.length);
      return this.otherimg1Photos.length
    } else if (flag == 10) {
      console.log("otherimg2Photos length", this.otherimg2Photos.length);
      return this.otherimg2Photos.length
    } else if (flag == 11) {
      console.log("damageToPropertyPhotos length", this.damageToPropertyPhotos.length);
      return this.damageToPropertyPhotos.length
    }
  }

  savingMedia() {
    if (this.localdb.checkPlatform()) {
      if (this.offlinedata != true) {
        this.uploadpicture(1);
      }
    }
  }

  videoLoop() {
    ++this.videoflag;
    console.log("VideoFlag val", this.videoflag);
    if (this.videoflag <= 3) {
      console.log("Loop", this.videoflag);
      this.uploadVideo(this.videoflag);
    }
    else {
      setTimeout(() => {
        this.loader = false;
        this.hideLoader();
        this.router.navigate(['acctabs/tab1']);
      }, 500);
    }
  }

  savingOnebyone(flag,imgno){
    this.showingLoader();
    this.savingIndividually(flag,imgno)
  }

  // Show the loader for infinite time
  showingLoader() {

    this.loadingController.create({
      spinner: 'lines',
      message: 'Uploading Please wait...',
      duration: 60000
    }).then((res) => {
      res.present();
      console.log("Present loader");
      // setTimeout(function(){
      //   console.log("Time out loader");
      //   res.dismiss();
      // }, 1000*60);
    });

  }

  savingIndividually(flag,imgno){

    if(imgno>3){
      
      for (var j: number = 1; j < 4; j++) {
        this.imgobj[flag][j] = new model_img();
      }

      this.hideLoader(); return false;

    }
    console.log('savingIndividually(',flag,imgno,')');

    console.log('this.imgobj[flag]',this.imgobj[flag])
    
    if (this.imgobj[flag][imgno].image != null && this.imgobj[flag][imgno].upload_status == 0) {
      let imgpath = this.imgobj[flag][imgno].filepath;
      console.log('imgpath', imgpath);

      if(imgpath.length<1000){
       this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          console.log("Base 64 conversion starts");
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          this.restingPlacePhotos_size[0] = this.calculateImageSize(imgString);
          console.log("imgString", imgString);
          let postData = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          console.log('postData 1',postData);
          this.imgobj[flag][imgno].upload_status = 1
          this.api.post('imgupload', postData).subscribe(
            (data: any) => {
              this.imgobj[flag][imgno].image = null;
              console.log("Clearing image ", this.imgobj[flag][imgno].image);
              this.imgobj[flag][imgno].upload_status = 2;
              console.log("pIC ", this.loader);
              imgno++;
              console.log("IMG NO Increment ", imgno);
              this.savingIndividually(flag, imgno);
            });

        }); 
        
      }else{

        let imgpath = this.imgobj[flag][imgno].filepath;
        console.log('imgpath', imgpath);      
            
            let postData = {
              mode: 'imageupload',
              accid: this.accid,
              imageflag: flag,
              image: imgpath
            }
            console.log('postData 2',postData);
            this.imgobj[flag][imgno].upload_status = 1
            this.api.post('imgupload', postData).subscribe(
              (data: any) => {
                this.imgobj[flag][imgno].image = null;
                console.log("Clearing image ", this.imgobj[flag][imgno].image);
                this.imgobj[flag][imgno].upload_status = 2;
                console.log("pIC ", this.loader);
                imgno++;
                console.log("IMG NO Increment ", imgno);
                this.savingIndividually(flag, imgno);
              });


      }

    }else {
      if(imgno>=3){
        for (var j: number = 1; j < 4; j++) {
          this.imgobj[flag][j] = new model_img();
        }
        this.hideLoader();  return false;
      }else{
      this.savingIndividually(flag, imgno+1);
      }
    }

/*

    if(this.img_type==0){    
      if (imgno <= 3) {
        if (this.imgobj[flag][imgno].image != null && this.imgobj[flag][imgno].upload_status == 0) {
          let imgpath = this.imgobj[flag][imgno].filepath;
          console.log('imgpath', imgpath);
          this.getBase64StringByFilePath(imgpath)
            .then((res) => {
              console.log("Base 64 conversion starts");
              var base64Only = res.slice(34);
              let imgString = "data:image/jpg;base64," + base64Only;
              this.restingPlacePhotos_size[0] = this.calculateImageSize(imgString);
              console.log("imgString", imgString);
              let postDate = {
                mode: 'imageupload',
                accid: this.accid,
                imageflag: flag,
                image: imgString
              }
              this.imgobj[flag][imgno].upload_status = 1
              this.api.post('imgupload', postDate).subscribe(
                (data: any) => {
                  this.imgobj[flag][imgno].image = null;
                  console.log("Clearing image ", this.imgobj[flag][imgno].image);
                  this.imgobj[flag][imgno].upload_status = 2;
                  console.log("pIC ", this.loader);
                  imgno++;
                  console.log("IMG NO Increment ", imgno);
                  this.savingIndividually(flag, imgno);
                });
  
            });  
  
        } else {
          imgno++;
          console.log("IMG NO Increment ", imgno);
          this.savingIndividually(flag, imgno);
        }
      } else {
        //this.imgobj[flag][imgno].upload_status = 3;
        this.hideLoader();
  
      }
    }else{
      if (imgno <= 3) {
        if (this.imgobj[flag][imgno].image != null && this.imgobj[flag][imgno].upload_status == 0) {
          let imgpath = this.imgobj[flag][imgno].filepath;
          console.log('imgpath', imgpath);      
              
              let postDate = {
                mode: 'imageupload',
                accid: this.accid,
                imageflag: flag,
                image: imgpath
              }
              this.imgobj[flag][imgno].upload_status = 1
              this.api.post('imgupload', postDate).subscribe(
                (data: any) => {
                  this.imgobj[flag][imgno].image = null;
                  console.log("Clearing image ", this.imgobj[flag][imgno].image);
                  this.imgobj[flag][imgno].upload_status = 2;
                  console.log("pIC ", this.loader);
                  imgno++;
                  console.log("IMG NO Increment ", imgno);
                  this.savingIndividually(flag, imgno);
                });         
  
  
        } else {
          imgno++;
          console.log("IMG NO Increment ", imgno);
          this.savingIndividually(flag, imgno);
        }
      } else {
        //this.imgobj[flag][imgno].upload_status = 3;
        this.hideLoader();  
      }
    }*/
     
  }

  mediaSave(flag) {
    this.showLoader();
    console.log("OFFLINEDATA", this.offlinedata);
    if(this.offlinedata == undefined || this.offlinedata ==false){
      this.showProgressBar();
      if (this.offlineflag == true) {
        this.showLoader();
  
      }  
      //this.videoLoop();
      this.savingPic(flag);
    }else{
        this.router.navigate(['acctabs/tab1']);
    }    
  }

  progressBar() {
    console.log("loader", this.loader);
    this.loader = true;
    console.log("loader check", this.loader);

  }

  showProgressBar() {
    this.progressBar();
    // for (let index = 0; index <= 100; index++) {
    //   this.initBar(index);
    //   this.setBufferBar(index)
    // }
  }

  initBar(i) {
    console.log("initBar", i);
    setTimeout(() => {
      let barVal = (i / 14)

      console.log(barVal);

      this.value = barVal;
    }, 300 * i);
  }

  setBufferBar(i) {
    console.log("BufferBar", i);
    setTimeout(() => {
      let barVal = (i / 14)
      console.log(barVal);
      this.buffer = barVal;
    }, 150 * i);
  }

  savingPic(flag) {
    console.log("Saving pic", this.imgobj);
    console.log("Saving Flag", flag);

    
      if (flag >= 12) {
        console.log("calling video upload");
        this.videoLoop();
        return false;
      }
      let imgNo = 0; let timg = false;
      for (let j = flag; j < 12; j++) {
        for (let i = 1; i < 4; i++) {
          if (this.imgobj[j][i].image != null && this.imgobj[j][i].upload_status == 0 && timg == false) {
            //targetimg = this.imgobj[j][i];
            flag = j;
            imgNo = i;
            timg = true;
            console.log('Target if', this.imgobj[flag][imgNo]);

          }
        }
      }



      console.log("Check", flag, imgNo, timg);
      if (timg == false) {
        console.log("Move next img criteria");
        this.savingPic(flag + 1);
        return false
      }

      let imgpath = this.imgobj[flag][imgNo].filepath;
      console.log('imgpath', imgpath);
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          console.log("Base 64 conversion starts");
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          this.restingPlacePhotos_size[0] = this.calculateImageSize(imgString);
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          } 
          this.imgobj[flag][imgNo].upload_status = 1
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              this.imgobj[flag][imgNo].upload_status = 2;
              console.log("pIC ", this.loader);
              this.savingPic(flag);
              this.initBar(flag);
              this.setBufferBar(flag);
            });

        });
    
  }

  async savemedia() {
    if (this.localdb.checkPlatform()) {
      if (this.offlinedata != true) {
        this.showLoader();
        //console.log("TOTAL PHOTOS LENGTH", this.totalPhotos.length);
        for (var i = 1; i <= 11; i++) { //console.log('this.getImgCount(i)',i,this.getImgCount(i));
          let imgcnt = this.getImgCount(i);
          if (imgcnt > 0) {
            await new Promise(resolve => {
              setTimeout(() => {
                console.log('This is iteration ' + i);
                this.uploadingpic(i);
                resolve('');
              }, 2000 * imgcnt);
            });
          }
        }

        console.log('Saving Videos');
        this.uploadVideo(1);
        this.uploadVideo(2);
        this.uploadVideo(3);

        setTimeout(() => {
          this.hideLoader();
          this.router.navigate(['acctabs/tab1']);
        }, 500);

      }
      else {
        this.presentToast('You cannot push img because it is local data!!!');
        this.router.navigate(['acctabs/tab1']);
      }
    }
    else {
      this.router.navigate(['acctabs/tab1']);
    }
  }

  uploadingpic(flag) {
    //if (this.offlinedata != true) {

    console.log('This is iteration ' + flag);
    if (flag == 1 && this.restingPlacePhotosString.length > 0) {
      //for (var i = 0; i < this.restingPlacePhotosString.length; i++) {
      this.photos[flag] = this.restingPlacePhotosString[0];
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          this.restingPlacePhotos_size[0] = this.calculateImageSize(imgString);
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          // console.log("Img Upload" + this.restingPlacePhotosString[i])


          //  alert('screen '+this.photos[0]);
          // this.photos_us[0] = 1;
          //do something with base64 string
        });
      //}
    }
    if (flag == 2 && this.damageToVehiclePhotosString.length > 0) {
      //for (var i = 0; i < this.damageToVehiclePhotosString.length; i++) {
      this.photos[flag] = this.damageToVehiclePhotosString[0];
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;

          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.damageToVehiclePhotosString[i])
        });
      //}
    }


    if (flag == 3 && this.obstructionOfObjectsPhotosString.length > 0) {
      //for (var i = 0; i < this.obstructionOfObjectsPhotosString.length; i++) {
      this.photos[flag] = this.obstructionOfObjectsPhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.obstructionOfObjectsPhotosString[i])
        });

      //}
    }

    if (flag == 4 && this.junctionTypePhotosString.length > 0) {
      //for (var i = 0; i < this.junctionTypePhotosString.length; i++) {
      this.photos[flag] = this.junctionTypePhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.junctionTypePhotosString[i])
        });
      //}
    }

    if (flag == 5 && this.roadSurfacePhotosString.length > 0) {
      //for (var i = 0; i < this.roadSurfacePhotosString.length; i++) {
      this.photos[flag] = this.roadSurfacePhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.roadSurfacePhotosString[i])
        });
      //}
    }

    if (flag == 6 && this.skidMarksPhotosString.length > 0) {
      //for (var i = 0; i < this.skidMarksPhotosString.length; i++) {
      this.photos[flag] = this.skidMarksPhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.skidMarksPhotosString[i])
        });
      //}
    }

    if (flag == 7 && this.surroundingsPhotosString.length > 0) {
      //for (var i = 0; i < this.surroundingsPhotosString.length; i++) {
      this.photos[flag] = this.surroundingsPhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.surroundingsPhotosString[i])
        });
      //}
    }

    if (flag == 8 && this.contributedAccidentPhotosString.length > 0) {
      //for (var i = 0; i < this.contributedAccidentPhotosString.length; i++) {
      this.photos[flag] = this.contributedAccidentPhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.contributedAccidentPhotosString[i])
        });
      //}
    }

    if (flag == 9 && this.otherimg1PhotosString.length > 0) {
      //for (var i = 0; i < this.otherimg1PhotosString.length; i++) {
      this.photos[flag] = this.otherimg1PhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.otherimg1PhotosString[i])
        });
      //}
    }

    if (flag == 10 && this.otherimg2PhotosString.length > 0) {
      //for (var i = 0; i < this.otherimg2PhotosString.length; i++) {
      this.photos[flag] = this.otherimg2PhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          this.calculateImageSize(imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.otherimg2PhotosString[i])
        });
      //}
    }

    if (flag == 11 && this.damageToPropertyPhotosString.length > 0) {
      //for (var i = 0; i < this.damageToPropertyPhotosString.length; i++) {
      this.photos[flag] = this.damageToPropertyPhotosString[0]
      console.log("Uploading Photos..." + this.photos[flag])
      let imgpath = this.photos[flag];
      //if (imgpath !== '') {
      this.getBase64StringByFilePath(imgpath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          let imgString = "data:image/jpg;base64," + base64Only;
          console.log("imgString", imgString);
          let postDate = {
            mode: 'imageupload',
            accid: this.accid,
            imageflag: flag,
            image: imgString
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              this.photos_us[flag] = 3;
              this.videoLoop();
            });
          this.photos_us[flag] = 2;
          //console.log("Img Upload" + this.damageToPropertyPhotosString[i])
        });
      //}
    }

    //}
    //else{
    //this.presentToast('Network is Off!!! Cannot save data');
    //}
  }

  random(): number {
    console.log("Random no generator")
    let rand = Math.floor(100000 + Math.random() * 900000);
    console.log("Random no generator Value" + rand)
    return rand;
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  // async takePicture(flag) {
  //   const options: CameraOptions = {
  //     quality: 20,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,

  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     //this.photos[flag] = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imageData);
  //     this.photos[flag] = 'data:image/jpeg;base64,' + imageData;
  //     this.photos_us[flag] = 1;
  //     // console.log(this.photos);

  //   }, (err) => {
  //     // Handle error
  //     console.log(err);
  //   });

  // }

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
        localStorage.removeItem('mapscreen');
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

  async selectVideo(flag) {
    if (this.plt.is('cordova')) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [
          {
            text: 'Gallery',
            handler: () => {
              this.browseVideos(this.camera.PictureSourceType.PHOTOLIBRARY, flag);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await actionSheet.present();
    } else {
      console.log("Browser");
    }

  }

  browseVideos(sourceType: PictureSourceType, flag) {

    const options = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      mediaType: this.camera.MediaType.VIDEO
    }

    this.camera.getPicture(options).then(filePath => {
      console.log("ImgPath", filePath);

      this.getBase64StringByFilePath(filePath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
         

          let imgsize= this.checkImageSize(base64Only);
          console.log(imgsize);
     
          if(imgsize > 1024*10) { alert('Video size should be less than 10 MB '); return false; }
          else {
          this.video[flag] = "data:video/mp4;base64," + base64Only;
          this.video_us[flag] = 1;
          console.log("Video Length 0", this.video[0]);
          console.log("Video Length 1", this.video[1]);
          console.log("Video Length 2", this.video[2]);
          console.log("Video Length 3", this.video[3]);
          console.log("Video Length ", this.video.length);
          }


          //do something with base64 string
        });

      // var base64Only = imagePath.slice(34);
      // this.video[flag] = "data:video/mp4;base64," + base64Only;
      console.log("Gallery video", this.video[3]);
      console.log("Gallery video length", this.video.length);

     // this.video_us[flag] = 1;

    });


  }

  takeVideo(flag) {

    //alert('video ' + flag);
    // this.setvideo();// return ;

    let options: CaptureVideoOptions = { limit: 1, duration: 10, quality: 40 };
    this.mediaCapture.captureVideo(options).then(res => {


      var filePath = res[0].fullPath;
      console.log("Video Taken",filePath);

      if(this.offlinedata == true){
        if (this.mobiledevice) {
          this.localdb.insertingImgRow(flag, this.accid, filePath);
        }
      }
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

  uploadVideoOnebyOne(flag) {
    console.log("Uploading Video", flag);
    this.showingLoader();
    if (this.video[flag] == 0 || this.video[flag] == null) {
      this.hideLoader();
      console.log("return from uploadVideoOnebyOne");
      return;
    }

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
        this.video[flag] = null;
        this.hideLoader();

      },
      error => {
        this.video_us[flag] = 1;
        this.hideLoader();
      }
    );
  }

  uploadVideo(flag) {
    console.log("Uploading Video", flag);
    if (this.video_us[flag] == 0) {
      console.log("return from upload video");
      this.videoLoop();
      return;
    }

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
        this.videoLoop();
        this.initBar(11 + flag);
        this.setBufferBar(11 + flag);

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

  showLoader() {
    this.loadingController.create({
      message: 'Uploading...' + `<ion-progress-bar class="my-buffer-progress" [value]="value" [buffer]="buffer">
      </ion-progress-bar>`,
      spinner: "circles",
      duration: 2000
    }).then((res) => {
      res.present();
      console.log("Present loader");
      setTimeout(function(){
        console.log("Time out loader");
        res.dismiss();
      }, 1000*60*5);
    });

  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

  calculateImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }

    base64StringLength = base64String.length;
    console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    console.log(inBytes);
    let kbytes = inBytes / 1000;
    console.log('kbytes', kbytes);


    if (this.imgqty == 100 && kbytes > 2048) {
      this.imgqty = ((2048 * this.imgqty) / kbytes); this.imgqty = parseInt(this.imgqty + ''); console.log(this.imgqty, this.imgqty);
      if (this.imgqty < 10) { this.imgqty = 10; } else if (this.imgqty > 100) { this.imgqty = 100; }


    } else if (kbytes <= 200) {
      this.imgqty = 100;
    }
    localStorage.setItem('imgqty', this.imgqty + '');
    console.log('this.imgqty', this.imgqty);
    return kbytes;
  }

  checkImageSize(base64String) {
    let padding;
    let inBytes;
    let base64StringLength;
    if (base64String.endsWith('==')) { padding = 2; }
    else if (base64String.endsWith('=')) { padding = 1; }
    else { padding = 0; }

    base64StringLength = base64String.length;
    console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    console.log(inBytes);
    let kbytes = inBytes / 1000;
    console.log('kbytes', kbytes);


    return kbytes;
  }


  skipmedia() {
    localStorage.removeItem('img_type');
    this.router.navigate(['acctabs/tab1']);
  }

}
