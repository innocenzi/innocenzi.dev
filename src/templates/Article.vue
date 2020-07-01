<template>
	<Layout>
		<header class="w-2/3 mx-auto mb-24 text-center md:w-full">
			<h1 class="text-6xl font-bold leading-tight tracking-tighter">{{ $page.article.title }}</h1>
			<div class="mt-3 font-sans text-lg font-bold text-on-background-muted">
				{{ readableDate }}
			</div>
		</header>

		<article class="w-10/12 mx-auto md:w-full markdown" v-html="$page.article.content" />
	</Layout>
</template>

<script>
import { DateTime } from 'luxon';
import HomeSection from '~/components/HomeSection.vue';
import ArticleHeader from '~/components/ArticleHeader.vue';

export default {
	components: {
		HomeSection,
		ArticleHeader,
	},
	metaInfo() {
		return {
			title: `${this.$page.article.title} ${this.$page.article.tag ? '- ' + this.$page.article.tag.name : ''}`,
			link: [{ rel: 'canonical', href: this.articleUrl }],
			meta: [
				{
					key: 'description',
					name: 'description',
					content: this.description,
				},
				{ property: 'og:type', content: 'article' },
				{ property: 'og:title', content: this.$page.article.title },
				{ property: 'og:description', content: this.description },
				{ property: 'og:url', content: this.articleUrl },
				{
					property: 'article:published_time',
					content: this.ogPublishedTime,
				},
				{ property: 'og:image', content: this.ogImageUrl },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: this.$page.article.title },
				{ name: 'twitter:description', content: this.description },
				{ name: 'twitter:site', content: '@innocenzi' },
				{ name: 'twitter:creator', content: '@innocenzi' },
				{ name: 'twitter:image', content: this.ogImageUrl },
			],
		};
	},
	mounted() {
		import('medium-zoom').then((mediumZoom) => {
			this.zoom = mediumZoom.default('.markdown p > img');
		});
	},
	computed: {
		writeDate() {
			return DateTime.fromFormat(this.$page.article.date, 'dd-MM-yyyy');
		},
		readableDate() {
			return this.writeDate.setLocale('en-US').toLocaleString(DateTime.DATE_FULL);
		},
		description() {
			const description = this.$page.article.description || this.$page.article.excerpt;
			return description.substr(0, 170);
		},
		ogPublishedTime() {
			return this.writeDate.toISODate();
		},
		ogImageUrl() {
			return this.$page.metadata.siteUrl + this.$page.article.path + this.$page.article.cover_image;
		},
		articleUrl() {
			return this.$page.metadata.siteUrl + this.$page.article.path;
		},
	},
};
</script>

<style lang="postcss">
.markdown {
	h1,
	h2,
	h3,
	h4,
	h5 {
		@apply mb-4 mt-8 font-bold;
	}

	h1 {
		@apply text-4xl;
	}

	h2 {
		@apply text-3xl;
	}

	h3 {
		@apply text-2xl;
	}

	h4 {
		@apply text-xl;
	}

	h5 {
		@apply text-lg;
	}

	p {
		@apply mb-4 text-lg leading-relaxed;
	}

	img {
		@apply my-6;
	}

	pre {
		@apply my-6;
	}

	small {
		@apply text-on-background-muted text-sm;
	}

	strong {
		@apply font-bold;
	}

	blockquote {
		@apply border-l-4 border-on-background-muted pl-6 text-on-background-muted;
	}

	em {
		@apply italic;
	}

	li > p {
		@apply mb-1 text-base leading-normal;
	}

	ul {
		@apply list-disc ml-5 mb-1;

		li {
			@apply mb-1;
		}
	}

	ol {
		list-style-type: decimal;
		margin-left: 1.25em;
		margin-bottom: 1.25em;

		li {
			margin-bottom: 0.6em;
		}
	}
}
</style>

<page-query>
query Article ($id: ID!) {
	article (id: $id) {
		id
		title
		content
		date
		description
		excerpt
		timeToRead
		cover_image
		path
		tags {
			id
			title
			path
		}
	}
	
  metadata {
    siteUrl
  }
}
</page-query>
