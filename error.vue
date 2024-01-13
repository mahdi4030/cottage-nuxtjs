<template>
	<div class="flex items-center flex-col min-h-screen bg-tan-200">
		<GlobalExternalHeader />
		<main class="flex flex-1 flex-col items-center w-screen">
			<div class="w-screen flex flex-col">
				<section class="w-full px-4">
					<div class="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
						<ElementsCard class="flex flex-col text-center justify-center items-center md:p-12 max-w-4xl w-full">
							<h4>404 Error</h4>
							<h1 class="pb-4 my-4">
								Oops!
								<br />
								I think we messed up
							</h1>
							<div class="max-w-xs text-forrest-700 text-xl">It looks like this page does not exist</div>
							<div class="text-lg md:text-xl text-textblack text-center pt-8">
								Contact support at
								<a href="mailto:support@energybycottage.com" class="text-green-700 font-semibold underline">
									info@energybycottage.com
								</a>
								or
								<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
							</div>
							<div class="flex flex-row items-center justify-center w-full pt-6 space-x-4">
								<BaseButton btn-size="base" btn-style="" btn-type="primary" class="flex pt-6" @click="handleError">
									Go back home
								</BaseButton>
								<!-- <BaseButton @click="handleError" btnSize="base" btnStyle="" btnType="line" class="flex pt-6"> Contact Support </BaseButton> -->
							</div>
						</ElementsCard>
					</div>
				</section>
			</div>
			<!-- customise 404 message from template section -->

			<slot />
		</main>
		<GlobalExternalFooter />
	</div>
</template>

<script setup>
// default props available on error.vue
const props = defineProps({
	error: Object,
});

definePageMeta({
	layout: "default",
});

// customise 404 message from script section
const error = useError();
if (error.value.statusCode === 404) {
	error.value.message = "[script]: Oops! Page not found 😔";
}

// clear error and redirect to home page
const handleError = () => clearError({ redirect: "/" });
</script>

<style lang="sass">
html
  font-family: 'Harmonia', 'Helvetica Neue', sans-serif
  font-size: 16px
  overflow-x: hidden
  background: $bg-tan
</style>
