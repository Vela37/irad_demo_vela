import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../../../translate-config.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import{ environment } from  '../../../../environments/environment';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-accimg',
  templateUrl: './accimg.page.html',
  styleUrls: ['./accimg.page.scss'],
})
export class AccimgPage implements OnInit {

  selectedLanguage:string;  params:any;
  role:number; data:any
  isAuthenticated = false;
  private userSub: Subscription;
  selacc:any;accid:any; mapurl:any;  videourl:string[]=['','',''];
  images:any;videos:any;mediacount:number; imgurl:string[][]=[[],[],[],[],[],[],[],[],[],[],[]] ;
  private apiUrl= environment.apiUrl;
  constructor(
    private translateConfigService: TranslateConfigService,
    private router:Router, private iab: InAppBrowser,  public platform: Platform,
    private api:ApiService, private authService: AuthService,
    private alertController: AlertController,
    private VideoPlayer:VideoPlayer

    ){
      
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
  }
  
 
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
    

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.role=+user.role;
      }
    });

    this.showDetails('media');

  }

  ionViewDidEnter() {
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
  //  this.ln=localStorage.getItem('ln');
  }
  showDetails(flag){
    if(flag!=''){
    let postDate={
        mode:flag,
        ln:this.selectedLanguage,
        id:this.accid
      }
    this.api.post('accview',postDate).subscribe((data: any)=>{
        console.log(data);        //console.log('flag ',flag);
       // if(data.data==null){ console.log(' data is null'); return }
        if(flag=='media'){ this.data=data;
          this.images=data.images; console.log(this.images);
          this.videos=data.videos; console.log(this.videos);

          this.mediacount=this.images.length+this.videos.length;
          this.mapurl=this.apiUrl+'accmedia/image.php?id='+this.accid+'&f='+0+'&i='+0;
          for(var i=0;i<this.images.length;i++){ console.log('i-',i,this.images[i].count);
            for(var j=0;j<this.images[i].count;j++){ console.log('j-',j);
              this.imgurl[i][j]=this.apiUrl+'accmedia/image.php?id='+this.accid+'&f='+(this.images[i].flag)+'&i='+j;
          }
        }
          console.log('imgurl',this.imgurl);
        }
      });

    }else{

      console.log('invalid request')
    }

  }


  viewImg(imgurl){
    
    console.log(imgurl);
   // this.imageurl[flag]=imgurl;
    //alert(this.imageurl[flag]);
      
    //this.photoViewer.show(imgurl, this.images[flag].label);
    //this.photoViewer.show(imgurl+' 49');
    //this.photoViewer.show(imgurl, this.images[flag].label, {share: false})
    // window.open(imgurl) 
  
    this.platform.ready().then(() => {
  
      let options : InAppBrowserOptions = {
          location : 'no',//'yes' Or 'no' 
          hidden : 'no', //Or  'yes'
          clearcache : 'yes',
          clearsessioncache : 'yes',
          zoom : 'yes',//Android only ,shows browser zoom controls 
          hardwareback : 'yes',
          mediaPlaybackRequiresUserAction : 'no',
          shouldPauseOnSuspend : 'no', //Android only 
          closebuttoncaption : 'Close', //iOS only
          disallowoverscroll : 'no', //iOS only 
          toolbar : 'yes', //iOS only 
          enableViewportScale : 'no', //iOS only 
          allowInlineMediaPlayback : 'no',//iOS only 
          presentationstyle : 'pagesheet',//iOS only 
          fullscreen : 'yes',//Windows only    
      };
  
        const browser = this.iab.create(imgurl,'_system',options);
  
      });
  
   }

  playVideo(flag){

    if(this.videourl[flag]!=''){
      this.videourl[flag]=''; 
      return;
    }
  
    let videourl=this.apiUrl+'accmedia/video.php?id='+this.accid+'&f='+flag;
    this.videourl[flag]=videourl;
    //window.open(videourl);
    console.log(videourl);
      this.VideoPlayer.play(videourl).then(() => {
        console.log('video completed');
      }).catch(err => {
        console.log(err);
      });
  
 
    }
   

}
