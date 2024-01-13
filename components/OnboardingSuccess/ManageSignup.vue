<template>
	<div class="flex flex-col">
		<!-- <div class="flex flex-col mx-auto">
			<p class="text-center">
				To receive all of the benefits that Cottage provides, like
				scanning the market for ways to save you money, we need you to
				grant us access to your Con Edison account.
			</p>
		</div>  -->

		<div class="flex flex-col mx-auto">
			<div class="flex flex-row py-2">
				<!-- <p v-if="serviceGroup.electricCompany.electricIntegrationType === ElectricIntegrationType.GREENBUTTON" class="text-center">
					We need to verify your account. You’ll receive an email from {{ serviceGroup.electricCompany.name }} in less than 24 hours asking
					you to give us permission to manage your electricity account. Just click the
					<b>“Review Request”</b>
					button, login, and you’ll be all set.
				</p> -->
				<div>
					<p class="text-center text-base md:text-lg">But one more thing... We still need to verify your account.</p>
					<div class="flex flex-col pt-4 max-w-md">
						<div class="flex flex-row py-2">
							<div
								style="min-width: 32px"
								class="text-xl text-white bg-green-700 w-8 h-8 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
							>
								1
							</div>
							<div class="text-base md:text-lg !leading-6">
								You’ll receive an email from our team asking you to <b>send us a copy of your latest electricity bill</b>
							</div>
						</div>
						<div class="flex flex-row py-2">
							<div
								style="min-width: 32px"
								class="text-xl text-white bg-green-700 w-8 h-8 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
							>
								2
							</div>
							<div class="text-base md:text-lg !leading-6">
								Attach a <b>PDF, picture, or copy</b> of the bill and respond to the email.
							</div>
						</div>
						<div class="flex flex-row py-2">
							<div
								style="min-width: 32px"
								class="text-xl text-white bg-green-700 w-8 h-8 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg flex items-center justify-center font-cooper mr-4"
							>
								3
							</div>
							<div class="text-base md:text-lg !leading-6">We will let you know that you are <b>good to go!</b></div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div v-if="serviceGroup.electricCompany.id === 'CON_EDISON'" class="flex flex-col py-4">
				<p class="text-center pb-2">Here's what the email will look like:</p>
				<img src="~/assets/img/coned/con-edison-allow-access.png" class="mx-auto" style="width: 100%; height: auto; max-width: 30rem" />
			</div> -->
			<div class="py-4 flex justify-center">
				<div class="flex flex-row text-lg font-semibold p-4 bg-green-50 rounded-xl justify-center">
					<nuxt-icon name="circle-check" class="text-xl" filled />
					<span class="pl-2 leading-tight">We guarantee no disruption to your service</span>
				</div>
			</div>
		</div>
		<p class="text-center pt-4 pb-4">
			If you have any questions, contact us at
			<a href="mailto:support@energybycottage.com" class="text-green-700 font-semibold underline">info@energybycottage.com</a>
			or
			<a class="underline text-green-700 font-semibold" href="tel:6468477885">(646) 847-7885</a>
		</p>
		<div class="flex flex-row items-center w-full justify-center">
			<BaseButton btn-type="primary" class="flex mt-6" btn-size="large" @click="confirm">Got it!</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElectricIntegrationType } from "~~/types/Enums";
const emit = defineEmits(["confirm"]);
const { serviceGroup } = useStore("regServices");

function confirm() {
	emit("confirm");
}
</script>

<style></style>
