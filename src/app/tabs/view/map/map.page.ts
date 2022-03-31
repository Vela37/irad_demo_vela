import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, control, icon, Marker ,LatLng, circle, CircleMarker} from 'leaflet';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';

import { Location } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';

import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { TranslateConfigService } from '../../../translate-config.service'; 
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  isLocationFound:boolean; locationError:boolean=false;
  location: Location;
  map: any;
  markPoint1: any;
  subscription:Subscription;
  gpslatlon:any
  locationCoords: any;
  timetest: any;
  params:any;
  isTracking = false; isDragging=false;
  watch: string;
  user = null;
  gpsCircle:any;
  gpsCenter:any;
  selectedLanguage:string; mapscreenflag:boolean=false; photos:any; selacc:any;

  data:any;
  poi:any; near_ps_loc:{'name':'',"distance":''}; ps_boundary:{'name':'',"distance":''};
  private userSub: Subscription; isAuthenticated = false;
  constructor(
    private locService: LocationService,  private base64: Base64,
    private router: Router, private api:ApiService,
    private screenshot:Screenshot,
    private geolocation: Geolocation,  private authService: AuthService,
    private translateConfigService: TranslateConfigService
  ) {

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
    this.translateConfigService.setLanguage(this.selectedLanguage);
  
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: "",
      status: 'constructor'
    }
    this.timetest = Date.now();
    this.isLocationFound=false;

    this.gpsCenter = new CircleMarker(new LatLng(25.20,77.95), { radius: 8,  fillColor: "#3880ff",   color: "#FFF",   weight: 2,    opacity: 1,   fillOpacity: 1   });
    
  }


  ngOnInit() { console.log('map init');

  this.selacc = JSON.parse(localStorage.getItem('selacc'));

  if(localStorage.getItem('mapscreenflag')=='1'){
    this.mapscreenflag=true;
  }

   // this.accid = this.selacc.accid;

  this.authService.autoLogin();
  this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user; // console.log(user);
    console.log('user',user);
    this.user=user;
    if(this.isAuthenticated){ console.log(user.name);
    }
  });

  this.leafletMap();
    this.getLocationCoordinates();

    this.showAccLoc();
    
   // this.subscription = this.geolocation.watchPosition();
  }
  ionViewDidEnter() {
   // this.leafletMap();
   this.map.invalidateSize();


   setTimeout (() => {
    // console.log("Hello from setTimeout");
   // this.locTrack();
  }, 1000);

  }

  setLocation() {

    
  //console.clear();
  if(this.map.getZoom()<15) {
    this.map.setZoom(15); return;
  }

 console.log(this.map.getZoom());

//alert(JSON.stringify(navigator));

    console.log(this.map.getCenter());
    //  this.location.lat=0;//this.map.getCenter().lat;
    // this.location.lng=0;//this.map.getCenter().lng; 
    this.locService.changeMessage("Hello from Sibling");
    this.locService.changeLocation(this.map.getCenter());
   // localStorage.setItem('lat',this.map.getCenter().lat);
   // localStorage.setItem('lon',this.map.getCenter().lng);
   

   // if(this.subscription!=undefined){  console.log(this.subscription);
    //  this.subscription.unsubscribe();
   //   }
  
    // Take a screenshot and save to file
    this.screenshot.save('jpg', 80, 'mapscreen').then((res)=>{
      //alert('scrrenshot '+JSON.stringify(res));
      //localStorage.setItem('mapscreen',res.filePath);
      let mapscreen=res.filePath;
      if (mapscreen !== '') {
        this.getBase64StringByFilePath(mapscreen)
          .then((res) => {
            //alert('res 64 ' + res); //this.audio=res;
            var base64Only = res.slice(34);
            this.photos = "data:image/jpg;base64," + base64Only;
  
            //  alert('screen '+this.photos[0]);
           // this.photos_us[0] = 1;
           // this.uploadpicture(0);

           let postDate = {
            mode: 'imageupload',
            accid: this.selacc.accid,
            imageflag: 0,
            image: this.photos
          }
          // alert(JSON.stringify(postDate));
          this.api.post('imgupload', postDate).subscribe(
            (data: any) => {
              console.log(data);
              localStorage.removeItem('mapscreenflag');
            //  this.photos_us[flag] = 3;
      
            });
           
            //do something with base64 string
          });
      }

    });


    setTimeout (() => {
     // console.log("Hello from setTimeout");
     history.back();
     // this.router.navigate(['/acctview']);
   }, 1000);
    
  }


  showAccLoc(){



    var latitude=localStorage.getItem('lat');
    var longitude=localStorage.getItem('lon');
   

    var accloc=new LatLng(latitude, longitude);

    this.map.invalidateSize();
    this.map.setView(accloc, 17);

    var greenIcon = icon({
      iconUrl: 'assets/icon/red-pin1.png',
      //shadowUrl: 'leaf-shadow.png',
  
      iconSize: [40, 40], // size of the icon
      //  shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [20,40], // point of the icon which will correspond to marker's location
      //  shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
    });
  
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    
   // var map=this.map;

   var selacc=JSON.parse(localStorage.getItem('selacc')); console.log( selacc);
  
    const markPoint = marker(accloc, { icon: greenIcon }).addTo(this.map);
    markPoint.bindPopup('<p>Accident ID :<b>'+selacc.accid+'</b><br>'+selacc.landmark+'<br> on '+selacc.datetime+'</p>');
    //.openPopup();


    


this.showLocation();
  }

  

  takeScreenshot() {
    // this.screenshot.save().then(()=>{
    //   alert("Screenshot taken");
    // });
    this.screenshot.save('jpg', 80, 'myscreenshot').then(res => {
      console.log("Taking Screenshot",res.filePath);
       
      localStorage.setItem('mapscreen',res.filePath);

    });
  }

  showLocation(){
    // alert(JSON.stringify(this.location));

    var latitude=localStorage.getItem('lat');
    var longitude=localStorage.getItem('lon');
   

    this.api.post('police_service',{'lat':latitude,'lng':longitude})
    .subscribe(
      (data: any)=>{ 
     console.log(data); 
    // this.message=JSON.stringify(data);
    // alert( this.message)
     this.data=data;
     this.poi=new Array(); this.near_ps_loc={'name':'',"distance":''}; this.ps_boundary={'name':'',"distance":""};
 
     if(!data.ps_boundary.res){
 
       this.near_ps_loc.name=data.near_ps_loc.near_police_station.ps_name;
       this.near_ps_loc.distance=data.near_ps_loc.near_police_station.distance;
 
       this.ps_boundary.name=data.ps_boundary.ps_boundary.ps_name;
       this.ps_boundary.distance=data.ps_boundary.ps_boundary.distance;
      
      // this.loginform.controls['policejur'].value;
     // this.loginform.controls['policejur'].setValue(this.ps_boundary.name)
 
       console.log('ps_boundary',data.ps_boundary);
       console.log('near_ps_loc',data.near_ps_loc);
     }
 var j=0;
     for(var i=1;i<data.poi.poi.length;i++){
       this.poi.push(data.poi.poi[i]);

      marker([ this.poi[j].lat, this.poi[j].lon]).addTo(this.map)
       .bindPopup("<b>"+this.poi[j].name+"</b><br />"+this.poi[j].distance);
       j++;
     }
     //console.log(this.poi);
    
    },
    (error)=>{
    console.log(JSON.stringify(error));
    });
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
  this.gpslatlon= this.locationCoords.latitude +","+this.locationCoords.longitude;
  //this.locationCoords.timestamp = position.timestamp;
  //localStorage.setItem('accq',this.locationCoords.accuracy);
  //localStorage.setItem('accq',this.locationCoords.accuracy);

  //localStorage.setItem('gps',this.gpslatlon);




   
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

  this.map.dragging.disable();
  this.map.touchZoom.disable();
  this.map.doubleClickZoom.disable();
  this.map.scrollWheelZoom.disable();
  
  //var map=this.map;

   /*const markPoint = marker(gpsloc, { icon: greenIcon }).addTo(this.map);
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

  this.isLocationFound=true; this.locationError=false;

}).catch((error) => {
  console.log('Error getting location', error);
  this.locationError=true;
  alert("Please On/Share Your Location(GPS)");
});

  }

  
  
// Use Capacitor to track our geolocation


mapDrgg(){
 // this.takeScreenshot();
  this.isDragging=!this.isDragging;

  if( this.isDragging == true) {
   this.map.dragging.enable();
   this.map.touchZoom.enable();
   this.map.doubleClickZoom.enable();
   this.map.scrollWheelZoom.enable();
  }else{
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
  }
}

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
 
 
  this.subscription=this.geolocation.watchPosition()
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
stopTracking() { 
  
  this.subscription.unsubscribe();
  this.map.removeLayer(this.gpsCircle); 
  this.map.removeLayer(this.gpsCenter); 

  this.isTracking = !this.isTracking
  //this.subscription = this.geolocation.watchPosition();
 // this.subscription.unsubscribe();
/*
  geolocation.clearWatch({ id: this.watch }).then(() => {
    this.isTracking = false;
  });
*/
}

  leafletMap() { console.log('leafletMap');


  var accidentFilter=null;
  if(this.user.state_code!=null){
   accidentFilter="[state='"+this.user.state_code+"'"; 

   if(this.user.district_code!=null){
    accidentFilter+=" and district='"+this.user.district_code+"'"; 

    if(this.user.station_code!=null){
      accidentFilter+=" and station='"+this.user.station_code+"'"; 
    }
   }
  

  }

  if(accidentFilter!=null){
    accidentFilter+="]";
  }


    if (this.map != undefined){
          this.locService.currentLocation.subscribe(location => {
          this.map.setView(location, 17);
      });
      return;
    } 
    this.map = new Map('mapId_view',
                        {
                          maxZoom: 22,
                          minZoom:4,
                          maxBounds: [
                              //south west
                              [5, 65],
                              //north east
                              [40, 100]
                              ]
                        } 
                        ).setView([13.063817, 80.28254], 17);

    var arcgisonline = tileLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: ""
      }
    );

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
    var empty = tileLayer("");
    var baseLayers = {
      "No Basemap": empty,
      // 'TNGIS - TAMIL': tngis_gn_v1t,
      //  "TNGIS - ENGLISH": tngis_gn_v1e,
      "Arcgis": arcgisonline,
      "Open Street": osm,
      //  "Bhuvan Satellite": bhuvanSatellite,
      "Google Streets": googleStreets,
      // "Google Terrain":googleTerrain,
      // "Google Hybrid":googleHybrid,
      "Google Satellite": googleSat
    };

    

    var districts = tileLayer
    .wms(environment.wmsUrl, {
      layers: "irad:sp_india_districts",
      format: "image/png",
      transparent: true,
      version: "1.1.0"
    })
    .setZIndex(10);
    
    var states = tileLayer
    .wms(environment.wmsUrl, {
      layers: "irad:sp_india_states",
      format: "image/png",
      transparent: true,
      version: "1.1.0"
    }).addTo(this.map)
    .setZIndex(9);
    
    var irad_accident = tileLayer
    .wms(environment.wmsUrl, {
      layers: "irad:iRAD_Accident", //CQL_FILTER:accidentFilter, //CQL_FILTER:"investigating_officer like 'tnpfo%'",
      format: "image/png",
      transparent: true,
      version: "1.1.0"
    })//.addTo(this.map)
    .setZIndex(10);
    if(accidentFilter!=null){
      irad_accident.setParams({CQL_FILTER:accidentFilter});
    }

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
        layers: "irad:ps_location",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var rta_accident = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:iRAD_Accident",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })//.addTo(this.map)
      .setZIndex(10);
      if(accidentFilter!=null){
        rta_accident.setParams({CQL_FILTER:accidentFilter});
      }

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
      var rto = tileLayer
      .wms(environment.wmsUrl, {
        layers: "irad:RTO_Location",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var overlays = {
      "States": states,
      "District": districts,
      "Accidents": irad_accident,
      /*
      States: state, 
      "Police jurisdiction": ps_boundary,
      "Police Station": ps_location,
      Accident: rta_accident,
      Landmarks: ps_poi,
      Ambulance: ambulance_loc_108,
      "PHC":hospitals1,
      "GH SDH GMCH":hospitals,
      "RTO Locations" :rto*/
    };

    control.layers(baseLayers, overlays).addTo(this.map);
    // console.log(this.latitude+'-'+ this.longitude);


    // function onMapClick(e) {
    //   alert("You clicked the map at " + e.latlng);
    //     // popup
    //     //     .setLatLng(e.latlng)
    //     //     .setContent("You clicked the map at " + e.latlng.toString())
    //     //     .openOn(this.map);
    // }
      
    // this.map.on('click', onMapClick);
    
        this.map.invalidateSize();


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

   ionViewWillLeave() {
     //this.map.remove();
    // this.stopTracking();
   }
 

   public getBase64StringByFilePath(fileURL: string): Promise<string> {

    return new Promise((resolve, reject) => {
      this.base64.encodeFile(fileURL).then((base64File: string) => {
        resolve(base64File);
      }, (err) => {
        console.log(err);
      });
    })
  }
}
