<template>
	<div
		class="md:mt-4 flex md:flex-row items-start md:items-center w-full space-y-4 md:space-y-0 space-x-0 md:space-x-8 flex-col-reverse space-y-reverse"
		:class="[
			!showPrevious || !showNext ? ' justify-center' : ' justify-between ',
			isFixedToBottom
				? 'fixed bottom-0 bg-white left-0 px-4 z-50 py-4 border-t-2 border-border md:bg-transparent md:relative md:px-0 md:py-0 md:border-0'
				: '',
		]"
	>
		<BaseButton
			v-if="showPrevious"
			:class="[!isFixedToBottom ? 'w-full md:w-56' : 'w-72 md:w-56']"
			btn-size="large"
			btn-type="transparent"
			@click="navigatePrevious"
			>Back</BaseButton
		>
		<BaseButton
			v-if="showNext"
			:class="[showPrevious ? 'w-full md:w-56' : 'w-72 md:w-56']"
			:is-disabled="isNextDisabled"
			btn-size="large"
			:btn-style="[
				'font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
				processingRequest ? 'cursor-not-allowed' : '',
			]"
			@click="navigateNext"
		>
			<div v-if="!processingRequest">{{ nextButtonText }}</div>
			<div v-if="processingRequest" class="inline-flex items-center space-x-2">
				<svg class="animate-spin -mt-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span>{{ processingRequestText }}</span>
			</div>
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	isNextDisabled: {
		type: Boolean,
		required: true,
	},
	nextButtonText: {
		type: String,
		default: "Continue",
	},
	navBtnStyle: {
		type: String,
		default: "",
	},
	showPrevious: {
		type: Boolean,
		default: true,
	},
	showNext: {
		type: Boolean,
		default: true,
	},
	processingRequest: {
		type: Boolean,
		default: false,
	},
	processingRequestText: {
		type: String,
		default: "Processing...",
	},
	isFixedToBottom: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["nextPage", "previousPage"]);

function navigateNext() {
	emit("nextPage");
}
function navigatePrevious() {
	emit("previousPage");
}
</script>
