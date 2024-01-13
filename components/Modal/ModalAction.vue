<template>
	<div>
		<ClientOnly>
			<TransitionRoot as="template" :show="props.isModalOpen">
				<Dialog as="div" class="relative z-10" @close="cancelAction">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="ease-in duration-200"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<div class="fixed inset-0 bg-gray-300 bg-opacity-30 transition-opacity" />
					</TransitionChild>

					<div class="fixed z-10 inset-0 overflow-y-auto">
						<div class="flex items-start justify-center min-h-full p-4 text-center sm:p-0">
							<TransitionChild
								as="template"
								enter="ease-out duration-300"
								enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enter-to="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leave-from="opacity-100 translate-y-0 sm:scale-100"
								leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<DialogPanel
									class="relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 max-w-3xl w-full px-4 py-4 sm:px-10 sm:py-10"
									:class="[props.maxWidth]"
								>
									<div class="flex">
										<div class="mt-3 text-center sm:mt-0 sm:ml-4 w-full relative">
											<div v-if="closeType === 'topCorner'" class="absolute -top-4 -right-4" @click="cancelAction">
												<nuxt-icon name="close" filled class="text-xl"></nuxt-icon>
											</div>
											<h2 class="pb-4">
												<slot name="header" />
											</h2>
											<div class="mt-2">
												<slot name="body" />
											</div>
										</div>
									</div>
									<div v-if="showButtons" class="flex flex-col md:flex-row mt-8 justify-center space-y-4 md:space-y-0 md:space-x-8">
										<BaseButton
											v-if="closeType !== 'topCorner'"
											class="w-full md:w-72"
											:btn-style="'px-4 text-lg'"
											btn-type="line"
											@click="cancelAction"
										>
											{{ cancelButtonText }}
										</BaseButton>
										<BaseButton
											class="w-full md:w-72"
											:btn-style="'px-4 text-lg'"
											:btn-type="confirmButtonType"
											@click="confirmAction"
										>
											{{ confirmButtonText }}
										</BaseButton>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</TransitionRoot>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

const props = defineProps({
	modalTitle: {
		type: String,
		default: "Default modal title",
	},
	modalContent: {
		type: String,
		default: "",
	},
	cancelButtonText: {
		type: String,
		default: "Cancel",
	},
	confirmButtonText: {
		type: String,
		default: "Discard",
	},
	confirmButtonType: {
		type: String,
		default: "warning",
	},
	isModalOpen: {
		type: Boolean,
		default: false,
	},
	maxWidth: {
		type: String,
		default: "max-w-3xl",
	},
	closeType: {
		type: String,
		default: "default",
	},
	showButtons: {
		type: Boolean,
		default: true,
	},
});
const emit = defineEmits(["cancelAction", "confirmAction"]);

function cancelAction() {
	emit("cancelAction");
}
function confirmAction() {
	emit("confirmAction");
}
</script>
