import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
    enum: ["1st", "2nd", "3rd", "4th", "5th+"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "nonbinary", "other"],
  },
  interests: [{
    type: String,
    required: true,
    enum: ["movies", "live music", "working out", "books", "hiking"]
  }],
interestsPreference: [{
  type: String,
  required: true,
  enum: ["movies", "live music", "working out", "books", "hiking"],
}],
  isVerified: {
    type: Boolean, default: false
  },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) {
  //   return next();
  // }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
