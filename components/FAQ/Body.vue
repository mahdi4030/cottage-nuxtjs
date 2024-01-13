<template>
	<div class="space-y-6 divide-y divide-border">
		<dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
			<Disclosure v-for="(q, index) in faqs" v-slot="{ open }" :key="index" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton class="text-left w-full flex justify-between items-start text-border space-y-1 sm:space-y-0">
						<span class="font-medium text-textblack text-lg md:text-xl">{{ q.title }}</span>
						<span class="ml-6 flex h-10 items-center">
							<PlusSmallIcon v-if="!open" class="h-10 w-10 text-green-700" aria-hidden="true" />
							<MinusSmallIcon v-else class="h-10 w-10 text-green-700" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2 pr-12">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>{{ q.answer }}</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
		</dl>
	</div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";
import { ComputedRef, computed } from "vue";

interface FAQ {
	title: string;
	answer: string;
}

const faqs: ComputedRef<FAQ[]> = computed(() => {
	return [
		{
			title: "Can I sign up even though I already have a utility account?",
			answer: "Yes! You can sign up even if you already have a utility account. You will continue to receive your utility bill from your current utility provider, but your energy will be powered by renewables. We promise no disruption to your service.",
		},
		{
			title: "Will I ever get charged for renewable energy?",
			answer: "Nope! We don’t charge you anything extra for your energy. We simply make sure that your energy is powered by renewables. We do this by negotiating with renewable energy suppliers to make your energy green.",
		},
		{
			title: "What’s the catch?",
			answer: "Actually, there is no catch. It can be that simple. Our goal is to make it simple for individuals to reduce their carbon footprints and contribute to a cleaner world, no matter if you rent or own your home. Everyone has an electricity bill, but not all electricity is the same. By simply coming together as a community, we have the power to negotiate how we want our electricity to be generated.",
		},
		{
			title: "How do you make money?",
			answer: "As we collaborate with renewable energy providers to ensure your energy is eco-friendly, our supply partners gain a new client and compensate us with a referral fee from their promotional budget. Due to our ability to connect suppliers with numerous customers at a minimal expense, they guarantee your energy comes from renewable sources and offer us a modest token of appreciation. Rest assured, we never disclose your information, and our energy supply partners cover our payment, so you won't need to.",
		},
		{
			title: "How does my energy switch to using renewables?",
			answer: "A renewable energy certificate (REC) is a document that verifies that a unit of electricity was generated from a renewable energy source, such as solar or wind power. RECs allow people to support the use of clean, renewable energy by purchasing them and offsetting their carbon emissions and show their commitment to sustainability. When electricity is generated from a renewable energy source and added to the grid, a REC is issued to represent the environmental and social benefits of that renewable electricity. Because the electricity we receive through the utility grid does not specify its source or how it was generated, RECs are an important tool for assigning ownership and accountability for renewable electricity. For consumers who wish to use renewable electricity, RECs provide a way to verify and document their use of clean energy, even if it is generated from off-site resources.",
		},
	];
});
</script>
