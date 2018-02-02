import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Local } from './_dto/local';

@Injectable()
export class LocalDataService {
	private localObject = new BehaviorSubject<Local>(new Local(0,'SN','SDIR'));
	currentMessage = this.localObject.asObservable();

	constructor() { }

	changeMessage(distribuidor: Local) {
		this.localObject.next(distribuidor)
	}
}