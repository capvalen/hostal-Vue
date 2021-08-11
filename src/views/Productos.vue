<template>
	<div>
		<div class=" border-bottom py-2 px-4 divContenido d-flex align-items-end justify-content-between">
			<h5 class="mb-1"><i class="bi bi-bookmark"></i> Productos</h5>
			<button class="btn btn-outline-secondary"  data-bs-toggle="modal" data-bs-target="#divNuevoProducto" @click="productoSeleccionado=0" ><i class="bi bi-box"></i> Crear nuevo</button>
		
		</div>
		<div class="p-3 border-bottom divContenido" v-for="producto in productosTodos" :key="producto.id" @click="mostrarDetalles(producto.id)">
			<div class="d-flex w-100 justify-content-between">
				<div class=" ms-4">
					<p class="mb-0 ">{{producto.nombre}} <span v-if="producto.idTipo=='2'">#{{producto.numero}}</span></p>
					<small><i class="bi bi-arrow-right-short"></i> Tipo: <strong v-if="producto.idTipo=='1'">Producto</strong> <strong v-else>Habitación</strong></small>
					<small v-if="producto.idTipo=='1'"><i class="bi bi-arrow-right-short"></i> Stock: <strong>{{producto.stock}}</strong></small>
				</div>
				<small><strong>S/ {{parseFloat(producto.precio).toFixed(2)}}</strong></small>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="divNuevoProducto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Nuevo producto</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
		        <label for="">Tipo</label>
						<select class="form-select" name="sltTipo" id="sltTipo" v-model="tipo">
							<option value="1">Producto</option>
							<option value="2">Habitación</option>
						</select>
						<label for="">Nombre</label>
						<input type="text" class="form-control" v-model="nombre">
						<label for="">Descripción</label>
						<input type="text" class="form-control" v-model="descripcion" >
						<div v-if="tipo=='2'">
							<label for="">N° Habitación y/o Piso</label>
							<input type="text" class="form-control" v-model="numero">
							<label for="">N° Camas</label>
							<input type="text" class="form-control" v-model="camas">
						</div>
						<label for="">Precio</label>
						<input type="number" class="form-control" min=0 step=1 v-model="precio">
						<div v-if="tipo=='1'">
							<label for="">Stock</label>
							<input type="number" class="form-control" min=0 step=1 v-model="stock">
						</div>
						<div class="d-flex justify-content-between">
		        <button type="button" class="btn btn-danger mt-3" data-bs-dismiss="modal" @click="eliminarProducto()" v-if="productoSeleccionado>0"><i class="bi bi-hdd"></i> Eliminar</button>
		        <button type="button" class="btn btn-primary mt-3" data-bs-dismiss="modal" @click="guardarProducto()" v-if="productoSeleccionado==0"><i class="bi bi-hdd"></i> Guardar</button>
		        <button type="button" class="btn btn-success mt-3" data-bs-dismiss="modal" @click="actualizarProducto()" v-else><i class="bi bi-hdd"></i> Actualizar</button>

						</div>
		      </div>
		      
		    </div>
		  </div>
		</div>

		<Tostada />
		

	</div>
</template>
<script>
import Tostada from '@/components/Tostadas.vue';

var myToast;
export default {
	name: 'About',
	components:{Tostada},
	data(){
		return {
			nombreApi:'http://localhost/hostal/apiHostal',
			tipo:1,
			nombre:'', descripcion:'', precio:0, stock:0, numero:'', camas:1, activo:0,
			productosTodos:[{id:0, nombre: 'carlos'}],
			productoSeleccionado:0
		}
	},
	methods: {
		cargarDatos(){
			this.productosTodos=[];
			axios.get(this.nombreApi+'/listarTodosProductos.php')
			.then((response)=>{
				//console.log( response.data );
				this.productosTodos= response.data;
			})
		},
		guardarProducto(){
			
			axios.post(this.nombreApi+'/insertarProducto.php', {nombre: this.nombre, tipo: this.tipo, descripcion: this.descripcion, precio: this.precio, stock: this.stock, numero: this.numero, camas: this.camas })
			.then((response)=>{ if( response.data ){ this.limpiarCambios();
			
				let myToastEl = document.getElementById('tostadaBien')
				let tostadaBien = new bootstrap.Toast(myToastEl)
				tostadaBien.show();
				this.cargarDatos();
			} })
			.catch((error)=>{ console.log( error );
				let myToastElla = document.getElementById('tostadaMal')
				let tostadaMal = new bootstrap.Toast(myToastElla)
				tostadaMal.show();
			});
		},
		limpiarCambios(){
			this.tipo=1;
			this.nombre='';
			this.descripcion='';
			this.precio=0;
			this.stock=0;
			this.numero='';
			this.camas=1;
			this.activo=0;
		},
		mostrarDetalles(id){
			//console.log( this.productosTodos );
			this.productoSeleccionado= id;

			let index = this.productosTodos.map(arra => arra.id).indexOf( this.productoSeleccionado );
			
			this.tipo= this.productosTodos[index].idTipo;
			this.nombre= this.productosTodos[index].nombre;
			this.descripcion= this.productosTodos[index].descripcion;
			this.precio= this.productosTodos[index].precio;
			this.stock= this.productosTodos[index].stock;
			this.numero= this.productosTodos[index].numero;
			this.camas= this.productosTodos[index].camas;
			this.activo= this.productosTodos[index].activo;


			var myModal1 = new bootstrap.Modal(document.getElementById('divNuevoProducto'));
			myModal1.show()
		},
		eliminarProducto(){
			this.activo=0;
			this.actualizarProducto();
		},
		actualizarProducto(){
			axios.post(this.nombreApi+'/actualizarProducto.php', {id: this.productoSeleccionado,
				tipo: this.tipo, nombre: this.nombre, descripcion: this.descripcion, precio: this.precio, stock: this.stock, numero: this.numero, camas: this.camas, activo: this.activo, })
			.then(response =>{ //console.log( response.data );
				if(response.data=='ok'){
					this.cargarDatos();
				}
			})
			.catch((error)=>{ console.log( error );});
		}
	},
	mounted(){
		var myModal = document.getElementById('divNuevoProducto');
		this.cargarDatos();
		

	}
}
</script>