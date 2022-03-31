import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import{ environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({ providedIn: 'root' })
 export class ApiService {

	baseURL:string=environment.apiUrl;
	darURL:string=environment.darUrl;
	
	constructor(
		private http: HttpClient
	) { 
	}

	post (serviceURL: string, request: any): Observable<Response> {


		const userData: {
			userid: string;
			name: string;
			role:string;
			state_code:string;
			district_code:string;
			station_code:string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		  } = JSON.parse(localStorage.getItem('userData'));

		  request['token']=userData._token;
		  request['version']=environment.version;

		return this.http.post<Response>(this.baseURL + serviceURL, request)
		.pipe(
		);
	}

	
	url_post (serviceURL: string, request: any): Observable<Response> {


		const userData: {
			userid: string;
			name: string;
			role:string;
			state_code:string;
			district_code:string;
			station_code:string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		  } = JSON.parse(localStorage.getItem('userData'));

		  request['token']=userData._token;
		  request['version']=environment.version;

		return this.http.post<Response>( serviceURL, request)
		.pipe(
		);
	}


	post_wot (serviceURL: string, request: any): Observable<Response> {


	

		return this.http.post<Response>(this.baseURL + serviceURL, request)
		.pipe(
		);
	}

	
	get (serviceURL: string): Observable<Response> {
		return this.http.get<Response>(this.baseURL + serviceURL)
		.pipe(
		);
	}

	darsave(serviceURL: string, request: any): Observable<Response> {
		const userData: {
			userid: string;
			name: string;
			role:string;
			state_code:string;
			district_code:string;
			station_code:string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		  } = JSON.parse(localStorage.getItem('userData'));

		request['token']=userData._token;
		request['version']=environment.version;

		return this.http.post<Response>(this.darURL + serviceURL, request)
		.pipe(
		);
	
	}

}