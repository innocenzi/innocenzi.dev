<template>
	<Layout>
		<h1>About us</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a
			voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime!
			Iusto.
		</p>
	</Layout>
</template>

<script>
export default {
	metaInfo: {
		title: 'About us',
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
				cover_image (width: 770, height: 380, blur: 10)
        path
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
