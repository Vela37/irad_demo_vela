import { Component, Input, OnInit } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {

  @Input() gid:any; loading:boolean=false; andata:any;  s1=0;s2=0;s3=0;s4=0;s5=0; remedial_measures:any=null;

  totalaccidents:any=null;
 
  constructor(private modalctrl: ModalController,
    private api:ApiService  
    ) { }

  ngOnInit() {
    this.loadData()
  }


  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  doRefresh(event){
   
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }


  loadData(){

    let postDate = {
      mode: "analysis",
      gid:this.gid
      
    };
    this.loading=true;  this.s1=0;this.s2=0;this.s3=0;this.s4=0;this.s5=0;
    this.api.post("map/mapselection.php", postDate).subscribe((data: any) => {
      console.log(data);
  
      this.loading=false;

      this.andata=data;

      this.totalaccidents=data.tcount;

      for(let i=0;i<data.scount.length;i++){

        if(data.scount[i].severity=='1'){ this.s1=data.scount[i].count}
        if(data.scount[i].severity=='2'){ this.s2=data.scount[i].count}
        if(data.scount[i].severity=='3'){ this.s3=data.scount[i].count}
        if(data.scount[i].severity=='4'){ this.s4=data.scount[i].count}
        if(data.scount[i].severity=='5'){ this.s5=data.scount[i].count}

      }
      this.remedial_measures=data.remedial_measures;

      console.log('this.remedial_measures',this.remedial_measures)
    
    });
  
   }

}
