import { Component, OnInit } from '@angular/core';
import { DistribuidorService } from './distribuidor.service';
import { Distribuidor } from './_dto/distribuidor';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesDistribuidoresComponent } from './_acciones/acciones-distribuidores.component';

@Component({
  selector: 'app-distribuidores',
  templateUrl: './distribuidores.component.html',
  styleUrls: [],
  providers: [DistribuidorService]
})

export class DistribuidoresComponent implements OnInit {

	lista: Distribuidor[];
	form: FormGroup;
	nombreDistribuidor: string = '';
	direccion: string = '';
	

	constructor(private servicio: DistribuidorService, private fb: FormBuilder ) { 
		this.crearControles();
	}

	ngOnInit() {
		this.servicio.getDistribuidores()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => {
					console.log("this.lista=",this.lista);
				}
			)
	}

	crearControles() {
		this.form = this.fb.group({
			nombre: '',
			direccion: ''
		})
	}


	listaDistribuidores: Distribuidor[];
	listaDirecciones: Distribuidor[]=[];
	
	btn_registrarDistribuidor(){
		this.nombreDistribuidor = this.nombreDistribuidor.toUpperCase();
		this.direccion = this.direccion.toUpperCase();

		// Verificacion de Distribuidor
		this.servicio.buscarDistribuidorRepetido(this.nombreDistribuidor)
			.subscribe(
				rs => this.listaDistribuidores = rs,
				er => console.log(er),
				() => {
					console.log("this.listaDistribuidores=",this.listaDistribuidores);
					if(this.listaDistribuidores.length==0) {
						// Verificacion de Direccion cuando el Distribuidor no existe
						this.servicio.buscarDirDistribuidorRepetida(this.direccion)
						.subscribe(
							rs => this.listaDirecciones = rs,
							er => console.log(er),
							() => {
								console.log("this.listaDirecciones=",this.listaDirecciones);
								if(this.listaDirecciones.length==0) {
									console.log("--- El distribuidor NO existe y direccion NO existe! :) ---");
									
									// Registrar Distribuidor
									this.servicio.addDistribuidor(this.form.value)
									.subscribe(
										rt => console.log(rt),
										er => console.log(er),
										() => {console.log('El distribuidor se registró'),
											window.location.reload();	
										}
									);
								}else{
									console.log("El distribuidor NO existe pero direccion ya existe! :(");
								} 
							}
						)
					}else{
						// Verificacion de Direccion cuando el Distribuidor ya existe
						this.servicio.buscarDirDistribuidorRepetida(this.direccion)
						.subscribe(
							rs => this.listaDirecciones = rs,
							er => console.log(er),
							() => {
								console.log("this.listaDirecciones=",this.listaDirecciones);
								if(this.listaDirecciones.length==0) {
									console.log("El distribuidor ya existe pero la direccion NO")	
								}else{
									console.log("El distribuidor y la direccion ya existen! :(");
								} 
							}
						)
					}

				}
			)
	}

	verificarCantidadLetras(){
		return this.nombreDistribuidor!=''&&this.direccion!=''&&this.direccion.length<=64&&this.nombreDistribuidor.length <=64;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	// MODAL
	

	settings = {
		filter: {
			noDataMessage: 'No hay ningun local registrado'	
		},
		columns: {
			id_distribuidor: {
			  title: 'id_distribuidor',
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
				renderComponent: AccionesDistribuidoresComponent,
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

