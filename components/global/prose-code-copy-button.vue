<script setup lang="ts">
import { useClipboard, useToggle } from '@vueuse/core'

const props = defineProps({
	content: {
		type: String,
		default: '',
	},
	show: {
		type: Boolean,
		default: false,
	},
})

const { copy: copyToClipboard } = useClipboard()
const [isCopied, toggleCopied] = useToggle(false)

async function copy() {
	await copyToClipboard(props.content).catch(console.warn)
	toggleCopied(true)
	setTimeout(() => toggleCopied(false), 1000)
}
</script>

<template>
	<button
		:class="[
			{ show: show || isCopied },
			'rounded p-1 opacity-0 backdrop-blur-sm transition group-hover:opacity-100',
		]"
		@click="copy"
	>
		<span class="sr-only">Copy to clipboard</span>
		<div class="relative inset-0 flex size-5 items-center justify-center">
			<Icon
				name="ph:check"
				size="18"
				:class="[
					'absolute inset-0 transition',
					{
						'scale-100 opacity-100 delay-100': isCopied,
						'scale-75 opacity-0': !isCopied,
					},
				]"
			/>
			<Icon
				name="ph:copy"
				size="18"
				:class="[
					'absolute inset-0 transition',
					{
						'scale-100 opacity-100 delay-100': !isCopied,
						'scale-75 opacity-0': isCopied,
					},
				]"
			/>
		</div>
	</button>
</template>
