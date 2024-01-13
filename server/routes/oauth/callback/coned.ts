import { serverSupabaseClient } from "#supabase/server";
import { createError, sendError } from "h3";
import serverConfig from "~~/server/config";

export default defineEventHandler(async (event) => {
	console.log("SERVER CONFIG", serverConfig);
	const config = useRuntimeConfig();
	const body = await readBody(event);
	console.log("BODY", body);
	const user = body.user;
	const greenButton = body.greenButton;
	const electricCompany = body.electricCompany;
	const cookies = parseCookies(event);
	console.log("COOKIES", cookies);
	const serviceKey = electricCompany !== "" ? electricCompany : cookies.electricCompany;
	const HEADERS = {
		"ocp-apim-subscription-key": serverConfig[serviceKey].SUBSCRIPTION_KEY,
	};
	console.log("SUB KEY", serverConfig[serviceKey].SUBSCRIPTION_KEY);
	const authRequestBody = {
		grantType: "authorization_code",
		clientId: serverConfig[serviceKey].CLIENT_ID,
		clientSecret: serverConfig[serviceKey].CLIENT_SECRET,
		authCode: body.code,
		redirectUri: config.public.SITE_URL + "/oauth/coned/handback",
	};
	console.log("AUTH REQUEST BODY", authRequestBody);
	let authToken;
	try {
		authToken = await $fetch(serverConfig[serviceKey].GBC_URL + "/oauth/v1/Token", {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(authRequestBody),
		});
		console.log(authToken);
	} catch (err) {
		console.log(err);
		sendError(
			event,
			createError({
				statusMessage: "Could not fetch the Auth Token from Con Ed GBC URL",
				data: { extra: { cookies, ...body, ...user } },
			}),
		);
	}
	const subscriptionID = authToken.resourceURI.substring(authToken.resourceURI.lastIndexOf("/") + 1);
	const startDate = greenButton.startDate !== "" ? greenButton.startDate : cookies.greenButtonStartDate;
	const endDate = greenButton.endDate !== "" ? greenButton.endDate : cookies.greenButtonEndDate;
	const oauthData = {
		provider: serviceKey,
		accessToken: authToken.access_token,
		refreshToken: authToken.refresh_token,
		// id: user.id,
		cottageUserID: user.id,
		scopes: authToken.scope,
		subscriptionID,
		startDate,
		endDate,
	};
	// let oauthData = {
	//   provider: "Con Edison",
	//   accessToken: "<ACCESS_TOKEN> UPDATED AGAIN!!!",
	//   refreshToken: "<REFRESH_TOKEN>",
	//   id: user.id,
	//   scopes: "<SCOPE>",
	//   subscriptionID: "<SUBSCRIPTION_ID>",
	//   startDate: greenButton.startDate,
	//   endDate: greenButton.endDate,
	// };
	const supabase = serverSupabaseClient(event);
	const { data, error } = await supabase.from("GreenButtonOAuth").insert(oauthData).select();
	console.log(data);
	if (error) {
		console.log(error);
		sendError(
			event,
			createError({
				statusMessage: "Failed connection to Supabase and could not fetch initial docs",
				data: { extra: { cookies, body } },
			}),
		);
	}
	// return { accessToken: "<ACCESS_TOKEN>", subscriptionID: "<SUBSCRIPTION_ID" };
	return { accessToken: authToken.access_token, subscriptionID };
});
