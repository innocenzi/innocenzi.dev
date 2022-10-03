<script setup lang="ts">
import Icon from '../icon.vue'
import { formatDate, getReadingTime } from '$/utils/article'

defineProps<{
	articles: Array<{
		url: string
		compiledContent: Function
		frontmatter: {
			title: string
			date: string
			image?: string
			category: string
			tags: string[]
			description: string
		}
	}>
}>()
</script>

<template>
	<div class="mt-16 sm:mt-20">
		<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
			<div class="flex max-w-3xl flex-col space-y-16">
				<article v-for="article in articles" :key="article.frontmatter.title" class="md:grid md:grid-cols-4 md:items-baseline">
					<div class="group relative flex flex-col items-start md:col-span-3">
						<h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
							<div class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
							<a :href="article.url">
								<span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
								<span class="relative z-10" v-text="article.frontmatter.title" />
							</a>
						</h2>
						<time
							class="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500 md:hidden"
							:datetime="article.frontmatter.date"
						>
							<span
								class="absolute inset-y-0 left-0 flex items-center"
								aria-hidden="true"
							>
								<span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
							</span>
							{{ formatDate(article.frontmatter.date) }}
						</time>
						<p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400" v-text="article.frontmatter.description" />
						<div
							aria-hidden="true"
							class="relative z-10 mt-4 flex items-center text-sm font-medium text-pink-300"
						>
							Read article
							<Icon icon="arrowRight" class="ml-2 h-4 w-4" />
						</div>
					</div>
					<div
						class="relative z-10 order-first mt-1 mb-3 hidden flex-col justify-center text-sm text-zinc-400 dark:text-zinc-500 md:flex"
					>
						<time
							:datetime="article.frontmatter.date"
							v-text="formatDate(article.frontmatter.date)"
						/>
						<span class="mt-1" v-text="getReadingTime(article.compiledContent())" />
					</div>
				</article>
			</div>
		</div>
	</div>
</template>
