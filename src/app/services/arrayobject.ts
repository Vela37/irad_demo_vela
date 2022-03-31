import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class arrayobject {
  
  
      arrobj_severity = [
      
        {id: 1, name: 'Fatal'},
        {id: 2, name: 'Grievous Injury'},
        {id: 3, name: 'Simple Injury Hospitalized'},
        {id: 4, name: 'Simple Injury Non-Hospitalized'},
        {id: 5, name: 'Vehicle Damage only'},
      ];
    
     
      arrobj_crashtype = [
   
        {id: 1, name: 'Vehicle-Vehicle'},
        {id: 2, name: 'Vehicle-Object'},
        {id: 3, name: 'Vehicle-Pedestrian'},
        {id: 4, name: 'Vehicle going off road'},
        {id: 0, name: 'Others'}
      ];
    
      arrobj_collisiontype = [

        {id: 1, name: 'Head on collision'},
        {id: 2, name: 'Hit from rear'},
        {id: 3, name: 'Hit from side'},
        {id: 4, name: 'Building'},
        {id: 5, name: 'Tree'},
        {id: 6, name: 'Street Lamp'},
        {id: 7, name: 'Divider/ Median'},
        {id: 8, name: 'Stone'},
        {id: 9, name: 'Hit fixed/stationary object'},
        {id: 10, name: 'Hit by a moving object / projectile'},
        {id: 11, name: 'Collision with pedestrian'},
        {id: 12, name: 'Collision with animal'},
        {id: 13, name: 'Potholes'},
        {id: 14, name: 'Skidding'},
        {id: 0, name: 'Others'},
      ];
    
      arrobj_observation = [
 
        {id: 1, name: 'Alcohol (Smell/ Gait/ Talk)'},
        {id: 2, name: 'Drugs (Smell/ Gait/ Talk)'},
        {id: 3, name: 'Changing lane without due care'},
        {id: 4, name: 'Dangerous overtaking'},
        {id: 5, name: 'Driving wrong side'},
        {id: 6, name: 'Over speed while driving'},
        {id: 7, name: 'Over speed while crossing speak breaker'},
        {id: 8, name: 'Over speed while crossing Zebra crossing'},
        {id: 9, name: 'Inattentive turn'},
        {id: 10, name: 'Illegal median crossing'},
        {id: 11, name: 'Carrying people in load vehicle'},
        {id: 12, name: 'Rights of way violation'},
        {id: 0, name: 'Others'},
      
      ];
    
      arrobj_landmark = [

        {id: 1, name: 'Road Name'},
        {id: 2, name: 'Junction Name'},
        {id: 3, name: 'Building'},
        {id: 4, name: 'Bus stop'},
        {id: 5, name: 'Temple'},
        {id: 0, name: 'Others'},
      ];
    
      arrobj_transferhospital = [

        {id: 1, name: '108 Ambulance'},
        {id: 2, name: 'Private Ambulance'},
        {id: 3, name: 'Private Vehicle'},
        {id: 0, name: 'Others'},
      ];
      arrobj_violation = [

        {id: 1, name: 'Over Speeding'},
        {id: 2, name: 'Jumping Red Light'},
        {id: 3, name: 'Driving on wrong side'},
        {id: 4, name: 'Drunken Driving'},
        {id: 5, name: 'Use of Mobile Phone'},
        {id: 6, name: 'Not Violation'},
        {id: 7, name: 'Not Known'},
        {id: 0, name: 'Others'},
      ];

      arrobj_manoeuvre = [

        {id: 1, name: 'Turning Right'},
        {id: 2, name: 'Overtaking from Left'},
        {id: 3, name: 'Turning Left'},
        {id: 4, name: 'Making U Turn'},
        {id: 5, name: 'Going Ahead Overtaking'},
        {id: 6, name: 'Going Ahead Not  Overtaking'},
        {id: 7, name: 'Parked'},
        {id: 8, name: 'Reversing'},
        {id: 9, name: 'Sudden Start'},
        {id: 10, name: 'Statrting From Off Side'},
        {id: 11, name: 'Starting From Near Side'},
        {id: 12, name: 'Sudden Shop'},
        {id: 13, name: 'Merging'},
        {id: 14, name: 'Diverging'},
        {id: 15, name: 'Stationary'},
        {id: 16, name: 'Using Private Entrance'},
        {id: 17, name: 'Parking Vehicle'},
        {id: 18, name: 'Temporarily Held Up'},
        {id: 0, name: 'Others'}
      ];

       diplayseverity() {
        return this.arrobj_severity;
      }
      diplaycrashtype() {
        return this.arrobj_crashtype;
      }
      diplaycollisiontype() {
        return this.arrobj_collisiontype;
      }
      diplayobservation() {
        return this.arrobj_observation;
      }
      diplaylandmark() {
        return this.arrobj_landmark;
      }

      diplaytransferhospital() {
        return this.arrobj_transferhospital;
      }

      diplaytransferviolation() {
        return this.arrobj_violation;
      }

      diplaymanoeuvre() {
        return this.arrobj_manoeuvre;
      }
 
}

