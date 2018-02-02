import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { IngresoInsumoAlmacen } from './_dto/ingresoInsumoAlmacen';
import { Distribuidor } from './_dto/distribuidor';
import { Insumo } from './_dto/insumo';
import { Unidad } from './_dto/unidad';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class IngresoAlmacenService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/ingreso_insumos_almacen/';
	private url_distribuidor = 'http://localhost:8000/distribuidores/';
	private url_insumo = 'http://localhost:8000/insumos/';
	private url_unidad = 'http://localhost:8000/unidades/';

	constructor(private http: Http){
	}

	getIngresoInsumosAlmacen():Observable<IngresoInsumoAlmacen[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addIngresoInsumoAlmacen(ingresoInsumoAlmacen: IngresoInsumoAlmacen){
		let url = `${this.url}`;
		let uJson = JSON.stringify(ingresoInsumoAlmacen);
		return this.http.post(url, uJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	/* Combos */

	getDistribuidores():Observable<Distribuidor[]>{
		let url_distribuidor = `${this.url_distribuidor}`;
		return this.http.get(url_distribuidor)
						.map(r => r.json())
						.catch(this.handleError);
	}

	getInsumos():Observable<Insumo[]>{
		let url_insumo = `${this.url_insumo}`;
		return this.http.get(url_insumo)
						.map(r => r.json())
						.catch(this.handleError);
	}

	getUnidades():Observable<Unidad[]>{
		let url_unidad = `${this.url_unidad}`;
		return this.http.get(url_unidad)
						.map(r => r.json())
						.catch(this.handleError);
	}

	eliminarIngresoInsumoAlmacen(idIngresoInsumoAlmacen:number):Observable<string>{
		let url = `${this.url}` + idIngresoInsumoAlmacen + '/';
		console.log("ingresoInsumoAlmacen.service.url = ", url);
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