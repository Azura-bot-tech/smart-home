'use server';
 
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

import { connectDB } from '@/lib/db';
import { User, Contact } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Hàm helper để chuyển đổi MongoDB document thành plain object
function convertToPlainObject(doc: any) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getUsers() {
  try {
    const users = await User.find({}).select('-password');
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function getContacts() {
  try {
    const contacts = await Contact.find({});
    return { success: true, data: contacts };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return { success: false, error: 'Failed to fetch contacts' };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: 'Invalid password' };
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    // Lưu token vào cookies
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    const userWithoutPassword = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      createdAt: user.createdAt.toISOString()
    };

    return { success: true, data: userWithoutPassword };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, error: 'Login failed' };
  }
}

export async function createUser(email: string, password: string) {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = email.split('@')[0];

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Tạo JWT token sau khi đăng ký thành công
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    // Lưu token vào cookies
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    const userWithoutPassword = {
      id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt.toISOString()
    };

    return { success: true, data: userWithoutPassword };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

export async function getUser(email: string) {
  const user = await User.findOne({ email });
  // Chuyển đổi thành plain object trước khi return
  return user ? convertToPlainObject(user) : null;
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await connectDB();

    const newContact = await Contact.create({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });

    return {
      success: true,
      data: convertToPlainObject(newContact)
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.'
    };
  }
}

export async function updateUsername(userId: string, newUsername: string) {
  try {
    await connectDB();

    // Kiểm tra username có hợp lệ không
    if (!newUsername || newUsername.trim() === '') {
      return { success: false, error: 'Username không được để trống' };
    }

    // Cập nhật username trong database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true } // Trả về document đã được cập nhật
    ).select('-password');

    if (!updatedUser) {
      return { success: false, error: 'Không tìm thấy người dùng' };
    }

    return {
      success: true,
      data: convertToPlainObject(updatedUser)
    };
  } catch (error) {
    console.error('Error updating username:', error);
    return { success: false, error: 'Không thể cập nhật username' };
  }
}
