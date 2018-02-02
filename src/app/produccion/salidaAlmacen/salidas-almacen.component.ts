import { Component, OnInit } from '@angular/core';

import { SalidaAlmacenService } from './salida-almacen.service';
import { SalidaAlmacen } from './_dto/salidaAlmacen';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-salidas-almacen',
  templateUrl: './salidas-almacen.component.html',
  providers: [SalidaAlmacenService]
})

export class SalidasAlmacenComponent implements OnInit {

	lista: SalidaAlmacen[];
	form: FormGroup;

	constructor(private servicio: SalidaAlmacenService, private fb: FormBuilder) {
	}

	ngOnInit() {
		// Mostrar lista de registroVentas
		this.servicio.getSalidaInsumosAlmacen()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)

	}

	settings = {
		filter: {
			noDataMessage: 'No hay ninguna salida de almacen registrado'	
		},
		columns: {
			id_salida_insumo: {
			  title: 'id_salida_insumo',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			id_producto: {
			  title: 'id_producto',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			id_ingreso_insumo: {
			  title: 'id_ingreso_insumo',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			cantidad_utilizada: {
			  title: 'cantidad_utilizada',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			fecha_salida: {
			  title: 'fecha_salida',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text',
			  valuePrepareFunction: (cell, row) => { 
			  	return this.getFecha(cell);
			  }
			}
		}, 
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		pager: {
			perPage: 10,
			display: true
		}
	};

	getFecha(cell: Date){
		let fecha: Date = new Date(cell);
		let dia = this.darFormato(fecha.getDate());
		let mes = this.darFormato(fecha.getMonth() + 1);
		let anio = fecha.getFullYear();
		let hora = this.darFormato(fecha.getHours());
		let minutos = this.darFormato(fecha.getMinutes());
		let segundos = this.darFormato(fecha.getSeconds());
		//return dia + '-' + mes + '-' + anio;
		return dia + '-' + mes + '-' + anio + ' ' + hora + ':' + minutos + ':' + segundos;
	}
	darFormato(n: number){
		return (n<10)?'0'+n: n;
	}


}
