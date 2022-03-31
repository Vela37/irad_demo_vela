import { Component, OnInit, ViewChild } from '@angular/core';
import { Map, tileLayer, marker, control, icon, Marker ,LatLng, circle, CircleMarker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import {environment} from "../../../../environments/environment.prod";
import {FilterComponent} from "./filter/filter.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import { ApiService } from '../../../services/api.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  fromdate:any;
todate:Date=null;
today: String = new Date().toISOString(); fromdatestr:any=''; todatestr:string=''; timeflag:any='';

  layers:boolean=false;
  filters:boolean=true;
  styles:boolean=true; topaccloc:any=null;
  legend:boolean=true; segment: string='layers';

  isLocationFound:boolean; acclayer:any; grid2sk:any; aoilayer:any; layersh:boolean=false; sidepanel:boolean=false;
  location: Location; LayerArray:any=[];
  map: any;
  markPoint1: any; infomarker:any; infoURL:any;
  acclegend='https://irad.parivahan.gov.in/api/legends/accident_legend.png';
  locationCoords: any; btntitle:any="Top Accident Locations";
  timetest: any;

  isTracking = false;  infoflag=false; dev:any=false;
  watch: string;
  user = null;
  gpsCircle:any;
  gpsCenter:any;
  gpssubscription:any; layergroup:any; loading:boolean=false;
  accsevs:number[]=[];
  accsevy:number[]=[];

  

  private userSub: Subscription; isAuthenticated = false;
  severity=[{'id':1,'title':'Fatal'},
          {'id':2,'title':'Grievous'},
          {'id':3,'title':'Simple Injury Hospitalized'},
          {'id':4,'title':'Simple Injury Non Hospitalized'},
          {'id':5,'title':'No Injury'}
        ];


  road_type=[{'id':1,'title':'Expressway'},
  {'id':2,'title':'National Highway'},
  {'id':3,'title':'State Highway'},
  {'id':4,'title':'Major District Road'}, 
  {'id':5,'title':'Other District Road'}, 
  {'id':6,'title':'Village Road'}, 
  {'id':7,'title':'Arterial Road'},
  {'id':8,'title':'Sub-Arterial Road'},
  {'id':9,'title':'Collector Road'},
  {'id':10,'title':'Local Road'},                 
  ];      

  selection = { 'severity':'','state': '', 'district': '', 'station': '', 'year': '','roadtype':'' };
  states:any;districts:any;stations:any;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  ggg:any=1;
  constructor(
  //  private locService: LocationService,  
  private api: ApiService,
  private authService: AuthService, private modalctrl: ModalController,
  private geolocation: Geolocation,
    private router: Router

  ) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: "",
      status: 'constructor'
    }
    this.timetest = Date.now();
    this.isLocationFound=false;
  }


  ngOnInit() { 
    this.dev= (localStorage.getItem('dev') === 'true');
  
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // console.log(user);
      //console.log('user',user);
      this.user=user;
      if(this.isAuthenticated){ //console.log(user.name);
      }

     // this.openFilter();
     this.loadstate();
    });
    
    console.log('map init');
  this.leafletMap();
    this.getLocationCoordinates();
    this.gpssubscription = this.geolocation.watchPosition();


    this.infoURL="url";
