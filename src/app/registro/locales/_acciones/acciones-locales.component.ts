import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarLComponent } from './../_modales/eliminar/eliminar-l.component';
// Service
import { LocalDataService } from "./../local_data.service";

@Component({
  selector: 'app-acciones-locales',
  templateUrl: './acciones-locales.component.html'
})

export class AccionesLocalesComponent implements OnInit {

	//@Input() value: number;
	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: LocalDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarLocal(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarLocal(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarLComponent);
	}

}
