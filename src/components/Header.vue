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
			<g-image
				src="~/../static/profile.png"
				quality="100"
				width="52"
				alt="Enzo Innocenzi's profile picture"
				class="rounded-full"
			/>
		</g-link>

		<nav
			:class="[
				'flex flex-wrap justify-center',
				'overflow-hidden',
				'mx-3 sm:mx-0 rounded-lg shadow-md',
				'sm:flex-no-wrap',
				'bg-navigation text-on-navigation',
			]"
		>
			<g-link
				v-for="link in links"
				:key="link.id"
				:to="link.url"
				:title="link.title"
				target="_self"
				class="px-5 py-4 transition-colors duration-150 hover:bg-navigation-hover focus:outline-none focus:shadow-none focus:bg-navigation-hover"
			>
				{{ link.label }}
			</g-link>

			<!-- Theme switcher -->
			<button
				@click="toggleTheme"
				:title="isLightTheme ? 'Turn off the god damn so bright light' : 'I wanna see what it looks like in white'"
				:class="[
					'px-4 py-4',
					'transition-colors duration-150',
					'text-on-navigation hover:bg-navigation-hover',
					'focus:outline-none focus:bg-navigation-hover focus:shadow-none',
				]"
			>
				<icon-sun-outline class="w-5 h-5" v-if="isLightTheme" />
				<icon-sun-solid class="w-5 h-5" v-if="isDarkTheme" />
			</button>
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
        url,
				title
      }
    }
  }
}
</static-query>