this. loadLayers();
  }
  shsidepanel(){
    this.sidepanel=! this.sidepanel;
    setTimeout(() => {
      console.log("this is the first message");
  
    this.scrollToBottomOnInit();
  }, 200);
    
  }


  doRefresh(event){
   
    this.loadLayers();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  loadLayers(){


    let postDate = {
      mode: "layers",
      
    };
    this.loading=true;
    this.api.post("map/wmslayers.php", postDate).subscribe((data: any) => {
      console.log(data);
      let tdata=[],j=0;
      for(let i=0;i<data.length;i++){
        console.log(1,data[i]);
        if(this.dev==true || !(data[i].dev==true)){
          tdata[j++]=data[i];
        }

      }
  
      this.layergroup=tdata;

     // this.addLayer(0,0);
    
    });
  
   }

   isGroupShown = function(group) {
    return group.show;
  };
  toggleGroup = function(group) { //console.log(group);
    group.show = !group.show;
  };



  public loadstate(){
  let postdata={
    mode:'loadStates',
    ln:'en',
  }
     this.load(postdata).subscribe(
      (success:any) => {
        this.states=success.data;
    },
      error => {
      console.log(error);
      } 
      );
   }
   public loaddistrict(){ 
    
    
    
    this.applyFilter();
    let postdata={
      mode:'loadDistricts',
      state:this.selection.state,
      ln:'en',
    }
     this.load(postdata).subscribe(
      (success:any) => {
        this.districts=success.data;
    },
      error => {
      console.log(error);
      } 
      );

      for(let i=0;i<this.states.length;i++){
        if(this.selection.state==this.states[i].code){
          console.log('this.states[i]',this.states[i]);
          let extent=JSON.parse(this.states[i].extent);
          console.log('extent',extent);
         // this.map.fitBounds([  extent.coordinates[3], extent.coordinates[1]  ]);
         //this.map.fitBounds([  [8.0786052860668, 76.253399848938],  [13.54412764, 80.34235528]  ]);
        //console.log('extent.coordinates',extent.coordinates)
        // this.map.fitBounds([ extent.coordinates  ]);

         this.map.setView([extent.coordinates[1],extent.coordinates[0]], 7);

        }
      }

   }

   public loadpolice(){ this.applyFilter();
    let postdata={
      mode:'loadStations',
      state:this.selection.state,
      district:this.selection.district,
      ln:'en',
    }
      this.load(postdata).subscribe(
       (success:any) => {
         this.stations=success.data;
     },
       error => {
       console.log(error);
       } 
       );
    }
   
   public load(postdata4:any){

    return this.api.post('map/mapselection.php',postdata4);
  
  }


  ionViewDidEnter() {
   // this.leafletMap();
   this.map.invalidateSize();
  }

  async openFilter() {
    const modalped = await this.modalctrl.create({
      component: FilterComponent,
      cssClass: '',
      showBackdrop: true,
      componentProps: { 'selection': this.selection,'map':this.map }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      
      
      if(dataReturned.data!=undefined){
        this.map=dataReturned.data.map;
        
      if (dataReturned.data.selection.severity!=undefined) {
        this.selection = dataReturned.data.selection;
        console.log('Returened ',this.selection);
        
        
        this.applyFilter();



      }
    }
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });

  }

  applyFilter(){
    console.log('this.acclayer',this.acclayer);
    console.log('applyFilter',this.selection);
    console.log('CQL_FILTER',this.acclayer.wmsParams.CQL_FILTER);
   // this.acclayer.setParams({CQL_FILTER:'[severity=1]'});
   if(this.timeflag=='CUSTOM'){
    this.mapTime('CUSTOM');
   }

    var accidentFilter=null,state_aoi=null;
    

    if(this.selection.state!=''){
     accidentFilter="[state='"+this.selection.state+"'"; 

     state_aoi="[ps_state='"+this.selection.state+"']"; 
     this.aoilayer.setParams({CQL_FILTER:state_aoi}); 
     

     if( this.selection.district!=''){
      accidentFilter+=" and district='"+ this.selection.district+"'"; 
      if(this.selection.station!=''){
        accidentFilter+=" and station='"+this.selection.station+"'"; 
      }
     }
    }
    
    if(accidentFilter!=null && this.selection.severity!=''){
      accidentFilter+=" and severity in ('"+(this.selection.severity).toString().replace(/,/g, "','")+"')"; 
    }else if(this.selection.severity!=''){
      accidentFilter=" [ severity in ('"+ (this.selection.severity).toString().replace(/,/g, "','")+"')"; 
    }
    if(accidentFilter!=null && this.selection.year!=''){
      accidentFilter+=" and year in ('"+(this.selection.year).toString().replace(/,/g, "','")+"')"; 
    }else if(this.selection.year!=''){
      accidentFilter=" [ year in ('"+ (this.selection.year).toString().replace(/,/g, "','")+"')"; 
    }

    // if(this.selection.roadtype!=''){
    //   //console.log(this.acclayer);

    //   this.acclayer = tileLayer
    //   .wms(environment.wmsUrl, {
    //     layers: "irad:iRAD_Accidents", //CQL_FILTER:accidentFilter, //CQL_FILTER:"investigating_officer like 'tnpfo%'",
    //     format: "image/png",
    //     transparent: true,
    //     version: "1.1.0"
    //   }).addTo(this.map)

    // }else{
    //   this.acclayer = tileLayer
    //   .wms(environment.wmsUrl, {
    //     layers: "irad:iRAD_Accident", //CQL_FILTER:accidentFilter, //CQL_FILTER:"investigating_officer like 'tnpfo%'",
    //     format: "image/png",
    //     transparent: true,
    //     version: "1.1.0"
    //   }).addTo(this.map)
    // }
    console.log(this.acclayer);
    if(this.selection.roadtype!=''){
      this.acclayer.setParams({layers:'irad:iRAD_Accidents'});
    }else{
      this.acclayer.setParams({layers:'irad:iRAD_Accident'});
    }

    if(accidentFilter!=null && this.selection.roadtype!=''){
      accidentFilter+=" and road_class in ('"+(this.selection.roadtype).toString().replace(/,/g, "','")+"')"; 
    }else if(this.selection.roadtype!=''){
      accidentFilter=" [ road_class in ('"+ (this.selection.roadtype).toString().replace(/,/g, "','")+"')"; 
    }

    if(accidentFilter!=null && this.fromdatestr!=''){
      accidentFilter+=" and accident_date_time>= ('"+(this.fromdatestr).toString().replace(/,/g, "','")+"')"; 
    }else if(this.fromdatestr!=''){
      accidentFilter=" [ accident_date_time >= ('"+ (this.fromdatestr).toString().replace(/,/g, "','")+"')"; 
    }

    if(accidentFilter!=null && this.todatestr!=''){
      accidentFilter+=" and accident_date_time<= ('"+(this.todatestr).toString().replace(/,/g, "','")+"')"; 
    }else if(this.todatestr!=''){
      accidentFilter=" [ accident_date_time <= ('"+ (this.todatestr).toString().replace(/,/g, "','")+"')"; 
    }

    if(accidentFilter!=null){
      accidentFilter+="]";
      this.acclayer.setParams({CQL_FILTER:accidentFilter});
    }else{
      this.acclayer.setParams({CQL_FILTER: 'INCLUDE'}); 
    }
    console.log('accidentFilter',accidentFilter);
    


    let id=''+'0'+'0'+'_Layer';
     if(this.LayerArray[id]!=undefined) {
      this.LayerArray[id].setParams({CQL_FILTER:accidentFilter});
    }
    let id1=''+'1'+'0'+'_Layer';
    if(this.LayerArray[id1]!=undefined) {
     this.LayerArray[id1].setParams({CQL_FILTER:accidentFilter});
   }

   this.aoilayer.bringToFront();

  }

  clearFilter(){

    this.selection = { 'severity':'','state': '', 'district': '', 'station': '', 'year': '' ,'roadtype':''};
    this.todate=null;this.fromdate=null; this.todatestr='';this.fromdatestr='';
    this.map.setView([23.443636, 78.267822], 4);
    this.applyFilter();
    this.aoilayer.setParams({CQL_FILTER:['ps_state=000']});
  }


  setLocation() {
    console.log(this.map.getCenter());
    //  this.location.lat=0;//this.map.getCenter().lat;
    // this.location.lng=0;//this.map.getCenter().lng; 
   // this.locService.changeMessage("Hello from Sibling");
   // this.locService.changeLocation(this.map.getCenter());
    this.router.navigate(['/acctabs/tab1/location']);
  }
  // Methos to get device accurate coordinates using device GPS
  async getLocationCoordinates() {



    
    this.locationCoords.status += ' getLocationCoordinates ';
   // const position = await Geolocation.getCurrentPosition();

   await this.geolocation.getCurrentPosition().then((position) => {
    // position.coords.latitude
    // position.coords.longitude
    console.log(position);
  this.locationCoords.latitude = position.coords.latitude;
  this.locationCoords.longitude = position.coords.longitude;
  this.locationCoords.accuracy = position.coords.accuracy;
  this.locationCoords.timestamp = position.timestamp;

  



   
    //console.log(this.map);
    var gpsloc=new LatLng(position.coords.latitude, position.coords.longitude);

    this.map.invalidateSize();
   // this.map.setView(gpsloc, 17);

    var radius = position.coords.accuracy/ 2;
    
   
    this.gpsCircle = circle(gpsloc,{  weight:4,  radius: radius,     color: '#136AEC',     fill: true,     opacity:0.4,     stroke:false,   });
   // this.gpsCircle.addTo(this.map);
    this.gpsCenter = new CircleMarker(gpsloc, { radius: 8,  fillColor: "#3880ff",   color: "#FFF",   weight: 2,    opacity: 1,   fillOpacity: 1   });
  // this.gpsCenter.addTo(this.map);  
  //  this.gpsCenter.bindPopup('your with in '+ (position.coords.accuracy).toFixed(0)+' metres');


  var greenIcon = icon({
    iconUrl: 'assets/icon/blue-pin.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize: [40, 40], // size of the icon
    //  shadowSize:   [50, 64], // size of the shadow
    //  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //  shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
  });

  
  var map=this.map;

  const markPoint = marker(gpsloc, { icon: greenIcon });//.addTo(this.map);
  markPoint.bindPopup('<p>marker</p>');
  //  map.addLayer(markPoint);

  this.map.on('move', function () {
    markPoint.setLatLng(map.getCenter());
    //console.log(map.getCenter());
  });
 /* //Dragend event of map for update marker position
  this.map.on('dragend', function (e) {
    var cnt = map.getCenter();
    var position = markPoint.getLatLng();
    var lat = Number(position['lat']).toFixed(5);
    var lng = Number(position['lng']).toFixed(5);
    //console.log(position);
    //setLeafLatLong(lat, lng);

  });
   */ 

  this.isLocationFound=true;

}).catch((error) => {
  console.log('Error getting location', error);
});



  }

  mapInfo(){
    if(this.infoflag==true){ 
      this.map.removeLayer(this.infomarker);
    }else{
      this.map.addLayer(this.infomarker);
    }
    this.infoflag=!this.infoflag;

  }
  
// Use Capacitor to track our geolocation

  locTrack(){
    if( this.isTracking == true) {
      this.stopTracking(); 
      
    }else  {
      this.map.setView(this.gpsCenter.getLatLng(), 17);
      this.startTracking(); 
    }
  }

  startTracking() {
  

    this.map.addLayer(this.gpsCircle); 
    this.map.addLayer(this.gpsCenter); 
  
    this.isTracking = true;
   
    this.gpssubscription=this.geolocation.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) //Filter Out Errors
    )
    .subscribe(position => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // position.coords.latitude
    // position.coords.longitude
  
    
  
    var gpsloc=new LatLng(position.coords.latitude, position.coords.longitude);
        //this.map.setView(gpsloc, 17);
        this.gpsCircle.setLatLng(gpsloc); 
        this.gpsCircle.setRadius(position.coords.accuracy/2);
        this.gpsCenter.setLatLng(gpsloc);
        this.gpsCenter.bindPopup('your with in '+ (position.coords.accuracy).toFixed(0)+' metres');
     //   console.log('udhaya__gpsloc');
        console.log(gpsloc);
        
    });
    /*this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        console.log(position);
        var gpsloc=new LatLng(position.coords.latitude, position.coords.longitude);
        //this.map.setView(gpsloc, 17);
        this.gpsCircle.setLatLng(gpsloc); 
        this.gpsCircle.setRadius(position.coords.accuracy/2);
        this.gpsCenter.setLatLng(gpsloc);
        this.gpsCenter.bindPopup('your with in '+ (position.coords.accuracy).toFixed(0)+' metres');
      }
    }); */
  }
 
