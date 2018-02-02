import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {MarcasComponent} from "./registro/marcas/marcas.component";
import {UnidadesComponent} from "./registro/unidades/unidades.component";
import {LocalesComponent} from "./registro/locales/locales.component";
import {DistribuidoresComponent} from "./registro/distribuidores/distribuidores.component";
import {InsumosComponent} from "./produccion/insumos/insumos.component";
import {IngresosAlmacenComponent} from "./produccion/ingresoAlmacen/ingresos-almacen.component";
import {SalidasAlmacenComponent} from "./produccion/salidaAlmacen/salidas-almacen.component";
import {ProductosComponent} from "./ventas/productos/productos.component";
import {ProductosDisponiblesComponent} from "./ventas/productosDisponibles/productos-disponibles.component";
import {RegistroVentasComponent} from "./ventas/registroVentas/registro-ventas.component";

const appRoutes: Routes = [
  { path: '', redirectTo:'/reg-marcas', pathMatch: 'full'},
  { path: 'reg-marcas', component: MarcasComponent},
  { path: 'reg-unidades', component: UnidadesComponent},
  { path: 'reg-distribuidores', component: DistribuidoresComponent},
  { path: 'prod-insumos', component: InsumosComponent},
  { path: 'ingreso-almacen', component: IngresosAlmacenComponent},
  { path: 'salida-almacen', component: SalidasAlmacenComponent},
  { path: 'reg-locales', component: LocalesComponent},
  { path: 'reg-nombre-productos', component: ProductosComponent},
  { path: 'reg-productos-disponibles', component: ProductosDisponiblesComponent},
  { path: 'registro-ventas', component: RegistroVentasComponent},
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);