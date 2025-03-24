"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  username?: string;
  email?: string;
  // Thêm các trường thông tin khác nếu cần
}

export default function UserPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem("user");
    // Chuyển hướng về trang login
    router.push("/login");
  };

  useEffect(() => {
    // Kiểm tra đăng nhập và lấy thông tin user
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      // Nếu chưa đăng nhập, chuyển về trang login
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setUserInfo(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Thông tin người dùng</h1>
        <div className="space-y-4">
          <div>
            <label className="font-medium">Tên:</label>
            <p>{userInfo.username || "Chưa cập nhật"}</p>
          </div>
          <div>
            <label className="font-medium">Email:</label>
            <p>{userInfo.email || "Chưa cập nhật"}</p>
          </div>
          {/* Thêm các thông tin khác tùy theo dữ liệu user của bạn */}

          <button
            onClick={handleLogout}
            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
