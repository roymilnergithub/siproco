import { Component, OnInit } from '@angular/core';

import { ProductoDisponibleService } from './producto-disponible.service';
import { ProductoDisponible } from './_dto/productoDisponible';
import { Local } from './_dto/local';
import { Producto } from './_dto/producto';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesPdComponent } from './_acciones/acciones-pd.component';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-producto-disponible',
  templateUrl: './productos-disponibles.component.html',
  providers: [ProductoDisponibleService]
})

export class ProductosDisponiblesComponent implements OnInit {

	lista: ProductoDisponible[];
	form: FormGroup;
	
	// ngModel
	local: Local = new Local(0, 'SinLocal', 'SD');
	producto: Producto = new Producto(0, 'SinProducto');
	cantidad_producida: number = 0;
	p_produccion: number = 0;
	p_venta: number = 0;
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

	constructor(private servicio: ProductoDisponibleService, private fb: FormBuilder) {
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

	listaDeLocales: Local[];
	listaDeProductos: Producto[];
	ngOnInit() {
		
		// Inicializar locales
		this.servicio.getLocales()
			.subscribe(
				rs => this.listaDeLocales = rs,
				er => console.log(er),
				() => console.log("this.listaDeLocales=",this.listaDeLocales)
			)
		// 	Inicializar productos
		this.servicio.getProductos()
			.subscribe(
				rs => this.listaDeProductos = rs,
				er => console.log(er),
				() => console.log("this.listaDeProductos=",this.listaDeProductos)
			)
		// Mostrar lista de venEntradas
		this.servicio.getProductosDisponibles()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)

	}

	listaVenEntradas: ProductoDisponible[];
	
	btn_registrarProductoDisponible(){
		
		console.log("this.local=",this.local.id_local);
		console.log("this.producto=",this.producto.id_producto);
		console.log("this.cantidad_producida=",this.cantidad_producida);
		console.log("this.cantidad_disponible=",this.cantidad_producida);
		console.log("this.p_produccion=",this.p_produccion);
		console.log("this.p_venta=",this.p_venta);
		let fEntrada: Date = new Date(this.model_fecha_entrada.date.year, 
									this.model_fecha_entrada.date.month-1,
									this.model_fecha_entrada.date.day);
		console.log("fEntrada=",fEntrada);
		let fVencimiento: Date = new Date(this.model_fecha_vencimiento.date.year, 
									this.model_fecha_vencimiento.date.month-1,
									this.model_fecha_vencimiento.date.day);
		console.log("fVencimiento=",fVencimiento);
		// Registrar Insumo
		/*
		this.servicio.addInsumo(this.form.value)
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
		return this.local.id_local != 0 && this.producto.id_producto != 0 &&
				this.cantidad_producida != 0 && this.p_produccion != 0 && 
				this.p_venta != 0 && this.model_fecha_entrada !=null && 
				this.model_fecha_vencimiento !=null; 
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ninguna venEntrada registrada'	
		},
		columns: {
			id_producto_disponible: {
			  title: 'id_prod_dispo',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			id_local: {
			  title: 'id_local',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			id_producto: {
			  title: 'id_producto',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			cantidad_producida: {
			  title: 'cant_prod',
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
			p_produccion: {
			  title: 'p_produccion',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			p_venta: {
			  title: 'p_venta',
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
				renderComponent: AccionesPdComponent,
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
