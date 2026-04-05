import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationDate: { type: Date, default: Date.now },
    attendanceStatus: {
      type: String,
      enum: ["Pending", "Present", "Absent"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// One student can register for an event only once
registrationSchema.index({ event: 1, student: 1 }, { unique: true });

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
export default Registration;
