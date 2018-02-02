import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { ProductoDisponibleDataService } from './../../producto-disponible_data.service';
import { ProductoDisponible } from './../../_dto/productoDisponible';
import { ProductoDisponibleService } from './../../producto-disponible.service';

@Component({
  selector: 'app-eliminar-pd',
  templateUrl: './eliminar-pd.component.html',
  styles: []
})

export class EliminarPdComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: ProductoDisponibleDataService, private mService: ProductoDisponibleService) {
    }

    //modal
	  productoDisponible:ProductoDisponible;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(productoDisponibleObject => this.productoDisponible = productoDisponibleObject)
      	console.log("this.productoDisponible=",this.productoDisponible);
    }

    variable_eliminar: string;
    eliminarProductoDisponible(){
      console.log("->Eliminando_productoDisponible")
      console.log("this.productoDisponible.id_producto_disponible=",this.productoDisponible.id_producto_disponible);
        this.mService.eliminarProductoDisponible(this.productoDisponible.id_producto_disponible)
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