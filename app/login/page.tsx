'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { JSX, useState } from 'react';
import Link from 'next/link';
import { loginUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="relative w-full max-w-[1700px] h-[900px]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[400px]">
          <h1 className="font-bold text-[50px] text-neutral-900 mb-10">
            Welcome back
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {error && <div className="text-red-500 text-center">{error}</div>}

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[10px] bg-neutral-900 text-[#ffffffcc] text-[21px] font-bold"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </Button>

            <div className="flex justify-center mt-3">
              <Link href="/auth/forget">
                <Button
                  variant="link"
                  className="text-xl text-[#000000e6] font-normal"
                >
                  Forget Password?
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
