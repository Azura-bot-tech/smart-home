'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyEmail(): JSX.Element {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get email from localStorage
    const savedEmail = localStorage.getItem('signupEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // If no email found, redirect back to signup
      router.push('/auth/signup');
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code: verificationCode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify code');
      }

      // Clear email from localStorage
      localStorage.removeItem('signupEmail');

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to verify code'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to resend code');
      }

      setTimeLeft(300); // Reset timer to 5 minutes
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-[45px] font-bold text-neutral-900">
            Verify Email
          </h1>
          <p className="text-lg md:text-xl font-extralight italic text-[#000000e6]">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033] text-center tracking-widest"
            maxLength={6}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full h-[50px] md:h-[60px] mt-5 bg-neutral-900 rounded-[10px] font-bold text-[#ffffffcc] text-base md:text-[21px] hover:bg-neutral-800 transition-colors disabled:opacity-50"
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>

        {/* Resend Code */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{' '}
            {timeLeft > 0 ? (
              <span>Resend in {formatTime(timeLeft)}</span>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                disabled={isLoading}
              >
                Resend code
              </button>
            )}
          </p>
        </div>

        {/* Back to Login Link */}
        <div className="text-center">
          <Link href="/login">
            <Button
              variant="link"
              className="text-base md:text-xl text-[#000000e6] font-normal hover:text-neutral-900"
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
