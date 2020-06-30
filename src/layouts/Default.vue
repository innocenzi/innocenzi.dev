<template>
	<main class="h-full min-h-screen py-12 antialiased bg-surface text-on-background">
		<page-header class="container mx-auto md:px-16" />
		<section class="container mx-auto mt-16 md:px-16">
			<slot />
		</section>
	</main>
</template>

<script>
import PageHeader from '~/components/Header.vue';

export default {
	components: {
		PageHeader,
	},
};
</script>

<style>
:root {
	font-size: 14px;
}

@screen md {
	:root {
		font-size: 15px;
	}
}

@screen lg {
	:root {
		font-size: 16px;
	}
}

*:focus {
	@apply outline-none shadow-outline;
}
</style>
