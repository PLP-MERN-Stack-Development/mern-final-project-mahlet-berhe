const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const User = require("../models/UserSchema");
const UserServices = require("../services/UserService");
dotenv.config();
const secret = process.env.JWT_SECRET;
const handleInvalidToken = (res) => {
  res.clearCookie("userToken");
  res.clearCookie("userId");
  res.clearCookie("isUserAuth");

  return res.status(401).json({
    message: "Invalid token",
    isAuth: false,
  });
};

const authMiddleware = async (req, res, next) => {
  const headerToken = req.headers.authorization?.split(" ")[1];
  const cookieToken = req.cookies?.userToken;
  const token = headerToken || cookieToken;

  const userId = req.cookies?.userId;

  if (!token) {
    return handleInvalidToken(res);
  }

  try {
    const decoded = jwt.verify(token, secret);

    // Match your JWT: { id: user._id }
    if (!decoded.id) {
      return handleInvalidToken(res);
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return handleInvalidToken(res);
    req.user = user;
    next();
  } catch (error) {
    return handleInvalidToken(res);
  }
};

module.exports = authMiddleware;
