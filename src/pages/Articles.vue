<template>
	<Layout>
		<article-list
			:title="hasArticles ? 'Articles' : 'Come back later'"
			:subtitle="hasArticles ? 'Here is some of the stuff I wrote.' : 'I did not write anything yet.'"
			:articles="articles"
			:class="{ 'mt-40': !hasArticles }"
		/>
	</Layout>
</template>

<script>
import { DateTime } from 'luxon';
import HomeSection from '~/components/HomeSection.vue';
import ArticleList from '~/components/ArticleList.vue';

export default {
	metaInfo() {
		return {
			title: `Articles`,
			// link: [{ rel: 'canonical', href: this.$page.metadata.siteUrl + this.$route.path }],
		};
	},
	components: {
		HomeSection,
		ArticleList,
	},
	computed: {
		hasArticles() {
			return this.articles.length > 0;
		},
		articles() {
			return this.$page.articles.edges.map(({ node }) => node);
		},
	},
};
</script>

<page-query>
query {
	metadata {
		siteName
		siteUrl
	}
	articles: allArticle(filter: { published: { eq: true }}) {
		edges {
			node {
				id
				title
				description
				excerpt
        path
        date
        timeToRead
        tags {
          id
          title
          path
        }
			}
		}
	}
}
</page-query>
