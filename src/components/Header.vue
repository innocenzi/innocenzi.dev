<template>
	<header class="flex flex-col items-center justify-between lg:flex-row">
		<g-link
			to="/"
			title="Go to the homepage"
			:class="[
				'mb-6 lg:mb-0',
				'rounded-full',
				'flex items-center',
				'transition-transform duration-200',
				'transform hover:scale-110',
				'focus:outline-none focus:shadow-outline',
			]"
		>
			<g-image src="../favicon.png" width="52" alt="Enzo Innocenzi's profile picture" />
		</g-link>

		<nav class="flex overflow-hidden rounded-lg shadow-md bg-navigation text-on-navigation">
			<g-link
				v-for="link in links"
				:key="link.id"
				:to="link.url"
				:title="link.label"
				target="_self"
				active-class="bg-navigation-active shadow-navigation-active"
				class="px-5 py-4 transition-colors duration-150 hover:bg-navigation-hover focus:outline-none focus:bg-navigation-hover"
			>
				{{ link.label }}
			</g-link>
		</nav>
	</header>
</template>

<script>
export default {
	computed: {
		links() {
			return this.$static.links.edges.map(({ node }) => node);
		},
	},
};
</script>

<static-query>
query {
  links: allLink(sort: [{ by: "order", order: ASC}]) {
    edges {
      node {
        id,
        label,
        url
      }
    }
  }
}
</static-query>
