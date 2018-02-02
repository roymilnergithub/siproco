export class SalidaAlmacen {
	constructor (
		public id_salida_insumo: number, 
		public id_producto: number, 
		public id_ingreso_insumo: number, 
		public cantidad_utilizada: number, 
		public fecha_salida: Date
	){}
}