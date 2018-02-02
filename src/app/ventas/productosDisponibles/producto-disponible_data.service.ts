import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductoDisponible } from './_dto/productoDisponible';

@Injectable()
export class ProductoDisponibleDataService {
	private productoDisponibleObject = new BehaviorSubject<ProductoDisponible>(new ProductoDisponible(0,0,0,0,0,0,0,new Date('0000-00-00 00:00:00'),new Date('0000-00-00 00:00:00')));
	currentMessage = this.productoDisponibleObject.asObservable();

	constructor() { }

	changeMessage(productoDisponible: ProductoDisponible) {
		this.productoDisponibleObject.next(productoDisponible)
	}
}