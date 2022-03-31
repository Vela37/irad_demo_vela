import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translate: TranslateService, private storage: Storage) { }

  getDefaultLanguage(){

    let sel_language;

    // Or to get a key/value pair
    this.storage.get('ln').then((language) => {
      console.log('Your Language is', language);
      if(language==undefined){
       // let language = this.translate.getBrowserLang();
       let language = 'en';
        this.translate.setDefaultLang(language);
        sel_language= language;

      }else{
      this.translate.setDefaultLang(language);
      sel_language= language;
      }

    });
    //this.storage.set('ln', 'ta');
   // let language = this.translate.getBrowserLang();
   // this.translate.setDefaultLang(language);
    return sel_language;
  }
 
  setLanguage(setLang:string) {
    this.translate.use(setLang);
    this.storage.set('ln', setLang);
    console.log(' language changed to  : '+ setLang);
  }
}
