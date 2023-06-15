<script setup lang="ts">
import '@fontsource-variable/karla'
import '@fontsource-variable/inter'
</script>

<template>
	<nuxt-layout>
		<nuxt-page />
	</nuxt-layout>
</template>

<style>
.page-enter-active,
.page-leave-active {
	opacity: 1;
	transition: opacity 0.2s, transform 0.2s;
	transform: translate3d(0px, 0px, 0px);
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	transform: translate3d(5px, 0px, 0px);
}
</style>
