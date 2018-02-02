export class ProductoDisponible {
	constructor (
		public id_producto_disponible: number, 
		public id_local: number, 
		public id_producto: number, 
		public cantidad_producida: number, 
		public cantidad_disponible: number, 
		public p_produccion: number, 
		public p_venta: number, 
		public fecha_entrada: Date,
		public fecha_vencimiento: Date
	){}
}