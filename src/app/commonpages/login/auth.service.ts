import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { environment } from '../../../environments/environment';
import {ApiService} from '../../services/api.service';

import * as CryptoJS from 'crypto-js';

export interface AuthResponseData {
  message: string;
  kind: string;
  idToken: string;
  userid: string;
  name: string;
  role:string;
  dept:string;
  state_code:string;
  district_code:string;
  station_code:string;
  office_id:string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private apiUrl= environment.apiUrl;
  constructor(private http: HttpClient, private router: Router,private api:ApiService) {}

  signup(userid: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.apiUrl+'register',
        JSON.stringify({
          useid: userid,
          password: password,
          deviceInfo:localStorage.getItem('deviceInfo'),
          returnSecureToken: true
        })
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.userid,
            resData.name,
            resData.role,
            resData.dept,
            resData.state_code,
            resData.district_code,
            resData.station_code,
            resData.office_id,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  get(value){
    var key = CryptoJS.enc.Utf8.parse("veudhegorasusadh");
    //var iv = CryptoJS.enc.Utf8.parse(keys);
    let val="c5dKyBvTQ/sTeJSRJts/jg=="
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128,
        //iv: iv,
        mode: CryptoJS.mode.ECB,
        //padding: CryptoJS.pad.Pkcs7
    });

    console.log("Encrypt end=",decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  login(userid: string, password: string, dept:string,captcha: string,randval:string) {
    return this.http
      .post<AuthResponseData>(
        this.apiUrl+'login_enc.php',
        JSON.stringify({
          userid: userid,
          password: password,
          dept_code:dept,
          captcha:captcha,
          randval:randval,
          deviceInfo:localStorage.getItem('deviceInfo'),
          loc:localStorage.getItem('logingps'),
          uuid:localStorage.getItem('uuid'),
          uuid1:localStorage.getItem('uuid1'),
          returnSecureToken: true
        })
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.userid,
            resData.name,//this.get(resData.name)
            this.get(resData.role),// resData.role,
            this.get(resData.dept),//resData.dept,
            resData.state_code,
            resData.district_code,
            resData.station_code,
            resData.office_id,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  autoLogin() {
    const userData: {
      userid: string;
      name: string;
      role:string;
      dept:string;
      state_code:string;
      district_code:string;
      station_code:string;
      office_id:string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.userid,
      userData.name,
      userData.role,
      userData.dept,
      userData.state_code,
      userData.district_code,
      userData.station_code,
      userData.office_id,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() { 
    
    console.log('Logout');
    
    console.log(this.user);
    let postDate={
      mode:'logout',
     // pwd:this.user
    }

    this.api.post('update.php',postDate).subscribe((data: any)=>{
      console.log(data); 
      
    });

    
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('accid');
    localStorage.removeItem('logintime');
   // localStorage.clear();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    userid: string,
    name: string,
    role:string,
    dept:string,
    state_code:string,
    district_code:string,
    station_code:string,
    office_id:string,
    userId: string,
    token: string,
    expiresIn: number
  ) { 
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //console.log(expirationDate);
    const user = new User(userid,name,role,dept,state_code,district_code,station_code,office_id, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('logintime', JSON.stringify(new Date().getTime())); 
  }

  private handleError(errorRes: HttpErrorResponse) { //console.log(errorRes.error);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
   /* switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }*/
    errorMessage=errorRes.error.message;
    return throwError(errorMessage);
  }
}
