import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editcourt',
  templateUrl: './editcourt.component.html',
  styleUrls: ['./editcourt.component.scss'],
})
export class EditcourtComponent implements OnInit {

  @Input() courtdatafrompage: any;


  data_state:any;
  data_district:any;
  data_court:any;
  data_taluk:any;

  constructor(private api:ApiService, private modalctrl: ModalController) { }

  ngOnInit() {
                this.loadfield();
  
      
   //  console.log('*******************************************',this.court);
  //  console.log('8888888888888888888888888888hoi');

    console.log(this.courtdatafrompage);

  }
  loadfield(){

    let postDate={
      mode:"courtdata", 
      courtprofile:this.courtdatafrompage, 
      lang:'en',
   }
   console.log(postDate);
    this.api.post('datas',postDate).subscribe((data: any)=>{
   
   this.data_state=data.state;
   this.data_district=data.district;
   this.data_court=data.court;
   this.data_taluk=data.taluk;
   

     });
  
}
  // updatebutton(){
  //   // console.log(this.courtdatafrompage.courtname)

  // }
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  onSubmit(){
    alert('hi working oh')
    console.log('------------------------------------');

    console.log(this.courtdatafrompage);
     let postDate={
       mode:"submitdahjhhr",

     }


     this.api.post('datas',postDate).subscribe((data: any)=>{
     
      alert(data);

      });

  console.log('###########WORKING#################')
  }

}
