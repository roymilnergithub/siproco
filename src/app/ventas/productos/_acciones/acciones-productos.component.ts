import { Component, Input, OnInit} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
// modal
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { EliminarPComponent } from './../_modales/eliminar/eliminar-p.component';
// Service
import { ProductoDataService } from "./../producto_data.service";

@Component({
  selector: 'app-acciones-productos',
  templateUrl: './acciones-productos.component.html',
  styleUrls: []
})

export class AccionesProductosComponent implements OnInit {

	//@Input() value: number;
	@Input() rowData: any;

	constructor(private modalService: BsModalService, private data: ProductoDataService) { 
	}

	//renderValue: any;
	ngOnInit() {
		//this.renderValue = this.rowData;
	}
	
	editarProducto(){
		//console.log("this.value1=",this.renderValue);
	}

	bsModalRef: BsModalRef;
	eliminarProducto(){
		this.data.changeMessage(this.rowData);
		//this.bsModalRef = this.modalService.show(EliminarDComponent, {class: 'modal-ng'});
        this.bsModalRef = this.modalService.show(EliminarPComponent);
	}
}

