import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarMComponent } from './../_modales/eliminar/eliminar-m.component';
// Service
import { MarcaDataService } from "./../marca_data.service";

@Component({
  selector: 'app-acciones-marcas',
  templateUrl: './acciones-marcas.component.html'
})
export class AccionesMarcasComponent implements OnInit {

	//@Input() value: number;
	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: MarcaDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarMarca(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarMarca(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarMComponent);
	}

}
