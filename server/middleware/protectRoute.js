const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model");
const SkilledWorkerModel = require("../models/skillperson.model");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from header
    console.log("JWT Token:", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized, invalid token" });
    }

    let user;
    if (decoded.userType === "admin") {
      user = await AdminModel.findById(decoded._id);
    } else if (decoded.userType === "skilledperson") {
      user = await SkilledWorkerModel.findById(decoded._id);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = { ...user.toObject(), userType: decoded.userType }; // Convert Mongoose document to plain object
    next();
  } catch (error) {
    console.error("Error in protectRoutes middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectRoute;
