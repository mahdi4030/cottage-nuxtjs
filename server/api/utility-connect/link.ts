import { createError, sendError } from "h3";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody(event);
	console.log(body);
	const { provider, username, password, userId, utilityAPIProvider = null } = body;

	const baseUrl = config.UTILITY_CONNECT_URL;
	const apiKey = config.PRIVATE_API_SECRET_KEY;

	console.log(baseUrl);
	console.log(apiKey);
	console.log(username);
	console.log(password);
	console.log(userId);

	const url = `${baseUrl}/${provider}/test-login`;
	console.log(url);

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				username,
				password,
				userId,
				provider: utilityAPIProvider,
			}),
		});
		if (res.status === 200) {
			return await res.json();
		} else {
			console.log(res);
			sendError(
				event,
				createError({
					statusMessage: "Failed to connect. Invalid credentials.",
				}),
			);
		}
	} catch (error) {
		console.log(error);
		return { error };
	}
});
