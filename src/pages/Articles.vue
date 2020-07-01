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
	metaInfo: {
		title: 'Articles',
		link: [{ rel: 'canonical', href: this.$page.metadata.siteUrl + '/articles/' }], // TODO
		meta: [
			{
				key: 'description',
				name: 'description',
				content: 'Hey. I am a full-stack web developer. This page contains the listing of the few articles I wrote.',
			},
			{ property: 'og:type', content: 'profile' },
			{ property: 'og:profile:first_name', content: 'Enzo' },
			{ property: 'og:profile:last_name', content: 'Innocenzi' },
			{ property: 'og:profile:username', content: 'innocenzi' },
			{ property: 'og:profile:gender', content: 'male' },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:title', content: 'Enzo Innocenzi — Web developer' },
			{
				name: 'twitter:description',
				content: 'Hey. I am a full-stack web developer. This page contains the listing of the few articles I wrote.',
			},
			{ name: 'twitter:site', content: '@innocenzi' },
			{ name: 'twitter:creator', content: '@innocenzi' },
			// { name: 'twitter:image', content: this.ogImageUrl },
		],
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
