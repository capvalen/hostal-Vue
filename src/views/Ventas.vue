<template>
	<div class=" border-bottom py-2 px-4 divContenido d-flex align-items-end justify-content-between">
		<h5 class="mb-1"><i class="bi bi-bookmark"></i> Generar Venta</h5>
		<button class="btn btn-outline-secondary"><i class="bi bi-bag-plus"></i> Nueva venta</button>
		<!-- <div class="d-flex w-100 justify-content-between">
			<div class=" ms-4">
				<p class="mb-0 ">De un shampoo</p>
				<small><i class="bi bi-arrow-right-short"></i> María Mateo</small>
			</div>
			<small><strong>S/ 25.00</strong></small>
		</div> -->
	</div>
</template>
<script>
import Tostada from '@/components/Tostadas.vue';

export default {
	name: 'About',
	components:{Tostada},
}
</script>