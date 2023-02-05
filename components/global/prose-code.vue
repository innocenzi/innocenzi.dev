<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { Lang } from 'shiki-es'

defineProps({
	code: {
		type: String,
		default: '',
	},
	language: {
		type: String as PropType<Lang>,
		default: null,
	},
	filename: {
		type: String,
		default: null,
	},
	highlights: {
		type: Array as () => number[],
		default: () => [],
	},
})

const hovered = ref(false)
</script>

<template>
	<div
		:class="[`highlight-${language}`]"
		class="prose-code group relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-black px-2 py-0"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
	>
		<span v-if="filename" class="absolute top-2 right-2 rounded-xl px-2 py-1 font-mono text-xs backdrop-blur-sm transition group-hover:opacity-0 group-hover:hover:opacity-100">
			{{ filename }}
		</span>

		<slot />

		<prose-code-copy-button
			:show="hovered"
			:content="code"
			class="copy-button absolute right-2 bottom-2"
		/>
	</div>
</template>

<style>
.prose-code {
  --scrollbar-width: 10px;
  --scrollbar-background-color: black;
  --scrollbar-thumb-color: #313131;
  --scrollbar-radius: 10px;
	@apply overflow-hidden;
}

.prose-code pre {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-background-color);
	@apply overflow-x-auto m-0 p-8 bg-transparent;
}

.prose-code pre::-webkit-scrollbar {
  width: var(--scrollbar-width);
  background-color: var(--scrollbar-background-color);
  border-radius: var(--scrollbar-radius);
}

.prose-code pre::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb-color);
  border-radius: var(--scrollbar-radius);
}

.prose-code pre::-webkit-scrollbar-track {
  background-color: var(--scrollbar-background-color);
  border-radius: var(--scrollbar-radius);
}

.prose-code code {
	@apply flex flex-col leading-relaxed;
}

.prose-code .line {
	@apply block leading-relaxed min-h-[1rem];
}
</style>
