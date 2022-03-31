import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewprofileComponent } from '../popups/viewprofile/viewprofile.component'

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'})
export class UsersService{
  constructor(
    private modalctrl: ModalController,
  ){}
  private user = new BehaviorSubject<string>('john');
  castUser = this.user.asObservable();
  
  editUser(newUser){
    console.log('-----------------------------');
    console.log(newUser);
    console.log('-----------------------------');
    this.user.next(newUser); 
  }


  async viewProfile(usrname) {
    console.log(usrname);
  
    const modalped = await this.modalctrl.create({
      component: ViewprofileComponent,
      componentProps: { 'username': usrname }
      /* componentProps: {
         'visibility':this.data.accinfo.visibilty,
         'refhp':'test',
       }*/
  
    });
  
    modalped.onWillDismiss().then(dataReturned => {
      //   this.histroyreturn = dataReturned.data;
      console.log('Receive: ', dataReturned.data);
      //this.showDept(this.cdview);
    });
    return await modalped.present().then(_ => {
      //  console.log('Sending: ', this.phyopnion);
    });
  
  }

}