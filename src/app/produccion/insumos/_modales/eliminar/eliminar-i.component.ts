import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { InsumoDataService } from './../../insumo_data.service';
import { Insumo } from './../../_dto/insumo';
import { InsumoService } from './../../insumo.service';

@Component({
  selector: 'app-eliminar-i',
  templateUrl: './eliminar-i.component.html',
  styles: []
})

export class EliminarIComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: InsumoDataService, private mService: InsumoService) {
    }

    //modal
	  insumo:Insumo;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(insumoObject => this.insumo = insumoObject)
      	console.log("this.insumo=",this.insumo);
    }

    variable_eliminar: string;
    eliminarInsumo(){
      console.log("->Eliminando_INSUMO")
      console.log("this.insumo.id_insumo=",this.insumo.id_insumo);
        this.mService.eliminarInsumo(this.insumo.id_insumo)
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