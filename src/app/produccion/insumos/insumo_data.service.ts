import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Insumo } from './_dto/insumo';

@Injectable()
export class InsumoDataService {
	private insumoObject = new BehaviorSubject<Insumo>(new Insumo(0,'SN',0));
	currentMessage = this.insumoObject.asObservable();

	constructor() { }

	changeMessage(insumo: Insumo) {
		this.insumoObject.next(insumo)
	}
}