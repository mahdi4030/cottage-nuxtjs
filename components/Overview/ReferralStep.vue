<template>
	<div class="flex flex-col w-full mt-4">
		<div class="text-center w-full relative">
			<div>
				<div class="pb-4 flex flex-col justify-center">
					<p class="">
						Every <span class="text-green-700 font-bold">5 friends</span> you refer to sign up for Cottage, you earn
						<span class="text-green-700 font-bold">${{ serviceGroup.referralProgramAmount }}</span
						>.
					</p>
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
								@click="copyReferralCode()"
							>
								<span>
									{{ referralCode }}
								</span>
								<nuxt-icon name="copy" filled />
							</div>
						</ClientOnly>
					</div>
					<p class="pt-2">Or share a link</p>
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
								@click="copyURL()"
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
		<div class="text-sm pt-2 text-center">
			By participating, you agree to the
			<a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
const config = useRuntimeConfig();
const { resident } = useStore("resident");
const { getReferralCode, referralCode } = useStore("cottageUser");
const { serviceGroup } = useStore("regServices");
const user = useSupabaseUser();

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

const isCopyReferralOpen = ref(false);
const isCopyLinkOpen = ref(false);
const isCopyMessage = ref(false);

onMounted(async () => {
	await getReferralCode(user.value.id);
});

function createTextMessage() {
	const bodyString =
		"I%20just%20signed%20up%20with%20Cottage%20to%20manage%20my%20electricity%20account.%20They%20are%20saving%20me%2010%25%20on%20my%20electricity%20bill%20every%20month.%20Give%20them%20at%20try%21%0A%0A" +
		config.SITE_URL +
		"/ref/" +
		referralCode.value;
	if (navigator.userAgent.match(/iPhone/i)) {
		window.open("sms://?/&body=" + bodyString);
	} else if (navigator.userAgent.match(/Android/i)) {
		window.open("sms://?/?body=" + bodyString);
	} else {
		navigator.clipboard.writeText(
			"I just signed up with Cottage to manage my electricity account. They help 'power up' your electricity account and provide the cheapest way to convert your energy usage to renewable. Give them a try!" +
				config.SITE_URL +
				"/ref/" +
				referralCode.value,
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
		referralCode.value;
	window.location.href = mailString;
}

function copyURL() {
	navigator.clipboard.writeText(config.SITE_URL + "/ref/" + referralCode.value);
	isCopyLinkOpen.value = true;
	setTimeout(() => {
		isCopyLinkOpen.value = false;
	}, 1500);
}
function copyReferralCode() {
	navigator.clipboard.writeText(referralCode.value);
	isCopyReferralOpen.value = true;
	setTimeout(() => {
		isCopyReferralOpen.value = false;
	}, 1500);
}
</script>
