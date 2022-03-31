import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-darfamilyedit',
  templateUrl: './darfamilyedit.component.html',
  styleUrls: ['./darfamilyedit.component.scss'],
})
export class DarfamilyeditComponent implements OnInit {
  @Input() passengerinfo: any;

  constructor() { }

  ngOnInit() {}
  closeModal()  {
    let reply = { 'geninfo':this.passengerinfo};
   this.passengerinfo.dismiss(reply); 
  // console.log(this.geninfo);
 }
}
