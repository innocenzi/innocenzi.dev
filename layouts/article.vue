<script setup lang="ts">
const { path } = useRoute()
const data = await queryContent('articles').where({ _path: path }).findOne()
</script>

<template>
	<nuxt-layout name="default">
		<main class="sm:px-8 lg:mb-12">
			<div class="mx-auto max-w-7xl lg:px-8">
				<div class="relative px-4 sm:px-8 lg:px-10">
					<div class="mx-auto max-w-2xl lg:max-w-5xl">
						<div class="xl:relative">
							<div class="mx-auto max-w-2xl">
								<nuxt-link
									aria-label="Go back to articles"
									href="/articles"
									class="group mb-8 flex size-10 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md shadow-zinc-800/5 ring-0 ring-white/10 transition hover:border-zinc-700 hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
								>
									<Icon name="heroicons-solid:arrow-narrow-left" class="size-4 stroke-zinc-500 transition group-hover:stroke-zinc-400" />
								</nuxt-link>
								<article>
									<header class="flex flex-col">
										<h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl" v-text="data?.title" />
										<time datetime="data?.created_at" class="order-first flex flex-col text-base text-zinc-500 md:flex-row md:items-center">
											<span v-text="formatDate(data?.created_at)" />
											<span class="ml-4 hidden md:inline">•</span>
											<span class="text-sm md:ml-4 md:text-base" v-text="data?.readingTime?.text" />
										</time>
									</header>
									<div
										:class="[
											'prose prose-invert mb-16 mt-8 text-zinc-300/90 prose-a:transition-all',
											'prose-a:font-medium prose-a:text-white prose-a:decoration-zinc-300/50 prose-a:underline-offset-[6px]',
											'prose-code:font-normal prose-code:text-zinc-200 prose-pre:p-8',
											'hover:prose-a:decoration-zinc-300',
										]"
									>
										<slot />
									</div>
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</nuxt-layout>
</template>

<style>
.prose :where(pre):not(:where([class~="not-prose"] *)) {
	@apply border border-zinc-700/50 rounded-2xl p-8 overflow-x-auto;
}
</style>
