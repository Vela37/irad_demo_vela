import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';
import { AuthService } from '../../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { arrayobject } from 'src/app/services/arrayobject';


@Component({
  selector: 'app-addfamily',
  templateUrl: './addfamily.component.html',
  styleUrls: ['./addfamily.component.scss'],
})
export class AddfamilyComponent implements OnInit {

  @Input() accid:any;
  @Input() id:any;
  @Input() type:any;
  address:any;
  contact_number:any;
  addfamilymembers:any=[];
  fname: any;
  age: any;
  fgender:any;
  frelation:any;
  martialstatus:any;
  constructor(private modalctrl: ModalController,private api:ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.loadfamilymenbers();
  }
  loadfamilymenbers(){
    let postDate={
      lang:'en',
      tableArrayName:['familymembers']
   }
    this.api.darsave('user/master',postDate).subscribe((data: any)=>{
    //  this.addfamilymembers=JSON.stringify(data.familymembers);
      this.addfamilymembers=data.familymembers;
   //   console.log("-------------------", this.addfamilymembers);
   console.log(data.familymembers);
      
     });
  }
  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }


  savebutton() {

/*
  "id":"",
    "acc_id":"",
    "ref_id":"",
    "name":"",
    "age":"",
    "gender":"",
    "relation_type":"",
    "marital_status":"",
    "user_type":""
*/
    
  
    let postData={
      mode: 'darpedestrianfamily',
      acc_id: this.accid,
      ref_id: this.id.toString(),
     // type: this.type,
      name: this.fname,
      age: this.age,
      gender: this.fgender,
      relation_type: this.frelation,
      marital_status: this.martialstatus,
      user_type:this.type,
      address:this.address,
      contact_number:this.contact_number,
      
    }
    console.log("--------------",postData);

    this.api.darsave('user/insertVictimFamilyDetails',postData).subscribe((data: any)=>{

     // alert("Details added");
     // alert(data.msg);
   // this.closeModal();
      });

      alert("Details added");
      this.closeModal();
  }

}
