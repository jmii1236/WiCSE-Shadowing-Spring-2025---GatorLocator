import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
	loading: false,

	updateProfile: async (data) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.put("/users/update", data);
			useAuthStore.getState().setAuthUser(res.data.user);
			toast.success("Profile updated successfully");
			return { success: true, user: res.data.user };
		} catch (error) {
			console.error("Profile update error:", error);
			const errorMessage = error.response && error.response.data && error.response.data.message 
				? error.response.data.message 
				: "Something went wrong with the profile update";
			toast.error(errorMessage);
			return { success: false, error: errorMessage };
		} finally {
			set({ loading: false });
		}
	},
}));
