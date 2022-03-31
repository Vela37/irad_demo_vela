import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../../../environments/environment';

//import { DarforwardComponent } from '../../popups/darforward/darforward.component';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { UpdaredarComponent } from '../updaredar/updaredar.component';
import {  PushnotificationService} from '../../../services/pushnotification.service';
import { DarhelpComponent } from '../darhelp/darhelp.component';
import { RequestextensionComponent } from '../requestextension/requestextension.component';


import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import {
  ActionSheetController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: 'app-sumbitforms',
  templateUrl: './sumbitforms.component.html',
  styleUrls: ['./sumbitforms.component.scss'],
})
export class SumbitformsComponent implements OnInit {
  private userSub: Subscription;
  accid:any;
  constructor(private api:ApiService, private authService: AuthService,private alertCtrl: AlertController,
    private pushNotification:PushnotificationService,
    private modalctrl: ModalController,private iab: InAppBrowser,public platform: Platform, 
    private previewAnyFile: PreviewAnyFile,
    public loadingController: LoadingController,
    private fileOpener: FileOpener,
    private ft: FileTransfer, 
    private transfer: FileTransfer,  
    private file: File

    ) { }
  @Input() selacc:any;
  @Input() reports:any;
  @Input() src:any;
  @Input() fulldetails:any;
  @Input() submission:any;
  
  
   sflag:any=0;
   s5flag:any=0;
   s3flag:any=0;
   s4flag:any=0;
   single:any;
   user:any;
   alldata:any;
   flag: any;
   mandatoryflag:any;
   notuploaded:any;
   isAuthenticated = false;
   vehicledata:any;
   generaldata:any;
   passengerdata:any;
   pedestriandata:any;
   victimdata:any;
   formtitle:any;
   conflaginsurance:any=0;
   conflaglegal:any=0;
   conflagmact:any=0;
   formsubmission:any;
   firmformdocs:any;
   edarformstatus:any;
   driverdetails:any;
   passdetails:any;
   peddetails:any;
   firmformdocsattach:any;
   dataflag:any=0;
   dataflagatt:any=0;
  ngOnInit() {
//alert(this.submission);
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //console.log(user);
     // console.log('user'); console.log(user);
      if(this.isAuthenticated){ console.log(user.name);
        this.user=user;
      }
    });


//alert(this.conflagmact);
    
//alert(this.submission);
    
