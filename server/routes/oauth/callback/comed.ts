import { serverSupabaseClient } from "#supabase/server";
import { createError, sendError } from "h3";
import serverConfig from "~~/server/config";
import { ElectricStatus } from "~~/types/Enums";

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

	const authRequestBodyDetails = {
		grant_type: "authorization_code",
		code: body.code,
		redirect_uri: config.public.SITE_URL + "/oauth/comed/handback",
	};

	const bodyContent = Object.keys(authRequestBodyDetails)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(authRequestBodyDetails[key]))
		.join("&");
	console.log("AUTH REQUEST BODY", bodyContent);
	let authToken;
	try {
		authToken = await $fetch(serverConfig[serviceKey].GBC_URL + "/authorization/oauth/gbc/auth-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
				Authorization: serverConfig[serviceKey].AUTHORIZATION,
			},
			body: bodyContent,
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

	const supabase = serverSupabaseClient(event);
	const { data: accountData } = await supabase
		.from("ElectricAccount")
		.select("id, accountNumber")
		.match({
			cottageUserID: user.id,
			electricCompanyID: serviceKey,
		})
		.limit(1)
		.throwOnError()
		.maybeSingle();

	if (accountData) {
		// update
		console.log("updating existing account");
		await supabase
			.from("ElectricAccount")
			.update({
				status: ElectricStatus.ACTIVE,
				isAccountLinkedWithUtility: true,
			})
			.eq("cottageUserID", user.id)
			.throwOnError();
	}

	const subscriptionID = authToken.resourceURI.substring(authToken.resourceURI.lastIndexOf("/") + 1);
	const oauthData = {
		provider: serviceKey,
		accessToken: authToken.access_token,
		refreshToken: authToken.refresh_token,
		// id: user.id,
		cottageUserID: user.id,
		scopes: authToken.scope,
		subscriptionID,
		electricAccountID: accountData.id,
	};

	const { data, error } = await supabase.from("GreenButtonOAuth").insert(oauthData);
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
