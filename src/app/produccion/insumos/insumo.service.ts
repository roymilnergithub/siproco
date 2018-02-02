import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Insumo } from './_dto/insumo';
import { Marca } from './_dto/marca';
import { RegistroRepetido } from './_dto/RegistroRepetido';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class InsumoService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/insumos/';
	private url_buscar_registro = 'http://localhost:8000/buscar_registro/';
	private url_marca = 'http://localhost:8000/marcas';
	private url_unidad = 'http://localhost:8000/unidades';

	constructor(private http: Http){
	}

	getInsumos():Observable<Insumo[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addInsumo(registroRepetido: RegistroRepetido){
		let url = `${this.url}`;
		let uJson = JSON.stringify(registroRepetido);
		return this.http.post(url, uJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarRegistroRepetido(nombre:string, idMarca: number):Observable<Insumo[]>{
		let url = `${this.url_buscar_registro}` + nombre + '/' + idMarca + '/';
		console.log("insumo.service.url_buscar_registro = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	/* Combos */
	getMarcas():Observable<Marca[]>{
		let url_marca = `${this.url_marca}`;
		return this.http.get(url_marca)
						.map(r => r.json())
						.catch(this.handleError);
	}

	eliminarInsumo(idInsumo:number):Observable<string>{
		let url = `${this.url}` + idInsumo + '/';
		console.log("insumo.service.url = ", url);
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