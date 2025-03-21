"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { JSX } from "react";
import Link from 'next/link'


export default function ForgetPassword(): JSX.Element {
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

            <Input
              placeholder="Email"
              className="h-[60px] text-[21px] border-[#0000004c] rounded-[10px] pl-6"
            />
            <p></p>

            <Link href = "/auth/forget/verify">
              <Button className="w-full h-[60px] rounded-[10px] bg-neutral-900 hover:bg-neutral-800">
                <span className="text-[21px] font-bold text-[#ffffffcc]">
                  Confirm
                </span>
              </Button>
            </Link>
              <p></p>
            <Link href = "/login">
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
