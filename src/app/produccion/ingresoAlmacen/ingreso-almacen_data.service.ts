import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IngresoInsumoAlmacen } from './_dto/ingresoInsumoAlmacen';

@Injectable()
export class IngresoAlmacenDataService {
	private ingresoInsumoAlmacenObject = new BehaviorSubject<IngresoInsumoAlmacen>(new IngresoInsumoAlmacen(0,0,0,0,0,0,0,new Date('0000-00-00 00:00:00'),new Date('0000-00-00 00:00:00')));
	currentMessage = this.ingresoInsumoAlmacenObject.asObservable();

	constructor() { }

	changeMessage(ingresoInsumoAlmacen: IngresoInsumoAlmacen) {
		this.ingresoInsumoAlmacenObject.next(ingresoInsumoAlmacen)
	}
}