<script setup lang="ts">
defineProps<{
	name: string
	url: string
}>()
</script>

<template>
	<div class="font-karla flex text-xl">
		<a :href="url" class="link" v-text="name" />
	</div>
</template>
