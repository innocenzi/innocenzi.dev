<template>
	<Layout>
		<!-- Header -->
		<section class="flex flex-col items-center lg:space-x-16 lg:flex-row lg:mt-8 xl:mt-24">
			<div class="px-12 text-6xl font-bold leading-tight tracking-tighter md:px-0 lg:w-1/2">
				Hey, I am
				<a :href="$page.twitter.url" title="Go to Enzo Innocenzi's Twitter" class="text-brand">Enzo Innocenzi</a>.
				<br />
				Full-stack web developer, from France.
			</div>

			<div class="px-12 mt-12 text-2xl leading-relaxed md:px-0 lg:mt-0 lg:text-right lg:w-1/2">
				<p class="mb-8">
					I am passionate about development —
					<span class="hl-1">I love automating things</span>, <span class="hl-1">modern technologies</span> and
					<span class="hl-1">good developer experience</span>.
				</p>
				<p>
					<span class="hl-2">I am a perfectionist</span>. I pay attention to details, because I love when things look
					good and professionnal. I am also <span class="hl-2">self-taught</span>, and
					<a href="https://youtu.be/Cv1RJTHf5fk?t=11" title="Knowlegde">I never stop learning</a>.
				</p>
			</div>
		</section>

		<!-- Stack -->
		<home-section title="Stack" subtitle="Everyone has a favorite stack. Here's mine." :grid="true" class="mt-40">
			<article v-for="tech in stack" :key="tech.id" class="flex flex-col items-center mb-10 sm:flex-row sm:items-start">
				<div class="mb-8 sm:mr-8">
					<div class="flex items-center justify-center w-20 h-20 rounded-full bg-icon text-on-icon">
						<component v-if="tech.icon" :is="`icon-${tech.icon}`" class="w-12 h-12" />
					</div>
				</div>
				<div class="text-center sm:text-left">
					<a
						class="text-3xl font-bold tracking-tight uppercase text-brand"
						:href="tech.url"
						:title="tech.name"
						v-text="tech.name"
						rel="nofollow noopener"
					/>
					<p class="text-2xl" v-text="tech.description" />
				</div>
			</article>
		</home-section>

		<!-- Technologies -->
		<home-section
			title="Other technologies I work with"
			subtitle="Although I have favorites, I still work with a lot of other tools."
			class="mt-40"
			:grid="true"
		>
			<article v-for="(category, id) of categories" :key="id" class="flex flex-col items-center mb-10 lg:items-start">
				<header class="flex flex-col items-center mb-4 md:flex-row">
					<div
						class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-icon-reverse text-on-icon-reverse md:mb-0"
					>
						<component :is="`icon-${category.icon}`" class="w-6 h-6" />
					</div>
					<h2
						v-text="category.name"
						class="text-3xl font-bold tracking-tighter text-center uppercase md:ml-4 md:text-left text-brand"
					/>
				</header>

				<ul class="flex flex-wrap justify-center text-2xl leading-loose tracking-wider lg:justify-start">
					<li class="text-technology" v-for="(tech, id) in category.items" :key="id">
						<a :href="tech.url" :title="tech.name" rel="nofollow noopenner">{{ tech.name }}</a>
						<span class="mx-3 text-technology-bullet" :class="{ 'last:hidden': isLast(category, id) }">
							•
						</span>
					</li>
				</ul>
			</article>
		</home-section>

		<!-- Mail -->
		<section class="w-10/12 mx-auto mt-24 rounded-md shadow-md md:w-full bg-callout text-on-callout group">
			<a
				:href="$page.mail.url"
				title="Send an email"
				class="flex items-center justify-between w-full h-full p-8 rounded-md"
			>
				<div class="flex items-center">
					<icon-at class="hidden w-12 h-12 mr-4 text-on-callout-muted sm:block" />
					<span class="text-2xl">If you want to reach out to me, feel free to send me an email.</span>
				</div>
				<icon-chevron-right
					class="w-24 h-24 ml-8 transition-transform duration-150 transform md:w-12 md:h-12 group-hover:scale-110 text-on-callout-muted"
				/>
			</a>
		</section>
	</Layout>
</template>

<script>
import HomeSection from '~/components/HomeSection.vue';

export default {
	metaInfo() {
		return {
			title: `${this.$page.metadata.siteName} — Software developer`,
			titleTemplate: '%s',
		};
	},
	components: { HomeSection },
	computed: {
		stack() {
			return this.$page.stack.edges.map(({ node }) => node);
		},
		technologies() {
			return this.$page.technologies.edges.map(({ node }) => node);
		},
		categories() {
			const categories = {
				backend: {
					name: 'Back-end',
					icon: 'terminal',
					items: [],
				},
				frontend: {
					name: 'Front-end',
					icon: 'color-swatch',
					items: [],
				},
				tool: {
					name: 'Other tools & software',
					icon: 'briefcase',
					items: [],
				},
			};

			this.technologies.forEach((technology) => {
				technology.categories.forEach((category) => {
					if (!categories[category]) {
						categories[category] = { name: category, items: [] };
					}

					categories[category].items.push(technology);
				});
			});

			return categories;
		},
	},
	methods: {
		isLast(category, id) {
			return id === Object.keys(category.items).length - 1;
		},
	},
};
</script>

<style lang="postcss" scoped>
.hl-1 {
	@apply px-1 transition-colors duration-150 text-on-background bg-highlight-1;
}

.hl-2 {
	@apply px-1 transition-colors duration-150 text-on-background bg-highlight-2;
}
</style>

<page-query>
query {
  twitter: link (id: "twitter") {
    url
  }
  mail: link (id: "mail") {
    url
  }
	metadata {
		siteName
		siteUrl
		siteDescription
	}
  stack: allTechnology (filter: { main: { eq: true } }, order: ASC) {
    edges {
      node {
        id
        icon
        name
        description
				url
      }
    }
  }
	technologies: allTechnology(filter: { main: { ne: true } }, order: ASC) {
    edges {
      node {
        id
        name
        description
        icon
				categories
				url
      }
    }
  }
}
</page-query>
