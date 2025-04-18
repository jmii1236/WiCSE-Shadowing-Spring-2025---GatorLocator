import Event from "../models/eventModel.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, time, imageUrl } = req.body;
    
    // Validate required fields
    if (!title || !description || !location || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }
    
    // Create event with user as creator
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      time,
      imageUrl,
      creator: req.user._id,
      creatorName: req.user.name
    });
    
    await newEvent.save();
    
    res.status(201).json({
      success: true,
      event: newEvent
    });
    
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message
    });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .limit(50);
      
    res.json({
      success: true,
      events
    });
    
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message
    });
  }
};

// Get a specific event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    res.json({
      success: true,
      event
    });
    
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message
    });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Check if user is the creator of the event
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this event"
      });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({
      success: true,
      event: updatedEvent
    });
    
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message
    });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }
    
    // Check if user is the creator of the event
    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this event"
      });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: "Event deleted successfully"
    });
    
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message
    });
  }
};