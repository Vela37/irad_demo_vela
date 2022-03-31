import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import { Location } from "../../models/location.model";
import { SelectlocationComponent } from "./selectlocation/selectlocation.component";
import { Router } from "@angular/router";
import { AuthService } from "../login/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-stationinfo",
  templateUrl: "./stationinfo.page.html",
  styleUrls: ["./stationinfo.page.scss"],
})
export class StationinfoPage implements OnInit {
  stationinfo = {
    name: "",
    ps_code:'',
    ncrp_code:'',
    landline: "",
    email: "",
    location: "",
    district:'',
    state:'',
    address: "",
    latitude: "",
    longitude: "",
    remarks: "",
  };
  location: Location = new Location();
  locdisable: boolean = false;
  accloc: string;
  roaddisp: any;
  editflag = false;
  private userSub: Subscription; isAuthenticated = false; user:any;

  constructor(
    private modalctrl: ModalController,  private router: Router,
    private toastController: ToastController,
    private api: ApiService,private authService: AuthService,
  ) {}

  ngOnInit() {

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;


      }

    });

    this.loadpsinfo();
  }

  doRefresh(event) {
    this.loadpsinfo();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 1000);
  }

  stationEdit() {
    this.editflag = true;
  }
  closeModal() {
    this.editflag = false;
  }

  viewLocation() {
    //this.router.navigate(["/viewaccloc"]);
  }

  public loadpsinfo() {
    let postDate = {
      mode: "loadstationinfo",
    };
    this.api.post("profile.php", postDate).subscribe((data: any) => {
      let valuedata = data;
      console.log("----->", valuedata);
      console.log("----->", valuedata.data[0].ps_name);
      this.stationinfo.name = valuedata.data[0].ps_name;
      this.stationinfo.ps_code = valuedata.data[0].ps_code;
      this.stationinfo.ncrp_code = valuedata.data[0].ncrp_code;
      this.stationinfo.district = valuedata.data[0].district;
      this.stationinfo.state = valuedata.data[0].state;
      this.stationinfo.address = valuedata.data[0].address;
      this.stationinfo.email = valuedata.data[0].email;
      this.stationinfo.landline = valuedata.data[0].landline;
      this.stationinfo.latitude = valuedata.data[0].latitude;
      this.stationinfo.remarks = valuedata.data[0].remarks;
      this.stationinfo.longitude = valuedata.data[0].longitude;

      this.location.lat = valuedata.data[0].latitude;
      this.location.lng = valuedata.data[0].longitude;

      if(this.location.lat!=null) {
      this.accloc = "Lat:" + this.stationinfo.latitude + ",       Long:" +  this.stationinfo.longitude;
      }
    });
  }

  public saveInfo() {
    let postDate = {
      mode: "stationinfo",
      stationinfo: this.stationinfo,
    };
    this.api.post("profile.php", postDate).subscribe((data: any) => {
      console.log(data);
      this.editflag = false;
    });
  }

  public formSubmit() {

    this.stationinfo.name =this.stationinfo.name .trim();
    console.log(this.stationinfo);
    if (this.stationinfo.name =='') {
      this.presentToast("Name Should be at least 3 Characters");
      return false;
    }

    if(this.stationinfo.latitude==null){
      this.presentToast("Please Select Police Station Location");
      return false;
    }
    this.saveInfo();

    
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  public checkname($event) {
    let username = $event.target.value;
    console.log("username" + $event.target.value);
    username.trim;
    this.stationinfo.name = username;
  }

  async pickLoc() {
    this.locdisable = true;
    console.log("pick Loc");
    console.log("location", this.location);
    const modalped = await this.modalctrl.create({
      component: SelectlocationComponent,
      componentProps: { location: this.location },
      /* componentProps: {
           'visibility':this.data.accinfo.visibilty,
           'refhp':'test',
         }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      this.locdisable = false;
      //   this.histroyreturn = dataReturned.data;
      console.log("Receive: ", dataReturned.data);
      //   console.log(this.location);

      this.stationinfo.latitude = dataReturned.data.lat.toFixed(6);
      this.stationinfo.longitude = dataReturned.data.lng.toFixed(6);
      if(this.stationinfo.latitude!=null) {
        this.accloc =
        "Lat:" +
        this.stationinfo.latitude +
        ",       Long:" +
        this.stationinfo.longitude;
        }
     
      /*
        if (dataReturned.data ==true) {
          this.accloc='Lat:'+this.location.lat.toFixed(6)+',       Long:'+this.location.lng.toFixed(6);
          console.log('acclocsdfsdfsdfsdf',this.accloc);

          this.stationinfo.latitude=this.location.lat.toFixed(6);  
          this.stationinfo.longitude=this.location.lng.toFixed(6);   
        }
        */
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }
}
