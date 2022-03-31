import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../../services/api.service';
import{FormBuilder,FormGroup,Validators,Validator,AbstractControl} from '@angular/forms';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { Router } from '@angular/router';

import { TranslateConfigService } from '../../../../translate-config.service'; 

import { Base64 } from '@ionic-native/base64/ngx';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {

  selectedLanguage:string;
  params:any;
  accid:any;
  validaccid:boolean;
  audioForm:FormGroup;
  audio:any; locurl:any;
  constructor(private api:ApiService,private fb:FormBuilder,  private translateConfigService: TranslateConfigService,
    private router: Router,
    private base64: Base64,
    private mediaCapture: MediaCapture) {
    this.accid=localStorage.getItem('accid');

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    if(this.accid!=null){
                        this.validaccid=false;
      }
      this.build_passped_form();
   }

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  public build_passped_form(){
 
     this.audioForm=this.fb.group({  
        'name':['',[Validators.required,Validators.minLength(2)]],
        'age':['',[Validators.required]],
        'address':['',[Validators.required]],
  
     });
    
    
    }

    takeAudio(){
      let options: CaptureAudioOptions = { limit: 1 ,duration :30 }

      this.mediaCapture.captureAudio(options).then(res => { //alert(JSON.stringify(res))
        var filePath = res[0].fullPath;
        this.locurl=res[0].localURL; //alert('loc url '+res[0].localURL);
        this.getBase64StringByFilePath(filePath)
            .then((res) => { alert('res 64 '+res); //this.audio=res;
                var base64Only = res.slice(34);
                this.audio="data:audio/amr;base64,"+base64Only;
                //do something with base64 string
            });
    }, (err) => {
      console.log(err);
    });


    }

    submit(){

      //if(this.audio==undefined){ alert("Record Video please"); return };


      let postData={
        accid:this.accid,
        witness :Object.assign({},  this.audioForm.value),
        audio:this.audio,
      };
     // alert(JSON.stringify(postData));
      this.api.post('accaudio',postData).subscribe(
        (success:any) => {
          alert(JSON.stringify(success));
          alert("Audio uploaded sucessfully");
          //this.router.navigate(['/acctabs/tab1']);
        },
        error => {
            console.log(error);
        } 
        );

     // alert("Saved Sucessfully");
    //  this.router.navigate(['/acctabs/tab1']);

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

