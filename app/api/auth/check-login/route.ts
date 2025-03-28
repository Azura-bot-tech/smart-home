import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify token
    const verified = jwt.verify(token.value, process.env.JWT_SECRET || '');
    if (!verified) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return new NextResponse('Authenticated', { status: 200 });
  } catch (error) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
