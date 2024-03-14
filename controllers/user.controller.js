const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')

generateVerificationToken = (payload) => {
  return jwt.sign(
      payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.role = role;
      await newUser.save();

      const jwt = generateVerificationToken({
        id: newUser._id,
        email: newUser.email,
        active: newUser.active,
        role: newUser.role,
      });
      res.cookie("jwt", JSON.stringify(jwt), {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "none",
      });
      res.status(201).json({
        message: "User registered successfully",
        verificationToken: jwt,
        registredUser: newUser,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Password is incorrect." });

      const jwt = generateVerificationToken({
        id: user._id,
        email: user.email,
        active: user.active,
        role: user.role,
      });

      res.cookie("jwt", jwt, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "none",
      });

      res
        .status(200)
        .json({ message: "Login success!", verificationToken: jwt });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "None",
      });
      return res.status(200).json({ message: "Logged out." });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json({
        message: "User by id successfully retrieved",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const totalCount = await User.countDocuments();
      const users = await User.find();
      return res.status(200).json({
        message: "Users successfully retrieved",
        totalCount,
        users,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true }
      );

      res.status(200).json({
        msg: "Update Success!",
        updatedUser,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { userController };
