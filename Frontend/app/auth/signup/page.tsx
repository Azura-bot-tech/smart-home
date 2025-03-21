'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    console.log('SignUp page rendered');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
    console.log(`${id} changed:`, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Save email to localStorage for verification page
      localStorage.setItem('signupEmail', formData.email);

      // Send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }

      // Redirect to verification page
      router.push('/auth/signup/verify');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-[45px] font-bold text-neutral-900">
            Welcome to &lt;V&gt;
          </h1>
          <p className="text-lg md:text-xl font-extralight italic text-[#000000e6]">
            Create your new account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />
          <Input
            id="phone"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />
          <Input
            id="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="h-[50px] md:h-[60px] rounded-[10px] border-[#0000004c] text-base md:text-[21px] placeholder:text-[#00000033]"
            required
          />

          <Button
            type="submit"
            className="w-full h-[50px] md:h-[60px] mt-5 bg-neutral-900 rounded-[10px] font-bold text-[#ffffffcc] text-base md:text-[21px] hover:bg-neutral-800 transition-colors"
          >
            Get started
          </Button>
        </form>

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
