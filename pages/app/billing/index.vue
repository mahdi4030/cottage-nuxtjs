<template>
	<div class="flex flex-col w-full text-left z-10">
		<div class="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
			<ElementsCard class="p-8 items-start md:w-1/3">
				<h3>Last Month's Bill</h3>
				<div v-show="!isBillsLoaded" class="py-8 m-auto w-full">
					<div class="animate-pulse flex space-x-6">
						<div class="flex flex-col space-y-4">
							<div class="h-2 bg-border rounded"></div>
							<div class="rounded-lg bg-border h-14 w-32"></div>
						</div>
						<div class="flex flex-1 space-y-4 items-end justify-end flex-col">
							<div class="h-2 bg-border rounded w-1/2"></div>
							<div class="h-2 bg-border rounded w-1/2"></div>
						</div>
					</div>
				</div>
				<div v-show="isBillsLoaded" class="h-full w-full">
					<div class="flex flex-row pb-2 pt-2 text-textblack/80">
						<span>
							{{ monthAndYear(bills[0]?.startDate) ?? "-" }} -
							{{ monthAndYear(bills[0]?.endDate) ?? "-" }}
						</span>
					</div>
					<div class="flex flex-row justify-between">
						<div class="text-[2.5rem] leading-10 font-bold">${{ bills[0]?.totalAmountDue.toFixed(2) ?? "0.00" }}</div>
						<!-- <div class="flex flex-col text-right">
							<span class="text-green-700 text-2xl font-bold leading-6"
								>${{ bills[0]?.totalAmountDue.toFixed(2).length > 0 ? "10.00" : "0.00" }}</span
							>
							<span>Savings on Bill</span>
						</div> -->
					</div>
					<div v-if="bills.length > 0" class="text-center mt-4">
						<nuxt-link class="text-lg text-green-700 underline font-bold text-center" :to="`/app/billing/${bills[0].id}`">
							View Detailed Calculations
						</nuxt-link>
					</div>
				</div>
			</ElementsCard>
			<ElementsCard v-if="occupancy !== null" class="p-8 md:w-1/3">
				<h3>Outstanding Balance</h3>
				<div v-show="!isBillsLoaded" class="py-8 m-auto w-full">
					<div class="animate-pulse flex space-x-6">
						<div class="flex flex-col space-y-4">
							<div class="h-2 bg-border rounded"></div>
							<div class="rounded-lg bg-border h-14 w-32"></div>
						</div>
						<div class="flex flex-1 space-y-4 items-end justify-end flex-col">
							<div class="h-2 bg-border rounded w-1/2"></div>
							<div class="h-2 bg-border rounded w-1/2"></div>
						</div>
					</div>
				</div>
				<div v-show="isBillsLoaded" class="h-full w-full flex flex-col">
					<div class="flex flex-row pb-2 pt-2">
						<nuxt-icon name="circle-check" class="text-base mt-[2px] mr-1" filled />
						Auto-pay Scheduled for {{ monthAndYear(bills[0]?.endDate) ?? "-" }}
					</div>
					<div class="text-[2.5rem] leading-10 font-bold">${{ bills[0]?.totalAmountDue.toFixed(2) ?? "0.00" }}</div>
					<nuxt-link class="text-lg text-center text-green-700 mt-2 font-bold underline" to="/app/account#billing">
						Edit Payment Method
					</nuxt-link>
				</div>
			</ElementsCard>
			<ElementsCard class="p-8 md:w-1/3">
				<h3>Renewable Subscription</h3>
				<div v-show="!isBillsLoaded" class="py-8 m-auto w-full">
					<div class="animate-pulse flex space-x-6">
						<div class="flex flex-col space-y-4">
							<div class="h-2 bg-border rounded"></div>
							<div class="rounded-lg bg-border h-14 w-32"></div>
						</div>
						<div class="flex flex-1 space-y-4 items-end justify-end flex-col">
							<div class="h-2 bg-border rounded w-1/2"></div>
							<div class="h-2 bg-border rounded w-1/2"></div>
						</div>
					</div>
				</div>
				<div v-if="isBillsLoaded && renewableSubscription" class="h-full w-full flex flex-col">
					<div class="flex flex-row pb-2 pt-2">
						<nuxt-icon name="circle-check" class="text-base mt-[2px] mr-1" filled />
						Next Payment {{ firstDateOfNextMonth }}
					</div>
					<div class="text-[2.5rem] leading-10 font-bold">
						${{ renewableSubscription.renewableSubscriptionPlan.costPerMonth }}<span class="text-lg">/mth</span>
					</div>
					<nuxt-link to="/app/power-ups" class="text-lg text-center text-green-700 mt-2 font-bold underline cursor-pointer">
						Edit Subscription
					</nuxt-link>
				</div>
				<div v-else-if="isBillsLoaded" class="h-full w-full flex flex-col items-center">
					<div class="flex flex-row pt-2 text-textblack/80">No Active Subscription</div>
					<div class="text-2xl leading-10 font-bold">Not Enrolled 😢</div>
					<nuxt-link to="/app/power-ups" class="text-lg text-center text-green-700 mt-2 font-bold underline cursor-pointer">
						Start Using Green Energy
					</nuxt-link>
				</div>
			</ElementsCard>
		</div>
		<div class="flex w-full mt-6">
			<ElementsCard class="text-left items-start w-full">
				<div v-show="!isBillsLoaded" class="py-8 m-auto">
					<nuxt-icon name="logo-flattened-animated" style="font-size: 120px; stroke-width: 4" filled />
				</div>
				<div v-show="isBillsLoaded" class="w-full">
					<h3 class="mb-4">Your Utility Billing History</h3>
					<div class="-mx-4 mt-2 ring-1 ring-border sm:-mx-6 md:mx-0 md:rounded-lg">
						<table class="min-w-full divide-y divide-border">
							<thead>
								<tr>
									<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textblack sm:pl-6">Month</th>
									<th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
										Bill Total
									</th>
									<th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-textblack lg:table-cell">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(bill, billIndex) in bills" :key="bill.id">
									<td :class="[billIndex === 0 ? '' : 'border-t border-transparent', 'relative py-4 pl-4 sm:pl-6 pr-3 text-sm']">
										<div class="text-lg text-textblack">
											{{ dayAndMonthAndYear(bill?.startDate) ?? "-" }} - {{ dayAndMonthAndYear(bill?.endDate) ?? "-" }}
										</div>
										<div v-if="billIndex !== 0" class="absolute right-0 left-6 -top-px h-px bg-gray-200" />
									</td>
									<td :class="[billIndex === 0 ? '' : 'border-t border-gray-200', 'px-3 py-3.5 text-textblack text-lg table-cell']">
										${{ bill?.totalAmountDue }}
									</td>
									<td
										:class="[billIndex === 0 ? '' : 'border-t border-gray-200', 'hidden px-3 py-3.5 text-gray-500 lg:table-cell']"
									>
										<BaseBadge badge-style="success">Paid</BaseBadge>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</ElementsCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { monthAndYear, dayAndMonthAndYear } from "~~/utils/format";
const { occupancy } = useStore("occupancy");
const { serviceGroup } = useStore("regServices");
const { renewableSubscription } = useStore("renewableSubscription");

definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});

const { getElectricityBills, loaded: isBillsLoaded, bills } = useStore("electricBill");
const hasErrors = ref(false);

const firstDateOfNextMonth = computed(() => {
	const date = new Date();
	return new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleDateString();
});

onMounted(async () => {
	try {
		await getElectricityBills();
	} catch (e) {
		hasErrors.value = true;
	}
});
</script>
