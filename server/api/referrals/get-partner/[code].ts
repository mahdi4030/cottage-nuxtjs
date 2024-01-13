import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const code = event.context.params.code;
	console.log(code);

	try {
		const supabase = serverSupabaseServiceRole(event);
		const { data, error } = await supabase
			.from("ReferralPartner")
			.select("id, name, imgURL, CottageUsers ! id (id, referralCode)")
			.eq("code", code)
			.maybeSingle();
		if (error) {
			console.log(error);
			return sendError(event, createError({ statusMessage: "No partner found" }));
		}
		if (data) {
			console.log(data);
			return {
				name: data.name,
				imgURL: data.imgURL,
				referralCode: data.CottageUsers?.referralCode,
			};
		}
		return null;
	} catch (error) {
		return { error };
	}
});
