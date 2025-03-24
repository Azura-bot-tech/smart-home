"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(formData);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        router.push("/");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

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
              id="username"
              name="username"
              type="text"
              required
              placeholder="Username"
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              className="h-[60px] rounded-[10px] border-[#0000004c] text-[21px] placeholder:text-[#00000033] px-6"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-[60px] rounded-[10px] bg-neutral-900 text-[#ffffffcc] text-[21px] font-bold"
            >
              {loading ? "Đang đăng nhập..." : "Log in"}
            </Button>

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
