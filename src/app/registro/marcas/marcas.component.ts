import { Component, OnInit } from '@angular/core';

import { MarcaService } from './marca.service';
import { Marca } from './_dto/marca';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesMarcasComponent } from './_acciones/acciones-marcas.component'

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  providers: [MarcaService]
})
export class MarcasComponent implements OnInit {

	lista: Marca[];
	form: FormGroup;
	nombreMarca: string = '';
	abreviatura: string = '';

	constructor(private servicio: MarcaService, private fb: FormBuilder) { 
		this.crearControles();
	}

	ngOnInit() {
		this.servicio.getMarcas()
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


	listaMarcas: Marca[];
	listaAbreviaturas: Marca[]=[];
	
	btn_registrarMarca(){
		this.nombreMarca = this.nombreMarca.toUpperCase();
		this.abreviatura = this.abreviatura.toUpperCase();

		// Verificacion de Marca
		this.servicio.buscarMarcaRepetida(this.nombreMarca)
			.subscribe(
				rs => this.listaMarcas = rs,
				er => console.log(er),
				() => {
					console.log("this.listaMarcas=",this.listaMarcas);
					if(this.listaMarcas.length==0) {
						// Verificacion de Abreviatura cuando la marca no existe
						this.servicio.buscarAbreviaturaRepetida(this.abreviatura)
						.subscribe(
							rs => this.listaAbreviaturas = rs,
							er => console.log(er),
							() => {
								console.log("this.listaAbreviaturas=",this.listaAbreviaturas);
								if(this.listaAbreviaturas.length==0) {
									console.log("--- La marca NO existe y abreviatura NO existe! :) ---");
									
									console.log("--> this.form.value=",this.form.value);
									// Registrar Marca
									
									this.servicio.addMarca(this.form.value)
									.subscribe(
										rt => console.log(rt),
										er => console.log(er),
										() => {console.log('La marca se registró'),
											window.location.reload();	
										}
									);
									
								}else{
									console.log("La marca NO existe pero abreviatura ya existe! :(");
								} 
							}
						)
					}else{
						// Verificacion de Abreviatura cuando la marca ya existe
						this.servicio.buscarAbreviaturaRepetida(this.abreviatura)
						.subscribe(
							rs => this.listaAbreviaturas = rs,
							er => console.log(er),
							() => {
								console.log("this.listaAbreviaturas=",this.listaAbreviaturas);
								if(this.listaAbreviaturas.length==0) {
									console.log("La marca ya existe pero la abreviatura NO")	
								}else{
									console.log("La marca y la abreviatura ya existen! :(");
								} 
							}
						)
					}

				}
			)
	}

	verificarCantidadLetras(){
		return this.nombreMarca!=''&&this.abreviatura!=''&&this.abreviatura.length==3&&this.nombreMarca.length <=64;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ninguna marca registrada'	
		},
		columns: {
			id_marca: {
			  title: 'id_marca',
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
				renderComponent: AccionesMarcasComponent,
				valuePrepareFunction: (cell, row) => row

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

}
