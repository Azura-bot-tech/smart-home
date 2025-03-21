import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Triangle } from "lucide-react";
import React, { JSX } from "react";
import Link from 'next/link'

export default function LogIn(): JSX.Element {
  // Data for links that could be extracted to props or context
  const navigationLinks = [
    { text: "Contact", href: "#", type: "link" },
    { text: "Sign Up", href: "#", type: "button" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="relative w-full max-w-[1700px] h-[900px]">

        {/* Login Form */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[400px]">
          <h1 className="font-bold text-[50px] text-neutral-900 mb-10">
            Welcome back
          </h1>

          <div className="w-full space-y-5">
            <Input
              placeholder="Email"
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
            />

            <Input
              type="password"
              placeholder="Password"
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
            />

            <p></p>
            <Link href="/">
              <Button className="w-full h-[60px] rounded-[10px] bg-neutral-900 text-[#ffffffcc] text-[21px] font-bold">
                Log in
              </Button>
            </Link>

            <div className="flex justify-center mt-3">
              <p className="font-normal text-xl text-[#000000e6]">
                <Link href="/auth/forget">
                  <Button
                    variant="link"
                    className="text-xl text-[#000000e6] font-normal"
                  >
                    Forget Password?
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
