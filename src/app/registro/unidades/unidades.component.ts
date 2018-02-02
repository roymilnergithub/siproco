import { Component, OnInit } from '@angular/core';

import { UnidadService } from './unidad.service';
import { Unidad } from './_dto/unidad';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesUnidadesComponent } from './_acciones/acciones-unidades.component'

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  providers: [UnidadService]
})
export class UnidadesComponent implements OnInit {

	lista: Unidad[];
	form: FormGroup;
	nombreUnidad: string = '';
	abreviatura: string = '';

	constructor(private servicio: UnidadService, private fb: FormBuilder) {
		this.crearControles();
	}

	ngOnInit() {
		this.servicio.getUnidades()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)
	}

	crearControles() {
		this.form = this.fb.group({
			nombre: '',
			abreviatura: ''
		})
	}

	listaUnidades: Unidad[];
	listaAbreviaturas: Unidad[]=[];
	
	btn_registrarUnidad(){
		this.nombreUnidad = this.nombreUnidad.toUpperCase();
		this.abreviatura = this.abreviatura.toUpperCase();

		// Verificacion de Unidad
		this.servicio.buscarUnidadRepetida(this.nombreUnidad)
			.subscribe(
				rs => this.listaUnidades = rs,
				er => console.log(er),
				() => {
					console.log("this.listaUnidades=",this.listaUnidades);
					if(this.listaUnidades.length==0) {
						// Verificacion de Abreviatura cuando la unidad no existe
						this.servicio.buscarAbreviaturaRepetida(this.abreviatura)
						.subscribe(
							rs => this.listaAbreviaturas = rs,
							er => console.log(er),
							() => {
								console.log("this.listaAbreviaturas=",this.listaAbreviaturas);
								if(this.listaAbreviaturas.length==0) {
									console.log("--- La unidad NO existe y abreviatura NO existe! :) ---");
									
									// Registrar Unidad
									this.servicio.addUnidad(this.form.value)
									.subscribe(
										rt => console.log(rt),
										er => console.log(er),
										() => {console.log('La unidad se registró'),
												window.location.reload();	
											}
									);

								}else{
									console.log("La unidad NO existe pero abreviatura ya existe! :(");
								} 
							}
						)
					}else{
						// Verificacion de Abreviatura cuando la unidad ya existe
						this.servicio.buscarAbreviaturaRepetida(this.abreviatura)
						.subscribe(
							rs => this.listaAbreviaturas = rs,
							er => console.log(er),
							() => {
								console.log("this.listaAbreviaturas=",this.listaAbreviaturas);
								if(this.listaAbreviaturas.length==0) {
									console.log("La unidad ya existe pero la abreviatura NO")	
								}else{
									console.log("La unidad y la abreviatura ya existen! :(");
								} 
							}
						)
					}

				}
			)
	}

	verificarCantidadLetras(){
		return this.nombreUnidad!=''&&this.abreviatura!=''&&this.abreviatura.length==2&&this.nombreUnidad.length <=64;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ninguna unidad registrada'	
		},
		columns: {
			id_unidad: {
			  title: 'id_unidad',
			  width:"25%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			nombre: {
			  title: 'nombre',
			  width:"45%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			abreviatura: {
			  title: 'abreviatura',
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
				renderComponent: AccionesUnidadesComponent,
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
