import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { updateUsername } from '@/lib/actions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || username.trim() === '') {
      return NextResponse.json(
        { error: 'Username không được để trống' },
        { status: 400 }
      );
    }

    // Lấy token từ cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Không tìm thấy phiên đăng nhập' },
        { status: 401 }
      );
    }

    // Giải mã token để lấy userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      userId: string;
    };
    const userId = decoded.userId;

    // Gọi server action để cập nhật username
    const result = await updateUsername(userId, username);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Error updating username:', error);

    // Kiểm tra lỗi JWT
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Phiên đăng nhập không hợp lệ' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi cập nhật username' },
      { status: 500 }
    );
  }
}
