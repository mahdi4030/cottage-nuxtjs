<template>
	<div class="w-screen flex flex-col px-4">
		<div class="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
			<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl items-center w-full">
				<h2 class="text-center leading-tight">Connecting the wires...</h2>
				<div class="flex flex-col md:px-20 py-8 w-full text-center items-center max-w-2xl">
					<div class="py-12">
						<nuxt-icon name="logo-flattened-animated" style="font-size: 160px; stroke-width: 4" filled />
					</div>
				</div>
			</ElementsCard>
		</div>
	</div>
</template>

<script lang="ts">
// So TYPESCRIPT does not throw a "Cannot Redeclare Block Scope Variable"
export {};
</script>
<script setup lang="ts">
const { loaded: greenButtonLoaded, greenButton } = useStore("greenButtonOAuth");
const { registration } = useStore("registration");
const { serviceGroup } = useStore("regServices");
const user = useSupabaseUser();

const route = useRoute();
const utilityCompany = route.params.utilityCompany;

onMounted(async () => {
	const route = useRoute();
	try {
		const code = route.query.code;
		if (code === undefined || code === null) {
			throw "Code is undefined!";
		}
		console.log(greenButton.value);
		const res = await $fetch("/oauth/callback/" + utilityCompany, {
			method: "post",
			body: {
				code,
				user: {
					id: user.value.id,
					email: user.value.email,
				},
				greenButton: {
					startDate: greenButton.value.startDate ?? "",
					endDate: greenButton.value.endDate ?? "",
				},
				electricCompany: serviceGroup.value.electricCompanyID.id ?? "",
			},
		});
		// console.log(res);
		greenButtonLoaded.value = true;
		greenButton.value.accessToken = res.accessToken;
		greenButton.value.subscriptionID = res.subscriptionID;

		// const isRegistrationComplete = user.value.user_metadata.isRegistrationComplete ?? false;
		// if (!isRegistrationComplete) {
		// 	registration.value.isUtilityLinkError = false;
		// 	registration.value.utilityElectricAccount.isUtilityAccountLinked = true;
		// 	return navigateTo("/onboarding/finish");
		// } else {
		// 	return navigateTo("/oauth/" + utilityCompany + "/success");
		// }
		return navigateTo("/oauth/" + utilityCompany + "/success");
	} catch (error) {
		console.log(error.data);

		// const isRegistrationComplete = user.value.user_metadata.isRegistrationComplete ?? false;
		// if (!isRegistrationComplete) {
		// 	registration.value.isUtilityLinkError = true;
		// 	registration.value.utilityElectricAccount.isUtilityAccountLinked = false;
		// 	return navigateTo("/onboarding/finish");
		// } else {
		// 	return navigateTo("/oauth/" + utilityCompany + "/error");
		// }
		return navigateTo("/oauth/" + utilityCompany + "/error");
	}
});

definePageMeta({
	layout: "oauth",
});
</script>
<style></style>
