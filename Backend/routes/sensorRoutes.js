const express = require("express");
const router = express.Router();
const {
  getLatestData,
  getAllLatestData,
  getAllData,
} = require("../models/SensorData");

// GET - Lấy dữ liệu mới nhất từ tất cả cảm biến
router.get("/latest", async (req, res) => {
  try {
    const latestData = await getAllLatestData();
    res.json(latestData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy dữ liệu cảm biến", error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allData = await getAllData();
    res.json(allData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy dữ liệu cảm biến", error: error.message });
  }
});

module.exports = router;
