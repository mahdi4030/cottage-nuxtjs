import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const referrerCode = event.context.params.referrerCode;

	try {
		const supabase = serverSupabaseServiceRole(event);
		const { data, error } = await supabase.from("Resident").select("id, firstName").eq("referralCode", referrerCode).limit(1).single();
		if (error) {
			return sendError(event, createError({ statusMessage: "No user found" }));
		}
		return data;
	} catch (error) {
		return { error };
	}
});
