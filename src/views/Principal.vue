<template>
	<div class="container p-3">
		<h4>Bienvenido al Sistema</h4>
		<div class="row rol-cols-5 " id="divCuartos">
			<div class="col my-2" v-for="cuarto in cuartos" :key="cuarto.id" @click="cambiarEstado( cuarto.id, cuarto.estado)">
				<div class="card  position-relative" :class="'border-'+cuarto.color" style="width: 18rem;">
					<span class="position-absolute top-0 start-100 translate-middle p-2  border border-light rounded-circle" :class="'bg-'+cuarto.color" ></span>
					<div class="card-body">
						<h5 class="card-title">
							<span><i class="bi bi-door-open"></i></span> Habitación {{cuarto.numero}}</h5>
						<p class="card-subtitle mb-2 text-muted">{{cuarto.nombre}}</p>
						<div class="d-flex justify-content-between">
							<p class="card-text" v-if="cuarto.estado=='1'"><span class="badge bg-primary">Libre</span></p>
							<p class="card-text" v-if="cuarto.estado=='2'"><span class="badge bg-warning">En limpieza</span></p>
							<p class="card-text" v-if="cuarto.estado=='3'"><span class="badge bg-danger">Ocupado</span></p>
							<p class="card-text" v-if="cuarto.estado=='4'"><span class="badge bg-secondary">Reservado</span></p>
							<h6 class="card-subtitle mb-2 fs-4" :class="'text-'+cuarto.color" >S/ 50.00</h6>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal para liberar la limpieza -->
		<div class="modal fade" id="modalLimpieza" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<div class="modal-header border-0">
						<h5 class="modal-title" id="staticBackdropLabel">Liberar de la Limpieza</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
							<img src="/imgs/limpiando.jpg" class="img-fluid">
					</div>
					<div class="modal-footer border-0">
						<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-outline-primary" @click="cambiarANormal()"><i class="bi bi-door-open-fill"></i> Habilitar cuarto</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal para ocupar -->
		<div class="modal fade" id="modalOcupar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header border-0">
						<h5 class="modal-title" id="staticBackdropLabel">Ocupar habitación</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p class="mb-0"><strong>Datos de la habitación</strong></p>
						<div class="d-flex justify-content-around">
							<p class="mb-0"><strong>Habitación</strong> {{queCuarto}}</p>
							<p class="mb-0"><strong>Precio</strong> S/ {{parseFloat(cuantoEs).toFixed(2)}}</p>
						</div>
						<p><strong>Datos del cliente</strong></p>
						<div class="row row-cols-3">
							<div class="col">
								<div class="form-floating">
									<select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="tipoCliente">
										<option value="1" selected>Sin registrar</option>
										<option value="2">D.N.I.</option>
										<option value="3">R.U.C.</option>
									</select>
									<label for="floatingSelect">Tipo de cliente</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<input type="text" class="form-control" id="floatingRuc" placeholder=" " v-model="ruc">
									<label for="floatingRuc">DNI</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<input type="text" class="form-control" id="floatingRuc" placeholder=" " v-model="razon_social">
									<label for="floatingRuc">Razón Social</label>
								</div>
							</div>
						</div>
						<div class="row cols-2 mt-2">
							<div class="col">
								<div class="form-floating">
									<input type="text" class="form-control" id="floatingRuc" placeholder=" " v-model="celular">
									<label for="floatingRuc">Celular</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<input type="text" class="form-control" id="floatingRuc" placeholder=" " v-model="direccion">
									<label for="floatingRuc">Dirección</label>
								</div>
							</div>
						</div>
						<p class="mt-2"><strong>Datos del alojamiento</strong></p>
						
						<div class="row row-cols-3">
							<div class="col">
								<div class="form-floating">
									<input type="number" class="form-control" id="floatingRuc" min="1" placeholder=" " @change="cambiarNoches()" v-model="noches">
									<label for="floatingRuc">Cant. noches</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<input type="number" class="form-control" id="floatingRuc" min="1" placeholder=" " v-model="personas">
									<label for="floatingRuc">N° Personas</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="tipoPago">
										<option value="1" selected>Efectivo</option>
										<option value="2">Tarjeta de débito</option>
										<option value="3">Tarjeta de crédito</option>
										<option value="4">Depósito bancario</option>
									</select>
									<label for="floatingSelect">Forma de pago</label>
								</div>
							</div>
						</div>
						<div class="row row-cols-3 mt-2">
							<div class="col">
								<div class="form-floating">
									<input type="date" class="form-control" id="floatingRuc" placeholder=" " v-model="salida">
									<label for="floatingRuc">Fecha de salida</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating">
									<input type="time" class="form-control" id="floatingRuc" placeholder=" " v-model="horaSalida" @change="horaCambio($event)">
									<label for="floatingRuc">Hora de salida</label>
								</div>
							</div>
						</div>
						<div class="row row-cols-3 mt-2">
							<div class="col">
								<div class="form-floating">
									<select class="form-select" id="floatingSelect" aria-label="Floating label select example" @change="cambioPago($event)" v-model='estadoPago'>
										<option value="1" >Pagado</option>
										<option value="2">Adelanta</option>
										<option value="3" selected>Falta pagar</option>
									</select>
									<label for="floatingSelect">Pago</label>
								</div>
							</div>
							<div class="col">
								<div class="form-floating" v-if="adelantaAlgo">
									<input type="number" class="form-control" id="floatingRuc" placeholder=" " v-model="adelanto">
									<label for="floatingRuc">Adelanto</label>
								</div>
							</div>
							
						</div>
						<div class="row row-cols-2 mt-2">
							<div class="col d-flex justify-content-start">
								<p><strong class="text-muted">{{notaAPagar}}</strong></p>
							</div>
							<div class="col d-flex align-items-center justify-content-end ">
								<p class="fs-4 pe-3"><span><small>Total:</small> S/ {{queCuanto}}</span></p>
								
							</div>
						</div>
					</div>
					<div class="modal-footer border-0">
						<button type="button" class="btn btn-outline-primary" @click="cambiarAOcupado()"><i class="bi bi-door-open-fill"></i> Registrar visita</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
