'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { JSX } from 'react';
import Link from 'next/link';
import { createUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  // Data for form fields
  const formFields = [
    { id: 'email', placeholder: 'Email', type: 'email' },
    { id: 'password', placeholder: 'Password', type: 'password' },
    {
      id: 'confirmPassword',
      placeholder: 'Confirm Password',
      type: 'password'
    }
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Lưu thông tin đăng ký vào sessionStorage
    sessionStorage.setItem(
      'pendingSignup',
      JSON.stringify({
        email,
        password
      })
    );

    // Gửi mã xác thực đến email
    const result = await fetch('/api/auth/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (result.ok) {
      router.push('/auth/signup/verify');
    } else {
      const data = await result.json();
      alert(data.error || 'Failed to send verification code');
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="relative w-full max-w-[1700px]">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-[400px]">
            {/* Heading */}
            <h1 className="mb-3 [font-family:'Inter-Bold',Helvetica] font-bold text-neutral-900 text-[45px]">
              Welcome to &lt;V&gt;
            </h1>

            {/* Subtitle */}
            <p className="mb-8 [font-family:'Inter-ExtraLight_Italic',Helvetica] font-extralight italic text-[#000000e6] text-xl">
              Create your new account
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <Input
                  key={field.id}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                  required
                />
              ))}

              <Button
                type="submit"
                className="w-full h-[60px] mt-5 bg-neutral-900 rounded-[10px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#ffffffcc] text-[21px]"
              >
                Get started
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
