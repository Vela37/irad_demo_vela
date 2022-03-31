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
export class Localdb {

    //db: SQLiteObject;
    devicetype: boolean = false;
    databaseObj: SQLiteObject;
    readonly database_name: string = "iRAD.db";
    readonly sev_table_name: string = "mst_accident_severity";
    readonly image_table_name: string = "accidentimage";
    readonly loc_table_name: string = "location";
    public local_acc_model: mod_accident;
    row_data: any = [];
    accID: string;
    dataToUpload: mod_accident[] = [];photos: SafeResourceUrl = [];
    flag_no: any;
    PID_LOC: any;
    offlineflag = false;
    flag_model: string = "pushed";
    imgpID: string;
    

    constructor(private sqlite: SQLite,
        private platform: Platform,
        private base64: Base64,
        private api: ApiService) {
        this.devicetype = this.checkPlatform();
        if (this.devicetype) {
            this.creatingDB();
        }
    }

    checkPlatform() {
        console.log("checkPlatform");
        if (this.platform.is('android')) {
            console.log("mobile :true");
            return true;
        } else {
            console.log("mobile :false");
        }
        return false;
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
                //this.creatingSeverityTable();
                this.creatingLocationTable();
                this.creatingImageTable();
            })
            .catch(e => {
                console.log("error " + JSON.stringify(e))
            });
        return promise;

    }

    // Create Location table
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

    // Create Accident Img table
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


    getlocalAccidentData() {
        console.log("Get Pending Accident Rows")
        let val = 'Pending'
        console.log(`SELECT * FROM ${this.loc_table_name} WHERE Flag='${val}' LIMIT 1 OFFSET 0;
        `);
        this.databaseObj.executeSql(`
       SELECT * FROM ${this.loc_table_name} WHERE Flag='${val}' LIMIT 1 OFFSET 0;
       `, [])
            .then((res) => {
                this.row_data = [];
                this.dataToUpload = [];
                console.log("ROW_DATA LEN" + res.rows.length)
                //this.gettingAccImgRows() 
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        console.log("For loop entered")
                        this.row_data.push(res.rows.item(i)); console.log(res.rows.item(i).pid, res.rows.item(i).ValueDateTime, res.rows.item(i).Severity, res.rows.item(i).LocationName)
                        this.local_acc_model = new mod_accident();

                        this.PID_LOC = res.rows.item(i).pid;

                        this.local_acc_model.investigating = 'accident';
                        this.local_acc_model.policejurisicode = res.rows.item(i).PoliceJurisdictionCode;
                        this.local_acc_model.policejurisiname = res.rows.item(i).PoliceJurisdictionName;
                        this.local_acc_model.lat = res.rows.item(i).Lat;
                        this.local_acc_model.lon = res.rows.item(i).Long;
                        this.local_acc_model.gps = res.rows.item(i).Gps;
                        this.local_acc_model.accq = res.rows.item(i).Accq;
                        this.local_acc_model.poi = res.rows.item(i).Poi;
                        this.local_acc_model.lname = res.rows.item(i).LocationName;
                        console.log(res.rows.item(i).ValueDateTime);
                        let valueDate = new Date(res.rows.item(i).ValueDateTime);
                        console.log(valueDate)
                        this.local_acc_model.mvalue_date_time = valueDate;
                        let reportDate = new Date(res.rows.item(i).ReportDateTime);
                        this.local_acc_model.report_datetime = reportDate;
                        this.local_acc_model.mvalue_vcount = res.rows.item(i).VehicleCount;
                        this.local_acc_model.mvalue_severity = res.rows.item(i).Severity;

                        this.local_acc_model.driver_dead = res.rows.item(i).DriverDead;
                        this.local_acc_model.driver_inj = res.rows.item(i).DriverInjury;
                        this.local_acc_model.pass_inj = res.rows.item(i).PassengerInjury;
                        this.local_acc_model.pass_dead = res.rows.item(i).PassengerDead;
                        this.local_acc_model.ped_inj = res.rows.item(i).PedestInjury;
                        this.local_acc_model.ped_dead = res.rows.item(i).PedestDead;

                        this.local_acc_model.animal_inj = res.rows.item(i).AnimalInjury;
                        this.local_acc_model.animal_dead = res.rows.item(i).AnimalDead;

                        this.local_acc_model.language = res.rows.item(i).Language;

                        console.log("TAB2" + this.offlineflag)
                        if (this.offlineflag == false) {
                            console.log("Uploading data...")
                            console.log(this.local_acc_model);
                            this.updateaccident(this.local_acc_model).subscribe(
                                (success: any) => {
                                    console.log('Accident Id Added!!!');
                                    console.log("SuccessMsg" + success.error);
                                    console.log("SuccessFlag" + success.flag);
                                    this.accID = success.accid;
                                    console.log("SuccessAccId" + success.flag);
                                    if (success.flag == 1) {
                                        console.log("Data Uploaded");
                                        this.accID = success.accid;
                                        console.log(this.PID_LOC)
                                        this.updateAccId(this.accID,this.PID_LOC);
                                        console.log(this.accID, this.local_acc_model.lname, this.local_acc_model.mvalue_date_time);
                                        //this.getlocalAccidentData();
                                    }

                                },
                                error => {
                                    //  console.log(error);
                                }
                            );
                        }

                    }
                }
            })
            .catch(e => {
              console.log("error " + JSON.stringify(e))
            });
    }

    updateAccId(accid,pid) {
        console.log("ACC_ID" + this.accID)
        this.databaseObj.executeSql(`
       UPDATE ${this.loc_table_name}
       SET AccId = '${accid}'
       WHERE pid = ${pid}
     `, [])
          .then(() => {
            
            console.log("AccId Updated local in location table @TAB2")
            this.updateFlag(pid);
          })
          .catch(e => {
            console.log("AccId Update Error" + e)
            console.log("error " + JSON.stringify(e))
          });
      }

    updateFlag(pid) {
        this.databaseObj.executeSql(`
        UPDATE ${this.loc_table_name}
        SET Flag = '${this.flag_model}'
        WHERE pid = ${pid}
       `, [])
          .then(() => {
            console.log("Flag Updated local in location table @TAB2")
            this.getImageData();
          })
          .catch(e => {
            console.log("Flag Update Error")
            console.log("Flag Update Error " + JSON.stringify(e))
          });
      }
    

    public updateaccident(postData: any) {
        return this.api.post('locationnew', postData);
    }

    getImageData() {
        let pen = 'Pending';
        let val = 'Pending';
        console.log("getting img data with refid===",this.PID_LOC);
        console.log( `SELECT * FROM ${this.image_table_name} WHERE RefId = ${this.PID_LOC} AND Flag = '${val}' LIMIT 1 OFFSET 0;
        `);
        this.databaseObj.executeSql(`
     SELECT * FROM ${this.image_table_name} WHERE RefId = ${this.PID_LOC} AND Flag = '${val}' LIMIT 1 OFFSET 0;
    `, [])
          .then((res) => {
            this.row_data = [];
            console.log(res.rows.length)
            if (res.rows.length > 0) {
              this.photos = [];
              for (var i = 0; i < res.rows.length; i++) {
                this.row_data.push(res.rows.item(i));
                //  console.log("RQQAccID"+res.rows.item(i).Images)
                //  console.log("RQQpID"+res.rows.item(i).RefId)   
                //  console.log(res.rows.item(i).Flag)
                //  console.log(this.accID) 
                this.flag_no = res.rows.item(i).Images.substring(72, 73)
                console.log(this.flag_no)
                this.imgpID = res.rows.item(i).pid
                console.log("IMg tble PID" + this.imgpID)
                console.log(res.rows.item(i).Images)
                console.log(res.rows.item(i).ImgFlagNo)
                this.photos[res.rows.item(i).ImgFlagNo] = res.rows.item(i).Images
                let imgpath = this.photos[res.rows.item(i).ImgFlagNo];
                let imgflagno = res.rows.item(i).ImgFlagNo;

                var fileType = imgpath.substring(imgpath.lastIndexOf(".") + 1);
                console.log("FILE TYPE LOcAL",fileType);
                //if (imgpath !== '') {
                this.getBase64StringByFilePath(imgpath)
                  .then((res) => {
                    var base64Only = res.slice(34);
                    let imgString = "data:image/jpg;base64," + base64Only;
                    console.log("imgString ", imgString);

                    if(fileType== "mp4"){
                        this.uploadVideo(imgflagno,imgString);
                    }else{
                      this.uploadingpic(imgflagno, imgString);
                    }
    
                  });
              }
            } else {
              this.deleteLocRow();
              
            }
          })
          .catch(e => {
            console.log("error " + JSON.stringify(e))
          });
    }

    public getBase64StringByFilePath(fileURL: string): Promise<string> {

        return new Promise((resolve, reject) => {
          this.base64.encodeFile(fileURL).then((base64File: string) => {
            resolve(base64File);
          }, (err) => {
            console.log(err);
          });
        })
      }
    
      uploadingpic(flag, photo) {
        console.log("Uploading Local PICS..." + photo)
        let postDate = {
          mode: 'imageupload',
          accid: this.accID,
          imageflag: flag,
          image: photo
        }
        this.api.post('imgupload', postDate).subscribe(
          (data: any) => {
            console.log(data);
            this.updatingImgtableAccId()
          });
      }

      uploadVideo(flag, video) {
        console.log("Uploading local Video ",flag);
        
    
        let postDate = {
          mode: 'videoupload',
          accid: this.accID,
          videoflag: flag,
          video: video
        }
           
        this.api.post('accvideo', postDate).subscribe(
          (success: any) => {
    
            this.updatingImgtableAccId();    
          },
          error => {
    
          }
        );
    
      }


      
  updatingImgtableAccId() {
    console.log("ACC_ID" + this.accID)
    this.databaseObj.executeSql(`
  UPDATE ${this.image_table_name}
  SET AccId = '${this.accID}'
  WHERE pid = ${this.imgpID}
    `, [])
      .then(() => {
        console.log("ImgAccId Updated local")
        this.updateImgtableFlag();
      })
      .catch(e => {
        console.log("ImgAccId Update Error" + e)
      });
  }

  updateImgtableFlag() {
    this.databaseObj.executeSql(`
      UPDATE ${this.image_table_name}
      SET Flag = '${this.flag_model}'
      WHERE pid = ${this.imgpID}
    `, [])
      .then(() => {
        console.log("ImgFlag Updated local")
        this.getImageData();
      })
      .catch(e => {
        console.log("Flag Update Error")
      });
  }
    

  // Delete single row 
  deleteLocRow() {
    console.log("Delete Loc with pid",this.PID_LOC);
    this.databaseObj.executeSql(`
      DELETE FROM ${this.loc_table_name} WHERE pid = ${this.PID_LOC}
    `
      , [])
      .then((res) => {
        console.log("Row Loc Deleted!");
        this.deleteImgRow();
      })
      .catch(e => {
        console.log("Row Loc Deleted error " + JSON.stringify(e))
      });
  }

  // Delete single row 
  deleteImgRow() {

    console.log("Delete Img with refid",this.PID_LOC);
    console.log(`DELETE FROM ${this.image_table_name} WHERE RefId = ${this.PID_LOC}
    `);
    this.databaseObj.executeSql(`
      DELETE FROM ${this.image_table_name} WHERE RefId = ${this.PID_LOC}
    `
      , [])
      .then((res) => {
        console.log("Row Img Deleted!");
        this.getlocalAccidentData();
      })
      .catch(e => {
        console.log("Row Img Deleted error " + JSON.stringify(e))
      });
  }

}