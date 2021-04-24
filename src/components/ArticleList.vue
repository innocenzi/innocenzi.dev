<template>
	<home-section :title="title" :subtitle="subtitle">
		<section v-if="hasArticles">
			<article
				class="flex w-full mb-24"
				v-for="(article, id) in articles"
				:key="id"
				itemscope
				itemtype="https://schema.org/BlogPosting"
			>
				<!-- Time -->
				<aside class="w-1/4">
					<time
						:datetime="article.date"
						class="block font-mono text-lg text-metadata"
					>{{ getReadableDate(article) }}</time>
				</aside>

				<!-- Content -->
				<article-header :article="article" class="w-2/4">
					<p
						class="text-lg leading-relaxed opacity-75"
						v-html="article.description || article.excerpt + '...'"
					/>
				</article-header>
			</article>
		</section>
	</home-section>
</template>

<script>
import { DateTime } from 'luxon';
import HomeSection from '~/components/HomeSection.vue';
import ArticleHeader from '~/components/ArticleHeader.vue';

export default {
	props: ['title', 'subtitle', 'articles'],
	components: {
		ArticleHeader,
		HomeSection,
	},
	methods: {
		parseDate(date) {
			return DateTime.fromFormat(date, 'dd-mm-yyyy', { locale: 'en-US' });
		},
		getReadableDate({ date }) {
			return this.parseDate(date).toLocaleString(DateTime.DATE_FULL);
		},
	},
	computed: {
		hasArticles() {
			return this.articles.length > 0;
		},
	},
};
</script>
