import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateConfigService } from "../../../../translate-config.service";
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-addwitness',
  templateUrl: './addwitness.component.html',
  styleUrls: ['./addwitness.component.scss'],
})
export class AddwitnessComponent implements OnInit {


  @Input() flag: string = "No";
  @Input() reportdata: any;
  @Input() accident_id: any;
  selectedLanguage: string;
  shortgrd: string = "S/O";
  guardinaname: string = "Father Name";
  user_name: any;
  accid: any;
  gender: any;
  gurdian_type: any;
  gurdian_name: any;
  occupation: any;
  age: any;
  contact_address: any;
  contact_number: any;

  prfixcont: any;
  datacombo = true;
  // ReportFG: FormGroup;
  arr_obj = [
    {
      Male: {
        set1: [
          { id: "S/O", name: "Father" },
          { id: "C/O", name: "Guardian" },
        ],
      },
      Female: {
        set2: [
          { id: "D/O", name: "Father" },
          { id: "W/O", name: "Husband" },
          { id: "C/O", name: "Guardian" },
        ],
      },
      TG: {
        set3: [
          { id: "S/O", name: "Father" },
          //    {id:"W/O",name:"Husband"},
          { id: "C/O", name: "Guardian" },
        ],
      },
    },
  ];

  options6: any;
  postdata2 = { mode: "", language: "" };
  witnessinfo={'accid':'','name':'','guardianname':'','guaridan_type':'',
               'gender':'','mobile':'',
               'residence':'','occupation':'',
               'age':'','audio':''}
               selacc:any;
               witness:any;
               viewwitness:any=0;
               selectedwitness:any;
               audio4play:any;audiotype:any;
               audio: any;

  constructor(
    private modalctrl: ModalController,
    private api: ApiService,
    private translateConfigService: TranslateConfigService,
    private toastController: ToastController,
    private base64:Base64,
    private mediaCapture: MediaCapture,
    private sanitizer: DomSanitizer,
    private altctrls: AlertController // private fb: FormBuilder
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    // this.buildvechileform();
    this.selacc=JSON.parse(localStorage.getItem('selacc'));
     this.accident_id =this.selacc.accid;
     console.log("AccId",this.selacc);
  }

  ngOnInit() {
    this.getWitnessData();
    console.log("Check",this.arr_obj[0].Male.set1)
    this.prfixcont = this.arr_obj[0].Male.set1;
  }

  addWitness(){
    this.viewwitness=1;
    console.log("view Witness",this.viewwitness);
  }

