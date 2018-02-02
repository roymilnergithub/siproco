export class RegistroVenta {
	constructor (
		public id_registro_venta: number, 
		public id_producto_disponible: number, 
		public cantidad_vendida: number, 
		public fecha_salida: Date
	){}
}