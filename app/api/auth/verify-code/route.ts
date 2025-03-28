import { NextResponse } from 'next/server';
import { User } from '@/lib/schema';
import { sendNewPasswordEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, code, type } = await request.json();

    console.log('Received verification request:', { email, code, type });

    // Get stored verification data
    const verificationData = global.verificationCodes?.get(email);
    console.log('Stored verification data:', verificationData);

    if (!verificationData) {
      console.log('No verification data found for email:', email);
      return NextResponse.json(
        { error: 'Verification code expired or not found' },
        { status: 400 }
      );
    }

    // Check if code has expired
    if (Date.now() > verificationData.expiry) {
      console.log('Code expired for email:', email);
      global.verificationCodes.delete(email);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Convert both codes to strings and trim any whitespace
    const submittedCode = code.toString().trim();
    const storedCode = verificationData.code.toString().trim();

    console.log('Comparing codes:', {
      submitted: submittedCode,
      stored: storedCode
    });

    // Verify code
    if (submittedCode !== storedCode) {
      console.log('Code mismatch:', {
        submitted: submittedCode,
        stored: storedCode
      });
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Clear the code after successful verification
    global.verificationCodes.delete(email);
    console.log('Verification successful for email:', email);

    // If this is a password reset verification
    if (type === 'reset-password') {
      // Generate new random password (8 characters)
      const newPassword = Math.random().toString(36).slice(-8);

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password in database
      await User.findOneAndUpdate({ email }, { password: hashedPassword });

      // Send new password to user's email
      await sendNewPasswordEmail(email, newPassword);
      console.log('New password sent to email:', email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in verify-code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
