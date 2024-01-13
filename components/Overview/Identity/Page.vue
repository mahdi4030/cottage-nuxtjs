<template>
	<div class="flex flex-col space-y-4">
		<div class="flex flex-row w-full justify-center">
			<nuxt-icon name="home" class="text-2xl pr-2" filled />
			<ClientOnly>
				<div class="text-2xl font-bold text-forrest-700">
					{{ property.addressID?.street }}
					{{ property.unitNumber ? ", Apt. " + property.unitNumber : "" }}
				</div>
			</ClientOnly>
		</div>
		<div class="flex flex-col w-full items-center space-y-4">
			<p v-if="isResidentIdentityComplete" class="text-xl">We’ve got everything we need and got things handled from here!</p>
			<p v-else class="text-xl">We need a couple more details to make sure you’re all set.</p>
			<ElementsCard class="w-full max-w-4xl !p-0">
				<div class="flex flex-col divide-y divide-border">
					<div class="flex flex-col p-5">
						<ClientOnly>
							<div class="flex flex-row justify-between w-full">
								<div class="flex flex-row space-x-1">
									<div
										v-if="isResidentIdentityComplete && isResidentIdentityLoaded"
										class="bg-green-700 rounded-full h-6 w-6 flex items-center justify-center"
									>
										<nuxt-icon name="check" class="text-white text-lg" />
									</div>
									<div v-else class="h-6 w-6 flex items-center justify-center">
										<nuxt-icon name="alert-soft" class="text-xl" filled />
									</div>
									<div class="text-xl font-semibold text-forrest-700">Identity Verification Info</div>
								</div>
								<div class="hidden md:block">
									<BaseBadge v-if="!isResidentIdentityComplete && isResidentIdentityLoaded" badge-style="error">
										Missing Details
									</BaseBadge>
									<BaseBadge v-else badge-style="success"> Complete </BaseBadge>
								</div>
							</div>
							<OverviewIdentityStep1 v-if="!isResidentIdentityComplete && isResidentIdentityLoaded" />
						</ClientOnly>
					</div>
					<div class="flex flex-col p-5">
						<div
							v-if="!isResidentIdentityComplete && isResidentIdentityLoaded"
							class="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse"
						>
							<div class="flex flex-row space-x-1">
								<div class="h-6 w-6 opacity-40">
									<nuxt-icon name="plug-start" class="text-xl" filled />
								</div>
								<div class="text-xl font-semibold text-forrest-700/40">Cottage sets up your utility account</div>
							</div>
							<div>
								<BaseBadge badge-style="disabled"> Not Started </BaseBadge>
							</div>
						</div>
						<div v-else>
							<div class="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
								<div class="flex flex-row space-x-2">
									<svg
										class="motion-safe:animate-spin h-6 w-6 text-green-700"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									<div class="text-xl font-semibold text-forrest-700">
										Setting up your account to start on
										{{
											new Date(resident.startServiceDate.replace(/-/g, "\/").replace(/T.+/, "")).toLocaleDateString("en", {
												day: "numeric",
												month: "short",
												year: "numeric",
											})
										}}
									</div>
								</div>
								<div>
									<BaseBadge> Pending </BaseBadge>
								</div>
							</div>
							<p class="text-base text-textblack/80 mt-1">
								Don’t worry, you’ll have electricity the day you move in. Questions? Give us a call at
								<span class="text-green-700">(646) 847-7885</span>
							</p>
						</div>
					</div>
					<div class="flex flex-col p-5">
						<div class="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
							<div class="flex flex-row space-x-1" :class="[!isResidentIdentityComplete ? 'opacity-40' : '']">
								<div class="h-6 w-6">
									<nuxt-icon name="paper-plane" class="text-xl" filled />
								</div>
								<div class="text-xl font-semibold text-forrest-700">Share green energy with friends!</div>
							</div>
							<div>
								<BaseBadge v-if="!isResidentIdentityComplete && isResidentIdentityLoaded" badge-style="disabled">
									Not Started
								</BaseBadge>
								<BaseBadge v-else> Pending </BaseBadge>
							</div>
						</div>
						<OverviewReferralStep v-if="isResidentIdentityComplete && isResidentIdentityLoaded" />
					</div>
				</div>
			</ElementsCard>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
const { property } = useStore("property");
const { resident, checkResidentIdentity, isResidentIdentityComplete, isResidentIdentityLoaded } = useStore("resident");
const supabase = useSupabaseClient();
const user = useSupabaseUser();

onMounted(async () => {
	await checkResidentIdentity(user.value.id);
});
</script>
