import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";

export const useMatchStore = create((set, get) => ({
	matches: [],
	isLoadingMyMatches: false,
	isLoadingUserProfiles: false,
	userProfiles: [],
	swipeFeedback: null,

	setUserProfiles: (userProfiles) => set({ userProfiles }),

	getMyMatches: async () => {
		try {
			set({ isLoadingMyMatches: true });
			const res = await axiosInstance.get("/matches");
			set({ matches: res.data.matches });
		} catch (error) {
			set({ matches: [] });
			toast.error(error?.response?.data?.message || error.message || "Something went wrong");
		} finally {
			set({ isLoadingMyMatches: false });
		}
	},

	getUserProfiles: async () => {
		try {
			set({ isLoadingUserProfiles: true });
			const res = await axiosInstance.get("/matches/user-profiles");
			set({ userProfiles: res.data.users });
		} catch (error) {
			set({ userProfiles: [] });
			toast.error(error?.response?.data?.message || error.message || "Something went wrong");
		} finally {
			set({ isLoadingUserProfiles: false });
		}
	},

	swipeLeft: async (user) => {
		try {
			set({ swipeFeedback: "passed" });
			await axiosInstance.post("/matches/swipe-left/" + user._id);
		} catch (error) {
			console.error(error);
			toast.error("Failed to swipe left");
		} finally {
			setTimeout(() => set({ swipeFeedback: null }), 1500);
		}
	},

	swipeRight: async (user) => {
		try {
			set({ swipeFeedback: "liked" });
			await axiosInstance.post("/matches/swipe-right/" + user._id);
		} catch (error) {
			console.error(error);
			toast.error("Failed to swipe right");
		} finally {
			setTimeout(() => set({ swipeFeedback: null }), 1500);
		}
	},

	subscribeToNewMatches: () => {
		try {
			const socket = getSocket();
			if (!socket) {
				console.error("Cannot subscribe to matches - socket not initialized");
				return;
			}

			// Remove existing listeners to prevent duplicates
			socket.off("newMatch");

			// Add new listener
			socket.on("newMatch", (matchData) => {
				console.log("Received newMatch event:", matchData);

				// Prevent duplicate match entries
				set((state) => {
					const matchExists = state.matches.some((m) => m._id === matchData._id);
					return {
						matches: matchExists ? state.matches : [...state.matches, matchData],
						swipeFeedback: "matched",
					};
				});

				toast.success("You got a new match!");

				setTimeout(() => set({ swipeFeedback: null }), 3000);
			});

			console.log("Subscribed to newMatch events");
		} catch (error) {
			console.error("Error subscribing to matches:", error);
		}
	},

	unsubscribeFromNewMatches: () => {
		try {
			const socket = getSocket();
			if (socket) {
				socket.off("newMatch");
			}
		} catch (error) {
			console.error("Error unsubscribing from matches:", error);
		}
	},
}));
