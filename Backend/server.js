const express = require("express");
const cors = require("cors");
const { getAllLatestData, getAllData } = require("./models/SensorData");
const authRoutes = require("./routes/auth");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes xác thực
app.use("/api/auth", authRoutes);

// Route lấy dữ liệu mới nhất
app.get("/api/latest-data", async (req, res) => {
  try {
    const data = await getAllLatestData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route lấy tất cả dữ liệu
app.get("/api/all-data", async (req, res) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching all data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
