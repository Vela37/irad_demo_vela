import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-logindetails',
  templateUrl: './logindetails.component.html',
  styleUrls: ['./logindetails.component.scss'],
})
export class LogindetailsComponent implements OnInit {

  @Input() selection: any;
  
  public companies:any =null;
	tableStyle = 'bootstrap';
  customRowClass = false;
  
  constructor(private modalctrl:ModalController,private api:ApiService) { }

  ngOnInit() {
    /*
    fetch('assets/company.json').then(res => res.json())
    .then(json => {
      // this.data = json;
      this.companies = json;
    }); 

    */
   this.loadlogingdetails();
  }

  switchStyle() {
    if (this.tableStyle === 'dark') {
      this.tableStyle = 'bootstrap';
    } else {
      this.tableStyle = 'dark';
    }
  }

  getRowClass(row) { 
    const isMale = row.gender === 'male';

    if (!this.customRowClass) {
      return {};
    }
    return {
      'male-row': isMale,
      'female-row': !isMale,
    };
  }

  closeModal() {
    //let reply = { 'geninfo': this.geninfo };
    this.modalctrl.dismiss();
    // console.log(this.geninfo);
  }

  open(row){
    console.log(row);
  }
  loadlogingdetails(){
    //logindetails
   // alert('ssssss');

    let postDate={
      mode:'logindetails',
      'selection':this.selection
    }
    this.api.post('datas',postDate).subscribe((data: any)=>{
      this.companies=data.data;
     
     
     });
    
    }
}
