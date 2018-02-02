import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ProductoDisponible } from './_dto/productoDisponible';
import { Local } from './_dto/local';
import { Producto } from './_dto/producto';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductoDisponibleService {

	private headers = new Headers({'Content-Type':'application/json'});
	private url = 'http://localhost:8000/productos_disponibles/';
	private url_local = 'http://localhost:8000/locales';
	private url_producto = 'http://localhost:8000/productos';

	constructor(private http: Http){
	}

	getProductosDisponibles():Observable<ProductoDisponible[]>{
		let url = `${this.url}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}

	addProductoDisponible(productoDisponible: ProductoDisponible){
		let url = `${this.url}`;
		let uJson = JSON.stringify(productoDisponible);
		return this.http.post(url, uJson, {headers: this.headers})
				.map(r => r.json())
				.catch(this.handleError);
	}

	/* Combos */
	getLocales():Observable<Local[]>{
		let url_local = `${this.url_local}`;
		return this.http.get(url_local)
						.map(r => r.json())
						.catch(this.handleError);
	}
	getProductos():Observable<Producto[]>{
		let url = `${this.url_producto}`;
		return this.http.get(url)
						.map(r => r.json())
						.catch(this.handleError);
	}
	eliminarProductoDisponible(idProductoDisponible:number):Observable<string>{
		let url = `${this.url}` + idProductoDisponible + '/';
		console.log("productoDisponible.service.url = ", url);
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