import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../commonpages/login/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  loading:boolean=true;
  highwaycircle: any;
  accid: any;
  highwaydetails: any;
  highwaycode: any;
  circlecode:any;
  highwaydivision:any;
  highwaysubdivision:any;
   dashboardview:string='Circle';

  constructor(private api: ApiService,private authService:AuthService,private router:Router) { }

  ngOnInit()
   {
    this.accdivision=false;
    this.dashboardview='Circle';
    this.highwaydetails = JSON.parse(localStorage.getItem("highwaydet"));
    console.log("highwaydet",this.highwaydetails);
     this.enableccircle();
   
   
  }


  ionViewDidEnter()
  {
    this.accdivision=false;
    this.highwaydetails = JSON.parse(localStorage.getItem("highwaydet"));
    console.log("highwaydet",this.highwaydetails);
    
      this.enableccircle();
  }

  enableccircle()
  {
    this.highwaycode = this.highwaydetails.code;
    console.log("HIGWAYCODE IS", this.highwaycode);
     let postDate = 
     {
       mode: 'highwayrequest_circle',
       roaddept: this.highwaycode
     }
     this.api.post('dashboard.php', postDate).subscribe((data: any) =>
      {
 
      // this.indacc=data.data[0];
       //this.indacc1=data.data1;
       this.loading=true;
       this.highwaycircle=data.hwdata;
         
          console.log("highwaycircle",this.highwaycircle); 
       
      
     });
   }


  public movetodashboard()
   {
    this.router.navigate(['/admintabs/tab1']);
   }

   accdivision:boolean= false;
   accsubdivision:boolean=false;

   drilDownDivision(wingcircle)
   {
     console.log("THW WING OF HIGHWAYCIRCLE IS", wingcircle);
     
     this.accdivision=true;
    
    this.circlecode = wingcircle.code;

     let postDate = 
     {
       mode: 'highwayrequest_division',
       divisioncode: this.circlecode
     }
     this.api.post('dashboard.php', postDate).subscribe((data: any) =>
      {
 
       this.loading=true;
       this.highwaydivision=data.hwdata;
         
          console.log("HIGHWAYDIVISION",this.highwaydivision); 
   
     });
     
   }

   drilDownSubDivision(wingdivision)
   {
    console.log("THE WING OF HIGHWAYSUBDIVISION IS", wingdivision);
    this.accdivision=false;
    this.accsubdivision=true;
    let subdivision_code = wingdivision.divisoncode
    console.log("subdivisioncode",subdivision_code);
    let postDate = 
     {
       mode: 'highwayrequest_subdivision',
       subdivisioncode: subdivision_code
     }
     this.api.post('dashboard.php', postDate).subscribe((data: any) =>
      {
       this.loading=true;
       this.highwaysubdivision=data.hwdata;
         
          console.log("HIGHWAYDIVISION",this.highwaysubdivision); 
   
     });
   }
 

   closeModal()
   {
    this.accdivision=false;
    this.accsubdivision=false;
   }

   closeSubdivisionModal()
   {
    this.accdivision=true;
    this.accsubdivision=false;
   }

}
