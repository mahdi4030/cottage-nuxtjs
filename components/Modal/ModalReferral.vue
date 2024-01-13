<template>
	<div>
		<ClientOnly>
			<TransitionRoot as="template" :show="props.isModalOpen">
				<Dialog as="div" class="relative z-50" :initial-focus="closeButtonRef" @close="closeModal">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="ease-in duration-200"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<div class="fixed inset-0 bg-gray-300 bg-opacity-30 transition-opacity" />
					</TransitionChild>

					<div class="fixed z-10 inset-0 overflow-y-auto">
						<div class="flex items-start justify-center min-h-full p-4 text-center sm:p-0">
							<TransitionChild
								as="template"
								enter="ease-out duration-300"
								enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enter-to="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leave-from="opacity-100 translate-y-0 sm:scale-100"
								leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<DialogPanel
									class="relative bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all my-8 w-full"
									:class="[props.maxWidth]"
								>
									<div class="flex flex-col-reverse md:flex-row">
										<div class="flex flex-col px-4 py-4 sm:px-10 sm:py-10 md:w-3/5">
											<div class="mt-3 text-center sm:mt-0 w-full relative">
												<div v-if="closeType === 'topCorner'" class="absolute -top-2 -right-2" @click="closeModal">
													<nuxt-icon name="close" filled class="text-2xl"></nuxt-icon>
												</div>
												<h2 class="text-3xl hidden md:block">
													Help spread clean energy <br />...and earn
													<span class="text-green-700">${{ serviceGroup.referralProgramAmount }}</span>
												</h2>
												<div class="mt-4">
													<div class="py-4 flex flex-col justify-center">
														<p class="">Refer your friends to sign up for Cottage.</p>
														<p>Tell them to enter the code below during sign up</p>
														<div class="flex justify-center py-2">
															<ClientOnly>
																<div
																	v-tooltip="{
																		content: 'Copied to clipboard!',
																		shown: isCopyReferralOpen,
																		theme: 'dark',
																		triggers: [],
																	}"
																	class="text-xl font-semibold bg-green-50 rounded-xl justify-center leading-tight px-4 py-3 flex space-x-2 cursor-pointer hover:bg-green-100/70"
																	@click="copyText(registration.resident.referralCode, 'isCopyReferralOpen')"
																>
																	<span>
																		{{ registration.resident.referralCode }}
																	</span>
																	<nuxt-icon name="copy" filled />
																</div>
															</ClientOnly>
														</div>
														<p class="pt-6">Or share a link</p>
														<div class="flex flex-row justify-center space-x-4 pt-2">
															<ClientOnly>
																<BaseButton
																	v-tooltip="{
																		content: 'Copied to clipboard!',
																		shown: isCopyMessage,
																		theme: 'dark',
																		triggers: [],
																	}"
																	btn-type="line"
																	btn-size="base"
																	@click="createTextMessage"
																>
																	<nuxt-icon class="text-3xl" name="message" filled />
																</BaseButton>
																<BaseButton btn-type="line" btn-size="base" @click="createMailTo">
																	<nuxt-icon class="text-3xl" name="email" filled />
																</BaseButton>
																<BaseButton
																	v-tooltip="{
																		content: 'Copied to clipboard!',
																		shown: isCopyLinkOpen,
																		theme: 'dark',
																		triggers: [],
																	}"
																	btn-type="line"
																	btn-size="base"
																	@click="
																		copyText(
																			config.SITE_URL + '/ref/' + registration.resident.referralCode,
																			'isCopyLinkOpen',
																		)
																	"
																>
																	<nuxt-icon class="text-3xl" name="link" filled />
																</BaseButton>
															</ClientOnly>
														</div>
														<!-- <div class="flex justify-center py-2">
                            <p></p>
                          </div> -->
													</div>
												</div>
											</div>
											<div v-if="closeType === 'default'" class="flex flex-row mt-4 items-center justify-center">
												<BaseButton
													ref="closeButtonRef"
													class="px-2"
													:btn-style="'px-12 text-lg'"
													btn-type="transparent"
													@click="closeModal"
												>
													Done
												</BaseButton>
											</div>
											<div class="text-sm pt-2">
												By participating, you agree to the
												<a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a>
											</div>
										</div>
										<div class="md:w-2/5 bg-forrest-700 px-4 py-4 sm:px-10 sm:py-10 flex items-center">
											<div class="mx-auto flex flex-col items-center">
												<h2 class="text-3xl text-white px-2 py-2 md:hidden">
													Give guaranteed electricity savings...and earn $50
												</h2>
												<ul class="relative text-left py-4 ml-6 text-white">
													<li class="pb-8 md:pb-20 pl-10 border-l-2 border-green-700 items-center flex">
														<span
															class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-forrest-700 rounded-full ring-8 ring-forrest-700 dark:ring-gray-900"
														>
															<nuxt-icon name="solid-send" class="text-2xl" filled />
														</span>
														<p class="items-center">Invite friends to Cottage</p>
													</li>
													<li class="pb-6 md:pb-16 pl-10 border-l-2 border-green-700">
														<span
															class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-forrest-700 rounded-full ring-8 ring-forrest-700 dark:ring-gray-900"
														>
															<nuxt-icon name="solid-referral" class="text-2xl" filled />
														</span>
														<p class="">
															Every 5 friends that sign up,
															<b>we give you ${{ serviceGroup.referralProgramAmount }}</b>
														</p>
													</li>
													<li class="pl-10">
														<span
															class="flex absolute -left-5 justify-center items-center w-10 h-10 bg-forrest-700 rounded-full ring-8 ring-forrest-700 dark:ring-gray-900"
														>
															<nuxt-icon name="solid-green-earth" class="text-2xl" filled />
														</span>
														<p class="">Friends can help contribute towards a greener future</p>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</TransitionRoot>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
