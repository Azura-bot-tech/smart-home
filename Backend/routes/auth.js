const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../models/user");

// Route đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const result = await registerUser(username, password, email);
    res.json(result);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
});

// Route đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
});

module.exports = router;
