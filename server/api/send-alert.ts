import { createError, sendError } from "h3";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody(event);
	console.log(body);
	const { message, channel } = body;

	const baseUrl = config.UTILITY_CONNECT_URL;
	const apiKey = config.PRIVATE_API_SECRET_KEY;

	console.log(baseUrl);
	console.log(apiKey);
	console.log(message);
	console.log(channel);

	const url = `${baseUrl}/utils/slack/notify`;
	console.log(url);

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				secret: apiKey,
				message,
				channel,
			}),
		});
		if (res.status === 200) {
			return await res.json();
		} else {
			console.log(res);
			sendError(
				event,
				createError({
					statusMessage: "Failed to send alert to channel.",
				}),
			);
		}
	} catch (error) {
		console.log(error);
		return { error };
	}
});
