import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bug", bugSchema);
