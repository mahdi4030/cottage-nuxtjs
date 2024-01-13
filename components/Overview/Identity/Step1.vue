<template>
	<div>
		<p class="text-base text-textblack/80 mt-1">This will be used to register your utility account</p>
		<div class="bg-green-50 rounded-lg py-3 mt-2 leading-5 text-center">
			<span>This information is <b>never shared</b> and <b> we delete it</b> after completing registration. 🔐</span>
		</div>
		<div class="flex flex-col w-full pt-2 md:space-y-2">
			<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full">
				<div class="sm:col-span-2">
					<BaseInput
						v-model="dateOfBirth"
						class="w-full flex text-left mt-2"
						input-name="dateOfBirth"
						input-control="flex"
						:has-errors="hasDateOfBirthErrors"
						:show-subtext="hasDateOfBirthErrors"
						:subtext="dateOfBirthErrorText"
						:cleave-options="{ date: true, datePattern: ['m', 'd', 'Y'] }"
						>Date of Birth (mm/dd/yyyy)</BaseInput
					>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full z-10">
				<div class="sm:col-span-2">
					<Listbox v-model="identificationType">
						<div class="relative mb-2">
							<ListboxButton
								class="relative w-full cursor-default rounded-lg bg-white pl-4 pr-10 text-left focus:outline-none focus-visible:border-green-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-500 border-border border h-[3.2rem] leading-[3.35rem]"
							>
								<span class="text-lg text-textblack">{{ identificationType.name }}</span>
								<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon class="h-8 w-8 text-gray-400" aria-hidden="true" />
								</span>
							</ListboxButton>

							<transition
								leave-active-class="transition duration-100 ease-in"
								leave-from-class="opacity-100"
								leave-to-class="opacity-0"
							>
								<ListboxOptions
									class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
								>
									<ListboxOption
										v-slot="{ active, selected }"
										v-for="idType in idTypes"
										:key="idType.name"
										:value="idType"
										as="template"
									>
										<li
											:class="[
												active ? 'bg-green-100/20 text-green-700 cursor-pointer' : 'text-textblack',
												'relative select-none py-2 pl-10 pr-4',
											]"
										>
											<span :class="[selected ? 'font-semibold text-forrest-700' : 'font-normal', 'text-base md:text-lg']">{{
												idType.name
											}}</span>
											<span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
												<CheckIcon class="h-5 w-5" aria-hidden="true" />
											</span>
										</li>
									</ListboxOption>
								</ListboxOptions>
							</transition>
						</div>
					</Listbox>
				</div>
				<div class="sm:col-span-2">
					<BaseInput v-model="identificationNumber" input-name="identificationNumber" class="w-full">Number</BaseInput>
				</div>
				<div v-if="identificationType.id === 1" class="sm:col-span-2">
					<ClientOnly>
						<template #fallback>
							<div class="w-full rounded-lg border border-border bg-gray-200 py-2 pl-3 pr-10 animate-pulse"></div>
						</template>
						<Combobox v-model="identificationOther">
							<div class="relative mb-2">
								<ComboboxButton as="div" class="flex">
									<ComboboxInput
										class="w-full rounded-lg border border-border bg-white py-2 pl-3 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 md:text-xl text-lg h-12 text-forrest-700"
										:display-value="(state) => state?.name"
										@change="query = $event.target.value"
									/>
									<div
										class="absolute inset-y-1 right-1 flex items-center rounded-lg px-1 focus:outline-none bg-border/60 hover:bg-border"
									>
										<ChevronUpDownIcon class="h-8 w-8 text-gray-600" aria-hidden="true" />
									</div>
								</ComboboxButton>

								<ComboboxOptions
									class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:text-lg text-base text-left"
								>
									<div
										v-if="filteredStates.length === 0 && query !== ''"
										class="relative cursor-default select-none py-2 px-4 text-gray-700"
									>
										Nothing found.
									</div>
									<ComboboxOption
										v-for="(state, index) in filteredStates"
										:key="index"
										v-slot="{ active, selected }"
										:value="state"
										as="template"
									>
										<li
											:class="[
												'relative cursor-default select-none py-2 pl-4 pr-9',
												active ? 'bg-green-700 text-white' : 'text-textblack',
											]"
										>
											<span :class="['block truncate', selected && 'font-semibold']">
												{{ state.name }}
											</span>

											<span
												v-if="selected"
												:class="[
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active ? 'text-white' : 'text-indigo-600',
												]"
											>
												<CheckIcon class="h-5 w-5" aria-hidden="true" />
											</span>
										</li>
									</ComboboxOption>
								</ComboboxOptions>
							</div>
						</Combobox>
					</ClientOnly>
					<!-- <BaseInput v-model="identificationOther" input-name="identificationOther" class="w-full">Driver’s License State</BaseInput> -->
				</div>
			</div>
		</div>
		<div class="w-full flex flex-row justify-end pt-2">
			<BaseButton :is-disabled="isSubmitDisabled" @click="submitIdentityInfo">Submit</BaseButton>
		</div>
	</div>
