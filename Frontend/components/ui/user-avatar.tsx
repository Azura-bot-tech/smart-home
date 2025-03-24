"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function UserAvatar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra user trong localStorage để xác định trạng thái đăng nhập
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Link
      href={isLoggedIn ? "/user" : "/login"}
      className="w-7 h-7 rounded-full overflow-hidden block"
    >
      <Image src={"/avatar.png"} alt="User Avatar" width={40} height={40} />
    </Link>
  );
}
