<template>
	<div
		class="py-4 rounded-lg"
		:class="[inputValue && hasBorder ? 'border-green-700 ring-green-700 ring-2' : '', hasBorder ? 'px-4 border border-border' : '']"
	>
		<div class="flex items-start">
			<div class="flex items-center h-7">
				<input
					:id="id"
					v-model="inputValue"
					class="form-checkbox text-green-700 w-7 h-7 mr-2 focus:ring-green-700 focus:ring-opacity-25 border border-border rounded-full cursor-pointer"
					:aria-describedby="id + '-description'"
					type="checkbox"
				/>
			</div>
			<div class="ml-1 mt-1">
				<label :for="id" class="text-lg text-textblack leading-4 cursor-pointer">
					<slot></slot>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	id: {
		type: String,
		default: "",
	},
	modelValue: {
		type: Boolean,
		default: false,
	},
	hasBorder: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});
</script>
