import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Producto } from './_dto/producto';
import { NombreProducto } from './_dto/nombreProducto';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductoService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/productos/';
	private url_buscar_nombre_producto = 'http://localhost:8000/buscar_nombre_producto/';

	constructor(private http: Http){
	}

	getProductos():Observable<Producto[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addProducto(nombreProducto: NombreProducto){
		let url = `${this.url}`;
		let uJson = JSON.stringify(nombreProducto);
		return this.http.post(url, uJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	buscarNombreProductoRepetido(nombreProducto:string):Observable<Producto[]>{
		let url = `${this.url_buscar_nombre_producto}` + nombreProducto + '/';
		console.log("insumo.service.url_buscar_nombre_producto = ", url);
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	eliminarProducto(idProducto:number):Observable<string>{
		let url = `${this.url}` + idProducto + '/';
		console.log("producto.service.url = ", url);
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