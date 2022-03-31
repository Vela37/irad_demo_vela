import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-submittingdocuments',
  templateUrl: './submittingdocuments.component.html',
  styleUrls: ['./submittingdocuments.component.scss'],
})
export class SubmittingdocumentsComponent implements OnInit {

  reportstatus1:any;
  reportstatus2:any;
  reportstatus3:any;
  reportstatus4:any;
  reportstatus5:any;


  reportstatus_flag5:any;
  reportstatus_flag2:any;
  reportstatus_flag3:any;
  reportstatus_flag4:any;
flag:boolean=false;
  
  @Input() userdetails: any;
  @Input() patientdata: any;
  constructor(
    private modalctrl:ModalController,
    private iab: InAppBrowser,
    private api:ApiService,
    private altctrls: AlertController) { }

  ngOnInit() {
    this.loduploaded();
  }
  closemodal()
  {

    this.modalctrl.dismiss();
  }
  loduploaded() {

    let postDate = {
      mode: 'getuploadedlist',
      pid:this.patientdata.id
    }
    this.api.post('datas.php', postDate).subscribe((data: any) => {

if(data.data2_cnt==0)
{    this.reportstatus_flag2=0;
     this.reportstatus2='-';
}
else
{ 
  this.reportstatus_flag2=1;
  this.reportstatus2=data.data2.report_sumbitted_on;
}
//alert(this.reportstatus2);



if(data.data3_cnt==0)
{    this.reportstatus_flag3=0;
    this.reportstatus3='-';
}
else
{ 
  this.reportstatus_flag3=1;
  this.reportstatus3=data.data3.report_sumbitted_on;
}

if(data.data4_cnt==0)
{   
    this.reportstatus_flag4=0;
    this.reportstatus4='-';
}
else
{ 
  this.reportstatus_flag4=1;
  this.reportstatus4=data.data4.report_sumbitted_on;
}

if(data.data5_cnt==0)
{    this.reportstatus_flag5=0;
    this.reportstatus5='-';
}
else
{ 
  this.reportstatus_flag5=1;
  this.reportstatus5=data.data5.report_sumbitted_on;
}
    });
  }
  async showmsg(rpt) {
    
    const alert = await this.altctrls.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "Do you want to submit to Police? Once submitted, you can’t edit",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            return false;

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
     this.updateflag(rpt);
          }
        }
      ]
    });

    await alert.present();
  }
  
  updateflag(rpt)  {
   // alert(rpt);
   // return false;
                        let postDate = {
                          mode: 'reportreleasing',
                          docname:rpt,
                          pid:this.patientdata.id,
                  
                        }
                        this.api.post('datas.php', postDate).subscribe((data: any) => {
alert(data.message);
if(data.message!='please upload the document first')
{
  this.flag=true;

  if(rpt=='wound')
  {
    this.patientdata.accregister_police_show='Yes';

  }

  if(rpt=='discharge')
  {
    this.patientdata.discharge_showpolice='Yes';

  }
  if(rpt=='drunken')
  {
    this.patientdata.dd_showpolice='Yes';

  }
  if(rpt=='postmorterm')
  {
    this.patientdata.pm_policeshow='Yes';

  }

 
  let resultdata = {
    flag:this.flag,
    patientdata:this.patientdata
  }
  
  this.modalctrl.dismiss(resultdata);
  
}

this.loduploaded();
                        });
                 }

}