// Unsubscribe from the geolocation watch using the initial ID
stopTracking() {  console.log(this.gpssubscription);
  if(this.gpssubscription._isScalar!=false){
  this.gpssubscription.unsubscribe(); }
  this.map.removeLayer(this.gpsCircle); 
  this.map.removeLayer(this.gpsCenter); 

  this.isTracking = false;
  //this.subscription = this.geolocation.watchPosition();
 // this.subscription.unsubscribe();
/*
  geolocation.clearWatch({ id: this.watch }).then(() => {
    this.isTracking = false;
  });
*/
}

  leafletMap() { console.log('leafletMap');
    if (this.map != undefined){
       //   this.locService.currentLocation.subscribe(location => {
         // this.map.setView(location, 17);
   //   });
      return;
    } 
    var accidentFilter=null;
    console.log('this.user',this.user);
    if(this.user.dept<4 && this.user.state_code!=null){
     accidentFilter="[state='"+this.user.state_code+"'"; 
      this.selection.state=this.user.state_code;
     if(this.user.district_code!=null){
      accidentFilter+=" and district='"+this.user.district_code+"'"; 
      this.selection.district=this.user.district_code;
      if(this.user.station_code!=null){
        accidentFilter+=" and station='"+this.user.station_code+"'"; 
        this.selection.station=this.user.station_code;
      }
     }

    }
    if(accidentFilter!=null){
      accidentFilter+="]";
    }
    


    this.map = new Map('mapId_tab',{
      maxZoom: 22,
      minZoom:4,
      maxBounds: [
          //south west
          [1, 50],
          //north east
          [40, 110]
          ]
    }).setView([23.443636, 78.267822], 4);

    var arcgisonline = tileLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: ""
      }
    );

    var map_dark_matter = tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: 'Dark matter'
    });

    var map_positron = tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'Positron'
    });

    var osm = tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: ""
    }).setZIndex(-1);
    var googleHybrid = tileLayer(
      "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      {
        maxZoom: 50,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    ).setZIndex(-1);
    var googleStreets = tileLayer(
      "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 50,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    ).addTo(this.map).setZIndex(-1);
    var googleTerrain = tileLayer(
      "https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      {
        maxZoom: 50,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    ).setZIndex(-1);

    var googleSat = tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 50,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    ).setZIndex(-1);


      var bhuvanbasemap = tileLayer
      .wms('https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/?', {
        layers: "india3",
        format: "image/jpeg",
        transparent: true,
        version: "1.1.0"
      }).setZIndex(10);

      var bhuvantrans = tileLayer
      .wms('https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/?', {
        layers: "mmi:mmi_india",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).setZIndex(10);


      //https://mt5.mapmyindia.com/advancedmaps/v1/qc4rlpbvhfzayefa8z6z3vlxq8853pft/still_map/14/11706/6833.png

      var mapmyindia = tileLayer("https://mt5.mapmyindia.com/advancedmaps/v1/qc4rlpbvhfzayefa8z6z3vlxq8853pft/still_map/{z}/{x}/{y}.png", {
        attribution: ""
      }).setZIndex(-1);

    var empty = tileLayer("");
    var baseLayers = {
      "No Basemap": empty,
      "Bhuvan Basemap":bhuvanbasemap,
      "MapMyIndia":mapmyindia,
     
     
     // bhuvanSatellite:bhuvanSatellite,
      // 'TNGIS - TAMIL': tngis_gn_v1t,
      //  "TNGIS - ENGLISH": tngis_gn_v1e,
      "Arcgis": arcgisonline,
      "Open Street": osm,
      //  "Bhuvan Satellite": bhuvanSatellite,
      "Google Streets": googleStreets,
      // "Google Terrain":googleTerrain,
      // "Google Hybrid":googleHybrid,
      "Google Satellite": googleSat,
      "Dark":map_dark_matter,
      "Light": map_positron,
      
    };

    var states = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:sp_india_states",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).addTo(this.map)
      .setZIndex(10);

      var districts = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:sp_india_districts",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(9);

      var heatmap = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:sp_irad_accident",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).setZIndex(8);

      var grid = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:Grid_2SQK",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).setZIndex(5);

       this.grid2sk = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:Grid_2SQK",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).addTo(this.map)
      .setZIndex(10);
      
        this.grid2sk.setParams({CQL_FILTER:'gid in (0) '});
      

    var ps_boundary = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:sp_ps_boundary",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ps_location = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:police_stations",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      this.acclayer = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:iRAD_Accidents", //CQL_FILTER:accidentFilter, //CQL_FILTER:"investigating_officer like 'tnpfo%'",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).addTo(this.map)
      .setZIndex(10);
      if(accidentFilter!=null){
        this.acclayer.setParams({CQL_FILTER:accidentFilter});
      }
      this.aoilayer = tileLayer
      .wms(environment.wmsUrl1, {
        layers: "irad:sp_india_states_aoi ", //CQL_FILTER:accidentFilter, //CQL_FILTER:"investigating_officer like 'tnpfo%'",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      }).addTo(this.map)
      .setZIndex(10);
      
         this.aoilayer.setParams({CQL_FILTER:['ps_state=000']});
     

    var ps_poi = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:ps_poi",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ambulance_loc_108 = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:ambulance_loc_108",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var hospitals = tileLayer
      .wms(environment.wmsUrl, {
        layers: "	irad:sp_dh_sdh_gmch_2019",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var hospitals1 = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:dh,irad:phc",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);


      var NationalHighway = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/tngis/wms?", {
        layers: "tngis:NationalHighway,NH",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var sh = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/tngis/wms?", {
        layers: "tngis:SH",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var mdr = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/tngis/wms?", {
        layers: "tngis:MDR",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var odr = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/tngis/wms?", {
        layers: "tngis:ODR",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var rto = tileLayer
      .wms("environment.wmsUrl", {
        layers: "irad:RTO_Location",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);



    var overlays = {
      "States": states,
      
     // "District": districts,
     
     // "Heat Map":heatmap,
     // "Grid":grid,
      "Bhuvan Transport":bhuvantrans,
     // "Police Stations": ps_location,
     /* "Police jurisdiction": ps_boundary,
      "Police Station": ps_location,
      Accident: rta_accident,
      Landmarks: ps_poi,
      Ambulance: ambulance_loc_108,
      "PHC":hospitals1,
      "GH SDH GMCH":hospitals,
      "National Highway":NationalHighway,
      "State Highway":sh,
      "MDR":mdr,
      "ODR":odr,
      "RTO Locations" :rto*/
      "Accidents": this.acclayer,
      "Filter":this.aoilayer,
      "Top Acc Loc": this.grid2sk
    };
var map=this.map; //var infomarker;
    control.layers(baseLayers, overlays).addTo(this.map);
    control.scale().addTo(this.map);

    

    // console.log(this.latitude+'-'+ this.longitude);
     this.infomarker =marker([124.926295, 175.410156],{draggable: true}).addTo(this.map)//.addTo(this.map);
    this.infomarker.bindPopup('<p>marker</p>');
    
    this.infomarker.on('dragend', (e)=>{this.onMapDragend(e)});

    
    

    
      
    //this.map.on('click', onMapClick);

    map.on('click', (e)=>{this.onMapClick(e)});
    


    this.map.invalidateSize();
  /*  var map = this.map;

    var greenIcon = icon({
      iconUrl: 'assets/icon/blue-pin.png',
      //shadowUrl: 'leaf-shadow.png',

      iconSize: [40, 40], // size of the icon
      //  shadowSize:   [50, 64], // size of the shadow
      //  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      //  shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
    });


    


    const markPoint = marker([13.063817, 80.28254], { icon: greenIcon }).addTo(this.map);
    markPoint.bindPopup('<p>marker</p>');
    //  map.addLayer(markPoint);

    this.map.on('move', function () {
      markPoint.setLatLng(map.getCenter());
      //console.log(map.getCenter());
    });
    //Dragend event of map for update marker position
    this.map.on('dragend', function (e) {
      var cnt = map.getCenter();
      var position = markPoint.getLatLng();
      var lat = Number(position['lat']).toFixed(5);
      var lng = Number(position['lng']).toFixed(5);
      //console.log(position);
      //setLeafLatLong(lat, lng);

    });

*/
  }
 
  onMapDragend(e) {
    console.log(e); //this.funGetSelectedInfo(e);
      this.infomarker.setPopupContent("You clicked  at " + (this.infomarker.getLatLng().lat).toFixed(5) +', '+ (this.infomarker.getLatLng().lng).toFixed(5))
      .openPopup();
      let latlng=new LatLng(this.infomarker.getLatLng().lat,this.infomarker.getLatLng().lng);
      this.funGetSelectedInfo(latlng);

  }
  
   onMapClick(e) {
     if(!this.infoflag){return false}
    console.log("You clicked the map at " + e.latlng);
    this.infomarker.setLatLng(e.latlng)
    .setPopupContent("You clicked  at " + e.latlng)
    .openPopup();
    this.funGetSelectedInfo(e.latlng); 
    //console.log(map.getCenter());

  }
  
  funGetSelectedInfo(latlng){
    console.log('info latlng',latlng);  

   
    //this.getInfo(this.infoURL+'0');

    var url;
    var flag=0;
    this.map.eachLayer(function (layer) { console.log(layer);
        //if(flag<=1){flag++; return false}
        var size = layer._map.getSize();
         var point = layer._map.latLngToContainerPoint(latlng, layer._map.getZoom());
        
       
      var surl=layer._url+''; console.log('check geoserver');
      var n = surl.indexOf("geoserver"); 
      if(n!=-1) 
      { console.log('in info'); console.log(layer);
        if(layer.wmsParams.layers == 'irad:iRAD_Accident' || layer.wmsParams.layers == 'irad:sp_irad_accident') { console.log('in  layer in ')
       
      //var url = L.Util.template(layer._url)
       url=layer._url;
          url+="LAYERS="+layer.wmsParams.layers;
          url+="&FORMAT="+layer.wmsParams.format;
          url+="&TRANSPARENT="+layer.wmsParams.transparent;
          url+="&SERVICE=WMS";
          url+="&VERSION="+layer.wmsParams.version;
          url+="&REQUEST=GetFeatureInfo";
          url+="&STYLES="+layer.wmsParams.styles;
          if(layer.wmsParams.CQL_FILTER!=undefined){ 
            var result=(layer.wmsParams.CQL_FILTER).trim(); console.log(result);
             result = result.substring(1, result.length-1); console.log(result);
             //result = result.substring(1, result.length-1); console.log(result);
            // result = result.substring(1, result.length-1); console.log(result);
            url+="&CQL_FILTER="+encodeURI(result); 
          } //console.log(layer.wmsParams.sld);
          if(layer.wmsParams.sld!=undefined){ 
          url+="&SLD="+encodeURI(layer.wmsParams.sld) }
          url+="&SRS=EPSG:4326";
         // url+="&EXCEPTIONS=application/vnd.ogc.se_xml";
          //	url+="&BBOX=8186171.802903,801448.045465,9360244.5572,1645312.837615";
  
          url+="&BBOX="+layer._map.getBounds().toBBoxString();
          url+="&INFO_FORMAT=text/plain";
          url+="&FEATURE_COUNT=2";
          url+="&WIDTH="+size.x;
          url+="&HEIGHT="+size.y;
          
          
          url+="&X="+parseInt(point.x);//+parseInt(event.layerPoint.x);
          url+="&Y="+parseInt(point.y);//parseInt(event.layerPoint.y);
          
          var temp =layer.wmsParams.layers;
          var temp1=temp.split(":"); if(temp1[1]==undefined)temp1[1]=temp1[0];
          
          url+="&QUERY_LAYERS="+temp;
          
          var str = url.replace(/&/g, '%26' );  
         //this.getInfo(str);
          console.log((url)); 
          localStorage.setItem('infourl',url);
          var infourl=decodeURIComponent(str.replace(/\+/g,  " "));
          var link="<a target='_blank' href='"+infourl+"'>Info</a>";
         // this.infomarker.setPopupContent("Your here  at " + (this.infomarker.getLatLng().lat).toFixed(5) +', '+ (this.infomarker.getLatLng().lng).toFixed(5))
         // .openPopup();
         //this.infoURL=url;
         return false;
          }
        }
        
      });
      setTimeout(() => {
        this.getInfo();
      }, 500);
      
      //this.getInfo(this.infoURL);
        
  }

  getInfo() {

    let url=localStorage.getItem('infourl'); localStorage.setItem('infourl','');

   console.log(url);
   if(url==''){ return false}
       let postDate = {
         mode: 'getInfo',
         url: url
       }
       this.api.post('map/getLayerinfo.php', postDate).subscribe((data: any) => {
         
       console.log(data.info.length, data.info);
        var info=data.info;
       //console.log(data.info.accident_id);
       let pdfurl=environment.apiUrl+'reports/accidentpdf.php?ln=en&id='+info.accident_id;
       var link="<br><a href='"+pdfurl+"' target='_blank'>PDF</a>";
       if(info.accident_id!=undefined){
       this.infomarker.setPopupContent("Accident ID : "+info.accident_id +"<br>"+info.landmarks+", Dead :"+info.total_dead+", Injured: "+info.total_injured+ link)
       .openPopup();
       }
   
       });
     }

     showdata(getid){
      if(getid=='1')
      {
          this.layers=false;
          this.filters=true;
          this.styles=true;
          this.legend=true; 
  
          
      }
      else if(getid=='2')
      {
        this.layers=true;
        this.filters=false;
        this.styles=true;
        this.legend=true;
  
      }
      else if(getid=='3')
      {
        this.layers=true;
        this.filters=true;
        this.styles=false;
        this.legend=true;
  
      }
      else if(getid=='4')
      {
        this.layers=true;
        this.filters=true;
        this.styles=true;
        this.legend=false;
  
      }
      
      else
      {
        this.layers=false;
        this.filters=true;
        this.styles=true;
      }
  
    }




   ionViewWillLeave() {
     //this.map.remove();
     this.stopTracking();
   }

   accvisible:boolean=false;
   accident = tileLayer
   .wms("environment.wmsUrl", {
     layers: "irad:sp_tngis_accident",
     format: "image/png",
     transparent: true,
     version: "1.1.0"
   })
   .setZIndex(10);

   showAccident(){
     console.log("accident in",this.accvisible);
     this.accvisible=!this.accvisible;

    if(this.accvisible){
      this.accident.addTo(this.map);
      //76.253399848938 8.0786052860668,80.34235528 13.54412764
      this.map.fitBounds([  [8.0786052860668, 76.253399848938],  [13.54412764, 80.34235528]  ]);
    }else{
     // this.map.removeLayer(this.accident);
     //this.map.setView([23.443636, 78.267822], 4);
    }
         
   }
   accReset(f){
     if(f==1){
    this.map.removeLayer(this.accident);
    this.accident = tileLayer
    .wms("environment.wmsUrl", {
      layers: "irad:sp_tngis_accident",
      format: "image/png",
      transparent: true,
      version: "1.1.0"
    })
    .setZIndex(10);
    this.accident.addTo(this.map);
  }else{
    console.log('rem');
    this.map.removeLayer(this.accident);
    this.map.setView([23.443636, 78.267822], 4);
  }
   }

   accidentFilter(filter){

    console.log(filter);
   // filter="year:2019";
   if(filter=='clear'){
    this.map.fitBounds([  [8.0786052860668, 76.253399848938],  [13.54412764, 80.34235528]  ]);
   }else if(filter=="remove"){
    this.map.removeLayer(this.accident);
    this.map.setView([23.443636, 78.267822], 4);
   }
    
    console.log(this.accident); 
    console.log(this.accident.wmsParams.CQL_FILTER);
    let f=this.accident.wmsParams.CQL_FILTER;
    if(f!=undefined){
      filter=f+' or '+filter;
    }
    console.log(filter);
    this.accident.setParams({CQL_FILTER:filter});
   }



   //---
    removeA(arr,what) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
	


accfiltersev(f){
console.log(f);
var filter='';
console.log(this.accident.wmsParams.CQL_FILTER);
if(this.accsevs.indexOf(f) !== -1){
	console.log("Value exists!") ; 
	this.removeA(this.accsevs, f);
}else{
    console.log("Value does not exists!");
	this.accsevs.push(f);
}
console.log(this.accsevs);
if(this.accsevs.length>0){

let ef=this.accident.wmsParams.CQL_FILTER; console.log('ef='+ef);
 if(ef!='undefined'){
  if(this.accsevy.length>0){
   filter="year in ("+this.accsevy.join(',')+")";
    filter+=" and ";
   }
 }

 filter+="acc_type_id in ("+this.accsevs.join(',')+")"; console.log(filter);
  console.log(filter);
  this.accident.setParams({CQL_FILTER:filter});
 
 }else {
  if(this.accsevy.length>0){
   filter="year in ("+this.accsevy.join(',')+")";
   this.accident.setParams({CQL_FILTER:filter});
   }
 
 }

}

accfilteryear(f){


console.log(f);
var filter='';
console.log(this.accident.wmsParams.CQL_FILTER);
if(this.accsevy.indexOf(f) !== -1){
	console.log("Value exists!") ; 
	this.removeA(this.accsevy, f);
}else{
    console.log("Value does not exists!");
    this.accsevy.push(f);
}
console.log(this.accsevy);
if(this.accsevy.length>0){

let ef=this.accident.wmsParams.CQL_FILTER; console.log('ef='+ef);
 if(ef!='undefined'){
  if(this.accsevs.length>0){
   filter="acc_type_id in ("+this.accsevs.join(',')+")";
    filter+=" and ";
   }
 }

 filter+="year in ("+this.accsevy.join(',')+")"; console.log(filter);
  console.log(filter);
  this.accident.setParams({CQL_FILTER:filter});
 }else {
  if(this.accsevs.length>0){
   filter="acc_type_id in ("+this.accsevs.join(',')+")";
   this.accident.setParams({CQL_FILTER:filter});
   }
 }


}
   //-- map 

   layerClick(i,j,e){
    console.log('click',i,j,e.detail.checked);

    if(e.detail.checked){
      this.addLayer(i,j);
    }else{
      this.removeLayer(i,j);
    }

    console.log(this.layergroup[i]);

    console.log(this.layergroup[i].layers[j]);
    let layer=this.layergroup[i].layers[j];

    // var NationalHighway = tileLayer
    //   .wms(layer.serviceURL, {
    //     layers: layer.layers,
    //     format: layer.format,
    //     transparent: true,
    //     version: "1.1.0"
    //   }).addTo(this.map).bringToFront();
    
  }
   
   addLayer(i,j){ 

    let id=''+i+j+'_Layer';
    let layer=this.layergroup[i].layers[j];
    console.log(' Add layer',i,j);

     if(this.LayerArray[id]==undefined) {
      this.LayerArray[id]=new tileLayer.wms(layer.serviceURL, {
            layers: layer.layers,
            format: layer.format,
            transparent: true,
            styles:layer.style,
            version: "1.1.0"
          }).addTo(this.map).bringToFront();

     }		//alert(lyrdt.filter);
  //     if(lyrdt.filter!=null){ // alert('in');
  //      var filter =lyrdt.filter;
  //    LayerArray[id+'_Layer'].setParams({CQL_FILTER:filter});
  //    if(tmp.label==true) LayerArray[id+'_Label'].setParams({CQL_FILTER:filter});
  //     }else{ //alert(gcqlfilter);
  //      if(gcqlfilter!=null){  //alert(gcqlfilter);
  //      LayerArray[id+'_Layer'].setParams({CQL_FILTER:gcqlfilter});
  //      if(tmp.label==true) LayerArray[id+'_Label'].setParams({CQL_FILTER:gcqlfilter});
  //      }
  //     }
  //     if(lyrdt.sld!=undefined){
  //       LayerArray[id+'_Layer'].setParams({sld:lyrdt.sld});
  //     }
  //    LayerArray[id]=L.layerGroup([LayerArray[id+'_Layer']]);
  //   }
    
  //  if(tmp.label==true){	
  //   LayerArray[id]=L.layerGroup([LayerArray[id+'_Layer'],LayerArray[id+'_Label']]);
  //  }else{
  //   LayerArray[id]=L.layerGroup([LayerArray[id+'_Layer']]);	
  //  }
   this.map.addLayer(this.LayerArray[id]);
   this.LayerArray[id].bringToFront();

   this.aoilayer.bringToFront();
   
   }

  removeLayer(i,j){
    let id=''+i+j+'_Layer';
    console.log(' remove layer',i,j);
    this.map.removeLayer(this.LayerArray[id]);
    }


  
    topAccidentLocation(c){

      this.btntitle="Loading ...";

      console.log(c);
      this.topaccloc=null;

      let postdata={
        mode:'topAccidentLocation',
        selection:this.selection,
        ln:'en',
      }
      this.api.post("map/mapselection.php", postdata).subscribe((data: any) => {
        this.btntitle="Top Accident Location"
         console.log(data);

         this.topaccloc=data.data;
        let gids='0';
         for(let i=0;i<data.data.length;i++){
            gids+=','+data.data[i].gid;
         }

         this.grid2sk.setParams({CQL_FILTER:'gid in ('+gids+' )'}); 
         console.log(' this.grid2sk',this.grid2sk);



      }  );


    }
    goToGrid(gid){

      for(let i=0;i<this.topaccloc.length;i++){
        if(gid==this.topaccloc[i].gid){
          console.log('this.topaccloc[i]',this.topaccloc[i]);
          let extent=JSON.parse(this.topaccloc[i].extent);
          console.log('extent',extent);
         // this.map.fitBounds([  extent.coordinates[3], extent.coordinates[1]  ]);
         //this.map.fitBounds([  [8.0786052860668, 76.253399848938],  [13.54412764, 80.34235528]  ]);
        //console.log('extent.coordinates',extent.coordinates)
        // this.map.fitBounds([ extent.coordinates  ]);

         this.map.setView([extent.coordinates[1],extent.coordinates[0]], 15);

        }
      }

    }

   
    async gridAnalytics(gid) {
      const modalped = await this.modalctrl.create({
        component: AnalyticsComponent,
        cssClass: '',
        showBackdrop: true,
        componentProps: { 'gid': gid }
        /* componentProps: {
           'visibility':this.data.accinfo.visibilty,
           'refhp':'test',
         }*/
      });
  
      modalped.onWillDismiss().then(dataReturned => {
        //   this.histroyreturn = dataReturned.data;
        console.log('Receive: ', dataReturned.data);
        

      });
      return await modalped.present().then(_ => {
        //  console.log('Sending: ', this.phyopnion);
      });
  
    }

    scrollToBottomOnInit() {

      this.content.scrollToBottom(300);

  //     if(ggg==1){
  //       console.log('Go Bottom')
  //     this.content.scrollToBottom(300);
  //     this.ggg=2;
  //     }
  // else if(ggg==2){
  //   console.log('Go Top')
  //     this.content.scrollToTop(300);
  //     this.ggg=1
  // }
    }


    mapTime(flag){

this.timeflag=flag;

      console.log('flag',flag); 
      console.log('this.fromdate;',this.fromdate);
      console.log('this.fromdate;',this.todate);
      this.fromdatestr=''; this.todatestr='';
      
      if(flag=='1D'){

        this.fromdate=new Date();
        this.todate=null;
      }else if(flag=='1W'){
        var date = new Date();
        this.fromdate=new Date(date.setDate(date.getDate() - 7));
        this.todate=new Date();
      }else if(flag=='1M'){
        var date = new Date();
        this.fromdate=new Date(date.setDate(date.getDate() - 30));
        this.todate=new Date();
      }else if(flag=='3M'){
        var date = new Date();
        this.fromdate=new Date(date.setDate(date.getDate() - 90));
        this.todate=new Date();
      }else if(flag=='6M'){
        var date = new Date();
        this.fromdate=new Date(date.setDate(date.getDate() - 180));
        this.todate=new Date();
      }else if(flag=='1Y'){
        var date = new Date();
        this.fromdate=new Date(date.setDate(date.getDate() - 365));
        this.todate=new Date();
      }else if(flag=='All'){
        this.fromdate=null; this.fromdatestr='';
        this.todate=null; this.todatestr='';
      }else if(flag=='CUSTOM'){

      }


if(this.fromdate!=null){      
var fromdate = new Date(this.fromdate);
var dd = String(fromdate.getDate()).padStart(2, '0');
var mm = String(fromdate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = fromdate.getFullYear();

this.fromdatestr = yyyy + '-' + mm + '-' + dd;
console.log(this.fromdatestr); //accident_date_time='2022-03-11'
}
if(this.todate!=null){  
var todate = new Date(this.todate);
var dd = String(todate.getDate()).padStart(2, '0');
var mm = String(todate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = todate.getFullYear();
this.todatestr = yyyy + '-' + mm + '-' + dd;
console.log(this.todatestr); //accident_date_time='2022-03-11'
}
if(flag!='CUSTOM'){ this.applyFilter(); }
    }

}
