import mongoose from 'mongoose';

// Tạo kết nối tới 2 database riêng biệt
const userConnection = mongoose.createConnection(
  process.env.MONGODB_USER_URI || ''
);
const contactConnection = mongoose.createConnection(
  process.env.MONGODB_CONTACT_URI || ''
);

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema cho Contact
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên là bắt buộc'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: [true, 'Tiêu đề là bắt buộc'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Nội dung tin nhắn là bắt buộc'],
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new'
    }
  },
  { timestamps: true }
);

// Tạo model với connection tương ứng
export const User = userConnection.model('User', userSchema);
export const Contact = contactConnection.model('Contact', contactSchema);