  cancelWitness(){
    this.viewwitness=0;
    console.log("view Witness",this.viewwitness);
  }
  getWitnessData(){
    //this.generaldata.acc_id='123456';
   
    this.witnessinfo.accid=this.accident_id;
    let postDate = {
      witness: this.witnessinfo,
      //pedestriandoc: this.docinfo
    }

    this.api.darsave('dar/getwitness', postDate).subscribe((data: any) => {
      
      console.log("Witness",data);
      this.witness=data;
      console.log("Witness",data);
      
        console.log('updated');       
       
        
        this.presentToast("Witness Data fetched !");
        //this.modalctrl.dismiss(true);
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


  closeModal() { 
    this.modalctrl.dismiss();
  }


  takeAudio() {
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => { console.log(data); this.audio = data; 
          console.log("Audio name",this.audio[0].name);
          var afterDot = this.audio[0].name.substr(this.audio[0].name.indexOf('.'));
          this.audiotype = afterDot.split('.').pop();
          console.log("after dot value",this.audiotype);
          console.log("after dot value",this.audio[0].fullPath);
          this.getBase64StringByFilePath(this.audio[0].fullPath)
          .then((res) => { //alert('res 64 '+res); //this.audio=res;
            console.log("Value audio",res);
              var base64Only = res.slice(34);
              
              this.audio="data:audio/mp3;base64,"+base64Only;
              this.audio4play = this.sanitizer.bypassSecurityTrustResourceUrl(this.audio);
              console.log(' this.audio', this.audio);
              //do something with base64 string
          });
          },
        (err: CaptureError) => console.error(err)
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


  takeAudio2() {
    
    /* let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureAudio(options)
      .then(
        (data: MediaFile[]) => { console.log(data); this.audio = data; },
        (err: CaptureError) => console.error(err)
      );

      */
  }

  onSubmit() {
    this.witnessinfo.accid=this.accident_id;
    this.witnessinfo.name=this.user_name;
    this.witnessinfo.guardianname=this.gurdian_name;
    this.witnessinfo.guaridan_type=this.gurdian_type;
    this.witnessinfo.gender=this.gender;
    this.witnessinfo.mobile=this.contact_number;
    this.witnessinfo.residence=this.contact_address;
    this.witnessinfo.occupation=this.occupation;
    this.witnessinfo.age=this.age;
    this.witnessinfo.audio=this.audio;
    
    this.user_name="";
    this.gurdian_name="";
    this.gurdian_type="";
    this.gender="";
    this.contact_number="";
    this.contact_address="";
    this.occupation="";
    this.age="";
    
    let postDate = {
      mode: "addwitness",
      //  accid: this.accident_id,
      // name: this.user_name,
      // guardianname: this.gurdian_name,
      // guaridan_type: this.gurdian_type,
      // gender: this.gender,
       mobile: "8767887670",
      // residence: this.contact_address,
      // occupation: this.occupation,
      // age: this.age,
      witness:this.witnessinfo
    };
    this.api.darsave("dar/witness", postDate).subscribe((data: any) => {
      console.log(data);
      this.getWitnessData();
      this.closeModal();
    });
  }

  checkmobile($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if ($event.target) {
      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      this.contact_number = value;
      //  (<HTMLInputElement>event.target).value = value.replace(/\D/g, '');
      // this.healthform.controls['contact_number'].setValue(value);
    }
  }

  loadselection() {
    this.postdata2.mode = "passengerdata";
    this.postdata2.language = "en";
    this.selection(this.postdata2).subscribe(
      (success: any) => {
        this.datacombo = false;
        this.options6 = success.ocuupation;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public selection(postdata2: any) {
    return this.api.post("datas", postdata2);
  }

  fixguradinalabel($event) {
    if ($event.target.value == "S/O") {
      this.guardinaname = "Father Name";
    } else if ($event.target.value == "D/O") {
      this.guardinaname = "Father Name";
    } else if ($event.target.value == "W/O") {
      this.guardinaname = "Husband Name";
    } else if ($event.target.value == "C/O") {
      this.guardinaname = "Guardian Name";
    }
  }

  fixprefix($event) {
    this.prfixcont = null;

    if ($event.target.value == "Male") {
      this.prfixcont = this.arr_obj[0].Male.set1;
      //this.guardinaname=this.isdfds;
    } else if ($event.target.value == "Female") {
      this.prfixcont = this.arr_obj[0].Female.set2;
    } else if ($event.target.value == "TG") {
      this.prfixcont = this.arr_obj[0].TG.set3;
    } else {
      this.prfixcont = this.arr_obj[0].Male.set1;
    }
  }

  filllabel($event) {
    if ($event.target.value == "S/O") {
      this.guardinaname = "Father Name";
      this.shortgrd = "S/O";
    } else {
      this.guardinaname = "Husband Name";
      this.shortgrd = "W/O";
    }
  }

  checkage($event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    this.age = Number(value); // returns 0

    if ($event.target) {
      // if (this.age == 0) {
      //   value = "";
      // }

      if (value == "") {
        value = value.slice(0, 0);
      }

      if (value.length > 3) {
        value = value.slice(0, 3);
      }
      if (this.age > 125) {
        value = value.slice(0, 2);
      }

      (<HTMLInputElement>event.target).value = value.replace(/\D/g, "");
    }
  }

  saveModal(flag){
    
  }
}
