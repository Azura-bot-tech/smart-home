"use client";

import React, { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function ForgetPassword(): JSX.Element {
  // State for verification code inputs
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill(""),
  );

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
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
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
          <Link href = "/auth/signup/success">
          <Button className="w-[400px] h-[60px] bg-neutral-900 rounded-[10px] text-[#ffffffcc] text-[21px] font-bold mb-4">
            Continue
          </Button>
          </Link>
          {/* Back Link */}
          <Link href = "/auth/signup">
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
};
