import { ApiError, SupabaseClient } from "@supabase/supabase-js";
import { H3Event } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";
import { ServerConfig } from "~~/server/config";

export async function getGreenButtonOAuthFromEvent(
	event: H3Event,
	provider: keyof ServerConfig,
): Promise<{
	data?: {
		greenButtonOAuthId: number;
		subscriptionId: string;
		refreshToken: string;
		userId: string;
	};
	error?: ApiError;
}> {
	const cookies = parseCookies(event);
	const supabase = serverSupabaseServiceRole(event);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(cookies["sb-access-token"]);
	if (error) {
		return { error };
	}
	const { data } = await supabase
		.from("GreenButtonOAuth")
		.select("id, cottageUserID, subscriptionID, refreshToken")
		.match({
			cottageUserID: user.id,
			provider,
		})
		.throwOnError()
		.select()
		.single();

	const { id: greenButtonOAuthId, subscriptionID: subscriptionId, refreshToken } = data;
	if (!subscriptionId || !refreshToken) {
		throw new Error(`User not authenticated with ${provider}`);
	}
	return {
		data: {
			greenButtonOAuthId,
			subscriptionId,
			refreshToken,
			userId: user.id,
		},
	};
}

export async function withGreenButtonSyncLogger(
	{
		supabase,
		greenButtonOAuthId,
		operation,
		description,
	}: {
		supabase: SupabaseClient;
		greenButtonOAuthId: number;
		operation: string;
		description?: string;
	},
	callback: () => any,
) {
	const {
		data: { id: syncLogId },
	} = await supabase
		.from("GreenButtonSyncLog")
		.insert({
			greenButtonOAuthId,
			status: "STARTED",
			operation,
			description,
		})
		.throwOnError()
		.select()
		.single();

	try {
		const result = await callback();
		await supabase.from("GreenButtonSyncLog").update({ status: "DONE" }).eq("id", syncLogId).throwOnError();
		return result;
	} catch (err) {
		await supabase
			.from("GreenButtonSyncLog")
			.update({
				status: "FAILED",
				description: err.message ?? err.toString(),
			})
			.eq("id", syncLogId)
			.throwOnError();
		throw err;
	}
}
