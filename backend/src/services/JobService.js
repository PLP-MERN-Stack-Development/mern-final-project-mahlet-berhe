const JobSchema = require("../models/JobSchema");
const User = require("../models/JobSchema");

class JobServices {
  static async postJob(jobData, user) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    if (user.role !== "employee") {
      throw new Error("Only employers can create jobs");
    }

    const job = new JobSchema({
      ...jobData,
      postedBy: user._id,
      status: jobData.status || "open",
    });

    await job.save();
    return job.toObject(); // safe to return JSON
  }

  static async getAllJobs(query) {
    const { category, city, q } = query; // destructure the passed object

    try {
      const filter = { status: "open" };

      if (category) filter.category = category;
      if (city) filter.city = city; // if you want to filter by city
      if (q) {
        filter.$or = [
          { title: new RegExp(q, "i") },
          { description: new RegExp(q, "i") },
        ];
      }

      const jobs = await JobSchema.find(filter)
        .sort({ createdAt: -1 })
        .limit(100);
      return jobs;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async getSingleJob(jobId, user) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const job = await JobSchema.findById(jobId).populate(
      "postedBy assignedTo",
      "firstName phoneNumber profilePhotoUrl rating"
    );

    if (!job) {
      throw new Error("Job not found");
    }

    // Optional: check if user can view this job
    // if (job.status !== "open") { ... }

    return job.toObject();
  }
  static async applyJob(jobId, user) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const job = await JobSchema.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    // ensure `applicants` field exists
    if (!job.applicants) job.applicants = [];

    if (job.applicants.includes(user._id)) {
      throw new Error("Already applied");
    }

    job.applicants.push(user._id);
    await job.save();

    return { message: "Applied" };
  }
  static async assignWork(jobId, user, workerId) {
    if (user.role !== "employee") {
      throw new Error("Only employer can assign work");
    }
    const job = await JobSchema.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    job.assignedTo = workerId;
    job.status = "assigned";
    await job.save();
    return job.toObject();
  }
}
module.exports = JobServices;
