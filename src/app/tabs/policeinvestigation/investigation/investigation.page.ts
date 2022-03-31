import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../../translate-config.service';

import { PatiententryComponent } from '../../view/edit/patiententry/patiententry.component';
import { InvestgeneralComponent } from '../../view/edit/investgeneral/investgeneral.component';
import { InvestpedestrianComponent } from '../../view/edit/investpedestrian/investpedestrian.component';

import { InvestvehicleComponent } from '../../view/edit/investvehicle/investvehicle.component';
import { InvestpassengerComponent } from '../../view/edit/investpassenger/investpassenger.component';
import { AddwitnessComponent } from '../../view/edit/addwitness/addwitness.component';
import { InvestdocumentsComponent } from '../../view/edit/investdocuments/investdocuments.component';
import { UploaddocComponent } from '../../view/edit/uploaddoc/uploaddoc.component';
import { ReportrequirementComponent} from '../../view/reportsview/reportrequirement/reportrequirement.component';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { UploadingdocumentComponent} from '../../view/reportsview/uploadingdocument/uploadingdocument.component';
import { Router } from "@angular/router";
import { AuthService } from "../../../commonpages/login/auth.service";
import { Subscription } from "rxjs";



import { AddcourtdataComponent } from '../../view/edit/addcourtdata/addcourtdata.component';
import { AddlegaladataComponent } from '../../view/edit/addlegaladata/addlegaladata.component';
import { AddinsurancedataComponent } from '../../view/edit/addinsurancedata/addinsurancedata.component';





import { InsurancevictimComponent } from 'src/app/tabs/policeinvestigation/insurancevictim/insurancevictim.component';
import { InsurancevehicleComponent } from 'src/app/tabs/policeinvestigation//insurancevehicle/insurancevehicle.component';
import { LegalservicegenralComponent } from 'src/app/tabs/policeinvestigation//legalservicegenral/legalservicegenral.component';
import { LegalservicesecondComponent } from 'src/app/tabs/policeinvestigation//legalservicesecond/legalservicesecond.component';
import { LegalservicethirdComponent } from 'src/app/tabs/policeinvestigation//legalservicethird/legalservicethird.component';
import { Form15Component } from 'src/app/components/form15/form15.component';
//import { Form16Component } from 'src/app/components/form16/form16.component';

import { Form17Component } from 'src/app/components/form17/form17.component';
import { Form18Component } from 'src/app/components/form18/form18.component';
@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.page.html',
  styleUrls: ['./investigation.page.scss'],
})
export class InvestigationPage implements OnInit {
  data;
  user:any; 
  selectedLanguage: string; params: any;
  returnpath:string="";
  accid:any;
  selacc:any;
  
  v_pending:number;
  v_total:number;
  
  p_pending:any;
  p_total:any;
  
  ped_pending:any;
  ped_total:any;
  ped_road:any;

  trans:any;
  postdat={'mode':'','accid':''};
  complete:boolean=true;
  private userSub: Subscription;
  isAuthenticated = false;
  role: number;

  browser:any;
  constructor(private modalctrl: ModalController,
    private authService: AuthService,
    private router: Router,
    
    private translateConfigService: TranslateConfigService,
    private api:ApiService,private plt:Platform) { 
      this.selacc=JSON.parse(localStorage.getItem('selacc'));
      console.log("entered investigation",this.selacc);
    }

