import routes from "~~/assets/json/form-routes.json";

export default () => {
	const route = useRoute();
	const router = useRouter();
	const { registration } = useStore("registration");
	const routingPath = useState("routingPath", () => registration.value.flowType ?? "DEFAULT");
	// const routingLogic = useState("routingLogic", () => routes[routingPath.value]);
	const routingLogic = () => {
		const path = routingPath.value;
		return routes[path];
	};
	const currentRoute = route.path;
	const user = useSupabaseUser();

	// Used to Resolve path of dynamic items in the routing logic
	const resolvePath = (object, path, defaultValue) => path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

	// return TRUE = page has MISSING required fields
	// return FALSE = page has completed all required fields
	const checkRequiredFields = () => {
		const currentIndex = routingLogic().findIndex((arr) => {
			return arr.path === currentRoute;
		});
		if (routingLogic() !== undefined && currentIndex !== undefined && routingLogic()[currentIndex] !== undefined) {
			const requiredFieldsObj = routingLogic()[currentIndex].requiredFields;
			if (requiredFieldsObj !== undefined && Object.keys(requiredFieldsObj).length !== 0) {
				const requiredFields = requiredFieldsObj[registration.value.accountType];
				if (requiredFields !== undefined) {
					const enabled = requiredFields.every((field) => {
						const value = resolvePath(registration.value, field, null);
						// console.log("VALUE IS", value);
						if (value === null || value === undefined) {
							return false;
						} else if (typeof value === "boolean") {
							return true;
						} else if (value.length !== undefined && typeof value === "string") {
							return value.length > 1;
						} else if (value !== undefined && typeof value === "object") {
							return Object.keys(value).length > 0;
						} else if (value !== undefined && typeof value === "number") {
							return value !== null;
						} else if (value !== undefined) {
							return value === true;
						} else {
							return false;
						}
					});
					return !enabled;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	const navigateToNextPage = async () => {
		let nextIndex =
			routingLogic().findIndex((arr) => {
				return arr.path === currentRoute;
			}) + 1;

		let nextRoute;
		do {
			if (routingLogic()[nextIndex].accountType === undefined) {
				nextRoute = routingLogic()[nextIndex].path;
			} else if (routingLogic()[nextIndex].accountType !== undefined) {
				if (routingLogic()[nextIndex].accountType.includes(registration.value.accountType)) {
					nextRoute = routingLogic()[nextIndex].path;
				}
			}
			nextIndex++;
		} while (nextIndex >= 0 && nextIndex < routingLogic().length && nextRoute == undefined);

		router.push(nextRoute);
	};

	const navigateToPreviousPage = async () => {
		let prevIndex =
			routingLogic().findIndex((arr) => {
				return arr.path === currentRoute;
			}) - 1;

		let nextRoute;
		do {
			if (routingLogic()[prevIndex].path === "/onboarding/create-account") {
				if (!user.value) {
					// SETS THE NEXT ROUTE TO THE NEXT PAGE BC NEXT INDEX HAS BEEN INCREASED ALREADY IN THE WHILE
					nextRoute = routingLogic()[prevIndex].path;
				}
			} else if (routingLogic()[prevIndex].accountType === undefined) {
				nextRoute = routingLogic()[prevIndex].path;
			} else if (routingLogic()[prevIndex].accountType !== undefined) {
				if (routingLogic()[prevIndex].accountType.includes(registration.value.accountType)) {
					nextRoute = routingLogic()[prevIndex].path;
				}
			}
			prevIndex--;
		} while (prevIndex >= 0 && prevIndex < routingLogic().length && nextRoute == undefined);

		router.push(nextRoute);
	};

	return {
		routingPath,
		routingLogic,
		checkRequiredFields,
		navigateToNextPage,
		navigateToPreviousPage,
	};
};
