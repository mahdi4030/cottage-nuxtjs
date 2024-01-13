import { serverSupabaseServiceRole } from "#supabase/server";
import { greenButtonAdmin } from "~~/utils/greenButtonIntegration/admin";
import { parseBulkRequest } from "~~/utils/greenButtonIntegration/parsers";

export default defineEventHandler(async (event) => {
	// TODO: secure this endpoint, like restrict the IP addresses or check headers
	const provider = "CON_EDISON";

	const supabase = serverSupabaseServiceRole(event);
	const body = await readBody<string>(event);
	const urls = await parseBulkRequest(body);
	const { data } = await supabase
		.from("GreenButtonBulkDownload")
		.insert(
			urls.map((url) => ({
				provider,
				url,
				status: "PENDING",
			})),
		)
		.throwOnError();

	// attempt to parse realtime data
	const greenButton = await greenButtonAdmin({ supabase, provider });
	for (const url of urls) {
		await greenButton.downloadAndSaveBulkData(url);
	}
	return data;
});
