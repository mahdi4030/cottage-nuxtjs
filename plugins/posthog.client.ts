import posthog from "posthog-js";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook("app:mounted", async () => {
		if (process.env.NODE_ENV === "production") {
			posthog.init("phc_DjFWBRR0eDzSlr8tNY7cs0eONLJU4xks8bPZbK917X1", {
				api_host: "https://app.posthog.com",
				session_recording: {
					maskAllInputs: false,
				},
			});
		}
	});
});
