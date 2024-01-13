<template>
	<div>
		<div class="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
			<ElementsCard class="text-center items-center w-full md:w-3/4 inline-block">
				<div class="flex justify-between w-full">
					<h3>Energy Consumption</h3>
					<!-- <div class="flex flex-row">
						<BaseButton
							v-for="granularity in Object.keys(granularities).map((key) => granularities[key])"
							:key="granularity"
							btn-size="small"
							btn-style="!rounded-full"
							:btn-type="activeGranularity == granularity.stateValue ? `primary` : `line`"
							class="flex mr-2"
							@click="granularity.select()"
						>
							{{ granularity.displayText }}
						</BaseButton>
					</div> -->
				</div>
				<div v-if="!electricAccount?.isAccountLinkedWithUtility" class="py-8 flex flex-col items-center justify-center flex-grow space-y-4">
					<nuxt-icon name="linked" class="min-w-fit text-5xl" filled />
					<div class="text-lg leading-tight">You still need to connect your utility account to take full advantage of Cottage</div>
					<BaseButton to="/app/account#utility-account">Connect My Account</BaseButton>
				</div>
				<div v-else-if="!loaded" class="py-8">
					<nuxt-icon name="logo-flattened-animated" style="font-size: 120px; stroke-width: 4" filled />
				</div>
				<ChartsInsights v-else-if="loaded && bills.length > 0" :chart-data="chartData" />
				<div v-else class="py-8 flex flex-col items-center justify-center flex-grow">
					<nuxt-icon name="loading" class="text-5xl pb-4" filled />
					<p>
						It doesn't look like you have any usage history just yet. <br />
						Check back later.
					</p>
				</div>
			</ElementsCard>
			<div class="flex flex-col space-y-4 w-full md:w-1/4">
				<ElementsCard class="text-left w-full py-8">
					<div class="flex flex-row space-x-4">
						<nuxt-icon name="savings" class="text-[2rem]" filled />
						<div class="text-[2.5rem] font-bold leading-none text-green-700">$0</div>
					</div>
					<p class="text-textblack/80 pt-1">Savings to Date</p>
				</ElementsCard>
				<ElementsCard class="text-left w-full py-8">
					<div class="flex flex-row space-x-4">
						<nuxt-icon name="green-impact" class="text-[2rem]" filled />
						<div class="text-[2.5rem] font-bold leading-none">0 <span class="text-xl">kWh</span></div>
					</div>
					<p class="text-textblack/80 pt-1">Clean Energy Generated</p>
				</ElementsCard>
				<ElementsCard class="text-left w-full py-8">
					<div class="flex flex-row space-x-4">
						<nuxt-icon name="forrest" class="text-[2rem]" filled />
						<div class="text-[2.5rem] font-bold leading-none">0</div>
					</div>
					<p class="text-textblack/80 pt-1">Equivalent Trees Planted</p>
				</ElementsCard>
			</div>
			<!-- <ElementsCard class="p-9 text-left items-start w-1/3 h-fit m-5 inline-block text-white bg-forrest-700">
				<nuxt-icon name="desk" class="min-w-fit text-2xl mr-3" filled />
				<h3 class="text-white">Get Started</h3>
				<p>
					Your employer might be willing to pay for your electricity usage while you work from home. Generate a report that shows your
					electricity consumption during your working hours.
				</p>
				<nuxt-link class="text-xl text-white underline font-bold text-center mt-4">
					Learn More
					<ArrowRightIcon class="inline h-4 w-4" />
				</nuxt-link>
			</ElementsCard> -->
		</div>
		<h3 class="pb-2 mt-6">Energy Saving Tips</h3>
		<div class="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0">
			<ElementsCard v-for="t in tips" :key="t.id" class="text-left items-start w-full md:w-1/3">
				<div class="text-xl font-bold text-forrest-700 leading-tight pb-1">{{ t.title }}</div>
				<p>
					{{ t.body }}
				</p>
				<!-- <nuxt-link class="text-xl underline font-bold text-center mt-4 text-green-700">Learn More</nuxt-link> -->
			</ElementsCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ElectricBill } from "~~/types/ElectricBill";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
const user = useSupabaseUser();
const { electricAccount } = useStore("electricAccount");

definePageMeta({
	layout: "app",
	middleware: ["auth", "app"],
});

const hasErrors: Ref = ref(false);
const barSeries: Ref = ref([]);
const lineSeries: Ref = ref([]);
const activeGranularity: Ref = ref("YEAR");
const { getElectricityBills, bills, loaded } = useStore("electricBill");
const { occupancy } = useStore("occupancy");
// In case we have additional granularities to take care of - By quarter, by multiple years, etc.
// We have this object to expand without duplicating a lot of code for that
const granularities: Record<string, unknown> = {
	YEAR: {
		displayText: "Year",
		select: () => {
			activeGranularity.value = "YEAR";
		},
		stateValue: "YEAR",
	},
	MONTH: {
		displayText: "Month",
		select: () => {
			activeGranularity.value = "MONTH";
		},
		stateValue: "MONTH",
	},
	WEEK: {
		displayText: "Week",
		select: () => {
			activeGranularity.value = "WEEK";
		},
		stateValue: "WEEK",
	},
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const chartData = computed(() => {
	const billsToSort = [...bills.value];
	const sortedBills = billsToSort.sort(function (a, b) {
		return new Date(a.startDate) - new Date(b.startDate);
	});
	return sortedBills;
});

try {
	await getElectricityBills();
	// console.log(chartData.value);
	// granularities.YEAR.select();
} catch (e) {
	hasErrors.value = true;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tips = computed(() => {
	return [
		{
			id: "1",
			title: "Lower your thermostat",
			icon: "add-user",
			body: "Each degree over 68°F can increase your energy usage by 3 percent.",
			link: "",
		},
		{
			id: "2",
			title: "Consider a cold wash",
			icon: "add-user",
			body: "Switching your temperature setting from hot to cold can cut energy use in half for washing one load.",
			link: "",
		},
		{
			id: "3",
			title: "Make Your Refrigerator Run More Efficiently",
			icon: "add-user",
			body: "Clean the coils yearly and set the temperature to 38°F to conserve energy effortlessly.",
			link: "",
		},
	];
});
</script>
