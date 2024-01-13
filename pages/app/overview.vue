<template>
	<div>
		<ClientOnly>
			<OverviewDashboard v-if="resident.isRegistrationComplete" />
			<OverviewIdentityPage
				v-else-if="
					!resident.isRegistrationComplete &&
					(electricAccount?.status === ElectricStatus.NEW || electricAccount?.status === ElectricStatus.PENDING_CREATE)
				"
			/>
			<OverviewUtilityLinkPage
				v-else-if="
					!resident.isRegistrationComplete &&
					(electricAccount?.status === ElectricStatus.PENDING_LINK || electricAccount?.status === ElectricStatus.ACTIVE)
				"
			/>
			<div v-else>
				<div class="py-16 flex flex-row items-center justify-center">
					<nuxt-icon name="logo-flattened-animated" style="font-size: 160px; stroke-width: 4" filled />
				</div>
			</div>
		</ClientOnly>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
import { ElectricStatus } from "~/types/Enums";
const { resident } = useStore("resident");
const { electricAccount } = useStore("electricAccount");
definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});
</script>
