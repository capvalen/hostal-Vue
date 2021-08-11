<template>
	<div class="container">
		<div class="row row-cols-3">
			<Menu />
			<section class="col-8 col-lg-9 border-start border-end p-0" id="segundaColumna">
				<div class="p-3 d-flex justify-content-between border-bottom">
					<h3 class="mb-0">Sist. para Hospedajes</h3>
					<span class="d-flex align-items-center justify-content-center rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Buscar producto" id="spanBusqueda"><i class="bi bi-search"></i></span>
				</div>
				<div id="contenido" class="">
					
					<router-view></router-view>
					
				</div>
			</section>
		
			
		</div>		
	</div>

</template>

<style>
*{font-family: 'Roboto', sans-serif;}
	section a{color:#8a96a3}
	section a.active, .router-link-exact-active{color:#242529}
	#imgPerfil{max-width: 15%;}

	#primeraColumna, #segundaColumna{min-height: 100vh;}
	#primeraColumna i{font-size: 1.7rem;}
	#spanBusqueda{ cursor:pointer; width: 2rem; height: 2rem;}
	#spanBusqueda:hover, .divContenido:hover{
		background-color: #dbdbdb9e; cursor:pointer;
	}
	#spanBusqueda:hover i{
		color:white;
	}
	.btn-primary{background-color: #8f28f0; border: 1px solid #8f28f0;}
	.btn-primary:hover, .btn-check:active+.btn-primary, .btn-check:checked+.btn-primary, .btn-primary.active, .btn-primary:active, .show>.btn-primary.dropdown-toggle, .btn-check:focus+.btn-primary, .btn-primary:focus{background-color: #7c23d0; border: 1px solid #7c23d0;}
</style>

<script>
import Menu from '@/components/Menu.vue'

export default {
	
	components:{
		Menu
	}
}
</script>