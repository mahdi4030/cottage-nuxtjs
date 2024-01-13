<template>
	<div class="bg-white border border-border rounded-xl p-6 shadow flex flex-col">
		<div v-if="cardTitle || cardSubTitle" class="flex flex-row justify-between items-center">
			<div class="flex flex-col pb-2">
				<div v-if="cardTitle" class="text-xl font-bold text-forrest">
					{{ cardTitle }}
				</div>
				<div v-if="cardSubTitle" class="text-sm text-textblack/80 pt-1">
					{{ cardSubTitle }}
				</div>
			</div>
			<div>
				<slot name="header" />
			</div>
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	cardTitle: {
		type: String,
		default: "",
	},
	cardSubTitle: {
		type: String,
		default: "",
	},
});
</script>
