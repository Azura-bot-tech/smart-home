"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-end px-6 py-7 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-black font-bold text-lg">
            <TriangleIcon className="w-6 h-6" />
          </Link>
        </div>
        
        <div className="absolute top-[18px] right-[41px] flex items-center gap-5">
          <div className="w-[59px] h-[22px]">
            <p className="font-normal text-[#4c4c4c] text-[15px]">
              Contact
            </p>
          </div>
          <Link href="/auth/signup">
            <Button
              variant="outline"
              className="h-[43px] w-[88px] rounded-[15px] border-[#c3c3c3] font-bold text-[15px] text-neutral-900 opacity-[0.88]"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

function TriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );
}