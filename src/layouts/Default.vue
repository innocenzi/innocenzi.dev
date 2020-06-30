<template>
	<main class="h-full min-h-screen antialiased bg-surface text-on-background">
		<page-header class="container mx-auto mt-12" />
		<section class="container mx-auto mt-12">
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

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
