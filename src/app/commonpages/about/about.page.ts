import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  mobiledevice:any;
  constructor(private localdb:LocalstorageService) { 
    this.mobiledevice=this.localdb.checkPlatform();
  }

  ngOnInit() {
    console.log(this.mobiledevice);
  }

}
