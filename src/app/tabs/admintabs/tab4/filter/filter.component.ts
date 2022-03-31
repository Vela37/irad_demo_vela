import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
@Input() selection:any;  segment: string='layers';//'filter';
@Input() map:any; 
postdata4={'mode':'','language':'','state':'','district':''};
fld_state:any;
fld_district:any;
fld_station:any;
state:any; layergroup:any;
district:any; dev:boolean=false;
station:any; loading:boolean=false;
ln:any;  public rows = [1,2,3,4,5];
severity=[{'id':1,'title':'Fatal'},
          {'id':2,'title':'Grievous'},
          {'id':3,'title':'Simple Injury Hospitalized'},
          {'id':4,'title':'Simple Injury Non Hospitalized'},
          {'id':5,'title':'No Injury'}
        ];
selseg:any='filter';
acclegend:any; groups:any=[];
  constructor(private modalctrl: ModalController,
    private api:ApiService  
    ) { }

  ngOnInit() {
this.loadstate();
    console.log('ngOnInit-selection',this.selection);

    this.acclegend='https://irad.parivahan.gov.in/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=50&HEIGHT=20&LAYER=irad:iRAD_Accident';
    this.dev = (localStorage.getItem('dev') === 'true');


    for (var i=0; i<3; i++) {
      this.groups[i] = {
        name: i,
        items: [],
        show: false
      };
      for (var j=0; j<3; j++) {
        this.groups[i].items.push(i + '-' + j);
      }
    }

    //this.loadLayers();

    console.log('map', this.map);
  }
  isGroupShown = function(group) {
    return group.show;
  };
  toggleGroup = function(group) { //console.log(group);
    group.show = !group.show;
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.loadLayers();
    refresher.target.complete();


  }

 loadLayers(){


  let postDate = {
    mode: "layers",
    
  };
  this.loading=true;
  this.api.post("map/wmslayers.php", postDate).subscribe((data: any) => {
    console.log(data);

    this.layergroup=data;
  
  });

 }

 layerClick(i,j,e){
   console.log('click',i,j,e.detail.checked);
   
 }

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
    this.selseg=ev.detail.value;
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }
  save(){
    console.log('save - selection',this.selection);
    this.modalctrl.dismiss({'selection':this.selection,'map':this.map});
  }
  public loadstate(){
    this.state=null;
     this.postdata4.mode='loadStates';
     this.postdata4.language=this.ln;
     this.load(this.postdata4).subscribe(
      (success:any) => {
        this.state=success.data;
    },
      error => {
      console.log(error);
      } 
      );
   }
   public loaddistrict(){
   // this.state=null;
     this.postdata4.mode='loadDistricts';
     this.postdata4.state=this.fld_state;
     this.postdata4.language=this.ln;
     this.load(this.postdata4).subscribe(
      (success:any) => {
        this.district=success.data;
    },
      error => {
      console.log(error);
      } 
      );
   }

   public loadpolice(){
    // this.state=null;
      this.postdata4.mode='loadStations';
      this.postdata4.state=this.fld_state;
      this.postdata4.district=this.fld_district;
      this.postdata4.language=this.ln;
      this.load(this.postdata4).subscribe(
       (success:any) => {
         this.station=success.data;
     },
       error => {
       console.log(error);
       } 
       );
    }
   
   public load(postdata4:any){

    return this.api.post('selection.php',postdata4);
  
  }

  clear() {

    //this.selection = { 'severity':'','state': '', 'district': '', 'station': '', 'year': '' };
    this.selection.severity='';

  }

}
