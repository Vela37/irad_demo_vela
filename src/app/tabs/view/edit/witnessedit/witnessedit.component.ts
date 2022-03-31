import { Component, OnInit,Input  } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-witnessedit',
  templateUrl: './witnessedit.component.html',
  styleUrls: ['./witnessedit.component.scss'],
})
export class WitnesseditComponent implements OnInit {
  @Input() witnessinfo: any;
  selacc: any; 
  accid: any;
  ln: any;

  constructor(private api: ApiService, private modalctrl: ModalController,) { 
    this.selacc = JSON.parse(localStorage.getItem('selacc'));
    this.accid = this.selacc.accid;

  }

  ngOnInit() {
    console.log(this.witnessinfo)

  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  
  savebutton() {
    // alert("jjj");
    let reply = { 'geninfo': this.witnessinfo };
    console.log(this.witnessinfo);
   
   this.updateWitness();
 
   // this.modalctrl.dismiss(reply);
   
  }
  async  updateWitness(){
    //this.isLoading=true; 
    let postDate={
       mode:'updateWitness',
      // name:this.witnessinfo.name,
      // gender:this.witnessinfo.gender,
      // age:this.witnessinfo.age,
      // occupation:this.witnessinfo.occupation,
      // mobile:this.witnessinfo.mobile,
      // address:this.witnessinfo.address,
      // staement:this.witnessinfo.staement,
       witness:this.witnessinfo

      
    }
    this.api.post('witness',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);
      }
     // this.isLoading=false; 
    });
  }
}
