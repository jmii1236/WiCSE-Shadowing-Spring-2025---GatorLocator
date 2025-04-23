import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useEventStore } from "../store/useEventStore";

const EventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "", // Default placeholder URL
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const createEvent = useEventStore(state => state.createEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createEvent(formData);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-md p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-500">New Event Form</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-pink-500">
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-blue-500 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-500 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-500 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-500 mb-1">
              Event Image
            </label>
            <div className="mt-1 flex items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Upload Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          {image && (
            <div className="mt-4">
              <img src={image} alt="Event Image" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}
          
          {!image && formData.imageUrl && (
            <div className="mt-4">
              <img src={formData.imageUrl} alt="Default Event Image" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-blue-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-400 hover:bg-pink-500 disabled:bg-fuchsia-300"
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
