<script setup lang="ts">
import { hardware, software } from '~~/content/about'

useSeoMeta({
	title: 'Uses — Enzo Innocenzi',
	description: 'Hardware, software, and tools I use on a daily basis for development and productivity.',
})
</script>

<template>
	<UContainer class="flex flex-col items-center gap-y-10 lg:gap-y-20 my-6 lg:my-18 h-full grow">
		<!-- hardware -->
		<section class="flex flex-col gap-y-8 slide-enter-content">
			<!-- header -->
			<div class="flex flex-col gap-y-3">
				<span class="font-mono text-highlighted text-3xl">Hardware</span>
				<p>
					I combine a work and gaming setup using a KVM to switch between both of them. I have a standing desk, I work standing most of the time.
				</p>
			</div>
			<!-- hardware list -->
			<ul class="flex flex-col gap-y-6 slide-enter-content">
				<li v-for="item in hardware" :key="item.label" class="flex flex-col gap-y-1 text-toned">
					<span class="flex items-center gap-x-2.5">
						<UIcon :name="item.icon" class="size-5.5 text-dimmed" />
						<ULink :href="item.url" class="text-highlighted text-base" v-text="item.label" />
					</span>
					<span>
						<span v-if="item.specifications" v-text="item.specifications" />
						<span v-if="item.specifications && item.comment"> — </span>
						<span v-if="item.comment" v-text="item.comment" />
					</span>
				</li>
			</ul>
		</section>
		<!-- software -->
		<section class="flex flex-col gap-y-8 slide-enter-content">
			<!-- header -->
			<div class="flex flex-col gap-y-3">
				<span class="font-mono text-highlighted text-3xl">Software</span>
				<p>
					Applications, tools, and services I use for development and productivity everyday.
				</p>
			</div>
			<!-- software list -->
			<ul class="flex flex-col gap-y-6 slide-enter-content">
				<li v-for="item in software" :key="item.label" class="flex flex-col gap-y-1">
					<span class="flex items-center gap-x-2.5">
						<UIcon :name="item.icon" class="size-5.5 text-dimmed" />
						<ULink :href="item.url" class="text-highlighted text-base" v-text="item.label" />
					</span>
					<span class="text-toned" v-text="item.description" />
				</li>
			</ul>
		</section>
	</UContainer>
</template>
