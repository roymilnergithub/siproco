import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarranavegacionComponent } from './barranavegacion/barranavegacion.component';
import { routes } from './app.routes';

import { MarcaService } from './registro/marcas/marca.service';
import { UnidadService } from './registro/unidades/unidad.service';
import { DistribuidorService } from './registro/distribuidores/distribuidor.service';
import { InsumoService } from './produccion/insumos/insumo.service';
import { IngresoAlmacenService } from './produccion/ingresoAlmacen/ingreso-almacen.service';
import { LocalService } from './registro/locales/local.service';
import { ProductoService } from './ventas/productos/producto.service';
import { ProductoDisponibleService } from './ventas/productosDisponibles/producto-disponible.service';
import { RegistroVentaService } from './ventas/registroVentas/registro-venta.service';

//Services to transport data beetwen components
import { DataService } from './registro/distribuidores/data.service';
import { LocalDataService } from './registro/locales/local_data.service';
import { MarcaDataService } from './registro/marcas/marca_data.service';
import { UnidadDataService } from './registro/unidades/unidad_data.service';
import { InsumoDataService } from './produccion/insumos/insumo_data.service';
import { IngresoAlmacenDataService } from './produccion/ingresoAlmacen/ingreso-almacen_data.service';
import { ProductoDataService } from './ventas/productos/producto_data.service';
import { ProductoDisponibleDataService } from './ventas/productosDisponibles/producto-disponible_data.service';

import { MarcasComponent } from './registro/marcas/marcas.component';
import { UnidadesComponent } from './registro/unidades/unidades.component';
import { LocalesComponent } from './registro/locales/locales.component';
import { InsumosComponent } from './produccion/insumos/insumos.component';
import { DistribuidoresComponent } from './registro/distribuidores/distribuidores.component';
import { ProductosDisponiblesComponent } from './ventas/productosDisponibles/productos-disponibles.component';
import { RegistroVentasComponent } from './ventas/registroVentas/registro-ventas.component';
import { ProductosComponent } from './ventas/productos/productos.component';
import { IngresosAlmacenComponent } from './produccion/ingresoAlmacen/ingresos-almacen.component';
import { SalidasAlmacenComponent } from './produccion/salidaAlmacen/salidas-almacen.component';

import { AccionesMarcasComponent } from './registro/marcas/_acciones/acciones-marcas.component';
import { AccionesLocalesComponent } from './registro/locales/_acciones/acciones-locales.component';
import { AccionesUnidadesComponent } from './registro/unidades/_acciones/acciones-unidades.component';
import { AccionesDistribuidoresComponent } from './registro/distribuidores/_acciones/acciones-distribuidores.component';
import { AccionesInsumosComponent } from './produccion/insumos/_acciones/acciones-insumos.component';
import { AccionesProductosComponent } from './ventas/productos/_acciones/acciones-productos.component';
import { AccionesPdComponent } from './ventas/productosDisponibles/_acciones/acciones-pd.component';
import { AccionesIaComponent } from './produccion/ingresoAlmacen/_acciones/acciones-ia.component';

import { ReactiveFormsModule } from '@angular/forms'; //importante agregar esto!
import { HttpModule  } from '@angular/http'; //importante agregar esto!
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//Modal
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
//Acciones
import { EliminarDComponent } from './registro/distribuidores/_modales/eliminar/eliminar-d.component';
import { EliminarLComponent } from './registro/locales/_modales/eliminar/eliminar-l.component';
import { EliminarMComponent } from './registro/marcas/_modales/eliminar/eliminar-m.component';
import { EliminarUComponent } from './registro/unidades/_modales/eliminar/eliminar-u.component';
import { EliminarPComponent } from './ventas/productos/_modales/eliminar/eliminar-p.component';
import { EliminarPdComponent } from './ventas/productosDisponibles/_modales/eliminar/eliminar-pd.component';
import { EliminarIComponent } from './produccion/insumos/_modales/eliminar/eliminar-i.component';
import { EliminarIaComponent } from './produccion/ingresoAlmacen/_modales/eliminar/eliminar-ia.component';

@NgModule({
  declarations: [
    AppComponent,
    BarranavegacionComponent,
    // Componentes_Produccion
    MarcasComponent,
    UnidadesComponent,
    DistribuidoresComponent,
    InsumosComponent,
    IngresosAlmacenComponent,
    // Componentes_Ventas
    LocalesComponent,
    ProductosComponent,
    ProductosDisponiblesComponent,
    RegistroVentasComponent,
    // Acciones_Produccion
    AccionesMarcasComponent,
    AccionesUnidadesComponent,
    AccionesDistribuidoresComponent,
    AccionesInsumosComponent,
    AccionesIaComponent,
    // Acciones_Ventas
    AccionesLocalesComponent,
    AccionesProductosComponent,
    AccionesPdComponent,
    // Modales
    EliminarDComponent,
    EliminarLComponent,
    EliminarMComponent,
    EliminarUComponent,
    EliminarPComponent,
    EliminarPdComponent,
    EliminarIComponent,
    EliminarIaComponent,
    SalidasAlmacenComponent,
    //ActualizarDComponent,
  ],
  imports: [
    routes,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    Ng2SmartTableModule,
    //modal
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    MarcaService,
    UnidadService,
    LocalService,
    DistribuidorService,
    InsumoService,
    ProductoDisponibleService,
    RegistroVentaService,
    ProductoService, 
    IngresoAlmacenService,
    //
    DataService,
    LocalDataService,
    MarcaDataService,
    UnidadDataService,
    ProductoDataService,
    ProductoDisponibleDataService,
    InsumoDataService,
    IngresoAlmacenDataService,
  ],
  entryComponents: [
    // Acciones_Produccion
    AccionesMarcasComponent,
    AccionesUnidadesComponent,
    AccionesDistribuidoresComponent,
    AccionesInsumosComponent,
    AccionesIaComponent,
    // Acciones_Ventas
    AccionesLocalesComponent,
    AccionesProductosComponent,
    AccionesPdComponent,
    // Modales
    EliminarDComponent,
    EliminarLComponent,
    EliminarMComponent,
    EliminarUComponent,
    EliminarPComponent,
    EliminarPdComponent,
    EliminarIComponent,
    EliminarIaComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