//console.log("----->",this.fulldetails);

    if(this.fulldetails==null)
    {
      this.sflag=0;
    }
    else if(this.fulldetails.get_edarupdateflag==null)
    {
        this.sflag=0;
    }
    else if(this.fulldetails.get_edarupdateflag.count==1)
    {
        this.sflag=1;
    }
    else
    {
      this.sflag=0;
    }
    
   

    this.loadconnection();
    this.loadreports();
    
  if(this.reports==1)
  {

      this.formtitle="FORM I- First Accident Report (FAR)";
      this.edarform1();

  }
  else if(this.reports==2)
  {
   // alert("1234567");

      this.formtitle="FORM II- Right of victim(s) of Road accident and flow chart of this scheme";
      this.edarform2();
 }

 else if(this.reports==3)
  {

      this.formtitle="FORM III - Driver's form";
      this.edarform3();
  }
  
  else if(this.reports==4)
  {
      this.formtitle="FORM IV - Owner's Form";
      this.edarform4();
  }
  else if(this.reports==5)
  {
      this.formtitle='FORM V - Interim Accident Report';
      this.edarform5();
  }
  
  else if(this.reports==6)
  {
      this.formtitle='FORM VI - Victim Form';
      this.edarform6();
  }
  else if(this.reports=='6A')
  {
      this.formtitle='FORM VI A- Victim Form Relating To Minor Children of Victim';
      this.edarform6A();
  }
  else if(this.reports==7)
  {
      this.formtitle='FORM VII -  Detailed Accident Report';
      this.edarform7();
  }

  else if(this.reports==8)
  {
      this.formtitle='FORM VIII - Site Plan';
      this.edarform8();
  }

  else if(this.reports==9)
  {
      this.formtitle='FORM IX - Motor Vechile Inspection Report';
      this.edarform9();
  }
  else if(this.reports==10)
  {
      this.formtitle='FORM X - Verification Report';
      this.edarform10();
  }
  else if(this.reports==11)
  {
      this.formtitle='FORM XI - Insurance Form';
      this.edarform11();
  }

  else if(this.reports==12)
  {
      this.formtitle='FORM XII - Victim Impact Report';
      this.edarform12();
  }
  else if(this.reports==13)
  {
      this.formtitle='FORM XIII - Before the Motor Accident Claims Tribunal - Death case';
      this.edarform13();
  }

  else if(this.reports==14)
  {
      this.formtitle='FORM XIV - Before the Motor Accident Claims Tribunal - Injury case';
      this.edarform14();
  }
  else if(this.reports==15)
  {
      this.formtitle='FORM XV - Summary of computation of award amount in death case to be incoporated in the award - Death Case';
      this.edarform15();
  }
  else if(this.reports==16)
  {
      this.formtitle='FORM XVI -  Summary of computation of award amount in Injury case to be incoporated in the award - Injury case';
      this.edarform16();
  }
  else if(this.reports==17)
  {
      this.formtitle='FORM XVII -  Compliance of the provisions of the scheme to be mentioned in the award';
      this.edarform17();
  }

  else if(this.reports==18)
  {
      this.formtitle='FORM XVIII -  Format  of record of awards to be maintained by the Claims tribunal';
      this.edarform18();
  }
  else if(this.reports==19)
  {
      this.formtitle='FORM XVIII -  Motor Accident Claims Annuity Deposit (MACAD) Scheme';
      this.edarform19();
  }
  


  



  }
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'e-Dar',
    //  subHeader: 'Submission',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  //
  public viewdocumentdriver(i)
  {
    

          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf3View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[i].vehicle_id;

          this.openWithSystemBrowser(pdfurl)  
      
     
    
    }
    public viewowner(i)
    {

//alert("123456789");

            console.log(this.firmformdocs[i]);

            let pdfurl = '';
            pdfurl = environment.darUrl + 'form/pdf4View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[i].id;
          //  pdfurl = environment.darUrl + 'form/pdf4?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[i].id;
            this.openWithSystemBrowser(pdfurl)  
        
       
      
      }
  public viewdarpagesperson(id,i)
  {
    
    console.log(this.firmformdocs[i]);
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf2View?accidentId='+this.accid+"&name="+this.firmformdocs[i].name;
    this.openWithSystemBrowser(pdfurl) 

  }
  public siteplan()
  {
    let pdfurl = '';
    pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
    this.openWithSystemBrowser(pdfurl)  
  }
  public viewdarpages(i,id)
  {
   // alert("2345678");
    console.log(this.firmformdocs[i]);
   // return false;


      if(id==1)
      {
          let pdfurl = '';
       //   pdfurl = environment.darUrl + 'form/pdf1View?accidentId='+this.accid;
          pdfurl = environment.darUrl + 'form/pdf1View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[i].id;

          this.openWithSystemBrowser(pdfurl)  
      }
      
      if(id==2)
      {
          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf8View?accidentId='+this.accid;
          this.openWithSystemBrowser(pdfurl)  
      }
     
      
   }

  loadconnection()
  {
    
    let postDate={

      mode:"allconnected", 
      accid:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((data: any)=>{
   

            this.conflaginsurance=data.insurance; 
            this.conflaglegal=data.legal.count; 
            this.conflagmact=data.insurance.mact;
          
        });

  }

  async filechooser(doc,attachment,personid) {
  
  // if(this.reports=='1' || this.reports=='2' || this.reports=='3' || this.reports=='4')
 // {
       this.single=this.firmformdocs[personid];
 // }
 

   // console.log('check-->',doc);
    console.log('check--person>',this.single);
   
  // return false;

//  
    const modal = await this.modalctrl.create({
      cssClass: 'halfscreen',
      component: UpdaredarComponent,
      componentProps: {
      accid:this.accid,
      src:attachment,
      fulldetails:this.fulldetails,
      persondetails:this.single,
      formreport:doc
      },
    });

    modal.onWillDismiss().then((dataReturned) => { 
    if(this.reports==1)
    {
      this.edarform1();

    }
    if(this.reports==2)
    {
      this.edarform2();

    }
    if(this.reports==3)
    {
      this.edarform3();

    }
    if(this.reports==4)
    {

      this.edarform4();
    }
    if(this.reports==5)
    {

      this.edarform5();
    }
    if(this.reports==6)
    {

      this.edarform6();
    }
    if(this.reports=='6A')
    {
      this.edarform6A();
    }
    if(this.reports==7)
    {
      this.edarform7();
    }
    if(this.reports==8)
    {
      this.edarform8();
    }
    if(this.reports==9)
    {
      this.edarform9();
    }
    if(this.reports==10)
    {
      this.edarform10();
    }
    if(this.reports==11)
    {
      this.edarform11();
    }
    
    if(this.reports==12)
    {
      this.edarform12();
    }
    if(this.reports==13)
    {
      this.edarform13();
    }
    if(this.reports==14)
    {
      this.edarform14();
    }
    if(this.reports==15)
    {
      this.edarform15();
    }
    if(this.reports==16)
    {
      this.edarform16();
    }
    if(this.reports==17)
    {
      this.edarform17();
    }
    if(this.reports==18)
    {
      this.edarform18();
    }
    
    });
    return await modal.present().then((_) => { });
  }

  public viewvictims(id)
  {
  console.log(this.firmformdocs[id].vehicle_id);
  //return false; 

  let mode='';
  if(this.firmformdocs[id].ptype=='Passenger')
  {
    mode='pass';
  }
  if(this.firmformdocs[id].ptype=='Pedestrian')
  {
    mode='ped';

  }
  if(this.firmformdocs[id].ptype=='Driver')
  {
     mode='veh';

  }
  let pdfurl = '';

              pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.firmformdocs[id].id+"&vehicle_id="+this.firmformdocs[id].vehicle_id+"&mode="+mode;              this.openWithSystemBrowser(pdfurl)     

      

            
  }

  public viewvictimschild(id)
  {
  console.log(this.firmformdocs[id].vehicle_id);
 
  let pdfurl = '';

              pdfurl = environment.darUrl + 'form/pdf6aView?accid='+this.accid+"&whoseChild="+this.firmformdocs[id].whose_child+"&user_type="+this.firmformdocs[id].user_type;            
                this.openWithSystemBrowser(pdfurl)     

      

            
  }
            public viewvictimsreport15(id)
            {
            //  alert("fff");
            console.log(this.firmformdocs[id]);
            //return false; 
          
          
            let pdfurl = '';
          
                        pdfurl = environment.darUrl + 'form/pdf15View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&personType="+this.firmformdocs[id].ptype;   
                        this.openWithSystemBrowser(pdfurl)       
        
       
                      } 
                      public viewvictimsreport19()
                      {
                        let pdfurl = '';
                    
                        pdfurl = environment.darUrl + 'form/pdf19View?accidentId='+this.accid;
                        this.openWithSystemBrowser(pdfurl)       
        
       
                      }
                      public viewvictimsreport18()
                      {
                        let pdfurl = '';
                    
                        pdfurl = environment.darUrl + 'form/pdf18View?accidentId='+this.accid;
                        this.openWithSystemBrowser(pdfurl)       
        
       
                      }
                      public viewvictimsreport17()
                      {
                        let pdfurl = '';
                    
                        pdfurl = environment.darUrl + 'form/pdf17View?accidentId='+this.accid;
                        this.openWithSystemBrowser(pdfurl)       
        
       
                      }
                      public viewvictimsreport13(id)
                      {
                        
                      console.log(this.firmformdocs[id]);
                      //return false; 
                    
                  //  alert(environment.darUrl);
                      let pdfurl = '';
                    
                                  pdfurl = environment.darUrl + 'form/pdf13View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&personType="+this.firmformdocs[id].ptype;   
                                  this.openWithSystemBrowser(pdfurl)       
                  
                 
                                } 

                                public changeviewvictimsreport16(id)
                                {

                             //     alert("2345678");
                                console.log(this.firmformdocs[id]);
                                //return false; 
                              
                              
                                let pdfurl = '';
                              
                                            pdfurl = environment.darUrl + 'form/pdf16View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&personType="+this.firmformdocs[id].ptype;   
                                            this.openWithSystemBrowser(pdfurl)       
                            
                           
                                          }      
                      public viewvictimsreport12(id)
                      {
                      console.log(this.firmformdocs[id]);
                      //return false; 
                    
                    
                      let pdfurl = '';
                    
                                  pdfurl = environment.darUrl + 'form/pdf12View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&mode="+this.firmformdocs[id].ptype;   
                                //  localhost:8082/form/pdf12View?accidentId=202229592390001&vehicleId=64513&personId=63829&mode=Driver
                                  this.openWithSystemBrowser(pdfurl)       
                  
                 
                                } 
            public viewvictimsreport14(id)
            {
            console.log(this.firmformdocs[id]);
            //return false; 
          
        // alert(environment.darUrl);
            let pdfurl = '';
          
                     //   pdfurl = environment.darUrl + 'form/pdf15View?accidentId='+this.accid+"&ref_id="+this.firmformdocs[id].id+"&vehicle_id="+this.firmformdocs[id].vehicle_id+"&mode="+mode;               
                        pdfurl = environment.darUrl + 'form/pdf14View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&personType="+this.firmformdocs[id].ptype;   
                     //   localhost:8082/form/pdf14View?accidentId=202229592390004&vehicleId=64644&personId=10689&personType=Pedestrian
                        this.openWithSystemBrowser(pdfurl)       
        
//                        localhost:8081/form/pdf15View?accidentId=202127546000002&vehicleId=10875&personId=2433&personType=Pedestrian
          
                      
                      }          

  edarform1()
  {
//
    let postDate={

      mode:"getdocumentsdetails",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
          
      //    this.formsubmission=scc.formdetails;
          this.firmformdocs=scc.main;
          this.firmformdocsattach=scc.attchment;
        //  for (let i = 0; i < scc.formdetails.length; i++) 
       //   {
            //get_edarupdateflag
            

          //  this.formsubmission[i].get_officer = JSON.parse(this.formsubmission[i].get_officer);
        //  }

        //  console.log(this.formsubmission.get_officer);
          
          for (let i = 0; i < scc.main.length; i++) 

          {
          //  console.log("12345678");
          if(JSON.parse(this.firmformdocs[i].get_edar_forms_doc)!=null)
            {

              this.dataflag=1;

            }



              this.firmformdocs[i].get_edar_forms_doc = JSON.parse(this.firmformdocs[i].get_edar_forms_doc);

          }

          for (let i = 0; i < scc.attchment.length; i++) 
          {

            if(JSON.parse(this.firmformdocsattach[i].attach)!=null)
{

this.dataflagatt=1;

}
              this.firmformdocsattach[i].attach = JSON.parse(this.firmformdocsattach[i].attach);

          }

      //  console.log(this.firmformdocs);

        });

  

  }
  edarform2()
  {

    let postDate={

      mode:"getdocumentsdetailstwo",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        for (let i = 0; i < scc.main.length; i++) 
        {

        if(JSON.parse(this.firmformdocs[i].docupload)!=null)
          
         {
          this.firmformdocs[i].docupload =1;
          }
          else
          {
            this.firmformdocs[i].docupload =0;
          }

           

        }

        console.log('123456789----->',this.firmformdocs);
      });
  }


  edarform3()
  {
    let postDate={

      mode:"getdocumentsdetails3",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        this.s3flag=scc.five;

       // alert(this.s3flag);

        for (let i = 0; i < scc.dataset.length; i++) 
        {

          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);

          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }

       // console.log("--------->",this.firmformdocs[0].get_edarpersonwisesubmitted);
        console.log("--------->",this.firmformdocs);

       
      });
  }
  edarform6A()
  {
    let postDate={

      mode:"getdocumentsdetails7",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;

        for (let i = 0; i < scc.dataset.length; i++) 
        {
          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);

          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }

        //console.log('child details---->',this.firmformdocs);

        
       
      });
  }
  edarform7()
  {
    let postDate={

      mode:"dar",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;

        for (let i = 0; i < scc.dataset.length; i++) 
        {

           // this.firmformdocs[i].father = JSON.parse(this.firmformdocs[i].father);
           // this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

        }

        //console.log('child details---->',this.firmformdocs);

        
       
      });
  }
  edarform8()
  {
    let postDate={

      mode:"siteplan",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;

      

      });
  }
  edarform9()
  {
    let postDate={

      mode:"darmvi",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        for (let i = 0; i < scc.dataset.length; i++) 
        {

         
            this.firmformdocs[i].get_darmvi = JSON.parse(this.firmformdocs[i].get_darmvi);

          
         
            

        }
      

      });
  }
  
  edarform11()
  {
    let postDate={

      mode:"insuranceform",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        console.log(this.firmformdocs);
        
        for (let i = 0; i < scc.dataset.length; i++) 
        {

          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);

          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }

      

      });
  }
  edarform12()
  {
    let postDate={

      mode:"victimimpactreport",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        console.log(this.firmformdocs);
        
        for (let i = 0; i < scc.dataset.length; i++) 
        {
          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);
          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }

      

      });
  }
  edarform13()
  {
    
    let postDate={
      mode:"beforemactdeath",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;
    for (let i = 0; i < scc.main.length; i++) 
    {

    if(JSON.parse(this.firmformdocs[i].docupload)!=null)
      
     {
      this.firmformdocs[i].docupload =1;
      }
      else
      {
        this.firmformdocs[i].docupload =0;
      }

       

    }

    console.log('123456789----->',this.firmformdocs);
  });

  }
  edarform15()
  {
    let postDate={

      mode:"summarydeath",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;
    for (let i = 0; i < scc.main.length; i++) 
    {

    if(JSON.parse(this.firmformdocs[i].docupload)!=null)
      
     {
      this.firmformdocs[i].docupload =1;
      }
      else
      {
        this.firmformdocs[i].docupload =0;
      }

       

    }

    console.log('123456789----->',this.firmformdocs);
  });

  }
  //
  edarform14()
  {

    let postDate={


      mode:"beforemactinjury",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;
    for (let i = 0; i < scc.main.length; i++) 
    {

    if(JSON.parse(this.firmformdocs[i].docupload)!=null)
      
     {
      this.firmformdocs[i].docupload =1;
      }
      else
      {
        this.firmformdocs[i].docupload =0;
      }

       

    }

    console.log('123456789----->',this.firmformdocs);
  });
  }
  edarform19(){

    
    let postDate={
      mode:"macad19",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;

      
  });
  }
  edarform18(){

    
    let postDate={
      mode:"formatofrecord18",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;

      
  });
  }

  edarform17(){

    
    let postDate={


      mode:"complaince17",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;

      
  });
  }
  edarform16()
  {

    let postDate={


      mode:"summaryinjury",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
   this.api.post('datas',postDate).subscribe((scc: any)=>{
          
    this.firmformdocs=scc.dataset;
    for (let i = 0; i < scc.main.length; i++) 
    {

    if(JSON.parse(this.firmformdocs[i].docupload)!=null)
      
     {
      this.firmformdocs[i].docupload =1;
      }
      else
      {
        this.firmformdocs[i].docupload =0;
      }

       

    }

    console.log('123456789----->',this.firmformdocs);
  });
  }
  edarform10()
  {
    let postDate={

      mode:"verificationreport",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;

        for (let i = 0; i < scc.dataset.length; i++) 
        {

          
         /// this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);
          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);

        
        }
         console.log(this.firmformdocs[0].main[0].get_edarpersonwisesubmitted);
      

      }); 
  }


  public viewdetailedaccident(id)
  {
  //  vehicle_id 
    console.log(this.firmformdocs[id]);
 //   return false;
    
  let mode='';
   if(this.firmformdocs[id].ptype=='Passenger')
   {
     mode='pass';
   }
   if(this.firmformdocs[id].ptype=='Pedestrian')
   {
     mode='ped';

   }
   if(this.firmformdocs[id].ptype=='Driver')
   {
      mode='veh';

   }
      let pdfurl = '';
     // pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].get_veh_no+"&refId="+this.firmformdocs[id].vehicle_id+"&mode="+mode;         
      pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&refId="+this.firmformdocs[id].id+"&vehicleRegNo="+this.firmformdocs[id].get_veh_no+"&mode="+mode;         

      // pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.firmformdocs[id].id+"&vehicle_id="+this.firmformdocs[id].vehicle_id+"&mode="+mode;              this.openWithSystemBrowser(pdfurl)     

     this.openWithSystemBrowser(pdfurl)  

     // ,vehicleId,mode,personId

    
    }
    public viewmvi(veh){

      console.log(this.firmformdocs[veh]);
      // return false;
      // https://gisnic.tn.nic.in/irad_new/api/api_demo94/reports/mvidocview.php?ln=en&id=202229915760044&veh=TN78T8773
      let pdfurl = '';
      let ln='en';
     // pdfurl = environment.apiUrl + 'irad_new/api/api_demo94/reports/mvidocview.php?ln=en&+"&mode="+mode';     
      pdfurl = environment.apiUrl + '/reports/mirdocview.php?ln='+ln+"&id="+this.accid+"&veh="+this.firmformdocs[veh].vehregn;       
      this.openWithSystemBrowser(pdfurl)     

    }
  public viewinsurance(id)
  {

   // alert("change to server");
    console.log(this.firmformdocs[id].id);
//return false;
  let mode='';
   if(this.firmformdocs[id].ptype=='Passenger')
   {
     mode='Passenger';
   }
   if(this.firmformdocs[id].ptype=='Pedestrian')
   {
     mode='Pedestrian';

   }
   if(this.firmformdocs[id].ptype=='Driver')
   {
      mode='Driver';

   } //mode='Driver';
      let pdfurl = '';
     // pdfurl = environment.darUrl + 'form/pdf7View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].id+"&vehicleRegNo="+this.firmformdocs[id].vehicle_id+"&mode="+mode;         
     // pdfurl = environment.darUrl + 'form/pdf6View?accidentId='+this.accid+"&ref_id="+this.firmformdocs[id].id+"&vehicle_id="+this.firmformdocs[id].vehicle_id+"&mode="+mode;              this.openWithSystemBrowser(pdfurl)     

     
     // ,vehicleId,mode,personId
    pdfurl = environment.darUrl + 'form/pdf11View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[id].vehicle_id+"&personId="+this.firmformdocs[id].id+"&mode="+this.firmformdocs[id].ptype;         
  //  pdfurl="localhost:8081/form/pdf11View?accidentId=202229592390001&vehicleId=64515&personId=63831&mode=Driver";
    this.openWithSystemBrowser(pdfurl)  

    
    }
  edarform6()
  {
    let postDate={

      mode:"getdocumentsdetails6",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        
        
     

        for (let i = 0; i < scc.dataset.length; i++) 
        {
          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);

          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }

        console.log("------------->",this .firmformdocs);
       
      });
  }
  
  edarform4()
  {

    let postDate={

      mode:"getdocumentsdetails4",    
      formno:'1', 
      doctype:'general',          
      accidentId:this.accid 
   }
   
        this.api.post('datas',postDate).subscribe((scc: any)=>{
          
        this.firmformdocs=scc.dataset;
        this.s4flag=scc.five;

    

        for (let i = 0; i < scc.dataset.length; i++) 
        {

          
          this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);
          if(JSON.parse(this.firmformdocs[i].attachment)!=null)
          {

            this.firmformdocs[i].attachment = JSON.parse(this.firmformdocs[i].attachment);

          }
          else
          {
            this.firmformdocs[i].attachment =null;
          }
            

        }
       
      });

  }
  edarform5()
  {

            let postDate={

              mode:"getdocumentsdetails5",    
              formno:'1', 
              doctype:'general',          
              accidentId:this.accid 
          }
          
                this.api.post('datas',postDate).subscribe((scc: any)=>{

                     
                  this.firmformdocs=scc.vehicle;
                  this.edarformstatus=scc.forms;

                  for (let i = 0; i < scc.vehicle.length; i++) 
             {

         
                       this.firmformdocs[i].main = JSON.parse(this.firmformdocs[i].main);
             }

                });


  }
  public viewinterim(vehicle)
  {
    console.log( this.firmformdocs[vehicle]);
//return false;

          let pdfurl = '';
          pdfurl = environment.darUrl + 'form/pdf5View?accidentId='+this.accid+"&vehicleId="+this.firmformdocs[vehicle].id;

          this.openWithSystemBrowser(pdfurl)  
      
     
    
    }

    public viewverificationreport(i)
    {
  
            let pdfurl = '';
            pdfurl = environment.darUrl + 'form/pdf10View?accidentId='+this.accid+"&vehicleRegNo="+this.firmformdocs[i].id;
  
            this.openWithSystemBrowser(pdfurl)  
        
       
      
    }



  closeModal(){
    this.modalctrl.dismiss();

  }
  loadreports(){
    
    let postDate={
     mode:"reports",    
     accid:this.accid 
  }
     this.api.post('datas',postDate).subscribe((data: any)=>{
     
       
       this.alldata=data.all;
       this.victimdata=data.victims;
       this.pedestriandata=data.passenger;
       this.passengerdata=data.passenger;
      // console.log("--->",this.passengerdata);
       this.generaldata=data.general;
       this.vehicledata=data.vehicle;
       for (let i = 0; i < this.vehicledata.length; i++) {
           
         this.vehicledata[i].driver = JSON.parse(this.vehicledata[i].driver);
       //  this.vehicledata[i].darvehicle = JSON.parse(this.vehicledata[i].darvehicle);
       }
       
     });
 
     
     
 }
 
 submitform(fm,mode)
  {
    this.pushNotification.sendNotification(fm,'eDAR',this.accid);
  if( this.conflaginsurance==0)
  {
        alert("Please Select Insurance company");
        return false;
  }

  if( this.conflaglegal==0)
  {
        alert("Please Select Legal Service");
        return false;
  }

  if( this.conflagmact==0)
  {
        alert("Please Select MACT");
        return false;
  }


    let postDate={
                      mode:mode,
                      formno:fm,
                      accid:this.accid,
                      lang:'en',
                 }

     

       this.api.post('datas',postDate).subscribe((data: any)=>{
         
       this.presentAlert(data.message);
       this.mandatoryflag=data.msg;
        if(data.msg==0)
        {
          this.notuploaded=data.NotUploaded;
        }else{
          this.closeModal();
        }

       // this.closeModal();
    });
  
  }

  public form1 = [
    { val: 'Copy of FIR', isChecked: true }
  ];
  public form2 = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];
  public
   form3 = [
    { val: 'ID / Address Proof', isChecked: true },
    { val: 'Driving Licence', isChecked: false },
    { val: 'Insurance Policy', isChecked: false }
  ];
  
 
  public viewdocumentcommon(id,src)

  {
// alert("234567");
     
          let pdfurl = '';
          pdfurl = environment.apiUrl + 'edarview.php?accid=' + this.accid+'&docname='+id+'&srctypec='+src;
          this.openWithSystemBrowser(pdfurl)  
      
    
  }

  public viewdocumentcommonperson(docname,src,i)
  {
    console.log(this.firmformdocs[i]);
   
     
    
          let pdfurl = '';
          pdfurl = environment.apiUrl + 'edarviewperson.php?accid=' + this.accid+'&docname='+docname+'&srctypec='+src+'&pid='+this.firmformdocs[i].id+'&ptype='+this.firmformdocs[i].ptype;
          this.openWithSystemBrowser(pdfurl)  
      
    
  }

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  public openWithSystemBrowser(url: string) {

    if (this.platform.is("android")) {
      this.downloadAndOpenPdf(url);
      console.log("mobile :true");
    } else {
      //this.openWithSystemBrowser(url);
     // console.log("mobile :false");
   // }

    let target = "_system";
    this.iab.create(url, target, this.options);
    }
  }

  async requestExtension(fno){
    
    const modal = await this.modalctrl.create({
      component: RequestextensionComponent,
      componentProps: { 'accid':this.accid, 'formno':fno },
    });

    modal.onWillDismiss().then((dataReturned) => { 

    });
    return await modal.present().then((_) => { });
  }

  
  

  async openHelp()
  {
  
    const modal = await this.modalctrl.create({
      component: DarhelpComponent,
      componentProps: {  formno:this.reports  },
    });

    modal.onWillDismiss().then((dataReturned) => { 

    });
    return await modal.present().then((_) => { });
  }


  
  downloadAndOpenPdf(pdf_url) {
    console.log("PDF_URL", pdf_url);
    this.showLoader();
    let pdfurl = "";
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(pdf_url, `${path}myfile.pdf`).then((entry) => {
      let url = entry.toURL();

      if (this.platform.is("android")) {
        this.hideLoader();
        this.fileOpener.open(url, "application/pdf");
      }
    });
  }

  showLoader() {
    this.loadingController
      .create({
        message: "Downloading please wait...",
        spinner: "circles",
      })
      .then((res) => {
        res.present();
      });
  }

  hideLoader() {
    this.loadingController
      .dismiss()
      .then((res) => {
        console.log("Loading dismissed!", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }


}
