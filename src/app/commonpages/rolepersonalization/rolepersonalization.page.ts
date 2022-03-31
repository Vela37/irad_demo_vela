import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import {RtoaddComponent} from './rtoadd/rtoadd.component';
import {RoadaddComponent} from './roadadd/roadadd.component';
@Component({
  selector: 'app-rolepersonalization',
  templateUrl: './rolepersonalization.page.html',
  styleUrls: ['./rolepersonalization.page.scss'],
})
export class RolepersonalizationPage implements OnInit {
  selectedLanguage:string; params:any;
  transData:any=null;
  constructor(private modalctrl: ModalController, private api:ApiService,
    private translateConfigService: TranslateConfigService,) { 
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.selectedLanguage = localStorage.getItem('ln');
      console.log('selectedLanguage ',this.selectedLanguage);
    } 

  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    console.log('selectedLanguage ',this.selectedLanguage);

    this.loadTransport();

  } 

  loadTransport(){
      let postDate={
        mode:'loadTransportDetails',
        //zone:this.rtoinfo.zone
      }
      this.api.post('transportconfig',postDate).subscribe((data: any)=>{
        console.log(data);
        if(data.data.length>0){
          this.transData=data.data[0];
          }else{
            this.transData=null;
          }
          console.log(this.transData);
   
       });
    
  }

  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
    localStorage.setItem('ln',this.selectedLanguage);
    
  }


  async addRTODetails() {
    const modalped = await this.modalctrl.create({
      component: RtoaddComponent,
      componentProps: { 'rtoinfo': this.transData }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      //if(dataReturned.data==true)
      this.loadTransport();
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  async addRoadDetails() {
    const modalped = await this.modalctrl.create({
      component: RoadaddComponent,
      componentProps: { 'roadinfo': '' }
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

  ionViewDidEnter() {
   // this.loadTransport();
  }
}
