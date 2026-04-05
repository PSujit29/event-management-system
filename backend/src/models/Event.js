import mongoose from "mongoose";

const subEventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, default: null },
    duration: { type: Number, default: null }, // in hours
  },
  { timestamps: true },
);

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    // URL-friendly slug
    eventUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    startDate: { type: Date, required: true },
    startTime: { type: String, default: "00:00" },
    duration: { type: Number, default: null }, // total hours
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    // Organizer (Admin or Teacher)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Sub-events embedded
    subEvents: [subEventSchema],
    // If cloned from a template
    clonedFrom: { type: String, default: null },
  },
  { timestamps: true },
);

// Auto-derive status based on startDate and duration before saving
eventSchema.pre("save", function (next) {
  if (this.isModified("startDate") || this.isModified("status") || this.isNew) {
    const now = new Date();
    const start = new Date(this.startDate);
    const endMs = this.duration
      ? start.getTime() + this.duration * 3600000
      : null;

    if (this.status !== "Cancelled") {
      if (now < start) this.status = "Upcoming";
      else if (endMs && now > endMs) this.status = "Completed";
      else this.status = "Ongoing";
    }
  }
  next();
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
