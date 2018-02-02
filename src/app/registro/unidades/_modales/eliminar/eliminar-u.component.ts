
import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { UnidadDataService } from './../../unidad_data.service';
import { Unidad } from './../../_dto/unidad';
import { UnidadService } from './../../unidad.service';

@Component({
  selector: 'app-eliminar-u',
  templateUrl: './eliminar-u.component.html'
})

export class EliminarUComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: UnidadDataService, private mService: UnidadService) {
    }

    //modal
	  unidad:Unidad;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(unidadObject => this.unidad = unidadObject)
      	console.log("this.unidad=",this.unidad);
    }

    variable_eliminar: string;
    eliminarUnidad(){
      console.log("->Eliminando_UNIDAD")
      console.log("this.unidad.id_unidad=",this.unidad.id_unidad);
        this.mService.eliminarMarca(this.unidad.id_unidad)
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