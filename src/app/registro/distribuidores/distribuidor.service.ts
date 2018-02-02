import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Distribuidor } from './_dto/distribuidor';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class DistribuidorService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/distribuidores/';
	private url_buscar_nombre_distribuidor = 'http://localhost:8000/buscar_nom_distribuidor/';
	private url_buscar_dir_distribuidor = 'http://localhost:8000/buscar_dir_distribuidor/';

	constructor(private http: Http){
	}


	getDistribuidores():Observable<Distribuidor[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addDistribuidor(distribuidor: Distribuidor){
		let url = `${this.url}`;
		let mJson = JSON.stringify(distribuidor);
		return this.http.post(url, mJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarDistribuidorRepetido(nombreDistribuidor:string):Observable<Distribuidor[]>{
		let url = `${this.url_buscar_nombre_distribuidor}` + nombreDistribuidor + '/';
		console.log("local.service.url_buscar_nombre_distribuidor = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	buscarDirDistribuidorRepetida(direccion:string):Observable<Distribuidor[]>{
		let url = `${this.url_buscar_dir_distribuidor}` + direccion + '/';
		console.log("local.service.url_buscar_dir_distribuidor = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	eliminarDistribuidor(idDistribuidor:number):Observable<string>{
		let url = `${this.url}` + idDistribuidor + '/';
		console.log("distribuidor.service.url = ", url);
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