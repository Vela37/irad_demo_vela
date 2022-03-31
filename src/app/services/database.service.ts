import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);
 
  constructor(private plt: Platform,  private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'iRAD.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          console.log(db);
          this.dbReady.next(true);
          console.log('constructor db ready ');
         // this.seedDatabase();
      });
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  loadDevelopers() {
    return this.database.executeSql('SELECT * FROM mst_accident_severity', []).then(data => {
      let developers: any[] = [];
      let severity = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
         severity.push(data.rows.item(i));

        }
      }
      console.log(severity);
      this.developers.next(developers);
    });
  }


  loadlocsev(id) { console.log('loadlocsev')
    return this.database.executeSql('SELECT * FROM mst_accident_severity', []).then(_a => {
      console.log('_a',_a);
    });
  }


  open(){
    console.log('open');
    return this.sqlite.create({name: 'iRAD.db', location: 'default'});
}

  select(){
    return new Promise((resolve, reject) => {
      this.open().then(
          (teste) => {
              teste.executeSql("SELECT severityIndex as id, severityValues as name FROM mst_accident_severity", []).then(
                  (data) => {
                      let rows=[];
                          for(var i =0; i< data.rows.length;i++){
                              rows.push(data.rows.item(i));
                          }
                          resolve(rows);
                  }
              )
          }
      );
  });

  

  }

}
