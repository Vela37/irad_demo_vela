import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { mod_accident } from '../models/model_accident';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  // [x: string]: any;



  //db: SQLiteObject;
  devicetype: boolean = false;

  databaseObj: SQLiteObject;
  row_data: any = [];
  sev_data: any = [];
  id: any;
  sev_name: any;
  showLoader: boolean;
  sev_values: any;
  postdata2 = { 'mode': '', 'language': '' };
  options1: any;
  ln: any;
  currentdatetime = new Date();
  readonly database_name: string = "iRAD.db";
  readonly sev_table_name: string = "mst_accident_severity";
  readonly image_table_name: string = "accidentimage";
  readonly loc_table_name: string = "location";
  offlineflag = false;
  pid: any;
  accPid: any;
  selacc: any;
  accID: string;
  imgpID: string;
  PID_LOC: any;
  flag_model: string = "pushed";
  dataToUpload: mod_accident[] = [];
  public local_acc_model: mod_accident;
  photos: SafeResourceUrl = [];
  flag_no: any;

  localSeverity = [{ 'id': '', 'name': '' }, { 'id': '', 'name': '' }, { 'id': '', 'name': '' }, { 'id': '', 'name': '' }, { 'id': '', 'name': '' }];

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private base64: Base64,
    private api: ApiService
  ) {

    this.devicetype = this.checkPlatform();
    if (this.devicetype) {
      this.creatingDB();
    }
  }


  checkPlatform() {
    console.log("checkPlatform");
    if (this.platform.is('android') || this.platform.is('ios')) {
      console.log("mobile :true");
      return true;
    } else {
      console.log("mobile :false");
    }
    return false;
  }


  //-------------------------------------------------------------------


  checkLocalStorage() {
    console.log("checkLocalStorage");
    if (this.checkPlatform()) {
      this.checkForSync()
    }
  }

  checkForSync() {
    console.log("Checking For Sync")
    this.getSeverityRows();
   
  }

  // Create DB instance
  creatingDB() {
    console.log("DB Creation Started")
    let promise = this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        console.log('Database Created!');
        this.creatingSeverityTable();
        this.creatingLocationTable();
        this.creatingImageTable();
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
    return promise;

  }

  creatingSeverityTable() {
    this.databaseObj.executeSql(`
  CREATE TABLE IF NOT EXISTS ${this.sev_table_name}  (pid INTEGER PRIMARY KEY, severityIndex varchar(255), severityValues varchar(255))
  `, [])
      .then(() => {
        console.log("Table sev Created!")

      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  // Create table
  creatingImageTable() {
    this.databaseObj.executeSql(`
  CREATE TABLE IF NOT EXISTS ${this.image_table_name}  (pid INTEGER PRIMARY KEY, AccId varchar(255), RefId varchar(255), Images varchar(255), ImgFlagNo varchar(255), ImgVerNo varchar(255), Flag varchar(255))
  `, [])
      .then(() => {
        console.log("Img-Table Created!")
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  creatingLocationTable() {
    this.databaseObj.executeSql(`
  CREATE TABLE IF NOT EXISTS ${this.loc_table_name}  (pid INTEGER PRIMARY KEY, PoliceJurisdictionCode varchar(255), PoliceJurisdictionName varchar(255), LocationName varchar(255), Lat varchar(255), Long varchar(255), Gps varchar(255), Accq varchar(255), Poi varchar(255), ValueDateTime varchar(255), ReportDateTime varchar(255), VehicleCount varchar(255), Severity varchar(255)
  , DriverDead varchar(255), DriverInjury varchar(255), PassengerInjury varchar(255), PassengerDead varchar(255), PedestInjury varchar(255), PedestDead varchar(255), AnimalInjury varchar(255), AnimalDead varchar(255), Language varchar(255), AccId varchar(255), Flag varchar(255))
  `, [])
      .then(() => {
        console.log('Location Table created');
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  // getSeverityRows() {
  //   this.databaseObj.executeSql(`
  //  SELECT * FROM ${this.sev_table_name}
  //  `, [])
  //    .then((res) => {
  //      console.log(res.rows.length)
  //       this.row_data = [];
  //       if (res.rows.length > 0) {  
  //         console.log("Already Synchronization Done!!!") ;
  //         //return res.rows;
  //         this.localSeverity[0].id=res.rows.item(0).severityIndex;
  //         this.localSeverity[0].name=res.rows.item(0).severityValues;

  //         this.localSeverity[1].id=res.rows.item(1).severityIndex;
  //         this.localSeverity[1].name=res.rows.item(1).severityValues;

  //         this.localSeverity[2].id=res.rows.item(2).severityIndex;
  //         this.localSeverity[2].name=res.rows.item(2).severityValues;

  //         this.localSeverity[3].id=res.rows.item(3).severityIndex;
  //         this.localSeverity[3].name=res.rows.item(3).severityValues;

  //         this.localSeverity[4].id=res.rows.item(4).severityIndex;
  //         this.localSeverity[4].name=res.rows.item(4).severityValues;

  //         console.log("RES 1", this.localSeverity);
  //         console.log("RES", res.rows.item(0));
  //         return this.localSeverity;
  //         //this.presentAlert(msg);
  //       }   else{
  //         console.log("Sync On process")
  //           this.loadseverity();
  //       }
  //    })
  //    .catch(e => {
  //      alert("error " + JSON.stringify(e))
  //    });
  // }

  getSeverityRows() {
    let pen = 'Pending'
    return new Promise((resolve, reject) => {
      this.open().then(
        (test) => {
          test.executeSql(`
  SELECT * FROM ${this.sev_table_name} 
 `, [])
            .then((res) => {
              console.log(res.rows.length)
              this.row_data = [];
              if (res.rows.length > 0) {
                console.log("Already Synchronization Done!!!");
                //return res.rows;
                this.localSeverity[0].id = res.rows.item(0).severityIndex;
                this.localSeverity[0].name = res.rows.item(0).severityValues;

                this.localSeverity[1].id = res.rows.item(1).severityIndex;
                this.localSeverity[1].name = res.rows.item(1).severityValues;

                this.localSeverity[2].id = res.rows.item(2).severityIndex;
                this.localSeverity[2].name = res.rows.item(2).severityValues;

                this.localSeverity[3].id = res.rows.item(3).severityIndex;
                this.localSeverity[3].name = res.rows.item(3).severityValues;

                this.localSeverity[4].id = res.rows.item(4).severityIndex;
                this.localSeverity[4].name = res.rows.item(4).severityValues;

                console.log("RES 1", this.localSeverity);
                console.log("RES", res.rows.item(0));
                //resolve(this.localSeverity);

                return this.localSeverity;
              } else {
                console.log("Sync On process")
                this.loadseverity();
              }
            })
            .catch(e => {
              console.log("error " + JSON.stringify(e))
            });
        }
      );
    });

  }

  public loadseverity() {
    if (this.offlineflag == false) {
      this.postdata2.mode = 'severity';
      this.postdata2.language = this.ln;

      this.severity(this.postdata2).subscribe(
        (success: any) => {
          this.showLoader = true;

          this.options1 = success.data;
          console.log(this.options1)


          console.log("Severity" + this.options1.length)
          // console.log("Row Data"+this.row_data(0).id)
          for (let i = 0; i < this.options1.length; i++) {
            console.log("ENTERED " + i)
            this.id = this.options1[i].id;
            this.sev_name = this.options1[i].name;
            this.insertSeverityRow()
            console.log("Severity-ID" + this.id)
            console.log("Severity-NAME" + this.sev_name)
          }
          this.currentdatetime = new Date(success.currentdatetime);
          console.log('currentdatetime : ', this.currentdatetime);
          this.showLoader = false;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      var msg = 'Please switch on the internet to load Severity!!!';
      console.log(msg);
    }
  }
  public severity(postdata2: any) {

    return this.api.post('datas', postdata2);

  }

  insertSev(ids, severityname, sev) {
    console.log("Sev Values", ids, severityname);

    console.log("Sev Values2", sev);
    // for(let i=0;i<this.options1.length;i++){
    //   console.log("ENTERED "+i)
    //   this.id=this.options1[i].id;
    //   this.sev_name=this.options1[i].name;
    //   this.insertSeverityRow()
    //   console.log("Severity-ID"+this.id)
    //   console.log("Severity-NAME"+this.sev_name)
    // }
    this.databaseObj.executeSql(`
      INSERT INTO ${this.sev_table_name} (severityIndex, severityValues) VALUES ('${ids}', '${severityname}')
    `, [])
      .then(() => {
        console.log('Severity Data Inserted locally in tab2 page!');
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });

  }

  //Inset row in the table
  insertSeverityRow() {
    //let data = [this.name_model, this.gender_model, this.mobile_model, this.flag_model];

    this.databaseObj.executeSql(`
      INSERT INTO ${this.sev_table_name} (severityIndex, severityValues) VALUES ('${this.id}', '${this.sev_name}')
    `, [])
      .then(() => {
        console.log('Severity Data Inserted locally in tab2 page!');
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  

  
  
  public updateaccident(postData: any) {
    return this.api.post('locationnew', postData);
  }


  insertRowLocationPage(local_acc_model: mod_accident) {
    this.databaseObj.executeSql(`
    INSERT INTO ${this.loc_table_name} (PoliceJurisdictionCode, PoliceJurisdictionName, LocationName, Lat, Long, Gps, Accq, Poi, ValueDateTime, ReportDateTime, VehicleCount, Severity, DriverDead, DriverInjury, PassengerInjury, PassengerDead, PedestInjury, PedestDead, AnimalInjury, AnimalDead, Language, Flag) VALUES ('${local_acc_model.policejurisicode}', '${local_acc_model.policejurisiname}', '${local_acc_model.lname}', '${local_acc_model.lat}', '${local_acc_model.lon}', '${local_acc_model.gps}', '${local_acc_model.accq}', '${local_acc_model.poi}', '${local_acc_model.mvalue_date_time}', '${local_acc_model.report_datetime}', '${local_acc_model.mvalue_vcount}', '${local_acc_model.mvalue_severity}'
    , '${local_acc_model.driver_dead}', '${local_acc_model.driver_inj}', '${local_acc_model.pass_inj}', '${local_acc_model.pass_dead}', '${local_acc_model.ped_inj}', '${local_acc_model.ped_dead}', '${local_acc_model.animal_inj}', '${local_acc_model.animal_dead}', '${local_acc_model.language}', 'Pending')
  `, [])
      .then((row: any) => {
        console.log('LocationPage Data Inserted!');
        console.log('Inserted row Id:', row.insertId);
        this.selacc =
        {
          'accid': row.insertId,
          'datetime': this.local_acc_model.mvalue_date_time,
          'landmark': this.local_acc_model.lname,
          'offlinedata': true
        };
        localStorage.setItem('selacc', JSON.stringify(this.selacc));
        //this.gettingLocationPid(local_acc_model)
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  gettingLocationPid(local_acc_model: mod_accident) {
    //slocalStorage.removeItem('selacc');
    this.databaseObj.executeSql(`
 SELECT * FROM ${this.loc_table_name} WHERE LocationName = '${local_acc_model.lname}' AND Lat = '${local_acc_model.lat}' AND Long = '${local_acc_model.lon}' AND ValueDateTime = '${local_acc_model.mvalue_date_time}' AND ReportDateTime = '${local_acc_model.report_datetime}'
 `
      , [])
      .then((res) => {
        this.row_data = [];
        console.log('PID LENGTH', res.rows.length);
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.pid = res.rows.item(i).pid;
            console.log("PID Local getting" + this.pid);
            this.selacc =
            {
              'accid': this.pid,
              'datetime': this.local_acc_model.mvalue_date_time,
              'landmark': this.local_acc_model.lname,
              'offlinedata': true
            };
            localStorage.setItem('selacc', JSON.stringify(this.selacc));
          }
        }
        console.log('/////test', JSON.parse(localStorage.getItem('selacc')))
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }

  //Inset row in the table
  insertingImgRow(flag: any, accid: any, photos: any) {
    //let data = [this.name_model, this.gender_model, this.mobile_model, this.flag_model];
    
    console.log("INSERTINg ROW refid" + accid)
    console.log("INSERTINg ROW img val" + photos)
    console.log(flag)
    this.databaseObj.executeSql(`
    INSERT INTO ${this.image_table_name} (RefId, Images, ImgFlagNo, Flag) VALUES ('${accid}', '${photos}', '${flag}', 'Pending')
  `, [])
      .then(() => {
        console.log("Img Added locally")
      })
      .catch(e => {
        console.log("error " + JSON.stringify(e))
      });
  }


  open() {
    console.log('open');
    return this.sqlite.create({ name: 'iRAD.db', location: 'default' });
  }

  select() {
    return new Promise((resolve, reject) => {
      this.open().then(
        (test) => {
          test.executeSql("SELECT severityIndex as id, severityValues as name FROM mst_accident_severity", []).then(
            (data) => {
              let rows = [];
              for (var i = 0; i < data.rows.length; i++) {
                rows.push(data.rows.item(i));
              }
              resolve(rows);
            }
          )
        }
      );
    });
  }

  insertlocdata(local_acc_model: mod_accident) {
    return new Promise((resolve, reject) => {
      this.open().then(
        (test) => {
          test.executeSql(`
          INSERT INTO ${this.loc_table_name} (PoliceJurisdictionCode, PoliceJurisdictionName, LocationName, Lat, Long, Gps, Accq, Poi, ValueDateTime, ReportDateTime, VehicleCount, Severity, DriverDead, DriverInjury, PassengerInjury, PassengerDead, PedestInjury, PedestDead, AnimalInjury, AnimalDead, Language, Flag) VALUES ('${local_acc_model.policejurisicode}', '${local_acc_model.policejurisiname}', '${local_acc_model.lname}', '${local_acc_model.lat}', '${local_acc_model.lon}', '${local_acc_model.gps}', '${local_acc_model.accq}', '${local_acc_model.poi}', '${local_acc_model.mvalue_date_time}', '${local_acc_model.report_datetime}', '${local_acc_model.mvalue_vcount}', '${local_acc_model.mvalue_severity}'
          , '${local_acc_model.driver_dead}', '${local_acc_model.driver_inj}', '${local_acc_model.pass_inj}', '${local_acc_model.pass_dead}', '${local_acc_model.ped_inj}', '${local_acc_model.ped_dead}', '${local_acc_model.animal_inj}', '${local_acc_model.animal_dead}', '${local_acc_model.language}', 'Pending')
        `, [])
            .then((row: any) => {
              console.log('LocationPage Data Inserted!');
              console.log('Inserted row Id:', row.insertId);
              console.log('Inserted row:', row);
              resolve(row);
            })
            .catch(e => {
              console.log("error " + JSON.stringify(e))
            });
        }
      );
    });
  }

  getPendingImg(id) {
    let pen = 'Pending'
    return new Promise((resolve, reject) => {
      this.open().then(
        (test) => {
          test.executeSql(`
  SELECT * FROM ${this.image_table_name} WHERE RefId = '${id}' AND Flag = '${pen}' 
 `, [])
            .then((res) => {
              this.row_data = [];
              console.log(res.rows.length)
              if (res.rows.length > 0) {
                this.photos = [];
                for (var i = 0; i < res.rows.length; i++) {
                  console.log(res.rows.item(i).Images)
                  resolve(res.rows.item(i))
                }
              }
            })
            .catch(e => {
              console.log("error " + JSON.stringify(e))
            });
        }
      );
    });

  }

  getPendingImglength(id) {
    let pen = 'Pending'
    return new Promise((resolve, reject) => {
      this.open().then(
        (test) => {
          test.executeSql(`
  SELECT * FROM ${this.image_table_name} WHERE RefId = '${id}' AND Flag = '${pen}' 
 `, [])
            .then((res) => {
              this.row_data = [];
              console.log(res.rows.length)
              resolve(res.rows.length);
            })
            .catch(e => {
              console.log("error " + JSON.stringify(e))
            });
        }
      );
    });

  }


  updateImgFlag(pid) {
    this.databaseObj.executeSql(`
  UPDATE ${this.image_table_name}
  SET Flag = '${this.flag_model}'
  WHERE pid = ${pid}
`, [])
      .then(() => {
        console.log("ImgFlag Updated local");

      })
      .catch(e => {
        console.log("Flag Update Error")
        console.log("error " + JSON.stringify(e))
      });
  }

}
