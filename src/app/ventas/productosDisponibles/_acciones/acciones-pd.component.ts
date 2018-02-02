import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarPdComponent } from './../_modales/eliminar/eliminar-pd.component';
// Service
import { ProductoDisponibleDataService } from "./../producto-disponible_data.service";

@Component({
  selector: 'app-acciones-pd',
  templateUrl: './acciones-pd.component.html',
  styleUrls: []
})

export class AccionesPdComponent implements OnInit {

	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: ProductoDisponibleDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarProductoDisponible(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarProductoDisponible(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarPdComponent);
	}

}

