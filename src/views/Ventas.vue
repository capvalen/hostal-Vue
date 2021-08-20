<template>
	<div>
		<div class="border-bottom py-2 px-4 divContenido d-flex align-items-end justify-content-between" >
			<h5 class="mb-1"><i class="bi bi-bookmark"></i> Generar Venta</h5>
			<button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#divNuevaVenta" >
				<i class="bi bi-bag-plus"></i> Nueva venta
			</button>
			<!-- <div class="d-flex w-100 justify-content-between">
				<div class=" ms-4">
					<p class="mb-0 ">De un shampoo</p>
					<small><i class="bi bi-arrow-right-short"></i> María Mateo</small>
				</div>
				<small><strong>S/ 25.00</strong></small>
			</div> -->
		</div>

		<!-- Modal -->
		<div class="modal fade" id="divNuevaVenta" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Nueva venta</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-6">
								<label for="">Agregue Producto o Servicio</label>
								<multiselect v-model="multiValor" :searchable="true" trackBy="tipo" label='tipo' :options="tipos" placeholder="Seleccione un tipo" @select="cambio()" />
							</div>
							
						</div>
						<div class="row my-3">
							<div class="col-3" v-if="cambiar=='cuartos'">
								<label for="">N° Personas</label>
								<input type="number" class="form-control text-center" min=0 v-model="selectPersonas">
							</div>
							<div class="col-3" v-if="cambiar=='productos'">
								<label for="">Cantidad</label>
								<input type="number" class="form-control text-center" min=0 v-model="selectCantidad">
							</div>
							<div class="col-8">
								<label for=""><span v-if="cambiar=='productos'">Producto</span> <span v-else>Servicio</span> <small><strong>(S/ {{precioActual}})</strong></small></label>
								<multiselect ref="multiselect" v-model="seleccionado" :searchable="true" trackBy="nombre" label='nombre' :options="presentar" placeholder="Busque producto o servicio" />
							</div>
							<div class="col-1 d-flex align-items-end">
								<div><button class="btn btn-outline-secondary" @click="agregarCanasta()"><i class="bi bi-bag-plus"></i></button></div>
							</div>
						</div>
						<section>
							<p><strong>Canasta:</strong></p>
							<table class="table table-hover">
								<thead>
									<tr>
										<th>N°</th>
										<th>Cantidad</th>
										<th>Concepto</th>
										<th>Precio</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="cesta.length==0">
										<td class="" colspan=4><span >Cesta vacía</span></td>
									</tr>
									<tr v-else v-for="(item, index) in cesta" :key="item.id">
										<td><button class="btn btn-outline-danger btn-sm border-0" @click="borrarItem(index)"><i class="bi bi-eraser"></i></button> {{item.id}}</td>
										<td>{{item.cantidad}}</td>
										<td>{{item.concepto}} {{item.numero}}</td>
										<td>{{parseFloat(item.precio * item.cantidad).toFixed(2) }}</td>
										
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td colspan=3>Total</td>
										<td >{{totalSuma}}</td>
									</tr>
								</tfoot>
							</table>
						</section>
							
						
						<div class="float-end">
							<button @click="empezarVenta()" class="btn btn-outline-primary"><i class="bi bi-bag-check"></i> Completar venta</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Tostada from "@/components/Tostadas.vue";
import Multiselect from "@vueform/multiselect";
/* Extraído de: https://github.com/vueform/multiselect */

export default {
	name: "About",
	components: { Tostada, Multiselect },

	data() {
		return {
			todos:[], cambiar: null,
			multiValor:null, seleccionado:null, presentar:[], cesta:[],
			selectCantidad:1, selectPersonas:1, indiceActual:null,
			tipos: [{value: 1, tipo: "Productos"}, {value: 2, tipo: "Habitaciones"}],
			cuartos:[], productos:[]
		};
	},
	mounted() {
		
		axios.post(this.nombreApi+'/listarTodosProductos.php')
		.then((response)=>{ //console.log( response.data );
			this.todos = response.data;
			//this.$refs.multiselect.refreshOptions()
			response.data.forEach(caso => {
				if(caso.idTipo=='1'){
					this.productos.push({value: caso.id, nombre: caso.nombre  });
				}else{
					this.cuartos.push({value: caso.id, nombre: caso.nombre + " #" + caso.numero });
				}
			});
			//console.log( this.todos[0].precio );
		})
		.catch((error)=>{ console.log( error );});
	},
	methods: {
		empezarVenta(){
			console.log( this.seleccionado );
		},
		limpiar(){
			this.$refs.multiselect.clear()
			this.selectPersonas =1; this.selectCantidad=1;
		},
		cambio(){
			this.limpiar();
			if(this.multiValor==1){
				this.presentar = this.productos;
				this.cambiar='productos';
			}else{
				this.presentar = this.cuartos;
				this.cambiar='cuartos';
			}
		},
		agregarCanasta(){
			this.cesta.push({
				id: this.cesta.length+1,
				cantidad: this.selectCantidad,
				personas: this.selectPersonas,
				tipo: this.multiValor, //1 = productos, 2 = habitaciones
				concepto: this.todos[this.indiceActual].nombre,
				numero: this.todos[this.indiceActual].numero,
				precio: this.todos[this.indiceActual].precio,
			});
			this.limpiar();
		},
		borrarItem(inn){
			this.cesta.splice(inn,1)
		}
	},
	computed:{
		precioActual(){
			//console.log(this.todos)
			if(this.seleccionado!=null){
				let indice = this.todos.map(todo =>todo.id ).indexOf(this.seleccionado);
				this.indiceActual=indice;
				return parseFloat(this.todos[indice].precio * this.selectCantidad).toFixed(2);
			}
		},
		totalSuma(){
			var suma = 0;
			this.cesta.forEach(cest=>{ suma+=(cest.precio*cest.cantidad)});
			return parseFloat(suma).toFixed(2);
		}
	}
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
