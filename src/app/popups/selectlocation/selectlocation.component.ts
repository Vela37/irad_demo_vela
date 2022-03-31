import { Component, OnInit, Input,Output,EventEmitter, Injectable   } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';
import { Map, tileLayer, marker, control, icon, Marker ,LatLng, circle, CircleMarker} from 'leaflet';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Location } from '../../models/location.model';
//import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-selectlocation',
  templateUrl: './selectlocation.component.html',
  styleUrls: ['./selectlocation.component.scss'],
})
export class SelectlocationComponent implements OnInit {

  @Input() histroy: any;
  @Input() dept: any;
  @Input() lat:string;
  @Input() lng:string;
 

  isLocationFound:boolean; locationError:boolean=false;

  location: Location;
  map: any;
  markPoint1: any;

  locationCoords: any;
  timetest: any;

  isTracking = false;
  watch: string;
  user = null;
  gpsCircle:any;
  gpsCenter:any; isDragging:boolean=false;
   yellowmen:any;   gpslatlon:any
  constructor(
    private modalctrl:ModalController,
    private geolocation: Geolocation,
   // private locService: LocationService,

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


  ngOnInit() { console.log('map init');
  this.leafletMap();
    this.getLocationCoordinates();
  }
  ionViewDidEnter() {
   // this.leafletMap();
   this.map.invalidateSize();
  }

  
mapDrgg(){
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

  setLocation() {
    console.log(this.map.getCenter());
    //  this.location.lat=0;//this.map.getCenter().lat;
    // this.location.lng=0;//this.map.getCenter().lng; 
   // this.locService.changeMessage("Hello from Sibling");
   // this.locService.changeLocation(this.map.getCenter());
    this.lat=this.map.getCenter().lat;
    this.lng=this.map.getCenter().lng;
    this.closemodal();
  }
  // Methos to get device accurate coordinates using device GPS
  async getLocationCoordinates() {
    this.locationCoords.status += ' getLocationCoordinates ';
   // const position = await Geolocation.getCurrentPosition();


   var ymIcon = icon({
    //iconUrl: 'assets/icon/blue-pin.png',
    iconUrl: 'assets/icon/ym3.png',
    //shadowUrl: 'leaf-shadow.png',

    //iconSize: [40, 40], // size of the icon
    //  shadowSize:   [50, 64], // size of the shadow
    //  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //  shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
    iconSize: [40, 40], // size of the icon
    //  shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [19,35], // point of the icon which will correspond to marker's location
    //  shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor

  });


   await this.geolocation.getCurrentPosition().then((position) => {
    // position.coords.latitude
    // position.coords.longitude
    console.log(position);
  this.locationCoords.latitude = position.coords.latitude;
  this.locationCoords.longitude = position.coords.longitude;
  this.locationCoords.accuracy = position.coords.accuracy;
  this.gpslatlon= this.locationCoords.latitude +","+this.locationCoords.longitude;
  //this.locationCoords.timestamp = position.timestamp;
  localStorage.setItem('accq',this.locationCoords.accuracy);
  //localStorage.setItem('accq',this.locationCoords.accuracy);

  localStorage.setItem('gps',this.gpslatlon);




   
    //console.log(this.map);
    var gpsloc=new LatLng(position.coords.latitude, position.coords.longitude);

    this.map.invalidateSize();
    this.map.setView(gpsloc, 17);

    var radius = position.coords.accuracy/ 2;
    
   
    this.gpsCircle = circle(gpsloc,{  weight:4,  radius: radius,     color: '#136AEC',     fill: true,     opacity:0.4,     stroke:false,   });
   // this.gpsCircle.addTo(this.map);
    this.gpsCenter = new CircleMarker(gpsloc, { radius: 8,  fillColor: "#3880ff",   color: "#FFF",   weight: 2,    opacity: 1,   fillOpacity: 1   });
  // this.gpsCenter.addTo(this.map);  
  //  this.gpsCenter.bindPopup('your with in '+ (position.coords.accuracy).toFixed(0)+' metres');

  this.yellowmen=marker(gpsloc, {icon: ymIcon}).addTo(this.map);

  var greenIcon = icon({
    //iconUrl: 'assets/icon/blue-pin.png',
    iconUrl: 'assets/icon/red-pin1.png',
    //shadowUrl: 'leaf-shadow.png',

    //iconSize: [40, 40], // size of the icon
    //  shadowSize:   [50, 64], // size of the shadow
    //  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //  shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
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
  
  var map=this.map;
  

  const markPoint = marker(gpsloc, { icon: greenIcon }).addTo(this.map);
  markPoint.bindPopup('<p>Accident Location</p>');
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

  this.isLocationFound=true; this.locationError=false;

}).catch((error) => {
  console.log('Error getting location', error);
  this.locationError=true;
  alert("Please On/Share Your Location(GPS)");
});

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

}
 
// Unsubscribe from the geolocation watch using the initial ID
stopTracking() { 
  

  this.map.removeLayer(this.gpsCircle); 
  this.map.removeLayer(this.gpsCenter); 
}

  leafletMap() { console.log('leafletMap');
    if (this.map != undefined){
         // this.locService.currentLocation.subscribe(location => {
         // this.map.setView(location, 17);
     // });
      return;
    } 
    this.map = new Map('mapId_popup').setView([23.443636, 78.267822], 4);

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

    var district = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:sp_ps_district",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ps_boundary = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:sp_ps_boundary",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ps_location = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:ps_location",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var rta_accident = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:Accident",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ps_poi = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:ps_poi",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var ambulance_loc_108 = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:ambulance_loc_108",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var hospitals = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "	irad:sp_dh_sdh_gmch_2019",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

      var hospitals1 = tileLayer
      .wms("https://gisnic.tn.nic.in/geoserver/irad/wms?", {
        layers: "irad:dh,irad:phc",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

    var overlays = {
      TamilNadu: district,
      "Police jurisdiction": ps_boundary,
      "Police Station": ps_location,
    //  Accident: rta_accident,
      Landmarks: ps_poi,
      Ambulance: ambulance_loc_108,
      "PHC":hospitals1,
      "GH SDH GMCH":hospitals
    };

    control.layers(baseLayers, overlays).addTo(this.map);
    // console.log(this.latitude+'-'+ this.longitude);

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
     this.stopTracking();
   }
  

  closemodal()
  {
    
    this.histroy = { lat:this.lat,lng:this.lng,dept:this.dept};
    this.modalctrl.dismiss(this.histroy);
  }
}
