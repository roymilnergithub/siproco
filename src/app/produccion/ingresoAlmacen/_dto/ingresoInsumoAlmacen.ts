export class IngresoInsumoAlmacen {
	constructor (
		public id_ingreso_insumo: number, 
		public id_distribuidor: number, 
		public id_insumo: number, 
		public cantidad_comprada: number, 
		public cantidad_disponible: number, 
		public id_unidad: number, 
		public precio_compra: number, 
		public fecha_entrada: Date, 
		public fecha_vencimiento: Date, 
	)
	{ }
}