import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Producto } from './_dto/producto';

@Injectable()
export class ProductoDataService {
	private productoObject = new BehaviorSubject<Producto>(new Producto(0,'SN'));
	currentMessage = this.productoObject.asObservable();

	constructor() { }

	changeMessage(producto: Producto) {
		this.productoObject.next(producto)
	}
}