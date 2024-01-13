<template>
	<div class="flex flex-col pb-8 max-w-3xl mx-auto text-left">
		<div class="space-y-6 divide-y divide-border">
			<Disclosure v-slot="{ open }" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton
						class="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
					>
						<span class="font-medium text-textblack text-lg md:text-xl">Can I sign up even though I already have a utility account?</span>
						<span class="sm:ml-6 h-7 flex items-center text-green-700">
							<span class="text-base text-green-700 pr-1">
								{{ open ? "Hide" : "View" }}
							</span>
							<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Disclosure v-slot="{ open }" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton
						class="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
					>
						<span class="font-medium text-textblack text-lg md:text-xl">
							If I already have service, will I experience any interruptions?
						</span>
						<span class="sm:ml-6 h-7 flex items-center text-green-700">
							<span class="text-base text-green-700 pr-1">
								{{ open ? "Hide" : "View" }}
							</span>
							<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Disclosure v-slot="{ open }" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton
						class="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
					>
						<span class="font-medium text-textblack text-lg md:text-xl">Does Cottage sell my information?</span>
						<span class="sm:ml-6 h-7 flex items-center text-green-700">
							<span class="text-base text-green-700 pr-1">
								{{ open ? "Hide" : "View" }}
							</span>
							<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Disclosure v-slot="{ open }" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton
						class="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
					>
						<span class="font-medium text-textblack text-lg md:text-xl">
							Your service is free but what happens if I want to delete my account?
						</span>
						<span class="sm:ml-6 h-7 flex items-center text-green-700">
							<span class="text-base text-green-700 pr-1">
								{{ open ? "Hide" : "View" }}
							</span>
							<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
			<Disclosure v-slot="{ open }" as="div" class="pt-6">
				<dt class="text-lg">
					<DisclosureButton
						class="text-left w-full flex flex-col sm:flex-row justify-between items-start text-border space-y-1 sm:space-y-0"
					>
						<span class="font-medium text-textblack text-lg md:text-xl">What happens if I move?</span>
						<span class="sm:ml-6 h-7 flex items-center text-green-700">
							<span class="text-base text-green-700 pr-1">
								{{ open ? "Hide" : "View" }}
							</span>
							<ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']" aria-hidden="true" />
						</span>
					</DisclosureButton>
				</dt>
				<DisclosurePanel as="dd" class="mt-2">
					<div class="flex flex-col text-left text-textblack/80 text-base md:text-lg">
						<div>Find a recent bill from Con Edison (most of the time you can find this in your email inbox)</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
</script>
