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
			link: [{ rel: 'canonical', href: this.$static.metadata.siteUrl + this.$route.path }],
			meta: [
				{
					key: 'description',
					name: 'description',
					content: this.$static.metadata.siteDescription,
				},
				{ property: 'og:type', content: 'profile' },
				{ property: 'og:url', content: this.$static.metadata.siteUrl + this.$route.path },
				{ property: 'og:title', content: this.$static.metadata.siteName },
				{ property: 'og:site_name', content: this.$static.metadata.siteName },
				{ property: 'og:description', content: this.$static.metadata.siteDescription },
				{ property: 'og:profile:first_name', content: 'Enzo' },
				{ property: 'og:profile:last_name', content: 'Innocenzi' },
				{ property: 'og:profile:gender', content: 'male' },
				{ property: 'og:image', content: `${this.$static.metadata.siteUrl}/profile.png` },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: this.$static.metadata.siteName },
				{ name: 'twitter:description', content: this.$static.metadata.siteDescription },
				{ name: 'twitter:site', content: '@innocenzi' },
				{ name: 'twitter:creator', content: '@innocenzi' },
				{ name: 'twitter:image', content: `${this.$static.metadata.siteUrl}/profile.png` },
			],
		};
	},
};
</script>

<static-query>
query {
	metadata {
		siteUrl
		siteName
		siteDescription
	}
}
</static-query>

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
