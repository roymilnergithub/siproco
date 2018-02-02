import { Component, OnInit } from '@angular/core';

import { IngresoAlmacenService } from './ingreso-almacen.service';
import { IngresoInsumoAlmacen } from './_dto/ingresoInsumoAlmacen';
import { Distribuidor } from './_dto/distribuidor';
import { Insumo } from './_dto/insumo';
import { Unidad } from './_dto/unidad';

import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesIaComponent } from './_acciones/acciones-ia.component';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-ingresos-almacen',
  templateUrl: './ingresos-almacen.component.html',
  styleUrls: []
})

export class IngresosAlmacenComponent implements OnInit {

	lista: IngresoInsumoAlmacen[];
	form: FormGroup;
	
	// ngModel
	distribuidor: Distribuidor = new Distribuidor(0, 'SN', 'SD');
	insumo: Insumo = new Insumo(0, 'SN',0);
	cantidad_comprada: number = 0;
	unidad: Unidad = new Unidad(0, 'SN','SABR');
	precio_compra: number = 0;
	// InicializarFechas
	init_fecha:Date = new Date();
	model_fecha_entrada: any = { 
    	date: { 	
	    	year: this.init_fecha.getFullYear(), 
	    	month: this.init_fecha.getMonth()+1, 
	    	day: this.init_fecha.getDate() 
	    } 
	};
	model_fecha_vencimiento: any = { 
    	date: { 	
	    	year: this.init_fecha.getFullYear(), 
	    	month: this.init_fecha.getMonth()+1, 
	    	day: this.init_fecha.getDate() 
	    } 
	};
	// Formatos de Fecha
	fecha_entrada: IMyDpOptions = { 
		dateFormat: 'dd-mm-yyyy', 
		dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
		monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
		markCurrentDay: true,
		// TODO: Desabilitado desde mañana
		// disableSince: {year: 2018, month: 2, day: 1},
		// TODO: Desabilitado hasta hace 5 dias
		// disableUntil: {year: 2018, month: 1, day: 25},
	};
    fecha_vencimiento: IMyDpOptions = { 
		dateFormat: 'dd-mm-yyyy', 
		dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
		monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
		// TODO: Desabilitado desde 1 año
		// disableSince: {year: 2019, month: 1, day: 29},
		// TODO: Desabilitado hasta hoy
		// disableUntil: {year: 2018, month: 1, day: 29},
	};

	constructor(private servicio: IngresoAlmacenService, private fb: FormBuilder) {
	}

	fecEntradaChanged(event: IMyDateModel) {
          //console.log("model_fecha_entrada=",this.model_fecha_entrada.date);
          console.log("event.date.year=",event.date.year);
          console.log("event.date.month=",event.date.month-1);
          console.log("event.date.day=",event.date.day);
          let fecha: Date = new Date(event.date.year, event.date.month-1, event.date.day);
          console.log("fecEntrada=",fecha);
			//
	}
	fecVencimientoChanged(event: IMyDateModel) {
          //console.log("model_fecha_entrada=",this.model_fecha_entrada.date);
          console.log("event.date.year=",event.date.year);
          console.log("event.date.month=",event.date.month-1);
          console.log("event.date.day=",event.date.day);
          let fecha: Date = new Date(event.date.year, event.date.month-1, event.date.day);
          console.log("fecVencimiento=",fecha);
			//
	}

	listaDeDistribuidores: Distribuidor[];
	listaDeInsumos: Insumo[];
	listaDeUnidades: Unidad[];
	ngOnInit (){
		
		// Inicializar Distribuidores
		this.servicio.getDistribuidores()
			.subscribe(
				rs => this.listaDeDistribuidores = rs,
				er => console.log(er),
				() => console.log("this.listaDeDistribuidores=",this.listaDeDistribuidores)
			)
		// 	Inicializar Insumos
		this.servicio.getInsumos()
			.subscribe(
				rs => this.listaDeInsumos = rs,
				er => console.log(er),
				() => console.log("this.listaDeInsumos=",this.listaDeInsumos)
			)
		// Inicializar Unidades
		this.servicio.getUnidades()
			.subscribe(
				rs => this.listaDeUnidades = rs,
				er => console.log(er),
				() => console.log("this.listaDeUnidades=",this.listaDeUnidades)
			)
		
		// Mostrar lista de venEntradas
		this.servicio.getIngresoInsumosAlmacen()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)

	}
	
	btn_registrarIngresoAlmacen(){
		
		console.log("this.id_distribuidor=",this.distribuidor.id_distribuidor);
		console.log("this.id_insumo=",this.insumo.id_insumo);
		console.log("this.cantidad_comprada=",this.cantidad_comprada);
		console.log("this.cantidad_disponible=",this.cantidad_comprada);
		console.log("this.id_unidad=",this.unidad.id_unidad);
		console.log("this.precio_compra=",this.precio_compra);
		let fEntrada: Date = new Date(this.model_fecha_entrada.date.year, 
									this.model_fecha_entrada.date.month-1,
									this.model_fecha_entrada.date.day);
		console.log("fEntrada=",fEntrada);
		let fVencimiento: Date = new Date(this.model_fecha_vencimiento.date.year, 
									this.model_fecha_vencimiento.date.month-1,
									this.model_fecha_vencimiento.date.day);
		console.log("fVencimiento=",fVencimiento);
		// Registrar Ingreso Insumo Almacen
		/*
		this.servicio.addIngresoInsumoAlmacen(this.form.value)
		.subscribe(
			rt => console.log(rt),
			er => console.log(er),
			() => {console.log('El insumo se registró'),
					window.location.reload();	
				}
		);
		*/
	}

	verificarCantidadLetras(){
		return this.distribuidor.id_distribuidor != 0 && this.insumo.id_insumo != 0 &&
				this.cantidad_comprada != 0 && this.unidad.id_unidad != 0 && 
				this.precio_compra != 0 && this.model_fecha_entrada !=null && 
				this.model_fecha_vencimiento !=null; 
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ningun Ingreso Insumo Almacen registrado'	
		},
		columns: {
			id_ingreso_insumo: {
			  title: 'id_ingreso',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			id_distribuidor: {
			  title: 'id_distribuidor',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			id_insumo: {
			  title: 'id_insumo',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			cantidad_comprada: {
			  title: 'cant_compr',
			  width:"7.5%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			cantidad_disponible: {
			  title: 'cant_dispo',
			  width:"7.5%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			id_unidad: {
			  title: 'id_unidad',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			precio_compra: {
			  title: 'p_compra',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			fecha_entrada: {
			  title: 'fecha_entrada',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text',
			  valuePrepareFunction: (cell, row) => { 
			  	return this.getFecha(cell);
			  }
			},
			fecha_vencimiento: {
			  title: 'fecha_vencimiento',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text',
			  valuePrepareFunction: (cell, row) => { 
			  	return this.getFecha(cell);
			  }
			},
			acciones: {
				title: 'acciones',
				width:"15%",
				filter: false,
				sort: false,
				type: 'custom',
				renderComponent: AccionesIaComponent,
				valuePrepareFunction: (cell, row) => row

			}
		}, 
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		pager: {
			perPage: 3,
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
		return dia + '-' + mes + '-' + anio;
		//return dia + '-' + mes + '-' + anio + ' ' + hora + ':' + minutos + ':' + segundos;
	}
	darFormato(n: number){
		return (n<10)?'0'+n: n;
	}


}
