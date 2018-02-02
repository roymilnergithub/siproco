import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarIaComponent } from './../_modales/eliminar/eliminar-ia.component';
// Service
import { IngresoAlmacenDataService } from "./../ingreso-almacen_data.service";

@Component({
  selector: 'app-acciones-ia',
  templateUrl: './acciones-ia.component.html',
  styles: []
})

export class AccionesIaComponent implements OnInit {

	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: IngresoAlmacenDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarIngresoInsumoAlmacen(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarIngresoInsumoAlmacen(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarIaComponent);
	}

}

