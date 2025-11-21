const JobSchema = require("../models/JobSchema");
const Message = require("../models/MessageSchema");

class MessageServices {
  static async createMessage({ jobId, fromUserId, toUserId, message }) {
    const msg = new Message({
      jobId,
      fromUserId,
      toUserId,
      message,
    });

    await msg.save();
    return msg.toObject();
  }
  static async getSingleMessages(jobId) {
    if (!jobId) throw new Error("Job ID is required");

    const msgs = await Message.find({ jobId })
      .sort({ createdAt: 1 }) // oldest first
      .populate("fromUserId toUserId", "firstName phoneNumber profilePhotoUrl"); // get user info

    return msgs.map((msg) => msg.toObject()); // convert to plain objects to avoid circular JSON
  }
}
module.exports = MessageServices;
