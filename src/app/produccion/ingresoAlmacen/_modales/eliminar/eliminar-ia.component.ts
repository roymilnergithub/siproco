import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { IngresoAlmacenDataService } from './../../ingreso-almacen_data.service';
import { IngresoInsumoAlmacen } from './../../_dto/ingresoInsumoAlmacen';
import { IngresoAlmacenService } from './../../ingreso-almacen.service';

@Component({
  selector: 'app-eliminar-ia',
  templateUrl: './eliminar-ia.component.html',
  styles: []
})

export class EliminarIaComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: IngresoAlmacenDataService, private mService: IngresoAlmacenService) {
    }

    //modal
	  ingresoInsumoAlmacen:IngresoInsumoAlmacen;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(ingresoInsumoAlmacenObject => this.ingresoInsumoAlmacen = ingresoInsumoAlmacenObject)
      	console.log("this.ingresoInsumoAlmacen=",this.ingresoInsumoAlmacen);
    }

    variable_eliminar: string;
    eliminarIngresoInsumoAlmacen(){
      console.log("->Eliminando_ingresoInsumoAlmacen")
      console.log("this.ingresoInsumoAlmacen.id_ingreso_insumo=",this.ingresoInsumoAlmacen.id_ingreso_insumo);
        this.mService.eliminarIngresoInsumoAlmacen(this.ingresoInsumoAlmacen.id_ingreso_insumo)
          .subscribe(
            rs => this.variable_eliminar = rs,
            er => console.log(er),
            () => {  
                      console.log("this.variable_eliminar=",this.variable_eliminar);
                      window.location.reload();  
                  }
          )
    }

}