<script setup lang="ts">
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
		<a
			:href="url"
			class="group relative block focus:outline-none"
			rel="nofollow noopener"
			target="_blank"
		>
			<div :class="rotation" class="pointer-events-none absolute -inset-x-8 -inset-y-10 hidden scale-90 rounded-3xl backdrop-blur transition group-hover:scale-100 group-hover:bg-zinc-800/40 md:block" />
			<div class="relative flex flex-col items-center md:flex-row">
				<div class="mb-8 md:mr-8">
					<div class="flex size-20 shrink-0 items-center justify-center rounded-full bg-zinc-800/40 text-zinc-50 backdrop-blur transition md:group-hover:bg-zinc-900/50">
						<Icon :name="icon" class="size-9" />
					</div>
				</div>
				<div class="flex flex-col text-center md:text-left">
					<badge transparent color="primary">
						<span
							class="mb-2 font-karla text-xl font-medium uppercase tracking-wider transition group-focus:outline-dotted group-focus:outline-pink-200"
							v-text="name"
						/>
					</badge>
					<p class="mt-1 text-xl leading-normal" v-text="description" />
				</div>
			</div>
		</a>
	</div>
</template>
