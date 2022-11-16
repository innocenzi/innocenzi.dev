<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
	articles: ParsedContent[]
}>()
</script>

<template>
	<div class="mt-16 sm:mt-20">
		<div class="border-zinc-700/40 md:border-l md:pl-6">
			<div class="flex max-w-4xl flex-col space-y-16">
				<article v-for="article in articles" :key="article.title" class="md:grid md:grid-cols-4 md:items-baseline">
					<div class="group relative flex flex-col items-start md:col-span-3">
						<h2 class="text-base font-semibold tracking-tight text-zinc-100">
							<div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-800/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
							<nuxt-link :href="article._path">
								<span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
								<span class="relative z-10" v-text="article.title" />
							</nuxt-link>
						</h2>
						<time
							class="relative z-10 order-first mb-3 flex flex-col pl-3.5 text-sm leading-none text-zinc-500 md:hidden"
							:datetime="article.created_at"
						>
							<span
								class="absolute inset-y-0 left-0 flex items-center"
								aria-hidden="true"
							>
								<span class="h-10 w-0.5 rounded-full bg-zinc-500" />
							</span>
							<span v-text="formatDate(article.created_at)" />
							<span class="mt-1 text-xs" v-text="article.readingTime.text" />
						</time>
						<p class="relative z-10 mt-2 text-sm text-zinc-400" v-text="article.description" />
						<div
							aria-hidden="true"
							class="relative z-10 mt-4 flex items-center text-sm font-medium text-pink-300"
						>
							Read article
							<icon name="heroicons-solid:arrow-narrow-right" class="ml-2 h-4 w-4" />
						</div>
					</div>
					<div
						class="relative z-10 order-first mt-1 mb-3 hidden flex-col justify-center text-sm text-zinc-500 md:flex"
					>
						<time
							:datetime="article.created_at"
							v-text="formatDate(article.created_at)"
						/>
						<span class="mt-1 text-xs" v-text="article.readingTime.text" />
					</div>
				</article>
			</div>
		</div>
	</div>
</template>
