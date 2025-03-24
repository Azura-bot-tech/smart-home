const mongoose = require("mongoose");

const uri =
  "mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/?retryWrites=true&w=majority&appName=SmartHome";

// Tạo schema cho contact
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Kết nối đến MongoDB
mongoose
  .connect(uri, {
    dbName: "contact_data",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Tạo model từ schema
const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
