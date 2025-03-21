'use server';

import { connectDB } from '@/lib/db';
import { User, Admin, LogMessage } from '@/lib/schema';

export async function getUsers() {
  await connectDB();
  return await User.find({});
}

export async function getAdmins() {
  await connectDB();
  return await Admin.find({});
}

export async function getLogs() {
  await connectDB();
  return await LogMessage.find({}).sort({ time: -1 });
}

export async function createLog(message: string) {
  await connectDB();
  return await LogMessage.create({ message });
}

export async function getUserByUsername(username: string) {
  await connectDB();
  return await User.findOne({ username });
}

export async function getAdminByUsername(username: string) {
  await connectDB();
  return await Admin.findOne({ username });
}
