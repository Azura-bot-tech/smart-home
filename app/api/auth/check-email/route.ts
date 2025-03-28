import { User } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Kiểm tra email trong database
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Email không tồn tại' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
