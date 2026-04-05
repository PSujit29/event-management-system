import User from "../models/User.js";
import jwt from "jsonwebtoken";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// GET /users/me  (protected)
export const getMe = async (req, res) => {
  try {
    res.json(req.user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /users/:userId  (protected)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user.toPublic());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /users/add
export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, rollNumber } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({
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
