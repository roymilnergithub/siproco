import { Component, OnInit } from '@angular/core';

import { InsumoService } from './insumo.service';
import { Insumo } from './_dto/insumo';
import { Marca } from './_dto/marca';
import { RegistroRepetido } from './_dto/RegistroRepetido';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AccionesInsumosComponent } from './_acciones/acciones-insumos.component';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  providers: [InsumoService]
})

export class InsumosComponent implements OnInit {

	lista: Insumo[];
	form: FormGroup;
	// ngModel
	nombreInsumo: string = '';
	marcaSeleccionada: Marca = new Marca(0, 'SinMarca', 'SM');

	constructor(private servicio: InsumoService, private fb: FormBuilder) {
		this.crearControles();
	}

	listaDeMarcas: Marca[];
	ngOnInit() {
		
		// Inicializar marcas
		this.servicio.getMarcas()
			.subscribe(
				rs => this.listaDeMarcas = rs,
				er => console.log(er),
				() => console.log("this.listaDeMarcas=",this.listaDeMarcas)
			)
		// Mostrar lista de insumos
		this.servicio.getInsumos()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log("this.lista=",this.lista)
			)

	}

	crearControles() {
		this.form = this.fb.group({
			nombre: '',
			marca: ''
		})
	}


	listaInsumos: Insumo[];
	listaMarcas: Insumo[]=[];
	
	btn_registrarInsumo(){
		this.nombreInsumo = this.nombreInsumo.toUpperCase();

		// Verificacion de Insumo
		this.servicio.buscarRegistroRepetido(this.form.value.nombre, this.form.value.marca.id_marca)
			.subscribe(
				rs => this.listaInsumos = rs,
				er => console.log(er),
				() => {
					console.log("this.listaInsumos=",this.listaInsumos);
					if(this.listaInsumos.length==0) {
						// Registrar Insumo
						let insert: RegistroRepetido = new RegistroRepetido(this.form.value.nombre, this.form.value.marca.id_marca);
						console.log("insert=",insert);
						
						this.servicio.addInsumo(insert)
						.subscribe(
							rt => console.log(rt),
							er => console.log(er),
							() => {console.log('El insumo se registró');
									window.location.reload();	
								}
						);
					}else{
						console.log("Ya existe el insumo con la marca seleccionada");
					}

				}
			)
	}

	verificarCantidadLetras(){
		// TODO: Aqui falta validar fecha_vencimiento
		return this.nombreInsumo != '' && this.nombreInsumo.length <= 64 &&
				this.marcaSeleccionada.id_marca != 0;
	}

	omitir_caracteres_especiales(event){
		var k;
		k = event.charCode;
		return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}

	settings = {
		filter: {
			noDataMessage: 'No hay ningun insumo registrado'	
		},
		columns: {
			id_insumo: {
			  title: 'id_insumo',
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
			id_marca: {
			  title: 'id_marca',
			  width:"25%",
			  filter: false,
			  sort: false,
			  type: 'text'
			},
			acciones: {
				title: 'acciones',
				width:"20%",
				filter: false,
				sort: false,
				type: 'custom',
				renderComponent: AccionesInsumosComponent,
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
