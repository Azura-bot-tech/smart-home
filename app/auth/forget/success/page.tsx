'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1700px] h-[900px] relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[400px]">
          <h1 className="font-bold text-neutral-900 text-[45px] mb-4 text-center">
            Password Reset Successful
          </h1>

          <p className="font-extralight text-[#000000e6] text-xl mb-8 text-center">
            We have sent your new password to your email. Please check your
            inbox and use it to log in.
          </p>

          <Link href="/login">
            <Button className="w-[400px] h-[60px] bg-neutral-900 rounded-[10px] text-[#ffffffcc] text-[21px] font-bold">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
