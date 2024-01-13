<template>
	<div class="toast">
		<div class="rounded-md p-4 shadow-md" :class="classList.outerClass">
			<div class="flex">
				<div v-if="type === 'warning'" class="flex-shrink-0">
					<ExclamationCircleIcon class="h-5 w-5 text-rose-700" aria-hidden="true" />
				</div>
				<div v-if="type === 'success'" class="flex-shrink-0">
					<CheckCircleIcon class="h-5 w-5 text-green-700" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<p class="text-base font-medium" :class="classList.textClass">
						{{ message }}
					</p>
				</div>
				<div class="ml-auto pl-3">
					<div class="-mx-1.5 -my-1.5">
						<button
							type="button"
							class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
							:class="classList.buttonClass"
							@click="dismissToast"
						>
							<span class="sr-only">Dismiss</span>
							<XCircleIcon class="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";

const { removeToast } = useToast();

const props = defineProps({
	id: {
		type: String,
		default: "",
	},
	message: {
		type: String,
		default: "",
	},
	timeout: {
		type: Number,
		default: 4000,
	},
	type: {
		type: String,
		default: "success",
	},
});

const classList = computed(() => {
	switch (props.type) {
		case "warning":
			return {
				outerClass: "bg-rose-50",
				textClass: "text-rose-700",
				buttonClass: "bg-rose-50 text-rose-700 hover:bg-rose-200/30 focus:ring-offset-rose-50 focus:ring-rose-600",
			};
		default:
			return {
				outerClass: "bg-green-50",
				textClass: "text-green-700",
				buttonClass: "bg-green-50 text-green-700 hover:bg-green-200/40 focus:ring-offset-green-50 focus:ring-green-700",
			};
	}
});

function dismissToast() {
	removeToast(props.index);
}

onMounted(() => {
	setTimeout(() => {
		// state.isToastVisible = false;
		removeToast(props.index);
	}, props.timeout);
});
</script>
