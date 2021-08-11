<template>
	<section class="col-4 col-lg-3 d-flex flex-column pt-3" id="primeraColumna">
		<div>
			<img class="img-thumbnail rounded-circle my-2" src="images/infocat.jpg" alt="" id="imgPerfil">
		</div>
		
		<router-link class="fs-5 text-decoration-none my-2" to="/">
			<i class="bi bi-house-door"></i> <span class="ps-3">Inicio</span>
		</router-link>

		<router-link class="fs-5 text-decoration-none my-2" to="/ventas">
			<i class="bi bi-tag"></i> <span class="ps-3">Ventas</span>
		</router-link>
		<router-link class="fs-5 text-decoration-none my-2" to="/productos">
			<i class="bi bi-inboxes"></i> <span class="ps-3">Productos</span>
		</router-link>
		

		
		<a href="#" class="fs-5 text-decoration-none my-2"><i class="bi bi-sort-up-alt"></i> <span class="ps-3">Movimientos</span></a>
		<a href="#" class="fs-5 text-decoration-none my-2"><i class="bi bi-file-pdf"></i> <span class="ps-3">Resumen</span></a>
		<a href="#" class="fs-5 text-decoration-none my-2"><i class="bi bi-person-badge"></i> <span class="ps-3">Usuarios</span></a>
		<a href="#" class="fs-5 text-decoration-none my-2"><i class="bi bi-gear"></i> <span class="ps-3">Más</span></a>
		<!-- Perfil, configuraciones, modo oscuro, ayuda y soporte técnico -->
	</section>
</template>

<script>
export default {
	name: 'Menu'
}
</script>