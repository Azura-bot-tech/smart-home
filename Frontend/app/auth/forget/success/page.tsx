import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";
import React, { JSX } from "react";
import Link from 'next/link';

export default function ForgetPassword(): JSX.Element {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">

      <main className="flex-1 flex flex-col items-center justify-center max-w-[1700px] px-4">
        <h1 className="text-[50px] font-bold text-neutral-900 text-center mb-4">
          Password Reset Successful!
        </h1>

        <p className="text-xl font-extralight italic text-[#000000e6] mb-10 text-center">
          You can now log in with your new password.
        </p>
        
        <Link href = "/login">
          <Button className="w-[400px] h-[60px] bg-neutral-900 rounded-[10px] text-[21px] font-bold text-[#ffffffcc]">
            Back to log in page
          </Button>
        </Link>
      </main>
    </div>
  );
}
