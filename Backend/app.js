const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const adafruitService = require("./service/adafruitService");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Route cơ bản
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Smart Home API" });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Đã xảy ra lỗi!" });
});

// Khởi chạy server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

adafruitService.startDataCollection(10000);
