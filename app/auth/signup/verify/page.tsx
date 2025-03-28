'use client';

import React, { JSX, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions';

export default function VerifyEmail() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill('')
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Kiểm tra xem có thông tin đăng ký không
    const pendingSignup = sessionStorage.getItem('pendingSignup');
    if (!pendingSignup) {
      router.replace('/auth/signup');
    }
  }, [router]);

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input if value is entered
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const code = verificationCode.join('');

    try {
      const pendingSignup = JSON.parse(
        sessionStorage.getItem('pendingSignup') || '{}'
      );

      // Verify the code
      const verifyResult = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: pendingSignup.email,
          code
        })
      });

      if (verifyResult.ok) {
        // If verification successful, create user
        const result = await createUser(
          pendingSignup.email,
          pendingSignup.password
        );

        if (result.success) {
          // Clear pending signup
          sessionStorage.removeItem('pendingSignup');
          router.push('/auth/signup/success');
        } else {
          alert(result.error);
        }
      } else {
        const data = await verifyResult.json();
        alert(data.error || 'Invalid verification code');
      }
    } catch (error) {
      alert('An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1700px] h-[900px] relative">
        {/* Main Content - Centered */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[400px]">
          {/* Heading */}
          <h1 className="font-bold text-neutral-900 text-[45px] mb-4 self-start">
            Verify your email
          </h1>

          {/* Subtitle */}
          <p className="font-extralight italic text-[#000000e6] text-xl mb-8 self-start">
            Please Enter the code we emailed you.
          </p>

          {/* Verification Code Inputs */}
          <div className="flex gap-2 mb-8 w-full">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[51px] h-[75px] text-center text-2xl rounded-[15px] border-[#0000004c]"
                />
              ))}
          </div>
          {/* Continue Button */}
          <Button
            onClick={handleVerify}
            disabled={isLoading || verificationCode.some((v) => !v)}
            className="w-[400px] h-[60px] bg-neutral-900 rounded-[10px] text-[#ffffffcc] text-[21px] font-bold mb-4"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </Button>
          {/* Back Link */}
          <Link href="/auth/signup">
            <Button
              variant="link"
              className="text-[#000000e6] text-xl font-normal mb-12"
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
