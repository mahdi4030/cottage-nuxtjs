<template>
	<div>
		<TransitionRoot as="template" :show="props.isModalOpen">
			<Dialog as="div" class="relative z-50" @close="cancelAction">
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
									<div class="mt-3 text-center sm:mt-0 sm:ml-4 w-full">
										<h2 class="pb-4">
											We are directing you to {{ serviceGroup.electricCompanyID.name }}'s website to complete the process
										</h2>
										<div class="mt-2">
											<div class="flex flex-col w-full items-center">
												<p class="text-lg md:text-xl font-semibold">To connect your account:</p>
												<ul class="list-decimal text-left pt-2 text-base md:text-lg mx-6">
													<li>Sign in with your utility account <b>username</b> and <b>password</b></li>
													<li>Select and approve to share your usage data with <b>Cottage Energy</b></li>
													<li>Finalize and agree to the scopes of usage</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div
									class="flex flex-col-reverse md:flex-row mt-4 md:mt-8 justify-center space-y-4 space-y-reverse md:space-y-0 md:space-x-8"
								>
									<BaseButton class="w-full md:w-72" :btn-style="'px-4 text-lg'" btn-type="line" @click="cancelAction">
										Cancel
									</BaseButton>
									<BaseButton
										class="w-full md:w-64"
										:btn-style="[
											'w-full font-semibold leading-6 text-white hover:bg-green-200 transition ease-in-out duration-150',
											processingGreenButtonRequest ? 'cursor-not-allowed' : '',
										]"
										@click.stop.prevent
										@click="connectUtilityAccount"
									>
										<div v-if="!processingGreenButtonRequest">Connect My Account</div>
										<div v-if="processingGreenButtonRequest" class="inline-flex items-center space-x-2">
											<svg
												class="animate-spin -mt-1 h-6 w-6 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
												<path
													class="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											<span>One second...</span>
										</div>
									</BaseButton>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
const { serviceGroup } = useStore("regServices");
const { registration } = useStore("registration");

const processingGreenButtonRequest = ref(false);

const props = defineProps({
	isModalOpen: {
		type: Boolean,
		default: false,
	},
	maxWidth: {
		type: String,
		default: "max-w-4xl",
	},
});

async function connectUtilityAccount() {
	processingGreenButtonRequest.value = true;
	const { oAuthConfig } = useUtilityIntegration();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.location.href = oAuthConfig().REDIRECT_TO_UTILITY;
}

const emit = defineEmits(["cancelAction", "confirmAction"]);

function cancelAction() {
	emit("cancelAction");
}
</script>
