'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgetPassword(){
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Đầu tiên kiểm tra email có tồn tại không
      const checkEmailResponse = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!checkEmailResponse.ok) {
        alert('Email không tồn tại trong hệ thống');
        return;
      }

      // Nếu email tồn tại, tiếp tục gửi mã xác thực
      const sendVerificationResponse = await fetch(
        '/api/auth/send-verification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            type: 'reset-password'
          })
        }
      );

      if (sendVerificationResponse.ok) {
        sessionStorage.setItem('resetEmail', email);
        router.push('/auth/forget/verify');
      } else {
        alert('Có lỗi khi gửi mã xác thực, vui lòng thử lại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <Card className="border-none shadow-none max-w-md w-full">
          <CardContent className="p-0 space-y-5">
            <div className="space-y-2">
              <h1 className="text-[45px] font-bold text-neutral-900">
                Forget password?
              </h1>
              <p className="text-xl font-extralight italic text-[#000000e6]">
                No worries, just enter your email
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[60px] text-[21px] border-[#0000004c] rounded-[10px] pl-6"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-[60px] mt-5 rounded-[10px] bg-neutral-900 hover:bg-neutral-800"
              >
                <span className="text-[21px] font-bold text-[#ffffffcc]">
                  {loading ? 'Sending...' : 'Confirm'}
                </span>
              </Button>
            </form>

            <Link href="/login">
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-xl text-[#000000e6] font-normal"
                >
                  Back
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
