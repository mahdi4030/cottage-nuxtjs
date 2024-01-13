import { serverSupabaseServiceRole } from "#supabase/server";
import { ServerConfig } from "~~/server/config";
import { greenButtonClient } from "~~/utils/greenButtonIntegration/client";
import { getGreenButtonOAuthFromEvent } from "~~/utils/greenButtonIntegration/helpers";

export default defineEventHandler(async (event) => {
	const body = await readBody<{
		provider: keyof ServerConfig;
		operations: string[];
		secret?: string;
		greenButtonOAuthId?: number;
		subscriptionId?: string;
		refreshToken?: string;
		userId?: string;
	}>(event);

	console.log("BODY IS:", body);

	if (body.secret !== (process.env.PRIVATE_API_SECRET_KEY || "SECRET")) {
		console.log("BODY SECRET != PROCESS.ENV.PRIVATE_API_SECRET_KEY");
		if (body.secret) {
			throw new Error("Invalid secret key");
		}
		// fallback to user if no secret
		const { data, error } = await getGreenButtonOAuthFromEvent(event, body.provider);
		console.log(data);
		if (error) {
			throw error;
		}
		if (data) {
			body.greenButtonOAuthId = data.greenButtonOAuthId;
			body.userId = data.userId;
			body.subscriptionId = data.subscriptionId;
			body.refreshToken = data.refreshToken;
		}
	}

	const supabase = serverSupabaseServiceRole(event);

	const { greenButtonOAuthId, userId, refreshToken, subscriptionId, operations, provider } = body;

	console.log("syncing for", greenButtonOAuthId, provider, operations);

	const greenButton = await greenButtonClient({
		supabase,
		subscriptionId,
		refreshToken,
		greenButtonOAuthId,
		provider,
	});
	if (operations.includes("meter readings")) {
		await greenButton.syncMeterReadings();
	}
	if (operations.includes("customer data")) {
		await greenButton.syncCustomerData(userId);
	}
	if (operations.includes("billing summaries")) {
		await greenButton.syncBillingSummaries();
	}
	if (operations.includes("historic data")) {
		const { data: meterReadings } = await supabase
			.from("GreenButtonMeterReading")
			.select("*")
			.eq("greenButtonOAuthId", greenButtonOAuthId)
			.throwOnError();
		for (const { meterReadingId, usagePointId, serviceCategoryKind } of meterReadings) {
			await greenButton.syncHistoricData({
				meterReadingId,
				usagePointId,
				serviceCategoryKind,
			});
		}
	}
	return "OK";
});
