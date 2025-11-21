const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
