import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import {environment  } from '../../../../environments/environment';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.scss'],
})
export class ProfileupdateComponent implements OnInit {
  @Input() profileeditinfo:any;

  profiledata={'name':'','mobile':'','email':'','designation':'','regno':''};

  capturedSnapURL: string = "assets/logos/user.png";
  imgqty: number = 100;
  img: SafeResourceUrl = "assets/logos/user.png";
  private userSub: Subscription;
  isAuthenticated = false;
  user: any;

  constructor(private modalctrl:ModalController,private toastController:ToastController,private api:ApiService,private sanitizer: DomSanitizer,private authService: AuthService,
    private actionSheetController: ActionSheetController,private camera: Camera, private webview: WebView,private plt: Platform,private base64: Base64,) { }

  ngOnInit() {
    console.log("profileeditinfo",this.profileeditinfo);
    this.profiledata.name=this.profileeditinfo.name;
    this.profiledata.mobile=this.profileeditinfo.mobile;
    this.profiledata.email=this.profileeditinfo.email;
    this.profiledata.designation=this.profileeditinfo.designation;
    this.profiledata.regno=this.profileeditinfo.regno;

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;

       this.img=environment.apiUrl+'captcha/profilepic.php?'+ this.user.userid;

      }
    });
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  validationCheck(){
    if (this.profiledata.name != ''  && this.profiledata.mobile !='' && this.profiledata.email !='') {
      if (/\s/.test(this.profiledata.email) && /\s/.test(this.profiledata.mobile)) {
        this.presentToast("Email id or Mobile no contains whitespaces!!!")
      }
      else {
        if (this.profiledata.name.length >= 3) {
          this.updateModal();
        }
        else {
          this.presentToast("Name length is less than 3!!!")
        }       
      }
    } else {
      this.presentToast("Your missing some fields!!!")
    }
  }

  updateModal(){
    let postDate={
      mode:'updateProfile', 
      user:this.profiledata
    }
    this.api.post('profile',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.presentToast("User Profile Updated Successfully !");
        this.modalctrl.dismiss(true);

      }else{
        //this.message= data.msg.split(".");

      }
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  } 

  async selectImage() {
    if (this.plt.is('cordova')) {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: this.imgqty,
      targetWidth: 150,
      targetHeight: 150,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    // var mainPhotolen=this.restingPlacePhotos.length;
    this.camera.getPicture(options).then(imagePath => {
      console.log(imagePath)
      let resPath = this.pathForImage(imagePath);
      this.getBase64StringByFilePath(imagePath)
        .then((res) => {
          //alert('res 64 ' + res); //this.audio=res;
          var base64Only = res.slice(34);
          var data = "data:image/jpeg;base64," + base64Only;
          console.log("Length ",base64Only);
          console.log("Data",data);
          this.uploadProfile(data);


          //do something with base64 string
        });
      this.img = resPath;
      let base64Image = 'data:image/jpeg;base64,' + imagePath;
      this.capturedSnapURL = base64Image;
      console.log("Base64",base64Image);
      
      

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

  public getBase64StringByFilePath(fileURL: string): Promise<string> {

    return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
        resolve(base64File);
      }, (err) => {
        console.log(err);
      });
    })
  }

  uploadProfile(data) {
    let postDate = {
      mode: 'updateProfilepic',
      profilepic: data
    }
    console.log('uploadProfile',postDate);  
    this.api.post('profile', postDate).subscribe((data: any) => {
      console.log(data);      

    });

  }
}
