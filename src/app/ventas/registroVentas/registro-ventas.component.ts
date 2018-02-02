import { Component, OnInit } from '@angular/core';

import { RegistroVentaService } from './registro-venta.service';
import { RegistroVenta } from './_dto/registroVenta';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-registro-ventas',
  templateUrl: './registro-ventas.component.html',
  providers: [RegistroVentaService]
})

export class RegistroVentasComponent implements OnInit {

	lista: RegistroVenta[];
	form: FormGroup;

	constructor(private servicio: RegistroVentaService, private fb: FormBuilder) {
	}

	ngOnInit() {
		// Mostrar lista de registroVentas
		this.servicio.getRegistroVentas()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)

	}

	settings = {
		filter: {
			noDataMessage: 'No hay ningun registro de venta registrado'	
		},
		columns: {
			id_registro_venta: {
			  title: 'id_registro_venta',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			id_producto_disponible: {
			  title: 'id_producto_disponible',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			cantidad_vendida: {
			  title: 'cantidad_vendida',
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
