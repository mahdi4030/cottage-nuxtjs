import { serverSupabaseServiceRole } from "#supabase/server";
import { greenButtonAdmin } from "~~/utils/greenButtonIntegration/admin";
import { parseBulkRequest } from "~~/utils/greenButtonIntegration/parsers";

export default defineEventHandler(async (event) => {
	// TODO: secure this endpoint, like restrict the IP addresses or check headers
	const provider = "COMED";

	// const supabase = serverSupabaseServiceRole(event);
	const body = await readBody<string>(event);
	console.log("EVENT IS:", event);
	console.log("BODY IS:", body);
	return { data: "OK!!" };
});
