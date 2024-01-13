<template>
	<div class="input-group" :class="inputClass">
		<div class="input-control" :class="inputControl">
			<input
				:id="inputName"
				ref="autocompleteInput"
				v-model="inputValue"
				:class="[modelValue.length > 0 ? 'filled' : '', hasErrors ? '!border-rose-600 ring-2 ring-rose-600 !bg-rose-400/5' : '']"
				placeholder=""
				@keydown.enter.prevent
				@submit.enter.prevent
			/>
			<label :for="inputName" :class="[hasErrors ? '!border-rose-600' : '']">
				<slot />
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
// import { debounce } from "~~/utils/debounce";

const emit = defineEmits(["update:modelValue", "setAddressComponents"]);
const autocompleteInput = ref(null);

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	inputName: {
		type: String,
		default: "",
	},
	inputClass: {
		type: String,
		default: "",
	},
	inputControl: {
		type: String,
		default: "",
	},
	validAddressProp: {
		type: String,
		default: "",
	},
	returnFullAddress: {
		type: Boolean,
		default: false,
	},
	hasErrors: {
		type: Boolean,
		default: false,
	},
});

const inputValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

function selectAddress(val) {
	emit("update:modelValue", val);
}
function setSelectedAddressComps(val) {
	emit("setAddressComponents", val);
}

onMounted(async () => {
	const loader = new Loader({
		apiKey: "AIzaSyApdZHm51raPUiM-K0muDBQq_OAWxMi9Pk",
		version: "weekly",
		libraries: ["places"],
	});

	let lat = 40.7128;
	let lng = -74.006;

	const { locationLoaded, getLocation, location } = useStore("app");
	if (!locationLoaded.value) {
		await getLocation();
	}
	try {
		lat = location.value.latitude;
		lng = location.value.longitude;
	} catch (error) {
		console.log(error);
	}

	loader
		.load()
		.then((google) => {
			// console.log("SUCCESSFULLY LOADED");
			const center = { lat, lng };
			// Create a bounding box with sides ~10km away from the center point
			const defaultBounds = {
				north: center.lat + 2,
				south: center.lat - 2,
				east: center.lng + 2,
				west: center.lng - 2,
			};

			const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value, {
				types: ["address"],
				bounds: defaultBounds,
				strictBounds: false,
				componentRestrictions: { country: "us" },
			});

			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();
				const ac = place.address_components;
				// const city = ac[0].short_name
				const { place_id } = place;
				console.log(place_id);
				// console.log(ac);

				if (ac !== undefined) {
					// this.selectAddress(place.formatted_address)
					const streetNum = ac.find((comp) => {
						return comp.types.includes("street_number");
					});
					if (streetNum !== undefined) {
						const streetName = ac.find((comp) => {
							return comp.types.includes("route");
						});
						let city = ac.find((comp) => {
							return comp.types.includes("sublocality_level_1");
						});
						if (city === undefined) {
							city = ac.find((comp) => {
								return comp.types.includes("locality") && comp.types.includes("political");
							});
						}
						const state = ac.find((comp) => {
							return comp.types.includes("administrative_area_level_1");
						});
						const zip = ac.find((comp) => {
							return comp.types.includes("postal_code");
						});

						const selectedAddressComps = {
							place_id,
							streetNum: streetNum.short_name,
							streetName: streetName.short_name,
							city: city.short_name,
							state: state.long_name,
							zip: zip.short_name,
						};

						if (props.returnFullAddress) {
							selectAddress(place.formatted_address);
						} else {
							selectAddress(streetNum.short_name + " " + streetName.short_name);
						}
						setSelectedAddressComps(selectedAddressComps);
					} else {
						const inputtedAddress = (document.getElementById(props.inputName) as HTMLInputElement).value;
						const addressComps = inputtedAddress.split(",");
						const streetNum = addressComps[0].split(" ")[0];
						const streetName = addressComps[0].split(" ")[1];

						let city = ac.find((comp) => {
							return comp.types.includes("sublocality_level_1");
						});
						if (city === undefined) {
							city = ac.find((comp) => {
								return comp.types.includes("locality") && comp.types.includes("political");
							});
						}
						if (city === undefined) {
							city = addressComps[1];
						}

						const state = ac.find((comp) => {
							return comp.types.includes("administrative_area_level_1");
						});
						const zip = ac.find((comp) => {
							return comp.types.includes("postal_code");
						});

						const selectedAddressComps = {
							place_id,
							streetNum,
							streetName,
							city: city.short_name,
							state: state.long_name,
							zip: zip.short_name,
						};
						// console.log(selectedAddressComps);

						if (props.returnFullAddress) {
							selectAddress(inputtedAddress);
						} else {
							selectAddress(streetNum + " " + streetName);
						}
						setSelectedAddressComps(selectedAddressComps);
					}
				} else {
					selectAddress("");
					setSelectedAddressComps({
						streetNum: "",
						streetName: "",
						city: "",
						state: "",
						zip: "",
					});
				}
			});
		})
		.catch((e) => {
			// do something
			console.log("FAILED TO LOAD", e);
		});

	// const autocomplete = new google.maps.places.Autocomplete(input, options);
	// eslint-disable-next-line no-undef
});
</script>

<style lang="sass" scoped>
.input-group
  width: 100%
  display: flex
  flex-direction: row
  align-items: center

.input-group.small
  width: 50% !important

.input-icon
  padding-right: 0.5rem
  margin-top: 1rem
  svg
    width: 48px
    height: 100%

.input-control
  height: 3.2rem
  position: relative
  width: 100%
  background-color: white
  border-radius: .5rem

.input-control input,
.input-control label
  cursor: text
  font-size: 1.125rem
  position: absolute
  transition: all 0.2s ease
  width: 100%
  flex: 1 1 auto

.input-control input
  border: 1px solid $border
  border-radius: 8px
  height: 3.2rem
  padding: 1rem 1rem 0
  outline: none
  color: $textblack
  z-index: 2

.input-control label
  color: #9b9b9b
  font-weight: 400
  line-height: 0px
  padding: 0 1rem
  z-index: 3
  margin-top: 28px

.input-control input:focus
  border-color: $green

.input-control input.filled ~ label,
.input-control input:focus ~ label
  font-size: 0.8rem
  position: absolute
  margin-top: 16px

.input-control input.filled ~ label
  // color: $primary-green
  color: #9b9b9b

@media (max-width: 767px)
  .input-control label
    font-size: 1.1rem
</style>
