import devConfig from "~~/utils/utilityIntegrationConfig/config.dev.json";
import prodConfig from "~~/utils/utilityIntegrationConfig/config.prod.json";
import { useRuntimeConfig } from "#app";

export default function () {
	const { serviceGroup } = useStore("regServices");

	const oAuthConfig = (key = serviceGroup.value.electricCompanyID.id) => {
		const config = useRuntimeConfig();
		console.log(key);
		if (key !== "") {
			switch (config.ENVIRONMENT) {
				case "prod":
					return prodConfig[key] ?? {};
				case "staging":
				case "dev":
				default:
					return devConfig[key] ?? {};
			}
		} else {
			return {};
		}
	};

	return {
		oAuthConfig,
	};
}
