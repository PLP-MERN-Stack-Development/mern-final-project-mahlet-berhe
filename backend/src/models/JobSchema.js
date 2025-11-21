const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["cleaning", "delivery", "repair", "other"],
  },
  location: {
    city: { type: String, required: true },
    district: { type: String },
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    default: null,
  },
  status: {
    type: String,
    enum: ["open", "assigned", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Job", jobSchema);
