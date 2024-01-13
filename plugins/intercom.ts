export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook("app:mounted", () => {
		setTimeout(() => {
			window.Intercom("boot", {
				api_base: "https://api-iam.intercom.io",
				app_id: "n9z0ndsf",
			});
		}, 1500);
	});
	nuxtApp.hook("page:finish", () => {
		window.Intercom("update");
	});
});
