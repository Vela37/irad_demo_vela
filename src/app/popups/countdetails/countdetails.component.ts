import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-countdetails',
  templateUrl: './countdetails.component.html',
  styleUrls: ['./countdetails.component.scss'],
})
export class CountdetailsComponent implements OnInit {
isLoading:boolean=true;
  constructor(private modalctrl: ModalController,private api:ApiService) { }

  public config = {
    animation: 'count',
    format: ',ddd',
    theme: 'default',
    value: 50,
    auto: true,
  }
  countsdata= [
    {
      'title':'Loading...',
      'count':0
    }
  ];
  

  ngOnInit() {

    this.loadCountDetails();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    this.loadCountDetails();

    refresher.target.complete();


  }

  closeModal() {
    this.modalctrl.dismiss(undefined);
  }

loadCountDetails(){
    //logindetails
   // alert('ssssss');
   this.isLoading=true;

    let postDate={
      mode:'countdetails'
    }
    this.api.post('dashboard',postDate).subscribe((data: any)=>{
      this.countsdata=data.data;
     
      this.isLoading=false;
     });
    
    }


}
