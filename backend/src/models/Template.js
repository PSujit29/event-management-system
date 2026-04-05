import mongoose from "mongoose";

const templateSubEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  duration: { type: Number, default: 1 }, // hours
});

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    totalDuration: { type: Number, default: null }, // hours
    subEvents: [templateSubEventSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);
export default Template;
