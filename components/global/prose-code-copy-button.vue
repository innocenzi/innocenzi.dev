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
			{ 'show': show || isCopied },
			'rounded opacity-0 group-hover:opacity-100 transition backdrop-blur-sm p-1'
		]"
		@click="copy"
	>
		<span class="sr-only">Copy to clipboard</span>
		<div class="relative inset-0 flex h-5 w-5 items-center justify-center">
			<Icon
				name="ph:check"
				size="18"
				:class="[
					'transition absolute inset-0',
					{
						'opacity-100 scale-100 delay-100': isCopied,
						'opacity-0 scale-75': !isCopied,
					}
				]"
			/>
			<Icon
				name="ph:copy"
				size="18"
				:class="[
					'transition absolute inset-0',
					{
						'opacity-100 scale-100 delay-100': !isCopied,
						'opacity-0 scale-75': isCopied,
					}
				]"
			/>
		</div>
	</button>
</template>
