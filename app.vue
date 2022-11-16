<script setup lang="ts">
import '@fontsource/karla/variable.css'
import '@fontsource/inter/variable.css'
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
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
