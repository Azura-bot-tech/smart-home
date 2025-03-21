'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { JSX } from 'react';
import Link from 'next/link';

export default function ForgetPassword(): JSX.Element {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="border-none shadow-none w-full max-w-[400px]">
        <CardContent className="p-0 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-[45px] font-bold text-neutral-900">
              Forget password?
            </h1>
            <p className="text-lg md:text-xl font-extralight italic text-[#000000e6]">
              No worries, just enter your email
            </p>
          </div>

          <Input
            placeholder="Email"
            className="h-[50px] md:h-[60px] text-base md:text-[21px] border-[#0000004c] rounded-[10px] pl-6"
          />

          <div className="space-y-4">
            <Link href="/auth/forget/verify" className="block">
              <Button className="w-full h-[50px] md:h-[60px] rounded-[10px] bg-neutral-900 hover:bg-neutral-800 transition-colors">
                <span className="text-base md:text-[21px] font-bold text-[#ffffffcc]">
                  Confirm
                </span>
              </Button>
            </Link>

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
        </CardContent>
      </Card>
    </div>
  );
}
