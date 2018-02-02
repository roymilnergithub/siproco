import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Local } from './_dto/local';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocalService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/locales/';
	private url_buscar_local = 'http://localhost:8000/buscar_local/';
	private url_buscar_dir_local = 'http://localhost:8000/buscar_direccion_local/';

	constructor(private http: Http){
	}

	getLocales():Observable<Local[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addLocal(local: Local){
		let url = `${this.url}`;
		let mJson = JSON.stringify(local);
		return this.http.post(url, mJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarLocalRepetido(nombreLocal:string):Observable<Local[]>{
		let url = `${this.url_buscar_local}` + nombreLocal + '/';
		console.log("local.service.url_buscar_local = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	buscarDirLocalRepetida(direccion:string):Observable<Local[]>{
		let url = `${this.url_buscar_dir_local}` + direccion + '/';
		console.log("local.service.url_buscar_dir_local = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	eliminarLocal(idLocal:number):Observable<string>{
		let url = `${this.url}` + idLocal + '/';
		console.log("local.service.url = ", url);
		return this.http.delete(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	private handleError(error: Response | any) {
		let errMsg: string;
		if(error instanceof Response) {
			let body = error.json() || '';
			let err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
	}

}