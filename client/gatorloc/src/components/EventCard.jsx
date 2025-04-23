import { Calendar, MapPin, Clock } from "lucide-react";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-300">
      <div className="h-48 overflow-hidden rounded-lg max-w-[90%] mx-auto my-2">
        <img 
          src={event.imageUrl || "https://via.placeholder.com/400x200?text=Event+Image"} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-blue-500 mb-2 bg-green-200 rounded-md p-2">{event.title}</h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-blue-700">
            <Calendar size={16} className="mr-2 text-pink-600" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          {event.time && (
            <div className="flex items-center text-blue-700">
              <Clock size={16} className="mr-2 text-pink-600" />
              <span>{event.time}</span>
            </div>
          )}
          
          {event.location && (
            <div className="flex items-center text-blue-700">
              <MapPin size={16} className="mr-2 text-pink-600" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        
        <p className="text-blue-900 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-400 hover:bg-pink-500 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
