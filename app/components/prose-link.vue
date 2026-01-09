<script setup lang="ts">
defineProps<{
	href: string
	text?: string
	icon?: string
	external?: boolean
}>()
</script>

<template>
	<ULink class="group inline-flex items-center gap-x-1.25 text-highlighted" :href>
		<slot>{{ text }}</slot>
		<div v-if="icon && external" class="relative size-4.5">
			<UIcon :name="icon" class="absolute group-hover:opacity-0 size-full group-hover:scale-80 transition delay-75 group-hover:delay-0" />
			<UIcon
				name="tabler:external-link"
				class="absolute opacity-0 group-hover:opacity-100 size-full scale-80 group-hover:scale-100 transition delay-0 group-hover:delay-75"
			/>
		</div>
		<UIcon v-else-if="external === true" name="tabler:external-link" />
	</ULink>
</template>
