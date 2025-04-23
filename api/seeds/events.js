import mongoose from "mongoose";
import User from "../models/User.js";
import Event from "../models/eventModel.js";
import dotenv from "dotenv";

dotenv.config();

// Event data
const eventTitles = [
  "Game Night at the Student Union",
  "Campus Running Club",
  "Movie Marathon",
  "Study Group - Finals Prep",
  "Hiking Trip to Paynes Prairie",
  "Coding Workshop",
  "Book Club Meeting",
  "Football Watch Party",
  "Yoga on the Lawn",
  "Music Jam Session",
  "International Food Festival",
  "Career Networking Event",
  "Board Game Tournament",
  "Gator Basketball Game",
  "Volunteer Day"
];

const eventDescriptions = [
  "Join us for a fun night of board games and card games! Bring your favorites or use ours.",
  "Weekly running group for all fitness levels. We meet at the track and run for about an hour.",
  "We're watching all the classics! Bring snacks and prepare for a marathon session of great films.",
  "Let's ace those finals together! Group study session with snacks provided.",
  "A beautiful day hike through Paynes Prairie. Transportation provided from campus.",
  "Learn to code with fellow students! This workshop is perfect for beginners.",
  "This month we're discussing 'The Great Gatsby'. New members welcome!",
  "Watch the Gators take on their rivals! Food and drinks available.",
  "Relax and find your center with outdoor yoga. All levels welcome, bring your own mat.",
  "Bring your instruments for an impromptu jam session. All music styles welcome!",
  "Sample foods from around the world prepared by fellow students.",
  "Meet potential employers and practice your networking skills.",
  "Competitive and fun board game tournament with prizes for the winners.",
  "Cheer on the Gators basketball team at the O'Connell Center.",
  "Join us as we volunteer at the local food bank. Transportation provided."
];

const locations = [
  "Reitz Union",
  "Plaza of the Americas",
  "Library West",
  "O'Connell Center",
  "Flavet Field",
  "Computer Science Building",
  "Turlington Plaza",
  "Lake Alice Trail",
  "Norman Hall",
  "Marston Science Library",
  "Broward Outdoor Complex",
  "Recreation Center",
  "Cultural Plaza",
  "Hume Hall",
  "Pugh Hall"
];

// Function to generate a random future date (within the next 30 days)
const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');
  const year = futureDate.getFullYear();
  
  return `${month}/${day}/${year}`;
};

// Function to generate a random time
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.random() < 0.5 ? '00' : '30';
  const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
  
  return `${hours}:${minutes} ${ampm}`;
};

// Generate a random event
const generateRandomEvent = (index, allUsers) => {
  // Select a random user as the creator
  const creatorIndex = Math.floor(Math.random() * allUsers.length);
  const creator = allUsers[creatorIndex];
  
  // Generate between 0 and 8 random attendees (excluding the creator)
  const potentialAttendees = allUsers.filter(user => !user._id.equals(creator._id));
  const numAttendees = Math.floor(Math.random() * 9); // 0 to 8 attendees
  const attendees = potentialAttendees
    .sort(() => 0.5 - Math.random())
    .slice(0, numAttendees)
    .map(user => user._id);

  // Select a random event title, description, and location
  const title = eventTitles[index % eventTitles.length];
  const description = eventDescriptions[index % eventDescriptions.length];
  const location = locations[Math.floor(Math.random() * locations.length)];
  
  return {
    title,
    description,
    location,
    date: getRandomFutureDate(),
    time: getRandomTime(),
    imageUrl: `/events/${(index % 5) + 1}.jpg`, // Assuming you have 5 event images
    creator: creator._id,
    creatorName: creator.name,
    attendees
  };
};

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Delete existing events
    await Event.deleteMany({});
    
    // Get all users to reference as creators and attendees
    const allUsers = await User.find({});
    
    if (allUsers.length === 0) {
      console.error("No users found in the database. Please run the users seed script first.");
      return;
    }
    
    // Generate 15 random events
    const eventData = Array.from({ length: 15 }, (_, i) => 
      generateRandomEvent(i, allUsers)
    );
    
    // Insert all events
    const insertedEvents = await Event.insertMany(eventData);
    console.log(`Inserted ${insertedEvents.length} events`);
    
    console.log("Database seeded successfully with events");
  } catch (error) {
    console.error("Error seeding database with events:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedEvents();
