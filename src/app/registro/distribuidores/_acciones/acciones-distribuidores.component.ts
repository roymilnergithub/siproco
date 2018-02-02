import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarDComponent } from './../_modales/eliminar/eliminar-d.component';
// Service
import { DataService } from "./../data.service";

@Component({
  selector: 'app-acciones-distribuidores',
  templateUrl: './acciones-distribuidores.component.html'
})

export class AccionesDistribuidoresComponent implements OnInit {

	
	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: DataService) { 
	}
	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}

	bsModalRef: BsModalRef;
	eliminarDistribuidor(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarDComponent);
	}

	actualizarDistribuidor(){
		//console.log("this.value1=",this.renderValue);
	}

}
