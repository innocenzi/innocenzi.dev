<template>
	<main class="flex flex-col h-full min-h-screen py-12 antialiased bg-background text-on-background">
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
	metaInfo() {
		return {
			link: [{ rel: 'canonical', href: this.$page.metadata.siteUrl + this.$route.path }],
			meta: [
				{
					key: 'description',
					name: 'description',
					content: this.$page.metadata.siteDescription,
				},
				{ property: 'og:type', content: 'profile' },
				{ property: 'og:profile:first_name', content: 'Enzo' },
				{ property: 'og:profile:last_name', content: 'Innocenzi' },
				{ property: 'og:profile:gender', content: 'male' },
				{ property: 'og:image', content: `${this.$page.metadata.siteUrl}/profile.png` },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: this.$page.metadata.siteName },
				{ name: 'twitter:description', content: this.$page.metadata.siteDescription },
				{ name: 'twitter:site', content: '@innocenzi' },
				{ name: 'twitter:creator', content: '@innocenzi' },
				{ name: 'twitter:image', content: `${this.$page.metadata.siteUrl}/profile.png` },
			],
		};
	},
};
</script>

<page-query>
query {
	metadata {
		siteUrl
	}
}
</page-query>

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
