<template>
	<div>
		<ClientOnly>
			<TransitionRoot as="template" :show="props.isModalOpen">
				<Dialog as="div" class="relative z-50" :initial-focus="closeButtonRef" @close="closeModal">
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
									class="relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 w-full px-4 py-4 sm:px-10 sm:py-10"
									:class="[props.maxWidth]"
								>
									<div class="flex">
										<div class="mt-3 text-center sm:mt-0 sm:ml-4 w-full relative">
											<div v-if="closeType === 'topCorner'" class="absolute -top-2 -right-2" @click="closeModal">
												<nuxt-icon name="close" filled class="text-xl"></nuxt-icon>
											</div>
											<h2><slot name="header" /></h2>
											<div class="mt-2">
												<slot name="body" />
											</div>
										</div>
									</div>
									<div v-if="closeType === 'default'" class="flex flex-row mt-4 items-center justify-center">
										<BaseButton
											ref="closeButtonRef"
											class="px-2"
											:btn-style="'px-12 text-lg'"
											btn-type="line"
											@click="closeModal"
										>
											Close
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
	cancelButton: {
		type: String,
		default: "Cancel",
	},
	confirmButton: {
		type: String,
		default: "Discard Application",
	},
	isModalOpen: {
		type: Boolean,
		default: false,
	},
	maxWidth: {
		type: String,
		default: "max-w-4xl",
	},
	closeType: {
		type: String,
		default: "default",
	},
});
const emit = defineEmits(["closeModal"]);
const closeButtonRef = ref(null);

function closeModal() {
	emit("closeModal");
}
</script>
