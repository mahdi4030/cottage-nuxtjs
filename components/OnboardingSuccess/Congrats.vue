<template>
	<div class="flex flex-col items-center">
		<div class="flex flex-col pt-4 max-w-3xl mx-auto">
			<p class="text-center">We’ll take it from here!</p>
		</div>
		<nuxt-icon name="confetti" class="py-4" style="font-size: 5rem" filled />
		<p class="text-center py-4 max-w-2xl">
			Thanks for taking the time to take control of your electricity. <br />
			<b>We think you’re super cool for that.</b>
		</p>
		<p class="text-center pt-4 pb-4">
			If you have any questions, contact us at
			<a href="mailto:support@energybycottage.com" class="text-green-700 font-semibold underline">info@energybycottage.com</a>
			or
			<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
		</p>
		<div class="flex flex-row items-center w-full justify-center">
			<BaseButton btn-type="primary" class="flex mt-8" btn-size="large" @click="goToDashboard">Go to Dashboard</BaseButton>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
const { registration, reset: resetRegistration } = useStore("registration");

async function goToDashboard() {
	resetRegistration();
	navigateTo("/app/overview");
}
</script>

<style></style>
