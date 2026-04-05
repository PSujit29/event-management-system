import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// POST /auth/register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, rollNumber } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "firstName, lastName, email, and password are required.",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      rollNumber,
    });
    const token = signToken(user._id);

    res.status(201).json({ token, user: user.toPublic() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated." });
    }

    const token = signToken(user._id);

    res.json({ token, user: user.toPublic() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
