<template>
	<div>
		
		<div class="toast-container position-absolute bottom-0 end-0 p-3">
			<div id="tostadaBien" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="d-flex">
					<div class="toast-body">
						Archivo guardardo con éxito.
					</div>
					<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
			</div>
		</div>
		<div class="toast-container position-absolute bottom-0 end-0 p-3">
			<div id="tostadaMal" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="d-flex">
					<div class="toast-body">
						Hubo un error guardando
					</div>
					<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	name:'Tostada'
}
	/*
	let myToastEl = document.getElementById('tostadaBien')
	let tostadaBien = new bootstrap.Toast(myToastEl)
	tostadaBien.show();

	let myToastElla = document.getElementById('tostadaMal')
	let tostadaMal = new bootstrap.Toast(myToastElla)
	tostadaMal.show();

	 */
</script>