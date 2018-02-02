
import { Component, Input, Injectable } from '@angular/core';
// modal
import { BsModalRef } from 'ngx-bootstrap';
// Service
import { LocalDataService } from './../../local_data.service';
import { Local } from './../../_dto/local';
import { LocalService } from './../../local.service';


@Component({
  selector: 'app-eliminar-l',
  templateUrl: './eliminar-l.component.html'
})

export class EliminarLComponent {
	
    constructor(public bsModalRef: BsModalRef, private data: LocalDataService, private mService: LocalService) {
    }

    //modal
	  local:Local;
    ngOnInit() { 
      	this.data.currentMessage.subscribe(localObject => this.local = localObject)
      	console.log("this.local=",this.local);
    }

    variable_eliminar: string;
    eliminarLocal(){
      console.log("->Eliminando_LOCAL")
      console.log("this.local.id_local=",this.local.id_local);
        this.mService.eliminarLocal(this.local.id_local)
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