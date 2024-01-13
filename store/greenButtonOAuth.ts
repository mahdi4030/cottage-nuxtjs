import { defineStore, acceptHMRUpdate } from "pinia";
import { GreenButtonOAuth } from "~/types/Models";

function initGreenButton() {
	return {
		cottageUserID: null,
		provider: "",
		subscriptionID: "",
		accessToken: "",
		refreshToken: "",
		scopes: "",
		accountNumber: "",
		startDate: "",
		endDate: "",
	} as Partial<GreenButtonOAuth>;
}

export const useGreenButtonOAuth = defineStore(
	"greenbuttonOAuth",
	() => {
		const loaded = ref(false);
		const greenButton = ref(initGreenButton() as GreenButtonOAuth);

		const config = useRuntimeConfig();

		function reset() {
			Object.assign(greenButton.value, initGreenButton() as GreenButtonOAuth);
			if (!process.server) {
				// TODO: EXPIRE ACCESS TOKENS SO THEY ONLY LAST 1 HOUR
				document.cookie = "greenbuttonOAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
			}
		}

		// async function getGreenButtonOAuthByUserID(): Promise<void> {}

		return {
			loaded,
			greenButton,
			// getGreenButtonOAuthByUserID,
			reset,
		};
	},
	{
		persist: {
			paths: ["greenButton.startDate", "greenButton.endDate", "greenButton.subscriptionID"],
		},
	},
);

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useGreenButtonOAuth, import.meta.hot));
}
