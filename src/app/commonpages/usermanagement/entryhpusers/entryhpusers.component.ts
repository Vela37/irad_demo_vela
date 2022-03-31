import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';import { TranslateConfigService } from '../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { AddentryuserComponent} from '../addentryuser/addentryuser.component'


@Component({
  selector: 'app-entryhpusers',
  templateUrl: './entryhpusers.component.html',
  styleUrls: ['./entryhpusers.component.scss'],
})
export class EntryhpusersComponent implements OnInit {

 //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
  
  @Input() fielduserdata:any;
  selectedLanguage:string;  params:any;
  fielddata={'station':'','name':'','login_id':'',
                'email':'','mobile':''};
  psFieldOptions:any;   message:any=null;  

  constructor(private modalctrl:ModalController,private api:ApiService,private toastController:ToastController,private translateConfigService:TranslateConfigService) { }


  ngOnInit() {

    console.log("-------------------------------------------------");
    console.log(this.fielduserdata[0].name);
    console.log("-------------------------------------------------");
    
  }
  loadPSFieldUsers(){
    // this.loading=true;
     let postDate={
       mode:'loadHospitalEntryuser',
       station:this.fielddata.station
   
     }
     this.api.post('usermanagement',postDate).subscribe((data: any)=>{
       console.log(data);
     //  this.hospitalusers =data.data;

     this.fielduserdata=data.data;
     //  this.loading=false;
      });
     // 
   }
   
  disableUser(usr){
    console.log(usr);
    //return false;
    let postDate={
      mode:'disablehospitaluser',
      station:this.fielddata.station,
      usr:usr
    }
    this.api.post('usermanagement',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data.flag==true){
        this.presentToast("User Active status changed sucessfully");
        //this.modalctrl.dismiss(true);
       this.loadPSFieldUsers();
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
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  async addUser() {
   // console.log(hospitalusers);
    //console.log("Field User  values", this.psFieldUsers[i]);
    const modalped = await this.modalctrl.create({
      component: AddentryuserComponent,
    //  componentProps: { 'fielduserdata': hospitalusers }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      this.loadPSFieldUsers();
      //   this.histroyreturn = dataReturned.data;
    //  console.log('Receive: ', dataReturned.data);
      //if(dataReturned.data==true)
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

}
