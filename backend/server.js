const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Todo:I will uncomment the following lines
const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
// const userRoutes = require("./src/routes/userRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Todo:I will uncomment the following lines
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
// app.use('/api/users', userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes); // messages nested under jobs

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!"),
      app.listen(process.env.PORT || 5000, () => {
        console.log("Server running on port 5000");
      });
  })
  .catch((error) => console.log(`Error occurred:${error}`));
