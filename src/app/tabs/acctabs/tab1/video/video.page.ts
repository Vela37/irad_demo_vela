import { Component, OnInit } from '@angular/core';

import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

import { Router } from '@angular/router';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import { ApiService} from '../../../../services/api.service';
import { Base64 } from '@ionic-native/base64/ngx';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  selectedLanguage:string;
  params:any;

  loader: any;
  videoId: any;
  flag_upload = true;
  flag_play = true;

  selacc:any;
  accid:any;
  validaccid:boolean=true;
  video:any=[];
  constructor(private mediaCapture: MediaCapture,private router: Router,
    private api:ApiService, private base64: Base64, private http: HttpClient,
    private translateConfigService: TranslateConfigService) { 
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    }

    
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.accid=localStorage.getItem('accid');
     this.video[1]='';
         /*this.selacc =
          {
          'accid': 'TN12312399',
          'datetime': '28 Dec 2019 5.30 PM',
          'landmark': 'Anna squar 100 metres.'
          };
          localStorage.setItem('selacc', JSON.stringify(this.selacc)); */
          this.selacc=JSON.parse(localStorage.getItem('selacc'));
          if(this.accid!=null){

            this.validaccid=false;
          }
  }

  takeVideo1(flag){
    let options: CaptureVideoOptions = { limit: 1 ,duration :30,quality:10};
    this.mediaCapture.captureVideo(options).then(res => {  //alert(JSON.stringify(res));
      var filePath = res[0].fullPath;

      this.getBase64StringByFilePath(filePath)
          .then((res) => { //alert('res 64'+res); this.video=res;
              var base64Only = res.slice(34);
              this.video[flag]="data:video/mp4;base64,"+base64Only;
              //do something with base64 string
          });
  }, (err) => {
    console.log(err);
  });
  }

  save1(){ 
    //console.log(this.photos);
    //alert(JSON.stringify(this.photos));
    if(this.video[1]==undefined && this.video[2]==undefined){ alert("Record Video please"); return }

    let postData={
      accid:this.accid,
      video1:this.video[1],
      video2:this.video[2]
    };
    //alert(JSON.stringify(postData));
    this.api.post('accvideo',postData).subscribe(
      (success:any) => {
      
        alert("Video uploaded sucessfully");
        //this.router.navigate(['/acctabs/tab1']);
      },
      error => {
          console.log(error);
      } 
      );

    //alert("Saved Sucessfully");
   // this.router.navigate(['/acctabs/tab1']);
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

skip(){
  this.router.navigate(['/acctabs/tab1']);
}


takeVideo(flag) {
   let options: CaptureVideoOptions = { limit: 1 };
   this.mediaCapture.captureVideo(options)
   .then((videodata: MediaFile[]) => {
   var i, path, len;
   for (i = 0, len = videodata.length; i < len; i += 1) {
   path = videodata[i].fullPath;
   // do something interesting with the file
   }
   this.videoId = path;
   this.flag_play = false;
   this.flag_upload = false;
   });
   }
   save() {
   
    
      let formData:FormData = new FormData();
      formData.append  ('uploadFile', this.videoId, );
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    //  let options = new RequestOptions({ headers: headers });
      this.http.post(`https://gisnic.tn.nic.in/irad/api_v1/accvideo1`, formData, {})
      .subscribe(
        (success:any) => {
          alert('success ' + JSON.stringify(success));
          alert("Video uploaded sucessfully");
          //this.router.navigate(['/acctabs/tab1']);
        },
        error => {
          alert('error ' + JSON.stringify(error));
        } 
        );
    
   
    

  // this.presentLoading();
 
 }

}
