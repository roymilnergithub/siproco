import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { MarcaDataService } from './../../marca_data.service';
import { Marca } from './../../_dto/marca';
import { MarcaService } from './../../marca.service';

@Component({
  selector: 'app-eliminar-m',
  templateUrl: './eliminar-m.component.html'
})

export class EliminarMComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: MarcaDataService, private mService: MarcaService) {
    }

    //modal
	  marca:Marca;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(marcaObject => this.marca = marcaObject)
      	console.log("this.marca=",this.marca);
    }

    variable_eliminar: string;
    eliminarMarca(){
      console.log("->Eliminando_MARCA")
      console.log("this.marca.id=",this.marca.id_marca);
        this.mService.eliminarMarca(this.marca.id_marca)
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