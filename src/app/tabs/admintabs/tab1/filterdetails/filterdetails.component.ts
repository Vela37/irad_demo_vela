import { Component, Input, OnInit } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';
import { TranslateConfigService } from '../../../../translate-config.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { checkAvailability } from '@ionic-native/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-filterdetails',
  templateUrl: './filterdetails.component.html',
  styleUrls: ['./filterdetails.component.scss'],
})
export class FilterdetailsComponent implements OnInit {
  cyear: Number = new Date().getFullYear();

  @Input() selection: any;

  yearInput: number[] =[];// [2020, 2021];
  selStates:any=null; selDistricts:any=null; selStations:any=null;

  constructor(private modalctrl: ModalController, private api: ApiService, private toastController: ToastController) { 
    let j=0;
    for(let i=2021;i<=this.cyear;i++)
    this.yearInput[j++]=i;

  }


  ngOnInit() {
    this.loadSelection();
  }
  loadSelection(){
    console.log(this.selStates);
    if(this.selStates==null){
      this.loadStates();

      if(this.selection.state!=''){
        this.loadDistricts(this.selection.state);
      }
      if(this.selection.district!=''){
        this.loadStation(this.selection.state,this.selection.district);
      }
    }
    
  }

  loadStates(){
        
    let postDate={
      mode:'loadPSStates',
    }
    this.api.post('mstselection',postDate).subscribe((data: any)=>{
       this.selStates=data.data;
    });

  }
  stateChange(e){
    console.log(e.detail.value);
    if(e.detail.value!=''){
    this.loadDistricts(this.selection.state);
   }
  }
  loadDistricts(state){
        
    let postDate={
      mode:'loadPSDistricts',
      state:state
    }
    this.api.post('mstselection',postDate).subscribe((data: any)=>{
       this.selDistricts=data.data;
    });

  }
  districtChange(e){
    console.log(e.detail.value);
    if(e.detail.value!=''){
    this.loadStation(this.selection.state,this.selection.district);
   }
  }
  
  loadStation(state,district){
        
    let postDate={
      mode:'loadPSStation',
      state:state,
      district:district
    }
    this.api.post('mstselection',postDate).subscribe((data: any)=>{
       this.selStations=data.data;
    });

  }


  closeModal() {
    this.modalctrl.dismiss(undefined);
  }

  clearFilter() {

    this.selection = { 'state': '', 'district': '', 'station': '', 'year': '' };

  }
  filterModal() {
    this.modalctrl.dismiss(this.selection);
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
