const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

class UserServices {
  static async setCookieValue(cookieData, res) {
    const date = new Date();
    date.setTime(date.getTime() + cookieData.days * 24 * 60 * 60 * 1000);
    res.cookie("userId", cookieData.userId, { httpOnly: true, expires: date });
    res.cookie("isUserAuth", cookieData.isUserAuth, {
      httpOnly: true,
      expires: date,
    });
    res.cookie("userToken", cookieData.userToken, {
      expires: date,
      httpOnly: true,
    });
  }
  static async signUpUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
      profilePhotoUrl,
      skills,
      about,
    } = req.body;
    try {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(201).json({
          message: `User already exists with phone number ${phoneNumber}`,
        });
      }

      const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        password,
        profilePhotoUrl,
        skills,
        about,
      });
      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async loginUser(req, res) {
    const { phoneNumber, password } = req.body;
    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return { success: false, code: 404, message: "User not found" };
      }

      const match = await user.matchPassword(password);
      if (!match)
        return { success: false, code: 401, message: "Invalid credentials" };

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return {
        success: true,
        token: token,
        code: 200,
        user,
      };
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async getPublicProfile(userId) {
    if (!userId) throw new Error("User ID is required");

    // Fetch user excluding sensitive info like password
    const user = await User.findById(userId).select(
      "-password -email -phoneNumber" // keep only public info
    );

    if (!user) throw new Error("User not found");

    return user.toObject();
  }
  static async getPrivateProfile(userId) {
    if (!userId) throw new Error("User ID is required");

    // Fetch user including sensitive info for private view
    const user = await User.findById(userId); // includes everything

    if (!user) throw new Error("User not found");

    return user.toObject();
  }
}
module.exports = UserServices;
