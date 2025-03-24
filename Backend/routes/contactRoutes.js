const express = require("express");
const Contact = require("../models/contactData");

const router = express.Router();

// Route để tạo contact mới
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Tạo contact mới
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Lưu vào database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Thông tin liên hệ đã được ghi nhận",
    });
  } catch (error) {
    console.error("Lỗi khi lưu contact:", error);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
});

// Route để lấy tất cả contacts (có thể dùng cho admin)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách contacts:", error);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi lấy danh sách liên hệ",
    });
  }
});

module.exports = router;
