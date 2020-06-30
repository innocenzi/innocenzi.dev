<template>
	<Layout>
		Articles template
		<h1 v-html="$page.article.title" />
		<div v-html="$page.article.content" />
	</Layout>
</template>

<page-query>
query Article ($id: ID!) {
	article (id: $id) {
		title
		content
	}
}
</page-query>
