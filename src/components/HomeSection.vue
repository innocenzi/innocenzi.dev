<template>
	<section>
		<header class="w-2/3 mx-auto mb-24 text-center md:w-full">
			<h1 class="text-6xl font-bold leading-tight tracking-tighter">{{ title }}</h1>
			<span class="text-3xl text-brand">{{ subtitle }}</span>
		</header>

		<div class="grid justify-center w-10/12 grid-cols-1 gap-8 mx-auto md:w-full lg:grid-cols-2" v-if="grid">
			<slot />
		</div>

		<slot v-if="!grid" />
	</section>
</template>

<script>
export default {
	props: ['title', 'subtitle', 'grid'],
};
</script>
