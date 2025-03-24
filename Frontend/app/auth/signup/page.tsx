"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });
      if (response.success) {
        router.push("/login");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                value={formData.username}
                onChange={handleChange}
              />

              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                value={formData.password}
                onChange={handleChange}
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                className="h-[60px] rounded-[10px] border-[#0000004c] [font-family:'Inter-Regular',Helvetica] text-[21px] placeholder:text-[#00000033]"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-[60px] mt-5 bg-neutral-900 rounded-[10px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#ffffffcc] text-[21px]"
              >
                {loading ? "Đang đăng ký..." : "Get started"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
