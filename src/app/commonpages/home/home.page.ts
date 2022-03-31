import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { AuthService } from '../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { TranslateConfigService } from '../../translate-config.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedLanguage:string;
  params:any
 
  isAuthenticated = false;
  private userSub: Subscription;
  name=null; role=null; flag=0; link='login'; dept=null;
  state_code:string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private translateConfigService: TranslateConfigService,
    ){
    //this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   // console.log('selectedLanguage ',this.selectedLanguage); 
  }
  ngOnInit() {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    console.log('selectedLanguage  homr ',this.selectedLanguage);


    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);

        localStorage.setItem('officename',user.name);
        localStorage.setItem('state_code',user.state_code);
        this.name=user.name; this.dept=user.dept;
        this.role=user.role; this.state_code=user.state_code;
      if( +this.role==5){
          this.flag=5;  this.link='/acctabs/tab2';
        }else if(+this.role<=4){
           this.flag=1; this.link='/admintabs/tab1';
        }else if( +this.role==50 || +this.role==80 ){
            this.flag=5;  this.link='/acctabs/tab2';
        }


        if(this.dept==1){  //  1;"Police"
          if( +this.role==5){
            this.link='/acctabs/tab2';
          }else if(+this.role<=4){
            this.link='/admintabs/tab1';
          }else {
            console.log('Police Link Not Defind');
          }
         
        }else if(this.dept==2){   //2;"Transport"

            if(+this.role>30 && +this.role<36){
              this.link='/admintabs/tab1';
            }else {
              this.link='/acctabs/tab2';
            }
        }else if(this.dept==3){   //3;"Highways"

        if(user.role=='75'){
          this.link='/acctabs/tab2';
        }else{
          this.link='/admintabs/tab1';
        }
        }else if(this.dept==4){   //4;"Health"
          this.link='/acctabs/tab2';
        }else {
          this.link='/admintabs/tab1';
          console.log('user dept Link Not Defind',user);
        }


      }else{
        this.flag=0
      }
    });
    console.log(this.link);
    this.router.navigate([this.link]);
  }
  languageChanged(){ console.log('Language');
    this.translateConfigService.setLanguage(this.selectedLanguage);
    console.log(this.selectedLanguage);
  }

  ionViewDidEnter() {
    this.router.navigate([this.link]);
  }

}
