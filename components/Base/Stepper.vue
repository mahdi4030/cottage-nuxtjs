<template>
	<ul class="progressbar">
		<li v-for="(option, i) of options" :key="i" :class="currentStep == i + 1 ? 'current' : currentStep > i + 1 ? 'completed' : ''">
			{{ option }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		currentStep: {
			type: Number,
			default: 1,
			required: true,
		},
		options: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="sass" scoped>
.progressbar li
  list-style-type: none
  float: left
  width: 250px
  position: relative
  text-align: center
  font-weight: 600
  font-size: 1.25rem
  color: $forrest
  &:before
    content: ''
    height: 36px
    width: 36px
    line-height: 36px
    border: 3px solid #DAE0DF
    display: block
    text-align: center
    margin: 0 auto 8px auto
    border-radius: 50%
    background-color: white
  &:after
    /* CSS for creating horizontal line
    content: ''
    position: absolute
    width: 80%
    height: 3px
    background-color: #DAE0DF
    top: 18px
    left: -40%
  &:first-child:after
    content: none
  &.current
    color: $forrest
    &:before
      border-color: $green
    + li:after
      background-color: #DAE0DF
  &.completed
    color: $forrest
    &:before
      content: url("../../assets/icons/check-stepper.svg?inline")
      background-size: 100% 100%
      border-color: $green
      background-color: $green
    + li:after
      background-color: $green

@media (max-width: 800px)
  .progressbar
    display: flex
    flex-direction: column
    li
      padding-bottom: .75rem
      &:after
        /* CSS for creating horizontal line
        content: none
</style>
