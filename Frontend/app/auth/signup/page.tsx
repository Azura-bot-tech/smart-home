import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { JSX } from "react";
import Link from 'next/link';

export default function SignUp(): JSX.Element {
  // Data for form fields
  const formFields = [
    { id: "email", placeholder: "Email", type: "email" },
    { id: "password", placeholder: "Password", type: "password" },
    {
      id: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

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
            <form className="space-y-4">
              {formFields.map((field) => (
                <Input
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                />
              ))}

              <Link href="/auth/signup/verify">
              <Button
                type="submit"
                className="w-full h-[60px] mt-5 bg-neutral-900 rounded-[10px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#ffffffcc] text-[21px]"
              >
                Get started
              </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
