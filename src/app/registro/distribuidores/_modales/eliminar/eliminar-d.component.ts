import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { DataService } from './../../data.service';
import { Distribuidor } from './../../_dto/distribuidor';
import { DistribuidorService } from './../../distribuidor.service';

@Component({
  selector: 'app-eliminar-d',
  templateUrl: './eliminar-d.component.html'
})

export class EliminarDComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: DataService, private mService: DistribuidorService) {
    }

    //modal
	  distribuidor:Distribuidor;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(distribuidorObject => this.distribuidor = distribuidorObject)
      	console.log("this.distribuidor=",this.distribuidor);
    }

    variable_eliminar: string;
    eliminarDistribuidor(){
      console.log("->Eliminando_Distribuidor")
      console.log("this.distribuidor.id_distribuidor=",this.distribuidor.id_distribuidor);
        this.mService.eliminarDistribuidor(this.distribuidor.id_distribuidor)
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