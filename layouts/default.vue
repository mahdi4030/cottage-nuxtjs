<template>
	<div class="flex items-center flex-col min-h-screen bg-tan-200">
		<main class="flex flex-col items-center w-screen flex-grow">
			<slot />
		</main>
		<GlobalExternalFooter />
	</div>
</template>

<style lang="sass">
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan
</style>
