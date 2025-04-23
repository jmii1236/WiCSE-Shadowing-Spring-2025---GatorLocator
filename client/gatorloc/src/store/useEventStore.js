import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from "../lib/axios";

// Use persist middleware to save events locally
export const useEventStore = create(
  persist(
    (set, get) => ({
      events: [],
      isLoadingEvents: false,
      error: null,
      
      loadEvents: async () => {
        console.log("Starting to load events");
        set({ isLoadingEvents: true, error: null });
        try {
          console.log("Attempting to fetch events from API");
          try {
            const res = await axiosInstance.get('/events/create');
            console.log("Events API response:", res);
            
            // Check if the response has an events property
            const eventsData = res.data.events || res.data;
            
            set({ events: eventsData, isLoadingEvents: false });
            console.log("Events loaded successfully:", eventsData);
            return;
          } catch (err) {
            console.log("API error details:", err);
            console.log("API not available, using local data");
          }
          
          set({ isLoadingEvents: false });
        } catch (error) {
          console.error("Error loading events:", error);
          set({ error: error.message, isLoadingEvents: false });
        }
      },
      
      createEvent: async (eventData) => {
        try {
          // Try to use API first
          try {
            const res = await axiosInstance.post('/events/create', eventData);
            const newEvent = res.data;
            set(state => ({ events: [newEvent, ...state.events] }));
            return newEvent;
          } catch (err) {
            console.log("API not available, storing locally");
          }
          
          // If API fails, create event locally with generated ID
          const newEvent = {
            id: Date.now().toString(),
            ...eventData,
            createdAt: new Date().toISOString()
          };
          
          set(state => ({ events: [newEvent, ...state.events] }));
          return newEvent;
        } catch (error) {
          console.error("Error creating event:", error);
          set({ error: error.message });
          throw error;
        }
      },
    }),
    {
      name: 'events-storage', // name of the item in localStorage
      getStorage: () => localStorage, // storage object
    }
  )
);
