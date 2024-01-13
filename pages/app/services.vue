<template>
	<div class="flex items-center flex-col">
		<h2 class="my-4">Service Your Account with Cottage</h2>
		<div class="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-6 w-full">
			<ElementsCard class="w-full lg:w-1/3">
				<!-- <template v-slot:header><BaseButton>TEST</BaseButton></template> -->
				<nuxt-icon name="logistics" class="text-3xl pb-2" filled />
				<div class="text-xl font-bold text-forrest-700">Moving to a New Address?</div>
				<p>If you are moving, we can help you set up your utilities at your new place.</p>
				<a class="block text-xl text-green-700 underline mt-2" href="mailto:support@energybycottage.com">Transfer My Address</a>
			</ElementsCard>
			<ElementsCard class="w-full lg:w-1/3 flex">
				<nuxt-icon name="stop-service" class="text-3xl pb-2" filled />
				<div class="text-xl font-bold text-forrest-700">Stop Service</div>
				<p>Moving out? Let us know so we can stop your service.</p>
				<a class="block text-xl text-green-700 underline mt-2" href="mailto:support@energybycottage.com">Stop Service</a>
			</ElementsCard>
		</div>
		<h2 class="my-10">
			Services Provided by
			{{ electricAccount?.electricCompanyID.name }}
		</h2>
		<div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 w-full">
			<ElementsCard class="w-full lg:w-1/3">
				<nuxt-icon name="whistle" class="text-3xl pb-2" filled />
				<div class="text-xl font-bold text-forrest-700">Have an issue with your service?</div>
				<p>Report a service problem to your utility provider so they can provide assistance.</p>
				<a :href="electricAccount?.electricCompanyID.reportOutageURL" class="block text-xl text-green-700 underline mt-2" target="_blank">
					Report an Outage
				</a>
			</ElementsCard>
			<ElementsCard class="w-full lg:w-1/3">
				<nuxt-icon name="map" class="text-3xl pb-2" filled />
				<div class="text-xl font-bold text-forrest-700">View Outage Map</div>
				<p>See outages reported in your area.</p>
				<a :href="electricAccount?.electricCompanyID.outageMapURL" class="block text-xl text-green-700 underline mt-2" target="_blank">
					View Map
				</a>
			</ElementsCard>
			<ElementsCard class="w-full lg:w-1/3">
				<nuxt-icon name="loading" class="text-3xl pb-2" filled />
				<div class="text-xl font-bold text-forrest-700">Check Outage Status</div>
				<p>If you have already reported an outage, check your status with the utility provider.</p>
				<a
					:href="electricAccount?.electricCompanyID.checkOutageStatusURL"
					class="block text-xl text-green-700 underline mt-2"
					target="_blank"
				>
					Check Status
				</a>
			</ElementsCard>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
const config = useRuntimeConfig();
const { electricAccount } = useStore("electricAccount");

definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});
</script>
