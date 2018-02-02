import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Marca } from './_dto/marca';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class MarcaService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/marcas/';
	private url_buscar_marca = 'http://localhost:8000/buscar_marca/';
	private url_buscar_abreviatura = 'http://localhost:8000/buscar_abreviatura/';

	constructor(private http: Http){
	}

	getMarcas():Observable<Marca[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addMarca(marca: Marca){
		let url = `${this.url}`;
		let mJson = JSON.stringify(marca);
		return this.http.post(url, mJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarMarcaRepetida(nombreMarca:string):Observable<Marca[]>{
		let url = `${this.url_buscar_marca}` + nombreMarca + '/';
		console.log("marca.service.url_buscar_marca = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	buscarAbreviaturaRepetida(abreviatura:string):Observable<Marca[]>{
		let url = `${this.url_buscar_abreviatura}` + abreviatura + '/';
		console.log("marca.service.url_buscar_abreviatura = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	eliminarMarca(idMarca:number):Observable<string>{
		let url = `${this.url}` + idMarca + '/';
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