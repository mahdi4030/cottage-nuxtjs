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
			<p v-if="electricAccount.isAccountLinkedWithUtility" class="text-xl">
				Good to go! We've got everything we need to get you renewable energy.
			</p>
			<p v-else class="text-xl">Before we can get you renewable energy, we need to link with your utility account.</p>
			<ElementsCard class="w-full max-w-4xl !p-0">
				<div class="flex flex-col divide-y divide-border">
					<div class="flex flex-col p-5">
						<ClientOnly>
							<div class="flex flex-row justify-between w-full">
								<div class="flex flex-row space-x-1">
									<div
										v-if="electricAccount.isAccountLinkedWithUtility"
										class="bg-green-700 rounded-full h-6 w-6 flex items-center justify-center"
									>
										<nuxt-icon name="check" class="text-white text-lg" />
									</div>
									<div v-else class="h-6 w-6 flex items-center justify-center">
										<nuxt-icon name="alert-soft" class="text-xl" filled />
									</div>
									<div class="text-xl font-semibold text-forrest-700">Link Utility Account</div>
								</div>
								<div class="hidden md:block">
									<BaseBadge v-if="!electricAccount.isAccountLinkedWithUtility" badge-style="error"> Action Needed </BaseBadge>
									<BaseBadge v-else badge-style="success"> Complete </BaseBadge>
								</div>
							</div>
							<UtilityConnectForm />
						</ClientOnly>
					</div>
					<div class="flex flex-col p-5">
						<div class="flex flex-col-reverse md:flex-row justify-between w-full space-y-2 md:space-y-0 space-y-reverse">
							<div class="flex flex-row space-x-1" :class="[!electricAccount.isAccountLinkedWithUtility ? 'opacity-40' : '']">
								<div class="h-6 w-6">
									<nuxt-icon name="paper-plane" class="text-xl" filled />
								</div>
								<div class="text-xl font-semibold text-forrest-700">Share green energy with friends!</div>
							</div>
							<div>
								<BaseBadge v-if="!electricAccount.isAccountLinkedWithUtility" badge-style="disabled"> Not Started </BaseBadge>
								<BaseBadge v-else> Pending </BaseBadge>
							</div>
						</div>
						<OverviewReferralStep v-if="electricAccount.isAccountLinkedWithUtility" />
					</div>
				</div>
			</ElementsCard>
			<div v-if="electricAccount.isAccountLinkedWithUtility" class="flex items-center justify-center py-2">
				<BaseButton @click="updateResidentRegistrationValue">Go to Dashboard</BaseButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
const { property } = useStore("property");
const { resident, updateResident } = useStore("resident");
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { electricAccount } = useStore("electricAccount");

async function updateResidentRegistrationValue() {
	await updateResident({
		isRegistrationComplete: true,
	});
}
</script>
