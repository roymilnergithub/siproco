import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Marca } from './_dto/marca';

@Injectable()
export class MarcaDataService {
	private marcaObject = new BehaviorSubject<Marca>(new Marca(0,'SN','SABR'));
	currentMessage = this.marcaObject.asObservable();

	constructor() { }

	changeMessage(marca: Marca) {
		this.marcaObject.next(marca)
	}
}