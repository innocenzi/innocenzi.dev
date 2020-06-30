<template>
	<Layout>
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

		<section class="mt-40">
			<header class="mx-auto mb-24 text-center">
				<h1 class="text-6xl font-bold leading-tight tracking-tighter">Stack</h1>
				<span class="text-3xl text-brand">Everyone has a favorite stack. Here's mine.</span>
			</header>

			<div class="grid justify-center grid-cols-2 gap-8">
				<article v-for="tech in stack" :key="tech.id" class="flex">
					<div class="w-1/4">
						<div class="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-icon text-on-icon">
							<component v-if="tech.icon" :is="`icon-${tech.icon}`" class="w-12 h-12" />
						</div>
					</div>
					<div class="w-3/4">
						<h1 class="text-3xl font-bold tracking-tight uppercase text-brand" v-text="tech.name" />
						<p class="text-2xl" v-text="tech.description" />
					</div>
				</article>
			</div>
		</section>
	</Layout>
</template>

<script>
export default {
	metaInfo: {
		title: 'Enzo Innocenzi — Web developer',
	},
	computed: {
		stack() {
			return this.$page.stack.edges.map(({ node }) => node);
		},
	},
};
</script>

<page-query>
query {
  twitter: link (id: "twitter") {
    url
  }
  stack: allTechnology (filter: {main: {eq: true}}) {
    edges {
      node {
        id
        icon
        name
        description
      }
    }
  }
}
</page-query>
