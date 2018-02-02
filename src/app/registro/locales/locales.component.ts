import { Component, OnInit } from '@angular/core';

import { LocalService } from './local.service';
import { Local } from './_dto/local';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesLocalesComponent } from './_acciones/acciones-locales.component'

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  providers: [LocalService]
})

export class LocalesComponent implements OnInit {

	lista: Local[];
	form: FormGroup;
	nombreLocal: string = '';
	direccion: string = '';

	constructor(private servicio: LocalService, private fb: FormBuilder) { 
		this.crearControles();
	}

	ngOnInit() {
		this.servicio.getLocales()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)
	}

	crearControles() {
		this.form = this.fb.group({
			nombre: '',
			direccion: ''
		})
	}


	listaLocales: Local[];
	listaDirecciones: Local[]=[];
	
	btn_registrarLocal(){
		this.nombreLocal = this.nombreLocal.toUpperCase();
		this.direccion = this.direccion.toUpperCase();

		// Verificacion de Local
		this.servicio.buscarLocalRepetido(this.nombreLocal)
			.subscribe(
				rs => this.listaLocales = rs,
				er => console.log(er),
				() => {
					console.log("this.listaLocales=",this.listaLocales);
					if(this.listaLocales.length==0) {
						// Verificacion de Direccion cuando el Local no existe
						this.servicio.buscarDirLocalRepetida(this.direccion)
						.subscribe(
							rs => this.listaDirecciones = rs,
							er => console.log(er),
							() => {
								console.log("this.listaDirecciones=",this.listaDirecciones);
								if(this.listaDirecciones.length==0) {
									console.log("--- El local NO existe y direccion NO existe! :) ---");
									
									// Registrar Local
									this.servicio.addLocal(this.form.value)
									.subscribe(
										rt => console.log(rt),
										er => console.log(er),
										() => {console.log('El local se registró'),
											window.location.reload();	
										}
									);
								}else{
									console.log("El local NO existe pero direccion ya existe! :(");
								} 
							}
						)
					}else{
						// Verificacion de Direccion cuando el Local ya existe
						this.servicio.buscarDirLocalRepetida(this.direccion)
						.subscribe(
							rs => this.listaDirecciones = rs,
							er => console.log(er),
							() => {
								console.log("this.listaDirecciones=",this.listaDirecciones);
								if(this.listaDirecciones.length==0) {
									console.log("El local ya existe pero la direccion NO")	
								}else{
									console.log("El local y la direccion ya existen! :(");
								} 
							}
						)
					}

				}
			)
	}

	verificarCantidadLetras(){
		return this.nombreLocal!=''&&this.direccion!=''&&this.direccion.length<=128&&this.nombreLocal.length <=64;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ningun local registrado'	
		},
		columns: {
			id_local: {
			  title: 'id_local',
			  width:"25%",
			  filter: false,
			  sort: false,
			  type: 'text'
			}, 
			nombre: {
			  title: 'nombre',
			  width:"30%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			direccion: {
			  title: 'direccion',
			  width:"35%",
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
				renderComponent: AccionesLocalesComponent,
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

