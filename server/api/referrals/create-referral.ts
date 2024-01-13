import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { referrerCode, userID } = body;

	console.log("referrerCode", referrerCode);
	console.log("userID", userID);

	try {
		const supabase = serverSupabaseServiceRole(event);
		const { data: referralPartner, error: referralError } = await supabase
			.from("CottageUsers")
			.select("id")
			.eq("referralCode", referrerCode)
			.maybeSingle();
		if (referralError) {
			console.log(referralError);
			return sendError(event, createError({ statusMessage: "No referral user found" }));
		}
		if (referralPartner) {
			const referralData = {
				referredBy: referralPartner.id,
				referred: userID,
				referralStatus: "pending",
			};
			const { data, error } = await supabase.from("Referrals").insert(referralData);
			if (error) {
				console.log("Error inserting referral:", error.message);
				return sendError(event, createError({ statusMessage: error.message }));
			} else {
				console.log("Referral inserted successfully:", data);
				// send success response using h3
				return { data: "Referral created successfully" };
			}
		}
		return sendError(event, createError({ statusMessage: "No referral user found" }));
	} catch (error) {
		return { error };
	}
});
