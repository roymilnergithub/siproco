import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Distribuidor } from './_dto/distribuidor';

@Injectable()
export class DataService {
	private distribuidorObject = new BehaviorSubject<Distribuidor>(new Distribuidor(0,'SD','SDIR'));
	currentMessage = this.distribuidorObject.asObservable();

	constructor() { }

	changeMessage(distribuidor: Distribuidor) {
		this.distribuidorObject.next(distribuidor)
	}
}