import { User } from "@supabase/gotrue-js";
import posthog from "posthog-js";

export const useAuth = () => {
	const supabaseAuthClient = useSupabaseAuthClient();
	const config = useRuntimeConfig();

	async function createAccount(email: string, password: string): Promise<void | User> {
		const { data, error } = await supabaseAuthClient.auth.signUp({
			email,
			password,
		});
		if (error) {
			throw error;
		}
		console.log(data);
		return data.user as User;
	}

	async function createOAuthSession(provider: string, redirectURL = "/oauth/redirect") {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const { error } = await supabaseAuthClient.auth.signInWithOAuth({ provider, options: { redirectTo: config.SITE_URL + redirectURL } });
		if (error) {
			throw error;
		}
	}

	async function login(email: string, password: string): Promise<void | User> {
		const { data, error } = await supabaseAuthClient.auth.signInWithPassword({ email, password });
		if (error) {
			throw error;
		} else {
			if (process.env.NODE_ENV === "production") {
				try {
					posthog.identify(
						data?.user.id, // distinct_id, required
						{
							email: data?.user.email,
						},
					);
				} catch (error) {
					console.log("COULD NOT CREATE PH SESSION", error);
				}
			}
			return data?.user;
		}
	}

	async function logout(): Promise<boolean> {
		try {
			if (process.env.NODE_ENV === "production") {
				posthog.reset();
			}
			useResetLogout();
			await supabaseAuthClient.auth.signOut();
			return true;
		} catch (err) {
			return false;
		}
	}

	async function accountRecovery(email: string) {
		const { error } = await supabaseAuthClient.auth.api.resetPasswordForEmail(email);
		if (error) {
			throw error;
		}
	}

	async function confirmRecovery(accessToken: string, password) {
		const { error } = await supabaseAuthClient.auth.api.updateUser(accessToken, {
			password,
		});
		if (error) {
			throw error;
		}
	}

	return {
		accountRecovery,
		confirmRecovery,
		createAccount,
		login,
		logout,
		createOAuthSession,
	};
};
