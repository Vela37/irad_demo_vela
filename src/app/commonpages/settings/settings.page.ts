import { Component, OnInit, Version } from "@angular/core";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateConfigService } from "../../translate-config.service";
import { ApiService } from "../../services/api.service";
import { LocalstorageService } from "../../services/localstorage.service";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "../../commonpages/login/auth.service";
import { AppUpdate } from "@ionic-native/app-update/ngx";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { AlertController, ModalController } from '@ionic/angular';
import { DetailserviceComponent } from "../settings/detailservice/detailservice.component";

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  mobiledevice: any;

  private userSub: Subscription;
  isAuthenticated = false;
  selectedLanguage: string;
  params: any;
  user: any=null;
  version: any = environment.version;
  name = "";
  dev: boolean;

  selection = { 'severity':'','state': '', 'district': '', 'station': '', 'year': '' };
  constructor(
    private translateConfigService: TranslateConfigService,
    private router: Router,
    private api: ApiService,
    private appUpdate: AppUpdate,
    private localdb: LocalstorageService,
    private platform: Platform,
    private authService: AuthService,
    private splashScreen: SplashScreen,
    private modalctrl: ModalController,
    private statusBar: StatusBar
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    console.log("selectedLanguage ", this.selectedLanguage);
    this.mobiledevice = this.localdb.checkPlatform();
  }
  ngOnInit() {
    //this.version='';
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem("ln");
    console.log("selectedLanguage ", this.selectedLanguage);

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user);
        this.user = user;
      }
    });

    this.dev = localStorage.getItem("dev") === "true";
  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
    localStorage.setItem("ln", this.selectedLanguage);
  }
  checkLocaldb() {
    this.localdb.checkLocalStorage();
  }

  enableDevMode() {
   // if (this.user.role > 2) return false;
    console.log("enableDevMode");
    this.dev = localStorage.getItem("dev") === "true";
    this.dev = !this.dev;
    console.log(this.dev);
    localStorage.setItem("dev", this.dev + "");
  }
  async funService() {
    const modalped = await this.modalctrl.create({
      component: DetailserviceComponent,
      //componentProps: { selection: this.selection },
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
    });

    modalped.onWillDismiss().then((dataReturned) => {
      //   this.histroyreturn = dataReturned.data;
      // console.log("Receive: ", dataReturned.data);

      // if (dataReturned.data != undefined) {
      //   if (dataReturned.data.severity != undefined) {
      //     this.selection = dataReturned.data;
      //     console.log("Returened ", this.selection);
      //     // this.applyFilter();
      //   }
      // }
    });
    return await modalped.present().then((_) => {
      //  console.log('Sending: ', this.phyopnion);
    });
  }

  updateMaster() {
    this.router.navigate(["/master"]);
  }

  updateApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const updateUrl = environment.updateURL;
      this.appUpdate
        .checkAppUpdate(updateUrl)
        .then((update) => {
          //alert("Update Status:  "+update.msg);
          console.log(this.appUpdate);
           console.log('update',update);
          // alert(update.msg);
        })
        .catch((error) => {
          //alert("Error: "+error.msg);
          console.log("error", error);
          // alert(error.msg);
        });
    });
  }
}
