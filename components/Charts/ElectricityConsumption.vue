<template>
	<div class="flex flex-col w-full h-full">
		<div class="w-full h-full">
			<client-only>
				<v-chart autoresize class="w-full h-full" :option="option" :loading="isLoading" />
			</client-only>
		</div>
	</div>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

const isLoading = ref(false);

use([CanvasRenderer, PieChart, GridComponent, ToolboxComponent, TitleComponent, TooltipComponent, LegendComponent]);

const props = defineProps({
	data: {
		type: Array,
		default() {
			return [];
		},
	},
	isLoading: {
		type: Boolean,
		default: true,
	},
});

onMounted(async () => {
	console.log("test");
	console.log(...props.data);
});

const legend = computed(() => {
	return props.data.flatMap((item) => {
		return item.name;
	});
});

const option = ref({
	tooltip: {
		trigger: "item",
		valueFormatter: (value) => "$" + value.toFixed(2),
		textStyle: {
			color: "#123233",
			fontFamily: "Harmonia",
			fontWeight: "normal",
		},
	},
	series: {
		name: "Electricity Breakdown",
		type: "pie",
		radius: ["40%", "60%"],
		avoidLabelOverlap: true,
		itemStyle: {
			borderColor: "#fff",
			borderWidth: 2,
		},
		label: {
			formatter: "{name|{b}}\n{value|${c}}",
			minMargin: 5,
			edgeDistance: 10,
			lineHeight: 15,
			fontSize: "14",
			fontFamily: "Harmonia",
			rich: {
				value: {
					fontSize: 16,
					color: "#064D47",
					fontWeight: 700,
				},
			},
		},
		labelLine: {
			show: false,
		},
		data: props.data,
	},
	color: ["#064D47", "#0D9E91", "#E7EBD5"],
});
</script>
