require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose.set("strictPopulate", false);
mongoose.set("strictQuery", true);

// Connect to MongoDB
const connectDB = require("./config/mongodb.config");
connectDB();

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To Blogging-Site Test Server" });
});

const routes = require("./routes/index.route");
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port Number: ${PORT}`);
});
