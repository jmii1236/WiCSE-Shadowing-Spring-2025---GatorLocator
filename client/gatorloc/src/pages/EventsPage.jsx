import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { Calendar, PlusCircle } from "lucide-react";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { useEventStore } from "../store/useEventStore";

const EventsPage = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const { authUser } = useAuthStore();
  const { events, loadEvents, isLoadingEvents } = useEventStore();

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-orange-300 to-purple-300 overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-blue-800">Events</h1>
              {authUser && (
                <button
                  onClick={() => setShowEventForm(true)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <PlusCircle size={20} />
                  <span>Create Event</span>
                </button>
              )}
            </div>

            {showEventForm && (
              <div className="mb-8">
                <EventForm onClose={() => setShowEventForm(false)} />
              </div>
            )}

            {isLoadingEvents ? (
              <EventsLoading />
            ) : events.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {events.map(event => (
                  <EventCard key={event._id} event={event} /> 
                ))}
              </div>
            ) : (
              <NoEvents />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const NoEvents = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Calendar className="text-blue-500 mb-6" size={80} />
    <h2 className="text-2xl font-bold text-blue-800 mb-3">No Events Yet!</h2>
    <p className="text-lg text-blue-600 mb-6">Be the first to create an event for fellow Gators!</p>
  </div>
);

const EventsLoading = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-white/80 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-40 bg-blue-200 rounded mb-4"></div>
        <div className="h-6 bg-blue-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-blue-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-blue-200 rounded w-5/6"></div>
      </div>
    ))}
  </div>
);

export default EventsPage;