const config = useRuntimeConfig();
const { registration } = useStore("registration");
const { serviceGroup } = useStore("regServices");

const props = defineProps({
	isModalOpen: {
		type: Boolean,
		default: false,
	},
	maxWidth: {
		type: String,
		default: "max-w-4xl",
	},
	closeType: {
		type: String,
		default: "default",
	},
});

const emit = defineEmits(["closeModal"]);
const closeButtonRef = ref(null);
const isCopyReferralOpen = ref(false);
const isCopyLinkOpen = ref(false);
const isCopyMessage = ref(false);

function createTextMessage() {
	const bodyString =
		"I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month.%20Give%20them%20at%20try%21%0A%0A" +
		config.SITE_URL +
		"/ref/" +
		registration.value.resident.referralCode;
	if (navigator.userAgent.match(/iPhone/i)) {
		window.open("sms://?/&body=" + bodyString);
	} else if (navigator.userAgent.match(/Android/i)) {
		window.open("sms://?/?body=" + bodyString);
	} else {
		navigator.clipboard.writeText(
			"I just signed up with Cottage to manage my electricity account. They help 'power up' your electricity account and provide the cheapest way to convert your energy usage to renewable. Give them a try!" +
				config.SITE_URL +
				"/ref/" +
				registration.value.resident.referralCode,
		);
		isCopyMessage.value = true;
		setTimeout(() => {
			isCopyMessage.value = false;
		}, 1500);
	}
}

function createMailTo() {
	const mailString =
		"mailto:?subject=Check-out%20Cottage!&body=I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20help%20%27power%20up%27%20your%20electricity%20account%20and%20provide%20the%20cheapest%20way%20to%20convert%20your%20energy%20usage%20to%20renewable.%20Give%20them%20at%20try%21%0A" +
		config.SITE_URL +
		"/ref/" +
		registration.value.resident.referralCode;
	window.location.href = mailString;
}

function copyText(val, openVariable) {
	navigator.clipboard.writeText(val);
	this[openVariable] = true;
	setTimeout(() => {
		this[openVariable] = false;
	}, 1500);
}

function closeModal() {
	emit("closeModal");
}
</script>
