import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

export const signup = async (req,res) => {
  
	const { name, email, password, year, gender, interests, interestsPreference } = req.body;
  try {
		if (!name || !email || !password || !year || !gender || 
			!interests || !interestsPreference || 
			!Array.isArray(interests) || interests.length === 0 || 
			!Array.isArray(interestsPreference) || interestsPreference.length === 0) {
		return res.status(400).json({
			success: false,
			message: "All fields are required",
		});
	}

		if (!email.endsWith("@ufl.edu")) {
			return res.status(400).json({
				success: false,
				message: "You must have a UF email",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 6 characters",
			});
		}

		const newUser = await User.create({
			name,
			email,
			password,
			year,
			gender,
			interests,
			interestsPreference,
      isVerified: false,
		});

    const token = signToken(newUser._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(201).json({
			success: true,
			user: newUser,
		});

  } catch (error) {
    console.log("Error in signup controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
  }
}
export const login = async (req,res) => {
  const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = signToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log("Error in login controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
}
export const logout = async (req,res) => {
  res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
}
