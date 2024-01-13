<template>
	<div class="w-screen flex flex-col px-4">
		<section class="w-full">
			<div class="flex flex-col mt-6 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
				<ElementsCard class="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-3xl items-center w-full">
					<h2 class="pb-4">Increase the sharing timeframe</h2>
					<div class="flex flex-col w-full max-w-2xl pt-4">
						<div class="text-forrest-700 text-lg text-center">
							To make sure Cottage can continously work in the background for you, we need ongoing access to your usage. When prompted
							to select a timeframe, select
							<b>Share it until I revoke it</b>
							from the drop down.
						</div>
						<img class="object-cover w-full py-4" src="~/assets/img/coned/coned-share-timeframe.png" alt="" />
						<BaseButton btn-type="primary" btn-style="w-full" class="flex mt-8 w-full" btn-size="large" @click="navigateToRedirect">
							Retry
						</BaseButton>
					</div>
				</ElementsCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
// const { serviceGroup } useRegServices
const { oAuthConfig } = useUtilityIntegration();

function navigateToRedirect() {
	window.location.href = oAuthConfig().SCOPES_REDIRECT_URL;
}

definePageMeta({
	layout: "oauth",
});
</script>
<style></style>
