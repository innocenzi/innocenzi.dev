<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineProps({
	code: {
		type: String,
		default: '',
	},
	language: {
		type: String,
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
	meta: {
		type: String,
		default: null,
	},
	class: {
		type: String,
		default: null,
	},
})

const { copy, copied } = useClipboard()
</script>

<template>
	<div class="group/code relative p-0.5 border border-default rounded-lg overflow-hidden text-sm">
		<div v-if="filename" class="px-2 pt-1 pb-1.5 text-toned" v-text="filename" />
		<pre class="bg-accented/30 p-4 border border-default rounded-md overflow-x-auto" :class="$props.class"><slot /></pre>
		<UButton
			@click="copy(code)"
			class="right-2 absolute opacity-0 group-hover/code:opacity-100 scale-80 group-hover/code:scale-100 transition"
			:class="filename ? 'top-10' : 'top-2'"
			size="sm"
			:color="copied ? 'success' : 'neutral'"
			variant="subtle"
			:icon="copied ? 'tabler:copy-check' : 'tabler:copy'"
		/>
	</div>
</template>

<style>
pre code .line {
	display: block;
}
</style>
