<template>
	<div class="flex items-center flex-col min-h-screen bg-tan-200">
		<GlobalExternalHeader :show-header-buttons-prop="showHeaderButtonsProp" :is-light-nav-prop="isLightNavProp" />
		<main class="flex flex-1 flex-col items-center w-screen flex-grow external-page">
			<slot />
		</main>
		<GlobalExternalFooter />
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	showHeaderButtonsProp: {
		type: Boolean,
		default: true,
	},
	isLightNavProp: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="sass">
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan
</style>
