import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generate random 6-digit code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Store the code temporarily with expiration time (10 minutes)
    global.verificationCodes = global.verificationCodes || new Map();
    global.verificationCodes.set(email, {
      code: verificationCode,
      expiry: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationCode);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-verification:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
