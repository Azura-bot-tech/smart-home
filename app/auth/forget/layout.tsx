"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
        <main className="flex-1 p-6">{children}</main>
        <footer className="text-center py-4 text-sm text-gray-500">
                Don't have an account? <Link href = "/auth/signup"> <Button
                        variant="link"
                    >
                        Sign Up
                    </Button> </Link>
        </footer>
      </div>
    );
}