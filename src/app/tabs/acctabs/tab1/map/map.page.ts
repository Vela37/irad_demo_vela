import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, control, icon, Marker ,LatLng, circle, CircleMarker,L} from 'leaflet';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { Router } from '@angular/router';

import { Location } from '../../../../models/location.model';
import { LocationService } from '../../../../services/location.service';

import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import {Platform} from '@ionic/angular';
import { TranslateConfigService } from '../../../../translate-config.service'; 
import { AlertController } from '@ionic/angular';
import {environment} from "../../../../../environments/environment";

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
  gpslatlon:any;
  locationCoords: any;
  timetest: any;
 params:any;
  isTracking = false; isDragging=false;
  watch: string;
  user = null;
  gpsCircle:any;
  gpsCenter:any; yellowmen:any;
  selectedLanguage:string;

  constructor(
    private locService: LocationService, private platform:Platform, private alertCtrl: AlertController,
    private router: Router,
    private screenshot:Screenshot,
    private geolocation: Geolocation,
    private translateConfigService: TranslateConfigService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private alertController:AlertController
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
  this.checkGPSPermission();
  this.leafletMap();
    this.getLocationCoordinates();
    
   // this.subscription = this.geolocation.watchPosition();
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          console.log("checkGPSPermission if");
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          console.log("checkGPSPermission else");
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              console.log("requestGPSPermission if");
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              console.log("requestGPSPermission else");
              this.presentAlertConfirm();
              //alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        console.log("askToTurnOnGPS if");

        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => 
      this.presentAlertConfirm()
     // this.router.navigate['/settings']
      //alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Without GPS permission you cannot use this application. Are you sure?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {this.checkGPSPermission();}
      }, {
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });
  }
  ionViewDidEnter() {
   // this.leafletMap();
   this.map.invalidateSize();


   setTimeout (() => {
    // console.log("Hello from setTimeout");
    this.locTrack();
  }, 1000);

  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'iRAD',
      subHeader: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  setLocation() {

    //var dis=this.distance() 
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
    localStorage.setItem('lat',this.map.getCenter().lat);
    localStorage.setItem('lon',this.map.getCenter().lng);

    var dis=this.distance(this.map.getCenter().lat,this.map.getCenter().lng,this.gpsCircle.getLatLng().lat,this.gpsCircle.getLatLng().lng,'K');
    
    dis=Math.round((dis + Number.EPSILON) * 100) / 100;

    console.log("Distance : GPS <--> AccLoc",dis, " Km"); 
    
    if(dis>0.5){
      this.presentAlert('You are away from the Accident spot by  ≈  <b> <span class = "assertive">'+dis+' KM</span></b> <br>(Arial Distance)');
    }

    if(this.subscription!=undefined){  console.log(this.subscription);
      this.subscription.unsubscribe();
      }
  
    // Take a screenshot and save to file if mobile
    if(this.platform.is('cordova')){
      this.screenshot.save('jpg', 80, 'mapscreen').then((res)=>{
        //alert('scrrenshot '+JSON.stringify(res));
        localStorage.setItem('mapscreen',res.filePath);
      });
      console.log("MOBILE")
    }
    


    setTimeout (() => {
     // console.log("Hello from setTimeout");
      this.router.navigate(['/acctabs/tab1/location']);
   }, 2000);
    
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
  this.map.addLayer(this.yellowmen); 
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
      this.gpsCenter.setLatLng(gpsloc);  this.yellowmen.setLatLng(gpsloc);
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
  if(this.subscription){
  this.subscription.unsubscribe(); }
  this.map.removeLayer(this.gpsCircle); 
  this.map.removeLayer(this.gpsCenter); 
  this.map.removeLayer(this.yellowmen); 

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
    if (this.map != undefined){
          this.locService.currentLocation.subscribe(location => {
          this.map.setView(location, 17);
      });
      return;
    } 
    this.map = new Map('mapId_cap',{
      maxZoom: 22,
      minZoom:4,
      maxBounds: [
          //south west
          [5, 65],
          //north east
          [40, 100]
          ]
    }).setView([13.063817, 80.28254], 17);
    control.scale().addTo(this.map);
    //this.map.attributionControl.setAttribution('veera');
   // control.betterscale().addTo(this.map);
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
      .wms(environment.wmsUrl, {
        layers: "irad:sp_ps_district",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

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
        layers: "irad:Accident",
        format: "image/png",
        transparent: true,
        version: "1.1.0"
      })
      .setZIndex(10);

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
      TamilNadu: district,
      "Police jurisdiction": ps_boundary,
      "Police Station": ps_location,
      Accident: rta_accident,
      Landmarks: ps_poi,
      Ambulance: ambulance_loc_108,
      "PHC":hospitals1,
      "GH SDH GMCH":hospitals,
      "RTO Locations" :rto
    };

    control.layers(baseLayers, overlays).addTo(this.map);
    // console.log(this.latitude+'-'+ this.longitude);

   /* var popup = L.popup(); 

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
}*/
  
  //this.map.on('click', onMapClick);

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

   distance(lat1, lon1, lat2, lon2, unit) {

    console.log('calculate distance',lat1, lon1, lat2, lon2, unit);

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

 
}
