<template>
	<ElementsCard class="items-center text-center lg:p-16 w-full">
		<nuxt-icon name="lifesaver" class="min-w-fit text-6xl leading-4 pb-3" filled />
		<h2 class="py-4">We are here to help</h2>
		<div class="py-4 text-xl">Our crew is on standby for service and support</div>
		<div class="py-4 text-lg">
			Responses within 30 minutes
			<br />
			Monday-Friday
			<br />
			8:00AM — 6:00PM EST
			<br />
		</div>
		<div class="flex flex-col md:flex-row font-semibold pb-12 w-full justify-center py-8 space-y-8 md:space-y-0 md:space-x-10">
			<div class="flex flex-col w-72">
				<nuxt-icon name="chat" class="m-auto min-w-fit text-5xl leading-4 pb-3" filled />
				Chat
				<nuxt-link class="block text-green-700 underline pt-2 text-xl" to="#">Start a Chat</nuxt-link>
			</div>
			<div class="flex flex-col w-72">
				<nuxt-icon name="paper-plane" class="m-auto min-w-fit text-5xl leading-4 pb-3" filled />
				Email
				<a class="block text-green-700 underline pt-2 text-xl" href="mailto:support@energybycottage.com">support@energybycottage.com</a>
			</div>
			<div class="flex flex-col w-72">
				<nuxt-icon name="search" class="m-auto min-w-fit text-5xl leading-4 pb-3" filled />
				FAQs
				<nuxt-link class="block text-green-700 underline pt-2 text-xl" to="#">Visit Help Center</nuxt-link>
			</div>
		</div>
		<div class="text-lg">
			If you are experiencing issues with your electricity, you will need to work with the utility company.
			<br />
			Visit our
			<nuxt-link class="text-green-700 underline mt-3 font-semibold" to="/app/services">services</nuxt-link>
			to review your options.
		</div>
	</ElementsCard>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});
</script>
