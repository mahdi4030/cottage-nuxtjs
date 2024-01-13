<template>
	<div class="flex items-center flex-col min-h-screen bg-tan-200">
		<header class="flex flex-col w-full pt-6 items-center px-4">
			<div>
				<nuxt-link to="/">
					<CottageLogoSVG class="h-auto w-40" />
				</nuxt-link>
			</div>
		</header>
		<main class="flex flex-1 flex-col items-center w-screen flex-grow">
			<slot />
		</main>
		<GlobalExternalFooter />
	</div>
</template>

<script setup lang="ts">
import CottageLogoSVG from "~/assets/img/logo/cottage-logo-combined-green.svg?component";
</script>

<style lang="sass">
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan
</style>