  ngOnInit() {
    
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.checkPlatform();
    if(this.selacc!=null){
      //this.checkvechilecount();
    }

    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //console.log(user);
      // console.log('user'); console.log(user);
      if (this.isAuthenticated) {
        console.log(user.name);
        this.role = +user.role;
        this.user = user;
        //console.log("this.user", this.user);
      }
    });
  }

  reports()
  {
    this.router.navigate(["/dreports"]);
  }
  ionViewWillEnter(){
    this.checkPlatform();
    if(this.selacc!=null){
      this.checkvechilecount();
    }
  }

  async goToUploadingdoc() {
    const modal = await this.modalctrl.create({
        component:UploadingdocumentComponent,
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }
  
  checkPlatform(){ console.log("checkPlatform");
  if(this.plt.is('cordova')){
    console.log("mobile :true");
    this.browser=0;
    return true;
  }else{
    this.browser=1;
    console.log("mobile :false");
  }
  return false;
} 

  checkvechilecount(){
    // alert(this.accid);
    console.log("Vehicle count");
     this.postdat.mode='allpending';
     this.postdat.accid=this.selacc.accid;
     this.getpending(this.postdat).subscribe(
       (success:any) => {
 
         
         console.log(success.data[0]);
         this.v_total=success.data[0][1];
         this.v_pending=success.data[0][2];
 
         this.p_total=success.data[0][3];
         this.p_pending=success.data[0][4];
 
         this.ped_total=success.data[0][5];
         this.ped_pending=success.data[0][6];
 
         this.ped_road=success.data[0][7];
        //  this.genral=success.data[0][8]; 
 
        //  this.trans= success.data[0][9]; 
        //  this.trans_total= success.data[0][10];
        //  console.log('trans',this.trans);
 
         if(this.v_total==this.v_pending && this.p_total== this.p_pending && this.ped_total== this.ped_pending && this.ped_road==1 && this.v_total==this.trans)
         {
           this.complete=false;
         }
       //  v_total:any;
       },
       error => {
 
                      
     } 
       );
   }
   public getpending(postdat){
 
     return this.api.post('pending',postdat);
 
 
   }

  
  async goToInvestGeneral() {
    const modal = await this.modalctrl.create({
        component:InvestgeneralComponent,
        componentProps: {
       
        }
      });
     modal.onWillDismiss().then(dataReturned => {
      
      });
      return await modal.present().then(_ => {
      }); 
    }

    

    async goToInvestVehicle() {
      const modal = await this.modalctrl.create({
          component:InvestvehicleComponent,
          componentProps: {
         
          }
        });
       modal.onWillDismiss().then(dataReturned => {
        
        });
        return await modal.present().then(_ => {
        }); 
      }

      // async addcourtdata() {
      //   const modal = await this.modalctrl.create({
      //       component:AddcourtdataComponent,
      //       componentProps: {
           
      //       }
      //     });
      //    modal.onWillDismiss().then(dataReturned => {
          
      //     });
      //     return await modal.present().then(_ => {
      //     }); 
      //   }

        // async addlegaldata() {
        //   const modal = await this.modalctrl.create({
        //       component:AddlegaladataComponent,
        //       componentProps: {
             
        //       }
        //     });
        //    modal.onWillDismiss().then(dataReturned => {
            
        //     });
        //     return await modal.present().then(_ => {
        //     }); 
        //   }
          async addinsdata() {
            const modal = await this.modalctrl.create({
                component:AddinsurancedataComponent,
                componentProps: {
               
                }
              });
             modal.onWillDismiss().then(dataReturned => {
              
              });
              return await modal.present().then(_ => {
              }); 
            }

      async goToInvestPedestrian() {
        const modal = await this.modalctrl.create({
            component:InvestpedestrianComponent,
            componentProps: {
           
            }
          });
         modal.onWillDismiss().then(dataReturned => {
          
          });
          return await modal.present().then(_ => {
          }); 
        }

        async goToUploaddoc() {
          const modal = await this.modalctrl.create({
              component:UploaddocComponent,
              componentProps: {
                flag:'No'
              }
            });
           modal.onWillDismiss().then(dataReturned => {
            
            });
            return await modal.present().then(_ => {
            }); 
          }

        async goToInvestPassenger() {
          const modal = await this.modalctrl.create({
              component:InvestpassengerComponent,
              componentProps: {
             
              }
            });
           modal.onWillDismiss().then(dataReturned => {
            
            });
            return await modal.present().then(_ => {
            }); 
          }

          async goToAddwitness() {
            const modal = await this.modalctrl.create({
                component:AddwitnessComponent,
                componentProps: {
               
                }
              });
             modal.onWillDismiss().then(dataReturned => {
              
              });
              return await modal.present().then(_ => {
              }); 
            }

            gotoUpload(){
                if(this.browser==0){
                  this.goToDocumentupload();
                }else if(this.browser==1){
                  this.goToUploadingdoc();
                }
            }

            async goToDocumentupload() {
              const modal = await this.modalctrl.create({
                  component:InvestdocumentsComponent,
                  componentProps: {
                 
                  }
                });
               modal.onWillDismiss().then(dataReturned => {
                
                });
                return await modal.present().then(_ => {
                }); 
              }
        

          
        async goToReports() {
          const modal = await this.modalctrl.create({
              component:InvestpassengerComponent,
              componentProps: {
             
              }
            });
           modal.onWillDismiss().then(dataReturned => {
            
            });
            return await modal.present().then(_ => {
            }); 
          }






          async addinsdatavehicle() {
            const modal = await this.modalctrl.create({
                component:InsurancevehicleComponent,
                componentProps: {
               
                }
              });
             modal.onWillDismiss().then(dataReturned => {
              
              });
              return await modal.present().then(_ => {
              }); 
            }
            async addinsdatavictim() {
              const modal = await this.modalctrl.create({
                  component:InsurancevictimComponent,
                  componentProps: {
                 
                  }
                });
               modal.onWillDismiss().then(dataReturned => {
                
                });
                return await modal.present().then(_ => {
                }); 
              }

              async addlegaldata() {
                const modal = await this.modalctrl.create({
                    component:LegalservicegenralComponent,
                    componentProps: {
                   
                    }
                  });
                 modal.onWillDismiss().then(dataReturned => {
                  
                  });
                  return await modal.present().then(_ => {
                  }); 
                  
                }
      
                async addlegaldata2() {
                  const modal = await this.modalctrl.create({
                      component:LegalservicesecondComponent,
                      componentProps: {
                     
                      }
                    });
                   modal.onWillDismiss().then(dataReturned => {
                    
                    });
                    return await modal.present().then(_ => {
                    }); 
                  }
      
                  async addlegaldata3() {
                    const modal = await this.modalctrl.create({
                        component:LegalservicethirdComponent,
                        componentProps: {
                       
                        }
                      });
                     modal.onWillDismiss().then(dataReturned => {
                      
                      });
                      return await modal.present().then(_ => {
                      }); 
                    }

                    // async form16() {
                    //   const modal = await this.modalctrl.create({
                    //       component:Form16Component,
                    //       componentProps: {
                         
                    //       }
                    //     });
                    //    modal.onWillDismiss().then(dataReturned => {
                        
                    //     });
                    //     return await modal.present().then(_ => {
                    //     }); 
                    //   }

                    //   async form15() {
                    //     const modal = await this.modalctrl.create({
                    //         component:Form15Component,
                    //         componentProps: {
                           
                    //         }
                    //       });
                    //      modal.onWillDismiss().then(dataReturned => {
                          
                    //       });
                    //       return await modal.present().then(_ => {
                    //       }); 
                    //     }


                        async petioner() {
    
                          const modal = await this.modalctrl.create({
                              component:AddcourtdataComponent,
                              componentProps: {
                             
                             
                              }
                            });
                           modal.onWillDismiss().then(dataReturned => {
                            
                            });
                            return await modal.present().then(_ => {
                            }); 
                          }
                          async tribunal() {
                            const modal = await this.modalctrl.create({
                                component:Form15Component,
                                componentProps: {
                               
                                }
                              });
                             modal.onWillDismiss().then(dataReturned => {
                              
                              });
                              return await modal.present().then(_ => {
                              }); 
                            }
                            async compliancepopup() {
                              const modal = await this.modalctrl.create({
                                  component:Form17Component,
                                  componentProps: {
                                 
                                  }
                                });
                               modal.onWillDismiss().then(dataReturned => {
                                
                                });
                                return await modal.present().then(_ => {
                                }); 
                              }
                              async awardpopup() {
                                const modal = await this.modalctrl.create({
                                    component:Form18Component,
                                    componentProps: {
                                   
                                    }
                                  });
                                 modal.onWillDismiss().then(dataReturned => {
                                  
                                  });
                                  return await modal.present().then(_ => {
                                  }); 
                                }

}
