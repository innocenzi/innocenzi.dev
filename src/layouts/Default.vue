<template>
	<main class="flex flex-col h-full min-h-screen py-12 antialiased bg-surface text-on-background">
		<page-header class="container mx-auto md:px-16" />
		<section class="container flex-1 mx-auto mt-16 md:px-16">
			<slot />
		</section>
		<page-footer class="container mx-auto mt-40 md:px-16" />
	</main>
</template>

<script>
import PageHeader from '~/components/Header.vue';
import PageFooter from '~/components/Footer.vue';

export default {
	components: {
		PageHeader,
		PageFooter,
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
