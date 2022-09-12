<script setup lang="ts">
import Icon from '../icon.vue'
import Badge from '../badge.vue'

defineProps<{
	name: string
	description: string
	icon: string
	url: string
}>()

const rotations = ['lg:rotate-1 lg:translate-y-0.5', 'lg:-rotate-1']
const rotation = rotations.at(Math.floor(Math.random() * rotations.length))
</script>

<template>
	<div>
		<a :href="url" class="group relative block" rel="nofollow noopener" target="_blank">
			<div :class="rotation" class="pointer-events-none absolute -inset-x-8 -inset-y-10 hidden scale-90 rounded-3xl bg-zinc-900 transition group-hover:scale-100 group-hover:bg-zinc-800 sm:block" />
			<div class="relative flex flex-col items-center sm:flex-row">
				<div class="mb-8 sm:mr-8">
					<div class="bg-primary flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-50 transition dark:bg-zinc-800/50 sm:group-hover:bg-zinc-900">
						<Icon :icon="(icon as any)" class="h-9 w-9" />
					</div>
				</div>
				<div class="flex flex-col text-center sm:text-left">
					<Badge transparent color="primary">
						<span
							class="font-karla text-primary mb-2 text-xl font-medium uppercase tracking-wider transition"
							v-text="name"
						/>
					</Badge>
					<p class="mt-1 text-xl leading-normal" v-text="description" />
				</div>
			</div>
		</a>
	</div>
</template>
