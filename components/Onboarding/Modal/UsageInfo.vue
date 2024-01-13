<template>
	<ModalInfo :is-modal-open="isOpen" @closeModal="closeAction">
		<template #header>What information does Cottage collect?</template>
		<template #body>
			<div class="flex flex-col w-full items-center">
				<p class="text-forrest-700 text-center mt-4 leading-5">Connect your utility account and the following data:</p>
				<div class="w-full text-left py-2">
					<div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 w-full">
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="invoice" class="text-2xl mr-2" filled />
									<span>Billing data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Utility bill amounts, due dates, service dates
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="electricity" class="text-2xl mr-2" filled />
									<span>Consumption data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Monthly energy consumption, electricity rate
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="consumption" class="text-2xl mr-2" filled />
									<span>Real-time data</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Hourly energy usage profile as reported by your smart meter
							</DisclosurePanel>
						</Disclosure>
						<Disclosure v-slot="{ open }" as="div" class="px-4 pb-2">
							<DisclosureButton
								class="flex w-full justify-between py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 items-end"
							>
								<div class="text-lg md:text-xl inline-flex">
									<nuxt-icon name="account" class="text-2xl mr-2" filled />
									<span>Customer information</span>
								</div>
								<div class="ring-1 ring-gray-300 rounded-md p-1 hover:bg-gray-100">
									<ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-6 w-6 text-green-700" />
								</div>
							</DisclosureButton>
							<DisclosurePanel class="pb-2 pt-1 text-base text-textblack/80">
								Utility account number, service address, utility service type (electric, gas, etc.)
							</DisclosurePanel>
						</Disclosure>
					</div>
				</div>
				<div class="flex flex-row bg-green-700/10 p-5 rounded-lg text-left space-x-4 md:mx-4 mb-2 items-center">
					<nuxt-icon name="privacy" class="text-3xl" filled />
					<div class="text-forrest-700 text-base leading-4">
						Your privacy matters to us. We do not sell your data and whenever you delete your Cottage account, we also delete your
						personal data.
					</div>
				</div>
			</div>
		</template>
	</ModalInfo>
</template>

<script lang="ts">
export {};
</script>
<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(["closeAction"]);
function closeAction() {
	emit("closeAction");
}
</script>
