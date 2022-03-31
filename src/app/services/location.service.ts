import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  loc:Location=new Location();

  private messageSource = new BehaviorSubject('default message');
  private location = new BehaviorSubject(this.loc);
  
  currentMessage = this.messageSource.asObservable();

  currentLocation = this.location.asObservable();

  constructor() { 
   
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeLocation(loc: Location) {
    this.location.next(loc);
  }

}
