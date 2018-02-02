import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { ProductoDataService } from './../../producto_data.service';
import { Producto } from './../../_dto/producto';
import { ProductoService } from './../../producto.service';

@Component({
  selector: 'app-eliminar-p',
  templateUrl: './eliminar-p.component.html'
})

export class EliminarPComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: ProductoDataService, private mService: ProductoService) {
    }

    //modal
	  producto:Producto;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(productoObject => this.producto = productoObject)
      	console.log("this.producto=",this.producto);
    }

    variable_eliminar: string;
    eliminarProducto(){
      console.log("->Eliminando_PRODUCTO")
      console.log("this.producto.id_producto=",this.producto.id_producto);
        this.mService.eliminarProducto(this.producto.id_producto)
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