<template>
	<ModalInfo :is-modal-open="isOpen" max-width="max-w-5xl" @close-modal="closeAction" closeType="topCorner">
		<template #header><div class="mt-8 md:mt-0">What are energy bill credits?</div></template>
		<template #body>
			<div class="flex flex-col pt-6 pb-6 items-center">
				<div class="text-lg md:text-xl pb-2">
					Energy bill credits are provided by local renewable energy resources like Community Solar farms when you "subscribe" to support
					their sourcing of energy.
					<b>However, this does NOT mean your energy is renewable.</b>
				</div>
				<div class="flex flex-col px-4 md:px-20 pt-2 w-full text-center items-center max-w-3xl">
					<ul class="relative text-left py-4 ml-0 md:ml-20">
						<li class="pb-12 pl-6 border-l-2 border-green-50 flex flex-row space-x-4">
							<span
								class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-green-50 rounded-full ring-8 ring-white font-semibold text-xl pt-1"
							>
								1
							</span>
							<nuxt-icon name="solar-panels" filled class="text-4xl"></nuxt-icon>
							<div class="items-center text-lg text-textblack">Community solar farms get built in your area</div>
						</li>
						<li class="pb-12 pl-6 border-l-2 border-green-50 flex flex-row space-x-4">
							<span
								class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-green-50 rounded-full ring-8 ring-white font-semibold text-xl pt-1"
							>
								2
							</span>
							<nuxt-icon name="electric-tower" filled class="text-4xl"></nuxt-icon>
							<div class="mb-1 text-lg text-textblack">Electricity produced from solar farms are sent to the local electric grid</div>
						</li>
						<li class="pb-12 pl-6 border-l-2 border-green-50 flex flex-row space-x-4">
							<span
								class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-green-50 rounded-full ring-8 ring-white font-semibold text-xl pt-1"
							>
								3
							</span>
							<nuxt-icon name="convert-credit" filled class="text-4xl"></nuxt-icon>
							<div class="mb-1 text-lg text-textblack">When energy goes back to the grid, it is translated to "bill credits"</div>
						</li>
						<li class="pb-12 pl-6 border-l-2 border-green-50 flex flex-row space-x-4">
							<span
								class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-green-50 rounded-full ring-8 ring-white font-semibold text-xl pt-1"
							>
								4
							</span>
							<nuxt-icon name="give-credits" filled class="text-4xl"></nuxt-icon>
							<div class="mb-1 text-lg text-textblack">You subscribe to the community solar farm to get a share of credits</div>
						</li>
						<li class="pl-6 flex flex-row space-x-4">
							<span
								class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-green-50 rounded-full ring-8 ring-white font-semibold text-xl pt-1"
							>
								5
							</span>
							<nuxt-icon name="bill-discount" filled class="text-4xl"></nuxt-icon>
							<div class="mb-1 text-lg text-textblack">
								Credits are then applied to your monthly bill as a discount (on average 10%) on the total
							</div>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</ModalInfo>
</template>

<script lang="ts">
export {};
</script>
<script lang="ts" setup>
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
