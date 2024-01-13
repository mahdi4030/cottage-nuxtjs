<template>
	<div class="option-group" :class="[inputClass, hasErrors ? '!border-rose-600' : 'border-gray-500']">
		<div class="option-control" :class="inputControlClass">
			<label :for="elementId">
				<slot />
			</label>
			<input
				:id="elementId"
				:ref="refName"
				type="radio"
				:name="name"
				class="input-radio top-3 relative h-[34px]"
				placeholder=""
				:value="inputValue"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	elementId: {
		type: String,
		default: "",
	},
	name: {
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
	inputControlClass: {
		type: String,
		default: "",
	},
	hasErrors: {
		type: Boolean,
		default: false,
	},
	inputValue: {
		type: String,
		default: "",
	},
});
</script>

<style lang="sass" scoped>
.option-group
  display: flex
  flex-direction: row
  align-items: center
  flex-wrap: wrap
  padding: 0.25rem
  border-style: solid
  border-width: 2px
  border-radius: 0.75rem

.option-control
  height: 3rem
  position: relative
  margin-bottom: .5rem
  accent-color: $green

.option-control input,
.option-control label
  font-size: 1.25rem
  font-weight: 200
  flex: 1 1 auto

.option-control input
  border: 1px solid $border
  border-radius: 8px
  height: 34px
  padding: 1rem 1rem 0
  outline: none
  color: $textblack

.option-control label
  color: #9b9b9b
  font-weight: 400
  line-height: 60px
  padding: 0 1rem
</style>
