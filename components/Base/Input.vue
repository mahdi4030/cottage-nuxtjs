<template>
	<div class="input-group flex-wrap" :class="inputClass">
		<div class="input-control" :class="inputControl">
			<input
				:id="inputName"
				:ref="refName"
				v-model="inputValue"
				v-cleave="cleaveOptions"
				:type="inputType"
				:class="[modelValue.length > 0 ? 'filled' : '', hasErrors ? '!border-rose-600 ring-2 ring-rose-600 !bg-rose-400/5' : '']"
				placeholder=""
				:autocomplete="autocomplete"
			/>
			<label :for="inputName" :class="[hasErrors ? '!border-rose-600' : '']">
				<slot />
			</label>
			<slot name="action"></slot>
		</div>
		<div v-if="showSubtext" :class="['flex my-1', hasErrors ? 'text-rose-600' : '']">
			<nuxt-icon v-if="hasErrors" name="warning" class="min-w-fit text-xl pr-2" filled />
			{{ subtext }}
		</div>
	</div>
</template>

<script setup lang="ts">
import Cleave from "cleave.js";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	inputName: {
		type: String,
		default: "",
	},
	inputType: {
		type: String,
		default: "text",
	},
	subtext: {
		type: String,
		default: "",
	},
	refName: {
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
	hasErrors: {
		type: Boolean,
		default: false,
	},
	showSubtext: {
		type: Boolean,
		default: false,
	},
	maxLength: {
		type: Number,
		default: 100,
	},
	// eslint-disable-next-line vue/require-valid-default-prop
	cleaveOptions: {
		type: Object,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		default: () => {},
	},
	autocomplete: {
		type: String,
		default: "",
	},
});

const inputValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

const vCleave = {
	mounted: (el, binding) => {
		if (binding.value === undefined) {
			return;
		}
		el.cleave = new Cleave(el, binding.value || {});
	},
	updated: (el, binding) => {
		if (binding.value === undefined) {
			return;
		}
		const event = new Event("input", { bubbles: true });
		setTimeout(function () {
			el.value = el.cleave.properties.result;
			el.dispatchEvent(event);
		}, 100);
	},
};
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
  margin-bottom: .5rem
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
  border-radius: .5rem
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
