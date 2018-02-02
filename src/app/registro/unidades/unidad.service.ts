import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Unidad } from './_dto/unidad';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class UnidadService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/unidades/';
	private url_buscar_unidad = 'http://localhost:8000/buscar_unidad/';
	private url_buscar_abrev_unid = 'http://localhost:8000/buscar_abrev_unid/';

	constructor(private http: Http){
	}

	getUnidades():Observable<Unidad[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addUnidad(unidad: Unidad){
		let url = `${this.url}`;
		let uJson = JSON.stringify(unidad);
		return this.http.post(url, uJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarUnidadRepetida(nombreUnidad:string):Observable<Unidad[]>{
		let url = `${this.url_buscar_unidad}` + nombreUnidad + '/';
		console.log("marca.service.url_buscar_unidad = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	buscarAbreviaturaRepetida(abreviatura:string):Observable<Unidad[]>{
		let url = `${this.url_buscar_abrev_unid}` + abreviatura + '/';
		console.log("marca.service.url_buscar_abrev_unid = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	eliminarMarca(idUnidad:number):Observable<string>{
		let url = `${this.url}` + idUnidad + '/';
		console.log("marca.service.url = ", url);
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