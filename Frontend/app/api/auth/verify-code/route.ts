import { NextResponse } from 'next/server';
import { verificationCodes } from '@/lib/verification';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    const storedData = verificationCodes.get(email);
    if (!storedData) {
      return NextResponse.json(
        { error: 'No verification code found' },
        { status: 400 }
      );
    }

    if (storedData.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(email);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Code is valid, remove it from storage
    verificationCodes.delete(email);

    return NextResponse.json({
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
