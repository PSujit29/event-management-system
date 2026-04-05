/**
 * Seed script — run once to populate MongoDB with sample data.
 * Usage: node src/seed/seed.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Template from "../models/Template.js";

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Event.deleteMany(),
    Registration.deleteMany(),
    Template.deleteMany(),
  ]);
  console.log("Cleared existing data.");

  // ── Users ──────────────────────────────────────────────────────────────────
  const password = await bcrypt.hash("password123", 12);

  const [admin, teacher, student1, student2] = await User.insertMany([
    {
      firstName: "Admin",
      lastName:  "User",
      email:     "admin@example.com",
      password,
      role:      "Admin",
    },
    {
      firstName: "John",
      lastName:  "Teacher",
      email:     "teacher@example.com",
      password,
      role:      "Teacher",
    },
    {
      firstName: "Alice",
      lastName:  "Student",
      email:     "alice@example.com",
      password,
      role:      "Student",
      rollNumber: "STU001",
    },
    {
      firstName: "Bob",
      lastName:  "Student",
      email:     "bob@example.com",
      password,
      role:      "Student",
      rollNumber: "STU002",
    },
  ]);
  console.log("Seeded users.");

  // ── Templates ──────────────────────────────────────────────────────────────
  const [tmpl1, tmpl2] = await Template.insertMany([
    {
      name:          "Tech Talk Session",
      description:   "A 2-hour technical session with Q&A and networking.",
      totalDuration: 2,
      createdBy:     admin._id,
      subEvents: [
        { name: "Opening",    description: "Welcome and session overview", duration: 0.5 },
        { name: "Main Talk",  description: "Speaker presentation and demo", duration: 1 },
        { name: "Q&A",        description: "Audience questions and discussion", duration: 0.5 },
      ],
    },
    {
      name:          "Hands-on Workshop",
      description:   "Structured workshop format with practical activities.",
      totalDuration: 4,
      createdBy:     admin._id,
      subEvents: [
        { name: "Introduction", description: "Objectives and prerequisites", duration: 0.5 },
        { name: "Lab Session",  description: "Guided hands-on implementation", duration: 3 },
        { name: "Review",       description: "Wrap-up and feedback", duration: 0.5 },
      ],
    },
  ]);
  console.log("Seeded templates.");

  // ── Events ─────────────────────────────────────────────────────────────────
  const now = new Date();
  const future = (days) => new Date(now.getTime() + days * 86400000);
  const past   = (days) => new Date(now.getTime() - days * 86400000);

  const [event1, event2, event3] = await Event.insertMany([
    {
      name:        "Annual Tech Symposium 2026",
      description: "The biggest tech gathering of the year.",
      eventUrl:    "tech-symposium-2026",
      startDate:   future(30),
      startTime:   "09:00",
      duration:    48,
      status:      "Upcoming",
      createdBy:   admin._id,
      subEvents: [
        { name: "Opening Ceremony", description: "Keynote and welcome", startDate: future(30), duration: 2 },
        { name: "Web Dev Workshop", description: "Hands-on React workshop", startDate: future(31), duration: 3 },
      ],
    },
    {
      name:        "Spring Hackathon",
      description: "24-hour coding challenge open to all students.",
      eventUrl:    "spring-hackathon-2026",
      startDate:   future(7),
      startTime:   "18:00",
      duration:    24,
      status:      "Upcoming",
      createdBy:   teacher._id,
      subEvents: [
        { name: "Kickoff",       description: "Team formation and problem reveal", startDate: future(7), duration: 1 },
        { name: "Hacking Phase", description: "Main coding session", startDate: future(7), duration: 22 },
        { name: "Demo Day",      description: "Project presentations", startDate: future(8), duration: 1 },
      ],
    },
    {
      name:        "Cultural Fest 2026",
      description: "Annual college cultural festival showcasing student talents.",
      eventUrl:    "cultural-fest-2026",
      startDate:   past(10),
      startTime:   "10:00",
      duration:    72,
      status:      "Completed",
      createdBy:   admin._id,
    },
  ]);
  console.log("Seeded events.");

  // ── Registrations ──────────────────────────────────────────────────────────
  await Registration.insertMany([
    {
      event:            event1._id,
      student:          student1._id,
      attendanceStatus: "Pending",
    },
    {
      event:            event2._id,
      student:          student1._id,
      attendanceStatus: "Pending",
    },
    {
      event:            event3._id,
      student:          student2._id,
      attendanceStatus: "Present",
    },
  ]);
  console.log("Seeded registrations.");

  console.log("\n✅ Seed complete! Default credentials:");
  console.log("  Admin   → admin@example.com   / password123");
  console.log("  Teacher → teacher@example.com / password123");
  console.log("  Student → alice@example.com   / password123");
  console.log("  Student → bob@example.com     / password123");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});