export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	if (!user.value) {
		return navigateTo({ name: "signin", query: { redirect: to.path } });
	}
});
