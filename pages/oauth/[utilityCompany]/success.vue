<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
					<h2 class="pb-4">You're plugged in!</h2>
					<nuxt-icon name="plug-success" class="py-4" style="font-size: 5rem" filled />
					<div class="flex flex-col w-full max-w-lg pt-4">
						<div class="text-forrest-700 text-xl text-center">Your account is now connected to Cottage</div>
						<BaseButton btn-type="primary" btn-style="w-full" class="flex mt-8 w-full" btn-size="large" @click="goToDashboard">
							Go to Dashboard
						</BaseButton>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
// So TYPESCRIPT does not throw a "Cannot Redeclare Block Scope Variable"
export {};
</script>
<script setup lang="ts">
async function goToDashboard() {
	const electricCompany = useCookie("electricCompany");

	const greenButtonBody = {
		provider: electricCompany.value,
		operations: ["meter readings", "customer data", "billing summaries", "historic data"],
	};
	$fetch("/api/_private/sync-green-button", {
		method: "post",
		body: greenButtonBody,
	});
	navigateTo("/app/overview");
}

definePageMeta({
	layout: "oauth",
});
</script>
<style></style>
