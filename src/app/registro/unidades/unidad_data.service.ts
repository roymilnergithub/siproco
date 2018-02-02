import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Unidad } from './_dto/unidad';

@Injectable()
export class UnidadDataService {
	private unidadObject = new BehaviorSubject<Unidad>(new Unidad(0,'SN','SABR'));
	currentMessage = this.unidadObject.asObservable();

	constructor() { }

	changeMessage(unidad: Unidad) {
		this.unidadObject.next(unidad)
	}
}