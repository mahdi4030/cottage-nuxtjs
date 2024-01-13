import { ElectricStatus } from "~~/types/Enums";
export const useElectricAccount = () => {
	const supabase = useSupabaseClient();

	async function closeElectricAccountByID(id: string): Promise<void> {
		const { error } = await supabase
			.from("ElectricAccount")
			.update({
				isActive: false,
				status: ElectricStatus.DEACTIVATED,
			})
			.eq("id", id);
		if (error) {
			throw error;
		}
	}

	return {
		closeElectricAccountByID,
	};
};
