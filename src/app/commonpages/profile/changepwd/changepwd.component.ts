import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { TranslateConfigService } from '../../../translate-config.service';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss'],
})
export class ChangepwdComponent implements OnInit {
 // @Input() userinfo:any;dept=1;
 showPassword:boolean;
 oldPassword:boolean;
 formGroup: FormGroup;

 selectedLanguage:string;

  chpwd={
    'oldpwd':'',
    'newpwd':'',
    'renewpwd':''
  }

  constructor(private modalctrl: ModalController, private api:ApiService,private toastController:ToastController,public formBuilder: FormBuilder,private translateConfigService:TranslateConfigService) {  
    this.showPassword=false; 
    this.oldPassword=false;

    this.formGroup = formBuilder.group({
      oldpassword: [""],
      newpassword: ["",
      Validators.compose([
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
      Validators.required
    ])],
      Retypenewpassword: [
        "",
          Validators.compose([
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
          Validators.required
        ])
      ]
    });

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.selectedLanguage = localStorage.getItem('ln');
   // this.dept=1;
  }


  onClear(){
    this.formGroup.reset()
  }

  onSubmit(formData: any) {
    console.log("OnSubmit",formData);

    this.chpwd.oldpwd=formData.oldpassword;
    this.chpwd.newpwd=formData.newpassword;
    this.chpwd.renewpwd=formData.Retypenewpassword;


    if (/\s/.test(formData.newpassword) && /\s/.test(formData.Retypenewpassword)) {
      this.presentToast("Password containes whitespaces!!!")
    }
    else {
      if (formData.oldpassword != '') {
        if (formData.newpassword == formData.Retypenewpassword) {
            console.log("ChangePWD Data-",this.chpwd);
            this.updatepassword();
            console.log("Success");          
        }
        else {
          this.presentToast("New password & Retype password Must be same!!!")
        }
      } else {
        this.presentToast("Old password is empty!!!")
      }
    }
    // todo: do something with our data like:
    // this.service.set(formData);    
  }


  ngOnInit() {
  //  console.log("USER RECIEVED DATA",this.userinfo);
  }

  SHpassword(){
    this.showPassword=!this.showPassword;
  //  this.dept=1;
   }

   SHpassword2(){
    this.oldPassword=!this.oldPassword;
    //this.dept=1;
   }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  saveModal() {
    //let reply = { 'geninfo': this.userinfo };
    //console.log(this.userinfo);

    if (/\s/.test(this.chpwd.newpwd) && /\s/.test(this.chpwd.renewpwd)) {
      this.presentToast("Password containes whitespaces!!!")
    }
    else {
      if (this.chpwd.oldpwd != '') {
        if (this.chpwd.newpwd == this.chpwd.renewpwd) {
          if (this.chpwd.newpwd.length >= 5) {
            this.updatepassword();
          }
          else {
            this.presentToast("Password length should be minimum of 5!!!")
          }
        }
        else {
          this.presentToast("New password & Retype password Must be same!!!")
        }
      } else {
        this.presentToast("Old password is empty!!!")
      }
    }
    // this.modalctrl.dismiss(reply);

  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  cancelmodal() {
    //this.histroy = { accid:this.accid,nov:this.nov}; 
    this.modalctrl.dismiss();
  }

  async  updatepassword(){
    //this.isLoading=true; 
    let postDate={
      mode:'changepassword',
      pwd:this.chpwd
    }
    this.api.post('update',postDate).subscribe((data: any)=>{
      console.log(data); 
      if(data.flag==true){
        console.log('updated');
       
        this.modalctrl.dismiss(true);

        this.presentToast("Password Changed Successfully !");

      }else{
        this.presentToast(data.msg);
      }
     // this.isLoading=false; 
    });
  }

  //saveModal() {
    //   //let reply = { 'geninfo': this.userinfo };
    //   //console.log(this.userinfo);
  
    //   if (/\s/.test(this.chpwd.newpwd) && /\s/.test(this.chpwd.renewpwd)) {
    //     this.presentToast("Password containes whitespaces!!!")
    //   }
    //   else {
    //     if (this.chpwd.oldpwd != '') {
    //       if (this.chpwd.newpwd == this.chpwd.renewpwd) {
    //         if (this.chpwd.newpwd.length >= 5) {
    //           this.updatepassword();
    //         }
    //         else {
    //           this.presentToast("Password length should be minimum of 5!!!")
    //         }
    //       }
    //       else {
    //         this.presentToast("New password & Retype password Must be same!!!")
    //       }
    //     } else {
    //       this.presentToast("Old password is empty!!!")
    //     }
    //   }
    //   // this.modalctrl.dismiss(reply);
  
    // }

}
