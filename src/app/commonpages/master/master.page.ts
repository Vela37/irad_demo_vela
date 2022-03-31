import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../../translate-config.service';
import { ApiService } from '../../services/api.service';
import { UsersService } from '../../services/shared.service';
import { AuthService } from '../../commonpages/login/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';

import { MasterupdateComponent } from './masterupdate/masterupdate.component';
import {MasterinsertComponent } from './masterinsert/masterinsert.component';
@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  private userSub: Subscription; isAuthenticated = false; loading: boolean = false; cdview: number = 1;
  selectedLanguage: string; params: any; user: any = null; searchTerm:string='';
  tableList: any = null; tableData: any = []; filterData:any;
  dev: boolean = false;

  taflag:boolean=false; 
  hiflag:boolean=false; 
  teflag:boolean=false; 
  knflag:boolean=false; 
  mrflag:boolean=false; 
  asmflag:boolean=false; 
  odflag:boolean=false; 
  paflag:boolean=false; 
  mlflag:boolean=false;
  guflag:boolean=false; 



  singleData: any;
  constructor(
    private translateConfigService: TranslateConfigService,
    private api: ApiService, private authService: AuthService,
    private modalctrl: ModalController, private shserv: UsersService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
  ) {

    console.log('cons');
  }

  ngOnInit() {
    console.log('user1');
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage(); console.log('user');
    this.selectedLanguage = localStorage.getItem('ln');
    this.authService.autoLogin();  //console.log('user'); 
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
      //console.log('user'); console.log(user);
      if (this.isAuthenticated) { //console.log(user);
        this.user = user;
        if (+this.user.role == 1)
          this.loadTables(0);
        //this.showDept(10);
      }

      if(+this.user.dept==10 && this.user.state_code=='29'){   this.taflag=true;    }

      if(+this.user.dept==10 && this.user.state_code=='16'){   this.knflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='02'){   this.teflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='19'){   this.mrflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='04'){   this.asmflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='21'){   this.hiflag=true; }
  
      if(+this.user.dept==10 && this.user.state_code=='24'){   this.hiflag=true;}
      if(+this.user.dept==10 && this.user.state_code=='25'){   this.paflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='15'){   this.mlflag=true; }
      if(+this.user.dept==10 && this.user.state_code=='11'){   this.mlflag=true; }

    });

    this.dev = (localStorage.getItem('dev') === 'true');
    this.loadTables(0);
  }


  ionViewDidEnter(){
    
  }
  
  setFilteredLocations(){
      this.filterData = this.tableList.filter((location) => {
        return location.table_name.toLowerCase().indexOf(this.searchTerm.toLowerCase().trim()) > -1;
      });
  }

  doRefresh(event) {

    this.loadTables(0);


    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  loadTables(offset) {
    this.loading = true;
    let postDate = {
      mode: 'listTables',
      offset: offset
    }
    this.api.post('mastertables', postDate).subscribe((data: any) => {
      console.log(data);

      if (offset == 0) {
        this.tableList = data.data;
      } else {
        for (let i = 0; i < data.data.length; i++) {
          this.tableList.push(data.data[i]);
        }
      }
      this.filterData=this.tableList;
      console.log("listTables", data);
      this.loading = false;
    });

  }
  showData(table) {
    console.log(table);
    //this.tableData[table]='Loading...';

    this.loading = true;
    let postDate = {
      mode: 'showTableData',
      table: table
    }
    this.api.post('mastertables', postDate).subscribe((data: any) => {
      console.log(data);
      this.tableData[table] = data.data;
      console.log("table-", table, data);
      this.loading = false;
    });


  }
  async upDateInfoEdit(selecteddata, tableName,ln) {
    console.log(selecteddata, tableName,ln);

    let flag=false;

    if(+this.user.dept==10 && this.user.state_code=='29' && ln=='ta'){  flag=true;  this.taflag=true;    }

    if(+this.user.dept==10 && this.user.state_code=='16' && ln=='kn'){  flag=true;   this.knflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='02' && ln=='te'){  flag=true;   this.teflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='19' && ln=='mr'){  flag=true;   this.mrflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='04' && ln=='asm'){  flag=true;  this.asmflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='21' && ln=='hi'){  flag=true;   this.hiflag=true; }

    if(+this.user.dept==10 && this.user.state_code=='24' && ln=='od'){  flag=true;   this.hiflag=true;}
    if(+this.user.dept==10 && this.user.state_code=='25' && ln=='pa'){  flag=true;   this.paflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='15' && ln=='ml'){  flag=true;   this.mlflag=true; }
    if(+this.user.dept==10 && this.user.state_code=='11' && ln=='gu'){  flag=true;   this.mlflag=true; }





    if(+this.user.role==1){ flag=true}

    console.log('flag ',flag)

    if(flag==false){
      let toast = this.toastController.create({
        message: `You are Not allowed to Edit this Language`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
      
      return false;
    }

    // let singleData = this.singleData[datas];
    const modal = await this.modalctrl.create({
      component: MasterupdateComponent,
      componentProps: {
        tableName: tableName,
        selecteddata:selecteddata,
        ln:ln
      }
    });

    modal.onWillDismiss().then(dataReturned => {
    });
    return await modal.present().then(_ => {
    });

  }

  deleteSelectedData(tableName,id){
    console.log(tableName,id);
    
    let postDate={
      mode:'deleteData', 
      table:tableName,
      id:id
    }
    this.api.post('mastertables',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('deleted');
        this.showData(tableName);
        //this.loading=false;
      }
    });

  }

  async deleteData(tableName,id) {
   
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to <strong>delete</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteSelectedData(tableName,id);
          }
        }
      ]
    });

    await alert.present();
  }


  async addDetails(tableName) {

    const modal = await this.modalctrl.create({
      component: MasterinsertComponent,
      componentProps: {
        tableName: tableName,
      }
    });

    modal.onWillDismiss().then(dataReturned => {
     this.showData(tableName);

    });
    return await modal.present().then(_ => {
    });

  }

  hideData(tableName){
    console.log(tableName);
   // console.log(this.tableList[tableName]);
    this.tableData[tableName]=undefined;
    
  }

  humanize(str) {
    str=str.substring(3);
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

}


