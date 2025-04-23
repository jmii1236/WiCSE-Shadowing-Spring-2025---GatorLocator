import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas"];
const femaleNames = [
  "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"
];

const interests = ["movies", "live music", "working out", "books", "hiking"];

const bioDescriptors = [
  "Coffee addict", "Cat lover", "Dog person", "Foodie", "Gym rat", "Bookworm", "Movie buff", "Music lover",
  "Travel junkie", "Beach bum", "City slicker", "Outdoor enthusiast", "Netflix binger", "Yoga enthusiast",
  "Craft beer connoisseur", "Sushi fanatic", "Adventure seeker", "Night owl", "Early bird", "Aspiring chef"
];

const generateBio = () => {
  const descriptors = bioDescriptors.sort(() => 0.5 - Math.random()).slice(0, 3);
  return descriptors.join(" | ");
};

const getRandomInterests = () => {
  return interests.sort(() => 0.5 - Math.random()).slice(0, 3);
};

const getRandomYear = () => {
  const years = ["1st", "2nd", "3rd", "4th", "5th+"];
  return years[Math.floor(Math.random() * years.length)];
};

// Add this to your generateRandomUser function
const generateRandomUser = async (gender, index) => {
  const names = gender === "male" ? maleNames : femaleNames;
  const name = names[index];
  const year = getRandomYear();
  const userInterests = getRandomInterests();
  
  // Generate random interest preferences that may overlap with user's interests
  const allPossibleInterests = [...interests];
  const interestsPreference = allPossibleInterests
    .sort(() => 0.5 - Math.random())
    .slice(0, 2 + Math.floor(Math.random() * 3)); // 2-4 random interests

  return {
    name,
    email: `${name.toLowerCase()}${index + 1}@ufl.edu`,
    password: await bcrypt.hash("password123", 10),
    year,
    gender,
    interests: userInterests,
    interestsPreference: interestsPreference,
    isVerified: false,
    bio: generateBio(),
    image: `/${gender}/${index + 1}.jpg`,
    likes: [],
    dislikes: [],
    matches: [],
  };
};

const findMatchingProfiles = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const matchingUsers = await User.find({
      _id: { $ne: user._id },
      interests: { $in: user.interests },
    });

    return matchingUsers;
  } catch (error) {
    console.error("Error finding matching profiles:", error);
  }
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    const maleUsers = await Promise.all(maleNames.map((_, i) => generateRandomUser("male", i)));
    const femaleUsers = await Promise.all(femaleNames.map((_, i) => generateRandomUser("female", i)));

    const allUsers = [...maleUsers, ...femaleUsers];

    // Insert all users first
    const insertedUsers = await User.insertMany(allUsers);
    console.log(`Inserted ${insertedUsers.length} users`);

    // Now create some initial matches based on overlapping interests
    for (let i = 0; i < insertedUsers.length; i++) {
      const user = insertedUsers[i];
      
      // Find potential matches for this user
      const potentialMatches = insertedUsers.filter(otherUser => {
        // Don't match with self
        if (otherUser._id.equals(user._id)) return false;
        
        // Check for overlapping interests
        const hasOverlappingInterests = 
          otherUser.interests.some(interest => user.interestsPreference.includes(interest)) &&
          user.interests.some(interest => otherUser.interestsPreference.includes(interest));
          
        return hasOverlappingInterests;
      });
      
      // Randomly select up to 3 matches for this user
      const selectedMatches = potentialMatches
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, potentialMatches.length));
      
      if (selectedMatches.length > 0) {
        // Add matches to this user
        user.matches = selectedMatches.map(match => match._id);
        
        // Update the database
        await User.findByIdAndUpdate(user._id, { 
          matches: user.matches,
          // Also add them to likes, since they should already "like" their matches
          likes: user.matches
        });
        
        // Add this user as a match to the selected users
        for (const match of selectedMatches) {
          await User.findByIdAndUpdate(match._id, {
            $addToSet: { 
              matches: user._id,
              likes: user._id
            }
          });
        }
      }
    }

    console.log("Database seeded successfully with users and initial matches");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
