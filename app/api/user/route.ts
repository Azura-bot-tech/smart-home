import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/lib/schema';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    // Kiểm tra token
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || '') as {
      userId: string;
      email: string;
    };

    // Kết nối database và lấy thông tin user
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Trả về thông tin user
    return NextResponse.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
