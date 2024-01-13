<template>
	<div class="flex items-center flex-col min-h-screen bg-tan-200">
		<ClientOnly>
			<TransitionGroup name="toast" tag="div" class="fixed top-4 right-4 z-50 max-w-md w-full transition-all space-y-4">
				<BaseToast v-for="toast in toastQueue" :id="toast.id" :key="toast.id" :message="toast.message" :type="toast.type" />
			</TransitionGroup>
		</ClientOnly>
		<main class="flex flex-1 flex-col items-center w-screen flex-grow">
			<slot />
		</main>
		<GlobalExternalFooter />
	</div>
</template>

<script setup lang="ts">
const { toastQueue } = useToast();
</script>

<style lang="sass">
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan
</style>
