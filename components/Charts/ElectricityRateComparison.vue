<template>
	<div class="flex flex-col w-full">
		<div class="font-semibold text-lg md:text-xl text-center">Est. Total Electricity Bill for Previous 12 Months</div>
		<div class="w-full h-96">
			<client-only>
				<v-chart class="w-full h-full" :option="option" />
			</client-only>
		</div>
		<div class="flex flex-row px-12 pt-4 space-x-24 justify-center">
			<div v-for="(item, index) in series" :key="item.name" class="">
				<div class="text-lg font-semibold">{{ item.name }}</div>
				<div class="font-semibold">
					<div class="text-4xl font-extrabold" :style="'color:' + option.color[index]">
						${{ (item.data.reduce((a, b) => a + b) / item.data.length).toFixed(2) }}
					</div>
					<div>Avg. Monthly Bill</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

const xAxis = computed(() => {
	const legend = [];
	const d = new Date();
	d.setMonth(d.getMonth() - 1);
	d.setDate(1);
	for (let i = 0; i <= 11; i++) {
		legend.push(d.toLocaleDateString("en", { month: "short", year: "2-digit" }));
		d.setMonth(d.getMonth() - 1);
	}
	return legend.reverse();
});

use([CanvasRenderer, LineChart, GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent]);

// provide(THEME_KEY, "dark");

const props = defineProps({
	series: {
		type: Array,
		default() {
			return [];
		},
	},
});

const legend = computed(() => {
	return props.series.flatMap((item) => {
		return item.name;
	});
});

const option = ref({
	tooltip: {
		trigger: "axis",
		valueFormatter: (value) => "$" + value.toFixed(2),
		textStyle: {
			color: "#123233",
			fontFamily: "Harmonia",
			fontWeight: "normal",
		},
	},
	legend: {
		data: legend,
		textStyle: {
			color: "#123233",
			fontWeight: "bold",
			fontFamily: "Harmonia",
			fontSize: "16",
		},
		padding: 16,
		itemGap: 30,
	},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: xAxis.value,
	},
	yAxis: {
		type: "value",
	},
	series: props.series,
	color: ["#18A57B", "#194D3E", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
});
</script>
