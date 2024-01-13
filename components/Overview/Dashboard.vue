<template>
	<div class="flex flex-col space-y-8">
		<div class="flex flex-row w-full">
			<nuxt-icon name="home" class="text-2xl pr-2" filled />
			<ClientOnly>
				<div class="text-2xl font-bold text-forrest-700">
					{{ property.addressID?.street }}
					{{ property.unitNumber ? ", Apt. " + property.unitNumber : "" }}
				</div>
			</ClientOnly>
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div class="col-span-1 space-y-6">
				<ElementsCard
					class=""
					card-title="Last Month's Usage"
					:card-sub-title="
						bills.length > 0
							? (monthAndYear(bills[0]?.startDate) ?? '-') + ' - ' + (monthAndYear(bills[0]?.endDate) ?? '-')
							: 'Coming Soon'
					"
				>
					<!-- <template v-slot:header><BaseButton>TEST</BaseButton></template> -->
					<div v-if="bills.length > 0" class="flex flex-row justify-between">
						<div class="text-[2.5rem] leading-10 font-bold">{{ bills[0]?.totalUsage ?? "0.00" }}<span class="text-lg"> kWh</span></div>
						<div class="flex flex-col text-right">
							<span :class="[monthToMonthDiff < 0 ? 'text-green-700' : 'text-rose-700']" class="text-2xl font-bold leading-6"
								>{{ monthToMonthDiff }}%</span
							>
							<span>from last month</span>
						</div>
					</div>
					<div v-if="bills.length <= 0" class="flex flex-col items-center">
						<nuxt-icon name="loading" class="text-5xl pb-4" filled />
						<div class="text-base text-center">
							You don't have any billing history just yet. Check back after your first billing cycle.
						</div>
					</div>
					<div v-if="bills.length > 0" class="text-center pt-2">
						<nuxt-link v-if="bills.length > 0" class="text-lg text-green-700 underline font-bold text-center" to="/app/insights">
							View Usage Summary
						</nuxt-link>
					</div>
				</ElementsCard>
			</div>
			<div class="col-span-1 space-y-6">
				<ElementsCard class="" card-title="Outstanding Balance">
					<div class="flex flex-col items-center">
						<div class="flex flex-col items-center pt-4">
							<nuxt-icon name="confetti" filled class="text-5xl" />
							<div class="text-xl pt-4">No Balance Due</div>
						</div>
					</div>
					<div class="mt-8 flex flex-col">
						<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<table class="min-w-full divide-y divide-gray-300">
									<tbody class="divide-y divide-gray-200">
										<tr v-for="bill in bills.slice(0, 3)" :key="bill.id">
											<td class="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-6 md:pl-0">
												{{ monthAndYear(bill?.startDate) ?? "-" }}
											</td>
											<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-base font-bold sm:pr-6 md:pr-0">
												${{ bill.totalAmountDue }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<nuxt-link v-if="bills.length > 0" class="text-lg text-green-700 underline font-bold text-center" to="/app/billing">
						View Bill History
					</nuxt-link>
				</ElementsCard>
			</div>
			<div class="col-span-1 space-y-6">
				<ElementsCard class="" card-title="Impact Report" card-sub-title="Coming Soon">
					<div class="flex flex-col items-center">
						<nuxt-icon name="green-impact" class="text-5xl pb-4" filled />
						<div class="text-base text-center">After your first month, come back to see just how much your positive impact is.</div>
					</div>
				</ElementsCard>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
import { monthAndYear } from "~~/utils/format";
const { occupancy } = useStore("occupancy");
const { property } = useStore("property");
const { resident } = useStore("resident");
const { getElectricityBills, loaded: isBillsLoaded, bills, fetchingData: fetchingElectricData } = useStore("electricBill");
const supabase = useSupabaseClient();

const monthToMonthDiff = computed(() => {
	if (bills.value.length >= 2) {
		const lastMonth = bills.value[1].totalUsage;
		const thisMonth = bills.value[0].totalUsage;
		return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(0);
	} else {
		return "--";
	}
});

try {
	await getElectricityBills();
} catch (e) {
	console.log(e);
}
</script>
