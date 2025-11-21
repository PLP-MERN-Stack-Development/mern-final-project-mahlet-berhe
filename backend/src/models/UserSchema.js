const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  role: { type: String, enum: ["worker", "employee", "admin"], required: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength: 6 },
  profilePhotoUrl: { type: String, required: true },
  skills: { type: [String] }, //For workers
  about: { type: String },
  location: {
    city: String,
    address: String,
  },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  token: { type: String },
  createdAt: { type: Date, default: Date.now() },
});
UserSchema.pre("save", function (next) {
  const saltRound = 10;
  if (this.isNew || this.isModified(this.password)) {
    const user = this;
    bcrypt.hash(user.password, saltRound, function (error, hashPassword) {
      if (error) {
        next(error);
      } else {
        user.password = hashPassword;
        next();
      }
    });
  } else {
    next();
  }
});
// Compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
