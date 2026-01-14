const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= COOKIE OPTIONS ================= */

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  path: "/",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};


/* ================= USER SECTION ================= */

// User Register
const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("userToken", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Login
const ulogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("userToken", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= FOOD PARTNER SECTION ================= */

// Food Partner Register
const FPregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingPartner = await foodPartnerModel.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { foodPartnerId: partner._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("foodPartnerToken", token, cookieOptions);

    res.status(201).json({
      message: "Food Partner registered successfully",
      foodPartner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Food Partner Login
const FPlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const partner = await foodPartnerModel.findOne({ email });
    if (!partner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { foodPartnerId: partner._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("foodPartnerToken", token, cookieOptions);

    res.status(200).json({
      message: "Food Partner login successful",
      foodPartner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGOUT (UNIVERSAL) ================= */

const logout = (req, res) => {
  res.clearCookie("userToken", cookieOptions);
  res.clearCookie("foodPartnerToken", cookieOptions);

  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  register,
  ulogin,
  FPregister,
  FPlogin,
  logout,
};
