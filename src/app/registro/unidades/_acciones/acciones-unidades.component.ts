import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarUComponent } from './../_modales/eliminar/eliminar-u.component';
// Service
import { UnidadDataService } from "./../unidad_data.service";

@Component({
  selector: 'app-acciones-unidades',
  templateUrl: './acciones-unidades.component.html'
})

export class AccionesUnidadesComponent implements OnInit {

	//@Input() value: number;
	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: UnidadDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarUnidad(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarUnidad(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarUComponent);
	}

}