var modalLimpieza, modalOcupar;
export default {
	name: 'Principal',
	data(){
		return {
			tipoCliente:1, ruc:'', razon_social:'', celular:'', direccion:'',
			todos:[], productos:[], cuartos:[], cuantoEs:0, cuantoEsCuarto:0,
			cambiarA:-1, queId:-1, queIndex:-1,
			salida:null, horaSalida:null, adelantaAlgo:false, adelanto:0,
			noches:1, tipoPago:1, personas:1, estadoPago:3
		}
	},
	methods:{
		async pedirDatos(){
			this.cuartos =[] ;
			axios.post(this.nombreApi+'/listarTodosProductos.php')
			.then((response)=>{ console.log( response.data );
				this.todos = response.data;
				var color;
				
				response.data.forEach(caso => {
					if(caso.idTipo=='1'){
						this.productos.push({id: caso.id, nombre: caso.nombre  });
					}else{
						if(caso.estado ==1){ color= 'primary';}
						else if(caso.estado ==2){ color= 'warning';}
						else if(caso.estado ==3){ color= 'danger';}
						else if(caso.estado ==4){ color= 'secondary';}
						this.cuartos.push({id: caso.id, nombre: caso.nombre , numero: caso.numero, precio: caso.precio, estado: caso.estado, color });
					}
				});
				//console.log( this.cuartos );

			})
			.catch((error)=>{ console.log( error );});
			
				
		},
		cambiarEstado(idCuarto, estado){
			this.queIndex = this.cuartos.map(cuarto => cuarto.id).indexOf(idCuarto);
			
			this.queId=idCuarto;
			this.cambiarA=estado;
			this.cuantoEs= this.cuartos[this.queIndex].precio;
			this.cuantoEsCuarto = this.cuantoEs;
			this.noches=1;

			switch (estado) {
				case '1':  modalOcupar.show(); break;
				case '2': modalLimpieza.show(); break;
			
				default:
					break;
			}

		},
		cambiarANormal(){
			axios.post( this.nombreApi + '/habilitarCuartoDeLimpieza.php', {idCuarto: this.queId})
			.then((response)=>{ 
				modalLimpieza.hide();
			})
			.catch((error)=>{ console.log( error );});
		},
		horaCambio(e){ console.log(e.target.value); },
		cambioPago(e){ 
			switch (e.target.value) {
				case '1': this.adelantaAlgo=false; this.adelanto =this.cuantoEsCuarto; break;
				case '2': this.adelantaAlgo=true; this.adelanto=0; break;
				case '3': this.adelantaAlgo=false; this.adelanto=0; break;
			
				default: break;
			}
			
		},
		cambiarNoches(){
			this.cuantoEsCuarto = this.cuantoEs*this.noches;
			this.salida = moment().add(this.noches, 'days').format('YYYY-MM-DD');
			this.horaSalida="12:00";
		},
		cambiarAOcupado(){
			axios.post(this.nombreApi + '/ocuparHabitacion.php', {
				idHabitacion: this.queId,
				tipoCliente:this.tipoCliente,
				dni:this.dni,
				razon_social:this.razon_social,
				celular:this.celular,
				direccion:this.direccion,
				noches:this.noches,
				personas:this.personas,
				tipoPago:this.tipoPago,
				salida:this.salida,
				hora:this.horaSalida,
				estadoPago:this.estadoPago,
				adelantaAlgo:this.adelantaAlgo
			})
			.then((response)=>{ console.log( response.data );})
			.catch((error)=>{ console.log( error );});
		}

	},
	mounted(){
		this.salida=moment().format('YYYY-MM-DD');
		this.horaSalida=moment().format('HH:mm');

		this.pedirDatos();
		modalLimpieza = new bootstrap.Modal(document.getElementById('modalLimpieza'));
		modalOcupar = new bootstrap.Modal(document.getElementById('modalOcupar'));
	},
	computed:{
		queCuarto(){
			if(this.queIndex!=-1){
				return `#${this.cuartos[this.queIndex].numero} ${this.cuartos[this.queIndex].nombre}`;
			}else{ return '';}
		},
		queCuanto(){
			return parseFloat(this.cuantoEsCuarto).toFixed(2);
		},
		notaAPagar(){
			if(this.cuantoEsCuarto == this.adelanto){ return 'Cancelado el cuarto'; }
			else if(parseFloat(this.adelanto) > this.cuantoEsCuarto ){ return 'Vuelto S/ ' + parseFloat(parseFloat(this.adelanto)-parseFloat(this.cuantoEsCuarto)).toFixed(2); }
			else if(this.cuantoEsCuarto > parseFloat(this.adelanto)){ return 'Faltaría pagar S/ ' + parseFloat(parseFloat(this.cuantoEsCuarto)-parseFloat(this.adelanto)).toFixed(2);}
		}
	},
	
	

}
</script>
<style scoped>
#divCuartos .card{
	cursor: pointer;
}
</style>