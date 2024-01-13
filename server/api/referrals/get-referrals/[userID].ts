import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const userID = event.context.params.userID;
	try {
		const supabase = serverSupabaseServiceRole(event);
		const { data, error: referral_error } = await supabase.rpc("get_referrals", { userid: userID });
		if (referral_error) throw referral_error;
		return data;
	} catch (referral_error) {
		return { referral_error };
	}
});
