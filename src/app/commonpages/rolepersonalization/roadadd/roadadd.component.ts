import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-roadadd',
  templateUrl: './roadadd.component.html',
  styleUrls: ['./roadadd.component.scss'],
})
export class RoadaddComponent implements OnInit {
  divisionOptions:any;
  sub_divisionOptions:any;
  
  roadsel={
    'division':'',
    'sub_division':'',
  }
  constructor(private modalctrl: ModalController, private api:ApiService, 
    private toastController:ToastController) { }

  ngOnInit() {
    console.log(this.roadsel);
    this.loadDivision();
  }

  public onDivisionChange(){
    this.loadSubDivision();
  }

  loadDivision(){
    let postDate={
      mode:'loadDivision',
    }
    this.api.post('transportconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      this.divisionOptions=data.data; 
     });
  }

  loadSubDivision(){
    let postDate={
      mode:'loadSubDivision',
      division:this.roadsel.division
    }
    this.api.post('transportconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      this.sub_divisionOptions=data.data; 
     });
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
  }


  saveModal(){
    let postDate={
      mode:'saveRoad',
      rtosel:this.roadsel
    }
    this.api.post('transportconfig',postDate).subscribe((data: any)=>{
      console.log(data);
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);

        this.presentToast("Saved Successfully !");

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

}
 