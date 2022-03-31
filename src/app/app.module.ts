import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { AnimatedDigitComponent } from "./components/animated-digit/animated-digit.component";

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './commonpages/login/auth-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './translate-config.service';
import { IonicStorageModule } from '@ionic/storage';
import { DataService } from './services/data.service';

import { SQLite } from '@ionic-native/sqlite/ngx';
//Check Network
import { Network } from '@ionic-native/network/ngx';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { LocalstorageService } from './services/localstorage.service';
import { NotificationComponent } from '../app/tabs/notification/notification.component';
import { ViewprofileComponent } from '../app/popups/viewprofile/viewprofile.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
//import {UserfilterPipe } from './pipes/userfilter.pipe';
import { DatePipe } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable'; 

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,MenuItemComponent,NotificationComponent,ViewprofileComponent,AnimatedDigitComponent],
  entryComponents: [NotificationComponent,ViewprofileComponent],
  imports: [BrowserModule,
    FormsModule ,
    IonicSelectableModule,
    Ng2OdometerModule.forRoot(), 
    HttpClientModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }), 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__iraddb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar, AppUpdate,LocalstorageService,
    Base64,  Geolocation,FCM,DatePipe ,
    SplashScreen,TranslateConfigService,DataService,SQLite,Network,FilePath,File,WebView,
   // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true  }
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
