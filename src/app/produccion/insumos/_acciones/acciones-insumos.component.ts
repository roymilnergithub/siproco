import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarIComponent } from './../_modales/eliminar/eliminar-i.component';
// Service
import { InsumoDataService } from "./../insumo_data.service";

@Component({
  selector: 'app-acciones-insumos',
  templateUrl: './acciones-insumos.component.html',
  styles: []
})

export class AccionesInsumosComponent implements OnInit {

	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: InsumoDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarInsumo(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarInsumo(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarIComponent);
	}

}


