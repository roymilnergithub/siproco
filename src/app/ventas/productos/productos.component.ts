import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './_dto/producto';
import { NombreProducto } from './_dto/nombreProducto';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesProductosComponent } from './_acciones/acciones-productos.component';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers: [ProductoService]
})

export class ProductosComponent implements OnInit {

	lista: Producto[];
	form: FormGroup;
	// ngModel
	nombre_producto: string = '';

	constructor(private servicio: ProductoService, private fb: FormBuilder) {
	}

	ngOnInit() {
		// Mostrar lista de productos
		this.servicio.getProductos()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)
	}

	listaProductos: Producto[];
	
	btn_registrarProducto(){
		this.nombre_producto = this.nombre_producto.toUpperCase();

		// Verificacion de Producto
		this.servicio.buscarNombreProductoRepetido(this.nombre_producto)
			.subscribe(
				rs => this.listaProductos = rs,
				er => console.log(er),
				() => {
					console.log("this.listaProductos=",this.listaProductos);
					if(this.listaProductos.length==0) {
						// Registrar Producto
						let nombreProducto: NombreProducto = new NombreProducto(this.nombre_producto);
						console.log("let nombreProducto=",nombreProducto);
						this.servicio.addProducto(nombreProducto)
						.subscribe(
							rt => console.log(rt),
							er => console.log(er),
							() => {
									console.log('El producto se registró');
									window.location.reload();	
								  }
						);
					}else{
						console.log("El producto ya existe :(")	
					}

				}
			)
	}

	verificarCantidadLetras(){
		return this.nombre_producto != '' && this.nombre_producto.length <= 64;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ningun producto registrado'	
		},
		columns: {
			id_producto: {
			  title: 'id_producto',
			  width:"10%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			nombre: {
			  title: 'nombre',
			  width:"20%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			acciones: {
				title: 'acciones',
				width:"10%",
				filter: false,
				sort: false,
				type: 'custom',
				renderComponent: AccionesProductosComponent,
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

}