</template>

<script lang="ts">
export {};
</script>
<script setup lang="ts">
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOptions,
	ComboboxOption,
	TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/solid";
const { property } = useStore("property");
const { resident, isResidentIdentityComplete } = useStore("resident");
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const idTypes = [
	{ id: 1, name: "Driver's License" },
	{ id: 2, name: "Passport Number" },
	{ id: 3, name: "Public Assistance ID" },
];

const dateOfBirth = ref("");
const hasDateOfBirthErrors = ref(false);
const dateOfBirthErrorText = ref("Enter a valid birthday");
const identificationType = ref(idTypes[0]);
const identificationNumber = ref("");
const identificationOther = ref("");

const isSubmitDisabled = computed(() => {
	if (dateOfBirth.value.length !== 10) {
		return true;
	} else {
		return (
			identificationType.value === "" ||
			identificationNumber.value === "" ||
			(identificationType.value.id === 1 && identificationOther.value === "")
		);
	}
});

async function submitIdentityInfo() {
	dateOfBirthErrorText.value = "Enter a valid birthday";
	hasDateOfBirthErrors.value = false;
	try {
		const birthdate = new Date(dateOfBirth.value);
		const ageDifMs = Date.now() - birthdate.getTime();
		const ageDate = new Date(ageDifMs); // miliseconds from epoch
		const age = Math.abs(ageDate.getUTCFullYear() - 1970);
		if (age < 18) {
			hasDateOfBirthErrors.value = true;
			dateOfBirthErrorText.value = "Must be 18 years old";
			return;
		} else if (age > 100) {
			hasDateOfBirthErrors.value = true;
			dateOfBirthErrorText.value = "Enter a valid birthday";
			return false;
		}
	} catch (error) {
		console.log(error);
	}
	const residentIdentityData = {
		identificationType: identificationType.value.name,
		identificationNumber: identificationNumber.value,
		identificationOther: identificationOther.value.name,
		dateOfBirth: dateOfBirth.value,
		cottageUserID: user.value.id,
	};
	try {
		const { data, error } = await supabase.from("ResidentIdentity").upsert(residentIdentityData, { onConflict: "cottageUserID" });
		if (error) {
			console.error(error);
			return null;
		}
	} catch (error) {
		console.log(error);
	}
	isResidentIdentityComplete.value = true;
}

const states = [
	{ name: "Alabama" },
	{ name: "Alaska" },
	{ name: "Arizona" },
	{ name: "Arkansas" },
	{ name: "California" },
	{ name: "Colorado" },
	{ name: "Connecticut" },
	{ name: "Delaware" },
	{ name: "Florida" },
	{ name: "Georgia" },
	{ name: "Hawaii" },
	{ name: "Idaho" },
	{ name: "Illinois" },
	{ name: "Indiana" },
	{ name: "Iowa" },
	{ name: "Kansas" },
	{ name: "Kentucky" },
	{ name: "Louisiana" },
	{ name: "Maine" },
	{ name: "Maryland" },
	{ name: "Massachusetts" },
	{ name: "Michigan" },
	{ name: "Minnesota" },
	{ name: "Mississippi" },
	{ name: "Missouri" },
	{ name: "Montana" },
	{ name: "Nebraska" },
	{ name: "Nevada" },
	{ name: "New Hampshire" },
	{ name: "New Jersey" },
	{ name: "New Mexico" },
	{ name: "New York" },
	{ name: "North Carolina" },
	{ name: "North Dakota" },
	{ name: "Ohio" },
	{ name: "Oklahoma" },
	{ name: "Oregon" },
	{ name: "Pennsylvania" },
	{ name: "Rhode Island" },
	{ name: "South Carolina" },
	{ name: "South Dakota" },
	{ name: "Tennessee" },
	{ name: "Texas" },
	{ name: "Utah" },
	{ name: "Vermont" },
	{ name: "Virginia" },
	{ name: "Washington" },
	{ name: "West Virginia" },
	{ name: "Wisconsin" },
	{ name: "Wyoming" },
];

const selectedState = ref(states[0]);
const query = ref("");

const filteredStates = computed(() =>
	query.value === ""
		? states
		: states.filter((state) => state.name.toLowerCase().replace(/\s+/g, "").includes(query.value.toLowerCase().replace(/\s+/g, ""))),
);
</script>
