<template>
	<ModalInfo :is-modal-open="isOpen" max-width="max-w-5xl" close-type="topCorner" @close-modal="closeAction">
		<template #header><div class="mt-8 md:mt-0">What is Electric Plan Switching?</div></template>
		<template #body>
			<div class="flex flex-row pb-2 pt-4 space-x-2 justify-center">
				<div class="w-12 h-2 rounded-full" :class="rateSwitchingModalStep >= 1 ? 'bg-green-700' : 'bg-green-200'"></div>
				<div class="w-12 h-2 rounded-full" :class="rateSwitchingModalStep >= 2 ? 'bg-green-700' : 'bg-green-200'"></div>
				<div class="w-12 h-2 rounded-full" :class="rateSwitchingModalStep >= 3 ? 'bg-green-700' : 'bg-green-200'"></div>
			</div>
			<div class="flex flex-col pt-6 pb-4 items-center px-2">
				<div v-show="rateSwitchingModalStep === 1">
					<p class="text-center">
						Every month, an electricity bill includes
						<span class="font-bold text-green-700 underline">two</span>
						types of charges.
					</p>
					<div>
						<div class="flex flex-col md:flex-row w-full py-8 items-end">
							<div class="flex flex-col px-8 items-center w-full md:w-1/2">
								<SupplyScene class="w-64 md:w-80 h-auto" />
								<div class="text-lg md:text-xl font-semibold pt-4 pb-2">Supply Charges</div>
								<div class="leading-5">
									This is from a
									<b>supply</b>
									company that supplies the energy to you. If you don’t choose a different supplier,
									<b>utility</b>
									companies will put you on their default rate.
								</div>
							</div>
							<div class="flex flex-col px-8 items-center w-full md:w-1/2">
								<DeliveryScene class="w-64 md:w-80 h-auto" />
								<div class="text-lg md:text-xl font-semibold pt-4 pb-2">Delivery Charges</div>
								<div class="leading-5">
									This is the
									<b>utility</b>
									company that is responsible for delivering electricity to you from a supplier. This company is the one that sends
									you a bill.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-show="rateSwitchingModalStep === 2">
					<div class="flex flex-row justify-center w-full">
						<div id="animationContainer" ref="animationContainer"></div>
					</div>
				</div>
				<div v-show="rateSwitchingModalStep === 3">
					<p class="text-center">
						You can get better rates by choosing alternative suppliers, but it takes effort.
						<br />
						Cottage does the work for you.
					</p>
					<div class="flex flex-col px-4 md:px-20 pt-2 pb-4 w-full text-center items-center max-w-3xl">
						<ul class="relative text-left py-4 ml-0 md:ml-20">
							<li class="pb-8 pl-10 border-l border-gray-200">
								<span
									class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-lightborder rounded-full ring-8 ring-white dark:ring-gray-900"
								>
									<nuxt-icon name="binoculars" filled class="text-2xl" />
								</span>
								<p class="items-center mb-1 text-textblack">
									Cottage works in the background to
									<b>continuously scans the market</b>
									for lower supply rates
								</p>
							</li>
							<li class="pl-10">
								<span
									class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-lightborder rounded-full ring-8 ring-white dark:ring-gray-900"
								>
									<nuxt-icon name="transfer" filled class="text-2xl" />
								</span>
								<p class="mb-1 text-textblack">
									We automatically switch you with
									<b>no service interruption</b>
									when we find a better plan
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="flex flex-col md:flex-row-reverse md:space-x-4 md:space-x-reverse items-center justify-center space-y-4 md:space-y-0">
				<BaseButton class="w-full md:w-48" :btn-style="'px-4 text-lg'" @click="rateSwitchingModalNextStep">
					{{ rateSwitchingModalStep === 3 ? "Done" : "Next" }}
				</BaseButton>
				<BaseButton
					v-if="rateSwitchingModalStep > 1"
					class="w-full md:w-48"
					:btn-style="'px-4 text-lg'"
					btn-type="line"
					@click="rateSwitchingModalStep--"
				>
					Back
				</BaseButton>
			</div>
		</template>
	</ModalInfo>
</template>

<script lang="ts">
export {};
</script>
<script lang="ts" setup>
import SupplyScene from "~/assets/img/external/supply-scene.svg?component";
import DeliveryScene from "~/assets/img/external/delivery-scene.svg?component";
import lottie from "lottie-web";
const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
});

watch(
	() => props.isOpen,
	(val) => {
		if (val) {
			rateSwitchingModalStep.value = 1;
			setTimeout(() => {
				console.log(animationContainer.value);
				animation.value = lottie.loadAnimation({
					container: animationContainer.value,
					renderer: "svg",
					loop: false,
					autoplay: false,
					// path: `${window.location.origin}/animations/${file}.json`,
					path: "/lottie/electricity-bill-animated.json",
				});
			}, 500);
		}
	},
);

const rateSwitchingModalStep = ref(1);
const animationContainer = ref(null);
const animation = ref();

function rateSwitchingModalNextStep() {
	rateSwitchingModalStep.value++;
	if (rateSwitchingModalStep.value === 2) {
		setTimeout(() => {
			animation.value.play();
		}, 500);
	} else if (rateSwitchingModalStep.value > 3) {
		// isLearnMoreRateSwitchingOpen.value = false;
		emit("closeAction");
	}
}

const emit = defineEmits(["closeAction"]);
function closeAction() {
	emit("closeAction");
}
</script>
