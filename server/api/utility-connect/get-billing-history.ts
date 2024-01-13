import { send, createError, sendError } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const supabase = serverSupabaseServiceRole(event);
	const body = await readBody(event);
	console.log(event);
	console.log(body);
	const { provider, userId, accountNumber } = body;

	const baseUrl = config.UTILITY_CONNECT_URL;
	const apiKey = config.PRIVATE_API_SECRET_KEY;

	console.log(baseUrl);
	console.log(apiKey);
	console.log(userId);
	console.log(accountNumber);

	const url = `${baseUrl}/${provider}/get-account-billing-summaries`;
	console.log(url);

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				userId,
				accountNumber,
			}),
		});
		if (res.status === 200) {
			const bills = await res.json();

			const { data: occupancyRecord, error: occupancyError } = await supabase
				.from("Occupancy")
				.select("electricAccountID(id)")
				.eq("cottageUserID", userId)
				.is("isActive", true)
				.maybeSingle();
			if (occupancyError) {
				sendError(
					event,
					createError({
						statusMessage: "Fetching occupancy error",
						message: occupancyError.message,
					}),
				);
			}

			const billsArray = bills.map((bill) => {
				const endDate = new Date(bill.readDate);
				const formattedEndDate = endDate.toISOString().split("T")[0];
				const startDate = new Date(endDate);
				startDate.setDate(startDate.getDate() - bill.numDays);
				const formattedStartDate = startDate.toISOString().split("T")[0];
				const amount = bill.totalCharge * 100;
				return {
					electricAccountID: occupancyRecord.electricAccountID.id,
					totalAmountDue: amount,
					totalUsage: bill.usage,
					startDate: formattedStartDate,
					endDate: formattedEndDate,
					// electricInvoice: 1,
				};
			});

			console.log(billsArray);

			const { error: upsertError } = await supabase.from("ElectricBill").upsert(billsArray, { onConflict: "electricAccountID, startDate" });
			if (upsertError) {
				console.log(upsertError);
				sendError(
					event,
					createError({
						statusMessage: "Postgres Upsert Error  - Failed to sync to DB with error " + upsertError.message,
						// message: upsertError.message,
					}),
				);
			}
			event.node.res.statusCode = 202;
			event.node.res.end();
		} else {
			// console.log(res);
			sendError(
				event,
				createError({
					statusMessage: "Failed",
				}),
			);
		}
	} catch (error) {
		console.log(error);
		return { error };
	}
});
