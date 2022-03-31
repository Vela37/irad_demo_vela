import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';
import{ environment } from  '../../../../environments/environment';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import {AccimgviewComponent} from '../accimgview/accimgview.component';

@Component({
  selector: 'app-mediaview',
  templateUrl: './mediaview.component.html',
  styleUrls: ['./mediaview.component.scss'],
})
export class MediaviewComponent implements OnInit {
  segment: string='image';
  selseg:any='filter';
  
  audiourl:any=''
  selectedLanguage:string; params:any; accid:any; 
  images:any;audios:any; videos:any;mediacount:number; imgurl:string[][]=[[],[],[],[],[],[],[],[],[],[],[]] ;
  data:any;
  selacc:any;
  private apiUrl= environment.apiUrl;
  mapurl:any;
  videourl:string[]=['','','']; audioURL:string[]=[];
  showcrnt:any;
  showvideo:any;
  audurl:any;
  imgtitle:any='Title'
  sliderOpts={
    zoom: {
      maxRatio:4
    }
  }

  constructor(private modalctrl: ModalController, private api:ApiService,private VideoPlayer:VideoPlayer,
    private translateConfigService: TranslateConfigService,) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
   }
 
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
    this.accid =this.selacc.accid;
    

    this.showDetails('media');
  //  this.playVideo(1);
  }
  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
    this.selseg=ev.detail.value;
  }

  gotoZoomPageimg(url){
    this.showcrnt=url;
    console.log(url);
    
    var url_string = url;
    var url1 = new URL(url);
    var c = url1. searchParams. get("f");
    for(var i=0;i<this.images.length;i++){
      if(this.images[i].flag==c){
        this.imgtitle = this.images[i].label;
      }
    }

   
    
  }
 async gotoZoomPage(url) {
   console.log("Imgurl",url);
  const modalped = await this.modalctrl.create({
    component: AccimgviewComponent,
    componentProps: { 'mediainfo': url }
    /* componentProps: {
       'visibility':this.data.accinfo.visibilty,
       'refhp':'test',
     }*/
  });

  modalped.onWillDismiss().then(dataReturned => {
    //   this.histroyreturn = dataReturned.data;
    console.log('Receive: ', dataReturned.data);
    //if(dataReturned.data==true)
  });
  return await modalped.present().then(_ => {
    //  console.log('Sending: ', this.phyopnion);
  });

}

  showDetails(flag){
    if(flag!=''){
    let postDate={
        mode:flag,
        ln:this.selectedLanguage,
        id:this.accid
      }
    this.api.post('accview',postDate).subscribe((data: any)=>{
       // console.log(data);        //console.log('flag ',flag);
       // if(data.data==null){ console.log(' data is null'); return }
        if(flag=='media'){ this.data=data;
          this.images=data.images; console.log(this.images);
          this.videos=data.videos; //console.log(this.videos);
          this.audios=data.audio; //console.log(this.audios);
//alert(this.images.length);
          this.mediacount=this.images.length+this.videos.length+this.audios.length;
          this.mapurl=this.apiUrl+'accmedia/image.php?id='+this.accid+'&f='+0+'&i='+0;
          for(var i=0;i<this.images.length;i++){ console.log('i-',i,this.images[i].count);
         // this.imgtitle[i]=this.images[i].label;
            for(var j=0;j<this.images[i].count;j++){ console.log('j-',j);
              this.imgurl[i][j]=this.apiUrl+'accmedia/image.php?id='+this.accid+'&f='+(this.images[i].flag)+'&i='+j;
          }
        }
      //    console.log('imgurl',this.imgurl);
      //    console.log('audios',this.audios)
          for(var i=0;i<this.audios.length;i++){
            let url=this.apiUrl+'accmedia/audio.php?id='+this.audios[i].id;
            console.log(url);
            this.audioURL[this.audios[i].id]=url;
          }
    //  console.log('audioURL',this.audioURL);

        }

        console.log(this.images);

      });

    }else{

      console.log('invalid request')
    }

  }
  /*
  ()
  []
  [()]
  {{}}
  */
  getAudiourl(id){
    this.audurl='';
//alert(id);
   let  audiourl=this.apiUrl+'accmedia/audio.php?id='+id;
   //console.log(audiourl);
   this.audurl=audiourl;
    //return audiourl;
  }
  playVideo(flag){
    this.showvideo='';
 //   alert(flag);
//this.videolink='https://gisnic.tn.nic.in/irad_new/api_v9_enc/accmedia/video.php?id=202129592360024&f=1';
    if(this.videourl[flag]!=''){
      this.videourl[flag]=''; 
      return;
    }
   // console.log("VIDEO LINK",this.videolink);
    let videourl=this.apiUrl+'accmedia/video.php?id='+this.accid+'&f='+flag;
    this.videourl[flag]=videourl;
    this.showvideo=this.videourl[flag];
    //window.open(videourl);
    console.log("video link "+this.showvideo);
      this.VideoPlayer.play(this.showvideo).then(() => {
        console.log('video completed');
        this.showvideo='';

      }).catch(err => {
        console.log(err);
      });
  
 
    }
    
  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
}

