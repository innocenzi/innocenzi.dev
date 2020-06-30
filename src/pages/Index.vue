<template>
	<Layout>
		<!-- Header -->
		<section class="flex flex-col items-center lg:space-x-16 lg:flex-row lg:mt-40">
			<div class="px-12 text-6xl font-bold leading-tight tracking-tighter md:px-0 lg:w-1/2">
				Hey, I am <a :href="$page.twitter.url" class="text-brand">Enzo Innocenzi</a>.
				<br />
				Full-stack web developer, from France.
			</div>

			<div class="px-12 mt-12 text-2xl leading-relaxed md:px-0 lg:mt-0 lg:text-right lg:w-1/2">
				<p class="mb-8">
					I am passionate about development — <span class="px-1 bg-highlight-1">I love automating things</span>,
					<span class="px-1 bg-highlight-1">modern technologies</span> and
					<span class="px-1 bg-highlight-1">good developer experience</span>.
				</p>
				<p>
					<span class="px-1 bg-highlight-2">I am a perfectionnist</span>. I pay attention to details, because I love
					when things look good and professionnal. I am also <span class="px-1 bg-highlight-2">self-taught</span>, and
					<a href="https://youtu.be/Cv1RJTHf5fk?t=11">I never stop learning</a>.
				</p>
			</div>
		</section>

		<!-- Stack -->
		<home-section title="Stack" subtitle="Everyone has a favorite stack. Here's mine." :grid="true" class="mt-40">
			<article v-for="tech in stack" :key="tech.id" class="flex mb-12">
				<div class="mr-8">
					<div class="flex items-center justify-center w-20 h-20 rounded-full bg-icon text-on-icon">
						<component v-if="tech.icon" :is="`icon-${tech.icon}`" class="w-12 h-12" />
					</div>
				</div>
				<div>
					<h1 class="text-3xl font-bold tracking-tight uppercase text-brand" v-text="tech.name" />
					<p class="text-2xl" v-text="tech.description" />
				</div>
			</article>
		</home-section>

		<!-- Technologies -->
		<home-section
			title="Other technologies I work with"
			subtitle="I may have favorites, though some other are worth being mentioned."
			class="mt-40"
			:grid="true"
		>
			<article v-for="(category, id) of categories" :key="id" class="flex flex-col mb-16">
				<header class="flex items-center mb-4">
					<div class="flex items-center justify-center w-10 h-10 rounded-full bg-on-icon text-icon">
						<component :is="`icon-${category.icon}`" class="w-6 h-6" />
					</div>
					<h1 v-text="category.name" class="ml-4 text-3xl font-bold tracking-tighter uppercase text-brand"></h1>
				</header>

				<ul class="flex flex-wrap text-2xl leading-loose tracking-wider">
					<li class="text-technology" v-for="(tech, id) in category.items" :key="id">
						<span>{{ tech.name }}</span>
						<span class="mx-3 text-technology-bullet" :class="{ 'last:hidden': isLast(category, id) }">
							•
						</span>
					</li>
				</ul>
			</article>
		</home-section>

		<!-- Mail -->
		<section class="flex justify-between w-full p-8 mt-24 rounded-md shadow-md bg-callout text-on-callout">
			<div class="flex items-center">
				<icon-at class="w-12 h-12 mr-4 text-on-callout-muted" />
				<span class="text-2xl">If you want to reach out to me, feel free to send me an email.</span>
			</div>
			<a :href="$page.mail.url" class="transition-transform duration-150 transform rounded-full hover:scale-110">
				<icon-arrow class="w-12 h-12" />
			</a>
		</section>
	</Layout>
</template>

<script>
import HomeSection from '~/components/HomeSection.vue';

export default {
	metaInfo: {
		title: 'Enzo Innocenzi — Web developer',
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

<page-query>
query {
  twitter: link (id: "twitter") {
    url
  }
  mail: link (id: "mail") {
    url
  }
  stack: allTechnology (filter: { main: { eq: true } }) {
    edges {
      node {
        id
        icon
        name
        description
      }
    }
  }
	technologies: allTechnology(filter: { main: { ne: true } }) {
    edges {
      node {
        id
        name
        description
        icon
				categories
      }
    }
  }
}
</page-query>
