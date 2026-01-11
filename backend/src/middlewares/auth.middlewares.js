const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Middleware to verify Food-Partner JWT token
const verifyfoodPartnerToken = async (req, res, next) => {
  const token = req.cookies.foodPartnerToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const partner = await foodPartnerModel.findById(decoded.foodPartnerId);

    if (!partner) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.foodPartner = partner;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};


const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = { verifyfoodPartnerToken, authUserMiddleware };
