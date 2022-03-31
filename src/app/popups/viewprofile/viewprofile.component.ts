import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss'],
})
export class ViewprofileComponent implements OnInit {
  @Input() username:any;
  selectedLanguage:string;  params:any;
  constructor(private modalctrl: ModalController,private api:ApiService, ) { }
  userp={
    "username":'',
    "name":"Name",
    "role":"Role",
    "dept":"Department",
    "ps":"Police Station",
    "district":"District",
    "state":"State",
    "status":"Status",
    "email":"",
    "mobile":"",
    "profilepic":''
  
  };
  ngOnInit() {
    console.log("View Profile",this.username);
    this.loadProfile(this.username);
  }
  closeModal()  {
    this.modalctrl.dismiss();
  }

  loadProfile(username){
    this.api.post('/viewprofile',{mode:'profile',username:username}).subscribe((res: any)=>{
      
       console.log(res); 
     var data=res.data[0];

       this.userp.name=data.username+' ('+ data.name +')';
       this.userp.username=data.username;
      // console.log('dataddd - ',this.userp.name); 
       this.userp.dept=data.get_department+' - ('+ data.dept +')';
       this.userp.role=data.get_role_name;
       this.userp.state=data.get_statename+' - ('+ data.state_code +')';
       this.userp.district=data.get_ps_districtname+' - ('+ data.district_code +')';
       this.userp.ps=(data.ps_code==null)? null : data.get_ps_name+' - ('+ data.ps_code +')';
       this.userp.status=data.active;
       this.userp.email=data.email;
       this.userp.mobile=data.mobile;
       this.userp.profilepic=environment.apiUrl+'captcha/profilepic.php?'+data.username;
 
      }); 
  }

}
